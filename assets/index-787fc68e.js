(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const O=window,_=O.trustedTypes,Z=_?_.createPolicy("lit-html",{createHTML:i=>i}):void 0,I="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,Q="?"+x,st=`<${Q}>`,C=document,P=()=>C.createComment(""),B=i=>i===null||typeof i!="object"&&typeof i!="function",tt=Array.isArray,rt=i=>tt(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",D=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,G=/-->/g,V=/>/g,A=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),W=/'/g,J=/"/g,et=/^(?:script|style|textarea|title)$/i,lt=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),y=lt(1),M=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),F=new WeakMap,w=C.createTreeWalker(C,129,null,!1),at=(i,t)=>{const e=i.length-1,n=[];let o,s=t===2?"<svg>":"",r=H;for(let c=0;c<e;c++){const a=i[c];let p,d,h=-1,l=0;for(;l<a.length&&(r.lastIndex=l,d=r.exec(a),d!==null);)l=r.lastIndex,r===H?d[1]==="!--"?r=G:d[1]!==void 0?r=V:d[2]!==void 0?(et.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=A):d[3]!==void 0&&(r=A):r===A?d[0]===">"?(r=o??H,h=-1):d[1]===void 0?h=-2:(h=r.lastIndex-d[2].length,p=d[1],r=d[3]===void 0?A:d[3]==='"'?J:W):r===J||r===W?r=A:r===G||r===V?r=H:(r=A,o=void 0);const f=r===A&&i[c+1].startsWith("/>")?" ":"";s+=r===H?a+st:h>=0?(n.push(p),a.slice(0,h)+I+a.slice(h)+x+f):a+x+(h===-2?(n.push(void 0),c):f)}const u=s+(i[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Z!==void 0?Z.createHTML(u):u,n]};class R{constructor({strings:t,_$litType$:e},n){let o;this.parts=[];let s=0,r=0;const u=t.length-1,c=this.parts,[a,p]=at(t,e);if(this.el=R.createElement(a,n),w.currentNode=this.el.content,e===2){const d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(o=w.nextNode())!==null&&c.length<u;){if(o.nodeType===1){if(o.hasAttributes()){const d=[];for(const h of o.getAttributeNames())if(h.endsWith(I)||h.startsWith(x)){const l=p[r++];if(d.push(h),l!==void 0){const f=o.getAttribute(l.toLowerCase()+I).split(x),g=/([.?@])?(.*)/.exec(l);c.push({type:1,index:s,name:g[2],strings:f,ctor:g[1]==="."?dt:g[1]==="?"?ht:g[1]==="@"?pt:j})}else c.push({type:6,index:s})}for(const h of d)o.removeAttribute(h)}if(et.test(o.tagName)){const d=o.textContent.split(x),h=d.length-1;if(h>0){o.textContent=_?_.emptyScript:"";for(let l=0;l<h;l++)o.append(d[l],P()),w.nextNode(),c.push({type:2,index:++s});o.append(d[h],P())}}}else if(o.nodeType===8)if(o.data===Q)c.push({type:2,index:s});else{let d=-1;for(;(d=o.data.indexOf(x,d+1))!==-1;)c.push({type:7,index:s}),d+=x.length-1}s++}}static createElement(t,e){const n=C.createElement("template");return n.innerHTML=t,n}}function T(i,t,e=i,n){var o,s,r,u;if(t===M)return t;let c=n!==void 0?(o=e._$Co)===null||o===void 0?void 0:o[n]:e._$Cl;const a=B(t)?void 0:t._$litDirective$;return(c==null?void 0:c.constructor)!==a&&((s=c==null?void 0:c._$AO)===null||s===void 0||s.call(c,!1),a===void 0?c=void 0:(c=new a(i),c._$AT(i,e,n)),n!==void 0?((r=(u=e)._$Co)!==null&&r!==void 0?r:u._$Co=[])[n]=c:e._$Cl=c),c!==void 0&&(t=T(i,c._$AS(i,t.values),c,n)),t}class ct{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:n},parts:o}=this._$AD,s=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:C).importNode(n,!0);w.currentNode=s;let r=w.nextNode(),u=0,c=0,a=o[0];for(;a!==void 0;){if(u===a.index){let p;a.type===2?p=new L(r,r.nextSibling,this,t):a.type===1?p=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(p=new ft(r,this,t)),this._$AV.push(p),a=o[++c]}u!==(a==null?void 0:a.index)&&(r=w.nextNode(),u++)}return s}v(t){let e=0;for(const n of this._$AV)n!==void 0&&(n.strings!==void 0?(n._$AI(t,n,e),e+=n.strings.length-2):n._$AI(t[e])),e++}}class L{constructor(t,e,n,o){var s;this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=n,this.options=o,this._$Cp=(s=o==null?void 0:o.isConnected)===null||s===void 0||s}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),B(t)?t===v||t==null||t===""?(this._$AH!==v&&this._$AR(),this._$AH=v):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):rt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==v&&B(this._$AH)?this._$AA.nextSibling.data=t:this.$(C.createTextNode(t)),this._$AH=t}g(t){var e;const{values:n,_$litType$:o}=t,s=typeof o=="number"?this._$AC(t):(o.el===void 0&&(o.el=R.createElement(o.h,this.options)),o);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===s)this._$AH.v(n);else{const r=new ct(s,this),u=r.u(this.options);r.v(n),this.$(u),this._$AH=r}}_$AC(t){let e=F.get(t.strings);return e===void 0&&F.set(t.strings,e=new R(t)),e}T(t){tt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let n,o=0;for(const s of t)o===e.length?e.push(n=new L(this.k(P()),this.k(P()),this,this.options)):n=e[o],n._$AI(s),o++;o<e.length&&(this._$AR(n&&n._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var n;for((n=this._$AP)===null||n===void 0||n.call(this,!1,!0,e);t&&t!==this._$AB;){const o=t.nextSibling;t.remove(),t=o}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class j{constructor(t,e,n,o,s){this.type=1,this._$AH=v,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=v}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,n,o){const s=this.strings;let r=!1;if(s===void 0)t=T(this,t,e,0),r=!B(t)||t!==this._$AH&&t!==M,r&&(this._$AH=t);else{const u=t;let c,a;for(t=s[0],c=0;c<s.length-1;c++)a=T(this,u[n+c],e,c),a===M&&(a=this._$AH[c]),r||(r=!B(a)||a!==this._$AH[c]),a===v?t=v:t!==v&&(t+=(a??"")+s[c+1]),this._$AH[c]=a}r&&!o&&this.j(t)}j(t){t===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class dt extends j{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===v?void 0:t}}const ut=_?_.emptyScript:"";class ht extends j{constructor(){super(...arguments),this.type=4}j(t){t&&t!==v?this.element.setAttribute(this.name,ut):this.element.removeAttribute(this.name)}}class pt extends j{constructor(t,e,n,o,s){super(t,e,n,o,s),this.type=5}_$AI(t,e=this){var n;if((t=(n=T(this,t,e,0))!==null&&n!==void 0?n:v)===M)return;const o=this._$AH,s=t===v&&o!==v||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,r=t!==v&&(o===v||s);s&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,n;typeof this._$AH=="function"?this._$AH.call((n=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&n!==void 0?n:this.element,t):this._$AH.handleEvent(t)}}class ft{constructor(t,e,n){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}}const q=O.litHtmlPolyfillSupport;q==null||q(R,L),((z=O.litHtmlVersions)!==null&&z!==void 0?z:O.litHtmlVersions=[]).push("2.7.3");const vt=(i,t,e)=>{var n,o;const s=(n=e==null?void 0:e.renderBefore)!==null&&n!==void 0?n:t;let r=s._$litPart$;if(r===void 0){const u=(o=e==null?void 0:e.renderBefore)!==null&&o!==void 0?o:null;s._$litPart$=r=new L(t.insertBefore(P(),u),u,void 0,e??{})}return r._$AI(i),r};/*! canvas-to-bmp version 1.0 ALPHA
    (c) 2015 Ken "Epistemex" Fyrstenberg
    MIT License (this header required)
