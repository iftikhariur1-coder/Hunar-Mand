const V="ittehad-v1",FILES=["./","./index.html","./icon-192.png","./icon-512.png","./manifest.webmanifest"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
// نیا ڈیٹا پہلے: انٹرنیٹ ہو تو تازہ صفحہ، نہ ہو تو محفوظ شدہ
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==location.origin)return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match("./index.html"))))});
