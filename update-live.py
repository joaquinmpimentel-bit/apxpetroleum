#!/usr/bin/env python3
"""Fetch live Brent prices and Philippine fuel-price headlines for Fuel Offer Signal.

Writes live-data.js next to index.html (loaded with a <script> tag, so it works
when the page is opened as a local file). Run by hand or on a schedule:
    python3 update-live.py
"""
import json, os, sys, urllib.parse, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone, timedelta
from email.utils import parsedate_to_datetime

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "live-data.js")
PH = timezone(timedelta(hours=8))
UA = {"User-Agent": "Mozilla/5.0 (Macintosh) FuelOfferSignal/1.0"}

NEWS_QUERIES = [
    "oil price rollback OR hike diesel Philippines when:7d",
    "DOE fuel price adjustment next week when:7d",
]
FUEL = ("diesel", "fuel", "oil", "pump price", "gasoline", "petrol")
MOVE = ("rollback", "roll back", "hike", "increase", "decrease", "price", "cut", "drop")


def get(url, timeout=20):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def brent():
    """Daily Brent futures closes for the last ~2 months (Yahoo Finance BZ=F)."""
    data = json.loads(get("https://query1.finance.yahoo.com/v8/finance/chart/BZ=F?range=2mo&interval=1d"))
    res = data["chart"]["result"][0]
    out = {}
    for ts, close in zip(res["timestamp"], res["indicators"]["quote"][0]["close"]):
        if close is None:
            continue
        day = datetime.fromtimestamp(ts, PH).strftime("%Y-%m-%d")
        out[day] = round(close, 2)
    return [{"date": d, "usd": v} for d, v in sorted(out.items())]


def news():
    seen, items = set(), []
    for q in NEWS_QUERIES:
        url = "https://news.google.com/rss/search?" + urllib.parse.urlencode(
            {"q": q, "hl": "en-PH", "gl": "PH", "ceid": "PH:en"})
        root = ET.fromstring(get(url))
        for it in root.iter("item"):
            title = (it.findtext("title") or "").strip()
            source = (it.findtext("source") or "").strip()
            if source and title.endswith(" - " + source):
                title = title[: -len(" - " + source)]
            key = title.lower()
            if not title or key in seen or not any(k in key for k in FUEL) or not any(k in key for k in MOVE):
                continue
            seen.add(key)
            try:
                when = parsedate_to_datetime(it.findtext("pubDate")).astimezone(PH)
            except Exception:
                continue
            items.append({"title": title, "source": source, "url": it.findtext("link") or "",
                          "time": when.strftime("%Y-%m-%dT%H:%M")})
    items.sort(key=lambda x: x["time"], reverse=True)
    return items[:30]


def main():
    live = {"updated": datetime.now(PH).strftime("%Y-%m-%dT%H:%M"), "brent": [], "news": [], "errors": []}
    for name, fn in (("brent", brent), ("news", news)):
        try:
            live[name] = fn()
        except Exception as e:  # keep going: one source failing shouldn't blank the other
            live["errors"].append(f"{name}: {e}")
    # Keep the previous file's data for any source that failed this time
    if live["errors"] and os.path.exists(OUT):
        try:
            prev = json.loads(open(OUT).read().split("=", 1)[1].rstrip().rstrip(";"))
            for name in ("brent", "news"):
                if not live[name]:
                    live[name] = prev.get(name, [])
        except Exception:
            pass
    with open(OUT, "w") as f:
        f.write("window.LIVE = " + json.dumps(live, ensure_ascii=False) + ";\n")
    print(f"updated {live['updated']}: {len(live['brent'])} Brent days, {len(live['news'])} headlines"
          + (f", errors: {live['errors']}" if live["errors"] else ""))
    return 0 if not live["errors"] else 1


if __name__ == "__main__":
    sys.exit(main())
