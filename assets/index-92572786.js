(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const M=window,_=M.trustedTypes,I=_?_.createPolicy("lit-html",{createHTML:e=>e}):void 0,z="$lit$",g=`lit$${(Math.random()+"").slice(9)}$`,V="?"+g,nt=`<${V}>`,x=document,H=()=>x.createComment(""),S=e=>e===null||typeof e!="object"&&typeof e!="function",D=Array.isArray,st=e=>D(e)||typeof(e==null?void 0:e[Symbol.iterator])=="function",R=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X=/-->/g,U=/>/g,A=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Z=/'/g,j=/"/g,q=/^(?:script|style|textarea|title)$/i,ot=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),y=ot(1),N=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),W=new WeakMap,b=x.createTreeWalker(x,129,null,!1),rt=(e,t)=>{const i=e.length-1,s=[];let n,o=t===2?"<svg>":"",r=C;for(let l=0;l<i;l++){const c=e[l];let v,d,p=-1,a=0;for(;a<c.length&&(r.lastIndex=a,d=r.exec(c),d!==null);)a=r.lastIndex,r===C?d[1]==="!--"?r=X:d[1]!==void 0?r=U:d[2]!==void 0?(q.test(d[2])&&(n=RegExp("</"+d[2],"g")),r=A):d[3]!==void 0&&(r=A):r===A?d[0]===">"?(r=n??C,p=-1):d[1]===void 0?p=-2:(p=r.lastIndex-d[2].length,v=d[1],r=d[3]===void 0?A:d[3]==='"'?j:Z):r===j||r===Z?r=A:r===X||r===U?r=C:(r=A,n=void 0);const u=r===A&&e[l+1].startsWith("/>")?" ":"";o+=r===C?c+nt:p>=0?(s.push(v),c.slice(0,p)+z+c.slice(p)+g+u):c+g+(p===-2?(s.push(void 0),l):u)}const h=o+(e[i]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[I!==void 0?I.createHTML(h):h,s]};class k{constructor({strings:t,_$litType$:i},s){let n;this.parts=[];let o=0,r=0;const h=t.length-1,l=this.parts,[c,v]=rt(t,i);if(this.el=k.createElement(c,s),b.currentNode=this.el.content,i===2){const d=this.el.content,p=d.firstChild;p.remove(),d.append(...p.childNodes)}for(;(n=b.nextNode())!==null&&l.length<h;){if(n.nodeType===1){if(n.hasAttributes()){const d=[];for(const p of n.getAttributeNames())if(p.endsWith(z)||p.startsWith(g)){const a=v[r++];if(d.push(p),a!==void 0){const u=n.getAttribute(a.toLowerCase()+z).split(g),$=/([.?@])?(.*)/.exec(a);l.push({type:1,index:o,name:$[2],strings:u,ctor:$[1]==="."?at:$[1]==="?"?dt:$[1]==="@"?ht:B})}else l.push({type:6,index:o})}for(const p of d)n.removeAttribute(p)}if(q.test(n.tagName)){const d=n.textContent.split(g),p=d.length-1;if(p>0){n.textContent=_?_.emptyScript:"";for(let a=0;a<p;a++)n.append(d[a],H()),b.nextNode(),l.push({type:2,index:++o});n.append(d[p],H())}}}else if(n.nodeType===8)if(n.data===V)l.push({type:2,index:o});else{let d=-1;for(;(d=n.data.indexOf(g,d+1))!==-1;)l.push({type:7,index:o}),d+=g.length-1}o++}}static createElement(t,i){const s=x.createElement("template");return s.innerHTML=t,s}}function w(e,t,i=e,s){var n,o,r,h;if(t===N)return t;let l=s!==void 0?(n=i._$Co)===null||n===void 0?void 0:n[s]:i._$Cl;const c=S(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),c===void 0?l=void 0:(l=new c(e),l._$AT(e,i,s)),s!==void 0?((r=(h=i)._$Co)!==null&&r!==void 0?r:h._$Co=[])[s]=l:i._$Cl=l),l!==void 0&&(t=w(e,l._$AS(e,t.values),l,s)),t}class lt{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:n}=this._$AD,o=((i=t==null?void 0:t.creationScope)!==null&&i!==void 0?i:x).importNode(s,!0);b.currentNode=o;let r=b.nextNode(),h=0,l=0,c=n[0];for(;c!==void 0;){if(h===c.index){let v;c.type===2?v=new P(r,r.nextSibling,this,t):c.type===1?v=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(v=new pt(r,this,t)),this._$AV.push(v),c=n[++l]}h!==(c==null?void 0:c.index)&&(r=b.nextNode(),h++)}return o}v(t){let i=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class P{constructor(t,i,s,n){var o;this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=n,this._$Cp=(o=n==null?void 0:n.isConnected)===null||o===void 0||o}get _$AU(){var t,i;return(i=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&i!==void 0?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=w(this,t,i),S(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==N&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):st(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==f&&S(this._$AH)?this._$AA.nextSibling.data=t:this.$(x.createTextNode(t)),this._$AH=t}g(t){var i;const{values:s,_$litType$:n}=t,o=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=k.createElement(n.h,this.options)),n);if(((i=this._$AH)===null||i===void 0?void 0:i._$AD)===o)this._$AH.v(s);else{const r=new lt(o,this),h=r.u(this.options);r.v(s),this.$(h),this._$AH=r}}_$AC(t){let i=W.get(t.strings);return i===void 0&&W.set(t.strings,i=new k(t)),i}T(t){D(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,n=0;for(const o of t)n===i.length?i.push(s=new P(this.k(H()),this.k(H()),this,this.options)):s=i[n],s._$AI(o),n++;n<i.length&&(this._$AR(s&&s._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,i){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,i);t&&t!==this._$AB;){const n=t.nextSibling;t.remove(),t=n}}setConnected(t){var i;this._$AM===void 0&&(this._$Cp=t,(i=this._$AP)===null||i===void 0||i.call(this,t))}}class B{constructor(t,i,s,n,o){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=i,this._$AM=n,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,n){const o=this.strings;let r=!1;if(o===void 0)t=w(this,t,i,0),r=!S(t)||t!==this._$AH&&t!==N,r&&(this._$AH=t);else{const h=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=w(this,h[s+l],i,l),c===N&&(c=this._$AH[l]),r||(r=!S(c)||c!==this._$AH[l]),c===f?t=f:t!==f&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!n&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class at extends B{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}const ct=_?_.emptyScript:"";class dt extends B{constructor(){super(...arguments),this.type=4}j(t){t&&t!==f?this.element.setAttribute(this.name,ct):this.element.removeAttribute(this.name)}}class ht extends B{constructor(t,i,s,n,o){super(t,i,s,n,o),this.type=5}_$AI(t,i=this){var s;if((t=(s=w(this,t,i,0))!==null&&s!==void 0?s:f)===N)return;const n=this._$AH,o=t===f&&n!==f||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,r=t!==f&&(n===f||o);o&&this.element.removeEventListener(this.name,this,n),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var i,s;typeof this._$AH=="function"?this._$AH.call((s=(i=this.options)===null||i===void 0?void 0:i.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class pt{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}}const F=M.litHtmlPolyfillSupport;F==null||F(k,P),((L=M.litHtmlVersions)!==null&&L!==void 0?L:M.litHtmlVersions=[]).push("2.7.3");const ut=(e,t,i)=>{var s,n;const o=(s=i==null?void 0:i.renderBefore)!==null&&s!==void 0?s:t;let r=o._$litPart$;if(r===void 0){const h=(n=i==null?void 0:i.renderBefore)!==null&&n!==void 0?n:null;o._$litPart$=r=new P(t.insertBefore(H(),h),h,void 0,i??{})}return r._$AI(e),r},G=e=>e.composedPath()[0],ft=(e,t)=>G(e).matches(t),K=e=>(t,i,s,n)=>{e.addEventListener(t,o=>{o.trigger=G(o),(i===""||ft(o,i))&&s(o)},n??{})};function vt(e,t,i){const s=e.palette[e.bitmap.pixel(t,i)];return`rgb(${s.r*255} ${s.g*255} ${s.b*255} / ${s.a})`}function $t({x:e,y:t},i,s,n){let o=i.getContext("2d");o.fillStyle=n,o.fillRect(e*s,t*s,s,s)}function O(e){e.canvas.width=e.bitmap.width*e.pixelScale,e.canvas.height=e.bitmap.height*e.pixelScale;for(let t=0;t<e.bitmap.height;t++)for(let i=0;i<e.bitmap.width;i++){const s=vt(e,i,t);$t({x:i,y:t},e.canvas,e.pixelScale,s)}}function gt(e,t){const i=K(e);let s=!1,n=1,o=0,r=0,h={x:0,y:0};function l(a){a.style.transformOrigin="0px 0px",a.style.transform=`translate(${o}px, ${r}px) scale(${n})`}function c(){const a=document.querySelectorAll(".transform-group");for(const u of a)l(u)}function v({x:a,y:u}){let $=(a-o)/n,m=(u-r)/n;return{x:$,y:m}}i("pointerdown","",a=>{if(t.activeTool!=="move"&&a.target.id!=="workspace"||a.shiftKey||a.button===2)return;let u=a.currentTarget.getBoundingClientRect();const $=a.pageX-u.left,m=a.pageY-u.top;s=!0,h={x:$-o,y:m-r}}),i("pointermove","",a=>{if(!s)return;let u=a.currentTarget.getBoundingClientRect();const $=a.pageX-u.left,m=a.pageY-u.top;o=$-h.x,r=m-h.y,c()}),i("pointerup","",a=>{s=!1}),i("mouseleave","#workspace",a=>{s=!1}),i("wheel","",a=>{let u=(a.offsetX-o)/n,$=(a.offsetY-r)/n;Math.sign(a.deltaY)<0?n*=1.03:n/=1.03,o=a.offsetX-u*n,r=a.offsetY-$*n,c(),a.preventDefault()},{passive:!1});function d(a){n=a.scale,o=a.x,r=a.y,c()}function p(a){const u=e.getBoundingClientRect(),$=a.x[1]-a.x[0],m=a.y[1]-a.y[0],et=u.width/$,it=u.height/m,E=Math.min(et,it)*.95;n=E;const Y={x:(a.x[0]+a.x[1])/2*E-u.width/2,y:(a.y[0]+a.y[1])/2*E-u.height/2};o=-Y.x,r=-Y.y,c()}return{scale:()=>n,x:()=>o,y:()=>r,setScaleXY:p,toWorkspaceCoords:v,setPanZoom:d}}function mt(e,t){let i=e.r,s=e.g,n=e.b,o=e.a;return y`<div
    tabindex="0"
    draggable="false"
    class="color-picker"
    style="--r: ${i}; --g: ${s}; --b: ${n}; --a: ${o};">
    <div
      class="color-preview"
      style="--color-preview: rgb(${i*100}% ${s*100}% ${n*100}% / ${o}); font-size: 2rem;"></div>
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
        @input=${t}
        value=${i}
        style="--stops: rgb(0% ${s*100}% ${n*100}% / ${o}), rgb(100% ${s*100}% ${n*100}% / ${o});" />
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
        @input=${t}
        value=${s}
        style="--stops: rgb(${i*100}% 0% ${n*100}% / ${o}), rgb(${i*100}% 100% ${n*100}% / ${o});" />
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
        @input=${t}
        value=${n}
        style="--stops: rgb(${i*100}% ${s*100}% 0% / ${o}), rgb(${i*100}% ${s*100}% 100% / ${o});" />
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
        @input=${t}
        data-component="a"
        value=${o}
        style="--stops: rgb(${i*100}% ${s*100}% ${n*100}% / 0), rgb(${i*100}% ${s*100}% ${n*100}% / 1);" />
    </label>
  </div>`}function At(e,t){const i=K(e);let s=!1,n={x:0,y:0};function o(l){let c=e.getBoundingClientRect();return{x:Math.floor((l.clientX-c.left)/t.pixelScale/t.panZoom.scale()),y:Math.floor((l.clientY-c.top)/t.pixelScale/t.panZoom.scale())}}function r(){t.doAction("snapshot"),s=!0}function h(){s=!1}i("pointerdown","",l=>{t.activeTool!=="move"&&(r(),n=o(l),t.applyTool(n))}),i("pointermove","",l=>{if(!s)return;let c=o(l);c.x==n.x&&c.y==n.y||(n=c,t.applyTool(n))}),i("pointerleave","",l=>{s&&h()}),i("pointerup","",l=>{s&&h()})}const yt={undo:e=>e.history.length===0?{}:{bitmap:e.history[0],history:e.history.slice(1)},setActiveColor:(e,t)=>({activeColor:t}),setActiveTool:(e,t)=>({activeTool:t}),snapshot:e=>({history:[e.bitmap,...e.history]}),resize:(e,t)=>({bitmap:e.bitmap.resize(t[0],t[1]),history:[e.bitmap,...e.history]}),centerCanvas:e=>(e.panZoom.setScaleXY({x:[0,e.bitmap.width*e.pixelScale],y:[0,e.bitmap.height*e.pixelScale]}),{})};class T{constructor(t,i,s){this.width=t,this.height=i,this.pixels=s}static empty(t,i,s){let n=new Array(t*i).fill(s);return new T(t,i,n)}resize(t,i){let s=[];for(let n=0;n<i;n++)for(let o=0;o<t;o++)n>=this.height||o>=this.width?s.push(0):s.push(this.pixel(o,n));return new T(t,i,s)}pixel(t,i){return this.pixels[t+i*this.width]}draw(t){let i=this.pixels.slice();for(let{x:s,y:n,color:o}of t)i[s+n*this.width]=o;return new T(this.width,this.height,i)}brush({x:t,y:i},s){let n={x:t,y:i,color:s};return this.draw([n])}flood({x:t,y:i},s){const n=[{dx:-1,dy:0},{dx:1,dy:0},{dx:0,dy:-1},{dx:0,dy:1}];let o=this.pixel(t,i),r=[{x:t,y:i,color:s}];for(let h=0;h<r.length;h++)for(let{dx:l,dy:c}of n){let v=r[h].x+l,d=r[h].y+c;v>=0&&v<this.width&&d>=0&&d<this.height&&this.pixel(v,d)==o&&!r.some(p=>p.x==v&&p.y==d)&&r.push({x:v,y:d,color:s})}return this.draw(r)}}const bt=[{r:0,g:0,b:0,a:0},{r:0,g:0,b:0,a:1},{r:1,g:0,b:0,a:1},{r:0,g:1,b:0,a:1},{r:0,g:0,b:1,a:1},{r:1,g:1,b:0,a:1},{r:1,g:0,b:1,a:1},{r:0,g:1,b:1,a:1}],J={activeTool:"brush",activeColor:1,bitmap:T.empty(32,32,0),panZoom:null,canvas:null,pixelScale:30,palette:bt,actions:yt,history:[],syncCanvas:function(){O(this)},updateState:function(e){Object.assign(this,e)},doAction:async function(e,...t){const i=this.actions[e](this,t);this.updateState(i),this.syncCanvas()},applyTool:function(e){this.updateState({bitmap:this.bitmap[this.activeTool](e,this.activeColor)}),this.syncCanvas()}};function _t(e,t){t.activeColor=Number(e)}function xt(e){e.palette.push({r:1,g:1,b:1,a:1})}function wt(e,t,i){const s=e.target.dataset.component;t.palette[i][s]=Number(e.target.value),O(t)}function Ct(e){return y`<div id="app-title">bimp</div>
    <button @click=${()=>e.doAction("undo")}>Undo</button>
    <button @click=${()=>e.doAction("centerCanvas")}>Center</button>

    <div class="control">
      <div class="control-header">
        <span>Size</span>
      </div>
      <div id="size">
        <div
          class="input-spinner"
          @click=${()=>e.doAction("resize",e.bitmap.width-1,e.bitmap.height)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          id="width"
          @change=${t=>e.doAction("resize",Number(t.target.value),e.bitmap.height)}
          value=${e.bitmap.width} />
        <div
          class="input-spinner"
          @click=${()=>e.doAction("resize",e.bitmap.width+1,e.bitmap.height)}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
        <span>by</span>
        <div
          class="input-spinner"
          @click=${()=>e.doAction("resize",e.bitmap.width,e.bitmap.height-1)}>
          <i class="fa-solid fa-minus fa-2xs fa-fw"></i>
        </div>
        <input
          type="text"
          inputmode="numeric"
          min="1"
          step="1"
          @change=${t=>e.doAction("resize",e.bitmap.width,Number(t.target.value))}
          value=${e.bitmap.height} />
        <div
          class="input-spinner"
          @click=${()=>e.doAction("resize",e.bitmap.width,e.bitmap.height+1)}>
          <i class="fa-solid fa-plus fa-2xs fa-fw"></i>
        </div>
      </div>
    </div>
    <div class="control">
      <div class="control-header">
        <span>Tools</span>
      </div>
      <div id="tools">
        <div
          class="tool-select ${e.activeTool=="brush"?"selected":""}"
          @click=${()=>e.activeTool="brush"}>
          <i class="fa-solid fa-paintbrush"></i>
        </div>
        <div
          class="tool-select ${e.activeTool=="move"?"selected":""}"
          @click=${()=>e.activeTool="move"}>
          <i class="fa-solid fa-up-down-left-right"></i>
        </div>
        <div
          class="tool-select ${e.activeTool=="flood"?"selected":""}"
          @click=${()=>e.activeTool="flood"}>
          <i class="fa-solid fa-fill-drip"></i>
        </div>
      </div>
    </div>
    <div class="control">
      <div class="control-header">
        <span>Palette</span>
        <span class="add-color" @click=${()=>xt(e)}>
          <i class="fa-solid fa-plus"></i>
        </span>
      </div>
      <div id="palette" class="palette">
        ${e.palette.map((t,i)=>y`<div
              class="palette-color ${i===e.activeColor?"active-color":""}"
              data-color=${i}
              style="--r: ${t.r}; --g: ${t.g}; --b: ${t.b}; --a: ${t.a}"
              @click=${()=>_t(i,e)}>
              ${i===0?f:y`<div class="edit-color-container">
                    <a class="edit-button" href="#">
                      <i class="fa-solid fa-pen fa-fw fa-2xs"></i>
                    </a>
                    ${mt(e.palette[i],s=>wt(s,e,i))}
                  </div>`}
            </div>`)}
      </div>
    </div>`}function Tt(e){return y`<canvas id="canvas" class="transform-group"></canvas>`}function Ht(e){return y`<div class="container">
    <div id="controls">${Ct(e)}</div>
    <div id="workspace">${Tt()}</div>
  </div> `}function Q(e){ut(Ht(e),document.body)}function tt(){Q(J),window.requestAnimationFrame(tt)}function St(e){Q(e);let t=document.getElementById("workspace");e.canvas=document.getElementById("canvas"),e.panZoom=gt(t,e),At(canvas,e),O(e),e.doAction("centerCanvas"),window.requestAnimationFrame(tt)}St(J);