*/var $t={toArrayBuffer:function(i){var t=i.width,e=i.height,n=t*4,o=i.getContext("2d").getImageData(0,0,t,e),s=new Uint32Array(o.data.buffer),r=Math.floor((32*t+31)/32)*4,u=r*e,c=122+u,a=new ArrayBuffer(c),p=new DataView(a),d=0,h,l=0,f,g=0,m,N;for(S(19778),$(c),d+=4,$(122),$(108),$(t),$(-e>>>0),S(1),S(32),$(3),$(u),$(2835),$(2835),d+=8,$(16711680),$(65280),$(255),$(4278190080),$(1466527264);l<e;){for(f=122+l*r,h=0;h<n;)N=s[g++],m=N>>>24,p.setUint32(f+h,N<<8|m),h+=4;l++}return a;function S(b){p.setUint16(d,b,!0),d+=2}function $(b){p.setUint32(d,b,!0),d+=4}},toBlob:function(i){return new Blob([this.toArrayBuffer(i)],{type:"image/bmp"})},toDataURL:function(i){for(var t=new Uint8Array(this.toArrayBuffer(i)),e="",n=0,o=t.length;n<o;)e+=String.fromCharCode(t[n++]);return"data:image/bmp;base64,"+btoa(e)}};const it=i=>i.composedPath()[0],gt=(i,t)=>it(i).matches(t),nt=i=>(t,e,n,o)=>{i.addEventListener(t,s=>{s.trigger=it(s),(e===""||gt(s,e))&&n(s)},o??{})},Y=(i,t)=>{const e=i.toImageData(t),n=document.createElement("canvas"),o=n.getContext("2d");return n.width=i.width,n.height=i.height,o.putImageData(e,0,0),n},mt=(i,t)=>Y(i,t).toDataURL("image/jpeg",1),yt=(i,t)=>{const e=Y(i,t);return $t.toDataURL(e)},xt=(i,t)=>Y(i,t).toDataURL("image/png"),At=(i,t)=>{const e={pixels:i.pixels,width:i.width,height:i.height,palette:t};return"data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(e))},bt=(i,t)=>{const e=i.make2d().map(n=>n.join("")).join(`
`);return"data:text/plain;charset=utf-8,"+encodeURIComponent(e)},K={txt:bt,bmp:yt,json:At,png:xt,jpg:mt};function wt(i,t){const e=nt(i);let n=!1,o=1,s=0,r=0,u={x:0,y:0};function c(l){l.style.transformOrigin="0px 0px",l.style.transform=`translate(${s}px, ${r}px) scale(${o})`}function a(){const l=document.querySelectorAll(".transform-group");for(const f of l)c(f)}function p({x:l,y:f}){let g=(l-s)/o,m=(f-r)/o;return{x:g,y:m}}e("pointerdown","",l=>{if(t.activeTool!=="move"&&l.target.id!=="workspace"||l.shiftKey||l.button===2)return;let f=l.currentTarget.getBoundingClientRect();const g=l.pageX-f.left,m=l.pageY-f.top;n=!0,u={x:g-s,y:m-r}}),e("pointermove","",l=>{if(!n)return;let f=l.currentTarget.getBoundingClientRect();const g=l.pageX-f.left,m=l.pageY-f.top;s=g-u.x,r=m-u.y,a()}),e("pointerup","",l=>{n=!1}),e("mouseleave","#workspace",l=>{n=!1}),e("wheel","",l=>{let f=(l.offsetX-s)/o,g=(l.offsetY-r)/o;Math.sign(l.deltaY)<0?o*=1.03:o/=1.03,s=l.offsetX-f*o,r=l.offsetY-g*o,a(),l.preventDefault()},{passive:!1});function d(l){o=l.scale,s=l.x,r=l.y,a()}function h(l){const f=i.getBoundingClientRect(),g=l.x[1]-l.x[0],m=l.y[1]-l.y[0],N=f.width/g,S=f.height/m,$=Math.min(N,S)*.95;o=$;const b={x:(l.x[0]+l.x[1])/2*$-f.width/2,y:(l.y[0]+l.y[1])/2*$-f.height/2};s=-b.x,r=-b.y,a()}return{scale:()=>o,x:()=>s,y:()=>r,setScaleXY:h,toWorkspaceCoords:p,setPanZoom:d}}function _t(i,t,e){const n=nt(i);let o=!1,s={x:0,y:0};function r(a){let p=i.getBoundingClientRect();return{x:Math.floor((a.clientX-p.left)/t.pixelScale/t.panZoom.scale()),y:Math.floor((a.clientY-p.top)/t.pixelScale/t.panZoom.scale())}}function u(){e("snapshot"),o=!0}function c(){o=!1}n("pointerdown","",a=>{t.activeTool!=="move"&&(u(),s=r(a),e("applyTool",s))}),n("pointermove","",a=>{if(!o)return;let p=r(a);p.x==s.x&&p.y==s.y||(s=p,e("applyTool",s))}),n("pointerleave","",a=>{o&&c()}),n("pointerup","",a=>{o&&c()})}const Ct={undo:i=>i.history.length===0?{}:{bitmap:i.history[0],history:i.history.slice(1)},setActiveColor:(i,t)=>({activeColor:t}),addColor:(i,t)=>({palette:[...i.palette,t]}),updateColor:(i,{paletteIndex:t,component:e,newVal:n})=>{let o=[...i.palette];return o[t][e]=Number(n),{palette:o}},setActiveTool:(i,t)=>({activeTool:t}),applyTool:(i,t)=>({bitmap:i.bitmap[i.activeTool](t,i.activeColor)}),snapshot:i=>({history:[i.bitmap,...i.history]}),resize:(i,t)=>({bitmap:i.bitmap.resize(t[0],t[1]),history:[i.bitmap,...i.history]}),centerCanvas:i=>(i.panZoom.setScaleXY({x:[0,i.bitmap.width*i.pixelScale],y:[0,i.bitmap.height*i.pixelScale]}),{}),download:(i,t)=>{if(!K.hasOwnProperty(t)){console.log("Oops! I don't know how to export to",t);return}let e=document.createElement("a");return e.setAttribute("href",K[t](i.bitmap,i.palette)),e.setAttribute("download",`${i.title}.${t}`),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e),{}}};function Tt({r:i,g:t,b:e,a:n},o){return y`<div
    tabindex="0"
    draggable="false"
    class="color-picker"
    style="--r: ${i}; --g: ${t}; --b: ${e}; --a: ${n};">
    <div
      class="color-preview"
      style="--color-preview: rgb(${i*100}% ${t*100}% ${e*100}% / ${n}); font-size: 2rem;"></div>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-r fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        data-component="r"
        draggable="false"
        @input=${o}
        value=${i}
        style="--stops: rgb(0% ${t*100}% ${e*100}% / ${n}), rgb(100% ${t*100}% ${e*100}% / ${n});" />
    </label>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-g fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        data-component="g"
        draggable="false"
        @input=${o}
        value=${t}
        style="--stops: rgb(${i*100}% 0% ${e*100}% / ${n}), rgb(${i*100}% 100% ${e*100}% / ${n});" />
    </label>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-b fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        data-component="b"
        @input=${o}
        value=${e}
        style="--stops: rgb(${i*100}% ${t*100}% 0% / ${n}), rgb(${i*100}% ${t*100}% 100% / ${n});" />
    </label>
    <label class="color-slider-label">
      <span>
        <i class="fa-solid fa-a fa-1x"></i>
      </span>
      <input
        class="color-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        @input=${o}
        data-component="a"
        value=${n}
        style="--stops: rgb(${i*100}% ${t*100}% ${e*100}% / 0), rgb(${i*100}% ${t*100}% ${e*100}% / 1);" />
    </label>
  </div>`}function Nt(i,t){return y`<div class="flex-buttons">
    <button @click=${()=>t("undo")}>
      <i class="fa-solid fa-rotate-left"></i>
    </button>
    <button @click=${()=>t("centerCanvas")}>
      <i class="fa-solid fa-arrows-to-dot"></i>
    </button>
  </div>`}function St(i,t){return y`<div>
    <div class="control-header">
      <span>Size</span>
    </div>
    <div id="size">
      <div
        class="input-spinner"
        @click=${()=>t("resize",[i.bitmap.width-1,i.bitmap.height],()=>t("centerCanvas"))}>
        <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
      </div>
      <input
        type="text"
        inputmode="numeric"
        min="1"
        step="1"
        id="width"
        @change=${e=>t("resize",[Number(e.target.value),i.bitmap.height],()=>t("centerCanvas"))}
        value=${i.bitmap.width} />
      <div
        class="input-spinner"
        @click=${()=>t("resize",[i.bitmap.width+1,i.bitmap.height],()=>t("centerCanvas"))}>
        <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
      </div>
      <span>by</span>
      <div
        class="input-spinner"
        @click=${()=>t("resize",[i.bitmap.width,i.bitmap.height-1],()=>t("centerCanvas"))}>
        <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
      </div>
      <input
        type="text"
        inputmode="numeric"
        min="1"
        step="1"
        @change=${e=>t("resize",[i.bitmap.width,Number(e.target.value)],()=>t("centerCanvas"))}
        value=${i.bitmap.height} />
      <div
        class="input-spinner"
        @click=${()=>t("resize",[i.bitmap.width,i.bitmap.height+1],()=>t("centerCanvas"))}>
        <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
      </div>
    </div>
  </div>`}function Ht(i,t){return y` <div>
    <div class="control-header">
      <span>Tools</span>
    </div>
    <div id="tools">
      <div
        class="tool-select ${i.activeTool=="brush"?"selected":"not-selected"}"
        @click=${()=>t("setActiveTool","brush")}>
        <i class="fa-solid fa-paintbrush"></i>
      </div>
      <div
        class="tool-select ${i.activeTool=="move"?"selected":"not-selected"}"
        @click=${()=>t("setActiveTool","move")}>
        <i class="fa-solid fa-up-down-left-right"></i>
      </div>
      <div
        class="tool-select ${i.activeTool=="flood"?"selected":"not-selected"}"
        @click=${()=>t("setActiveTool","flood")}>
        <i class="fa-solid fa-fill-drip"></i>
      </div>
    </div>
  </div>`}function kt(i,t){return y` <div>
    <div class="control-header">
      <span>Palette</span>
      <span
        class="add-color"
        @click=${()=>t("addColor",{r:1,g:1,b:1,a:1})}>
        <i class="fa-solid fa-plus"></i>
      </span>
    </div>
    <div id="palette" class="palette">
      ${i.palette.map((e,n)=>y`<div
            class="palette-color ${n===i.activeColor?"active-color":""}"
            data-color=${n}
            style="--r: ${e.r}; --g: ${e.g}; --b: ${e.b}; --a: ${e.a}"
            @click=${()=>t("setActiveColor",Number(n))}>
            ${n===0?v:y`<div class="edit-color-container">
                  <a class="edit-button" href="#">
                    <i class="fa-solid fa-pen fa-fw fa-2xs"></i>
                  </a>
                  ${Tt(i.palette[n],o=>t("updateColor",{paletteIndex:n,component:o.target.dataset.component,newVal:o.target.value}))}
                </div>`}
          </div>`)}
    </div>
  </div>`}function Pt(i,t){return y`<div id="export">
    <div class="control-header">
      <span>Export</span>
    </div>
    <div class="flex-buttons">
      <button @click=${()=>t("download","txt")}>TXT</button>
      <button @click=${()=>t("download","jpg")}>JPG</button>
      <button @click=${()=>t("download","png")}>PNG</button>
      <button @click=${()=>t("download","bmp")}>BMP</button>
      <button @click=${()=>t("download","json")}>JSON</button>
    </div>
  </div>`}function Bt(i,t){return y`${Nt(i,t)} ${St(i,t)}
  ${Ht(i,t)} ${kt(i,t)}
  ${Pt(i,t)}`}function Mt(i,t){return y`<div class="container">
    <div id="controls">${Bt(i,t)}</div>
    <div id="workspace">
      <canvas id="canvas" class="transform-group"></canvas>
    </div>
  </div> `}class k{constructor(t,e,n){this.width=t,this.height=e,this.pixels=n}static empty(t,e,n){let o=new Array(t*e).fill(n);return new k(t,e,o)}resize(t,e){let n=[];for(let o=0;o<e;o++)for(let s=0;s<t;s++)o>=this.height||s>=this.width?n.push(0):n.push(this.pixel(s,o));return new k(t,e,n)}make2d(){let t=this.pixels.slice(),e=[];for(;t.length>0;)e.push(t.splice(0,this.width));return e}toImageData(t){const e=new Uint8ClampedArray(this.pixels.length*4);for(let n=0;n<this.pixels.length;n+=1){let{r:o,g:s,b:r,a:u}=t[this.pixels[n]];e[n*4+0]=o*255,e[n*4+1]=s*255,e[n*4+2]=r*255,e[n*4+3]=u*255}return new ImageData(e,this.width)}pixel(t,e){return this.pixels[t+e*this.width]}draw(t){let e=this.pixels.slice();for(let{x:n,y:o,color:s}of t)e[n+o*this.width]=s;return new k(this.width,this.height,e)}brush({x:t,y:e},n){let o={x:t,y:e,color:n};return this.draw([o])}flood({x:t,y:e},n){const o=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];let s=this.pixel(t,e),r=[{x:t,y:e,color:n}];for(let u=0;u<r.length;u++)for(let{dx:c,dy:a}of o){let p=r[u].x+c,d=r[u].y+a;p>=0&&p<this.width&&d>=0&&d<this.height&&this.pixel(p,d)==s&&!r.some(h=>h.x==p&&h.y==d)&&r.push({x:p,y:d,color:n})}return this.draw(r)}}const Rt=[{r:0,g:0,b:0,a:0},{r:0,g:0,b:0,a:1},{r:1,g:0,b:0,a:1},{r:0,g:1,b:0,a:1},{r:0,g:0,b:1,a:1},{r:1,g:1,b:0,a:1},{r:1,g:0,b:1,a:1},{r:0,g:1,b:1,a:1}],U={title:"untitled",activeTool:"brush",activeColor:1,bitmap:k.empty(16,16,0),panZoom:null,canvas:null,pixelScale:30,palette:Rt,history:[]};let X=null;function ot(i,t){vt(Mt(i,t),document.body)}function Ut(i,t,e){const n=i.palette[i.bitmap.pixel(t,e)];return`rgb(${n.r*255} ${n.g*255} ${n.b*255} / ${n.a})`}function Lt(i,{x:t,y:e},n,o){let s=i.getContext("2d");s.fillStyle=o,s.fillRect(t*n,e*n,n,n)}function Et(i,t){t.width=i.bitmap.width*i.pixelScale,t.height=i.bitmap.height*i.pixelScale;for(let e=0;e<i.bitmap.height;e++)for(let n=0;n<i.bitmap.width;n++){const o=Ut(i,n,e);Lt(t,{x:n,y:e},i.pixelScale,o)}}function Ot(){ot(U,E),Et(U,X)}function E(i,t,e){const n=Ct[i](U,t);Object.assign(U,n),Ot(),e&&e()}function jt(i){ot(i,E),X=document.getElementById("canvas"),i.panZoom=wt(document.getElementById("workspace"),i),_t(X,i,E),E("centerCanvas")}jt(U);
