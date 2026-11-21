/* ===== Videos shown on the site =====
   The site reads your Google Sheet (see SHEET_URL). The lists below are the BACKUP: they show
   if the sheet is empty, offline, or SHEET_URL is left blank. */
var SHEET_URL="https://docs.google.com/spreadsheets/d/e/2PACX-1vTqYEmq5hRjjFE0kaUy5YDppnV4CTnuo4qKYh77zIjFKNfX15dw66PnvBllwslvG8CwSAsaSwV65CZY/pub?gid=899126977&single=true&output=csv"; /* paste your Google Sheet "Publish to web" CSV link between the quotes */

window.SITE_HERO={feature:["1u0ULhVUvvM","M & D","Wedding highlights"],mini:["1kHFaY5qJz0","G & A","Wedding teaser"]};
window.SITE_FILMS=[
["1kHFaY5qJz0","G & A","Wedding teaser","Short social cut"],
["NN3BbEYAyjQ","M & D","Wedding teaser","Short social cut"],
["1u0ULhVUvvM","M & D","Wedding highlights","Full-day story"],
["TFfA5JCuM-0","M & S","Wedding highlights","Full-day story"],
["wE38AcaPE00","G & A","Wedding highlights","Full-day story"],
["qQe6p5eHqvs","S & G","Wedding highlights","Full-day story"],
["SIyY_ykB4uE","A & J","Wedding highlights","Full-day story"],
["-BiQK0gYHFM","B & I","Wedding teaser","Short social cut"],
["vksNaP4HbGo","B & I","Wedding highlights","Full-day story"],
["SUk7rLgGK6Y","G & D","Wedding highlights","Full-day story"],
["lnMzKS5-YYM","A & Z","Wedding teaser","Short social cut"]
];
window.SITE_RECENT=window.SITE_FILMS.slice(0,6);

/* ----- Google Sheet loader (you don't need to edit anything below) ----- */
(function(){
if(!SHEET_URL)return;
var CK="sheetFilms1",ID=/^[\w-]{11}$/;
var snap=function(){return{hero:window.SITE_HERO,films:window.SITE_FILMS,recent:window.SITE_RECENT}};
var apply=function(d){if(d.hero)window.SITE_HERO=d.hero;if(d.films&&d.films.length)window.SITE_FILMS=d.films;if(d.recent&&d.recent.length)window.SITE_RECENT=d.recent};
/* 1) instant: use the last copy of the sheet this browser saw */
try{var c=JSON.parse(localStorage.getItem(CK)||"null");if(c&&c.u===SHEET_URL)apply(c.d)}catch(e){}
/* 2) in the background: fetch the live sheet */
var csv=function(t){var r=[],row=[],f="",q=false,i=0,ch;
 for(;i<t.length;i++){ch=t[i];
  if(q){if(ch==='"'){if(t[i+1]==='"'){f+='"';i++}else q=false}else f+=ch}
  else if(ch==='"')q=true;
  else if(ch===","){row.push(f);f=""}
  else if(ch==="\n"||ch==="\r"){if(ch==="\r"&&t[i+1]==="\n")i++;row.push(f);r.push(row);row=[];f=""}
  else f+=ch}
 if(f!==""||row.length){row.push(f);r.push(row)}return r};
var vid=function(s){s=String(s||"").trim();if(ID.test(s))return s;var m=s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/);return m?m[1]:""};
var yes=function(s){return/^(y|yes|true|1|x|\u2713)$/i.test(String(s||"").trim())};
var parse=function(t){var rows=csv(t);if(rows.length<2)return null;
 var h=rows[0].map(function(x){return String(x||"").trim().toLowerCase()});
 var col=function(re){for(var i=0;i<h.length;i++)if(re.test(h[i]))return i;return-1};
 var cL=col(/^(youtube|link|video)/),cC=col(/^couple/),cT=col(/^type/),cH=col(/^hero/),cR=col(/^recent/),cP=col(/^portfolio/),cD=col(/^details/);
 if(cL<0)return null;
 var films=[],recent=[],hero={};
 rows.slice(1).forEach(function(r){var v=vid(r[cL]);if(!v)return;
  var tt=String(cT>=0?r[cT]:"").toLowerCase(),teaser=/teaser/.test(tt),high=/highlight/.test(tt);
  var type=teaser?"Wedding teaser":(high?"Wedding highlights":"Wedding film");
  var title=String((cC>=0&&r[cC])||"").trim()||"Wedding";
  var meta=String((cD>=0&&r[cD])||"").trim()||(teaser?"Short social cut":(high?"Full-day story":""));
  var row=[v,title,type,meta];
  var hv=String(cH>=0?r[cH]:"").trim().toLowerCase();
  if(/^(big|large|feature)/.test(hv)&&!hero.feature)hero.feature=[v,title,type];
  else if(/^(small|mini)/.test(hv)&&!hero.mini)hero.mini=[v,title,type];
  if(cP>=0?yes(r[cP]):true)films.push(row);
  if(cR>=0&&yes(r[cR]))recent.push(row)});
 if(!films.length&&!recent.length&&!hero.feature&&!hero.mini)return null;
 var cur=snap(),hr={feature:hero.feature||cur.hero.feature,mini:hero.mini||cur.hero.mini};
 return{hero:hr,films:films.length?films:cur.films,recent:recent.length?recent:cur.recent}};
fetch(SHEET_URL,{cache:"no-store"}).then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(t){
 var d=parse(t);if(!d)return;
 if(JSON.stringify(d)===JSON.stringify(snap()))return;
 try{localStorage.setItem(CK,JSON.stringify({u:SHEET_URL,d:d}))}catch(e){return}
 /* The page already drew the older list. Refresh once, only if the visitor hasn't started scrolling or watching. */
 try{if(sessionStorage.getItem("sheetReload")==="1")return;
  var idle=(window.scrollY||0)<80&&!document.querySelector("dialog[open]");
  if(idle){sessionStorage.setItem("sheetReload","1");location.reload()}}catch(e){}
}).catch(function(){});
})();
