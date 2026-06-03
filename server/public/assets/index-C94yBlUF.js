const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/GLTFLoader-nBVbhmug.js","assets/three.module-BX2Vlr8r.js","assets/OrbitControls-B17Ynsio.js"])))=>i.map(i=>d[i]);
(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();class M{constructor(t,e,o){this.parent=t,this.data=e,this.onClick=o}getHTML(){return`
      <article class="lab3-card" data-product-id="${this.data.id}">
        <div class="lab3-card-media">
          <img src="${this.data.image}" alt="${this.data.title}">
        </div>
        <div class="lab3-card-body">
          <h3>${this.data.title}</h3>
          <p>${this.data.short}</p>
          <button class="site-btn lab3-open-btn" type="button">Открыть</button>
        </div>
      </article>
    `}render(){this.parent.insertAdjacentHTML("beforeend",this.getHTML());const t=this.parent.lastElementChild;t==null||t.addEventListener("click",this.onClick)}}class H{constructor(t,e){this.parent=t,this.onClick=e}render(){const t=document.createElement("button");t.type="button",t.className="site-btn lab3-back-btn",t.textContent="Назад",t.onclick=this.onClick,this.parent.appendChild(t)}}class B{constructor(t,e){this.parent=t,this.data=e}getHTML(){return`
      <article class="lab3-product">
        <div class="lab3-product-media">
          <img src="${this.data.image}" alt="${this.data.title}">
        </div>
        <div class="lab3-product-body">
          <h3>${this.data.title}</h3>
          <p>${this.data.description}</p>
          <ul class="lab3-product-meta">
            <li><strong>Зона:</strong> ${this.data.zone}</li>
            <li><strong>Срок:</strong> ${this.data.eta}</li>
            <li><strong>Риск:</strong> ${this.data.risk}</li>
          </ul>
        </div>
      </article>
    `}render(){this.parent.innerHTML=this.getHTML()}}const $="modulepreload",I=function(n){return"/"+n},_={},L=function(t,e,o){let r=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),l=(i==null?void 0:i.nonce)||(i==null?void 0:i.getAttribute("nonce"));r=Promise.allSettled(e.map(u=>{if(u=I(u),u in _)return;_[u]=!0;const m=u.endsWith(".css"),y=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const c=document.createElement("link");if(c.rel=m?"stylesheet":$,m||(c.as="script"),c.crossOrigin="",c.href=u,l&&c.setAttribute("nonce",l),document.head.appendChild(c),m)return new Promise((s,b)=>{c.addEventListener("load",s),c.addEventListener("error",()=>b(new Error(`Unable to preload CSS for ${u}`)))})}))}function a(i){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=i,window.dispatchEvent(l),!l.defaultPrevented)throw i}return r.then(i=>{for(const l of i||[])l.status==="rejected"&&a(l.reason);return t().catch(a)})},A="./models/icebreaker.glb";class C{constructor(t){this.parent=t}getHTML(){return`
      <section class="lab3-model-wrap">
        <h4>3D модель ледокольного сервиса</h4>
        <div class="lab3-model-view" id="lab3_model_canvas"></div>
        <div class="lab3-model-controls">
          <button type="button" class="site-btn lab3-model-btn" data-view="front">Спереди</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="back">Сзади</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="left">Слева</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="right">Справа</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="zoom-in">+</button>
          <button type="button" class="site-btn lab3-model-btn" data-view="zoom-out">-</button>
        </div>
      </section>
    `}async render(){this.parent.insertAdjacentHTML("beforeend",this.getHTML());const t=document.getElementById("lab3_model_canvas");if(!t)return;const[{Scene:e,PerspectiveCamera:o,WebGLRenderer:r,AmbientLight:a,DirectionalLight:i,Box3:l,Vector3:u},{GLTFLoader:m},{OrbitControls:y}]=await Promise.all([L(()=>import("./three.module-BX2Vlr8r.js"),[]),L(()=>import("./GLTFLoader-nBVbhmug.js"),__vite__mapDeps([0,1])),L(()=>import("./OrbitControls-B17Ynsio.js"),__vite__mapDeps([2,1]))]),c=new e,s=new o(50,t.clientWidth/280,.1,1e3);s.position.set(0,2,5);const b=new r({antialias:!0,alpha:!0});b.setSize(t.clientWidth,280),t.appendChild(b.domElement),c.add(new a(16777215,1.1));const v=new i(16777215,1.4);v.position.set(8,10,6),c.add(v);const h=new y(s,b.domElement);h.enablePan=!1,h.target.set(0,1,0),h.update(),h.addEventListener("change",()=>b.render(c,s)),new m().load(A,f=>{const d=f.scene;c.add(d),d.scale.setScalar(2.2);const g=new l().setFromObject(d),p=g.getSize(new u),P=g.getCenter(new u);d.position.sub(P),d.position.y+=p.y/2;const S=Math.max(p.x,p.y,p.z)*1.2||4;s.position.set(0,p.y*.7,S),h.target.set(0,p.y/2,0),h.update(),b.render(c,s)},void 0,()=>{t.innerHTML="<p>Не удалось загрузить 3D модель.</p>"}),this.parent.querySelectorAll(".lab3-model-btn").forEach(f=>{f.addEventListener("click",()=>{const d=f.dataset.view,g=.7,p=Math.max(Math.hypot(s.position.x,s.position.z),3);d==="front"?s.position.set(0,s.position.y,p):d==="back"?s.position.set(0,s.position.y,-p):d==="left"?s.position.set(-p,s.position.y,0):d==="right"?s.position.set(p,s.position.y,0):d==="zoom-in"?s.position.multiplyScalar(1-g*.1):d==="zoom-out"&&s.position.multiplyScalar(1+g*.1),h.update(),b.render(c,s)})})}}class D{async request(t,e={}){const o=await fetch(t,{headers:{"Content-Type":"application/json",...e.headers||{}},...e}),r=o.status===204?null:await o.json();if(!o.ok)throw new Error((r==null?void 0:r.error)||`HTTP ${o.status}`);return r}get(t){return this.request(t)}post(t,e){return this.request(t,{method:"POST",body:JSON.stringify(e)})}patch(t,e){return this.request(t,{method:"PATCH",body:JSON.stringify(e)})}delete(t){return this.request(t,{method:"DELETE"})}}const w=new D;class O{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const T=new O,R="Акватория Северного морского пути",U="По данным диспетчера",F="Уточняется";function k(n){return{id:n.id,title:n.title,short:n.text,description:n.text,eta:n.eta||U,zone:n.zone||R,risk:n.risk||F,image:n.src}}class j{constructor(t,e,o){this.parent=t,this.id=e,this.onBack=o}async getData(){try{const t=await w.get(T.getStockById(this.id));this.renderData(k(t))}catch(t){console.error("Lab 6 fetch detail error:",t),this.renderNotFound()}}get pageRoot(){return document.getElementById("lab3_product_page")}getHTML(){return`
      <section class="lab3-page" id="lab3_product_page">
        <div class="lab3-product-header">
          <div id="lab3_back_button"></div>
          <h3>Детали сервиса</h3>
        </div>
        <div id="lab3_product_root"></div>
      </section>
    `}renderNotFound(){this.parent.innerHTML=`
      <section class="lab3-page">
        <p>Запись не найдена.</p>
      </section>
    `}async renderData(t){const e=document.getElementById("lab3_product_root");e.innerHTML="",new B(e,t).render();const r=e.querySelector(".lab3-product-body");r&&await new C(r).render()}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("afterbegin",this.getHTML());const t=document.getElementById("lab3_back_button");new H(t,this.onBack).render();const o=document.getElementById("lab3_product_root");o.innerHTML='<p class="lab3-status">Загрузка карточки через Fetch API...</p>',this.getData()}}class z{constructor(t){this.parent=t,this.items=[]}async getData(){try{const t=await w.get(T.getStocks());this.items=t.map(k),this.renderData(this.items)}catch(t){console.error("Lab 6 fetch error:",t),this.renderError("Не удалось загрузить сервисы через Fetch API.")}}get pageRoot(){return document.getElementById("lab3_main_page")}getHTML(){return`
      <section class="lab3-page" id="lab3_main_page">
        <p class="lab3-subtitle">Карточки ниже загружаются Fetch-запросом через Vite proxy.</p>
        <div class="lab3-grid" id="lab3_cards"></div>
      </section>
    `}clickCard(t){const e=t.target.closest("[data-product-id]");if(!e)return;const o=Number(e.dataset.productId);new j(this.parent,o,()=>this.render()).render()}renderData(t){const e=document.getElementById("lab3_cards");e&&(e.innerHTML="",t.forEach(o=>{new M(e,o,this.clickCard.bind(this)).render()}))}renderError(t){const e=document.getElementById("lab3_cards");e&&(e.innerHTML=`<p class="lab3-status">${t}</p>`)}render(){this.parent.innerHTML="",this.parent.insertAdjacentHTML("afterbegin",this.getHTML());const t=document.getElementById("lab3_cards");t.innerHTML='<p class="lab3-status">Загрузка сервисов через Fetch API...</p>',this.getData()}}const E=document.getElementById("lab3_root");E&&new z(E).render();
