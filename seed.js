// Shared starting data for everyone who opens the site (PUBLIC: it's on GitHub).
// To share new prices with your partner: add a line below, raise "version" by 1, and commit.
// Each browser adds new/changed lines once per version; lines a person deleted stay deleted.
// price = our supplier's price (what we offer); price2 = Edsel's (EJC) price.
// Estimates: actual:'forecast', date = the Tuesday it applies to, heard = when we heard it.
window.SEED = {
  version: 7,
  remove: ['sup-0922', 'sup-0929', 'n-0927a'],
  prices: [
    { id:'sup-0812', date:'2026-08-12', kind:'diesel', price:71.50, price2:null, dir:'flat', change:null, actual:'actual', note:'' },
    { id:'sup-0820', date:'2026-08-20', kind:'diesel', price:78.50, price2:74.50, dir:'up', change:3.84, actual:'actual', note:'' },
    { id:'sup-0825', date:'2026-08-25', kind:'diesel', price:77.40, price2:73.40, dir:'up', change:2.31, actual:'actual', note:'' },
    { id:'sup-0901', date:'2026-09-01', kind:'diesel', price:73.57, price2:69.57, dir:'down', change:3.83, actual:'actual', note:'' },
    { id:'sup-0908', date:'2026-09-08', kind:'diesel', price:78.75, price2:74.75, dir:'up', change:5.18, actual:'actual', note:'' },
    { id:'sup-0915', date:'2026-09-15', kind:'diesel', price:83.00, price2:79.06, dir:'up', change:4.31, actual:'actual', note:'' },
    { id:'sup-0922b', date:'2026-09-22', kind:'diesel', price:88.40, price2:null, est:false, dir:'up', change:8.82, actual:'actual', note:'Offered ₱88.40 to EJC. DOE hike was ₱8.82; supplier only went up ₱5.40' },
    { id:'sup-0929b', date:'2026-09-29', heard:'2026-09-22', kind:'diesel', price:null, price2:null, dir:'down', change:6.70, actual:'forecast', note:'Edsel ("palaki pa yan")' },
    { id:'sup-0929c', date:'2026-09-29', heard:'2026-09-25', kind:'diesel', price:null, price2:null, dir:'down', change:8.00, actual:'forecast', note:'DOE, up to ₱8' },
    { id:'sup-0929d', date:'2026-09-29', heard:'2026-09-26', kind:'diesel', price:null, price2:null, dir:'down', change:7.25, actual:'forecast', note:'Industry final, ₱7.00–7.50' },
  ],
  news: [
    { id:'n-0922a', date:'2026-09-22', tag:'rollback', source:'Edsel', title:'Diesel rollback ₱6.70 as of Sep 21, "palaki pa yan"', body:"Suppliers having a hard time pricing because next week's rollback is big. This week's hike already taken back." },
    { id:'n-0922b', date:'2026-09-22', tag:'rollback', source:'Manila Bulletin', title:'Early signs point to potential fuel price rollback next week', url:'https://mb.com.ph/2026/09/22/early-signs-point-to-potential-fuel-price-rollback-next-week' },
    { id:'n-0922c', date:'2026-09-22', tag:'rollback', source:'BusinessMirror', title:'DOE sees fuel price rollback next week', url:'https://businessmirror.com.ph/2026/09/22/doe-sees-fuel-price-rollback-next-week/' },
    { id:'n-0925a', date:'2026-09-25', tag:'rollback', source:'Philstar', title:'DOE sees up to ₱8/L diesel rollback by end-September', body:'Based on first 4 trading days. Saudi exports partly resumed.', url:'https://www.philstar.com/business/2026/09/25/2558821/doe-sees-p8-diesel-price-rollback-end-september' },
    { id:'n-0925b', date:'2026-09-25', tag:'rollback', source:'Manila Bulletin', title:'Diesel may drop by up to ₱7.50/L next week', url:'https://mb.com.ph/2026/09/25/diesel-prices-may-drop-by-up-to-750l-next-week-as-oil-costs-ease' },
    { id:'n-0925c', date:'2026-09-25', tag:'market', source:'Trading news', title:'Brent ends week ~$104, down from $108 high', body:'US–Iran truce hopes pulled prices down; Houthi attacks on Saudi keep risk high.', url:'https://www.thenationalnews.com/business/energy/2026/09/25/oil-prices-waver-in-face-of-iran-war-truce-and-houthi-attacks/' },
    { id:'n-0926a', date:'2026-09-26', tag:'rollback', source:'Manila Times', title:'Final estimate: diesel rollback ₱7.00–₱7.50/L on Sep 29', body:'Gasoline −₱0.50 to −₱1.00. Oil companies announce Monday.', url:'https://www.manilatimes.net/2026/09/26/news/national/fuel-price-rollback-projected-next-week/2433201' },
    { id:'n-0926b', date:'2026-09-26', tag:'risk', source:'Manila Times', title:'Warning: the drop "might be short-lived"', body:'Iran refusing US pressure, Houthi missile attack on Saudi, and a possible US diesel export ban could push diesel back up.', url:'https://www.manilatimes.net/2026/09/26/news/national/fuel-price-rollback-projected-next-week/2433201' },
  ],
};
