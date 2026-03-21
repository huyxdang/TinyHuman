(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const u of l)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(l){const u={};return l.integrity&&(u.integrity=l.integrity),l.referrerPolicy&&(u.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?u.credentials="include":l.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(l){if(l.ep)return;l.ep=!0;const u=i(l);fetch(l.href,u)}})();var Qf={exports:{}},Do={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m_;function ES(){if(m_)return Do;m_=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,u){var h=null;if(u!==void 0&&(h=""+u),l.key!==void 0&&(h=""+l.key),"key"in l){u={};for(var d in l)d!=="key"&&(u[d]=l[d])}else u=l;return l=u.ref,{$$typeof:o,type:s,key:h,ref:l!==void 0?l:null,props:u}}return Do.Fragment=e,Do.jsx=i,Do.jsxs=i,Do}var g_;function TS(){return g_||(g_=1,Qf.exports=ES()),Qf.exports}var ht=TS(),Jf={exports:{}},ce={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var __;function bS(){if(__)return ce;__=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),u=Symbol.for("react.consumer"),h=Symbol.for("react.context"),d=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),y=Symbol.for("react.activity"),S=Symbol.iterator;function M(N){return N===null||typeof N!="object"?null:(N=S&&N[S]||N["@@iterator"],typeof N=="function"?N:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,x={};function v(N,at,Et){this.props=N,this.context=at,this.refs=x,this.updater=Et||E}v.prototype.isReactComponent={},v.prototype.setState=function(N,at){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,at,"setState")},v.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function B(){}B.prototype=v.prototype;function L(N,at,Et){this.props=N,this.context=at,this.refs=x,this.updater=Et||E}var w=L.prototype=new B;w.constructor=L,A(w,v.prototype),w.isPureReactComponent=!0;var q=Array.isArray;function G(){}var O={H:null,A:null,T:null,S:null},j=Object.prototype.hasOwnProperty;function U(N,at,Et){var K=Et.ref;return{$$typeof:o,type:N,key:at,ref:K!==void 0?K:null,props:Et}}function C(N,at){return U(N.type,at,N.props)}function H(N){return typeof N=="object"&&N!==null&&N.$$typeof===o}function et(N){var at={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Et){return at[Et]})}var Q=/\/+/g;function dt(N,at){return typeof N=="object"&&N!==null&&N.key!=null?et(""+N.key):at.toString(36)}function pt(N){switch(N.status){case"fulfilled":return N.value;case"rejected":throw N.reason;default:switch(typeof N.status=="string"?N.then(G,G):(N.status="pending",N.then(function(at){N.status==="pending"&&(N.status="fulfilled",N.value=at)},function(at){N.status==="pending"&&(N.status="rejected",N.reason=at)})),N.status){case"fulfilled":return N.value;case"rejected":throw N.reason}}throw N}function P(N,at,Et,K,ft){var xt=typeof N;(xt==="undefined"||xt==="boolean")&&(N=null);var Mt=!1;if(N===null)Mt=!0;else switch(xt){case"bigint":case"string":case"number":Mt=!0;break;case"object":switch(N.$$typeof){case o:case e:Mt=!0;break;case g:return Mt=N._init,P(Mt(N._payload),at,Et,K,ft)}}if(Mt)return ft=ft(N),Mt=K===""?"."+dt(N,0):K,q(ft)?(Et="",Mt!=null&&(Et=Mt.replace(Q,"$&/")+"/"),P(ft,at,Et,"",function(oe){return oe})):ft!=null&&(H(ft)&&(ft=C(ft,Et+(ft.key==null||N&&N.key===ft.key?"":(""+ft.key).replace(Q,"$&/")+"/")+Mt)),at.push(ft)),1;Mt=0;var Vt=K===""?".":K+":";if(q(N))for(var Gt=0;Gt<N.length;Gt++)K=N[Gt],xt=Vt+dt(K,Gt),Mt+=P(K,at,Et,xt,ft);else if(Gt=M(N),typeof Gt=="function")for(N=Gt.call(N),Gt=0;!(K=N.next()).done;)K=K.value,xt=Vt+dt(K,Gt++),Mt+=P(K,at,Et,xt,ft);else if(xt==="object"){if(typeof N.then=="function")return P(pt(N),at,Et,K,ft);throw at=String(N),Error("Objects are not valid as a React child (found: "+(at==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":at)+"). If you meant to render a collection of children, use an array instead.")}return Mt}function X(N,at,Et){if(N==null)return N;var K=[],ft=0;return P(N,K,"","",function(xt){return at.call(Et,xt,ft++)}),K}function F(N){if(N._status===-1){var at=N._result;at=at(),at.then(function(Et){(N._status===0||N._status===-1)&&(N._status=1,N._result=Et)},function(Et){(N._status===0||N._status===-1)&&(N._status=2,N._result=Et)}),N._status===-1&&(N._status=0,N._result=at)}if(N._status===1)return N._result.default;throw N._result}var yt=typeof reportError=="function"?reportError:function(N){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var at=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof N=="object"&&N!==null&&typeof N.message=="string"?String(N.message):String(N),error:N});if(!window.dispatchEvent(at))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",N);return}console.error(N)},Tt={map:X,forEach:function(N,at,Et){X(N,function(){at.apply(this,arguments)},Et)},count:function(N){var at=0;return X(N,function(){at++}),at},toArray:function(N){return X(N,function(at){return at})||[]},only:function(N){if(!H(N))throw Error("React.Children.only expected to receive a single React element child.");return N}};return ce.Activity=y,ce.Children=Tt,ce.Component=v,ce.Fragment=i,ce.Profiler=l,ce.PureComponent=L,ce.StrictMode=s,ce.Suspense=m,ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=O,ce.__COMPILER_RUNTIME={__proto__:null,c:function(N){return O.H.useMemoCache(N)}},ce.cache=function(N){return function(){return N.apply(null,arguments)}},ce.cacheSignal=function(){return null},ce.cloneElement=function(N,at,Et){if(N==null)throw Error("The argument must be a React element, but you passed "+N+".");var K=A({},N.props),ft=N.key;if(at!=null)for(xt in at.key!==void 0&&(ft=""+at.key),at)!j.call(at,xt)||xt==="key"||xt==="__self"||xt==="__source"||xt==="ref"&&at.ref===void 0||(K[xt]=at[xt]);var xt=arguments.length-2;if(xt===1)K.children=Et;else if(1<xt){for(var Mt=Array(xt),Vt=0;Vt<xt;Vt++)Mt[Vt]=arguments[Vt+2];K.children=Mt}return U(N.type,ft,K)},ce.createContext=function(N){return N={$$typeof:h,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null},N.Provider=N,N.Consumer={$$typeof:u,_context:N},N},ce.createElement=function(N,at,Et){var K,ft={},xt=null;if(at!=null)for(K in at.key!==void 0&&(xt=""+at.key),at)j.call(at,K)&&K!=="key"&&K!=="__self"&&K!=="__source"&&(ft[K]=at[K]);var Mt=arguments.length-2;if(Mt===1)ft.children=Et;else if(1<Mt){for(var Vt=Array(Mt),Gt=0;Gt<Mt;Gt++)Vt[Gt]=arguments[Gt+2];ft.children=Vt}if(N&&N.defaultProps)for(K in Mt=N.defaultProps,Mt)ft[K]===void 0&&(ft[K]=Mt[K]);return U(N,xt,ft)},ce.createRef=function(){return{current:null}},ce.forwardRef=function(N){return{$$typeof:d,render:N}},ce.isValidElement=H,ce.lazy=function(N){return{$$typeof:g,_payload:{_status:-1,_result:N},_init:F}},ce.memo=function(N,at){return{$$typeof:p,type:N,compare:at===void 0?null:at}},ce.startTransition=function(N){var at=O.T,Et={};O.T=Et;try{var K=N(),ft=O.S;ft!==null&&ft(Et,K),typeof K=="object"&&K!==null&&typeof K.then=="function"&&K.then(G,yt)}catch(xt){yt(xt)}finally{at!==null&&Et.types!==null&&(at.types=Et.types),O.T=at}},ce.unstable_useCacheRefresh=function(){return O.H.useCacheRefresh()},ce.use=function(N){return O.H.use(N)},ce.useActionState=function(N,at,Et){return O.H.useActionState(N,at,Et)},ce.useCallback=function(N,at){return O.H.useCallback(N,at)},ce.useContext=function(N){return O.H.useContext(N)},ce.useDebugValue=function(){},ce.useDeferredValue=function(N,at){return O.H.useDeferredValue(N,at)},ce.useEffect=function(N,at){return O.H.useEffect(N,at)},ce.useEffectEvent=function(N){return O.H.useEffectEvent(N)},ce.useId=function(){return O.H.useId()},ce.useImperativeHandle=function(N,at,Et){return O.H.useImperativeHandle(N,at,Et)},ce.useInsertionEffect=function(N,at){return O.H.useInsertionEffect(N,at)},ce.useLayoutEffect=function(N,at){return O.H.useLayoutEffect(N,at)},ce.useMemo=function(N,at){return O.H.useMemo(N,at)},ce.useOptimistic=function(N,at){return O.H.useOptimistic(N,at)},ce.useReducer=function(N,at,Et){return O.H.useReducer(N,at,Et)},ce.useRef=function(N){return O.H.useRef(N)},ce.useState=function(N){return O.H.useState(N)},ce.useSyncExternalStore=function(N,at,Et){return O.H.useSyncExternalStore(N,at,Et)},ce.useTransition=function(){return O.H.useTransition()},ce.version="19.2.4",ce}var v_;function Td(){return v_||(v_=1,Jf.exports=bS()),Jf.exports}var Ze=Td(),$f={exports:{}},Uo={},th={exports:{}},eh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var y_;function AS(){return y_||(y_=1,(function(o){function e(P,X){var F=P.length;P.push(X);t:for(;0<F;){var yt=F-1>>>1,Tt=P[yt];if(0<l(Tt,X))P[yt]=X,P[F]=Tt,F=yt;else break t}}function i(P){return P.length===0?null:P[0]}function s(P){if(P.length===0)return null;var X=P[0],F=P.pop();if(F!==X){P[0]=F;t:for(var yt=0,Tt=P.length,N=Tt>>>1;yt<N;){var at=2*(yt+1)-1,Et=P[at],K=at+1,ft=P[K];if(0>l(Et,F))K<Tt&&0>l(ft,Et)?(P[yt]=ft,P[K]=F,yt=K):(P[yt]=Et,P[at]=F,yt=at);else if(K<Tt&&0>l(ft,F))P[yt]=ft,P[K]=F,yt=K;else break t}}return X}function l(P,X){var F=P.sortIndex-X.sortIndex;return F!==0?F:P.id-X.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var u=performance;o.unstable_now=function(){return u.now()}}else{var h=Date,d=h.now();o.unstable_now=function(){return h.now()-d}}var m=[],p=[],g=1,y=null,S=3,M=!1,E=!1,A=!1,x=!1,v=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,L=typeof setImmediate<"u"?setImmediate:null;function w(P){for(var X=i(p);X!==null;){if(X.callback===null)s(p);else if(X.startTime<=P)s(p),X.sortIndex=X.expirationTime,e(m,X);else break;X=i(p)}}function q(P){if(A=!1,w(P),!E)if(i(m)!==null)E=!0,G||(G=!0,et());else{var X=i(p);X!==null&&pt(q,X.startTime-P)}}var G=!1,O=-1,j=5,U=-1;function C(){return x?!0:!(o.unstable_now()-U<j)}function H(){if(x=!1,G){var P=o.unstable_now();U=P;var X=!0;try{t:{E=!1,A&&(A=!1,B(O),O=-1),M=!0;var F=S;try{e:{for(w(P),y=i(m);y!==null&&!(y.expirationTime>P&&C());){var yt=y.callback;if(typeof yt=="function"){y.callback=null,S=y.priorityLevel;var Tt=yt(y.expirationTime<=P);if(P=o.unstable_now(),typeof Tt=="function"){y.callback=Tt,w(P),X=!0;break e}y===i(m)&&s(m),w(P)}else s(m);y=i(m)}if(y!==null)X=!0;else{var N=i(p);N!==null&&pt(q,N.startTime-P),X=!1}}break t}finally{y=null,S=F,M=!1}X=void 0}}finally{X?et():G=!1}}}var et;if(typeof L=="function")et=function(){L(H)};else if(typeof MessageChannel<"u"){var Q=new MessageChannel,dt=Q.port2;Q.port1.onmessage=H,et=function(){dt.postMessage(null)}}else et=function(){v(H,0)};function pt(P,X){O=v(function(){P(o.unstable_now())},X)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(P){P.callback=null},o.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<P?Math.floor(1e3/P):5},o.unstable_getCurrentPriorityLevel=function(){return S},o.unstable_next=function(P){switch(S){case 1:case 2:case 3:var X=3;break;default:X=S}var F=S;S=X;try{return P()}finally{S=F}},o.unstable_requestPaint=function(){x=!0},o.unstable_runWithPriority=function(P,X){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var F=S;S=P;try{return X()}finally{S=F}},o.unstable_scheduleCallback=function(P,X,F){var yt=o.unstable_now();switch(typeof F=="object"&&F!==null?(F=F.delay,F=typeof F=="number"&&0<F?yt+F:yt):F=yt,P){case 1:var Tt=-1;break;case 2:Tt=250;break;case 5:Tt=1073741823;break;case 4:Tt=1e4;break;default:Tt=5e3}return Tt=F+Tt,P={id:g++,callback:X,priorityLevel:P,startTime:F,expirationTime:Tt,sortIndex:-1},F>yt?(P.sortIndex=F,e(p,P),i(m)===null&&P===i(p)&&(A?(B(O),O=-1):A=!0,pt(q,F-yt))):(P.sortIndex=Tt,e(m,P),E||M||(E=!0,G||(G=!0,et()))),P},o.unstable_shouldYield=C,o.unstable_wrapCallback=function(P){var X=S;return function(){var F=S;S=X;try{return P.apply(this,arguments)}finally{S=F}}}})(eh)),eh}var S_;function RS(){return S_||(S_=1,th.exports=AS()),th.exports}var nh={exports:{}},Rn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x_;function CS(){if(x_)return Rn;x_=1;var o=Td();function e(m){var p="https://react.dev/errors/"+m;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var g=2;g<arguments.length;g++)p+="&args[]="+encodeURIComponent(arguments[g])}return"Minified React error #"+m+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function u(m,p,g){var y=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:y==null?null:""+y,children:m,containerInfo:p,implementation:g}}var h=o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(m,p){if(m==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Rn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,Rn.createPortal=function(m,p){var g=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(e(299));return u(m,p,null,g)},Rn.flushSync=function(m){var p=h.T,g=s.p;try{if(h.T=null,s.p=2,m)return m()}finally{h.T=p,s.p=g,s.d.f()}},Rn.preconnect=function(m,p){typeof m=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,s.d.C(m,p))},Rn.prefetchDNS=function(m){typeof m=="string"&&s.d.D(m)},Rn.preinit=function(m,p){if(typeof m=="string"&&p&&typeof p.as=="string"){var g=p.as,y=d(g,p.crossOrigin),S=typeof p.integrity=="string"?p.integrity:void 0,M=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;g==="style"?s.d.S(m,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:y,integrity:S,fetchPriority:M}):g==="script"&&s.d.X(m,{crossOrigin:y,integrity:S,fetchPriority:M,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Rn.preinitModule=function(m,p){if(typeof m=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var g=d(p.as,p.crossOrigin);s.d.M(m,{crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&s.d.M(m)},Rn.preload=function(m,p){if(typeof m=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var g=p.as,y=d(g,p.crossOrigin);s.d.L(m,g,{crossOrigin:y,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Rn.preloadModule=function(m,p){if(typeof m=="string")if(p){var g=d(p.as,p.crossOrigin);s.d.m(m,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:g,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else s.d.m(m)},Rn.requestFormReset=function(m){s.d.r(m)},Rn.unstable_batchedUpdates=function(m,p){return m(p)},Rn.useFormState=function(m,p,g){return h.H.useFormState(m,p,g)},Rn.useFormStatus=function(){return h.H.useHostTransitionStatus()},Rn.version="19.2.4",Rn}var M_;function wS(){if(M_)return nh.exports;M_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),nh.exports=CS(),nh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E_;function DS(){if(E_)return Uo;E_=1;var o=RS(),e=Td(),i=wS();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function u(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function h(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function d(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function m(t){if(u(t)!==t)throw Error(s(188))}function p(t){var n=t.alternate;if(!n){if(n=u(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var c=a.return;if(c===null)break;var f=c.alternate;if(f===null){if(r=c.return,r!==null){a=r;continue}break}if(c.child===f.child){for(f=c.child;f;){if(f===a)return m(c),t;if(f===r)return m(c),n;f=f.sibling}throw Error(s(188))}if(a.return!==r.return)a=c,r=f;else{for(var _=!1,b=c.child;b;){if(b===a){_=!0,a=c,r=f;break}if(b===r){_=!0,r=c,a=f;break}b=b.sibling}if(!_){for(b=f.child;b;){if(b===a){_=!0,a=f,r=c;break}if(b===r){_=!0,r=f,a=c;break}b=b.sibling}if(!_)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function g(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=g(t),n!==null)return n;t=t.sibling}return null}var y=Object.assign,S=Symbol.for("react.element"),M=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),A=Symbol.for("react.fragment"),x=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),B=Symbol.for("react.consumer"),L=Symbol.for("react.context"),w=Symbol.for("react.forward_ref"),q=Symbol.for("react.suspense"),G=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),U=Symbol.for("react.activity"),C=Symbol.for("react.memo_cache_sentinel"),H=Symbol.iterator;function et(t){return t===null||typeof t!="object"?null:(t=H&&t[H]||t["@@iterator"],typeof t=="function"?t:null)}var Q=Symbol.for("react.client.reference");function dt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Q?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case A:return"Fragment";case v:return"Profiler";case x:return"StrictMode";case q:return"Suspense";case G:return"SuspenseList";case U:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case L:return t.displayName||"Context";case B:return(t._context.displayName||"Context")+".Consumer";case w:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case O:return n=t.displayName||null,n!==null?n:dt(t.type)||"Memo";case j:n=t._payload,t=t._init;try{return dt(t(n))}catch{}}return null}var pt=Array.isArray,P=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F={pending:!1,data:null,method:null,action:null},yt=[],Tt=-1;function N(t){return{current:t}}function at(t){0>Tt||(t.current=yt[Tt],yt[Tt]=null,Tt--)}function Et(t,n){Tt++,yt[Tt]=t.current,t.current=n}var K=N(null),ft=N(null),xt=N(null),Mt=N(null);function Vt(t,n){switch(Et(xt,n),Et(ft,t),Et(K,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Bg(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Bg(n),t=Fg(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}at(K),Et(K,t)}function Gt(){at(K),at(ft),at(xt)}function oe(t){t.memoizedState!==null&&Et(Mt,t);var n=K.current,a=Fg(n,t.type);n!==a&&(Et(ft,t),Et(K,a))}function Ue(t){ft.current===t&&(at(K),at(ft)),Mt.current===t&&(at(Mt),Ao._currentValue=F)}var Dt,Zt;function z(t){if(Dt===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);Dt=n&&n[1]||"",Zt=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Dt+t+Zt}var kt=!1;function wt(t,n){if(!t||kt)return"";kt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var vt=function(){throw Error()};if(Object.defineProperty(vt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(vt,[])}catch(ot){var it=ot}Reflect.construct(t,[],vt)}else{try{vt.call()}catch(ot){it=ot}t.call(vt.prototype)}}else{try{throw Error()}catch(ot){it=ot}(vt=t())&&typeof vt.catch=="function"&&vt.catch(function(){})}}catch(ot){if(ot&&it&&typeof ot.stack=="string")return[ot.stack,it.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=r.DetermineComponentFrameRoot(),_=f[0],b=f[1];if(_&&b){var I=_.split(`
`),tt=b.split(`
`);for(c=r=0;r<I.length&&!I[r].includes("DetermineComponentFrameRoot");)r++;for(;c<tt.length&&!tt[c].includes("DetermineComponentFrameRoot");)c++;if(r===I.length||c===tt.length)for(r=I.length-1,c=tt.length-1;1<=r&&0<=c&&I[r]!==tt[c];)c--;for(;1<=r&&0<=c;r--,c--)if(I[r]!==tt[c]){if(r!==1||c!==1)do if(r--,c--,0>c||I[r]!==tt[c]){var ut=`
`+I[r].replace(" at new "," at ");return t.displayName&&ut.includes("<anonymous>")&&(ut=ut.replace("<anonymous>",t.displayName)),ut}while(1<=r&&0<=c);break}}}finally{kt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?z(a):""}function Ut(t,n){switch(t.tag){case 26:case 27:case 5:return z(t.type);case 16:return z("Lazy");case 13:return t.child!==n&&n!==null?z("Suspense Fallback"):z("Suspense");case 19:return z("SuspenseList");case 0:case 15:return wt(t.type,!1);case 11:return wt(t.type.render,!1);case 1:return wt(t.type,!0);case 31:return z("Activity");default:return""}}function bt(t){try{var n="",a=null;do n+=Ut(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Yt=Object.prototype.hasOwnProperty,Ct=o.unstable_scheduleCallback,D=o.unstable_cancelCallback,T=o.unstable_shouldYield,$=o.unstable_requestPaint,lt=o.unstable_now,gt=o.unstable_getCurrentPriorityLevel,_t=o.unstable_ImmediatePriority,Kt=o.unstable_UserBlockingPriority,Ot=o.unstable_NormalPriority,Xt=o.unstable_LowPriority,ye=o.unstable_IdlePriority,Rt=o.log,qt=o.unstable_setDisableYieldValue,Jt=null,Qt=null;function Ft(t){if(typeof Rt=="function"&&qt(t),Qt&&typeof Qt.setStrictMode=="function")try{Qt.setStrictMode(Jt,t)}catch{}}var ie=Math.clz32?Math.clz32:W,ue=Math.log,ze=Math.LN2;function W(t){return t>>>=0,t===0?32:31-(ue(t)/ze|0)|0}var Nt=256,ct=262144,St=4194304;function Lt(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Pt(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var c=0,f=t.suspendedLanes,_=t.pingedLanes;t=t.warmLanes;var b=r&134217727;return b!==0?(r=b&~f,r!==0?c=Lt(r):(_&=b,_!==0?c=Lt(_):a||(a=b&~t,a!==0&&(c=Lt(a))))):(b=r&~f,b!==0?c=Lt(b):_!==0?c=Lt(_):a||(a=r&~t,a!==0&&(c=Lt(a)))),c===0?0:n!==0&&n!==c&&(n&f)===0&&(f=c&-c,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:c}function ae(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Ye(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function un(){var t=St;return St<<=1,(St&62914560)===0&&(St=4194304),t}function Ae(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function yn(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function pi(t,n,a,r,c,f){var _=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var b=t.entanglements,I=t.expirationTimes,tt=t.hiddenUpdates;for(a=_&~a;0<a;){var ut=31-ie(a),vt=1<<ut;b[ut]=0,I[ut]=-1;var it=tt[ut];if(it!==null)for(tt[ut]=null,ut=0;ut<it.length;ut++){var ot=it[ut];ot!==null&&(ot.lane&=-536870913)}a&=~vt}r!==0&&Ir(t,r,0),f!==0&&c===0&&t.tag!==0&&(t.suspendedLanes|=f&~(_&~n))}function Ir(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-ie(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function Br(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-ie(a),c=1<<r;c&n|t[r]&n&&(t[r]|=n),a&=~c}}function Ri(t,n){var a=n&-n;return a=(a&42)!==0?1:Ya(a),(a&(t.suspendedLanes|n))!==0?0:a}function Ya(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Rs(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Fr(){var t=X.p;return t!==0?t:(t=window.event,t===void 0?32:l_(t.type))}function ja(t,n){var a=X.p;try{return X.p=t,n()}finally{X.p=a}}var mi=Math.random().toString(36).slice(2),Qe="__reactFiber$"+mi,Sn="__reactProps$"+mi,Pi="__reactContainer$"+mi,Hr="__reactEvents$"+mi,Xc="__reactListeners$"+mi,qc="__reactHandles$"+mi,Wo="__reactResources$"+mi,Za="__reactMarker$"+mi;function Gr(t){delete t[Qe],delete t[Sn],delete t[Hr],delete t[Xc],delete t[qc]}function R(t){var n=t[Qe];if(n)return n;for(var a=t.parentNode;a;){if(n=a[Pi]||a[Qe]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Wg(t);t!==null;){if(a=t[Qe])return a;t=Wg(t)}return n}t=a,a=t.parentNode}return null}function Y(t){if(t=t[Qe]||t[Pi]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function st(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function rt(t){var n=t[Wo];return n||(n=t[Wo]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function k(t){t[Za]=!0}var At=new Set,zt={};function Bt(t,n){Ht(t,n),Ht(t+"Capture",n)}function Ht(t,n){for(zt[t]=n,t=0;t<n.length;t++)At.add(n[t])}var se=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),re={},$t={};function Me(t){return Yt.call($t,t)?!0:Yt.call(re,t)?!1:se.test(t)?$t[t]=!0:(re[t]=!0,!1)}function Ee(t,n,a){if(Me(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function Xe(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function Re(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+r)}}function le(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ee(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function fn(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var c=r.get,f=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return c.call(this)},set:function(_){a=""+_,f.call(this,_)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(_){a=""+_},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function be(t){if(!t._valueTracker){var n=ee(t)?"checked":"value";t._valueTracker=fn(t,n,""+t[n])}}function zn(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=ee(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}function gi(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var Dn=/[\n"\\]/g;function gn(t){return t.replace(Dn,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Ie(t,n,a,r,c,f,_,b){t.name="",_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"?t.type=_:t.removeAttribute("type"),n!=null?_==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+le(n)):t.value!==""+le(n)&&(t.value=""+le(n)):_!=="submit"&&_!=="reset"||t.removeAttribute("value"),n!=null?An(t,_,le(n)):a!=null?An(t,_,le(a)):r!=null&&t.removeAttribute("value"),c==null&&f!=null&&(t.defaultChecked=!!f),c!=null&&(t.checked=c&&typeof c!="function"&&typeof c!="symbol"),b!=null&&typeof b!="function"&&typeof b!="symbol"&&typeof b!="boolean"?t.name=""+le(b):t.removeAttribute("name")}function Un(t,n,a,r,c,f,_,b){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){be(t);return}a=a!=null?""+le(a):"",n=n!=null?""+le(n):a,b||n===t.value||(t.value=n),t.defaultValue=n}r=r??c,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=b?t.checked:!!r,t.defaultChecked=!!r,_!=null&&typeof _!="function"&&typeof _!="symbol"&&typeof _!="boolean"&&(t.name=_),be(t)}function An(t,n,a){n==="number"&&gi(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function Je(t,n,a,r){if(t=t.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<t.length;a++)c=n.hasOwnProperty("$"+t[a].value),t[a].selected!==c&&(t[a].selected=c),c&&r&&(t[a].defaultSelected=!0)}else{for(a=""+le(a),n=null,c=0;c<t.length;c++){if(t[c].value===a){t[c].selected=!0,r&&(t[c].defaultSelected=!0);return}n!==null||t[c].disabled||(n=t[c])}n!==null&&(n.selected=!0)}}function xn(t,n,a){if(n!=null&&(n=""+le(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+le(a):""}function Cs(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(pt(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=le(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),be(t)}function In(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var v0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Pd(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||v0.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function zd(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="");for(var c in n)r=n[c],n.hasOwnProperty(c)&&a[c]!==r&&Pd(t,c,r)}else for(var f in n)n.hasOwnProperty(f)&&Pd(t,f,n[f])}function Wc(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var y0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),S0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Yo(t){return S0.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function zi(){}var Yc=null;function jc(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ws=null,Ds=null;function Id(t){var n=Y(t);if(n&&(t=n.stateNode)){var a=t[Sn]||null;t:switch(t=n.stateNode,n.type){case"input":if(Ie(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+gn(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var c=r[Sn]||null;if(!c)throw Error(s(90));Ie(r,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&zn(r)}break t;case"textarea":xn(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&Je(t,!!a.multiple,n,!1)}}}var Zc=!1;function Bd(t,n,a){if(Zc)return t(n,a);Zc=!0;try{var r=t(n);return r}finally{if(Zc=!1,(ws!==null||Ds!==null)&&(Ol(),ws&&(n=ws,t=Ds,Ds=ws=null,Id(n),t)))for(n=0;n<t.length;n++)Id(t[n])}}function Vr(t,n){var a=t.stateNode;if(a===null)return null;var r=a[Sn]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Ii=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Kc=!1;if(Ii)try{var kr={};Object.defineProperty(kr,"passive",{get:function(){Kc=!0}}),window.addEventListener("test",kr,kr),window.removeEventListener("test",kr,kr)}catch{Kc=!1}var da=null,Qc=null,jo=null;function Fd(){if(jo)return jo;var t,n=Qc,a=n.length,r,c="value"in da?da.value:da.textContent,f=c.length;for(t=0;t<a&&n[t]===c[t];t++);var _=a-t;for(r=1;r<=_&&n[a-r]===c[f-r];r++);return jo=c.slice(t,1<r?1-r:void 0)}function Zo(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Ko(){return!0}function Hd(){return!1}function Bn(t){function n(a,r,c,f,_){this._reactName=a,this._targetInst=c,this.type=r,this.nativeEvent=f,this.target=_,this.currentTarget=null;for(var b in t)t.hasOwnProperty(b)&&(a=t[b],this[b]=a?a(f):f[b]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?Ko:Hd,this.isPropagationStopped=Hd,this}return y(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ko)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ko)},persist:function(){},isPersistent:Ko}),n}var Ka={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Qo=Bn(Ka),Xr=y({},Ka,{view:0,detail:0}),x0=Bn(Xr),Jc,$c,qr,Jo=y({},Xr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:eu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==qr&&(qr&&t.type==="mousemove"?(Jc=t.screenX-qr.screenX,$c=t.screenY-qr.screenY):$c=Jc=0,qr=t),Jc)},movementY:function(t){return"movementY"in t?t.movementY:$c}}),Gd=Bn(Jo),M0=y({},Jo,{dataTransfer:0}),E0=Bn(M0),T0=y({},Xr,{relatedTarget:0}),tu=Bn(T0),b0=y({},Ka,{animationName:0,elapsedTime:0,pseudoElement:0}),A0=Bn(b0),R0=y({},Ka,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),C0=Bn(R0),w0=y({},Ka,{data:0}),Vd=Bn(w0),D0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},U0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},N0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function L0(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=N0[t])?!!n[t]:!1}function eu(){return L0}var O0=y({},Xr,{key:function(t){if(t.key){var n=D0[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Zo(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?U0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:eu,charCode:function(t){return t.type==="keypress"?Zo(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zo(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),P0=Bn(O0),z0=y({},Jo,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),kd=Bn(z0),I0=y({},Xr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:eu}),B0=Bn(I0),F0=y({},Ka,{propertyName:0,elapsedTime:0,pseudoElement:0}),H0=Bn(F0),G0=y({},Jo,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),V0=Bn(G0),k0=y({},Ka,{newState:0,oldState:0}),X0=Bn(k0),q0=[9,13,27,32],nu=Ii&&"CompositionEvent"in window,Wr=null;Ii&&"documentMode"in document&&(Wr=document.documentMode);var W0=Ii&&"TextEvent"in window&&!Wr,Xd=Ii&&(!nu||Wr&&8<Wr&&11>=Wr),qd=" ",Wd=!1;function Yd(t,n){switch(t){case"keyup":return q0.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function jd(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Us=!1;function Y0(t,n){switch(t){case"compositionend":return jd(n);case"keypress":return n.which!==32?null:(Wd=!0,qd);case"textInput":return t=n.data,t===qd&&Wd?null:t;default:return null}}function j0(t,n){if(Us)return t==="compositionend"||!nu&&Yd(t,n)?(t=Fd(),jo=Qc=da=null,Us=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Xd&&n.locale!=="ko"?null:n.data;default:return null}}var Z0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Zd(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Z0[t.type]:n==="textarea"}function Kd(t,n,a,r){ws?Ds?Ds.push(r):Ds=[r]:ws=r,n=Gl(n,"onChange"),0<n.length&&(a=new Qo("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var Yr=null,jr=null;function K0(t){Ng(t,0)}function $o(t){var n=st(t);if(zn(n))return t}function Qd(t,n){if(t==="change")return n}var Jd=!1;if(Ii){var iu;if(Ii){var au="oninput"in document;if(!au){var $d=document.createElement("div");$d.setAttribute("oninput","return;"),au=typeof $d.oninput=="function"}iu=au}else iu=!1;Jd=iu&&(!document.documentMode||9<document.documentMode)}function tp(){Yr&&(Yr.detachEvent("onpropertychange",ep),jr=Yr=null)}function ep(t){if(t.propertyName==="value"&&$o(jr)){var n=[];Kd(n,jr,t,jc(t)),Bd(K0,n)}}function Q0(t,n,a){t==="focusin"?(tp(),Yr=n,jr=a,Yr.attachEvent("onpropertychange",ep)):t==="focusout"&&tp()}function J0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return $o(jr)}function $0(t,n){if(t==="click")return $o(n)}function ty(t,n){if(t==="input"||t==="change")return $o(n)}function ey(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var jn=typeof Object.is=="function"?Object.is:ey;function Zr(t,n){if(jn(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var c=a[r];if(!Yt.call(n,c)||!jn(t[c],n[c]))return!1}return!0}function np(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ip(t,n){var a=np(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=np(a)}}function ap(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?ap(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function sp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=gi(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=gi(t.document)}return n}function su(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var ny=Ii&&"documentMode"in document&&11>=document.documentMode,Ns=null,ru=null,Kr=null,ou=!1;function rp(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ou||Ns==null||Ns!==gi(r)||(r=Ns,"selectionStart"in r&&su(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Kr&&Zr(Kr,r)||(Kr=r,r=Gl(ru,"onSelect"),0<r.length&&(n=new Qo("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=Ns)))}function Qa(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var Ls={animationend:Qa("Animation","AnimationEnd"),animationiteration:Qa("Animation","AnimationIteration"),animationstart:Qa("Animation","AnimationStart"),transitionrun:Qa("Transition","TransitionRun"),transitionstart:Qa("Transition","TransitionStart"),transitioncancel:Qa("Transition","TransitionCancel"),transitionend:Qa("Transition","TransitionEnd")},lu={},op={};Ii&&(op=document.createElement("div").style,"AnimationEvent"in window||(delete Ls.animationend.animation,delete Ls.animationiteration.animation,delete Ls.animationstart.animation),"TransitionEvent"in window||delete Ls.transitionend.transition);function Ja(t){if(lu[t])return lu[t];if(!Ls[t])return t;var n=Ls[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in op)return lu[t]=n[a];return t}var lp=Ja("animationend"),cp=Ja("animationiteration"),up=Ja("animationstart"),iy=Ja("transitionrun"),ay=Ja("transitionstart"),sy=Ja("transitioncancel"),fp=Ja("transitionend"),hp=new Map,cu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");cu.push("scrollEnd");function _i(t,n){hp.set(t,n),Bt(n,[t])}var tl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},ii=[],Os=0,uu=0;function el(){for(var t=Os,n=uu=Os=0;n<t;){var a=ii[n];ii[n++]=null;var r=ii[n];ii[n++]=null;var c=ii[n];ii[n++]=null;var f=ii[n];if(ii[n++]=null,r!==null&&c!==null){var _=r.pending;_===null?c.next=c:(c.next=_.next,_.next=c),r.pending=c}f!==0&&dp(a,c,f)}}function nl(t,n,a,r){ii[Os++]=t,ii[Os++]=n,ii[Os++]=a,ii[Os++]=r,uu|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function fu(t,n,a,r){return nl(t,n,a,r),il(t)}function $a(t,n){return nl(t,null,null,n),il(t)}function dp(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var c=!1,f=t.return;f!==null;)f.childLanes|=a,r=f.alternate,r!==null&&(r.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(c=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,c&&n!==null&&(c=31-ie(a),t=f.hiddenUpdates,r=t[c],r===null?t[c]=[n]:r.push(n),n.lane=a|536870912),f):null}function il(t){if(50<yo)throw yo=0,xf=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var Ps={};function ry(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Zn(t,n,a,r){return new ry(t,n,a,r)}function hu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Bi(t,n){var a=t.alternate;return a===null?(a=Zn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function pp(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function al(t,n,a,r,c,f){var _=0;if(r=t,typeof t=="function")hu(t)&&(_=1);else if(typeof t=="string")_=fS(t,a,K.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case U:return t=Zn(31,a,n,c),t.elementType=U,t.lanes=f,t;case A:return ts(a.children,c,f,n);case x:_=8,c|=24;break;case v:return t=Zn(12,a,n,c|2),t.elementType=v,t.lanes=f,t;case q:return t=Zn(13,a,n,c),t.elementType=q,t.lanes=f,t;case G:return t=Zn(19,a,n,c),t.elementType=G,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case L:_=10;break t;case B:_=9;break t;case w:_=11;break t;case O:_=14;break t;case j:_=16,r=null;break t}_=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=Zn(_,a,n,c),n.elementType=t,n.type=r,n.lanes=f,n}function ts(t,n,a,r){return t=Zn(7,t,r,n),t.lanes=a,t}function du(t,n,a){return t=Zn(6,t,null,n),t.lanes=a,t}function mp(t){var n=Zn(18,null,null,0);return n.stateNode=t,n}function pu(t,n,a){return n=Zn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var gp=new WeakMap;function ai(t,n){if(typeof t=="object"&&t!==null){var a=gp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:bt(n)},gp.set(t,n),n)}return{value:t,source:n,stack:bt(n)}}var zs=[],Is=0,sl=null,Qr=0,si=[],ri=0,pa=null,Ci=1,wi="";function Fi(t,n){zs[Is++]=Qr,zs[Is++]=sl,sl=t,Qr=n}function _p(t,n,a){si[ri++]=Ci,si[ri++]=wi,si[ri++]=pa,pa=t;var r=Ci;t=wi;var c=32-ie(r)-1;r&=~(1<<c),a+=1;var f=32-ie(n)+c;if(30<f){var _=c-c%5;f=(r&(1<<_)-1).toString(32),r>>=_,c-=_,Ci=1<<32-ie(n)+c|a<<c|r,wi=f+t}else Ci=1<<f|a<<c|r,wi=t}function mu(t){t.return!==null&&(Fi(t,1),_p(t,1,0))}function gu(t){for(;t===sl;)sl=zs[--Is],zs[Is]=null,Qr=zs[--Is],zs[Is]=null;for(;t===pa;)pa=si[--ri],si[ri]=null,wi=si[--ri],si[ri]=null,Ci=si[--ri],si[ri]=null}function vp(t,n){si[ri++]=Ci,si[ri++]=wi,si[ri++]=pa,Ci=n.id,wi=n.overflow,pa=t}var Mn=null,qe=null,Te=!1,ma=null,oi=!1,_u=Error(s(519));function ga(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Jr(ai(n,t)),_u}function yp(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[Qe]=t,n[Sn]=r,a){case"dialog":_e("cancel",n),_e("close",n);break;case"iframe":case"object":case"embed":_e("load",n);break;case"video":case"audio":for(a=0;a<xo.length;a++)_e(xo[a],n);break;case"source":_e("error",n);break;case"img":case"image":case"link":_e("error",n),_e("load",n);break;case"details":_e("toggle",n);break;case"input":_e("invalid",n),Un(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":_e("invalid",n);break;case"textarea":_e("invalid",n),Cs(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||zg(n.textContent,a)?(r.popover!=null&&(_e("beforetoggle",n),_e("toggle",n)),r.onScroll!=null&&_e("scroll",n),r.onScrollEnd!=null&&_e("scrollend",n),r.onClick!=null&&(n.onclick=zi),n=!0):n=!1,n||ga(t,!0)}function Sp(t){for(Mn=t.return;Mn;)switch(Mn.tag){case 5:case 31:case 13:oi=!1;return;case 27:case 3:oi=!0;return;default:Mn=Mn.return}}function Bs(t){if(t!==Mn)return!1;if(!Te)return Sp(t),Te=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||zf(t.type,t.memoizedProps)),a=!a),a&&qe&&ga(t),Sp(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));qe=qg(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));qe=qg(t)}else n===27?(n=qe,Da(t.type)?(t=Gf,Gf=null,qe=t):qe=n):qe=Mn?ci(t.stateNode.nextSibling):null;return!0}function es(){qe=Mn=null,Te=!1}function vu(){var t=ma;return t!==null&&(Vn===null?Vn=t:Vn.push.apply(Vn,t),ma=null),t}function Jr(t){ma===null?ma=[t]:ma.push(t)}var yu=N(null),ns=null,Hi=null;function _a(t,n,a){Et(yu,n._currentValue),n._currentValue=a}function Gi(t){t._currentValue=yu.current,at(yu)}function Su(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function xu(t,n,a,r){var c=t.child;for(c!==null&&(c.return=t);c!==null;){var f=c.dependencies;if(f!==null){var _=c.child;f=f.firstContext;t:for(;f!==null;){var b=f;f=c;for(var I=0;I<n.length;I++)if(b.context===n[I]){f.lanes|=a,b=f.alternate,b!==null&&(b.lanes|=a),Su(f.return,a,t),r||(_=null);break t}f=b.next}}else if(c.tag===18){if(_=c.return,_===null)throw Error(s(341));_.lanes|=a,f=_.alternate,f!==null&&(f.lanes|=a),Su(_,a,t),_=null}else _=c.child;if(_!==null)_.return=c;else for(_=c;_!==null;){if(_===t){_=null;break}if(c=_.sibling,c!==null){c.return=_.return,_=c;break}_=_.return}c=_}}function Fs(t,n,a,r){t=null;for(var c=n,f=!1;c!==null;){if(!f){if((c.flags&524288)!==0)f=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var _=c.alternate;if(_===null)throw Error(s(387));if(_=_.memoizedProps,_!==null){var b=c.type;jn(c.pendingProps.value,_.value)||(t!==null?t.push(b):t=[b])}}else if(c===Mt.current){if(_=c.alternate,_===null)throw Error(s(387));_.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(t!==null?t.push(Ao):t=[Ao])}c=c.return}t!==null&&xu(n,t,a,r),n.flags|=262144}function rl(t){for(t=t.firstContext;t!==null;){if(!jn(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function is(t){ns=t,Hi=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function En(t){return xp(ns,t)}function ol(t,n){return ns===null&&is(t),xp(t,n)}function xp(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Hi===null){if(t===null)throw Error(s(308));Hi=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Hi=Hi.next=n;return a}var oy=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},ly=o.unstable_scheduleCallback,cy=o.unstable_NormalPriority,sn={$$typeof:L,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Mu(){return{controller:new oy,data:new Map,refCount:0}}function $r(t){t.refCount--,t.refCount===0&&ly(cy,function(){t.controller.abort()})}var to=null,Eu=0,Hs=0,Gs=null;function uy(t,n){if(to===null){var a=to=[];Eu=0,Hs=Rf(),Gs={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Eu++,n.then(Mp,Mp),n}function Mp(){if(--Eu===0&&to!==null){Gs!==null&&(Gs.status="fulfilled");var t=to;to=null,Hs=0,Gs=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function fy(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(r.status="rejected",r.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),r}var Ep=P.S;P.S=function(t,n){rg=lt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&uy(t,n),Ep!==null&&Ep(t,n)};var as=N(null);function Tu(){var t=as.current;return t!==null?t:ke.pooledCache}function ll(t,n){n===null?Et(as,as.current):Et(as,n.pool)}function Tp(){var t=Tu();return t===null?null:{parent:sn._currentValue,pool:t}}var Vs=Error(s(460)),bu=Error(s(474)),cl=Error(s(542)),ul={then:function(){}};function bp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function Ap(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(zi,zi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Cp(t),t;default:if(typeof n.status=="string")n.then(zi,zi);else{if(t=ke,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=r}},function(r){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,Cp(t),t}throw rs=n,Vs}}function ss(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(rs=a,Vs):a}}var rs=null;function Rp(){if(rs===null)throw Error(s(459));var t=rs;return rs=null,t}function Cp(t){if(t===Vs||t===cl)throw Error(s(483))}var ks=null,eo=0;function fl(t){var n=eo;return eo+=1,ks===null&&(ks=[]),Ap(ks,t,n)}function no(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function hl(t,n){throw n.$$typeof===S?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function wp(t){function n(Z,V){if(t){var J=Z.deletions;J===null?(Z.deletions=[V],Z.flags|=16):J.push(V)}}function a(Z,V){if(!t)return null;for(;V!==null;)n(Z,V),V=V.sibling;return null}function r(Z){for(var V=new Map;Z!==null;)Z.key!==null?V.set(Z.key,Z):V.set(Z.index,Z),Z=Z.sibling;return V}function c(Z,V){return Z=Bi(Z,V),Z.index=0,Z.sibling=null,Z}function f(Z,V,J){return Z.index=J,t?(J=Z.alternate,J!==null?(J=J.index,J<V?(Z.flags|=67108866,V):J):(Z.flags|=67108866,V)):(Z.flags|=1048576,V)}function _(Z){return t&&Z.alternate===null&&(Z.flags|=67108866),Z}function b(Z,V,J,mt){return V===null||V.tag!==6?(V=du(J,Z.mode,mt),V.return=Z,V):(V=c(V,J),V.return=Z,V)}function I(Z,V,J,mt){var te=J.type;return te===A?ut(Z,V,J.props.children,mt,J.key):V!==null&&(V.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===j&&ss(te)===V.type)?(V=c(V,J.props),no(V,J),V.return=Z,V):(V=al(J.type,J.key,J.props,null,Z.mode,mt),no(V,J),V.return=Z,V)}function tt(Z,V,J,mt){return V===null||V.tag!==4||V.stateNode.containerInfo!==J.containerInfo||V.stateNode.implementation!==J.implementation?(V=pu(J,Z.mode,mt),V.return=Z,V):(V=c(V,J.children||[]),V.return=Z,V)}function ut(Z,V,J,mt,te){return V===null||V.tag!==7?(V=ts(J,Z.mode,mt,te),V.return=Z,V):(V=c(V,J),V.return=Z,V)}function vt(Z,V,J){if(typeof V=="string"&&V!==""||typeof V=="number"||typeof V=="bigint")return V=du(""+V,Z.mode,J),V.return=Z,V;if(typeof V=="object"&&V!==null){switch(V.$$typeof){case M:return J=al(V.type,V.key,V.props,null,Z.mode,J),no(J,V),J.return=Z,J;case E:return V=pu(V,Z.mode,J),V.return=Z,V;case j:return V=ss(V),vt(Z,V,J)}if(pt(V)||et(V))return V=ts(V,Z.mode,J,null),V.return=Z,V;if(typeof V.then=="function")return vt(Z,fl(V),J);if(V.$$typeof===L)return vt(Z,ol(Z,V),J);hl(Z,V)}return null}function it(Z,V,J,mt){var te=V!==null?V.key:null;if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return te!==null?null:b(Z,V,""+J,mt);if(typeof J=="object"&&J!==null){switch(J.$$typeof){case M:return J.key===te?I(Z,V,J,mt):null;case E:return J.key===te?tt(Z,V,J,mt):null;case j:return J=ss(J),it(Z,V,J,mt)}if(pt(J)||et(J))return te!==null?null:ut(Z,V,J,mt,null);if(typeof J.then=="function")return it(Z,V,fl(J),mt);if(J.$$typeof===L)return it(Z,V,ol(Z,J),mt);hl(Z,J)}return null}function ot(Z,V,J,mt,te){if(typeof mt=="string"&&mt!==""||typeof mt=="number"||typeof mt=="bigint")return Z=Z.get(J)||null,b(V,Z,""+mt,te);if(typeof mt=="object"&&mt!==null){switch(mt.$$typeof){case M:return Z=Z.get(mt.key===null?J:mt.key)||null,I(V,Z,mt,te);case E:return Z=Z.get(mt.key===null?J:mt.key)||null,tt(V,Z,mt,te);case j:return mt=ss(mt),ot(Z,V,J,mt,te)}if(pt(mt)||et(mt))return Z=Z.get(J)||null,ut(V,Z,mt,te,null);if(typeof mt.then=="function")return ot(Z,V,J,fl(mt),te);if(mt.$$typeof===L)return ot(Z,V,J,ol(V,mt),te);hl(V,mt)}return null}function Wt(Z,V,J,mt){for(var te=null,Ce=null,jt=V,he=V=0,xe=null;jt!==null&&he<J.length;he++){jt.index>he?(xe=jt,jt=null):xe=jt.sibling;var we=it(Z,jt,J[he],mt);if(we===null){jt===null&&(jt=xe);break}t&&jt&&we.alternate===null&&n(Z,jt),V=f(we,V,he),Ce===null?te=we:Ce.sibling=we,Ce=we,jt=xe}if(he===J.length)return a(Z,jt),Te&&Fi(Z,he),te;if(jt===null){for(;he<J.length;he++)jt=vt(Z,J[he],mt),jt!==null&&(V=f(jt,V,he),Ce===null?te=jt:Ce.sibling=jt,Ce=jt);return Te&&Fi(Z,he),te}for(jt=r(jt);he<J.length;he++)xe=ot(jt,Z,he,J[he],mt),xe!==null&&(t&&xe.alternate!==null&&jt.delete(xe.key===null?he:xe.key),V=f(xe,V,he),Ce===null?te=xe:Ce.sibling=xe,Ce=xe);return t&&jt.forEach(function(Pa){return n(Z,Pa)}),Te&&Fi(Z,he),te}function ne(Z,V,J,mt){if(J==null)throw Error(s(151));for(var te=null,Ce=null,jt=V,he=V=0,xe=null,we=J.next();jt!==null&&!we.done;he++,we=J.next()){jt.index>he?(xe=jt,jt=null):xe=jt.sibling;var Pa=it(Z,jt,we.value,mt);if(Pa===null){jt===null&&(jt=xe);break}t&&jt&&Pa.alternate===null&&n(Z,jt),V=f(Pa,V,he),Ce===null?te=Pa:Ce.sibling=Pa,Ce=Pa,jt=xe}if(we.done)return a(Z,jt),Te&&Fi(Z,he),te;if(jt===null){for(;!we.done;he++,we=J.next())we=vt(Z,we.value,mt),we!==null&&(V=f(we,V,he),Ce===null?te=we:Ce.sibling=we,Ce=we);return Te&&Fi(Z,he),te}for(jt=r(jt);!we.done;he++,we=J.next())we=ot(jt,Z,he,we.value,mt),we!==null&&(t&&we.alternate!==null&&jt.delete(we.key===null?he:we.key),V=f(we,V,he),Ce===null?te=we:Ce.sibling=we,Ce=we);return t&&jt.forEach(function(MS){return n(Z,MS)}),Te&&Fi(Z,he),te}function He(Z,V,J,mt){if(typeof J=="object"&&J!==null&&J.type===A&&J.key===null&&(J=J.props.children),typeof J=="object"&&J!==null){switch(J.$$typeof){case M:t:{for(var te=J.key;V!==null;){if(V.key===te){if(te=J.type,te===A){if(V.tag===7){a(Z,V.sibling),mt=c(V,J.props.children),mt.return=Z,Z=mt;break t}}else if(V.elementType===te||typeof te=="object"&&te!==null&&te.$$typeof===j&&ss(te)===V.type){a(Z,V.sibling),mt=c(V,J.props),no(mt,J),mt.return=Z,Z=mt;break t}a(Z,V);break}else n(Z,V);V=V.sibling}J.type===A?(mt=ts(J.props.children,Z.mode,mt,J.key),mt.return=Z,Z=mt):(mt=al(J.type,J.key,J.props,null,Z.mode,mt),no(mt,J),mt.return=Z,Z=mt)}return _(Z);case E:t:{for(te=J.key;V!==null;){if(V.key===te)if(V.tag===4&&V.stateNode.containerInfo===J.containerInfo&&V.stateNode.implementation===J.implementation){a(Z,V.sibling),mt=c(V,J.children||[]),mt.return=Z,Z=mt;break t}else{a(Z,V);break}else n(Z,V);V=V.sibling}mt=pu(J,Z.mode,mt),mt.return=Z,Z=mt}return _(Z);case j:return J=ss(J),He(Z,V,J,mt)}if(pt(J))return Wt(Z,V,J,mt);if(et(J)){if(te=et(J),typeof te!="function")throw Error(s(150));return J=te.call(J),ne(Z,V,J,mt)}if(typeof J.then=="function")return He(Z,V,fl(J),mt);if(J.$$typeof===L)return He(Z,V,ol(Z,J),mt);hl(Z,J)}return typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint"?(J=""+J,V!==null&&V.tag===6?(a(Z,V.sibling),mt=c(V,J),mt.return=Z,Z=mt):(a(Z,V),mt=du(J,Z.mode,mt),mt.return=Z,Z=mt),_(Z)):a(Z,V)}return function(Z,V,J,mt){try{eo=0;var te=He(Z,V,J,mt);return ks=null,te}catch(jt){if(jt===Vs||jt===cl)throw jt;var Ce=Zn(29,jt,null,Z.mode);return Ce.lanes=mt,Ce.return=Z,Ce}finally{}}}var os=wp(!0),Dp=wp(!1),va=!1;function Au(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Ru(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ya(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Sa(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(Ne&2)!==0){var c=r.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),r.pending=n,n=il(t),dp(t,null,a),n}return nl(t,r,n,a),il(t)}function io(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,Br(t,a)}}function Cu(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var c=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var _={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?c=f=_:f=f.next=_,a=a.next}while(a!==null);f===null?c=f=n:f=f.next=n}else c=f=n;a={baseState:r.baseState,firstBaseUpdate:c,lastBaseUpdate:f,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var wu=!1;function ao(){if(wu){var t=Gs;if(t!==null)throw t}}function so(t,n,a,r){wu=!1;var c=t.updateQueue;va=!1;var f=c.firstBaseUpdate,_=c.lastBaseUpdate,b=c.shared.pending;if(b!==null){c.shared.pending=null;var I=b,tt=I.next;I.next=null,_===null?f=tt:_.next=tt,_=I;var ut=t.alternate;ut!==null&&(ut=ut.updateQueue,b=ut.lastBaseUpdate,b!==_&&(b===null?ut.firstBaseUpdate=tt:b.next=tt,ut.lastBaseUpdate=I))}if(f!==null){var vt=c.baseState;_=0,ut=tt=I=null,b=f;do{var it=b.lane&-536870913,ot=it!==b.lane;if(ot?(Se&it)===it:(r&it)===it){it!==0&&it===Hs&&(wu=!0),ut!==null&&(ut=ut.next={lane:0,tag:b.tag,payload:b.payload,callback:null,next:null});t:{var Wt=t,ne=b;it=n;var He=a;switch(ne.tag){case 1:if(Wt=ne.payload,typeof Wt=="function"){vt=Wt.call(He,vt,it);break t}vt=Wt;break t;case 3:Wt.flags=Wt.flags&-65537|128;case 0:if(Wt=ne.payload,it=typeof Wt=="function"?Wt.call(He,vt,it):Wt,it==null)break t;vt=y({},vt,it);break t;case 2:va=!0}}it=b.callback,it!==null&&(t.flags|=64,ot&&(t.flags|=8192),ot=c.callbacks,ot===null?c.callbacks=[it]:ot.push(it))}else ot={lane:it,tag:b.tag,payload:b.payload,callback:b.callback,next:null},ut===null?(tt=ut=ot,I=vt):ut=ut.next=ot,_|=it;if(b=b.next,b===null){if(b=c.shared.pending,b===null)break;ot=b,b=ot.next,ot.next=null,c.lastBaseUpdate=ot,c.shared.pending=null}}while(!0);ut===null&&(I=vt),c.baseState=I,c.firstBaseUpdate=tt,c.lastBaseUpdate=ut,f===null&&(c.shared.lanes=0),ba|=_,t.lanes=_,t.memoizedState=vt}}function Up(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function Np(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)Up(a[t],n)}var Xs=N(null),dl=N(0);function Lp(t,n){t=Ki,Et(dl,t),Et(Xs,n),Ki=t|n.baseLanes}function Du(){Et(dl,Ki),Et(Xs,Xs.current)}function Uu(){Ki=dl.current,at(Xs),at(dl)}var Kn=N(null),li=null;function xa(t){var n=t.alternate;Et(en,en.current&1),Et(Kn,t),li===null&&(n===null||Xs.current!==null||n.memoizedState!==null)&&(li=t)}function Nu(t){Et(en,en.current),Et(Kn,t),li===null&&(li=t)}function Op(t){t.tag===22?(Et(en,en.current),Et(Kn,t),li===null&&(li=t)):Ma()}function Ma(){Et(en,en.current),Et(Kn,Kn.current)}function Qn(t){at(Kn),li===t&&(li=null),at(en)}var en=N(0);function pl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||Ff(a)||Hf(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Vi=0,fe=null,Be=null,rn=null,ml=!1,qs=!1,ls=!1,gl=0,ro=0,Ws=null,hy=0;function $e(){throw Error(s(321))}function Lu(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!jn(t[a],n[a]))return!1;return!0}function Ou(t,n,a,r,c,f){return Vi=f,fe=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,P.H=t===null||t.memoizedState===null?_m:Zu,ls=!1,f=a(r,c),ls=!1,qs&&(f=zp(n,a,r,c)),Pp(t),f}function Pp(t){P.H=co;var n=Be!==null&&Be.next!==null;if(Vi=0,rn=Be=fe=null,ml=!1,ro=0,Ws=null,n)throw Error(s(300));t===null||on||(t=t.dependencies,t!==null&&rl(t)&&(on=!0))}function zp(t,n,a,r){fe=t;var c=0;do{if(qs&&(Ws=null),ro=0,qs=!1,25<=c)throw Error(s(301));if(c+=1,rn=Be=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}P.H=vm,f=n(a,r)}while(qs);return f}function dy(){var t=P.H,n=t.useState()[0];return n=typeof n.then=="function"?oo(n):n,t=t.useState()[0],(Be!==null?Be.memoizedState:null)!==t&&(fe.flags|=1024),n}function Pu(){var t=gl!==0;return gl=0,t}function zu(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Iu(t){if(ml){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ml=!1}Vi=0,rn=Be=fe=null,qs=!1,ro=gl=0,Ws=null}function Nn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return rn===null?fe.memoizedState=rn=t:rn=rn.next=t,rn}function nn(){if(Be===null){var t=fe.alternate;t=t!==null?t.memoizedState:null}else t=Be.next;var n=rn===null?fe.memoizedState:rn.next;if(n!==null)rn=n,Be=t;else{if(t===null)throw fe.alternate===null?Error(s(467)):Error(s(310));Be=t,t={memoizedState:Be.memoizedState,baseState:Be.baseState,baseQueue:Be.baseQueue,queue:Be.queue,next:null},rn===null?fe.memoizedState=rn=t:rn=rn.next=t}return rn}function _l(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function oo(t){var n=ro;return ro+=1,Ws===null&&(Ws=[]),t=Ap(Ws,t,n),n=fe,(rn===null?n.memoizedState:rn.next)===null&&(n=n.alternate,P.H=n===null||n.memoizedState===null?_m:Zu),t}function vl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return oo(t);if(t.$$typeof===L)return En(t)}throw Error(s(438,String(t)))}function Bu(t){var n=null,a=fe.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=fe.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=_l(),fe.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=C;return n.index++,a}function ki(t,n){return typeof n=="function"?n(t):n}function yl(t){var n=nn();return Fu(n,Be,t)}function Fu(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var c=t.baseQueue,f=r.pending;if(f!==null){if(c!==null){var _=c.next;c.next=f.next,f.next=_}n.baseQueue=c=f,r.pending=null}if(f=t.baseState,c===null)t.memoizedState=f;else{n=c.next;var b=_=null,I=null,tt=n,ut=!1;do{var vt=tt.lane&-536870913;if(vt!==tt.lane?(Se&vt)===vt:(Vi&vt)===vt){var it=tt.revertLane;if(it===0)I!==null&&(I=I.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),vt===Hs&&(ut=!0);else if((Vi&it)===it){tt=tt.next,it===Hs&&(ut=!0);continue}else vt={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},I===null?(b=I=vt,_=f):I=I.next=vt,fe.lanes|=it,ba|=it;vt=tt.action,ls&&a(f,vt),f=tt.hasEagerState?tt.eagerState:a(f,vt)}else it={lane:vt,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},I===null?(b=I=it,_=f):I=I.next=it,fe.lanes|=vt,ba|=vt;tt=tt.next}while(tt!==null&&tt!==n);if(I===null?_=f:I.next=b,!jn(f,t.memoizedState)&&(on=!0,ut&&(a=Gs,a!==null)))throw a;t.memoizedState=f,t.baseState=_,t.baseQueue=I,r.lastRenderedState=f}return c===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function Hu(t){var n=nn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,c=a.pending,f=n.memoizedState;if(c!==null){a.pending=null;var _=c=c.next;do f=t(f,_.action),_=_.next;while(_!==c);jn(f,n.memoizedState)||(on=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,r]}function Ip(t,n,a){var r=fe,c=nn(),f=Te;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var _=!jn((Be||c).memoizedState,a);if(_&&(c.memoizedState=a,on=!0),c=c.queue,ku(Hp.bind(null,r,c,t),[t]),c.getSnapshot!==n||_||rn!==null&&rn.memoizedState.tag&1){if(r.flags|=2048,Ys(9,{destroy:void 0},Fp.bind(null,r,c,a,n),null),ke===null)throw Error(s(349));f||(Vi&127)!==0||Bp(r,n,a)}return a}function Bp(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=fe.updateQueue,n===null?(n=_l(),fe.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Fp(t,n,a,r){n.value=a,n.getSnapshot=r,Gp(n)&&Vp(t)}function Hp(t,n,a){return a(function(){Gp(n)&&Vp(t)})}function Gp(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!jn(t,a)}catch{return!0}}function Vp(t){var n=$a(t,2);n!==null&&kn(n,t,2)}function Gu(t){var n=Nn();if(typeof t=="function"){var a=t;if(t=a(),ls){Ft(!0);try{a()}finally{Ft(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:t},n}function kp(t,n,a,r){return t.baseState=a,Fu(t,Be,typeof r=="function"?r:ki)}function py(t,n,a,r,c){if(Ml(t))throw Error(s(485));if(t=n.action,t!==null){var f={payload:c,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(_){f.listeners.push(_)}};P.T!==null?a(!0):f.isTransition=!1,r(f),a=n.pending,a===null?(f.next=n.pending=f,Xp(n,f)):(f.next=a.next,n.pending=a.next=f)}}function Xp(t,n){var a=n.action,r=n.payload,c=t.state;if(n.isTransition){var f=P.T,_={};P.T=_;try{var b=a(c,r),I=P.S;I!==null&&I(_,b),qp(t,n,b)}catch(tt){Vu(t,n,tt)}finally{f!==null&&_.types!==null&&(f.types=_.types),P.T=f}}else try{f=a(c,r),qp(t,n,f)}catch(tt){Vu(t,n,tt)}}function qp(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Wp(t,n,r)},function(r){return Vu(t,n,r)}):Wp(t,n,a)}function Wp(t,n,a){n.status="fulfilled",n.value=a,Yp(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Xp(t,a)))}function Vu(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,Yp(n),n=n.next;while(n!==r)}t.action=null}function Yp(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function jp(t,n){return n}function Zp(t,n){if(Te){var a=ke.formState;if(a!==null){t:{var r=fe;if(Te){if(qe){e:{for(var c=qe,f=oi;c.nodeType!==8;){if(!f){c=null;break e}if(c=ci(c.nextSibling),c===null){c=null;break e}}f=c.data,c=f==="F!"||f==="F"?c:null}if(c){qe=ci(c.nextSibling),r=c.data==="F!";break t}}ga(r)}r=!1}r&&(n=a[0])}}return a=Nn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:jp,lastRenderedState:n},a.queue=r,a=pm.bind(null,fe,r),r.dispatch=a,r=Gu(!1),f=ju.bind(null,fe,!1,r.queue),r=Nn(),c={state:n,dispatch:null,action:t,pending:null},r.queue=c,a=py.bind(null,fe,c,f,a),c.dispatch=a,r.memoizedState=t,[n,a,!1]}function Kp(t){var n=nn();return Qp(n,Be,t)}function Qp(t,n,a){if(n=Fu(t,n,jp)[0],t=yl(ki)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=oo(n)}catch(_){throw _===Vs?cl:_}else r=n;n=nn();var c=n.queue,f=c.dispatch;return a!==n.memoizedState&&(fe.flags|=2048,Ys(9,{destroy:void 0},my.bind(null,c,a),null)),[r,f,t]}function my(t,n){t.action=n}function Jp(t){var n=nn(),a=Be;if(a!==null)return Qp(n,a,t);nn(),n=n.memoizedState,a=nn();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function Ys(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=fe.updateQueue,n===null&&(n=_l(),fe.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function $p(){return nn().memoizedState}function Sl(t,n,a,r){var c=Nn();fe.flags|=t,c.memoizedState=Ys(1|n,{destroy:void 0},a,r===void 0?null:r)}function xl(t,n,a,r){var c=nn();r=r===void 0?null:r;var f=c.memoizedState.inst;Be!==null&&r!==null&&Lu(r,Be.memoizedState.deps)?c.memoizedState=Ys(n,f,a,r):(fe.flags|=t,c.memoizedState=Ys(1|n,f,a,r))}function tm(t,n){Sl(8390656,8,t,n)}function ku(t,n){xl(2048,8,t,n)}function gy(t){fe.flags|=4;var n=fe.updateQueue;if(n===null)n=_l(),fe.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function em(t){var n=nn().memoizedState;return gy({ref:n,nextImpl:t}),function(){if((Ne&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function nm(t,n){return xl(4,2,t,n)}function im(t,n){return xl(4,4,t,n)}function am(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function sm(t,n,a){a=a!=null?a.concat([t]):null,xl(4,4,am.bind(null,n,t),a)}function Xu(){}function rm(t,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Lu(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function om(t,n){var a=nn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Lu(n,r[1]))return r[0];if(r=t(),ls){Ft(!0);try{t()}finally{Ft(!1)}}return a.memoizedState=[r,n],r}function qu(t,n,a){return a===void 0||(Vi&1073741824)!==0&&(Se&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=lg(),fe.lanes|=t,ba|=t,a)}function lm(t,n,a,r){return jn(a,n)?a:Xs.current!==null?(t=qu(t,a,r),jn(t,n)||(on=!0),t):(Vi&42)===0||(Vi&1073741824)!==0&&(Se&261930)===0?(on=!0,t.memoizedState=a):(t=lg(),fe.lanes|=t,ba|=t,n)}function cm(t,n,a,r,c){var f=X.p;X.p=f!==0&&8>f?f:8;var _=P.T,b={};P.T=b,ju(t,!1,n,a);try{var I=c(),tt=P.S;if(tt!==null&&tt(b,I),I!==null&&typeof I=="object"&&typeof I.then=="function"){var ut=fy(I,r);lo(t,n,ut,ti(t))}else lo(t,n,r,ti(t))}catch(vt){lo(t,n,{then:function(){},status:"rejected",reason:vt},ti())}finally{X.p=f,_!==null&&b.types!==null&&(_.types=b.types),P.T=_}}function _y(){}function Wu(t,n,a,r){if(t.tag!==5)throw Error(s(476));var c=um(t).queue;cm(t,c,n,F,a===null?_y:function(){return fm(t),a(r)})}function um(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:F,baseState:F,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:F},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ki,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function fm(t){var n=um(t);n.next===null&&(n=t.alternate.memoizedState),lo(t,n.next.queue,{},ti())}function Yu(){return En(Ao)}function hm(){return nn().memoizedState}function dm(){return nn().memoizedState}function vy(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ti();t=ya(a);var r=Sa(n,t,a);r!==null&&(kn(r,n,a),io(r,n,a)),n={cache:Mu()},t.payload=n;return}n=n.return}}function yy(t,n,a){var r=ti();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Ml(t)?mm(n,a):(a=fu(t,n,a,r),a!==null&&(kn(a,t,r),gm(a,n,r)))}function pm(t,n,a){var r=ti();lo(t,n,a,r)}function lo(t,n,a,r){var c={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Ml(t))mm(n,c);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var _=n.lastRenderedState,b=f(_,a);if(c.hasEagerState=!0,c.eagerState=b,jn(b,_))return nl(t,n,c,0),ke===null&&el(),!1}catch{}finally{}if(a=fu(t,n,c,r),a!==null)return kn(a,t,r),gm(a,n,r),!0}return!1}function ju(t,n,a,r){if(r={lane:2,revertLane:Rf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},Ml(t)){if(n)throw Error(s(479))}else n=fu(t,a,r,2),n!==null&&kn(n,t,2)}function Ml(t){var n=t.alternate;return t===fe||n!==null&&n===fe}function mm(t,n){qs=ml=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function gm(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,Br(t,a)}}var co={readContext:En,use:vl,useCallback:$e,useContext:$e,useEffect:$e,useImperativeHandle:$e,useLayoutEffect:$e,useInsertionEffect:$e,useMemo:$e,useReducer:$e,useRef:$e,useState:$e,useDebugValue:$e,useDeferredValue:$e,useTransition:$e,useSyncExternalStore:$e,useId:$e,useHostTransitionStatus:$e,useFormState:$e,useActionState:$e,useOptimistic:$e,useMemoCache:$e,useCacheRefresh:$e};co.useEffectEvent=$e;var _m={readContext:En,use:vl,useCallback:function(t,n){return Nn().memoizedState=[t,n===void 0?null:n],t},useContext:En,useEffect:tm,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Sl(4194308,4,am.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Sl(4194308,4,t,n)},useInsertionEffect:function(t,n){Sl(4,2,t,n)},useMemo:function(t,n){var a=Nn();n=n===void 0?null:n;var r=t();if(ls){Ft(!0);try{t()}finally{Ft(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Nn();if(a!==void 0){var c=a(n);if(ls){Ft(!0);try{a(n)}finally{Ft(!1)}}}else c=n;return r.memoizedState=r.baseState=c,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:c},r.queue=t,t=t.dispatch=yy.bind(null,fe,t),[r.memoizedState,t]},useRef:function(t){var n=Nn();return t={current:t},n.memoizedState=t},useState:function(t){t=Gu(t);var n=t.queue,a=pm.bind(null,fe,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Xu,useDeferredValue:function(t,n){var a=Nn();return qu(a,t,n)},useTransition:function(){var t=Gu(!1);return t=cm.bind(null,fe,t.queue,!0,!1),Nn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=fe,c=Nn();if(Te){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),ke===null)throw Error(s(349));(Se&127)!==0||Bp(r,n,a)}c.memoizedState=a;var f={value:a,getSnapshot:n};return c.queue=f,tm(Hp.bind(null,r,f,t),[t]),r.flags|=2048,Ys(9,{destroy:void 0},Fp.bind(null,r,f,a,n),null),a},useId:function(){var t=Nn(),n=ke.identifierPrefix;if(Te){var a=wi,r=Ci;a=(r&~(1<<32-ie(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=gl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=hy++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Yu,useFormState:Zp,useActionState:Zp,useOptimistic:function(t){var n=Nn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=ju.bind(null,fe,!0,a),a.dispatch=n,[t,n]},useMemoCache:Bu,useCacheRefresh:function(){return Nn().memoizedState=vy.bind(null,fe)},useEffectEvent:function(t){var n=Nn(),a={impl:t};return n.memoizedState=a,function(){if((Ne&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Zu={readContext:En,use:vl,useCallback:rm,useContext:En,useEffect:ku,useImperativeHandle:sm,useInsertionEffect:nm,useLayoutEffect:im,useMemo:om,useReducer:yl,useRef:$p,useState:function(){return yl(ki)},useDebugValue:Xu,useDeferredValue:function(t,n){var a=nn();return lm(a,Be.memoizedState,t,n)},useTransition:function(){var t=yl(ki)[0],n=nn().memoizedState;return[typeof t=="boolean"?t:oo(t),n]},useSyncExternalStore:Ip,useId:hm,useHostTransitionStatus:Yu,useFormState:Kp,useActionState:Kp,useOptimistic:function(t,n){var a=nn();return kp(a,Be,t,n)},useMemoCache:Bu,useCacheRefresh:dm};Zu.useEffectEvent=em;var vm={readContext:En,use:vl,useCallback:rm,useContext:En,useEffect:ku,useImperativeHandle:sm,useInsertionEffect:nm,useLayoutEffect:im,useMemo:om,useReducer:Hu,useRef:$p,useState:function(){return Hu(ki)},useDebugValue:Xu,useDeferredValue:function(t,n){var a=nn();return Be===null?qu(a,t,n):lm(a,Be.memoizedState,t,n)},useTransition:function(){var t=Hu(ki)[0],n=nn().memoizedState;return[typeof t=="boolean"?t:oo(t),n]},useSyncExternalStore:Ip,useId:hm,useHostTransitionStatus:Yu,useFormState:Jp,useActionState:Jp,useOptimistic:function(t,n){var a=nn();return Be!==null?kp(a,Be,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Bu,useCacheRefresh:dm};vm.useEffectEvent=em;function Ku(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:y({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Qu={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=ti(),c=ya(r);c.payload=n,a!=null&&(c.callback=a),n=Sa(t,c,r),n!==null&&(kn(n,t,r),io(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=ti(),c=ya(r);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=Sa(t,c,r),n!==null&&(kn(n,t,r),io(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ti(),r=ya(a);r.tag=2,n!=null&&(r.callback=n),n=Sa(t,r,a),n!==null&&(kn(n,t,a),io(n,t,a))}};function ym(t,n,a,r,c,f,_){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,f,_):n.prototype&&n.prototype.isPureReactComponent?!Zr(a,r)||!Zr(c,f):!0}function Sm(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&Qu.enqueueReplaceState(n,n.state,null)}function cs(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=y({},a));for(var c in t)a[c]===void 0&&(a[c]=t[c])}return a}function xm(t){tl(t)}function Mm(t){console.error(t)}function Em(t){tl(t)}function El(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function Tm(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Ju(t,n,a){return a=ya(a),a.tag=3,a.payload={element:null},a.callback=function(){El(t,n)},a}function bm(t){return t=ya(t),t.tag=3,t}function Am(t,n,a,r){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var f=r.value;t.payload=function(){return c(f)},t.callback=function(){Tm(n,a,r)}}var _=a.stateNode;_!==null&&typeof _.componentDidCatch=="function"&&(t.callback=function(){Tm(n,a,r),typeof c!="function"&&(Aa===null?Aa=new Set([this]):Aa.add(this));var b=r.stack;this.componentDidCatch(r.value,{componentStack:b!==null?b:""})})}function Sy(t,n,a,r,c){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Fs(n,a,c,!0),a=Kn.current,a!==null){switch(a.tag){case 31:case 13:return li===null?Pl():a.alternate===null&&tn===0&&(tn=3),a.flags&=-257,a.flags|=65536,a.lanes=c,r===ul?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Tf(t,r,c)),!1;case 22:return a.flags|=65536,r===ul?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Tf(t,r,c)),!1}throw Error(s(435,a.tag))}return Tf(t,r,c),Pl(),!1}if(Te)return n=Kn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,r!==_u&&(t=Error(s(422),{cause:r}),Jr(ai(t,a)))):(r!==_u&&(n=Error(s(423),{cause:r}),Jr(ai(n,a))),t=t.current.alternate,t.flags|=65536,c&=-c,t.lanes|=c,r=ai(r,a),c=Ju(t.stateNode,r,c),Cu(t,c),tn!==4&&(tn=2)),!1;var f=Error(s(520),{cause:r});if(f=ai(f,a),vo===null?vo=[f]:vo.push(f),tn!==4&&(tn=2),n===null)return!0;r=ai(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=c&-c,a.lanes|=t,t=Ju(a.stateNode,r,t),Cu(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(Aa===null||!Aa.has(f))))return a.flags|=65536,c&=-c,a.lanes|=c,c=bm(c),Am(c,t,a,r),Cu(a,c),!1}a=a.return}while(a!==null);return!1}var $u=Error(s(461)),on=!1;function Tn(t,n,a,r){n.child=t===null?Dp(n,null,a,r):os(n,t.child,a,r)}function Rm(t,n,a,r,c){a=a.render;var f=n.ref;if("ref"in r){var _={};for(var b in r)b!=="ref"&&(_[b]=r[b])}else _=r;return is(n),r=Ou(t,n,a,_,f,c),b=Pu(),t!==null&&!on?(zu(t,n,c),Xi(t,n,c)):(Te&&b&&mu(n),n.flags|=1,Tn(t,n,r,c),n.child)}function Cm(t,n,a,r,c){if(t===null){var f=a.type;return typeof f=="function"&&!hu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,wm(t,n,f,r,c)):(t=al(a.type,null,r,n,n.mode,c),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!lf(t,c)){var _=f.memoizedProps;if(a=a.compare,a=a!==null?a:Zr,a(_,r)&&t.ref===n.ref)return Xi(t,n,c)}return n.flags|=1,t=Bi(f,r),t.ref=n.ref,t.return=n,n.child=t}function wm(t,n,a,r,c){if(t!==null){var f=t.memoizedProps;if(Zr(f,r)&&t.ref===n.ref)if(on=!1,n.pendingProps=r=f,lf(t,c))(t.flags&131072)!==0&&(on=!0);else return n.lanes=t.lanes,Xi(t,n,c)}return tf(t,n,a,r,c)}function Dm(t,n,a,r){var c=r.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(r=n.child=t.child,c=0;r!==null;)c=c|r.lanes|r.childLanes,r=r.sibling;r=c&~f}else r=0,n.child=null;return Um(t,n,f,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&ll(n,f!==null?f.cachePool:null),f!==null?Lp(n,f):Du(),Op(n);else return r=n.lanes=536870912,Um(t,n,f!==null?f.baseLanes|a:a,a,r)}else f!==null?(ll(n,f.cachePool),Lp(n,f),Ma(),n.memoizedState=null):(t!==null&&ll(n,null),Du(),Ma());return Tn(t,n,c,a),n.child}function uo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function Um(t,n,a,r,c){var f=Tu();return f=f===null?null:{parent:sn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&ll(n,null),Du(),Op(n),t!==null&&Fs(t,n,r,!0),n.childLanes=c,null}function Tl(t,n){return n=Al({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function Nm(t,n,a){return os(n,t.child,null,a),t=Tl(n,n.pendingProps),t.flags|=2,Qn(n),n.memoizedState=null,t}function xy(t,n,a){var r=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Te){if(r.mode==="hidden")return t=Tl(n,r),n.lanes=536870912,uo(null,t);if(Nu(n),(t=qe)?(t=Xg(t,oi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:pa!==null?{id:Ci,overflow:wi}:null,retryLane:536870912,hydrationErrors:null},a=mp(t),a.return=n,n.child=a,Mn=n,qe=null)):t=null,t===null)throw ga(n);return n.lanes=536870912,null}return Tl(n,r)}var f=t.memoizedState;if(f!==null){var _=f.dehydrated;if(Nu(n),c)if(n.flags&256)n.flags&=-257,n=Nm(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(on||Fs(t,n,a,!1),c=(a&t.childLanes)!==0,on||c){if(r=ke,r!==null&&(_=Ri(r,a),_!==0&&_!==f.retryLane))throw f.retryLane=_,$a(t,_),kn(r,t,_),$u;Pl(),n=Nm(t,n,a)}else t=f.treeContext,qe=ci(_.nextSibling),Mn=n,Te=!0,ma=null,oi=!1,t!==null&&vp(n,t),n=Tl(n,r),n.flags|=4096;return n}return t=Bi(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function bl(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function tf(t,n,a,r,c){return is(n),a=Ou(t,n,a,r,void 0,c),r=Pu(),t!==null&&!on?(zu(t,n,c),Xi(t,n,c)):(Te&&r&&mu(n),n.flags|=1,Tn(t,n,a,c),n.child)}function Lm(t,n,a,r,c,f){return is(n),n.updateQueue=null,a=zp(n,r,a,c),Pp(t),r=Pu(),t!==null&&!on?(zu(t,n,f),Xi(t,n,f)):(Te&&r&&mu(n),n.flags|=1,Tn(t,n,a,f),n.child)}function Om(t,n,a,r,c){if(is(n),n.stateNode===null){var f=Ps,_=a.contextType;typeof _=="object"&&_!==null&&(f=En(_)),f=new a(r,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=Qu,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=r,f.state=n.memoizedState,f.refs={},Au(n),_=a.contextType,f.context=typeof _=="object"&&_!==null?En(_):Ps,f.state=n.memoizedState,_=a.getDerivedStateFromProps,typeof _=="function"&&(Ku(n,a,_,r),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(_=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),_!==f.state&&Qu.enqueueReplaceState(f,f.state,null),so(n,r,f,c),ao(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){f=n.stateNode;var b=n.memoizedProps,I=cs(a,b);f.props=I;var tt=f.context,ut=a.contextType;_=Ps,typeof ut=="object"&&ut!==null&&(_=En(ut));var vt=a.getDerivedStateFromProps;ut=typeof vt=="function"||typeof f.getSnapshotBeforeUpdate=="function",b=n.pendingProps!==b,ut||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(b||tt!==_)&&Sm(n,f,r,_),va=!1;var it=n.memoizedState;f.state=it,so(n,r,f,c),ao(),tt=n.memoizedState,b||it!==tt||va?(typeof vt=="function"&&(Ku(n,a,vt,r),tt=n.memoizedState),(I=va||ym(n,a,I,r,it,tt,_))?(ut||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=tt),f.props=r,f.state=tt,f.context=_,r=I):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{f=n.stateNode,Ru(t,n),_=n.memoizedProps,ut=cs(a,_),f.props=ut,vt=n.pendingProps,it=f.context,tt=a.contextType,I=Ps,typeof tt=="object"&&tt!==null&&(I=En(tt)),b=a.getDerivedStateFromProps,(tt=typeof b=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(_!==vt||it!==I)&&Sm(n,f,r,I),va=!1,it=n.memoizedState,f.state=it,so(n,r,f,c),ao();var ot=n.memoizedState;_!==vt||it!==ot||va||t!==null&&t.dependencies!==null&&rl(t.dependencies)?(typeof b=="function"&&(Ku(n,a,b,r),ot=n.memoizedState),(ut=va||ym(n,a,ut,r,it,ot,I)||t!==null&&t.dependencies!==null&&rl(t.dependencies))?(tt||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(r,ot,I),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(r,ot,I)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||_===t.memoizedProps&&it===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&it===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=ot),f.props=r,f.state=ot,f.context=I,r=ut):(typeof f.componentDidUpdate!="function"||_===t.memoizedProps&&it===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||_===t.memoizedProps&&it===t.memoizedState||(n.flags|=1024),r=!1)}return f=r,bl(t,n),r=(n.flags&128)!==0,f||r?(f=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&r?(n.child=os(n,t.child,null,c),n.child=os(n,null,a,c)):Tn(t,n,a,c),n.memoizedState=f.state,t=n.child):t=Xi(t,n,c),t}function Pm(t,n,a,r){return es(),n.flags|=256,Tn(t,n,a,r),n.child}var ef={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function nf(t){return{baseLanes:t,cachePool:Tp()}}function af(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=$n),t}function zm(t,n,a){var r=n.pendingProps,c=!1,f=(n.flags&128)!==0,_;if((_=f)||(_=t!==null&&t.memoizedState===null?!1:(en.current&2)!==0),_&&(c=!0,n.flags&=-129),_=(n.flags&32)!==0,n.flags&=-33,t===null){if(Te){if(c?xa(n):Ma(),(t=qe)?(t=Xg(t,oi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:pa!==null?{id:Ci,overflow:wi}:null,retryLane:536870912,hydrationErrors:null},a=mp(t),a.return=n,n.child=a,Mn=n,qe=null)):t=null,t===null)throw ga(n);return Hf(t)?n.lanes=32:n.lanes=536870912,null}var b=r.children;return r=r.fallback,c?(Ma(),c=n.mode,b=Al({mode:"hidden",children:b},c),r=ts(r,c,a,null),b.return=n,r.return=n,b.sibling=r,n.child=b,r=n.child,r.memoizedState=nf(a),r.childLanes=af(t,_,a),n.memoizedState=ef,uo(null,r)):(xa(n),sf(n,b))}var I=t.memoizedState;if(I!==null&&(b=I.dehydrated,b!==null)){if(f)n.flags&256?(xa(n),n.flags&=-257,n=rf(t,n,a)):n.memoizedState!==null?(Ma(),n.child=t.child,n.flags|=128,n=null):(Ma(),b=r.fallback,c=n.mode,r=Al({mode:"visible",children:r.children},c),b=ts(b,c,a,null),b.flags|=2,r.return=n,b.return=n,r.sibling=b,n.child=r,os(n,t.child,null,a),r=n.child,r.memoizedState=nf(a),r.childLanes=af(t,_,a),n.memoizedState=ef,n=uo(null,r));else if(xa(n),Hf(b)){if(_=b.nextSibling&&b.nextSibling.dataset,_)var tt=_.dgst;_=tt,r=Error(s(419)),r.stack="",r.digest=_,Jr({value:r,source:null,stack:null}),n=rf(t,n,a)}else if(on||Fs(t,n,a,!1),_=(a&t.childLanes)!==0,on||_){if(_=ke,_!==null&&(r=Ri(_,a),r!==0&&r!==I.retryLane))throw I.retryLane=r,$a(t,r),kn(_,t,r),$u;Ff(b)||Pl(),n=rf(t,n,a)}else Ff(b)?(n.flags|=192,n.child=t.child,n=null):(t=I.treeContext,qe=ci(b.nextSibling),Mn=n,Te=!0,ma=null,oi=!1,t!==null&&vp(n,t),n=sf(n,r.children),n.flags|=4096);return n}return c?(Ma(),b=r.fallback,c=n.mode,I=t.child,tt=I.sibling,r=Bi(I,{mode:"hidden",children:r.children}),r.subtreeFlags=I.subtreeFlags&65011712,tt!==null?b=Bi(tt,b):(b=ts(b,c,a,null),b.flags|=2),b.return=n,r.return=n,r.sibling=b,n.child=r,uo(null,r),r=n.child,b=t.child.memoizedState,b===null?b=nf(a):(c=b.cachePool,c!==null?(I=sn._currentValue,c=c.parent!==I?{parent:I,pool:I}:c):c=Tp(),b={baseLanes:b.baseLanes|a,cachePool:c}),r.memoizedState=b,r.childLanes=af(t,_,a),n.memoizedState=ef,uo(t.child,r)):(xa(n),a=t.child,t=a.sibling,a=Bi(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(_=n.deletions,_===null?(n.deletions=[t],n.flags|=16):_.push(t)),n.child=a,n.memoizedState=null,a)}function sf(t,n){return n=Al({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function Al(t,n){return t=Zn(22,t,null,n),t.lanes=0,t}function rf(t,n,a){return os(n,t.child,null,a),t=sf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function Im(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),Su(t.return,n,a)}function of(t,n,a,r,c,f){var _=t.memoizedState;_===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:c,treeForkCount:f}:(_.isBackwards=n,_.rendering=null,_.renderingStartTime=0,_.last=r,_.tail=a,_.tailMode=c,_.treeForkCount=f)}function Bm(t,n,a){var r=n.pendingProps,c=r.revealOrder,f=r.tail;r=r.children;var _=en.current,b=(_&2)!==0;if(b?(_=_&1|2,n.flags|=128):_&=1,Et(en,_),Tn(t,n,r,a),r=Te?Qr:0,!b&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Im(t,a,n);else if(t.tag===19)Im(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(c){case"forwards":for(a=n.child,c=null;a!==null;)t=a.alternate,t!==null&&pl(t)===null&&(c=a),a=a.sibling;a=c,a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),of(n,!1,c,a,f,r);break;case"backwards":case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(t=c.alternate,t!==null&&pl(t)===null){n.child=c;break}t=c.sibling,c.sibling=a,a=c,c=t}of(n,!0,a,null,f,r);break;case"together":of(n,!1,null,null,void 0,r);break;default:n.memoizedState=null}return n.child}function Xi(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ba|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Fs(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=Bi(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=Bi(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function lf(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&rl(t)))}function My(t,n,a){switch(n.tag){case 3:Vt(n,n.stateNode.containerInfo),_a(n,sn,t.memoizedState.cache),es();break;case 27:case 5:oe(n);break;case 4:Vt(n,n.stateNode.containerInfo);break;case 10:_a(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Nu(n),null;break;case 13:var r=n.memoizedState;if(r!==null)return r.dehydrated!==null?(xa(n),n.flags|=128,null):(a&n.child.childLanes)!==0?zm(t,n,a):(xa(n),t=Xi(t,n,a),t!==null?t.sibling:null);xa(n);break;case 19:var c=(t.flags&128)!==0;if(r=(a&n.childLanes)!==0,r||(Fs(t,n,a,!1),r=(a&n.childLanes)!==0),c){if(r)return Bm(t,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Et(en,en.current),r)break;return null;case 22:return n.lanes=0,Dm(t,n,a,n.pendingProps);case 24:_a(n,sn,t.memoizedState.cache)}return Xi(t,n,a)}function Fm(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)on=!0;else{if(!lf(t,a)&&(n.flags&128)===0)return on=!1,My(t,n,a);on=(t.flags&131072)!==0}else on=!1,Te&&(n.flags&1048576)!==0&&_p(n,Qr,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(t=ss(n.elementType),n.type=t,typeof t=="function")hu(t)?(r=cs(t,r),n.tag=1,n=Om(null,n,t,r,a)):(n.tag=0,n=tf(null,n,t,r,a));else{if(t!=null){var c=t.$$typeof;if(c===w){n.tag=11,n=Rm(null,n,t,r,a);break t}else if(c===O){n.tag=14,n=Cm(null,n,t,r,a);break t}}throw n=dt(t)||t,Error(s(306,n,""))}}return n;case 0:return tf(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,c=cs(r,n.pendingProps),Om(t,n,r,c,a);case 3:t:{if(Vt(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var f=n.memoizedState;c=f.element,Ru(t,n),so(n,r,null,a);var _=n.memoizedState;if(r=_.cache,_a(n,sn,r),r!==f.cache&&xu(n,[sn],a,!0),ao(),r=_.element,f.isDehydrated)if(f={element:r,isDehydrated:!1,cache:_.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=Pm(t,n,r,a);break t}else if(r!==c){c=ai(Error(s(424)),n),Jr(c),n=Pm(t,n,r,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(qe=ci(t.firstChild),Mn=n,Te=!0,ma=null,oi=!0,a=Dp(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling}else{if(es(),r===c){n=Xi(t,n,a);break t}Tn(t,n,r,a)}n=n.child}return n;case 26:return bl(t,n),t===null?(a=Kg(n.type,null,n.pendingProps,null))?n.memoizedState=a:Te||(a=n.type,t=n.pendingProps,r=Vl(xt.current).createElement(a),r[Qe]=n,r[Sn]=t,bn(r,a,t),k(r),n.stateNode=r):n.memoizedState=Kg(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return oe(n),t===null&&Te&&(r=n.stateNode=Yg(n.type,n.pendingProps,xt.current),Mn=n,oi=!0,c=qe,Da(n.type)?(Gf=c,qe=ci(r.firstChild)):qe=c),Tn(t,n,n.pendingProps.children,a),bl(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Te&&((c=r=qe)&&(r=Jy(r,n.type,n.pendingProps,oi),r!==null?(n.stateNode=r,Mn=n,qe=ci(r.firstChild),oi=!1,c=!0):c=!1),c||ga(n)),oe(n),c=n.type,f=n.pendingProps,_=t!==null?t.memoizedProps:null,r=f.children,zf(c,f)?r=null:_!==null&&zf(c,_)&&(n.flags|=32),n.memoizedState!==null&&(c=Ou(t,n,dy,null,null,a),Ao._currentValue=c),bl(t,n),Tn(t,n,r,a),n.child;case 6:return t===null&&Te&&((t=a=qe)&&(a=$y(a,n.pendingProps,oi),a!==null?(n.stateNode=a,Mn=n,qe=null,t=!0):t=!1),t||ga(n)),null;case 13:return zm(t,n,a);case 4:return Vt(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=os(n,null,r,a):Tn(t,n,r,a),n.child;case 11:return Rm(t,n,n.type,n.pendingProps,a);case 7:return Tn(t,n,n.pendingProps,a),n.child;case 8:return Tn(t,n,n.pendingProps.children,a),n.child;case 12:return Tn(t,n,n.pendingProps.children,a),n.child;case 10:return r=n.pendingProps,_a(n,n.type,r.value),Tn(t,n,r.children,a),n.child;case 9:return c=n.type._context,r=n.pendingProps.children,is(n),c=En(c),r=r(c),n.flags|=1,Tn(t,n,r,a),n.child;case 14:return Cm(t,n,n.type,n.pendingProps,a);case 15:return wm(t,n,n.type,n.pendingProps,a);case 19:return Bm(t,n,a);case 31:return xy(t,n,a);case 22:return Dm(t,n,a,n.pendingProps);case 24:return is(n),r=En(sn),t===null?(c=Tu(),c===null&&(c=ke,f=Mu(),c.pooledCache=f,f.refCount++,f!==null&&(c.pooledCacheLanes|=a),c=f),n.memoizedState={parent:r,cache:c},Au(n),_a(n,sn,c)):((t.lanes&a)!==0&&(Ru(t,n),so(n,null,null,a),ao()),c=t.memoizedState,f=n.memoizedState,c.parent!==r?(c={parent:r,cache:r},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),_a(n,sn,r)):(r=f.cache,_a(n,sn,r),r!==c.cache&&xu(n,[sn],a,!0))),Tn(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function qi(t){t.flags|=4}function cf(t,n,a,r,c){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(c&335544128)===c)if(t.stateNode.complete)t.flags|=8192;else if(hg())t.flags|=8192;else throw rs=ul,bu}else t.flags&=-16777217}function Hm(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!e_(n))if(hg())t.flags|=8192;else throw rs=ul,bu}function Rl(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?un():536870912,t.lanes|=n,Qs|=n)}function fo(t,n){if(!Te)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function We(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags&65011712,r|=c.flags&65011712,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function Ey(t,n,a){var r=n.pendingProps;switch(gu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return We(n),null;case 1:return We(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Gi(sn),Gt(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(Bs(n)?qi(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,vu())),We(n),null;case 26:var c=n.type,f=n.memoizedState;return t===null?(qi(n),f!==null?(We(n),Hm(n,f)):(We(n),cf(n,c,null,r,a))):f?f!==t.memoizedState?(qi(n),We(n),Hm(n,f)):(We(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&qi(n),We(n),cf(n,c,t,r,a)),null;case 27:if(Ue(n),a=xt.current,c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&qi(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return We(n),null}t=K.current,Bs(n)?yp(n):(t=Yg(c,r,a),n.stateNode=t,qi(n))}return We(n),null;case 5:if(Ue(n),c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&qi(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return We(n),null}if(f=K.current,Bs(n))yp(n);else{var _=Vl(xt.current);switch(f){case 1:f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":f=_.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":f=_.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":f=_.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof r.is=="string"?_.createElement("select",{is:r.is}):_.createElement("select"),r.multiple?f.multiple=!0:r.size&&(f.size=r.size);break;default:f=typeof r.is=="string"?_.createElement(c,{is:r.is}):_.createElement(c)}}f[Qe]=n,f[Sn]=r;t:for(_=n.child;_!==null;){if(_.tag===5||_.tag===6)f.appendChild(_.stateNode);else if(_.tag!==4&&_.tag!==27&&_.child!==null){_.child.return=_,_=_.child;continue}if(_===n)break t;for(;_.sibling===null;){if(_.return===null||_.return===n)break t;_=_.return}_.sibling.return=_.return,_=_.sibling}n.stateNode=f;t:switch(bn(f,c,r),c){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&qi(n)}}return We(n),cf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&qi(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=xt.current,Bs(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,c=Mn,c!==null)switch(c.tag){case 27:case 5:r=c.memoizedProps}t[Qe]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||zg(t.nodeValue,a)),t||ga(n,!0)}else t=Vl(t).createTextNode(r),t[Qe]=n,n.stateNode=t}return We(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=Bs(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[Qe]=n}else es(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),t=!1}else a=vu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(Qn(n),n):(Qn(n),null);if((n.flags&128)!==0)throw Error(s(558))}return We(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(c=Bs(n),r!==null&&r.dehydrated!==null){if(t===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[Qe]=n}else es(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;We(n),c=!1}else c=vu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(Qn(n),n):(Qn(n),null)}return Qn(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,c=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(c=r.alternate.memoizedState.cachePool.pool),f=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(f=r.memoizedState.cachePool.pool),f!==c&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),Rl(n,n.updateQueue),We(n),null);case 4:return Gt(),t===null&&Uf(n.stateNode.containerInfo),We(n),null;case 10:return Gi(n.type),We(n),null;case 19:if(at(en),r=n.memoizedState,r===null)return We(n),null;if(c=(n.flags&128)!==0,f=r.rendering,f===null)if(c)fo(r,!1);else{if(tn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=pl(t),f!==null){for(n.flags|=128,fo(r,!1),t=f.updateQueue,n.updateQueue=t,Rl(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)pp(a,t),a=a.sibling;return Et(en,en.current&1|2),Te&&Fi(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&lt()>Nl&&(n.flags|=128,c=!0,fo(r,!1),n.lanes=4194304)}else{if(!c)if(t=pl(f),t!==null){if(n.flags|=128,c=!0,t=t.updateQueue,n.updateQueue=t,Rl(n,t),fo(r,!0),r.tail===null&&r.tailMode==="hidden"&&!f.alternate&&!Te)return We(n),null}else 2*lt()-r.renderingStartTime>Nl&&a!==536870912&&(n.flags|=128,c=!0,fo(r,!1),n.lanes=4194304);r.isBackwards?(f.sibling=n.child,n.child=f):(t=r.last,t!==null?t.sibling=f:n.child=f,r.last=f)}return r.tail!==null?(t=r.tail,r.rendering=t,r.tail=t.sibling,r.renderingStartTime=lt(),t.sibling=null,a=en.current,Et(en,c?a&1|2:a&1),Te&&Fi(n,r.treeForkCount),t):(We(n),null);case 22:case 23:return Qn(n),Uu(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(We(n),n.subtreeFlags&6&&(n.flags|=8192)):We(n),a=n.updateQueue,a!==null&&Rl(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&at(as),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Gi(sn),We(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Ty(t,n){switch(gu(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Gi(sn),Gt(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Ue(n),null;case 31:if(n.memoizedState!==null){if(Qn(n),n.alternate===null)throw Error(s(340));es()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(Qn(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));es()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return at(en),null;case 4:return Gt(),null;case 10:return Gi(n.type),null;case 22:case 23:return Qn(n),Uu(),t!==null&&at(as),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Gi(sn),null;case 25:return null;default:return null}}function Gm(t,n){switch(gu(n),n.tag){case 3:Gi(sn),Gt();break;case 26:case 27:case 5:Ue(n);break;case 4:Gt();break;case 31:n.memoizedState!==null&&Qn(n);break;case 13:Qn(n);break;case 19:at(en);break;case 10:Gi(n.type);break;case 22:case 23:Qn(n),Uu(),t!==null&&at(as);break;case 24:Gi(sn)}}function ho(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var c=r.next;a=c;do{if((a.tag&t)===t){r=void 0;var f=a.create,_=a.inst;r=f(),_.destroy=r}a=a.next}while(a!==c)}}catch(b){Pe(n,n.return,b)}}function Ea(t,n,a){try{var r=n.updateQueue,c=r!==null?r.lastEffect:null;if(c!==null){var f=c.next;r=f;do{if((r.tag&t)===t){var _=r.inst,b=_.destroy;if(b!==void 0){_.destroy=void 0,c=n;var I=a,tt=b;try{tt()}catch(ut){Pe(c,I,ut)}}}r=r.next}while(r!==f)}}catch(ut){Pe(n,n.return,ut)}}function Vm(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{Np(n,a)}catch(r){Pe(t,t.return,r)}}}function km(t,n,a){a.props=cs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){Pe(t,n,r)}}function po(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(c){Pe(t,n,c)}}function Di(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(c){Pe(t,n,c)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){Pe(t,n,c)}else a.current=null}function Xm(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(c){Pe(t,t.return,c)}}function uf(t,n,a){try{var r=t.stateNode;Wy(r,t.type,a,n),r[Sn]=n}catch(c){Pe(t,t.return,c)}}function qm(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Da(t.type)||t.tag===4}function ff(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||qm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Da(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function hf(t,n,a){var r=t.tag;if(r===5||r===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=zi));else if(r!==4&&(r===27&&Da(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(hf(t,n,a),t=t.sibling;t!==null;)hf(t,n,a),t=t.sibling}function Cl(t,n,a){var r=t.tag;if(r===5||r===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(r!==4&&(r===27&&Da(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(Cl(t,n,a),t=t.sibling;t!==null;)Cl(t,n,a),t=t.sibling}function Wm(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);bn(n,r,a),n[Qe]=t,n[Sn]=a}catch(f){Pe(t,t.return,f)}}var Wi=!1,ln=!1,df=!1,Ym=typeof WeakSet=="function"?WeakSet:Set,_n=null;function by(t,n){if(t=t.containerInfo,Of=Zl,t=sp(t),su(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var r=a.getSelection&&a.getSelection();if(r&&r.rangeCount!==0){a=r.anchorNode;var c=r.anchorOffset,f=r.focusNode;r=r.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var _=0,b=-1,I=-1,tt=0,ut=0,vt=t,it=null;e:for(;;){for(var ot;vt!==a||c!==0&&vt.nodeType!==3||(b=_+c),vt!==f||r!==0&&vt.nodeType!==3||(I=_+r),vt.nodeType===3&&(_+=vt.nodeValue.length),(ot=vt.firstChild)!==null;)it=vt,vt=ot;for(;;){if(vt===t)break e;if(it===a&&++tt===c&&(b=_),it===f&&++ut===r&&(I=_),(ot=vt.nextSibling)!==null)break;vt=it,it=vt.parentNode}vt=ot}a=b===-1||I===-1?null:{start:b,end:I}}else a=null}a=a||{start:0,end:0}}else a=null;for(Pf={focusedElem:t,selectionRange:a},Zl=!1,_n=n;_n!==null;)if(n=_n,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,_n=t;else for(;_n!==null;){switch(n=_n,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)c=t[a],c.ref.impl=c.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,c=f.memoizedProps,f=f.memoizedState,r=a.stateNode;try{var Wt=cs(a.type,c);t=r.getSnapshotBeforeUpdate(Wt,f),r.__reactInternalSnapshotBeforeUpdate=t}catch(ne){Pe(a,a.return,ne)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)Bf(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Bf(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,_n=t;break}_n=n.return}}function jm(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:ji(t,a),r&4&&ho(5,a);break;case 1:if(ji(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(_){Pe(a,a.return,_)}else{var c=cs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(c,n,t.__reactInternalSnapshotBeforeUpdate)}catch(_){Pe(a,a.return,_)}}r&64&&Vm(a),r&512&&po(a,a.return);break;case 3:if(ji(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{Np(t,n)}catch(_){Pe(a,a.return,_)}}break;case 27:n===null&&r&4&&Wm(a);case 26:case 5:ji(t,a),n===null&&r&4&&Xm(a),r&512&&po(a,a.return);break;case 12:ji(t,a);break;case 31:ji(t,a),r&4&&Qm(t,a);break;case 13:ji(t,a),r&4&&Jm(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=Oy.bind(null,a),tS(t,a))));break;case 22:if(r=a.memoizedState!==null||Wi,!r){n=n!==null&&n.memoizedState!==null||ln,c=Wi;var f=ln;Wi=r,(ln=n)&&!f?Zi(t,a,(a.subtreeFlags&8772)!==0):ji(t,a),Wi=c,ln=f}break;case 30:break;default:ji(t,a)}}function Zm(t){var n=t.alternate;n!==null&&(t.alternate=null,Zm(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Gr(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var je=null,Fn=!1;function Yi(t,n,a){for(a=a.child;a!==null;)Km(t,n,a),a=a.sibling}function Km(t,n,a){if(Qt&&typeof Qt.onCommitFiberUnmount=="function")try{Qt.onCommitFiberUnmount(Jt,a)}catch{}switch(a.tag){case 26:ln||Di(a,n),Yi(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:ln||Di(a,n);var r=je,c=Fn;Da(a.type)&&(je=a.stateNode,Fn=!1),Yi(t,n,a),Eo(a.stateNode),je=r,Fn=c;break;case 5:ln||Di(a,n);case 6:if(r=je,c=Fn,je=null,Yi(t,n,a),je=r,Fn=c,je!==null)if(Fn)try{(je.nodeType===9?je.body:je.nodeName==="HTML"?je.ownerDocument.body:je).removeChild(a.stateNode)}catch(f){Pe(a,n,f)}else try{je.removeChild(a.stateNode)}catch(f){Pe(a,n,f)}break;case 18:je!==null&&(Fn?(t=je,Vg(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),sr(t)):Vg(je,a.stateNode));break;case 4:r=je,c=Fn,je=a.stateNode.containerInfo,Fn=!0,Yi(t,n,a),je=r,Fn=c;break;case 0:case 11:case 14:case 15:Ea(2,a,n),ln||Ea(4,a,n),Yi(t,n,a);break;case 1:ln||(Di(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&km(a,n,r)),Yi(t,n,a);break;case 21:Yi(t,n,a);break;case 22:ln=(r=ln)||a.memoizedState!==null,Yi(t,n,a),ln=r;break;default:Yi(t,n,a)}}function Qm(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{sr(t)}catch(a){Pe(n,n.return,a)}}}function Jm(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{sr(t)}catch(a){Pe(n,n.return,a)}}function Ay(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new Ym),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new Ym),n;default:throw Error(s(435,t.tag))}}function wl(t,n){var a=Ay(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var c=Py.bind(null,t,r);r.then(c,c)}})}function Hn(t,n){var a=n.deletions;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r],f=t,_=n,b=_;t:for(;b!==null;){switch(b.tag){case 27:if(Da(b.type)){je=b.stateNode,Fn=!1;break t}break;case 5:je=b.stateNode,Fn=!1;break t;case 3:case 4:je=b.stateNode.containerInfo,Fn=!0;break t}b=b.return}if(je===null)throw Error(s(160));Km(f,_,c),je=null,Fn=!1,f=c.alternate,f!==null&&(f.return=null),c.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)$m(n,t),n=n.sibling}var vi=null;function $m(t,n){var a=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Hn(n,t),Gn(t),r&4&&(Ea(3,t,t.return),ho(3,t),Ea(5,t,t.return));break;case 1:Hn(n,t),Gn(t),r&512&&(ln||a===null||Di(a,a.return)),r&64&&Wi&&(t=t.updateQueue,t!==null&&(r=t.callbacks,r!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?r:a.concat(r))));break;case 26:var c=vi;if(Hn(n,t),Gn(t),r&512&&(ln||a===null||Di(a,a.return)),r&4){var f=a!==null?a.memoizedState:null;if(r=t.memoizedState,a===null)if(r===null)if(t.stateNode===null){t:{r=t.type,a=t.memoizedProps,c=c.ownerDocument||c;e:switch(r){case"title":f=c.getElementsByTagName("title")[0],(!f||f[Za]||f[Qe]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=c.createElement(r),c.head.insertBefore(f,c.querySelector("head > title"))),bn(f,r,a),f[Qe]=t,k(f),r=f;break t;case"link":var _=$g("link","href",c).get(r+(a.href||""));if(_){for(var b=0;b<_.length;b++)if(f=_[b],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){_.splice(b,1);break e}}f=c.createElement(r),bn(f,r,a),c.head.appendChild(f);break;case"meta":if(_=$g("meta","content",c).get(r+(a.content||""))){for(b=0;b<_.length;b++)if(f=_[b],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){_.splice(b,1);break e}}f=c.createElement(r),bn(f,r,a),c.head.appendChild(f);break;default:throw Error(s(468,r))}f[Qe]=t,k(f),r=f}t.stateNode=r}else t_(c,t.type,t.stateNode);else t.stateNode=Jg(c,r,t.memoizedProps);else f!==r?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,r===null?t_(c,t.type,t.stateNode):Jg(c,r,t.memoizedProps)):r===null&&t.stateNode!==null&&uf(t,t.memoizedProps,a.memoizedProps)}break;case 27:Hn(n,t),Gn(t),r&512&&(ln||a===null||Di(a,a.return)),a!==null&&r&4&&uf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(Hn(n,t),Gn(t),r&512&&(ln||a===null||Di(a,a.return)),t.flags&32){c=t.stateNode;try{In(c,"")}catch(Wt){Pe(t,t.return,Wt)}}r&4&&t.stateNode!=null&&(c=t.memoizedProps,uf(t,c,a!==null?a.memoizedProps:c)),r&1024&&(df=!0);break;case 6:if(Hn(n,t),Gn(t),r&4){if(t.stateNode===null)throw Error(s(162));r=t.memoizedProps,a=t.stateNode;try{a.nodeValue=r}catch(Wt){Pe(t,t.return,Wt)}}break;case 3:if(ql=null,c=vi,vi=kl(n.containerInfo),Hn(n,t),vi=c,Gn(t),r&4&&a!==null&&a.memoizedState.isDehydrated)try{sr(n.containerInfo)}catch(Wt){Pe(t,t.return,Wt)}df&&(df=!1,tg(t));break;case 4:r=vi,vi=kl(t.stateNode.containerInfo),Hn(n,t),Gn(t),vi=r;break;case 12:Hn(n,t),Gn(t);break;case 31:Hn(n,t),Gn(t),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,wl(t,r)));break;case 13:Hn(n,t),Gn(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(Ul=lt()),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,wl(t,r)));break;case 22:c=t.memoizedState!==null;var I=a!==null&&a.memoizedState!==null,tt=Wi,ut=ln;if(Wi=tt||c,ln=ut||I,Hn(n,t),ln=ut,Wi=tt,Gn(t),r&8192)t:for(n=t.stateNode,n._visibility=c?n._visibility&-2:n._visibility|1,c&&(a===null||I||Wi||ln||us(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){I=a=n;try{if(f=I.stateNode,c)_=f.style,typeof _.setProperty=="function"?_.setProperty("display","none","important"):_.display="none";else{b=I.stateNode;var vt=I.memoizedProps.style,it=vt!=null&&vt.hasOwnProperty("display")?vt.display:null;b.style.display=it==null||typeof it=="boolean"?"":(""+it).trim()}}catch(Wt){Pe(I,I.return,Wt)}}}else if(n.tag===6){if(a===null){I=n;try{I.stateNode.nodeValue=c?"":I.memoizedProps}catch(Wt){Pe(I,I.return,Wt)}}}else if(n.tag===18){if(a===null){I=n;try{var ot=I.stateNode;c?kg(ot,!0):kg(I.stateNode,!1)}catch(Wt){Pe(I,I.return,Wt)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break t;for(;n.sibling===null;){if(n.return===null||n.return===t)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}r&4&&(r=t.updateQueue,r!==null&&(a=r.retryQueue,a!==null&&(r.retryQueue=null,wl(t,a))));break;case 19:Hn(n,t),Gn(t),r&4&&(r=t.updateQueue,r!==null&&(t.updateQueue=null,wl(t,r)));break;case 30:break;case 21:break;default:Hn(n,t),Gn(t)}}function Gn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(qm(r)){a=r;break}r=r.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var c=a.stateNode,f=ff(t);Cl(t,f,c);break;case 5:var _=a.stateNode;a.flags&32&&(In(_,""),a.flags&=-33);var b=ff(t);Cl(t,b,_);break;case 3:case 4:var I=a.stateNode.containerInfo,tt=ff(t);hf(t,tt,I);break;default:throw Error(s(161))}}catch(ut){Pe(t,t.return,ut)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function tg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;tg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function ji(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)jm(t,n.alternate,n),n=n.sibling}function us(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:Ea(4,n,n.return),us(n);break;case 1:Di(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&km(n,n.return,a),us(n);break;case 27:Eo(n.stateNode);case 26:case 5:Di(n,n.return),us(n);break;case 22:n.memoizedState===null&&us(n);break;case 30:us(n);break;default:us(n)}t=t.sibling}}function Zi(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var r=n.alternate,c=t,f=n,_=f.flags;switch(f.tag){case 0:case 11:case 15:Zi(c,f,a),ho(4,f);break;case 1:if(Zi(c,f,a),r=f,c=r.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(tt){Pe(r,r.return,tt)}if(r=f,c=r.updateQueue,c!==null){var b=r.stateNode;try{var I=c.shared.hiddenCallbacks;if(I!==null)for(c.shared.hiddenCallbacks=null,c=0;c<I.length;c++)Up(I[c],b)}catch(tt){Pe(r,r.return,tt)}}a&&_&64&&Vm(f),po(f,f.return);break;case 27:Wm(f);case 26:case 5:Zi(c,f,a),a&&r===null&&_&4&&Xm(f),po(f,f.return);break;case 12:Zi(c,f,a);break;case 31:Zi(c,f,a),a&&_&4&&Qm(c,f);break;case 13:Zi(c,f,a),a&&_&4&&Jm(c,f);break;case 22:f.memoizedState===null&&Zi(c,f,a),po(f,f.return);break;case 30:break;default:Zi(c,f,a)}n=n.sibling}}function pf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&$r(a))}function mf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&$r(t))}function yi(t,n,a,r){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)eg(t,n,a,r),n=n.sibling}function eg(t,n,a,r){var c=n.flags;switch(n.tag){case 0:case 11:case 15:yi(t,n,a,r),c&2048&&ho(9,n);break;case 1:yi(t,n,a,r);break;case 3:yi(t,n,a,r),c&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&$r(t)));break;case 12:if(c&2048){yi(t,n,a,r),t=n.stateNode;try{var f=n.memoizedProps,_=f.id,b=f.onPostCommit;typeof b=="function"&&b(_,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(I){Pe(n,n.return,I)}}else yi(t,n,a,r);break;case 31:yi(t,n,a,r);break;case 13:yi(t,n,a,r);break;case 23:break;case 22:f=n.stateNode,_=n.alternate,n.memoizedState!==null?f._visibility&2?yi(t,n,a,r):mo(t,n):f._visibility&2?yi(t,n,a,r):(f._visibility|=2,js(t,n,a,r,(n.subtreeFlags&10256)!==0||!1)),c&2048&&pf(_,n);break;case 24:yi(t,n,a,r),c&2048&&mf(n.alternate,n);break;default:yi(t,n,a,r)}}function js(t,n,a,r,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,_=n,b=a,I=r,tt=_.flags;switch(_.tag){case 0:case 11:case 15:js(f,_,b,I,c),ho(8,_);break;case 23:break;case 22:var ut=_.stateNode;_.memoizedState!==null?ut._visibility&2?js(f,_,b,I,c):mo(f,_):(ut._visibility|=2,js(f,_,b,I,c)),c&&tt&2048&&pf(_.alternate,_);break;case 24:js(f,_,b,I,c),c&&tt&2048&&mf(_.alternate,_);break;default:js(f,_,b,I,c)}n=n.sibling}}function mo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,c=r.flags;switch(r.tag){case 22:mo(a,r),c&2048&&pf(r.alternate,r);break;case 24:mo(a,r),c&2048&&mf(r.alternate,r);break;default:mo(a,r)}n=n.sibling}}var go=8192;function Zs(t,n,a){if(t.subtreeFlags&go)for(t=t.child;t!==null;)ng(t,n,a),t=t.sibling}function ng(t,n,a){switch(t.tag){case 26:Zs(t,n,a),t.flags&go&&t.memoizedState!==null&&hS(a,vi,t.memoizedState,t.memoizedProps);break;case 5:Zs(t,n,a);break;case 3:case 4:var r=vi;vi=kl(t.stateNode.containerInfo),Zs(t,n,a),vi=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=go,go=16777216,Zs(t,n,a),go=r):Zs(t,n,a));break;default:Zs(t,n,a)}}function ig(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function _o(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];_n=r,sg(r,t)}ig(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)ag(t),t=t.sibling}function ag(t){switch(t.tag){case 0:case 11:case 15:_o(t),t.flags&2048&&Ea(9,t,t.return);break;case 3:_o(t);break;case 12:_o(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Dl(t)):_o(t);break;default:_o(t)}}function Dl(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];_n=r,sg(r,t)}ig(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:Ea(8,n,n.return),Dl(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Dl(n));break;default:Dl(n)}t=t.sibling}}function sg(t,n){for(;_n!==null;){var a=_n;switch(a.tag){case 0:case 11:case 15:Ea(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:$r(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,_n=r;else t:for(a=t;_n!==null;){r=_n;var c=r.sibling,f=r.return;if(Zm(r),r===a){_n=null;break t}if(c!==null){c.return=f,_n=c;break t}_n=f}}}var Ry={getCacheForType:function(t){var n=En(sn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return En(sn).controller.signal}},Cy=typeof WeakMap=="function"?WeakMap:Map,Ne=0,ke=null,ge=null,Se=0,Oe=0,Jn=null,Ta=!1,Ks=!1,gf=!1,Ki=0,tn=0,ba=0,fs=0,_f=0,$n=0,Qs=0,vo=null,Vn=null,vf=!1,Ul=0,rg=0,Nl=1/0,Ll=null,Aa=null,hn=0,Ra=null,Js=null,Qi=0,yf=0,Sf=null,og=null,yo=0,xf=null;function ti(){return(Ne&2)!==0&&Se!==0?Se&-Se:P.T!==null?Rf():Fr()}function lg(){if($n===0)if((Se&536870912)===0||Te){var t=ct;ct<<=1,(ct&3932160)===0&&(ct=262144),$n=t}else $n=536870912;return t=Kn.current,t!==null&&(t.flags|=32),$n}function kn(t,n,a){(t===ke&&(Oe===2||Oe===9)||t.cancelPendingCommit!==null)&&($s(t,0),Ca(t,Se,$n,!1)),yn(t,a),((Ne&2)===0||t!==ke)&&(t===ke&&((Ne&2)===0&&(fs|=a),tn===4&&Ca(t,Se,$n,!1)),Ui(t))}function cg(t,n,a){if((Ne&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||ae(t,n),c=r?Uy(t,n):Ef(t,n,!0),f=r;do{if(c===0){Ks&&!r&&Ca(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!wy(a)){c=Ef(t,n,!1),f=!1;continue}if(c===2){if(f=n,t.errorRecoveryDisabledLanes&f)var _=0;else _=t.pendingLanes&-536870913,_=_!==0?_:_&536870912?536870912:0;if(_!==0){n=_;t:{var b=t;c=vo;var I=b.current.memoizedState.isDehydrated;if(I&&($s(b,_).flags|=256),_=Ef(b,_,!1),_!==2){if(gf&&!I){b.errorRecoveryDisabledLanes|=f,fs|=f,c=4;break t}f=Vn,Vn=c,f!==null&&(Vn===null?Vn=f:Vn.push.apply(Vn,f))}c=_}if(f=!1,c!==2)continue}}if(c===1){$s(t,0),Ca(t,n,0,!0);break}t:{switch(r=t,f=c,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:Ca(r,n,$n,!Ta);break t;case 2:Vn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=Ul+300-lt(),10<c)){if(Ca(r,n,$n,!Ta),Pt(r,0,!0)!==0)break t;Qi=n,r.timeoutHandle=Hg(ug.bind(null,r,a,Vn,Ll,vf,n,$n,fs,Qs,Ta,f,"Throttled",-0,0),c);break t}ug(r,a,Vn,Ll,vf,n,$n,fs,Qs,Ta,f,null,-0,0)}}break}while(!0);Ui(t)}function ug(t,n,a,r,c,f,_,b,I,tt,ut,vt,it,ot){if(t.timeoutHandle=-1,vt=n.subtreeFlags,vt&8192||(vt&16785408)===16785408){vt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:zi},ng(n,f,vt);var Wt=(f&62914560)===f?Ul-lt():(f&4194048)===f?rg-lt():0;if(Wt=dS(vt,Wt),Wt!==null){Qi=f,t.cancelPendingCommit=Wt(vg.bind(null,t,n,f,a,r,c,_,b,I,ut,vt,null,it,ot)),Ca(t,f,_,!tt);return}}vg(t,n,f,a,r,c,_,b,I)}function wy(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var c=a[r],f=c.getSnapshot;c=c.value;try{if(!jn(f(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function Ca(t,n,a,r){n&=~_f,n&=~fs,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var c=n;0<c;){var f=31-ie(c),_=1<<f;r[f]=-1,c&=~_}a!==0&&Ir(t,a,n)}function Ol(){return(Ne&6)===0?(So(0),!1):!0}function Mf(){if(ge!==null){if(Oe===0)var t=ge.return;else t=ge,Hi=ns=null,Iu(t),ks=null,eo=0,t=ge;for(;t!==null;)Gm(t.alternate,t),t=t.return;ge=null}}function $s(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Zy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),Qi=0,Mf(),ke=t,ge=a=Bi(t.current,null),Se=n,Oe=0,Jn=null,Ta=!1,Ks=ae(t,n),gf=!1,Qs=$n=_f=fs=ba=tn=0,Vn=vo=null,vf=!1,(n&8)!==0&&(n|=n&32);var r=t.entangledLanes;if(r!==0)for(t=t.entanglements,r&=n;0<r;){var c=31-ie(r),f=1<<c;n|=t[c],r&=~f}return Ki=n,el(),a}function fg(t,n){fe=null,P.H=co,n===Vs||n===cl?(n=Rp(),Oe=3):n===bu?(n=Rp(),Oe=4):Oe=n===$u?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Jn=n,ge===null&&(tn=1,El(t,ai(n,t.current)))}function hg(){var t=Kn.current;return t===null?!0:(Se&4194048)===Se?li===null:(Se&62914560)===Se||(Se&536870912)!==0?t===li:!1}function dg(){var t=P.H;return P.H=co,t===null?co:t}function pg(){var t=P.A;return P.A=Ry,t}function Pl(){tn=4,Ta||(Se&4194048)!==Se&&Kn.current!==null||(Ks=!0),(ba&134217727)===0&&(fs&134217727)===0||ke===null||Ca(ke,Se,$n,!1)}function Ef(t,n,a){var r=Ne;Ne|=2;var c=dg(),f=pg();(ke!==t||Se!==n)&&(Ll=null,$s(t,n)),n=!1;var _=tn;t:do try{if(Oe!==0&&ge!==null){var b=ge,I=Jn;switch(Oe){case 8:Mf(),_=6;break t;case 3:case 2:case 9:case 6:Kn.current===null&&(n=!0);var tt=Oe;if(Oe=0,Jn=null,tr(t,b,I,tt),a&&Ks){_=0;break t}break;default:tt=Oe,Oe=0,Jn=null,tr(t,b,I,tt)}}Dy(),_=tn;break}catch(ut){fg(t,ut)}while(!0);return n&&t.shellSuspendCounter++,Hi=ns=null,Ne=r,P.H=c,P.A=f,ge===null&&(ke=null,Se=0,el()),_}function Dy(){for(;ge!==null;)mg(ge)}function Uy(t,n){var a=Ne;Ne|=2;var r=dg(),c=pg();ke!==t||Se!==n?(Ll=null,Nl=lt()+500,$s(t,n)):Ks=ae(t,n);t:do try{if(Oe!==0&&ge!==null){n=ge;var f=Jn;e:switch(Oe){case 1:Oe=0,Jn=null,tr(t,n,f,1);break;case 2:case 9:if(bp(f)){Oe=0,Jn=null,gg(n);break}n=function(){Oe!==2&&Oe!==9||ke!==t||(Oe=7),Ui(t)},f.then(n,n);break t;case 3:Oe=7;break t;case 4:Oe=5;break t;case 7:bp(f)?(Oe=0,Jn=null,gg(n)):(Oe=0,Jn=null,tr(t,n,f,7));break;case 5:var _=null;switch(ge.tag){case 26:_=ge.memoizedState;case 5:case 27:var b=ge;if(_?e_(_):b.stateNode.complete){Oe=0,Jn=null;var I=b.sibling;if(I!==null)ge=I;else{var tt=b.return;tt!==null?(ge=tt,zl(tt)):ge=null}break e}}Oe=0,Jn=null,tr(t,n,f,5);break;case 6:Oe=0,Jn=null,tr(t,n,f,6);break;case 8:Mf(),tn=6;break t;default:throw Error(s(462))}}Ny();break}catch(ut){fg(t,ut)}while(!0);return Hi=ns=null,P.H=r,P.A=c,Ne=a,ge!==null?0:(ke=null,Se=0,el(),tn)}function Ny(){for(;ge!==null&&!T();)mg(ge)}function mg(t){var n=Fm(t.alternate,t,Ki);t.memoizedProps=t.pendingProps,n===null?zl(t):ge=n}function gg(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=Lm(a,n,n.pendingProps,n.type,void 0,Se);break;case 11:n=Lm(a,n,n.pendingProps,n.type.render,n.ref,Se);break;case 5:Iu(n);default:Gm(a,n),n=ge=pp(n,Ki),n=Fm(a,n,Ki)}t.memoizedProps=t.pendingProps,n===null?zl(t):ge=n}function tr(t,n,a,r){Hi=ns=null,Iu(n),ks=null,eo=0;var c=n.return;try{if(Sy(t,c,n,a,Se)){tn=1,El(t,ai(a,t.current)),ge=null;return}}catch(f){if(c!==null)throw ge=c,f;tn=1,El(t,ai(a,t.current)),ge=null;return}n.flags&32768?(Te||r===1?t=!0:Ks||(Se&536870912)!==0?t=!1:(Ta=t=!0,(r===2||r===9||r===3||r===6)&&(r=Kn.current,r!==null&&r.tag===13&&(r.flags|=16384))),_g(n,t)):zl(n)}function zl(t){var n=t;do{if((n.flags&32768)!==0){_g(n,Ta);return}t=n.return;var a=Ey(n.alternate,n,Ki);if(a!==null){ge=a;return}if(n=n.sibling,n!==null){ge=n;return}ge=n=t}while(n!==null);tn===0&&(tn=5)}function _g(t,n){do{var a=Ty(t.alternate,t);if(a!==null){a.flags&=32767,ge=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){ge=t;return}ge=t=a}while(t!==null);tn=6,ge=null}function vg(t,n,a,r,c,f,_,b,I){t.cancelPendingCommit=null;do Il();while(hn!==0);if((Ne&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=uu,pi(t,a,f,_,b,I),t===ke&&(ge=ke=null,Se=0),Js=n,Ra=t,Qi=a,yf=f,Sf=c,og=r,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,zy(Ot,function(){return Eg(),null})):(t.callbackNode=null,t.callbackPriority=0),r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=P.T,P.T=null,c=X.p,X.p=2,_=Ne,Ne|=4;try{by(t,n,a)}finally{Ne=_,X.p=c,P.T=r}}hn=1,yg(),Sg(),xg()}}function yg(){if(hn===1){hn=0;var t=Ra,n=Js,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=P.T,P.T=null;var r=X.p;X.p=2;var c=Ne;Ne|=4;try{$m(n,t);var f=Pf,_=sp(t.containerInfo),b=f.focusedElem,I=f.selectionRange;if(_!==b&&b&&b.ownerDocument&&ap(b.ownerDocument.documentElement,b)){if(I!==null&&su(b)){var tt=I.start,ut=I.end;if(ut===void 0&&(ut=tt),"selectionStart"in b)b.selectionStart=tt,b.selectionEnd=Math.min(ut,b.value.length);else{var vt=b.ownerDocument||document,it=vt&&vt.defaultView||window;if(it.getSelection){var ot=it.getSelection(),Wt=b.textContent.length,ne=Math.min(I.start,Wt),He=I.end===void 0?ne:Math.min(I.end,Wt);!ot.extend&&ne>He&&(_=He,He=ne,ne=_);var Z=ip(b,ne),V=ip(b,He);if(Z&&V&&(ot.rangeCount!==1||ot.anchorNode!==Z.node||ot.anchorOffset!==Z.offset||ot.focusNode!==V.node||ot.focusOffset!==V.offset)){var J=vt.createRange();J.setStart(Z.node,Z.offset),ot.removeAllRanges(),ne>He?(ot.addRange(J),ot.extend(V.node,V.offset)):(J.setEnd(V.node,V.offset),ot.addRange(J))}}}}for(vt=[],ot=b;ot=ot.parentNode;)ot.nodeType===1&&vt.push({element:ot,left:ot.scrollLeft,top:ot.scrollTop});for(typeof b.focus=="function"&&b.focus(),b=0;b<vt.length;b++){var mt=vt[b];mt.element.scrollLeft=mt.left,mt.element.scrollTop=mt.top}}Zl=!!Of,Pf=Of=null}finally{Ne=c,X.p=r,P.T=a}}t.current=n,hn=2}}function Sg(){if(hn===2){hn=0;var t=Ra,n=Js,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=P.T,P.T=null;var r=X.p;X.p=2;var c=Ne;Ne|=4;try{jm(t,n.alternate,n)}finally{Ne=c,X.p=r,P.T=a}}hn=3}}function xg(){if(hn===4||hn===3){hn=0,$();var t=Ra,n=Js,a=Qi,r=og;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?hn=5:(hn=0,Js=Ra=null,Mg(t,t.pendingLanes));var c=t.pendingLanes;if(c===0&&(Aa=null),Rs(a),n=n.stateNode,Qt&&typeof Qt.onCommitFiberRoot=="function")try{Qt.onCommitFiberRoot(Jt,n,void 0,(n.current.flags&128)===128)}catch{}if(r!==null){n=P.T,c=X.p,X.p=2,P.T=null;try{for(var f=t.onRecoverableError,_=0;_<r.length;_++){var b=r[_];f(b.value,{componentStack:b.stack})}}finally{P.T=n,X.p=c}}(Qi&3)!==0&&Il(),Ui(t),c=t.pendingLanes,(a&261930)!==0&&(c&42)!==0?t===xf?yo++:(yo=0,xf=t):yo=0,So(0)}}function Mg(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,$r(n)))}function Il(){return yg(),Sg(),xg(),Eg()}function Eg(){if(hn!==5)return!1;var t=Ra,n=yf;yf=0;var a=Rs(Qi),r=P.T,c=X.p;try{X.p=32>a?32:a,P.T=null,a=Sf,Sf=null;var f=Ra,_=Qi;if(hn=0,Js=Ra=null,Qi=0,(Ne&6)!==0)throw Error(s(331));var b=Ne;if(Ne|=4,ag(f.current),eg(f,f.current,_,a),Ne=b,So(0,!1),Qt&&typeof Qt.onPostCommitFiberRoot=="function")try{Qt.onPostCommitFiberRoot(Jt,f)}catch{}return!0}finally{X.p=c,P.T=r,Mg(t,n)}}function Tg(t,n,a){n=ai(a,n),n=Ju(t.stateNode,n,2),t=Sa(t,n,2),t!==null&&(yn(t,2),Ui(t))}function Pe(t,n,a){if(t.tag===3)Tg(t,t,a);else for(;n!==null;){if(n.tag===3){Tg(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Aa===null||!Aa.has(r))){t=ai(a,t),a=bm(2),r=Sa(n,a,2),r!==null&&(Am(a,r,n,t),yn(r,2),Ui(r));break}}n=n.return}}function Tf(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new Cy;var c=new Set;r.set(n,c)}else c=r.get(n),c===void 0&&(c=new Set,r.set(n,c));c.has(a)||(gf=!0,c.add(a),t=Ly.bind(null,t,n,a),n.then(t,t))}function Ly(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,ke===t&&(Se&a)===a&&(tn===4||tn===3&&(Se&62914560)===Se&&300>lt()-Ul?(Ne&2)===0&&$s(t,0):_f|=a,Qs===Se&&(Qs=0)),Ui(t)}function bg(t,n){n===0&&(n=un()),t=$a(t,n),t!==null&&(yn(t,n),Ui(t))}function Oy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),bg(t,a)}function Py(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,c=t.memoizedState;c!==null&&(a=c.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),bg(t,a)}function zy(t,n){return Ct(t,n)}var Bl=null,er=null,bf=!1,Fl=!1,Af=!1,wa=0;function Ui(t){t!==er&&t.next===null&&(er===null?Bl=er=t:er=er.next=t),Fl=!0,bf||(bf=!0,By())}function So(t,n){if(!Af&&Fl){Af=!0;do for(var a=!1,r=Bl;r!==null;){if(t!==0){var c=r.pendingLanes;if(c===0)var f=0;else{var _=r.suspendedLanes,b=r.pingedLanes;f=(1<<31-ie(42|t)+1)-1,f&=c&~(_&~b),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,wg(r,f))}else f=Se,f=Pt(r,r===ke?f:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(f&3)===0||ae(r,f)||(a=!0,wg(r,f));r=r.next}while(a);Af=!1}}function Iy(){Ag()}function Ag(){Fl=bf=!1;var t=0;wa!==0&&jy()&&(t=wa);for(var n=lt(),a=null,r=Bl;r!==null;){var c=r.next,f=Rg(r,n);f===0?(r.next=null,a===null?Bl=c:a.next=c,c===null&&(er=a)):(a=r,(t!==0||(f&3)!==0)&&(Fl=!0)),r=c}hn!==0&&hn!==5||So(t),wa!==0&&(wa=0)}function Rg(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,c=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var _=31-ie(f),b=1<<_,I=c[_];I===-1?((b&a)===0||(b&r)!==0)&&(c[_]=Ye(b,n)):I<=n&&(t.expiredLanes|=b),f&=~b}if(n=ke,a=Se,a=Pt(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(Oe===2||Oe===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&D(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||ae(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&D(r),Rs(a)){case 2:case 8:a=Kt;break;case 32:a=Ot;break;case 268435456:a=ye;break;default:a=Ot}return r=Cg.bind(null,t),a=Ct(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&D(r),t.callbackPriority=2,t.callbackNode=null,2}function Cg(t,n){if(hn!==0&&hn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Il()&&t.callbackNode!==a)return null;var r=Se;return r=Pt(t,t===ke?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(cg(t,r,n),Rg(t,lt()),t.callbackNode!=null&&t.callbackNode===a?Cg.bind(null,t):null)}function wg(t,n){if(Il())return null;cg(t,n,!0)}function By(){Ky(function(){(Ne&6)!==0?Ct(_t,Iy):Ag()})}function Rf(){if(wa===0){var t=Hs;t===0&&(t=Nt,Nt<<=1,(Nt&261888)===0&&(Nt=256)),wa=t}return wa}function Dg(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Yo(""+t)}function Ug(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function Fy(t,n,a,r,c){if(n==="submit"&&a&&a.stateNode===c){var f=Dg((c[Sn]||null).action),_=r.submitter;_&&(n=(n=_[Sn]||null)?Dg(n.formAction):_.getAttribute("formAction"),n!==null&&(f=n,_=null));var b=new Qo("action","action",null,r,c);t.push({event:b,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(wa!==0){var I=_?Ug(c,_):new FormData(c);Wu(a,{pending:!0,data:I,method:c.method,action:f},null,I)}}else typeof f=="function"&&(b.preventDefault(),I=_?Ug(c,_):new FormData(c),Wu(a,{pending:!0,data:I,method:c.method,action:f},f,I))},currentTarget:c}]})}}for(var Cf=0;Cf<cu.length;Cf++){var wf=cu[Cf],Hy=wf.toLowerCase(),Gy=wf[0].toUpperCase()+wf.slice(1);_i(Hy,"on"+Gy)}_i(lp,"onAnimationEnd"),_i(cp,"onAnimationIteration"),_i(up,"onAnimationStart"),_i("dblclick","onDoubleClick"),_i("focusin","onFocus"),_i("focusout","onBlur"),_i(iy,"onTransitionRun"),_i(ay,"onTransitionStart"),_i(sy,"onTransitionCancel"),_i(fp,"onTransitionEnd"),Ht("onMouseEnter",["mouseout","mouseover"]),Ht("onMouseLeave",["mouseout","mouseover"]),Ht("onPointerEnter",["pointerout","pointerover"]),Ht("onPointerLeave",["pointerout","pointerover"]),Bt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Bt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Bt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Bt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Bt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Bt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var xo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(xo));function Ng(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],c=r.event;r=r.listeners;t:{var f=void 0;if(n)for(var _=r.length-1;0<=_;_--){var b=r[_],I=b.instance,tt=b.currentTarget;if(b=b.listener,I!==f&&c.isPropagationStopped())break t;f=b,c.currentTarget=tt;try{f(c)}catch(ut){tl(ut)}c.currentTarget=null,f=I}else for(_=0;_<r.length;_++){if(b=r[_],I=b.instance,tt=b.currentTarget,b=b.listener,I!==f&&c.isPropagationStopped())break t;f=b,c.currentTarget=tt;try{f(c)}catch(ut){tl(ut)}c.currentTarget=null,f=I}}}}function _e(t,n){var a=n[Hr];a===void 0&&(a=n[Hr]=new Set);var r=t+"__bubble";a.has(r)||(Lg(n,t,2,!1),a.add(r))}function Df(t,n,a){var r=0;n&&(r|=4),Lg(a,t,r,n)}var Hl="_reactListening"+Math.random().toString(36).slice(2);function Uf(t){if(!t[Hl]){t[Hl]=!0,At.forEach(function(a){a!=="selectionchange"&&(Vy.has(a)||Df(a,!1,t),Df(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Hl]||(n[Hl]=!0,Df("selectionchange",!1,n))}}function Lg(t,n,a,r){switch(l_(n)){case 2:var c=gS;break;case 8:c=_S;break;default:c=Wf}a=c.bind(null,n,a,t),c=void 0,!Kc||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),r?c!==void 0?t.addEventListener(n,a,{capture:!0,passive:c}):t.addEventListener(n,a,!0):c!==void 0?t.addEventListener(n,a,{passive:c}):t.addEventListener(n,a,!1)}function Nf(t,n,a,r,c){var f=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var _=r.tag;if(_===3||_===4){var b=r.stateNode.containerInfo;if(b===c)break;if(_===4)for(_=r.return;_!==null;){var I=_.tag;if((I===3||I===4)&&_.stateNode.containerInfo===c)return;_=_.return}for(;b!==null;){if(_=R(b),_===null)return;if(I=_.tag,I===5||I===6||I===26||I===27){r=f=_;continue t}b=b.parentNode}}r=r.return}Bd(function(){var tt=f,ut=jc(a),vt=[];t:{var it=hp.get(t);if(it!==void 0){var ot=Qo,Wt=t;switch(t){case"keypress":if(Zo(a)===0)break t;case"keydown":case"keyup":ot=P0;break;case"focusin":Wt="focus",ot=tu;break;case"focusout":Wt="blur",ot=tu;break;case"beforeblur":case"afterblur":ot=tu;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ot=Gd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ot=E0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ot=B0;break;case lp:case cp:case up:ot=A0;break;case fp:ot=H0;break;case"scroll":case"scrollend":ot=x0;break;case"wheel":ot=V0;break;case"copy":case"cut":case"paste":ot=C0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ot=kd;break;case"toggle":case"beforetoggle":ot=X0}var ne=(n&4)!==0,He=!ne&&(t==="scroll"||t==="scrollend"),Z=ne?it!==null?it+"Capture":null:it;ne=[];for(var V=tt,J;V!==null;){var mt=V;if(J=mt.stateNode,mt=mt.tag,mt!==5&&mt!==26&&mt!==27||J===null||Z===null||(mt=Vr(V,Z),mt!=null&&ne.push(Mo(V,mt,J))),He)break;V=V.return}0<ne.length&&(it=new ot(it,Wt,null,a,ut),vt.push({event:it,listeners:ne}))}}if((n&7)===0){t:{if(it=t==="mouseover"||t==="pointerover",ot=t==="mouseout"||t==="pointerout",it&&a!==Yc&&(Wt=a.relatedTarget||a.fromElement)&&(R(Wt)||Wt[Pi]))break t;if((ot||it)&&(it=ut.window===ut?ut:(it=ut.ownerDocument)?it.defaultView||it.parentWindow:window,ot?(Wt=a.relatedTarget||a.toElement,ot=tt,Wt=Wt?R(Wt):null,Wt!==null&&(He=u(Wt),ne=Wt.tag,Wt!==He||ne!==5&&ne!==27&&ne!==6)&&(Wt=null)):(ot=null,Wt=tt),ot!==Wt)){if(ne=Gd,mt="onMouseLeave",Z="onMouseEnter",V="mouse",(t==="pointerout"||t==="pointerover")&&(ne=kd,mt="onPointerLeave",Z="onPointerEnter",V="pointer"),He=ot==null?it:st(ot),J=Wt==null?it:st(Wt),it=new ne(mt,V+"leave",ot,a,ut),it.target=He,it.relatedTarget=J,mt=null,R(ut)===tt&&(ne=new ne(Z,V+"enter",Wt,a,ut),ne.target=J,ne.relatedTarget=He,mt=ne),He=mt,ot&&Wt)e:{for(ne=ky,Z=ot,V=Wt,J=0,mt=Z;mt;mt=ne(mt))J++;mt=0;for(var te=V;te;te=ne(te))mt++;for(;0<J-mt;)Z=ne(Z),J--;for(;0<mt-J;)V=ne(V),mt--;for(;J--;){if(Z===V||V!==null&&Z===V.alternate){ne=Z;break e}Z=ne(Z),V=ne(V)}ne=null}else ne=null;ot!==null&&Og(vt,it,ot,ne,!1),Wt!==null&&He!==null&&Og(vt,He,Wt,ne,!0)}}t:{if(it=tt?st(tt):window,ot=it.nodeName&&it.nodeName.toLowerCase(),ot==="select"||ot==="input"&&it.type==="file")var Ce=Qd;else if(Zd(it))if(Jd)Ce=ty;else{Ce=J0;var jt=Q0}else ot=it.nodeName,!ot||ot.toLowerCase()!=="input"||it.type!=="checkbox"&&it.type!=="radio"?tt&&Wc(tt.elementType)&&(Ce=Qd):Ce=$0;if(Ce&&(Ce=Ce(t,tt))){Kd(vt,Ce,a,ut);break t}jt&&jt(t,it,tt),t==="focusout"&&tt&&it.type==="number"&&tt.memoizedProps.value!=null&&An(it,"number",it.value)}switch(jt=tt?st(tt):window,t){case"focusin":(Zd(jt)||jt.contentEditable==="true")&&(Ns=jt,ru=tt,Kr=null);break;case"focusout":Kr=ru=Ns=null;break;case"mousedown":ou=!0;break;case"contextmenu":case"mouseup":case"dragend":ou=!1,rp(vt,a,ut);break;case"selectionchange":if(ny)break;case"keydown":case"keyup":rp(vt,a,ut)}var he;if(nu)t:{switch(t){case"compositionstart":var xe="onCompositionStart";break t;case"compositionend":xe="onCompositionEnd";break t;case"compositionupdate":xe="onCompositionUpdate";break t}xe=void 0}else Us?Yd(t,a)&&(xe="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(xe="onCompositionStart");xe&&(Xd&&a.locale!=="ko"&&(Us||xe!=="onCompositionStart"?xe==="onCompositionEnd"&&Us&&(he=Fd()):(da=ut,Qc="value"in da?da.value:da.textContent,Us=!0)),jt=Gl(tt,xe),0<jt.length&&(xe=new Vd(xe,t,null,a,ut),vt.push({event:xe,listeners:jt}),he?xe.data=he:(he=jd(a),he!==null&&(xe.data=he)))),(he=W0?Y0(t,a):j0(t,a))&&(xe=Gl(tt,"onBeforeInput"),0<xe.length&&(jt=new Vd("onBeforeInput","beforeinput",null,a,ut),vt.push({event:jt,listeners:xe}),jt.data=he)),Fy(vt,t,tt,a,ut)}Ng(vt,n)})}function Mo(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Gl(t,n){for(var a=n+"Capture",r=[];t!==null;){var c=t,f=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||f===null||(c=Vr(t,a),c!=null&&r.unshift(Mo(t,c,f)),c=Vr(t,n),c!=null&&r.push(Mo(t,c,f))),t.tag===3)return r;t=t.return}return[]}function ky(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Og(t,n,a,r,c){for(var f=n._reactName,_=[];a!==null&&a!==r;){var b=a,I=b.alternate,tt=b.stateNode;if(b=b.tag,I!==null&&I===r)break;b!==5&&b!==26&&b!==27||tt===null||(I=tt,c?(tt=Vr(a,f),tt!=null&&_.unshift(Mo(a,tt,I))):c||(tt=Vr(a,f),tt!=null&&_.push(Mo(a,tt,I)))),a=a.return}_.length!==0&&t.push({event:n,listeners:_})}var Xy=/\r\n?/g,qy=/\u0000|\uFFFD/g;function Pg(t){return(typeof t=="string"?t:""+t).replace(Xy,`
`).replace(qy,"")}function zg(t,n){return n=Pg(n),Pg(t)===n}function Fe(t,n,a,r,c,f){switch(a){case"children":typeof r=="string"?n==="body"||n==="textarea"&&r===""||In(t,r):(typeof r=="number"||typeof r=="bigint")&&n!=="body"&&In(t,""+r);break;case"className":Xe(t,"class",r);break;case"tabIndex":Xe(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":Xe(t,a,r);break;case"style":zd(t,r,f);break;case"data":if(n!=="object"){Xe(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Yo(""+r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Fe(t,n,"name",c.name,c,null),Fe(t,n,"formEncType",c.formEncType,c,null),Fe(t,n,"formMethod",c.formMethod,c,null),Fe(t,n,"formTarget",c.formTarget,c,null)):(Fe(t,n,"encType",c.encType,c,null),Fe(t,n,"method",c.method,c,null),Fe(t,n,"target",c.target,c,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Yo(""+r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=zi);break;case"onScroll":r!=null&&_e("scroll",t);break;case"onScrollEnd":r!=null&&_e("scrollend",t);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=Yo(""+r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""+r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":_e("beforetoggle",t),_e("toggle",t),Ee(t,"popover",r);break;case"xlinkActuate":Re(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Re(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Re(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Re(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Re(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Re(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Re(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Re(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Re(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":Ee(t,"is",r);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=y0.get(a)||a,Ee(t,a,r))}}function Lf(t,n,a,r,c,f){switch(a){case"style":zd(t,r,f);break;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof r=="string"?In(t,r):(typeof r=="number"||typeof r=="bigint")&&In(t,""+r);break;case"onScroll":r!=null&&_e("scroll",t);break;case"onScrollEnd":r!=null&&_e("scrollend",t);break;case"onClick":r!=null&&(t.onclick=zi);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!zt.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),n=a.slice(2,c?a.length-7:void 0),f=t[Sn]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,c),typeof r=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,r,c);break t}a in t?t[a]=r:r===!0?t.setAttribute(a,""):Ee(t,a,r)}}}function bn(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":_e("error",t),_e("load",t);var r=!1,c=!1,f;for(f in a)if(a.hasOwnProperty(f)){var _=a[f];if(_!=null)switch(f){case"src":r=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Fe(t,n,f,_,a,null)}}c&&Fe(t,n,"srcSet",a.srcSet,a,null),r&&Fe(t,n,"src",a.src,a,null);return;case"input":_e("invalid",t);var b=f=_=c=null,I=null,tt=null;for(r in a)if(a.hasOwnProperty(r)){var ut=a[r];if(ut!=null)switch(r){case"name":c=ut;break;case"type":_=ut;break;case"checked":I=ut;break;case"defaultChecked":tt=ut;break;case"value":f=ut;break;case"defaultValue":b=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:Fe(t,n,r,ut,a,null)}}Un(t,f,b,I,tt,_,c,!1);return;case"select":_e("invalid",t),r=_=f=null;for(c in a)if(a.hasOwnProperty(c)&&(b=a[c],b!=null))switch(c){case"value":f=b;break;case"defaultValue":_=b;break;case"multiple":r=b;default:Fe(t,n,c,b,a,null)}n=f,a=_,t.multiple=!!r,n!=null?Je(t,!!r,n,!1):a!=null&&Je(t,!!r,a,!0);return;case"textarea":_e("invalid",t),f=c=r=null;for(_ in a)if(a.hasOwnProperty(_)&&(b=a[_],b!=null))switch(_){case"value":r=b;break;case"defaultValue":c=b;break;case"children":f=b;break;case"dangerouslySetInnerHTML":if(b!=null)throw Error(s(91));break;default:Fe(t,n,_,b,a,null)}Cs(t,r,c,f);return;case"option":for(I in a)if(a.hasOwnProperty(I)&&(r=a[I],r!=null))switch(I){case"selected":t.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Fe(t,n,I,r,a,null)}return;case"dialog":_e("beforetoggle",t),_e("toggle",t),_e("cancel",t),_e("close",t);break;case"iframe":case"object":_e("load",t);break;case"video":case"audio":for(r=0;r<xo.length;r++)_e(xo[r],t);break;case"image":_e("error",t),_e("load",t);break;case"details":_e("toggle",t);break;case"embed":case"source":case"link":_e("error",t),_e("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(r=a[tt],r!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Fe(t,n,tt,r,a,null)}return;default:if(Wc(n)){for(ut in a)a.hasOwnProperty(ut)&&(r=a[ut],r!==void 0&&Lf(t,n,ut,r,a,void 0));return}}for(b in a)a.hasOwnProperty(b)&&(r=a[b],r!=null&&Fe(t,n,b,r,a,null))}function Wy(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,f=null,_=null,b=null,I=null,tt=null,ut=null;for(ot in a){var vt=a[ot];if(a.hasOwnProperty(ot)&&vt!=null)switch(ot){case"checked":break;case"value":break;case"defaultValue":I=vt;default:r.hasOwnProperty(ot)||Fe(t,n,ot,null,r,vt)}}for(var it in r){var ot=r[it];if(vt=a[it],r.hasOwnProperty(it)&&(ot!=null||vt!=null))switch(it){case"type":f=ot;break;case"name":c=ot;break;case"checked":tt=ot;break;case"defaultChecked":ut=ot;break;case"value":_=ot;break;case"defaultValue":b=ot;break;case"children":case"dangerouslySetInnerHTML":if(ot!=null)throw Error(s(137,n));break;default:ot!==vt&&Fe(t,n,it,ot,r,vt)}}Ie(t,_,b,I,tt,ut,f,c);return;case"select":ot=_=b=it=null;for(f in a)if(I=a[f],a.hasOwnProperty(f)&&I!=null)switch(f){case"value":break;case"multiple":ot=I;default:r.hasOwnProperty(f)||Fe(t,n,f,null,r,I)}for(c in r)if(f=r[c],I=a[c],r.hasOwnProperty(c)&&(f!=null||I!=null))switch(c){case"value":it=f;break;case"defaultValue":b=f;break;case"multiple":_=f;default:f!==I&&Fe(t,n,c,f,r,I)}n=b,a=_,r=ot,it!=null?Je(t,!!a,it,!1):!!r!=!!a&&(n!=null?Je(t,!!a,n,!0):Je(t,!!a,a?[]:"",!1));return;case"textarea":ot=it=null;for(b in a)if(c=a[b],a.hasOwnProperty(b)&&c!=null&&!r.hasOwnProperty(b))switch(b){case"value":break;case"children":break;default:Fe(t,n,b,null,r,c)}for(_ in r)if(c=r[_],f=a[_],r.hasOwnProperty(_)&&(c!=null||f!=null))switch(_){case"value":it=c;break;case"defaultValue":ot=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==f&&Fe(t,n,_,c,r,f)}xn(t,it,ot);return;case"option":for(var Wt in a)if(it=a[Wt],a.hasOwnProperty(Wt)&&it!=null&&!r.hasOwnProperty(Wt))switch(Wt){case"selected":t.selected=!1;break;default:Fe(t,n,Wt,null,r,it)}for(I in r)if(it=r[I],ot=a[I],r.hasOwnProperty(I)&&it!==ot&&(it!=null||ot!=null))switch(I){case"selected":t.selected=it&&typeof it!="function"&&typeof it!="symbol";break;default:Fe(t,n,I,it,r,ot)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ne in a)it=a[ne],a.hasOwnProperty(ne)&&it!=null&&!r.hasOwnProperty(ne)&&Fe(t,n,ne,null,r,it);for(tt in r)if(it=r[tt],ot=a[tt],r.hasOwnProperty(tt)&&it!==ot&&(it!=null||ot!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(it!=null)throw Error(s(137,n));break;default:Fe(t,n,tt,it,r,ot)}return;default:if(Wc(n)){for(var He in a)it=a[He],a.hasOwnProperty(He)&&it!==void 0&&!r.hasOwnProperty(He)&&Lf(t,n,He,void 0,r,it);for(ut in r)it=r[ut],ot=a[ut],!r.hasOwnProperty(ut)||it===ot||it===void 0&&ot===void 0||Lf(t,n,ut,it,r,ot);return}}for(var Z in a)it=a[Z],a.hasOwnProperty(Z)&&it!=null&&!r.hasOwnProperty(Z)&&Fe(t,n,Z,null,r,it);for(vt in r)it=r[vt],ot=a[vt],!r.hasOwnProperty(vt)||it===ot||it==null&&ot==null||Fe(t,n,vt,it,r,ot)}function Ig(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Yy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var c=a[r],f=c.transferSize,_=c.initiatorType,b=c.duration;if(f&&b&&Ig(_)){for(_=0,b=c.responseEnd,r+=1;r<a.length;r++){var I=a[r],tt=I.startTime;if(tt>b)break;var ut=I.transferSize,vt=I.initiatorType;ut&&Ig(vt)&&(I=I.responseEnd,_+=ut*(I<b?1:(b-tt)/(I-tt)))}if(--r,n+=8*(f+_)/(c.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Of=null,Pf=null;function Vl(t){return t.nodeType===9?t:t.ownerDocument}function Bg(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Fg(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function zf(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var If=null;function jy(){var t=window.event;return t&&t.type==="popstate"?t===If?!1:(If=t,!0):(If=null,!1)}var Hg=typeof setTimeout=="function"?setTimeout:void 0,Zy=typeof clearTimeout=="function"?clearTimeout:void 0,Gg=typeof Promise=="function"?Promise:void 0,Ky=typeof queueMicrotask=="function"?queueMicrotask:typeof Gg<"u"?function(t){return Gg.resolve(null).then(t).catch(Qy)}:Hg;function Qy(t){setTimeout(function(){throw t})}function Da(t){return t==="head"}function Vg(t,n){var a=n,r=0;do{var c=a.nextSibling;if(t.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(c),sr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")Eo(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Eo(a);for(var f=a.firstChild;f;){var _=f.nextSibling,b=f.nodeName;f[Za]||b==="SCRIPT"||b==="STYLE"||b==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=_}}else a==="body"&&Eo(t.ownerDocument.body);a=c}while(a);sr(n)}function kg(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function Bf(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":Bf(a),Gr(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Jy(t,n,a,r){for(;t.nodeType===1;){var c=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[Za])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==c.rel||t.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||t.getAttribute("title")!==(c.title==null?null:c.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(c.src==null?null:c.src)||t.getAttribute("type")!==(c.type==null?null:c.type)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=c.name==null?null:""+c.name;if(c.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=ci(t.nextSibling),t===null)break}return null}function $y(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=ci(t.nextSibling),t===null))return null;return t}function Xg(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=ci(t.nextSibling),t===null))return null;return t}function Ff(t){return t.data==="$?"||t.data==="$~"}function Hf(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function tS(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function ci(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var Gf=null;function qg(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return ci(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Wg(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function Yg(t,n,a){switch(n=Vl(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Eo(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Gr(t)}var ui=new Map,jg=new Set;function kl(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ji=X.d;X.d={f:eS,r:nS,D:iS,C:aS,L:sS,m:rS,X:lS,S:oS,M:cS};function eS(){var t=Ji.f(),n=Ol();return t||n}function nS(t){var n=Y(t);n!==null&&n.tag===5&&n.type==="form"?fm(n):Ji.r(t)}var nr=typeof document>"u"?null:document;function Zg(t,n,a){var r=nr;if(r&&typeof n=="string"&&n){var c=gn(n);c='link[rel="'+t+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),jg.has(c)||(jg.add(c),t={rel:t,crossOrigin:a,href:n},r.querySelector(c)===null&&(n=r.createElement("link"),bn(n,"link",t),k(n),r.head.appendChild(n)))}}function iS(t){Ji.D(t),Zg("dns-prefetch",t,null)}function aS(t,n){Ji.C(t,n),Zg("preconnect",t,n)}function sS(t,n,a){Ji.L(t,n,a);var r=nr;if(r&&t&&n){var c='link[rel="preload"][as="'+gn(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+gn(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+gn(a.imageSizes)+'"]')):c+='[href="'+gn(t)+'"]';var f=c;switch(n){case"style":f=ir(t);break;case"script":f=ar(t)}ui.has(f)||(t=y({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),ui.set(f,t),r.querySelector(c)!==null||n==="style"&&r.querySelector(To(f))||n==="script"&&r.querySelector(bo(f))||(n=r.createElement("link"),bn(n,"link",t),k(n),r.head.appendChild(n)))}}function rS(t,n){Ji.m(t,n);var a=nr;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+gn(r)+'"][href="'+gn(t)+'"]',f=c;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=ar(t)}if(!ui.has(f)&&(t=y({rel:"modulepreload",href:t},n),ui.set(f,t),a.querySelector(c)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(bo(f)))return}r=a.createElement("link"),bn(r,"link",t),k(r),a.head.appendChild(r)}}}function oS(t,n,a){Ji.S(t,n,a);var r=nr;if(r&&t){var c=rt(r).hoistableStyles,f=ir(t);n=n||"default";var _=c.get(f);if(!_){var b={loading:0,preload:null};if(_=r.querySelector(To(f)))b.loading=5;else{t=y({rel:"stylesheet",href:t,"data-precedence":n},a),(a=ui.get(f))&&Vf(t,a);var I=_=r.createElement("link");k(I),bn(I,"link",t),I._p=new Promise(function(tt,ut){I.onload=tt,I.onerror=ut}),I.addEventListener("load",function(){b.loading|=1}),I.addEventListener("error",function(){b.loading|=2}),b.loading|=4,Xl(_,n,r)}_={type:"stylesheet",instance:_,count:1,state:b},c.set(f,_)}}}function lS(t,n){Ji.X(t,n);var a=nr;if(a&&t){var r=rt(a).hoistableScripts,c=ar(t),f=r.get(c);f||(f=a.querySelector(bo(c)),f||(t=y({src:t,async:!0},n),(n=ui.get(c))&&kf(t,n),f=a.createElement("script"),k(f),bn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function cS(t,n){Ji.M(t,n);var a=nr;if(a&&t){var r=rt(a).hoistableScripts,c=ar(t),f=r.get(c);f||(f=a.querySelector(bo(c)),f||(t=y({src:t,async:!0,type:"module"},n),(n=ui.get(c))&&kf(t,n),f=a.createElement("script"),k(f),bn(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},r.set(c,f))}}function Kg(t,n,a,r){var c=(c=xt.current)?kl(c):null;if(!c)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=ir(a.href),a=rt(c).hoistableStyles,r=a.get(n),r||(r={type:"style",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=ir(a.href);var f=rt(c).hoistableStyles,_=f.get(t);if(_||(c=c.ownerDocument||c,_={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,_),(f=c.querySelector(To(t)))&&!f._p&&(_.instance=f,_.state.loading=5),ui.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},ui.set(t,a),f||uS(c,t,a,_.state))),n&&r===null)throw Error(s(528,""));return _}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=ar(a),a=rt(c).hoistableScripts,r=a.get(n),r||(r={type:"script",instance:null,count:0,state:null},a.set(n,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function ir(t){return'href="'+gn(t)+'"'}function To(t){return'link[rel="stylesheet"]['+t+"]"}function Qg(t){return y({},t,{"data-precedence":t.precedence,precedence:null})}function uS(t,n,a,r){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?r.loading=1:(n=t.createElement("link"),r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2}),bn(n,"link",a),k(n),t.head.appendChild(n))}function ar(t){return'[src="'+gn(t)+'"]'}function bo(t){return"script[async]"+t}function Jg(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+gn(a.href)+'"]');if(r)return n.instance=r,k(r),r;var c=y({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),k(r),bn(r,"style",c),Xl(r,a.precedence,t),n.instance=r;case"stylesheet":c=ir(a.href);var f=t.querySelector(To(c));if(f)return n.state.loading|=4,n.instance=f,k(f),f;r=Qg(a),(c=ui.get(c))&&Vf(r,c),f=(t.ownerDocument||t).createElement("link"),k(f);var _=f;return _._p=new Promise(function(b,I){_.onload=b,_.onerror=I}),bn(f,"link",r),n.state.loading|=4,Xl(f,a.precedence,t),n.instance=f;case"script":return f=ar(a.src),(c=t.querySelector(bo(f)))?(n.instance=c,k(c),c):(r=a,(c=ui.get(f))&&(r=y({},a),kf(r,c)),t=t.ownerDocument||t,c=t.createElement("script"),k(c),bn(c,"link",r),t.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Xl(r,a.precedence,t));return n.instance}function Xl(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=r.length?r[r.length-1]:null,f=c,_=0;_<r.length;_++){var b=r[_];if(b.dataset.precedence===n)f=b;else if(f!==c)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function Vf(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function kf(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var ql=null;function $g(t,n,a){if(ql===null){var r=new Map,c=ql=new Map;c.set(a,r)}else c=ql,r=c.get(a),r||(r=new Map,c.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),c=0;c<a.length;c++){var f=a[c];if(!(f[Za]||f[Qe]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var _=f.getAttribute(n)||"";_=t+_;var b=r.get(_);b?b.push(f):r.set(_,[f])}}return r}function t_(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function fS(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function e_(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function hS(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=ir(r.href),f=n.querySelector(To(c));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=Wl.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,k(f);return}f=n.ownerDocument||n,r=Qg(r),(c=ui.get(c))&&Vf(r,c),f=f.createElement("link"),k(f);var _=f;_._p=new Promise(function(b,I){_.onload=b,_.onerror=I}),bn(f,"link",r),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=Wl.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Xf=0;function dS(t,n){return t.stylesheets&&t.count===0&&jl(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&jl(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&Xf===0&&(Xf=62500*Yy());var c=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&jl(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>Xf?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(c)}}:null}function Wl(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)jl(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Yl=null;function jl(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Yl=new Map,n.forEach(pS,t),Yl=null,Wl.call(t))}function pS(t,n){if(!(n.state.loading&4)){var a=Yl.get(t);if(a)var r=a.get(null);else{a=new Map,Yl.set(t,a);for(var c=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<c.length;f++){var _=c[f];(_.nodeName==="LINK"||_.getAttribute("media")!=="not all")&&(a.set(_.dataset.precedence,_),r=_)}r&&a.set(null,r)}c=n.instance,_=c.getAttribute("data-precedence"),f=a.get(_)||r,f===r&&a.set(null,c),a.set(_,c),this.count++,r=Wl.bind(this),c.addEventListener("load",r),c.addEventListener("error",r),f?f.parentNode.insertBefore(c,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(c,t.firstChild)),n.state.loading|=4}}var Ao={$$typeof:L,Provider:null,Consumer:null,_currentValue:F,_currentValue2:F,_threadCount:0};function mS(t,n,a,r,c,f,_,b,I){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Ae(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Ae(0),this.hiddenUpdates=Ae(null),this.identifierPrefix=r,this.onUncaughtError=c,this.onCaughtError=f,this.onRecoverableError=_,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=I,this.incompleteTransitions=new Map}function n_(t,n,a,r,c,f,_,b,I,tt,ut,vt){return t=new mS(t,n,a,_,I,tt,ut,vt,b),n=1,f===!0&&(n|=24),f=Zn(3,null,null,n),t.current=f,f.stateNode=t,n=Mu(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:r,isDehydrated:a,cache:n},Au(f),t}function i_(t){return t?(t=Ps,t):Ps}function a_(t,n,a,r,c,f){c=i_(c),r.context===null?r.context=c:r.pendingContext=c,r=ya(n),r.payload={element:a},f=f===void 0?null:f,f!==null&&(r.callback=f),a=Sa(t,r,n),a!==null&&(kn(a,t,n),io(a,t,n))}function s_(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function qf(t,n){s_(t,n),(t=t.alternate)&&s_(t,n)}function r_(t){if(t.tag===13||t.tag===31){var n=$a(t,67108864);n!==null&&kn(n,t,67108864),qf(t,67108864)}}function o_(t){if(t.tag===13||t.tag===31){var n=ti();n=Ya(n);var a=$a(t,n);a!==null&&kn(a,t,n),qf(t,n)}}var Zl=!0;function gS(t,n,a,r){var c=P.T;P.T=null;var f=X.p;try{X.p=2,Wf(t,n,a,r)}finally{X.p=f,P.T=c}}function _S(t,n,a,r){var c=P.T;P.T=null;var f=X.p;try{X.p=8,Wf(t,n,a,r)}finally{X.p=f,P.T=c}}function Wf(t,n,a,r){if(Zl){var c=Yf(r);if(c===null)Nf(t,n,r,Kl,a),c_(t,r);else if(yS(c,t,n,a,r))r.stopPropagation();else if(c_(t,r),n&4&&-1<vS.indexOf(t)){for(;c!==null;){var f=Y(c);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var _=Lt(f.pendingLanes);if(_!==0){var b=f;for(b.pendingLanes|=2,b.entangledLanes|=2;_;){var I=1<<31-ie(_);b.entanglements[1]|=I,_&=~I}Ui(f),(Ne&6)===0&&(Nl=lt()+500,So(0))}}break;case 31:case 13:b=$a(f,2),b!==null&&kn(b,f,2),Ol(),qf(f,2)}if(f=Yf(r),f===null&&Nf(t,n,r,Kl,a),f===c)break;c=f}c!==null&&r.stopPropagation()}else Nf(t,n,r,null,a)}}function Yf(t){return t=jc(t),jf(t)}var Kl=null;function jf(t){if(Kl=null,t=R(t),t!==null){var n=u(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=h(n),t!==null)return t;t=null}else if(a===31){if(t=d(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Kl=t,null}function l_(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(gt()){case _t:return 2;case Kt:return 8;case Ot:case Xt:return 32;case ye:return 268435456;default:return 32}default:return 32}}var Zf=!1,Ua=null,Na=null,La=null,Ro=new Map,Co=new Map,Oa=[],vS="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function c_(t,n){switch(t){case"focusin":case"focusout":Ua=null;break;case"dragenter":case"dragleave":Na=null;break;case"mouseover":case"mouseout":La=null;break;case"pointerover":case"pointerout":Ro.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Co.delete(n.pointerId)}}function wo(t,n,a,r,c,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:f,targetContainers:[c]},n!==null&&(n=Y(n),n!==null&&r_(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),t)}function yS(t,n,a,r,c){switch(n){case"focusin":return Ua=wo(Ua,t,n,a,r,c),!0;case"dragenter":return Na=wo(Na,t,n,a,r,c),!0;case"mouseover":return La=wo(La,t,n,a,r,c),!0;case"pointerover":var f=c.pointerId;return Ro.set(f,wo(Ro.get(f)||null,t,n,a,r,c)),!0;case"gotpointercapture":return f=c.pointerId,Co.set(f,wo(Co.get(f)||null,t,n,a,r,c)),!0}return!1}function u_(t){var n=R(t.target);if(n!==null){var a=u(n);if(a!==null){if(n=a.tag,n===13){if(n=h(a),n!==null){t.blockedOn=n,ja(t.priority,function(){o_(a)});return}}else if(n===31){if(n=d(a),n!==null){t.blockedOn=n,ja(t.priority,function(){o_(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ql(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=Yf(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);Yc=r,a.target.dispatchEvent(r),Yc=null}else return n=Y(a),n!==null&&r_(n),t.blockedOn=a,!1;n.shift()}return!0}function f_(t,n,a){Ql(t)&&a.delete(n)}function SS(){Zf=!1,Ua!==null&&Ql(Ua)&&(Ua=null),Na!==null&&Ql(Na)&&(Na=null),La!==null&&Ql(La)&&(La=null),Ro.forEach(f_),Co.forEach(f_)}function Jl(t,n){t.blockedOn===n&&(t.blockedOn=null,Zf||(Zf=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,SS)))}var $l=null;function h_(t){$l!==t&&($l=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){$l===t&&($l=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],c=t[n+2];if(typeof r!="function"){if(jf(r||a)===null)continue;break}var f=Y(a);f!==null&&(t.splice(n,3),n-=3,Wu(f,{pending:!0,data:c,method:a.method,action:r},r,c))}}))}function sr(t){function n(I){return Jl(I,t)}Ua!==null&&Jl(Ua,t),Na!==null&&Jl(Na,t),La!==null&&Jl(La,t),Ro.forEach(n),Co.forEach(n);for(var a=0;a<Oa.length;a++){var r=Oa[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<Oa.length&&(a=Oa[0],a.blockedOn===null);)u_(a),a.blockedOn===null&&Oa.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var c=a[r],f=a[r+1],_=c[Sn]||null;if(typeof f=="function")_||h_(a);else if(_){var b=null;if(f&&f.hasAttribute("formAction")){if(c=f,_=f[Sn]||null)b=_.formAction;else if(jf(c)!==null)continue}else b=_.action;typeof b=="function"?a[r+1]=b:(a.splice(r,3),r-=3),h_(a)}}}function d_(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(_){return c=_})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,c=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function Kf(t){this._internalRoot=t}tc.prototype.render=Kf.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ti();a_(a,r,t,n,null,null)},tc.prototype.unmount=Kf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;a_(t.current,2,null,t,null,null),Ol(),n[Pi]=null}};function tc(t){this._internalRoot=t}tc.prototype.unstable_scheduleHydration=function(t){if(t){var n=Fr();t={blockedOn:null,target:t,priority:n};for(var a=0;a<Oa.length&&n!==0&&n<Oa[a].priority;a++);Oa.splice(a,0,t),a===0&&u_(t)}};var p_=e.version;if(p_!=="19.2.4")throw Error(s(527,p_,"19.2.4"));X.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=p(n),t=t!==null?g(t):null,t=t===null?null:t.stateNode,t};var xS={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:P,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ec=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ec.isDisabled&&ec.supportsFiber)try{Jt=ec.inject(xS),Qt=ec}catch{}}return Uo.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,r="",c=xm,f=Mm,_=Em;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(_=n.onRecoverableError)),n=n_(t,1,!1,null,null,a,r,null,c,f,_,d_),t[Pi]=n.current,Uf(t),new Kf(n)},Uo.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var r=!1,c="",f=xm,_=Mm,b=Em,I=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(_=a.onCaughtError),a.onRecoverableError!==void 0&&(b=a.onRecoverableError),a.formState!==void 0&&(I=a.formState)),n=n_(t,1,!0,n,a??null,r,c,I,f,_,b,d_),n.context=i_(null),a=n.current,r=ti(),r=Ya(r),c=ya(r),c.callback=null,Sa(a,c,r),a=r,n.current.lanes=a,yn(n,a),Ui(n),t[Pi]=n.current,Uf(t),new tc(n)},Uo.version="19.2.4",Uo}var T_;function US(){if(T_)return $f.exports;T_=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),$f.exports=DS(),$f.exports}var NS=US();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const bd="172",Tr={ROTATE:0,DOLLY:1,PAN:2},xr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},LS=0,b_=1,OS=2,Bv=1,PS=2,aa=3,Wa=0,Wn=1,sa=2,Xa=0,br=1,A_=2,R_=3,C_=4,zS=5,ys=100,IS=101,BS=102,FS=103,HS=104,GS=200,VS=201,kS=202,XS=203,Oh=204,Ph=205,qS=206,WS=207,YS=208,jS=209,ZS=210,KS=211,QS=212,JS=213,$S=214,zh=0,Ih=1,Bh=2,Cr=3,Fh=4,Hh=5,Gh=6,Vh=7,Fv=0,tx=1,ex=2,qa=0,nx=1,ix=2,ax=3,sx=4,rx=5,ox=6,lx=7,Hv=300,wr=301,Dr=302,kh=303,Xh=304,Gc=306,qh=1e3,xs=1001,Wh=1002,bi=1003,cx=1004,nc=1005,Li=1006,ih=1007,Ms=1008,ua=1009,Gv=1010,Vv=1011,Fo=1012,Ad=1013,Es=1014,ra=1015,Ho=1016,Rd=1017,Cd=1018,Ur=1020,kv=35902,Xv=1021,qv=1022,Ti=1023,Wv=1024,Yv=1025,Ar=1026,Nr=1027,jv=1028,wd=1029,Zv=1030,Dd=1031,Ud=1033,wc=33776,Dc=33777,Uc=33778,Nc=33779,Yh=35840,jh=35841,Zh=35842,Kh=35843,Qh=36196,Jh=37492,$h=37496,td=37808,ed=37809,nd=37810,id=37811,ad=37812,sd=37813,rd=37814,od=37815,ld=37816,cd=37817,ud=37818,fd=37819,hd=37820,dd=37821,Lc=36492,pd=36494,md=36495,Kv=36283,gd=36284,_d=36285,vd=36286,ux=3200,fx=3201,hx=0,dx=1,ka="",hi="srgb",Lr="srgb-linear",zc="linear",Ge="srgb",rr=7680,w_=519,px=512,mx=513,gx=514,Qv=515,_x=516,vx=517,yx=518,Sx=519,D_=35044,U_="300 es",oa=2e3,Ic=2001;class As{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){if(this._listeners===void 0)return;const l=this._listeners[e];if(l!==void 0){const u=l.indexOf(i);u!==-1&&l.splice(u,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let u=0,h=l.length;u<h;u++)l[u].call(this,e);e.target=null}}}const Cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Oc=Math.PI/180,yd=180/Math.PI;function Go(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(Cn[o&255]+Cn[o>>8&255]+Cn[o>>16&255]+Cn[o>>24&255]+"-"+Cn[e&255]+Cn[e>>8&255]+"-"+Cn[e>>16&15|64]+Cn[e>>24&255]+"-"+Cn[i&63|128]+Cn[i>>8&255]+"-"+Cn[i>>16&255]+Cn[i>>24&255]+Cn[s&255]+Cn[s>>8&255]+Cn[s>>16&255]+Cn[s>>24&255]).toLowerCase()}function ve(o,e,i){return Math.max(e,Math.min(i,o))}function xx(o,e){return(o%e+e)%e}function ah(o,e,i){return(1-i)*o+i*e}function No(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("Invalid component type.")}}function Xn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("Invalid component type.")}}const Mx={DEG2RAD:Oc};class me{constructor(e=0,i=0){me.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=ve(this.x,e.x,i.x),this.y=ve(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=ve(this.x,e,i),this.y=ve(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ve(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(ve(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),u=this.x-e.x,h=this.y-e.y;return this.x=u*s-h*l+e.x,this.y=u*l+h*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class de{constructor(e,i,s,l,u,h,d,m,p){de.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,u,h,d,m,p)}set(e,i,s,l,u,h,d,m,p){const g=this.elements;return g[0]=e,g[1]=l,g[2]=d,g[3]=i,g[4]=u,g[5]=m,g[6]=s,g[7]=h,g[8]=p,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,u=this.elements,h=s[0],d=s[3],m=s[6],p=s[1],g=s[4],y=s[7],S=s[2],M=s[5],E=s[8],A=l[0],x=l[3],v=l[6],B=l[1],L=l[4],w=l[7],q=l[2],G=l[5],O=l[8];return u[0]=h*A+d*B+m*q,u[3]=h*x+d*L+m*G,u[6]=h*v+d*w+m*O,u[1]=p*A+g*B+y*q,u[4]=p*x+g*L+y*G,u[7]=p*v+g*w+y*O,u[2]=S*A+M*B+E*q,u[5]=S*x+M*L+E*G,u[8]=S*v+M*w+E*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],u=e[3],h=e[4],d=e[5],m=e[6],p=e[7],g=e[8];return i*h*g-i*d*p-s*u*g+s*d*m+l*u*p-l*h*m}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],u=e[3],h=e[4],d=e[5],m=e[6],p=e[7],g=e[8],y=g*h-d*p,S=d*m-g*u,M=p*u-h*m,E=i*y+s*S+l*M;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const A=1/E;return e[0]=y*A,e[1]=(l*p-g*s)*A,e[2]=(d*s-l*h)*A,e[3]=S*A,e[4]=(g*i-l*m)*A,e[5]=(l*u-d*i)*A,e[6]=M*A,e[7]=(s*m-p*i)*A,e[8]=(h*i-s*u)*A,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,u,h,d){const m=Math.cos(u),p=Math.sin(u);return this.set(s*m,s*p,-s*(m*h+p*d)+h+e,-l*p,l*m,-l*(-p*h+m*d)+d+i,0,0,1),this}scale(e,i){return this.premultiply(sh.makeScale(e,i)),this}rotate(e){return this.premultiply(sh.makeRotation(-e)),this}translate(e,i){return this.premultiply(sh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const sh=new de;function Jv(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Bc(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function Ex(){const o=Bc("canvas");return o.style.display="block",o}const N_={};function Sr(o){o in N_||(N_[o]=!0,console.warn(o))}function Tx(o,e,i){return new Promise(function(s,l){function u(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(u,i);break;default:s()}}setTimeout(u,i)})}function bx(o){const e=o.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Ax(o){const e=o.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const L_=new de().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),O_=new de().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Rx(){const o={enabled:!0,workingColorSpace:Lr,spaces:{},convert:function(l,u,h){return this.enabled===!1||u===h||!u||!h||(this.spaces[u].transfer===Ge&&(l.r=ca(l.r),l.g=ca(l.g),l.b=ca(l.b)),this.spaces[u].primaries!==this.spaces[h].primaries&&(l.applyMatrix3(this.spaces[u].toXYZ),l.applyMatrix3(this.spaces[h].fromXYZ)),this.spaces[h].transfer===Ge&&(l.r=Rr(l.r),l.g=Rr(l.g),l.b=Rr(l.b))),l},fromWorkingColorSpace:function(l,u){return this.convert(l,this.workingColorSpace,u)},toWorkingColorSpace:function(l,u){return this.convert(l,u,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===ka?zc:this.spaces[l].transfer},getLuminanceCoefficients:function(l,u=this.workingColorSpace){return l.fromArray(this.spaces[u].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,u,h){return l.copy(this.spaces[u].toXYZ).multiply(this.spaces[h].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[Lr]:{primaries:e,whitePoint:s,transfer:zc,toXYZ:L_,fromXYZ:O_,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:hi},outputColorSpaceConfig:{drawingBufferColorSpace:hi}},[hi]:{primaries:e,whitePoint:s,transfer:Ge,toXYZ:L_,fromXYZ:O_,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:hi}}}),o}const De=Rx();function ca(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function Rr(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let or;class Cx{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{or===void 0&&(or=Bc("canvas")),or.width=e.width,or.height=e.height;const s=or.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=or}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Bc("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),u=l.data;for(let h=0;h<u.length;h++)u[h]=ca(u[h]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(ca(i[s]/255)*255):i[s]=ca(i[s]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let wx=0;class $v{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=Go(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let u;if(Array.isArray(l)){u=[];for(let h=0,d=l.length;h<d;h++)l[h].isDataTexture?u.push(rh(l[h].image)):u.push(rh(l[h]))}else u=rh(l);s.url=u}return i||(e.images[this.uuid]=s),s}}function rh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?Cx.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Dx=0;class Yn extends As{constructor(e=Yn.DEFAULT_IMAGE,i=Yn.DEFAULT_MAPPING,s=xs,l=xs,u=Li,h=Ms,d=Ti,m=ua,p=Yn.DEFAULT_ANISOTROPY,g=ka){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dx++}),this.uuid=Go(),this.name="",this.source=new $v(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=u,this.minFilter=h,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=m,this.offset=new me(0,0),this.repeat=new me(1,1),this.center=new me(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new de,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=g,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hv)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qh:e.x=e.x-Math.floor(e.x);break;case xs:e.x=e.x<0?0:1;break;case Wh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qh:e.y=e.y-Math.floor(e.y);break;case xs:e.y=e.y<0?0:1;break;case Wh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=Hv;Yn.DEFAULT_ANISOTROPY=1;class an{constructor(e=0,i=0,s=0,l=1){an.prototype.isVector4=!0,this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,u=this.w,h=e.elements;return this.x=h[0]*i+h[4]*s+h[8]*l+h[12]*u,this.y=h[1]*i+h[5]*s+h[9]*l+h[13]*u,this.z=h[2]*i+h[6]*s+h[10]*l+h[14]*u,this.w=h[3]*i+h[7]*s+h[11]*l+h[15]*u,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,u;const m=e.elements,p=m[0],g=m[4],y=m[8],S=m[1],M=m[5],E=m[9],A=m[2],x=m[6],v=m[10];if(Math.abs(g-S)<.01&&Math.abs(y-A)<.01&&Math.abs(E-x)<.01){if(Math.abs(g+S)<.1&&Math.abs(y+A)<.1&&Math.abs(E+x)<.1&&Math.abs(p+M+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const L=(p+1)/2,w=(M+1)/2,q=(v+1)/2,G=(g+S)/4,O=(y+A)/4,j=(E+x)/4;return L>w&&L>q?L<.01?(s=0,l=.707106781,u=.707106781):(s=Math.sqrt(L),l=G/s,u=O/s):w>q?w<.01?(s=.707106781,l=0,u=.707106781):(l=Math.sqrt(w),s=G/l,u=j/l):q<.01?(s=.707106781,l=.707106781,u=0):(u=Math.sqrt(q),s=O/u,l=j/u),this.set(s,l,u,i),this}let B=Math.sqrt((x-E)*(x-E)+(y-A)*(y-A)+(S-g)*(S-g));return Math.abs(B)<.001&&(B=1),this.x=(x-E)/B,this.y=(y-A)/B,this.z=(S-g)/B,this.w=Math.acos((p+M+v-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=ve(this.x,e.x,i.x),this.y=ve(this.y,e.y,i.y),this.z=ve(this.z,e.z,i.z),this.w=ve(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=ve(this.x,e,i),this.y=ve(this.y,e,i),this.z=ve(this.z,e,i),this.w=ve(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ve(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ux extends As{constructor(e=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=1,this.scissor=new an(0,0,e,i),this.scissorTest=!1,this.viewport=new an(0,0,e,i);const l={width:e,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Li,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const u=new Yn(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);u.flipY=!1,u.generateMipmaps=s.generateMipmaps,u.internalFormat=s.internalFormat,this.textures=[];const h=s.count;for(let d=0;d<h;d++)this.textures[d]=u.clone(),this.textures[d].isRenderTargetTexture=!0,this.textures[d].renderTarget=this;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,u=this.textures.length;l<u;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let s=0,l=e.textures.length;s<l;s++)this.textures[s]=e.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;const i=Object.assign({},e.texture.image);return this.texture.source=new $v(i),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ts extends Ux{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class t0 extends Yn{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=bi,this.minFilter=bi,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Nx extends Yn{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=bi,this.minFilter=bi,this.wrapR=xs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bs{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,u,h,d){let m=s[l+0],p=s[l+1],g=s[l+2],y=s[l+3];const S=u[h+0],M=u[h+1],E=u[h+2],A=u[h+3];if(d===0){e[i+0]=m,e[i+1]=p,e[i+2]=g,e[i+3]=y;return}if(d===1){e[i+0]=S,e[i+1]=M,e[i+2]=E,e[i+3]=A;return}if(y!==A||m!==S||p!==M||g!==E){let x=1-d;const v=m*S+p*M+g*E+y*A,B=v>=0?1:-1,L=1-v*v;if(L>Number.EPSILON){const q=Math.sqrt(L),G=Math.atan2(q,v*B);x=Math.sin(x*G)/q,d=Math.sin(d*G)/q}const w=d*B;if(m=m*x+S*w,p=p*x+M*w,g=g*x+E*w,y=y*x+A*w,x===1-d){const q=1/Math.sqrt(m*m+p*p+g*g+y*y);m*=q,p*=q,g*=q,y*=q}}e[i]=m,e[i+1]=p,e[i+2]=g,e[i+3]=y}static multiplyQuaternionsFlat(e,i,s,l,u,h){const d=s[l],m=s[l+1],p=s[l+2],g=s[l+3],y=u[h],S=u[h+1],M=u[h+2],E=u[h+3];return e[i]=d*E+g*y+m*M-p*S,e[i+1]=m*E+g*S+p*y-d*M,e[i+2]=p*E+g*M+d*S-m*y,e[i+3]=g*E-d*y-m*S-p*M,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,u=e._z,h=e._order,d=Math.cos,m=Math.sin,p=d(s/2),g=d(l/2),y=d(u/2),S=m(s/2),M=m(l/2),E=m(u/2);switch(h){case"XYZ":this._x=S*g*y+p*M*E,this._y=p*M*y-S*g*E,this._z=p*g*E+S*M*y,this._w=p*g*y-S*M*E;break;case"YXZ":this._x=S*g*y+p*M*E,this._y=p*M*y-S*g*E,this._z=p*g*E-S*M*y,this._w=p*g*y+S*M*E;break;case"ZXY":this._x=S*g*y-p*M*E,this._y=p*M*y+S*g*E,this._z=p*g*E+S*M*y,this._w=p*g*y-S*M*E;break;case"ZYX":this._x=S*g*y-p*M*E,this._y=p*M*y+S*g*E,this._z=p*g*E-S*M*y,this._w=p*g*y+S*M*E;break;case"YZX":this._x=S*g*y+p*M*E,this._y=p*M*y+S*g*E,this._z=p*g*E-S*M*y,this._w=p*g*y-S*M*E;break;case"XZY":this._x=S*g*y-p*M*E,this._y=p*M*y-S*g*E,this._z=p*g*E+S*M*y,this._w=p*g*y+S*M*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+h)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],u=i[8],h=i[1],d=i[5],m=i[9],p=i[2],g=i[6],y=i[10],S=s+d+y;if(S>0){const M=.5/Math.sqrt(S+1);this._w=.25/M,this._x=(g-m)*M,this._y=(u-p)*M,this._z=(h-l)*M}else if(s>d&&s>y){const M=2*Math.sqrt(1+s-d-y);this._w=(g-m)/M,this._x=.25*M,this._y=(l+h)/M,this._z=(u+p)/M}else if(d>y){const M=2*Math.sqrt(1+d-s-y);this._w=(u-p)/M,this._x=(l+h)/M,this._y=.25*M,this._z=(m+g)/M}else{const M=2*Math.sqrt(1+y-s-d);this._w=(h-l)/M,this._x=(u+p)/M,this._y=(m+g)/M,this._z=.25*M}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ve(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,u=e._z,h=e._w,d=i._x,m=i._y,p=i._z,g=i._w;return this._x=s*g+h*d+l*p-u*m,this._y=l*g+h*m+u*d-s*p,this._z=u*g+h*p+s*m-l*d,this._w=h*g-s*d-l*m-u*p,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const s=this._x,l=this._y,u=this._z,h=this._w;let d=h*e._w+s*e._x+l*e._y+u*e._z;if(d<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,d=-d):this.copy(e),d>=1)return this._w=h,this._x=s,this._y=l,this._z=u,this;const m=1-d*d;if(m<=Number.EPSILON){const M=1-i;return this._w=M*h+i*this._w,this._x=M*s+i*this._x,this._y=M*l+i*this._y,this._z=M*u+i*this._z,this.normalize(),this}const p=Math.sqrt(m),g=Math.atan2(p,d),y=Math.sin((1-i)*g)/p,S=Math.sin(i*g)/p;return this._w=h*y+this._w*S,this._x=s*y+this._x*S,this._y=l*y+this._y*S,this._z=u*y+this._z*S,this._onChangeCallback(),this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),u=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),u*Math.sin(i),u*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class nt{constructor(e=0,i=0,s=0){nt.prototype.isVector3=!0,this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(P_.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(P_.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,u=e.elements;return this.x=u[0]*i+u[3]*s+u[6]*l,this.y=u[1]*i+u[4]*s+u[7]*l,this.z=u[2]*i+u[5]*s+u[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,u=e.elements,h=1/(u[3]*i+u[7]*s+u[11]*l+u[15]);return this.x=(u[0]*i+u[4]*s+u[8]*l+u[12])*h,this.y=(u[1]*i+u[5]*s+u[9]*l+u[13])*h,this.z=(u[2]*i+u[6]*s+u[10]*l+u[14])*h,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,u=e.x,h=e.y,d=e.z,m=e.w,p=2*(h*l-d*s),g=2*(d*i-u*l),y=2*(u*s-h*i);return this.x=i+m*p+h*y-d*g,this.y=s+m*g+d*p-u*y,this.z=l+m*y+u*g-h*p,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,u=e.elements;return this.x=u[0]*i+u[4]*s+u[8]*l,this.y=u[1]*i+u[5]*s+u[9]*l,this.z=u[2]*i+u[6]*s+u[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=ve(this.x,e.x,i.x),this.y=ve(this.y,e.y,i.y),this.z=ve(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=ve(this.x,e,i),this.y=ve(this.y,e,i),this.z=ve(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(ve(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,u=e.z,h=i.x,d=i.y,m=i.z;return this.x=l*m-u*d,this.y=u*h-s*m,this.z=s*d-l*h,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return oh.copy(this).projectOnVector(e),this.sub(oh)}reflect(e){return this.sub(oh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(ve(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const oh=new nt,P_=new bs;class Vo{constructor(e=new nt(1/0,1/0,1/0),i=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Si.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Si.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Si.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const u=s.getAttribute("position");if(i===!0&&u!==void 0&&e.isInstancedMesh!==!0)for(let h=0,d=u.count;h<d;h++)e.isMesh===!0?e.getVertexPosition(h,Si):Si.fromBufferAttribute(u,h),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ic.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),ic.copy(s.boundingBox)),ic.applyMatrix4(e.matrixWorld),this.union(ic)}const l=e.children;for(let u=0,h=l.length;u<h;u++)this.expandByObject(l[u],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Lo),ac.subVectors(this.max,Lo),lr.subVectors(e.a,Lo),cr.subVectors(e.b,Lo),ur.subVectors(e.c,Lo),za.subVectors(cr,lr),Ia.subVectors(ur,cr),hs.subVectors(lr,ur);let i=[0,-za.z,za.y,0,-Ia.z,Ia.y,0,-hs.z,hs.y,za.z,0,-za.x,Ia.z,0,-Ia.x,hs.z,0,-hs.x,-za.y,za.x,0,-Ia.y,Ia.x,0,-hs.y,hs.x,0];return!lh(i,lr,cr,ur,ac)||(i=[1,0,0,0,1,0,0,0,1],!lh(i,lr,cr,ur,ac))?!1:(sc.crossVectors(za,Ia),i=[sc.x,sc.y,sc.z],lh(i,lr,cr,ur,ac))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints($i),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const $i=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Si=new nt,ic=new Vo,lr=new nt,cr=new nt,ur=new nt,za=new nt,Ia=new nt,hs=new nt,Lo=new nt,ac=new nt,sc=new nt,ds=new nt;function lh(o,e,i,s,l){for(let u=0,h=o.length-3;u<=h;u+=3){ds.fromArray(o,u);const d=l.x*Math.abs(ds.x)+l.y*Math.abs(ds.y)+l.z*Math.abs(ds.z),m=e.dot(ds),p=i.dot(ds),g=s.dot(ds);if(Math.max(-Math.max(m,p,g),Math.min(m,p,g))>d)return!1}return!0}const Lx=new Vo,Oo=new nt,ch=new nt;class ko{constructor(e=new nt,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):Lx.setFromPoints(e).getCenter(s);let l=0;for(let u=0,h=e.length;u<h;u++)l=Math.max(l,s.distanceToSquared(e[u]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Oo.subVectors(e,this.center);const i=Oo.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(Oo,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ch.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Oo.copy(e.center).add(ch)),this.expandByPoint(Oo.copy(e.center).sub(ch))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ta=new nt,uh=new nt,rc=new nt,Ba=new nt,fh=new nt,oc=new nt,hh=new nt;class Xo{constructor(e=new nt,i=new nt(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ta)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=ta.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(ta.copy(this.origin).addScaledVector(this.direction,i),ta.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){uh.copy(e).add(i).multiplyScalar(.5),rc.copy(i).sub(e).normalize(),Ba.copy(this.origin).sub(uh);const u=e.distanceTo(i)*.5,h=-this.direction.dot(rc),d=Ba.dot(this.direction),m=-Ba.dot(rc),p=Ba.lengthSq(),g=Math.abs(1-h*h);let y,S,M,E;if(g>0)if(y=h*m-d,S=h*d-m,E=u*g,y>=0)if(S>=-E)if(S<=E){const A=1/g;y*=A,S*=A,M=y*(y+h*S+2*d)+S*(h*y+S+2*m)+p}else S=u,y=Math.max(0,-(h*S+d)),M=-y*y+S*(S+2*m)+p;else S=-u,y=Math.max(0,-(h*S+d)),M=-y*y+S*(S+2*m)+p;else S<=-E?(y=Math.max(0,-(-h*u+d)),S=y>0?-u:Math.min(Math.max(-u,-m),u),M=-y*y+S*(S+2*m)+p):S<=E?(y=0,S=Math.min(Math.max(-u,-m),u),M=S*(S+2*m)+p):(y=Math.max(0,-(h*u+d)),S=y>0?u:Math.min(Math.max(-u,-m),u),M=-y*y+S*(S+2*m)+p);else S=h>0?-u:u,y=Math.max(0,-(h*S+d)),M=-y*y+S*(S+2*m)+p;return s&&s.copy(this.origin).addScaledVector(this.direction,y),l&&l.copy(uh).addScaledVector(rc,S),M}intersectSphere(e,i){ta.subVectors(e.center,this.origin);const s=ta.dot(this.direction),l=ta.dot(ta)-s*s,u=e.radius*e.radius;if(l>u)return null;const h=Math.sqrt(u-l),d=s-h,m=s+h;return m<0?null:d<0?this.at(m,i):this.at(d,i)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,u,h,d,m;const p=1/this.direction.x,g=1/this.direction.y,y=1/this.direction.z,S=this.origin;return p>=0?(s=(e.min.x-S.x)*p,l=(e.max.x-S.x)*p):(s=(e.max.x-S.x)*p,l=(e.min.x-S.x)*p),g>=0?(u=(e.min.y-S.y)*g,h=(e.max.y-S.y)*g):(u=(e.max.y-S.y)*g,h=(e.min.y-S.y)*g),s>h||u>l||((u>s||isNaN(s))&&(s=u),(h<l||isNaN(l))&&(l=h),y>=0?(d=(e.min.z-S.z)*y,m=(e.max.z-S.z)*y):(d=(e.max.z-S.z)*y,m=(e.min.z-S.z)*y),s>m||d>l)||((d>s||s!==s)&&(s=d),(m<l||l!==l)&&(l=m),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,ta)!==null}intersectTriangle(e,i,s,l,u){fh.subVectors(i,e),oc.subVectors(s,e),hh.crossVectors(fh,oc);let h=this.direction.dot(hh),d;if(h>0){if(l)return null;d=1}else if(h<0)d=-1,h=-h;else return null;Ba.subVectors(this.origin,e);const m=d*this.direction.dot(oc.crossVectors(Ba,oc));if(m<0)return null;const p=d*this.direction.dot(fh.cross(Ba));if(p<0||m+p>h)return null;const g=-d*Ba.dot(hh);return g<0?null:this.at(g/h,u)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ke{constructor(e,i,s,l,u,h,d,m,p,g,y,S,M,E,A,x){Ke.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,u,h,d,m,p,g,y,S,M,E,A,x)}set(e,i,s,l,u,h,d,m,p,g,y,S,M,E,A,x){const v=this.elements;return v[0]=e,v[4]=i,v[8]=s,v[12]=l,v[1]=u,v[5]=h,v[9]=d,v[13]=m,v[2]=p,v[6]=g,v[10]=y,v[14]=S,v[3]=M,v[7]=E,v[11]=A,v[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ke().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,s=e.elements,l=1/fr.setFromMatrixColumn(e,0).length(),u=1/fr.setFromMatrixColumn(e,1).length(),h=1/fr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*u,i[5]=s[5]*u,i[6]=s[6]*u,i[7]=0,i[8]=s[8]*h,i[9]=s[9]*h,i[10]=s[10]*h,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,u=e.z,h=Math.cos(s),d=Math.sin(s),m=Math.cos(l),p=Math.sin(l),g=Math.cos(u),y=Math.sin(u);if(e.order==="XYZ"){const S=h*g,M=h*y,E=d*g,A=d*y;i[0]=m*g,i[4]=-m*y,i[8]=p,i[1]=M+E*p,i[5]=S-A*p,i[9]=-d*m,i[2]=A-S*p,i[6]=E+M*p,i[10]=h*m}else if(e.order==="YXZ"){const S=m*g,M=m*y,E=p*g,A=p*y;i[0]=S+A*d,i[4]=E*d-M,i[8]=h*p,i[1]=h*y,i[5]=h*g,i[9]=-d,i[2]=M*d-E,i[6]=A+S*d,i[10]=h*m}else if(e.order==="ZXY"){const S=m*g,M=m*y,E=p*g,A=p*y;i[0]=S-A*d,i[4]=-h*y,i[8]=E+M*d,i[1]=M+E*d,i[5]=h*g,i[9]=A-S*d,i[2]=-h*p,i[6]=d,i[10]=h*m}else if(e.order==="ZYX"){const S=h*g,M=h*y,E=d*g,A=d*y;i[0]=m*g,i[4]=E*p-M,i[8]=S*p+A,i[1]=m*y,i[5]=A*p+S,i[9]=M*p-E,i[2]=-p,i[6]=d*m,i[10]=h*m}else if(e.order==="YZX"){const S=h*m,M=h*p,E=d*m,A=d*p;i[0]=m*g,i[4]=A-S*y,i[8]=E*y+M,i[1]=y,i[5]=h*g,i[9]=-d*g,i[2]=-p*g,i[6]=M*y+E,i[10]=S-A*y}else if(e.order==="XZY"){const S=h*m,M=h*p,E=d*m,A=d*p;i[0]=m*g,i[4]=-y,i[8]=p*g,i[1]=S*y+A,i[5]=h*g,i[9]=M*y-E,i[2]=E*y-M,i[6]=d*g,i[10]=A*y+S}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ox,e,Px)}lookAt(e,i,s){const l=this.elements;return ei.subVectors(e,i),ei.lengthSq()===0&&(ei.z=1),ei.normalize(),Fa.crossVectors(s,ei),Fa.lengthSq()===0&&(Math.abs(s.z)===1?ei.x+=1e-4:ei.z+=1e-4,ei.normalize(),Fa.crossVectors(s,ei)),Fa.normalize(),lc.crossVectors(ei,Fa),l[0]=Fa.x,l[4]=lc.x,l[8]=ei.x,l[1]=Fa.y,l[5]=lc.y,l[9]=ei.y,l[2]=Fa.z,l[6]=lc.z,l[10]=ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,u=this.elements,h=s[0],d=s[4],m=s[8],p=s[12],g=s[1],y=s[5],S=s[9],M=s[13],E=s[2],A=s[6],x=s[10],v=s[14],B=s[3],L=s[7],w=s[11],q=s[15],G=l[0],O=l[4],j=l[8],U=l[12],C=l[1],H=l[5],et=l[9],Q=l[13],dt=l[2],pt=l[6],P=l[10],X=l[14],F=l[3],yt=l[7],Tt=l[11],N=l[15];return u[0]=h*G+d*C+m*dt+p*F,u[4]=h*O+d*H+m*pt+p*yt,u[8]=h*j+d*et+m*P+p*Tt,u[12]=h*U+d*Q+m*X+p*N,u[1]=g*G+y*C+S*dt+M*F,u[5]=g*O+y*H+S*pt+M*yt,u[9]=g*j+y*et+S*P+M*Tt,u[13]=g*U+y*Q+S*X+M*N,u[2]=E*G+A*C+x*dt+v*F,u[6]=E*O+A*H+x*pt+v*yt,u[10]=E*j+A*et+x*P+v*Tt,u[14]=E*U+A*Q+x*X+v*N,u[3]=B*G+L*C+w*dt+q*F,u[7]=B*O+L*H+w*pt+q*yt,u[11]=B*j+L*et+w*P+q*Tt,u[15]=B*U+L*Q+w*X+q*N,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],u=e[12],h=e[1],d=e[5],m=e[9],p=e[13],g=e[2],y=e[6],S=e[10],M=e[14],E=e[3],A=e[7],x=e[11],v=e[15];return E*(+u*m*y-l*p*y-u*d*S+s*p*S+l*d*M-s*m*M)+A*(+i*m*M-i*p*S+u*h*S-l*h*M+l*p*g-u*m*g)+x*(+i*p*y-i*d*M-u*h*y+s*h*M+u*d*g-s*p*g)+v*(-l*d*g-i*m*y+i*d*S+l*h*y-s*h*S+s*m*g)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],u=e[3],h=e[4],d=e[5],m=e[6],p=e[7],g=e[8],y=e[9],S=e[10],M=e[11],E=e[12],A=e[13],x=e[14],v=e[15],B=y*x*p-A*S*p+A*m*M-d*x*M-y*m*v+d*S*v,L=E*S*p-g*x*p-E*m*M+h*x*M+g*m*v-h*S*v,w=g*A*p-E*y*p+E*d*M-h*A*M-g*d*v+h*y*v,q=E*y*m-g*A*m-E*d*S+h*A*S+g*d*x-h*y*x,G=i*B+s*L+l*w+u*q;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/G;return e[0]=B*O,e[1]=(A*S*u-y*x*u-A*l*M+s*x*M+y*l*v-s*S*v)*O,e[2]=(d*x*u-A*m*u+A*l*p-s*x*p-d*l*v+s*m*v)*O,e[3]=(y*m*u-d*S*u-y*l*p+s*S*p+d*l*M-s*m*M)*O,e[4]=L*O,e[5]=(g*x*u-E*S*u+E*l*M-i*x*M-g*l*v+i*S*v)*O,e[6]=(E*m*u-h*x*u-E*l*p+i*x*p+h*l*v-i*m*v)*O,e[7]=(h*S*u-g*m*u+g*l*p-i*S*p-h*l*M+i*m*M)*O,e[8]=w*O,e[9]=(E*y*u-g*A*u-E*s*M+i*A*M+g*s*v-i*y*v)*O,e[10]=(h*A*u-E*d*u+E*s*p-i*A*p-h*s*v+i*d*v)*O,e[11]=(g*d*u-h*y*u-g*s*p+i*y*p+h*s*M-i*d*M)*O,e[12]=q*O,e[13]=(g*A*l-E*y*l+E*s*S-i*A*S-g*s*x+i*y*x)*O,e[14]=(E*d*l-h*A*l-E*s*m+i*A*m+h*s*x-i*d*x)*O,e[15]=(h*y*l-g*d*l+g*s*m-i*y*m-h*s*S+i*d*S)*O,this}scale(e){const i=this.elements,s=e.x,l=e.y,u=e.z;return i[0]*=s,i[4]*=l,i[8]*=u,i[1]*=s,i[5]*=l,i[9]*=u,i[2]*=s,i[6]*=l,i[10]*=u,i[3]*=s,i[7]*=l,i[11]*=u,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),u=1-s,h=e.x,d=e.y,m=e.z,p=u*h,g=u*d;return this.set(p*h+s,p*d-l*m,p*m+l*d,0,p*d+l*m,g*d+s,g*m-l*h,0,p*m-l*d,g*m+l*h,u*m*m+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,u,h){return this.set(1,s,u,0,e,1,h,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,u=i._x,h=i._y,d=i._z,m=i._w,p=u+u,g=h+h,y=d+d,S=u*p,M=u*g,E=u*y,A=h*g,x=h*y,v=d*y,B=m*p,L=m*g,w=m*y,q=s.x,G=s.y,O=s.z;return l[0]=(1-(A+v))*q,l[1]=(M+w)*q,l[2]=(E-L)*q,l[3]=0,l[4]=(M-w)*G,l[5]=(1-(S+v))*G,l[6]=(x+B)*G,l[7]=0,l[8]=(E+L)*O,l[9]=(x-B)*O,l[10]=(1-(S+A))*O,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;let u=fr.set(l[0],l[1],l[2]).length();const h=fr.set(l[4],l[5],l[6]).length(),d=fr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(u=-u),e.x=l[12],e.y=l[13],e.z=l[14],xi.copy(this);const p=1/u,g=1/h,y=1/d;return xi.elements[0]*=p,xi.elements[1]*=p,xi.elements[2]*=p,xi.elements[4]*=g,xi.elements[5]*=g,xi.elements[6]*=g,xi.elements[8]*=y,xi.elements[9]*=y,xi.elements[10]*=y,i.setFromRotationMatrix(xi),s.x=u,s.y=h,s.z=d,this}makePerspective(e,i,s,l,u,h,d=oa){const m=this.elements,p=2*u/(i-e),g=2*u/(s-l),y=(i+e)/(i-e),S=(s+l)/(s-l);let M,E;if(d===oa)M=-(h+u)/(h-u),E=-2*h*u/(h-u);else if(d===Ic)M=-h/(h-u),E=-h*u/(h-u);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+d);return m[0]=p,m[4]=0,m[8]=y,m[12]=0,m[1]=0,m[5]=g,m[9]=S,m[13]=0,m[2]=0,m[6]=0,m[10]=M,m[14]=E,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,i,s,l,u,h,d=oa){const m=this.elements,p=1/(i-e),g=1/(s-l),y=1/(h-u),S=(i+e)*p,M=(s+l)*g;let E,A;if(d===oa)E=(h+u)*y,A=-2*y;else if(d===Ic)E=u*y,A=-1*y;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+d);return m[0]=2*p,m[4]=0,m[8]=0,m[12]=-S,m[1]=0,m[5]=2*g,m[9]=0,m[13]=-M,m[2]=0,m[6]=0,m[10]=A,m[14]=-E,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const fr=new nt,xi=new Ke,Ox=new nt(0,0,0),Px=new nt(1,1,1),Fa=new nt,lc=new nt,ei=new nt,z_=new Ke,I_=new bs;class fa{constructor(e=0,i=0,s=0,l=fa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,u=l[0],h=l[4],d=l[8],m=l[1],p=l[5],g=l[9],y=l[2],S=l[6],M=l[10];switch(i){case"XYZ":this._y=Math.asin(ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(-g,M),this._z=Math.atan2(-h,u)):(this._x=Math.atan2(S,p),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(d,M),this._z=Math.atan2(m,p)):(this._y=Math.atan2(-y,u),this._z=0);break;case"ZXY":this._x=Math.asin(ve(S,-1,1)),Math.abs(S)<.9999999?(this._y=Math.atan2(-y,M),this._z=Math.atan2(-h,p)):(this._y=0,this._z=Math.atan2(m,u));break;case"ZYX":this._y=Math.asin(-ve(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(S,M),this._z=Math.atan2(m,u)):(this._x=0,this._z=Math.atan2(-h,p));break;case"YZX":this._z=Math.asin(ve(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(-g,p),this._y=Math.atan2(-y,u)):(this._x=0,this._y=Math.atan2(d,M));break;case"XZY":this._z=Math.asin(-ve(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(S,p),this._y=Math.atan2(d,u)):(this._x=Math.atan2(-g,M),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return z_.makeRotationFromQuaternion(e),this.setFromRotationMatrix(z_,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return I_.setFromEuler(this),this.setFromQuaternion(I_,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fa.DEFAULT_ORDER="XYZ";class Nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let zx=0;const B_=new nt,hr=new bs,ea=new Ke,cc=new nt,Po=new nt,Ix=new nt,Bx=new bs,F_=new nt(1,0,0),H_=new nt(0,1,0),G_=new nt(0,0,1),V_={type:"added"},Fx={type:"removed"},dr={type:"childadded",child:null},dh={type:"childremoved",child:null};class Pn extends As{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:zx++}),this.uuid=Go(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pn.DEFAULT_UP.clone();const e=new nt,i=new fa,s=new bs,l=new nt(1,1,1);function u(){s.setFromEuler(i,!1)}function h(){i.setFromQuaternion(s,void 0,!1)}i._onChange(u),s._onChange(h),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Ke},normalMatrix:{value:new de}}),this.matrix=new Ke,this.matrixWorld=new Ke,this.matrixAutoUpdate=Pn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return hr.setFromAxisAngle(e,i),this.quaternion.multiply(hr),this}rotateOnWorldAxis(e,i){return hr.setFromAxisAngle(e,i),this.quaternion.premultiply(hr),this}rotateX(e){return this.rotateOnAxis(F_,e)}rotateY(e){return this.rotateOnAxis(H_,e)}rotateZ(e){return this.rotateOnAxis(G_,e)}translateOnAxis(e,i){return B_.copy(e).applyQuaternion(this.quaternion),this.position.add(B_.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(F_,e)}translateY(e){return this.translateOnAxis(H_,e)}translateZ(e){return this.translateOnAxis(G_,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ea.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?cc.copy(e):cc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),Po.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ea.lookAt(Po,cc,this.up):ea.lookAt(cc,Po,this.up),this.quaternion.setFromRotationMatrix(ea),l&&(ea.extractRotation(l.matrixWorld),hr.setFromRotationMatrix(ea),this.quaternion.premultiply(hr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(V_),dr.child=e,this.dispatchEvent(dr),dr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(Fx),dh.child=e,this.dispatchEvent(dh),dh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ea.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ea.multiply(e.parent.matrixWorld)),e.applyMatrix4(ea),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(V_),dr.child=e,this.dispatchEvent(dr),dr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const h=this.children[s].getObjectByProperty(e,i);if(h!==void 0)return h}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,e,Ix),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Po,Bx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let u=0,h=l.length;u<h;u++)l[u].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(d=>({boxInitialized:d.boxInitialized,boxMin:d.box.min.toArray(),boxMax:d.box.max.toArray(),sphereInitialized:d.sphereInitialized,sphereRadius:d.sphere.radius,sphereCenter:d.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function u(d,m){return d[m.uuid]===void 0&&(d[m.uuid]=m.toJSON(e)),m.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=u(e.geometries,this.geometry);const d=this.geometry.parameters;if(d!==void 0&&d.shapes!==void 0){const m=d.shapes;if(Array.isArray(m))for(let p=0,g=m.length;p<g;p++){const y=m[p];u(e.shapes,y)}else u(e.shapes,m)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(u(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const d=[];for(let m=0,p=this.material.length;m<p;m++)d.push(u(e.materials,this.material[m]));l.material=d}else l.material=u(e.materials,this.material);if(this.children.length>0){l.children=[];for(let d=0;d<this.children.length;d++)l.children.push(this.children[d].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let d=0;d<this.animations.length;d++){const m=this.animations[d];l.animations.push(u(e.animations,m))}}if(i){const d=h(e.geometries),m=h(e.materials),p=h(e.textures),g=h(e.images),y=h(e.shapes),S=h(e.skeletons),M=h(e.animations),E=h(e.nodes);d.length>0&&(s.geometries=d),m.length>0&&(s.materials=m),p.length>0&&(s.textures=p),g.length>0&&(s.images=g),y.length>0&&(s.shapes=y),S.length>0&&(s.skeletons=S),M.length>0&&(s.animations=M),E.length>0&&(s.nodes=E)}return s.object=l,s;function h(d){const m=[];for(const p in d){const g=d[p];delete g.metadata,m.push(g)}return m}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}Pn.DEFAULT_UP=new nt(0,1,0);Pn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mi=new nt,na=new nt,ph=new nt,ia=new nt,pr=new nt,mr=new nt,k_=new nt,mh=new nt,gh=new nt,_h=new nt,vh=new an,yh=new an,Sh=new an;class Ei{constructor(e=new nt,i=new nt,s=new nt){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),Mi.subVectors(e,i),l.cross(Mi);const u=l.lengthSq();return u>0?l.multiplyScalar(1/Math.sqrt(u)):l.set(0,0,0)}static getBarycoord(e,i,s,l,u){Mi.subVectors(l,i),na.subVectors(s,i),ph.subVectors(e,i);const h=Mi.dot(Mi),d=Mi.dot(na),m=Mi.dot(ph),p=na.dot(na),g=na.dot(ph),y=h*p-d*d;if(y===0)return u.set(0,0,0),null;const S=1/y,M=(p*m-d*g)*S,E=(h*g-d*m)*S;return u.set(1-M-E,E,M)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,ia)===null?!1:ia.x>=0&&ia.y>=0&&ia.x+ia.y<=1}static getInterpolation(e,i,s,l,u,h,d,m){return this.getBarycoord(e,i,s,l,ia)===null?(m.x=0,m.y=0,"z"in m&&(m.z=0),"w"in m&&(m.w=0),null):(m.setScalar(0),m.addScaledVector(u,ia.x),m.addScaledVector(h,ia.y),m.addScaledVector(d,ia.z),m)}static getInterpolatedAttribute(e,i,s,l,u,h){return vh.setScalar(0),yh.setScalar(0),Sh.setScalar(0),vh.fromBufferAttribute(e,i),yh.fromBufferAttribute(e,s),Sh.fromBufferAttribute(e,l),h.setScalar(0),h.addScaledVector(vh,u.x),h.addScaledVector(yh,u.y),h.addScaledVector(Sh,u.z),h}static isFrontFacing(e,i,s,l){return Mi.subVectors(s,i),na.subVectors(e,i),Mi.cross(na).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mi.subVectors(this.c,this.b),na.subVectors(this.a,this.b),Mi.cross(na).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ei.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,u){return Ei.getInterpolation(e,this.a,this.b,this.c,i,s,l,u)}containsPoint(e){return Ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,u=this.c;let h,d;pr.subVectors(l,s),mr.subVectors(u,s),mh.subVectors(e,s);const m=pr.dot(mh),p=mr.dot(mh);if(m<=0&&p<=0)return i.copy(s);gh.subVectors(e,l);const g=pr.dot(gh),y=mr.dot(gh);if(g>=0&&y<=g)return i.copy(l);const S=m*y-g*p;if(S<=0&&m>=0&&g<=0)return h=m/(m-g),i.copy(s).addScaledVector(pr,h);_h.subVectors(e,u);const M=pr.dot(_h),E=mr.dot(_h);if(E>=0&&M<=E)return i.copy(u);const A=M*p-m*E;if(A<=0&&p>=0&&E<=0)return d=p/(p-E),i.copy(s).addScaledVector(mr,d);const x=g*E-M*y;if(x<=0&&y-g>=0&&M-E>=0)return k_.subVectors(u,l),d=(y-g)/(y-g+(M-E)),i.copy(l).addScaledVector(k_,d);const v=1/(x+A+S);return h=A*v,d=S*v,i.copy(s).addScaledVector(pr,h).addScaledVector(mr,d)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const e0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ha={h:0,s:0,l:0},uc={h:0,s:0,l:0};function xh(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class Le{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=hi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,De.toWorkingColorSpace(this,i),this}setRGB(e,i,s,l=De.workingColorSpace){return this.r=e,this.g=i,this.b=s,De.toWorkingColorSpace(this,l),this}setHSL(e,i,s,l=De.workingColorSpace){if(e=xx(e,1),i=ve(i,0,1),s=ve(s,0,1),i===0)this.r=this.g=this.b=s;else{const u=s<=.5?s*(1+i):s+i-s*i,h=2*s-u;this.r=xh(h,u,e+1/3),this.g=xh(h,u,e),this.b=xh(h,u,e-1/3)}return De.toWorkingColorSpace(this,l),this}setStyle(e,i=hi){function s(u){u!==void 0&&parseFloat(u)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let u;const h=l[1],d=l[2];switch(h){case"rgb":case"rgba":if(u=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setRGB(Math.min(255,parseInt(u[1],10))/255,Math.min(255,parseInt(u[2],10))/255,Math.min(255,parseInt(u[3],10))/255,i);if(u=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setRGB(Math.min(100,parseInt(u[1],10))/100,Math.min(100,parseInt(u[2],10))/100,Math.min(100,parseInt(u[3],10))/100,i);break;case"hsl":case"hsla":if(u=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(d))return s(u[4]),this.setHSL(parseFloat(u[1])/360,parseFloat(u[2])/100,parseFloat(u[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const u=l[1],h=u.length;if(h===3)return this.setRGB(parseInt(u.charAt(0),16)/15,parseInt(u.charAt(1),16)/15,parseInt(u.charAt(2),16)/15,i);if(h===6)return this.setHex(parseInt(u,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=hi){const s=e0[e.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ca(e.r),this.g=ca(e.g),this.b=ca(e.b),this}copyLinearToSRGB(e){return this.r=Rr(e.r),this.g=Rr(e.g),this.b=Rr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hi){return De.fromWorkingColorSpace(wn.copy(this),e),Math.round(ve(wn.r*255,0,255))*65536+Math.round(ve(wn.g*255,0,255))*256+Math.round(ve(wn.b*255,0,255))}getHexString(e=hi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=De.workingColorSpace){De.fromWorkingColorSpace(wn.copy(this),i);const s=wn.r,l=wn.g,u=wn.b,h=Math.max(s,l,u),d=Math.min(s,l,u);let m,p;const g=(d+h)/2;if(d===h)m=0,p=0;else{const y=h-d;switch(p=g<=.5?y/(h+d):y/(2-h-d),h){case s:m=(l-u)/y+(l<u?6:0);break;case l:m=(u-s)/y+2;break;case u:m=(s-l)/y+4;break}m/=6}return e.h=m,e.s=p,e.l=g,e}getRGB(e,i=De.workingColorSpace){return De.fromWorkingColorSpace(wn.copy(this),i),e.r=wn.r,e.g=wn.g,e.b=wn.b,e}getStyle(e=hi){De.fromWorkingColorSpace(wn.copy(this),e);const i=wn.r,s=wn.g,l=wn.b;return e!==hi?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(Ha),this.setHSL(Ha.h+e,Ha.s+i,Ha.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(Ha),e.getHSL(uc);const s=ah(Ha.h,uc.h,i),l=ah(Ha.s,uc.s,i),u=ah(Ha.l,uc.l,i);return this.setHSL(s,l,u),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,u=e.elements;return this.r=u[0]*i+u[3]*s+u[6]*l,this.g=u[1]*i+u[4]*s+u[7]*l,this.b=u[2]*i+u[5]*s+u[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wn=new Le;Le.NAMES=e0;let Hx=0;class Pr extends As{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Hx++}),this.uuid=Go(),this.name="",this.type="Material",this.blending=br,this.side=Wa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oh,this.blendDst=Ph,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Le(0,0,0),this.blendAlpha=0,this.depthFunc=Cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=w_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rr,this.stencilZFail=rr,this.stencilZPass=rr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==br&&(s.blending=this.blending),this.side!==Wa&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==Oh&&(s.blendSrc=this.blendSrc),this.blendDst!==Ph&&(s.blendDst=this.blendDst),this.blendEquation!==ys&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==Cr&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==w_&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==rr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==rr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==rr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(u){const h=[];for(const d in u){const m=u[d];delete m.metadata,h.push(m)}return h}if(i){const u=l(e.textures),h=l(e.images);u.length>0&&(s.textures=u),h.length>0&&(s.images=h)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let u=0;u!==l;++u)s[u]=i[u].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class n0 extends Pr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Le(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fa,this.combine=Fv,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cn=new nt,fc=new me;class Oi{constructor(e,i,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=D_,this.updateRanges=[],this.gpuType=ra,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,u=this.itemSize;l<u;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)fc.fromBufferAttribute(this,i),fc.applyMatrix3(e),this.setXY(i,fc.x,fc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix3(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyMatrix4(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.applyNormalMatrix(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)cn.fromBufferAttribute(this,i),cn.transformDirection(e),this.setXYZ(i,cn.x,cn.y,cn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=No(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Xn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=No(i,this.array)),i}setX(e,i){return this.normalized&&(i=Xn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=No(i,this.array)),i}setY(e,i){return this.normalized&&(i=Xn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=No(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Xn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=No(i,this.array)),i}setW(e,i){return this.normalized&&(i=Xn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array),l=Xn(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,u){return e*=this.itemSize,this.normalized&&(i=Xn(i,this.array),s=Xn(s,this.array),l=Xn(l,this.array),u=Xn(u,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=u,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==D_&&(e.usage=this.usage),e}}class i0 extends Oi{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class a0 extends Oi{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class On extends Oi{constructor(e,i,s){super(new Float32Array(e),i,s)}}let Gx=0;const fi=new Ke,Mh=new Pn,gr=new nt,ni=new Vo,zo=new Vo,vn=new nt;class Ai extends As{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gx++}),this.uuid=Go(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jv(e)?a0:i0)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const u=new de().getNormalMatrix(e);s.applyNormalMatrix(u),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fi.makeRotationFromQuaternion(e),this.applyMatrix4(fi),this}rotateX(e){return fi.makeRotationX(e),this.applyMatrix4(fi),this}rotateY(e){return fi.makeRotationY(e),this.applyMatrix4(fi),this}rotateZ(e){return fi.makeRotationZ(e),this.applyMatrix4(fi),this}translate(e,i,s){return fi.makeTranslation(e,i,s),this.applyMatrix4(fi),this}scale(e,i,s){return fi.makeScale(e,i,s),this.applyMatrix4(fi),this}lookAt(e){return Mh.lookAt(e),Mh.updateMatrix(),this.applyMatrix4(Mh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gr).negate(),this.translate(gr.x,gr.y,gr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,u=e.length;l<u;l++){const h=e[l];s.push(h.x,h.y,h.z||0)}this.setAttribute("position",new On(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const u=e[l];i.setXYZ(l,u.x,u.y,u.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vo);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const u=i[s];ni.setFromBufferAttribute(u),this.morphTargetsRelative?(vn.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(vn),vn.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(vn)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ko);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(e){const s=this.boundingSphere.center;if(ni.setFromBufferAttribute(e),i)for(let u=0,h=i.length;u<h;u++){const d=i[u];zo.setFromBufferAttribute(d),this.morphTargetsRelative?(vn.addVectors(ni.min,zo.min),ni.expandByPoint(vn),vn.addVectors(ni.max,zo.max),ni.expandByPoint(vn)):(ni.expandByPoint(zo.min),ni.expandByPoint(zo.max))}ni.getCenter(s);let l=0;for(let u=0,h=e.count;u<h;u++)vn.fromBufferAttribute(e,u),l=Math.max(l,s.distanceToSquared(vn));if(i)for(let u=0,h=i.length;u<h;u++){const d=i[u],m=this.morphTargetsRelative;for(let p=0,g=d.count;p<g;p++)vn.fromBufferAttribute(d,p),m&&(gr.fromBufferAttribute(e,p),vn.add(gr)),l=Math.max(l,s.distanceToSquared(vn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,u=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Oi(new Float32Array(4*s.count),4));const h=this.getAttribute("tangent"),d=[],m=[];for(let j=0;j<s.count;j++)d[j]=new nt,m[j]=new nt;const p=new nt,g=new nt,y=new nt,S=new me,M=new me,E=new me,A=new nt,x=new nt;function v(j,U,C){p.fromBufferAttribute(s,j),g.fromBufferAttribute(s,U),y.fromBufferAttribute(s,C),S.fromBufferAttribute(u,j),M.fromBufferAttribute(u,U),E.fromBufferAttribute(u,C),g.sub(p),y.sub(p),M.sub(S),E.sub(S);const H=1/(M.x*E.y-E.x*M.y);isFinite(H)&&(A.copy(g).multiplyScalar(E.y).addScaledVector(y,-M.y).multiplyScalar(H),x.copy(y).multiplyScalar(M.x).addScaledVector(g,-E.x).multiplyScalar(H),d[j].add(A),d[U].add(A),d[C].add(A),m[j].add(x),m[U].add(x),m[C].add(x))}let B=this.groups;B.length===0&&(B=[{start:0,count:e.count}]);for(let j=0,U=B.length;j<U;++j){const C=B[j],H=C.start,et=C.count;for(let Q=H,dt=H+et;Q<dt;Q+=3)v(e.getX(Q+0),e.getX(Q+1),e.getX(Q+2))}const L=new nt,w=new nt,q=new nt,G=new nt;function O(j){q.fromBufferAttribute(l,j),G.copy(q);const U=d[j];L.copy(U),L.sub(q.multiplyScalar(q.dot(U))).normalize(),w.crossVectors(G,U);const H=w.dot(m[j])<0?-1:1;h.setXYZW(j,L.x,L.y,L.z,H)}for(let j=0,U=B.length;j<U;++j){const C=B[j],H=C.start,et=C.count;for(let Q=H,dt=H+et;Q<dt;Q+=3)O(e.getX(Q+0)),O(e.getX(Q+1)),O(e.getX(Q+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new Oi(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let S=0,M=s.count;S<M;S++)s.setXYZ(S,0,0,0);const l=new nt,u=new nt,h=new nt,d=new nt,m=new nt,p=new nt,g=new nt,y=new nt;if(e)for(let S=0,M=e.count;S<M;S+=3){const E=e.getX(S+0),A=e.getX(S+1),x=e.getX(S+2);l.fromBufferAttribute(i,E),u.fromBufferAttribute(i,A),h.fromBufferAttribute(i,x),g.subVectors(h,u),y.subVectors(l,u),g.cross(y),d.fromBufferAttribute(s,E),m.fromBufferAttribute(s,A),p.fromBufferAttribute(s,x),d.add(g),m.add(g),p.add(g),s.setXYZ(E,d.x,d.y,d.z),s.setXYZ(A,m.x,m.y,m.z),s.setXYZ(x,p.x,p.y,p.z)}else for(let S=0,M=i.count;S<M;S+=3)l.fromBufferAttribute(i,S+0),u.fromBufferAttribute(i,S+1),h.fromBufferAttribute(i,S+2),g.subVectors(h,u),y.subVectors(l,u),g.cross(y),s.setXYZ(S+0,g.x,g.y,g.z),s.setXYZ(S+1,g.x,g.y,g.z),s.setXYZ(S+2,g.x,g.y,g.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)vn.fromBufferAttribute(e,i),vn.normalize(),e.setXYZ(i,vn.x,vn.y,vn.z)}toNonIndexed(){function e(d,m){const p=d.array,g=d.itemSize,y=d.normalized,S=new p.constructor(m.length*g);let M=0,E=0;for(let A=0,x=m.length;A<x;A++){d.isInterleavedBufferAttribute?M=m[A]*d.data.stride+d.offset:M=m[A]*g;for(let v=0;v<g;v++)S[E++]=p[M++]}return new Oi(S,g,y)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ai,s=this.index.array,l=this.attributes;for(const d in l){const m=l[d],p=e(m,s);i.setAttribute(d,p)}const u=this.morphAttributes;for(const d in u){const m=[],p=u[d];for(let g=0,y=p.length;g<y;g++){const S=p[g],M=e(S,s);m.push(M)}i.morphAttributes[d]=m}i.morphTargetsRelative=this.morphTargetsRelative;const h=this.groups;for(let d=0,m=h.length;d<m;d++){const p=h[d];i.addGroup(p.start,p.count,p.materialIndex)}return i}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const m=this.parameters;for(const p in m)m[p]!==void 0&&(e[p]=m[p]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const m in s){const p=s[m];e.data.attributes[m]=p.toJSON(e.data)}const l={};let u=!1;for(const m in this.morphAttributes){const p=this.morphAttributes[m],g=[];for(let y=0,S=p.length;y<S;y++){const M=p[y];g.push(M.toJSON(e.data))}g.length>0&&(l[m]=g,u=!0)}u&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const h=this.groups;h.length>0&&(e.data.groups=JSON.parse(JSON.stringify(h)));const d=this.boundingSphere;return d!==null&&(e.data.boundingSphere={center:d.center.toArray(),radius:d.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(i));const l=e.attributes;for(const p in l){const g=l[p];this.setAttribute(p,g.clone(i))}const u=e.morphAttributes;for(const p in u){const g=[],y=u[p];for(let S=0,M=y.length;S<M;S++)g.push(y[S].clone(i));this.morphAttributes[p]=g}this.morphTargetsRelative=e.morphTargetsRelative;const h=e.groups;for(let p=0,g=h.length;p<g;p++){const y=h[p];this.addGroup(y.start,y.count,y.materialIndex)}const d=e.boundingBox;d!==null&&(this.boundingBox=d.clone());const m=e.boundingSphere;return m!==null&&(this.boundingSphere=m.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const X_=new Ke,ps=new Xo,hc=new ko,q_=new nt,dc=new nt,pc=new nt,mc=new nt,Eh=new nt,gc=new nt,W_=new nt,_c=new nt;class la extends Pn{constructor(e=new Ai,i=new n0){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,u=s.morphAttributes.position,h=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const d=this.morphTargetInfluences;if(u&&d){gc.set(0,0,0);for(let m=0,p=u.length;m<p;m++){const g=d[m],y=u[m];g!==0&&(Eh.fromBufferAttribute(y,e),h?gc.addScaledVector(Eh,g):gc.addScaledVector(Eh.sub(i),g))}i.add(gc)}return i}raycast(e,i){const s=this.geometry,l=this.material,u=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),hc.copy(s.boundingSphere),hc.applyMatrix4(u),ps.copy(e.ray).recast(e.near),!(hc.containsPoint(ps.origin)===!1&&(ps.intersectSphere(hc,q_)===null||ps.origin.distanceToSquared(q_)>(e.far-e.near)**2))&&(X_.copy(u).invert(),ps.copy(e.ray).applyMatrix4(X_),!(s.boundingBox!==null&&ps.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,ps)))}_computeIntersections(e,i,s){let l;const u=this.geometry,h=this.material,d=u.index,m=u.attributes.position,p=u.attributes.uv,g=u.attributes.uv1,y=u.attributes.normal,S=u.groups,M=u.drawRange;if(d!==null)if(Array.isArray(h))for(let E=0,A=S.length;E<A;E++){const x=S[E],v=h[x.materialIndex],B=Math.max(x.start,M.start),L=Math.min(d.count,Math.min(x.start+x.count,M.start+M.count));for(let w=B,q=L;w<q;w+=3){const G=d.getX(w),O=d.getX(w+1),j=d.getX(w+2);l=vc(this,v,e,s,p,g,y,G,O,j),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),A=Math.min(d.count,M.start+M.count);for(let x=E,v=A;x<v;x+=3){const B=d.getX(x),L=d.getX(x+1),w=d.getX(x+2);l=vc(this,h,e,s,p,g,y,B,L,w),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}else if(m!==void 0)if(Array.isArray(h))for(let E=0,A=S.length;E<A;E++){const x=S[E],v=h[x.materialIndex],B=Math.max(x.start,M.start),L=Math.min(m.count,Math.min(x.start+x.count,M.start+M.count));for(let w=B,q=L;w<q;w+=3){const G=w,O=w+1,j=w+2;l=vc(this,v,e,s,p,g,y,G,O,j),l&&(l.faceIndex=Math.floor(w/3),l.face.materialIndex=x.materialIndex,i.push(l))}}else{const E=Math.max(0,M.start),A=Math.min(m.count,M.start+M.count);for(let x=E,v=A;x<v;x+=3){const B=x,L=x+1,w=x+2;l=vc(this,h,e,s,p,g,y,B,L,w),l&&(l.faceIndex=Math.floor(x/3),i.push(l))}}}}function Vx(o,e,i,s,l,u,h,d){let m;if(e.side===Wn?m=s.intersectTriangle(h,u,l,!0,d):m=s.intersectTriangle(l,u,h,e.side===Wa,d),m===null)return null;_c.copy(d),_c.applyMatrix4(o.matrixWorld);const p=i.ray.origin.distanceTo(_c);return p<i.near||p>i.far?null:{distance:p,point:_c.clone(),object:o}}function vc(o,e,i,s,l,u,h,d,m,p){o.getVertexPosition(d,dc),o.getVertexPosition(m,pc),o.getVertexPosition(p,mc);const g=Vx(o,e,i,s,dc,pc,mc,W_);if(g){const y=new nt;Ei.getBarycoord(W_,dc,pc,mc,y),l&&(g.uv=Ei.getInterpolatedAttribute(l,d,m,p,y,new me)),u&&(g.uv1=Ei.getInterpolatedAttribute(u,d,m,p,y,new me)),h&&(g.normal=Ei.getInterpolatedAttribute(h,d,m,p,y,new nt),g.normal.dot(s.direction)>0&&g.normal.multiplyScalar(-1));const S={a:d,b:m,c:p,normal:new nt,materialIndex:0};Ei.getNormal(dc,pc,mc,S.normal),g.face=S,g.barycoord=y}return g}class qo extends Ai{constructor(e=1,i=1,s=1,l=1,u=1,h=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:u,depthSegments:h};const d=this;l=Math.floor(l),u=Math.floor(u),h=Math.floor(h);const m=[],p=[],g=[],y=[];let S=0,M=0;E("z","y","x",-1,-1,s,i,e,h,u,0),E("z","y","x",1,-1,s,i,-e,h,u,1),E("x","z","y",1,1,e,s,i,l,h,2),E("x","z","y",1,-1,e,s,-i,l,h,3),E("x","y","z",1,-1,e,i,s,l,u,4),E("x","y","z",-1,-1,e,i,-s,l,u,5),this.setIndex(m),this.setAttribute("position",new On(p,3)),this.setAttribute("normal",new On(g,3)),this.setAttribute("uv",new On(y,2));function E(A,x,v,B,L,w,q,G,O,j,U){const C=w/O,H=q/j,et=w/2,Q=q/2,dt=G/2,pt=O+1,P=j+1;let X=0,F=0;const yt=new nt;for(let Tt=0;Tt<P;Tt++){const N=Tt*H-Q;for(let at=0;at<pt;at++){const Et=at*C-et;yt[A]=Et*B,yt[x]=N*L,yt[v]=dt,p.push(yt.x,yt.y,yt.z),yt[A]=0,yt[x]=0,yt[v]=G>0?1:-1,g.push(yt.x,yt.y,yt.z),y.push(at/O),y.push(1-Tt/j),X+=1}}for(let Tt=0;Tt<j;Tt++)for(let N=0;N<O;N++){const at=S+N+pt*Tt,Et=S+N+pt*(Tt+1),K=S+(N+1)+pt*(Tt+1),ft=S+(N+1)+pt*Tt;m.push(at,Et,ft),m.push(Et,K,ft),F+=6}d.addGroup(M,F,U),M+=F,S+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Or(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const l=o[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone():Array.isArray(l)?e[i][s]=l.slice():e[i][s]=l}}return e}function Ln(o){const e={};for(let i=0;i<o.length;i++){const s=Or(o[i]);for(const l in s)e[l]=s[l]}return e}function kx(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function s0(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:De.workingColorSpace}const Xx={clone:Or,merge:Ln};var qx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ha extends Pr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qx,this.fragmentShader=Wx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Or(e.uniforms),this.uniformsGroups=kx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const h=this.uniforms[l].value;h&&h.isTexture?i.uniforms[l]={type:"t",value:h.toJSON(e).uuid}:h&&h.isColor?i.uniforms[l]={type:"c",value:h.getHex()}:h&&h.isVector2?i.uniforms[l]={type:"v2",value:h.toArray()}:h&&h.isVector3?i.uniforms[l]={type:"v3",value:h.toArray()}:h&&h.isVector4?i.uniforms[l]={type:"v4",value:h.toArray()}:h&&h.isMatrix3?i.uniforms[l]={type:"m3",value:h.toArray()}:h&&h.isMatrix4?i.uniforms[l]={type:"m4",value:h.toArray()}:i.uniforms[l]={value:h}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class r0 extends Pn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ke,this.projectionMatrix=new Ke,this.projectionMatrixInverse=new Ke,this.coordinateSystem=oa}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ga=new nt,Y_=new me,j_=new me;class di extends r0{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=yd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Oc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return yd*2*Math.atan(Math.tan(Oc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Ga.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ga.x,Ga.y).multiplyScalar(-e/Ga.z),Ga.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ga.x,Ga.y).multiplyScalar(-e/Ga.z)}getViewSize(e,i){return this.getViewBounds(e,Y_,j_),i.subVectors(j_,Y_)}setViewOffset(e,i,s,l,u,h){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Oc*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,u=-.5*l;const h=this.view;if(this.view!==null&&this.view.enabled){const m=h.fullWidth,p=h.fullHeight;u+=h.offsetX*l/m,i-=h.offsetY*s/p,l*=h.width/m,s*=h.height/p}const d=this.filmOffset;d!==0&&(u+=e*d/this.getFilmWidth()),this.projectionMatrix.makePerspective(u,u+l,i,i-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const _r=-90,vr=1;class Yx extends Pn{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new di(_r,vr,e,i);l.layers=this.layers,this.add(l);const u=new di(_r,vr,e,i);u.layers=this.layers,this.add(u);const h=new di(_r,vr,e,i);h.layers=this.layers,this.add(h);const d=new di(_r,vr,e,i);d.layers=this.layers,this.add(d);const m=new di(_r,vr,e,i);m.layers=this.layers,this.add(m);const p=new di(_r,vr,e,i);p.layers=this.layers,this.add(p)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,u,h,d,m]=i;for(const p of i)this.remove(p);if(e===oa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),u.up.set(0,0,-1),u.lookAt(0,1,0),h.up.set(0,0,1),h.lookAt(0,-1,0),d.up.set(0,1,0),d.lookAt(0,0,1),m.up.set(0,1,0),m.lookAt(0,0,-1);else if(e===Ic)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),u.up.set(0,0,1),u.lookAt(0,1,0),h.up.set(0,0,-1),h.lookAt(0,-1,0),d.up.set(0,-1,0),d.lookAt(0,0,1),m.up.set(0,-1,0),m.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const p of i)this.add(p),p.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[u,h,d,m,p,g]=this.children,y=e.getRenderTarget(),S=e.getActiveCubeFace(),M=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const A=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,l),e.render(i,u),e.setRenderTarget(s,1,l),e.render(i,h),e.setRenderTarget(s,2,l),e.render(i,d),e.setRenderTarget(s,3,l),e.render(i,m),e.setRenderTarget(s,4,l),e.render(i,p),s.texture.generateMipmaps=A,e.setRenderTarget(s,5,l),e.render(i,g),e.setRenderTarget(y,S,M),e.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class o0 extends Yn{constructor(e,i,s,l,u,h,d,m,p,g){e=e!==void 0?e:[],i=i!==void 0?i:wr,super(e,i,s,l,u,h,d,m,p,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class jx extends Ts{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new o0(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:Li}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new qo(5,5,5),u=new ha({name:"CubemapFromEquirect",uniforms:Or(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Wn,blending:Xa});u.uniforms.tEquirect.value=i;const h=new la(l,u),d=i.minFilter;return i.minFilter===Ms&&(i.minFilter=Li),new Yx(1,10,this).update(e,h),i.minFilter=d,h.geometry.dispose(),h.material.dispose(),this}clear(e,i,s,l){const u=e.getRenderTarget();for(let h=0;h<6;h++)e.setRenderTarget(this,h),e.clear(i,s,l);e.setRenderTarget(u)}}class Zx extends Pn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fa,this.environmentIntensity=1,this.environmentRotation=new fa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}const Th=new nt,Kx=new nt,Qx=new de;class Va{constructor(e=new nt(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Th.subVectors(s,i).cross(Kx.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const s=e.delta(Th),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const u=-(e.start.dot(this.normal)+this.constant)/l;return u<0||u>1?null:i.copy(e.start).addScaledVector(s,u)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||Qx.getNormalMatrix(e),l=this.coplanarPoint(Th).applyMatrix4(e),u=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(u),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ms=new ko,yc=new nt;class l0{constructor(e=new Va,i=new Va,s=new Va,l=new Va,u=new Va,h=new Va){this.planes=[e,i,s,l,u,h]}set(e,i,s,l,u,h){const d=this.planes;return d[0].copy(e),d[1].copy(i),d[2].copy(s),d[3].copy(l),d[4].copy(u),d[5].copy(h),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=oa){const s=this.planes,l=e.elements,u=l[0],h=l[1],d=l[2],m=l[3],p=l[4],g=l[5],y=l[6],S=l[7],M=l[8],E=l[9],A=l[10],x=l[11],v=l[12],B=l[13],L=l[14],w=l[15];if(s[0].setComponents(m-u,S-p,x-M,w-v).normalize(),s[1].setComponents(m+u,S+p,x+M,w+v).normalize(),s[2].setComponents(m+h,S+g,x+E,w+B).normalize(),s[3].setComponents(m-h,S-g,x-E,w-B).normalize(),s[4].setComponents(m-d,S-y,x-A,w-L).normalize(),i===oa)s[5].setComponents(m+d,S+y,x+A,w+L).normalize();else if(i===Ic)s[5].setComponents(d,y,A,L).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),ms.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(e){return ms.center.set(0,0,0),ms.radius=.7071067811865476,ms.applyMatrix4(e.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let u=0;u<6;u++)if(i[u].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(yc.x=l.normal.x>0?e.max.x:e.min.x,yc.y=l.normal.y>0?e.max.y:e.min.y,yc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(yc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class c0 extends Pr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Le(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fc=new nt,Hc=new nt,Z_=new Ke,Io=new Xo,Sc=new ko,bh=new nt,K_=new nt;class Jx extends Pn{constructor(e=new Ai,i=new c0){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[0];for(let l=1,u=i.count;l<u;l++)Fc.fromBufferAttribute(i,l-1),Hc.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Fc.distanceTo(Hc);e.setAttribute("lineDistance",new On(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,u=e.params.Line.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Sc.copy(s.boundingSphere),Sc.applyMatrix4(l),Sc.radius+=u,e.ray.intersectsSphere(Sc)===!1)return;Z_.copy(l).invert(),Io.copy(e.ray).applyMatrix4(Z_);const d=u/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=this.isLineSegments?2:1,g=s.index,S=s.attributes.position;if(g!==null){const M=Math.max(0,h.start),E=Math.min(g.count,h.start+h.count);for(let A=M,x=E-1;A<x;A+=p){const v=g.getX(A),B=g.getX(A+1),L=xc(this,e,Io,m,v,B);L&&i.push(L)}if(this.isLineLoop){const A=g.getX(E-1),x=g.getX(M),v=xc(this,e,Io,m,A,x);v&&i.push(v)}}else{const M=Math.max(0,h.start),E=Math.min(S.count,h.start+h.count);for(let A=M,x=E-1;A<x;A+=p){const v=xc(this,e,Io,m,A,A+1);v&&i.push(v)}if(this.isLineLoop){const A=xc(this,e,Io,m,E-1,M);A&&i.push(A)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}}function xc(o,e,i,s,l,u){const h=o.geometry.attributes.position;if(Fc.fromBufferAttribute(h,l),Hc.fromBufferAttribute(h,u),i.distanceSqToSegment(Fc,Hc,bh,K_)>s)return;bh.applyMatrix4(o.matrixWorld);const m=e.ray.origin.distanceTo(bh);if(!(m<e.near||m>e.far))return{distance:m,point:K_.clone().applyMatrix4(o.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:o}}const Q_=new nt,J_=new nt;class $x extends Jx{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[];for(let l=0,u=i.count;l<u;l+=2)Q_.fromBufferAttribute(i,l),J_.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+Q_.distanceTo(J_);e.setAttribute("lineDistance",new On(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tM extends Pr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Le(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const $_=new Ke,Sd=new Xo,Mc=new ko,Ec=new nt;class eM extends Pn{constructor(e=new Ai,i=new tM){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,u=e.params.Points.threshold,h=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),Mc.copy(s.boundingSphere),Mc.applyMatrix4(l),Mc.radius+=u,e.ray.intersectsSphere(Mc)===!1)return;$_.copy(l).invert(),Sd.copy(e.ray).applyMatrix4($_);const d=u/((this.scale.x+this.scale.y+this.scale.z)/3),m=d*d,p=s.index,y=s.attributes.position;if(p!==null){const S=Math.max(0,h.start),M=Math.min(p.count,h.start+h.count);for(let E=S,A=M;E<A;E++){const x=p.getX(E);Ec.fromBufferAttribute(y,x),tv(Ec,x,m,l,e,i,this)}}else{const S=Math.max(0,h.start),M=Math.min(y.count,h.start+h.count);for(let E=S,A=M;E<A;E++)Ec.fromBufferAttribute(y,E),tv(Ec,E,m,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let u=0,h=l.length;u<h;u++){const d=l[u].name||String(u);this.morphTargetInfluences.push(0),this.morphTargetDictionary[d]=u}}}}}function tv(o,e,i,s,l,u,h){const d=Sd.distanceSqToPoint(o);if(d<i){const m=new nt;Sd.closestPointToPoint(o,m),m.applyMatrix4(s);const p=l.ray.origin.distanceTo(m);if(p<l.near||p>l.far)return;u.push({distance:p,distanceToRay:Math.sqrt(d),point:m,index:e,face:null,faceIndex:null,barycoord:null,object:h})}}class Tc extends Pn{constructor(){super(),this.isGroup=!0,this.type="Group"}}class u0 extends Yn{constructor(e,i,s,l,u,h,d,m,p,g=Ar){if(g!==Ar&&g!==Nr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&g===Ar&&(s=Es),s===void 0&&g===Nr&&(s=Ur),super(null,l,u,h,d,m,g,s,p),this.isDepthTexture=!0,this.image={width:e,height:i},this.magFilter=d!==void 0?d:bi,this.minFilter=m!==void 0?m:bi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}class Vc extends Ai{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const u=e/2,h=i/2,d=Math.floor(s),m=Math.floor(l),p=d+1,g=m+1,y=e/d,S=i/m,M=[],E=[],A=[],x=[];for(let v=0;v<g;v++){const B=v*S-h;for(let L=0;L<p;L++){const w=L*y-u;E.push(w,-B,0),A.push(0,0,1),x.push(L/d),x.push(1-v/m)}}for(let v=0;v<m;v++)for(let B=0;B<d;B++){const L=B+p*v,w=B+p*(v+1),q=B+1+p*(v+1),G=B+1+p*v;M.push(L,w,G),M.push(w,q,G)}this.setIndex(M),this.setAttribute("position",new On(E,3)),this.setAttribute("normal",new On(A,3)),this.setAttribute("uv",new On(x,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vc(e.width,e.height,e.widthSegments,e.heightSegments)}}class nM extends Pr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ux,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class iM extends Pr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class aM extends r0{constructor(e=-1,i=1,s=1,l=-1,u=.1,h=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=u,this.far=h,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,u,h){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=u,this.view.height=h,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let u=s-e,h=s+e,d=l+i,m=l-i;if(this.view!==null&&this.view.enabled){const p=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;u+=p*this.view.offsetX,h=u+p*this.view.width,d-=g*this.view.offsetY,m=d-g*this.view.height}this.projectionMatrix.makeOrthographic(u,h,d,m,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class sM extends di{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}const ev=new Ke;class rM{constructor(e,i,s=0,l=1/0){this.ray=new Xo(e,i),this.near=s,this.far=l,this.camera=null,this.layers=new Nd,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,i){this.ray.set(e,i)}setFromCamera(e,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(i.near+i.far)/(i.near-i.far)).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):console.error("THREE.Raycaster: Unsupported camera type: "+i.type)}setFromXRController(e){return ev.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ev),this}intersectObject(e,i=!0,s=[]){return xd(e,this,s,i),s.sort(nv),s}intersectObjects(e,i=!0,s=[]){for(let l=0,u=e.length;l<u;l++)xd(e[l],this,s,i);return s.sort(nv),s}}function nv(o,e){return o.distance-e.distance}function xd(o,e,i,s){let l=!0;if(o.layers.test(e.layers)&&o.raycast(e,i)===!1&&(l=!1),l===!0&&s===!0){const u=o.children;for(let h=0,d=u.length;h<d;h++)xd(u[h],e,i,!0)}}class iv{constructor(e=1,i=0,s=0){return this.radius=e,this.phi=i,this.theta=s,this}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ve(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(ve(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class oM extends As{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}function av(o,e,i,s){const l=lM(s);switch(i){case Xv:return o*e;case Wv:return o*e;case Yv:return o*e*2;case jv:return o*e/l.components*l.byteLength;case wd:return o*e/l.components*l.byteLength;case Zv:return o*e*2/l.components*l.byteLength;case Dd:return o*e*2/l.components*l.byteLength;case qv:return o*e*3/l.components*l.byteLength;case Ti:return o*e*4/l.components*l.byteLength;case Ud:return o*e*4/l.components*l.byteLength;case wc:case Dc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Uc:case Nc:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case jh:case Kh:return Math.max(o,16)*Math.max(e,8)/4;case Yh:case Zh:return Math.max(o,8)*Math.max(e,8)/2;case Qh:case Jh:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case $h:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case td:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case ed:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case nd:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case id:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case ad:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case sd:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case rd:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case od:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case ld:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case cd:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case ud:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case fd:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case hd:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case dd:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Lc:case pd:case md:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Kv:case gd:return Math.ceil(o/4)*Math.ceil(e/4)*8;case _d:case vd:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function lM(o){switch(o){case ua:case Gv:return{byteLength:1,components:1};case Fo:case Vv:case Ho:return{byteLength:2,components:1};case Rd:case Cd:return{byteLength:2,components:4};case Es:case Ad:case ra:return{byteLength:4,components:1};case kv:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bd);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function f0(){let o=null,e=!1,i=null,s=null;function l(u,h){i(u,h),s=o.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(s=o.requestAnimationFrame(l),e=!0)},stop:function(){o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(u){i=u},setContext:function(u){o=u}}}function cM(o){const e=new WeakMap;function i(d,m){const p=d.array,g=d.usage,y=p.byteLength,S=o.createBuffer();o.bindBuffer(m,S),o.bufferData(m,p,g),d.onUploadCallback();let M;if(p instanceof Float32Array)M=o.FLOAT;else if(p instanceof Uint16Array)d.isFloat16BufferAttribute?M=o.HALF_FLOAT:M=o.UNSIGNED_SHORT;else if(p instanceof Int16Array)M=o.SHORT;else if(p instanceof Uint32Array)M=o.UNSIGNED_INT;else if(p instanceof Int32Array)M=o.INT;else if(p instanceof Int8Array)M=o.BYTE;else if(p instanceof Uint8Array)M=o.UNSIGNED_BYTE;else if(p instanceof Uint8ClampedArray)M=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+p);return{buffer:S,type:M,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version,size:y}}function s(d,m,p){const g=m.array,y=m.updateRanges;if(o.bindBuffer(p,d),y.length===0)o.bufferSubData(p,0,g);else{y.sort((M,E)=>M.start-E.start);let S=0;for(let M=1;M<y.length;M++){const E=y[S],A=y[M];A.start<=E.start+E.count+1?E.count=Math.max(E.count,A.start+A.count-E.start):(++S,y[S]=A)}y.length=S+1;for(let M=0,E=y.length;M<E;M++){const A=y[M];o.bufferSubData(p,A.start*g.BYTES_PER_ELEMENT,g,A.start,A.count)}m.clearUpdateRanges()}m.onUploadCallback()}function l(d){return d.isInterleavedBufferAttribute&&(d=d.data),e.get(d)}function u(d){d.isInterleavedBufferAttribute&&(d=d.data);const m=e.get(d);m&&(o.deleteBuffer(m.buffer),e.delete(d))}function h(d,m){if(d.isInterleavedBufferAttribute&&(d=d.data),d.isGLBufferAttribute){const g=e.get(d);(!g||g.version<d.version)&&e.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}const p=e.get(d);if(p===void 0)e.set(d,i(d,m));else if(p.version<d.version){if(p.size!==d.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(p.buffer,d,m),p.version=d.version}}return{get:l,remove:u,update:h}}var uM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,mM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_M=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vM=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,yM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,SM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,xM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,MM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,EM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,TM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,bM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,AM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,RM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,CM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,DM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,UM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,NM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,LM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,OM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,PM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,zM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,IM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,BM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,FM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,HM="gl_FragColor = linearToOutputTexel( gl_FragColor );",GM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,VM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,XM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,WM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,YM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,jM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ZM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,KM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,QM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,JM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,$M=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,nE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,iE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,aE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sE=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,oE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lE=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,cE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_E=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,SE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ME=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,EE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,TE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,bE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,AE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,CE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,NE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,LE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,OE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,PE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,IE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,BE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,FE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,HE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,GE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,VE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,XE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,WE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,YE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ZE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,KE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,QE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,JE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,$E=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,tT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,eT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,iT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,aT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,sT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,rT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,oT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,lT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cT=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,uT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mT=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gT=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_T=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vT=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,yT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ST=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xT=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,MT=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ET=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,TT=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bT=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AT=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RT=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,CT=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wT=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,DT=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,UT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,NT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,OT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,IT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,BT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,FT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,GT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,VT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pe={alphahash_fragment:uM,alphahash_pars_fragment:fM,alphamap_fragment:hM,alphamap_pars_fragment:dM,alphatest_fragment:pM,alphatest_pars_fragment:mM,aomap_fragment:gM,aomap_pars_fragment:_M,batching_pars_vertex:vM,batching_vertex:yM,begin_vertex:SM,beginnormal_vertex:xM,bsdfs:MM,iridescence_fragment:EM,bumpmap_pars_fragment:TM,clipping_planes_fragment:bM,clipping_planes_pars_fragment:AM,clipping_planes_pars_vertex:RM,clipping_planes_vertex:CM,color_fragment:wM,color_pars_fragment:DM,color_pars_vertex:UM,color_vertex:NM,common:LM,cube_uv_reflection_fragment:OM,defaultnormal_vertex:PM,displacementmap_pars_vertex:zM,displacementmap_vertex:IM,emissivemap_fragment:BM,emissivemap_pars_fragment:FM,colorspace_fragment:HM,colorspace_pars_fragment:GM,envmap_fragment:VM,envmap_common_pars_fragment:kM,envmap_pars_fragment:XM,envmap_pars_vertex:qM,envmap_physical_pars_fragment:nE,envmap_vertex:WM,fog_vertex:YM,fog_pars_vertex:jM,fog_fragment:ZM,fog_pars_fragment:KM,gradientmap_pars_fragment:QM,lightmap_pars_fragment:JM,lights_lambert_fragment:$M,lights_lambert_pars_fragment:tE,lights_pars_begin:eE,lights_toon_fragment:iE,lights_toon_pars_fragment:aE,lights_phong_fragment:sE,lights_phong_pars_fragment:rE,lights_physical_fragment:oE,lights_physical_pars_fragment:lE,lights_fragment_begin:cE,lights_fragment_maps:uE,lights_fragment_end:fE,logdepthbuf_fragment:hE,logdepthbuf_pars_fragment:dE,logdepthbuf_pars_vertex:pE,logdepthbuf_vertex:mE,map_fragment:gE,map_pars_fragment:_E,map_particle_fragment:vE,map_particle_pars_fragment:yE,metalnessmap_fragment:SE,metalnessmap_pars_fragment:xE,morphinstance_vertex:ME,morphcolor_vertex:EE,morphnormal_vertex:TE,morphtarget_pars_vertex:bE,morphtarget_vertex:AE,normal_fragment_begin:RE,normal_fragment_maps:CE,normal_pars_fragment:wE,normal_pars_vertex:DE,normal_vertex:UE,normalmap_pars_fragment:NE,clearcoat_normal_fragment_begin:LE,clearcoat_normal_fragment_maps:OE,clearcoat_pars_fragment:PE,iridescence_pars_fragment:zE,opaque_fragment:IE,packing:BE,premultiplied_alpha_fragment:FE,project_vertex:HE,dithering_fragment:GE,dithering_pars_fragment:VE,roughnessmap_fragment:kE,roughnessmap_pars_fragment:XE,shadowmap_pars_fragment:qE,shadowmap_pars_vertex:WE,shadowmap_vertex:YE,shadowmask_pars_fragment:jE,skinbase_vertex:ZE,skinning_pars_vertex:KE,skinning_vertex:QE,skinnormal_vertex:JE,specularmap_fragment:$E,specularmap_pars_fragment:tT,tonemapping_fragment:eT,tonemapping_pars_fragment:nT,transmission_fragment:iT,transmission_pars_fragment:aT,uv_pars_fragment:sT,uv_pars_vertex:rT,uv_vertex:oT,worldpos_vertex:lT,background_vert:cT,background_frag:uT,backgroundCube_vert:fT,backgroundCube_frag:hT,cube_vert:dT,cube_frag:pT,depth_vert:mT,depth_frag:gT,distanceRGBA_vert:_T,distanceRGBA_frag:vT,equirect_vert:yT,equirect_frag:ST,linedashed_vert:xT,linedashed_frag:MT,meshbasic_vert:ET,meshbasic_frag:TT,meshlambert_vert:bT,meshlambert_frag:AT,meshmatcap_vert:RT,meshmatcap_frag:CT,meshnormal_vert:wT,meshnormal_frag:DT,meshphong_vert:UT,meshphong_frag:NT,meshphysical_vert:LT,meshphysical_frag:OT,meshtoon_vert:PT,meshtoon_frag:zT,points_vert:IT,points_frag:BT,shadow_vert:FT,shadow_frag:HT,sprite_vert:GT,sprite_frag:VT},It={common:{diffuse:{value:new Le(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new de}},envmap:{envMap:{value:null},envMapRotation:{value:new de},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new de}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new de}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new de},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new de},normalScale:{value:new me(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new de},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new de}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new de}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new de}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Le(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Le(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0},uvTransform:{value:new de}},sprite:{diffuse:{value:new Le(16777215)},opacity:{value:1},center:{value:new me(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}}},Ni={basic:{uniforms:Ln([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:pe.meshbasic_vert,fragmentShader:pe.meshbasic_frag},lambert:{uniforms:Ln([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Le(0)}}]),vertexShader:pe.meshlambert_vert,fragmentShader:pe.meshlambert_frag},phong:{uniforms:Ln([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new Le(0)},specular:{value:new Le(1118481)},shininess:{value:30}}]),vertexShader:pe.meshphong_vert,fragmentShader:pe.meshphong_frag},standard:{uniforms:Ln([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new Le(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag},toon:{uniforms:Ln([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new Le(0)}}]),vertexShader:pe.meshtoon_vert,fragmentShader:pe.meshtoon_frag},matcap:{uniforms:Ln([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:pe.meshmatcap_vert,fragmentShader:pe.meshmatcap_frag},points:{uniforms:Ln([It.points,It.fog]),vertexShader:pe.points_vert,fragmentShader:pe.points_frag},dashed:{uniforms:Ln([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:pe.linedashed_vert,fragmentShader:pe.linedashed_frag},depth:{uniforms:Ln([It.common,It.displacementmap]),vertexShader:pe.depth_vert,fragmentShader:pe.depth_frag},normal:{uniforms:Ln([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:pe.meshnormal_vert,fragmentShader:pe.meshnormal_frag},sprite:{uniforms:Ln([It.sprite,It.fog]),vertexShader:pe.sprite_vert,fragmentShader:pe.sprite_frag},background:{uniforms:{uvTransform:{value:new de},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:pe.background_vert,fragmentShader:pe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new de}},vertexShader:pe.backgroundCube_vert,fragmentShader:pe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:pe.cube_vert,fragmentShader:pe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:pe.equirect_vert,fragmentShader:pe.equirect_frag},distanceRGBA:{uniforms:Ln([It.common,It.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:pe.distanceRGBA_vert,fragmentShader:pe.distanceRGBA_frag},shadow:{uniforms:Ln([It.lights,It.fog,{color:{value:new Le(0)},opacity:{value:1}}]),vertexShader:pe.shadow_vert,fragmentShader:pe.shadow_frag}};Ni.physical={uniforms:Ln([Ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new de},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new de},clearcoatNormalScale:{value:new me(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new de},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new de},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new de},sheen:{value:0},sheenColor:{value:new Le(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new de},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new de},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new de},transmissionSamplerSize:{value:new me},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new de},attenuationDistance:{value:0},attenuationColor:{value:new Le(0)},specularColor:{value:new Le(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new de},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new de},anisotropyVector:{value:new me},anisotropyMap:{value:null},anisotropyMapTransform:{value:new de}}]),vertexShader:pe.meshphysical_vert,fragmentShader:pe.meshphysical_frag};const bc={r:0,b:0,g:0},gs=new fa,kT=new Ke;function XT(o,e,i,s,l,u,h){const d=new Le(0);let m=u===!0?0:1,p,g,y=null,S=0,M=null;function E(L){let w=L.isScene===!0?L.background:null;return w&&w.isTexture&&(w=(L.backgroundBlurriness>0?i:e).get(w)),w}function A(L){let w=!1;const q=E(L);q===null?v(d,m):q&&q.isColor&&(v(q,1),w=!0);const G=o.xr.getEnvironmentBlendMode();G==="additive"?s.buffers.color.setClear(0,0,0,1,h):G==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,h),(o.autoClear||w)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function x(L,w){const q=E(w);q&&(q.isCubeTexture||q.mapping===Gc)?(g===void 0&&(g=new la(new qo(1,1,1),new ha({name:"BackgroundCubeMaterial",uniforms:Or(Ni.backgroundCube.uniforms),vertexShader:Ni.backgroundCube.vertexShader,fragmentShader:Ni.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(G,O,j){this.matrixWorld.copyPosition(j.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(g)),gs.copy(w.backgroundRotation),gs.x*=-1,gs.y*=-1,gs.z*=-1,q.isCubeTexture&&q.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),g.material.uniforms.envMap.value=q,g.material.uniforms.flipEnvMap.value=q.isCubeTexture&&q.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,g.material.uniforms.backgroundRotation.value.setFromMatrix4(kT.makeRotationFromEuler(gs)),g.material.toneMapped=De.getTransfer(q.colorSpace)!==Ge,(y!==q||S!==q.version||M!==o.toneMapping)&&(g.material.needsUpdate=!0,y=q,S=q.version,M=o.toneMapping),g.layers.enableAll(),L.unshift(g,g.geometry,g.material,0,0,null)):q&&q.isTexture&&(p===void 0&&(p=new la(new Vc(2,2),new ha({name:"BackgroundMaterial",uniforms:Or(Ni.background.uniforms),vertexShader:Ni.background.vertexShader,fragmentShader:Ni.background.fragmentShader,side:Wa,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(p)),p.material.uniforms.t2D.value=q,p.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,p.material.toneMapped=De.getTransfer(q.colorSpace)!==Ge,q.matrixAutoUpdate===!0&&q.updateMatrix(),p.material.uniforms.uvTransform.value.copy(q.matrix),(y!==q||S!==q.version||M!==o.toneMapping)&&(p.material.needsUpdate=!0,y=q,S=q.version,M=o.toneMapping),p.layers.enableAll(),L.unshift(p,p.geometry,p.material,0,0,null))}function v(L,w){L.getRGB(bc,s0(o)),s.buffers.color.setClear(bc.r,bc.g,bc.b,w,h)}function B(){g!==void 0&&(g.geometry.dispose(),g.material.dispose()),p!==void 0&&(p.geometry.dispose(),p.material.dispose())}return{getClearColor:function(){return d},setClearColor:function(L,w=1){d.set(L),m=w,v(d,m)},getClearAlpha:function(){return m},setClearAlpha:function(L){m=L,v(d,m)},render:A,addToRenderList:x,dispose:B}}function qT(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=S(null);let u=l,h=!1;function d(C,H,et,Q,dt){let pt=!1;const P=y(Q,et,H);u!==P&&(u=P,p(u.object)),pt=M(C,Q,et,dt),pt&&E(C,Q,et,dt),dt!==null&&e.update(dt,o.ELEMENT_ARRAY_BUFFER),(pt||h)&&(h=!1,w(C,H,et,Q),dt!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(dt).buffer))}function m(){return o.createVertexArray()}function p(C){return o.bindVertexArray(C)}function g(C){return o.deleteVertexArray(C)}function y(C,H,et){const Q=et.wireframe===!0;let dt=s[C.id];dt===void 0&&(dt={},s[C.id]=dt);let pt=dt[H.id];pt===void 0&&(pt={},dt[H.id]=pt);let P=pt[Q];return P===void 0&&(P=S(m()),pt[Q]=P),P}function S(C){const H=[],et=[],Q=[];for(let dt=0;dt<i;dt++)H[dt]=0,et[dt]=0,Q[dt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:et,attributeDivisors:Q,object:C,attributes:{},index:null}}function M(C,H,et,Q){const dt=u.attributes,pt=H.attributes;let P=0;const X=et.getAttributes();for(const F in X)if(X[F].location>=0){const Tt=dt[F];let N=pt[F];if(N===void 0&&(F==="instanceMatrix"&&C.instanceMatrix&&(N=C.instanceMatrix),F==="instanceColor"&&C.instanceColor&&(N=C.instanceColor)),Tt===void 0||Tt.attribute!==N||N&&Tt.data!==N.data)return!0;P++}return u.attributesNum!==P||u.index!==Q}function E(C,H,et,Q){const dt={},pt=H.attributes;let P=0;const X=et.getAttributes();for(const F in X)if(X[F].location>=0){let Tt=pt[F];Tt===void 0&&(F==="instanceMatrix"&&C.instanceMatrix&&(Tt=C.instanceMatrix),F==="instanceColor"&&C.instanceColor&&(Tt=C.instanceColor));const N={};N.attribute=Tt,Tt&&Tt.data&&(N.data=Tt.data),dt[F]=N,P++}u.attributes=dt,u.attributesNum=P,u.index=Q}function A(){const C=u.newAttributes;for(let H=0,et=C.length;H<et;H++)C[H]=0}function x(C){v(C,0)}function v(C,H){const et=u.newAttributes,Q=u.enabledAttributes,dt=u.attributeDivisors;et[C]=1,Q[C]===0&&(o.enableVertexAttribArray(C),Q[C]=1),dt[C]!==H&&(o.vertexAttribDivisor(C,H),dt[C]=H)}function B(){const C=u.newAttributes,H=u.enabledAttributes;for(let et=0,Q=H.length;et<Q;et++)H[et]!==C[et]&&(o.disableVertexAttribArray(et),H[et]=0)}function L(C,H,et,Q,dt,pt,P){P===!0?o.vertexAttribIPointer(C,H,et,dt,pt):o.vertexAttribPointer(C,H,et,Q,dt,pt)}function w(C,H,et,Q){A();const dt=Q.attributes,pt=et.getAttributes(),P=H.defaultAttributeValues;for(const X in pt){const F=pt[X];if(F.location>=0){let yt=dt[X];if(yt===void 0&&(X==="instanceMatrix"&&C.instanceMatrix&&(yt=C.instanceMatrix),X==="instanceColor"&&C.instanceColor&&(yt=C.instanceColor)),yt!==void 0){const Tt=yt.normalized,N=yt.itemSize,at=e.get(yt);if(at===void 0)continue;const Et=at.buffer,K=at.type,ft=at.bytesPerElement,xt=K===o.INT||K===o.UNSIGNED_INT||yt.gpuType===Ad;if(yt.isInterleavedBufferAttribute){const Mt=yt.data,Vt=Mt.stride,Gt=yt.offset;if(Mt.isInstancedInterleavedBuffer){for(let oe=0;oe<F.locationSize;oe++)v(F.location+oe,Mt.meshPerAttribute);C.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let oe=0;oe<F.locationSize;oe++)x(F.location+oe);o.bindBuffer(o.ARRAY_BUFFER,Et);for(let oe=0;oe<F.locationSize;oe++)L(F.location+oe,N/F.locationSize,K,Tt,Vt*ft,(Gt+N/F.locationSize*oe)*ft,xt)}else{if(yt.isInstancedBufferAttribute){for(let Mt=0;Mt<F.locationSize;Mt++)v(F.location+Mt,yt.meshPerAttribute);C.isInstancedMesh!==!0&&Q._maxInstanceCount===void 0&&(Q._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let Mt=0;Mt<F.locationSize;Mt++)x(F.location+Mt);o.bindBuffer(o.ARRAY_BUFFER,Et);for(let Mt=0;Mt<F.locationSize;Mt++)L(F.location+Mt,N/F.locationSize,K,Tt,N*ft,N/F.locationSize*Mt*ft,xt)}}else if(P!==void 0){const Tt=P[X];if(Tt!==void 0)switch(Tt.length){case 2:o.vertexAttrib2fv(F.location,Tt);break;case 3:o.vertexAttrib3fv(F.location,Tt);break;case 4:o.vertexAttrib4fv(F.location,Tt);break;default:o.vertexAttrib1fv(F.location,Tt)}}}}B()}function q(){j();for(const C in s){const H=s[C];for(const et in H){const Q=H[et];for(const dt in Q)g(Q[dt].object),delete Q[dt];delete H[et]}delete s[C]}}function G(C){if(s[C.id]===void 0)return;const H=s[C.id];for(const et in H){const Q=H[et];for(const dt in Q)g(Q[dt].object),delete Q[dt];delete H[et]}delete s[C.id]}function O(C){for(const H in s){const et=s[H];if(et[C.id]===void 0)continue;const Q=et[C.id];for(const dt in Q)g(Q[dt].object),delete Q[dt];delete et[C.id]}}function j(){U(),h=!0,u!==l&&(u=l,p(u.object))}function U(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:j,resetDefaultState:U,dispose:q,releaseStatesOfGeometry:G,releaseStatesOfProgram:O,initAttributes:A,enableAttribute:x,disableUnusedAttributes:B}}function WT(o,e,i){let s;function l(p){s=p}function u(p,g){o.drawArrays(s,p,g),i.update(g,s,1)}function h(p,g,y){y!==0&&(o.drawArraysInstanced(s,p,g,y),i.update(g,s,y))}function d(p,g,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,g,0,y);let M=0;for(let E=0;E<y;E++)M+=g[E];i.update(M,s,1)}function m(p,g,y,S){if(y===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let E=0;E<p.length;E++)h(p[E],g[E],S[E]);else{M.multiDrawArraysInstancedWEBGL(s,p,0,g,0,S,0,y);let E=0;for(let A=0;A<y;A++)E+=g[A]*S[A];i.update(E,s,1)}}this.setMode=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d,this.renderMultiDrawInstances=m}function YT(o,e,i,s){let l;function u(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function h(O){return!(O!==Ti&&s.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function d(O){const j=O===Ho&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==ua&&s.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==ra&&!j)}function m(O){if(O==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let p=i.precision!==void 0?i.precision:"highp";const g=m(p);g!==p&&(console.warn("THREE.WebGLRenderer:",p,"not supported, using",g,"instead."),p=g);const y=i.logarithmicDepthBuffer===!0,S=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),M=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),E=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),A=o.getParameter(o.MAX_TEXTURE_SIZE),x=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),v=o.getParameter(o.MAX_VERTEX_ATTRIBS),B=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),L=o.getParameter(o.MAX_VARYING_VECTORS),w=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),q=E>0,G=o.getParameter(o.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:u,getMaxPrecision:m,textureFormatReadable:h,textureTypeReadable:d,precision:p,logarithmicDepthBuffer:y,reverseDepthBuffer:S,maxTextures:M,maxVertexTextures:E,maxTextureSize:A,maxCubemapSize:x,maxAttributes:v,maxVertexUniforms:B,maxVaryings:L,maxFragmentUniforms:w,vertexTextures:q,maxSamples:G}}function jT(o){const e=this;let i=null,s=0,l=!1,u=!1;const h=new Va,d=new de,m={value:null,needsUpdate:!1};this.uniform=m,this.numPlanes=0,this.numIntersection=0,this.init=function(y,S){const M=y.length!==0||S||s!==0||l;return l=S,s=y.length,M},this.beginShadows=function(){u=!0,g(null)},this.endShadows=function(){u=!1},this.setGlobalState=function(y,S){i=g(y,S,0)},this.setState=function(y,S,M){const E=y.clippingPlanes,A=y.clipIntersection,x=y.clipShadows,v=o.get(y);if(!l||E===null||E.length===0||u&&!x)u?g(null):p();else{const B=u?0:s,L=B*4;let w=v.clippingState||null;m.value=w,w=g(E,S,L,M);for(let q=0;q!==L;++q)w[q]=i[q];v.clippingState=w,this.numIntersection=A?this.numPlanes:0,this.numPlanes+=B}};function p(){m.value!==i&&(m.value=i,m.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function g(y,S,M,E){const A=y!==null?y.length:0;let x=null;if(A!==0){if(x=m.value,E!==!0||x===null){const v=M+A*4,B=S.matrixWorldInverse;d.getNormalMatrix(B),(x===null||x.length<v)&&(x=new Float32Array(v));for(let L=0,w=M;L!==A;++L,w+=4)h.copy(y[L]).applyMatrix4(B,d),h.normal.toArray(x,w),x[w+3]=h.constant}m.value=x,m.needsUpdate=!0}return e.numPlanes=A,e.numIntersection=0,x}}function ZT(o){let e=new WeakMap;function i(h,d){return d===kh?h.mapping=wr:d===Xh&&(h.mapping=Dr),h}function s(h){if(h&&h.isTexture){const d=h.mapping;if(d===kh||d===Xh)if(e.has(h)){const m=e.get(h).texture;return i(m,h.mapping)}else{const m=h.image;if(m&&m.height>0){const p=new jx(m.height);return p.fromEquirectangularTexture(o,h),e.set(h,p),h.addEventListener("dispose",l),i(p.texture,h.mapping)}else return null}}return h}function l(h){const d=h.target;d.removeEventListener("dispose",l);const m=e.get(d);m!==void 0&&(e.delete(d),m.dispose())}function u(){e=new WeakMap}return{get:s,dispose:u}}const Mr=4,sv=[.125,.215,.35,.446,.526,.582],Ss=20,Ah=new aM,rv=new Le;let Rh=null,Ch=0,wh=0,Dh=!1;const vs=(1+Math.sqrt(5))/2,yr=1/vs,ov=[new nt(-vs,yr,0),new nt(vs,yr,0),new nt(-yr,0,vs),new nt(yr,0,vs),new nt(0,vs,-yr),new nt(0,vs,yr),new nt(-1,1,-1),new nt(1,1,-1),new nt(-1,1,1),new nt(1,1,1)];class lv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,s=.1,l=100){Rh=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),wh=this._renderer.getActiveMipmapLevel(),Dh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,s,l,u),i>0&&this._blur(u,0,0,i),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Rh,Ch,wh),this._renderer.xr.enabled=Dh,e.scissorTest=!1,Ac(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===wr||e.mapping===Dr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rh=this._renderer.getRenderTarget(),Ch=this._renderer.getActiveCubeFace(),wh=this._renderer.getActiveMipmapLevel(),Dh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Li,minFilter:Li,generateMipmaps:!1,type:Ho,format:Ti,colorSpace:Lr,depthBuffer:!1},l=cv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cv(e,i,s);const{_lodMax:u}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=KT(u)),this._blurMaterial=QT(u,e,i)}return l}_compileMaterial(e){const i=new la(this._lodPlanes[0],e);this._renderer.compile(i,Ah)}_sceneToCubeUV(e,i,s,l){const d=new di(90,1,i,s),m=[1,-1,1,1,1,1],p=[1,1,1,-1,-1,-1],g=this._renderer,y=g.autoClear,S=g.toneMapping;g.getClearColor(rv),g.toneMapping=qa,g.autoClear=!1;const M=new n0({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1}),E=new la(new qo,M);let A=!1;const x=e.background;x?x.isColor&&(M.color.copy(x),e.background=null,A=!0):(M.color.copy(rv),A=!0);for(let v=0;v<6;v++){const B=v%3;B===0?(d.up.set(0,m[v],0),d.lookAt(p[v],0,0)):B===1?(d.up.set(0,0,m[v]),d.lookAt(0,p[v],0)):(d.up.set(0,m[v],0),d.lookAt(0,0,p[v]));const L=this._cubeSize;Ac(l,B*L,v>2?L:0,L,L),g.setRenderTarget(l),A&&g.render(E,d),g.render(e,d)}E.geometry.dispose(),E.material.dispose(),g.toneMapping=S,g.autoClear=y,e.background=x}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===wr||e.mapping===Dr;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=fv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uv());const u=l?this._cubemapMaterial:this._equirectMaterial,h=new la(this._lodPlanes[0],u),d=u.uniforms;d.envMap.value=e;const m=this._cubeSize;Ac(i,0,0,3*m,2*m),s.setRenderTarget(i),s.render(h,Ah)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let u=1;u<l;u++){const h=Math.sqrt(this._sigmas[u]*this._sigmas[u]-this._sigmas[u-1]*this._sigmas[u-1]),d=ov[(l-u-1)%ov.length];this._blur(e,u-1,u,h,d)}i.autoClear=s}_blur(e,i,s,l,u){const h=this._pingPongRenderTarget;this._halfBlur(e,h,i,s,l,"latitudinal",u),this._halfBlur(h,e,s,s,l,"longitudinal",u)}_halfBlur(e,i,s,l,u,h,d){const m=this._renderer,p=this._blurMaterial;h!=="latitudinal"&&h!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,y=new la(this._lodPlanes[l],p),S=p.uniforms,M=this._sizeLods[s]-1,E=isFinite(u)?Math.PI/(2*M):2*Math.PI/(2*Ss-1),A=u/E,x=isFinite(u)?1+Math.floor(g*A):Ss;x>Ss&&console.warn(`sigmaRadians, ${u}, is too large and will clip, as it requested ${x} samples when the maximum is set to ${Ss}`);const v=[];let B=0;for(let O=0;O<Ss;++O){const j=O/A,U=Math.exp(-j*j/2);v.push(U),O===0?B+=U:O<x&&(B+=2*U)}for(let O=0;O<v.length;O++)v[O]=v[O]/B;S.envMap.value=e.texture,S.samples.value=x,S.weights.value=v,S.latitudinal.value=h==="latitudinal",d&&(S.poleAxis.value=d);const{_lodMax:L}=this;S.dTheta.value=E,S.mipInt.value=L-s;const w=this._sizeLods[l],q=3*w*(l>L-Mr?l-L+Mr:0),G=4*(this._cubeSize-w);Ac(i,q,G,3*w,2*w),m.setRenderTarget(i),m.render(y,Ah)}}function KT(o){const e=[],i=[],s=[];let l=o;const u=o-Mr+1+sv.length;for(let h=0;h<u;h++){const d=Math.pow(2,l);i.push(d);let m=1/d;h>o-Mr?m=sv[h-o+Mr-1]:h===0&&(m=0),s.push(m);const p=1/(d-2),g=-p,y=1+p,S=[g,g,y,g,y,y,g,g,y,y,g,y],M=6,E=6,A=3,x=2,v=1,B=new Float32Array(A*E*M),L=new Float32Array(x*E*M),w=new Float32Array(v*E*M);for(let G=0;G<M;G++){const O=G%3*2/3-1,j=G>2?0:-1,U=[O,j,0,O+2/3,j,0,O+2/3,j+1,0,O,j,0,O+2/3,j+1,0,O,j+1,0];B.set(U,A*E*G),L.set(S,x*E*G);const C=[G,G,G,G,G,G];w.set(C,v*E*G)}const q=new Ai;q.setAttribute("position",new Oi(B,A)),q.setAttribute("uv",new Oi(L,x)),q.setAttribute("faceIndex",new Oi(w,v)),e.push(q),l>Mr&&l--}return{lodPlanes:e,sizeLods:i,sigmas:s}}function cv(o,e,i){const s=new Ts(o,e,i);return s.texture.mapping=Gc,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Ac(o,e,i,s,l){o.viewport.set(e,i,s,l),o.scissor.set(e,i,s,l)}function QT(o,e,i){const s=new Float32Array(Ss),l=new nt(0,1,0);return new ha({name:"SphericalGaussianBlur",defines:{n:Ss,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function uv(){return new ha({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function fv(){return new ha({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ld(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xa,depthTest:!1,depthWrite:!1})}function Ld(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function JT(o){let e=new WeakMap,i=null;function s(d){if(d&&d.isTexture){const m=d.mapping,p=m===kh||m===Xh,g=m===wr||m===Dr;if(p||g){let y=e.get(d);const S=y!==void 0?y.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==S)return i===null&&(i=new lv(o)),y=p?i.fromEquirectangular(d,y):i.fromCubemap(d,y),y.texture.pmremVersion=d.pmremVersion,e.set(d,y),y.texture;if(y!==void 0)return y.texture;{const M=d.image;return p&&M&&M.height>0||g&&M&&l(M)?(i===null&&(i=new lv(o)),y=p?i.fromEquirectangular(d):i.fromCubemap(d),y.texture.pmremVersion=d.pmremVersion,e.set(d,y),d.addEventListener("dispose",u),y.texture):null}}}return d}function l(d){let m=0;const p=6;for(let g=0;g<p;g++)d[g]!==void 0&&m++;return m===p}function u(d){const m=d.target;m.removeEventListener("dispose",u);const p=e.get(m);p!==void 0&&(e.delete(m),p.dispose())}function h(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function $T(o){const e={};function i(s){if(e[s]!==void 0)return e[s];let l;switch(s){case"WEBGL_depth_texture":l=o.getExtension("WEBGL_depth_texture")||o.getExtension("MOZ_WEBGL_depth_texture")||o.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=o.getExtension("EXT_texture_filter_anisotropic")||o.getExtension("MOZ_EXT_texture_filter_anisotropic")||o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=o.getExtension("WEBGL_compressed_texture_s3tc")||o.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=o.getExtension("WEBGL_compressed_texture_pvrtc")||o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=o.getExtension(s)}return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&Sr("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function tb(o,e,i,s){const l={},u=new WeakMap;function h(y){const S=y.target;S.index!==null&&e.remove(S.index);for(const E in S.attributes)e.remove(S.attributes[E]);S.removeEventListener("dispose",h),delete l[S.id];const M=u.get(S);M&&(e.remove(M),u.delete(S)),s.releaseStatesOfGeometry(S),S.isInstancedBufferGeometry===!0&&delete S._maxInstanceCount,i.memory.geometries--}function d(y,S){return l[S.id]===!0||(S.addEventListener("dispose",h),l[S.id]=!0,i.memory.geometries++),S}function m(y){const S=y.attributes;for(const M in S)e.update(S[M],o.ARRAY_BUFFER)}function p(y){const S=[],M=y.index,E=y.attributes.position;let A=0;if(M!==null){const B=M.array;A=M.version;for(let L=0,w=B.length;L<w;L+=3){const q=B[L+0],G=B[L+1],O=B[L+2];S.push(q,G,G,O,O,q)}}else if(E!==void 0){const B=E.array;A=E.version;for(let L=0,w=B.length/3-1;L<w;L+=3){const q=L+0,G=L+1,O=L+2;S.push(q,G,G,O,O,q)}}else return;const x=new(Jv(S)?a0:i0)(S,1);x.version=A;const v=u.get(y);v&&e.remove(v),u.set(y,x)}function g(y){const S=u.get(y);if(S){const M=y.index;M!==null&&S.version<M.version&&p(y)}else p(y);return u.get(y)}return{get:d,update:m,getWireframeAttribute:g}}function eb(o,e,i){let s;function l(S){s=S}let u,h;function d(S){u=S.type,h=S.bytesPerElement}function m(S,M){o.drawElements(s,M,u,S*h),i.update(M,s,1)}function p(S,M,E){E!==0&&(o.drawElementsInstanced(s,M,u,S*h,E),i.update(M,s,E))}function g(S,M,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,M,0,u,S,0,E);let x=0;for(let v=0;v<E;v++)x+=M[v];i.update(x,s,1)}function y(S,M,E,A){if(E===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let v=0;v<S.length;v++)p(S[v]/h,M[v],A[v]);else{x.multiDrawElementsInstancedWEBGL(s,M,0,u,S,0,A,0,E);let v=0;for(let B=0;B<E;B++)v+=M[B]*A[B];i.update(v,s,1)}}this.setMode=l,this.setIndex=d,this.render=m,this.renderInstances=p,this.renderMultiDraw=g,this.renderMultiDrawInstances=y}function nb(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(u,h,d){switch(i.calls++,h){case o.TRIANGLES:i.triangles+=d*(u/3);break;case o.LINES:i.lines+=d*(u/2);break;case o.LINE_STRIP:i.lines+=d*(u-1);break;case o.LINE_LOOP:i.lines+=d*u;break;case o.POINTS:i.points+=d*u;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",h);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function ib(o,e,i){const s=new WeakMap,l=new an;function u(h,d,m){const p=h.morphTargetInfluences,g=d.morphAttributes.position||d.morphAttributes.normal||d.morphAttributes.color,y=g!==void 0?g.length:0;let S=s.get(d);if(S===void 0||S.count!==y){let C=function(){j.dispose(),s.delete(d),d.removeEventListener("dispose",C)};var M=C;S!==void 0&&S.texture.dispose();const E=d.morphAttributes.position!==void 0,A=d.morphAttributes.normal!==void 0,x=d.morphAttributes.color!==void 0,v=d.morphAttributes.position||[],B=d.morphAttributes.normal||[],L=d.morphAttributes.color||[];let w=0;E===!0&&(w=1),A===!0&&(w=2),x===!0&&(w=3);let q=d.attributes.position.count*w,G=1;q>e.maxTextureSize&&(G=Math.ceil(q/e.maxTextureSize),q=e.maxTextureSize);const O=new Float32Array(q*G*4*y),j=new t0(O,q,G,y);j.type=ra,j.needsUpdate=!0;const U=w*4;for(let H=0;H<y;H++){const et=v[H],Q=B[H],dt=L[H],pt=q*G*4*H;for(let P=0;P<et.count;P++){const X=P*U;E===!0&&(l.fromBufferAttribute(et,P),O[pt+X+0]=l.x,O[pt+X+1]=l.y,O[pt+X+2]=l.z,O[pt+X+3]=0),A===!0&&(l.fromBufferAttribute(Q,P),O[pt+X+4]=l.x,O[pt+X+5]=l.y,O[pt+X+6]=l.z,O[pt+X+7]=0),x===!0&&(l.fromBufferAttribute(dt,P),O[pt+X+8]=l.x,O[pt+X+9]=l.y,O[pt+X+10]=l.z,O[pt+X+11]=dt.itemSize===4?l.w:1)}}S={count:y,texture:j,size:new me(q,G)},s.set(d,S),d.addEventListener("dispose",C)}if(h.isInstancedMesh===!0&&h.morphTexture!==null)m.getUniforms().setValue(o,"morphTexture",h.morphTexture,i);else{let E=0;for(let x=0;x<p.length;x++)E+=p[x];const A=d.morphTargetsRelative?1:1-E;m.getUniforms().setValue(o,"morphTargetBaseInfluence",A),m.getUniforms().setValue(o,"morphTargetInfluences",p)}m.getUniforms().setValue(o,"morphTargetsTexture",S.texture,i),m.getUniforms().setValue(o,"morphTargetsTextureSize",S.size)}return{update:u}}function ab(o,e,i,s){let l=new WeakMap;function u(m){const p=s.render.frame,g=m.geometry,y=e.get(m,g);if(l.get(y)!==p&&(e.update(y),l.set(y,p)),m.isInstancedMesh&&(m.hasEventListener("dispose",d)===!1&&m.addEventListener("dispose",d),l.get(m)!==p&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),l.set(m,p))),m.isSkinnedMesh){const S=m.skeleton;l.get(S)!==p&&(S.update(),l.set(S,p))}return y}function h(){l=new WeakMap}function d(m){const p=m.target;p.removeEventListener("dispose",d),i.remove(p.instanceMatrix),p.instanceColor!==null&&i.remove(p.instanceColor)}return{update:u,dispose:h}}const h0=new Yn,hv=new u0(1,1),d0=new t0,p0=new Nx,m0=new o0,dv=[],pv=[],mv=new Float32Array(16),gv=new Float32Array(9),_v=new Float32Array(4);function zr(o,e,i){const s=o[0];if(s<=0||s>0)return o;const l=e*i;let u=dv[l];if(u===void 0&&(u=new Float32Array(l),dv[l]=u),e!==0){s.toArray(u,0);for(let h=1,d=0;h!==e;++h)d+=i,o[h].toArray(u,d)}return u}function pn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function mn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function kc(o,e){let i=pv[e];i===void 0&&(i=new Int32Array(e),pv[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function sb(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function rb(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(pn(i,e))return;o.uniform2fv(this.addr,e),mn(i,e)}}function ob(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(pn(i,e))return;o.uniform3fv(this.addr,e),mn(i,e)}}function lb(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(pn(i,e))return;o.uniform4fv(this.addr,e),mn(i,e)}}function cb(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(pn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),mn(i,e)}else{if(pn(i,s))return;_v.set(s),o.uniformMatrix2fv(this.addr,!1,_v),mn(i,s)}}function ub(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(pn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),mn(i,e)}else{if(pn(i,s))return;gv.set(s),o.uniformMatrix3fv(this.addr,!1,gv),mn(i,s)}}function fb(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(pn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),mn(i,e)}else{if(pn(i,s))return;mv.set(s),o.uniformMatrix4fv(this.addr,!1,mv),mn(i,s)}}function hb(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function db(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(pn(i,e))return;o.uniform2iv(this.addr,e),mn(i,e)}}function pb(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(pn(i,e))return;o.uniform3iv(this.addr,e),mn(i,e)}}function mb(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(pn(i,e))return;o.uniform4iv(this.addr,e),mn(i,e)}}function gb(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function _b(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(pn(i,e))return;o.uniform2uiv(this.addr,e),mn(i,e)}}function vb(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(pn(i,e))return;o.uniform3uiv(this.addr,e),mn(i,e)}}function yb(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(pn(i,e))return;o.uniform4uiv(this.addr,e),mn(i,e)}}function Sb(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let u;this.type===o.SAMPLER_2D_SHADOW?(hv.compareFunction=Qv,u=hv):u=h0,i.setTexture2D(e||u,l)}function xb(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||p0,l)}function Mb(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||m0,l)}function Eb(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||d0,l)}function Tb(o){switch(o){case 5126:return sb;case 35664:return rb;case 35665:return ob;case 35666:return lb;case 35674:return cb;case 35675:return ub;case 35676:return fb;case 5124:case 35670:return hb;case 35667:case 35671:return db;case 35668:case 35672:return pb;case 35669:case 35673:return mb;case 5125:return gb;case 36294:return _b;case 36295:return vb;case 36296:return yb;case 35678:case 36198:case 36298:case 36306:case 35682:return Sb;case 35679:case 36299:case 36307:return xb;case 35680:case 36300:case 36308:case 36293:return Mb;case 36289:case 36303:case 36311:case 36292:return Eb}}function bb(o,e){o.uniform1fv(this.addr,e)}function Ab(o,e){const i=zr(e,this.size,2);o.uniform2fv(this.addr,i)}function Rb(o,e){const i=zr(e,this.size,3);o.uniform3fv(this.addr,i)}function Cb(o,e){const i=zr(e,this.size,4);o.uniform4fv(this.addr,i)}function wb(o,e){const i=zr(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function Db(o,e){const i=zr(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function Ub(o,e){const i=zr(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function Nb(o,e){o.uniform1iv(this.addr,e)}function Lb(o,e){o.uniform2iv(this.addr,e)}function Ob(o,e){o.uniform3iv(this.addr,e)}function Pb(o,e){o.uniform4iv(this.addr,e)}function zb(o,e){o.uniform1uiv(this.addr,e)}function Ib(o,e){o.uniform2uiv(this.addr,e)}function Bb(o,e){o.uniform3uiv(this.addr,e)}function Fb(o,e){o.uniform4uiv(this.addr,e)}function Hb(o,e,i){const s=this.cache,l=e.length,u=kc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTexture2D(e[h]||h0,u[h])}function Gb(o,e,i){const s=this.cache,l=e.length,u=kc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTexture3D(e[h]||p0,u[h])}function Vb(o,e,i){const s=this.cache,l=e.length,u=kc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTextureCube(e[h]||m0,u[h])}function kb(o,e,i){const s=this.cache,l=e.length,u=kc(i,l);pn(s,u)||(o.uniform1iv(this.addr,u),mn(s,u));for(let h=0;h!==l;++h)i.setTexture2DArray(e[h]||d0,u[h])}function Xb(o){switch(o){case 5126:return bb;case 35664:return Ab;case 35665:return Rb;case 35666:return Cb;case 35674:return wb;case 35675:return Db;case 35676:return Ub;case 5124:case 35670:return Nb;case 35667:case 35671:return Lb;case 35668:case 35672:return Ob;case 35669:case 35673:return Pb;case 5125:return zb;case 36294:return Ib;case 36295:return Bb;case 36296:return Fb;case 35678:case 36198:case 36298:case 36306:case 35682:return Hb;case 35679:case 36299:case 36307:return Gb;case 35680:case 36300:case 36308:case 36293:return Vb;case 36289:case 36303:case 36311:case 36292:return kb}}class qb{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=Tb(i.type)}}class Wb{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=Xb(i.type)}}class Yb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let u=0,h=l.length;u!==h;++u){const d=l[u];d.setValue(e,i[d.id],s)}}}const Uh=/(\w+)(\])?(\[|\.)?/g;function vv(o,e){o.seq.push(e),o.map[e.id]=e}function jb(o,e,i){const s=o.name,l=s.length;for(Uh.lastIndex=0;;){const u=Uh.exec(s),h=Uh.lastIndex;let d=u[1];const m=u[2]==="]",p=u[3];if(m&&(d=d|0),p===void 0||p==="["&&h+2===l){vv(i,p===void 0?new qb(d,o,e):new Wb(d,o,e));break}else{let y=i.map[d];y===void 0&&(y=new Yb(d),vv(i,y)),i=y}}}class Pc{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const u=e.getActiveUniform(i,l),h=e.getUniformLocation(i,u.name);jb(u,h,this)}}setValue(e,i,s,l){const u=this.map[i];u!==void 0&&u.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let u=0,h=i.length;u!==h;++u){const d=i[u],m=s[d.id];m.needsUpdate!==!1&&d.setValue(e,m.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,u=e.length;l!==u;++l){const h=e[l];h.id in i&&s.push(h)}return s}}function yv(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const Zb=37297;let Kb=0;function Qb(o,e){const i=o.split(`
`),s=[],l=Math.max(e-6,0),u=Math.min(e+6,i.length);for(let h=l;h<u;h++){const d=h+1;s.push(`${d===e?">":" "} ${d}: ${i[h]}`)}return s.join(`
`)}const Sv=new de;function Jb(o){De._getMatrix(Sv,De.workingColorSpace,o);const e=`mat3( ${Sv.elements.map(i=>i.toFixed(4))} )`;switch(De.getTransfer(o)){case zc:return[e,"LinearTransferOETF"];case Ge:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function xv(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),l=o.getShaderInfoLog(e).trim();if(s&&l==="")return"";const u=/ERROR: 0:(\d+)/.exec(l);if(u){const h=parseInt(u[1]);return i.toUpperCase()+`

`+l+`

`+Qb(o.getShaderSource(e),h)}else return l}function $b(o,e){const i=Jb(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function tA(o,e){let i;switch(e){case nx:i="Linear";break;case ix:i="Reinhard";break;case ax:i="Cineon";break;case sx:i="ACESFilmic";break;case ox:i="AgX";break;case lx:i="Neutral";break;case rx:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Rc=new nt;function eA(){De.getLuminanceCoefficients(Rc);const o=Rc.x.toFixed(4),e=Rc.y.toFixed(4),i=Rc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function nA(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bo).join(`
`)}function iA(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function aA(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const u=o.getActiveAttrib(e,l),h=u.name;let d=1;u.type===o.FLOAT_MAT2&&(d=2),u.type===o.FLOAT_MAT3&&(d=3),u.type===o.FLOAT_MAT4&&(d=4),i[h]={type:u.type,location:o.getAttribLocation(e,h),locationSize:d}}return i}function Bo(o){return o!==""}function Mv(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ev(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Md(o){return o.replace(sA,oA)}const rA=new Map;function oA(o,e){let i=pe[e];if(i===void 0){const s=rA.get(e);if(s!==void 0)i=pe[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Md(i)}const lA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tv(o){return o.replace(lA,cA)}function cA(o,e,i,s){let l="";for(let u=parseInt(e);u<parseInt(i);u++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+u+" ]").replace(/UNROLLED_LOOP_INDEX/g,u);return l}function bv(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function uA(o){let e="SHADOWMAP_TYPE_BASIC";return o.shadowMapType===Bv?e="SHADOWMAP_TYPE_PCF":o.shadowMapType===PS?e="SHADOWMAP_TYPE_PCF_SOFT":o.shadowMapType===aa&&(e="SHADOWMAP_TYPE_VSM"),e}function fA(o){let e="ENVMAP_TYPE_CUBE";if(o.envMap)switch(o.envMapMode){case wr:case Dr:e="ENVMAP_TYPE_CUBE";break;case Gc:e="ENVMAP_TYPE_CUBE_UV";break}return e}function hA(o){let e="ENVMAP_MODE_REFLECTION";if(o.envMap)switch(o.envMapMode){case Dr:e="ENVMAP_MODE_REFRACTION";break}return e}function dA(o){let e="ENVMAP_BLENDING_NONE";if(o.envMap)switch(o.combine){case Fv:e="ENVMAP_BLENDING_MULTIPLY";break;case tx:e="ENVMAP_BLENDING_MIX";break;case ex:e="ENVMAP_BLENDING_ADD";break}return e}function pA(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function mA(o,e,i,s){const l=o.getContext(),u=i.defines;let h=i.vertexShader,d=i.fragmentShader;const m=uA(i),p=fA(i),g=hA(i),y=dA(i),S=pA(i),M=nA(i),E=iA(u),A=l.createProgram();let x,v,B=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Bo).join(`
`),x.length>0&&(x+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(Bo).join(`
`),v.length>0&&(v+=`
`)):(x=[bv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+g:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bo).join(`
`),v=[bv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+p:"",i.envMap?"#define "+g:"",i.envMap?"#define "+y:"",S?"#define CUBEUV_TEXEL_WIDTH "+S.texelWidth:"",S?"#define CUBEUV_TEXEL_HEIGHT "+S.texelHeight:"",S?"#define CUBEUV_MAX_MIP "+S.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+m:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==qa?"#define TONE_MAPPING":"",i.toneMapping!==qa?pe.tonemapping_pars_fragment:"",i.toneMapping!==qa?tA("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",pe.colorspace_pars_fragment,$b("linearToOutputTexel",i.outputColorSpace),eA(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(Bo).join(`
`)),h=Md(h),h=Mv(h,i),h=Ev(h,i),d=Md(d),d=Mv(d,i),d=Ev(d,i),h=Tv(h),d=Tv(d),i.isRawShaderMaterial!==!0&&(B=`#version 300 es
`,x=[M,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,v=["#define varying in",i.glslVersion===U_?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===U_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const L=B+x+h,w=B+v+d,q=yv(l,l.VERTEX_SHADER,L),G=yv(l,l.FRAGMENT_SHADER,w);l.attachShader(A,q),l.attachShader(A,G),i.index0AttributeName!==void 0?l.bindAttribLocation(A,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(A,0,"position"),l.linkProgram(A);function O(H){if(o.debug.checkShaderErrors){const et=l.getProgramInfoLog(A).trim(),Q=l.getShaderInfoLog(q).trim(),dt=l.getShaderInfoLog(G).trim();let pt=!0,P=!0;if(l.getProgramParameter(A,l.LINK_STATUS)===!1)if(pt=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,A,q,G);else{const X=xv(l,q,"vertex"),F=xv(l,G,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(A,l.VALIDATE_STATUS)+`

Material Name: `+H.name+`
Material Type: `+H.type+`

Program Info Log: `+et+`
`+X+`
`+F)}else et!==""?console.warn("THREE.WebGLProgram: Program Info Log:",et):(Q===""||dt==="")&&(P=!1);P&&(H.diagnostics={runnable:pt,programLog:et,vertexShader:{log:Q,prefix:x},fragmentShader:{log:dt,prefix:v}})}l.deleteShader(q),l.deleteShader(G),j=new Pc(l,A),U=aA(l,A)}let j;this.getUniforms=function(){return j===void 0&&O(this),j};let U;this.getAttributes=function(){return U===void 0&&O(this),U};let C=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=l.getProgramParameter(A,Zb)),C},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(A),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=Kb++,this.cacheKey=e,this.usedTimes=1,this.program=A,this.vertexShader=q,this.fragmentShader=G,this}let gA=0;class _A{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),u=this._getShaderStage(s),h=this._getShaderCacheForMaterial(e);return h.has(l)===!1&&(h.add(l),l.usedTimes++),h.has(u)===!1&&(h.add(u),u.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new vA(e),i.set(e,s)),s}}class vA{constructor(e){this.id=gA++,this.code=e,this.usedTimes=0}}function yA(o,e,i,s,l,u,h){const d=new Nd,m=new _A,p=new Set,g=[],y=l.logarithmicDepthBuffer,S=l.vertexTextures;let M=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function A(U){return p.add(U),U===0?"uv":`uv${U}`}function x(U,C,H,et,Q){const dt=et.fog,pt=Q.geometry,P=U.isMeshStandardMaterial?et.environment:null,X=(U.isMeshStandardMaterial?i:e).get(U.envMap||P),F=X&&X.mapping===Gc?X.image.height:null,yt=E[U.type];U.precision!==null&&(M=l.getMaxPrecision(U.precision),M!==U.precision&&console.warn("THREE.WebGLProgram.getParameters:",U.precision,"not supported, using",M,"instead."));const Tt=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,N=Tt!==void 0?Tt.length:0;let at=0;pt.morphAttributes.position!==void 0&&(at=1),pt.morphAttributes.normal!==void 0&&(at=2),pt.morphAttributes.color!==void 0&&(at=3);let Et,K,ft,xt;if(yt){const Ae=Ni[yt];Et=Ae.vertexShader,K=Ae.fragmentShader}else Et=U.vertexShader,K=U.fragmentShader,m.update(U),ft=m.getVertexShaderID(U),xt=m.getFragmentShaderID(U);const Mt=o.getRenderTarget(),Vt=o.state.buffers.depth.getReversed(),Gt=Q.isInstancedMesh===!0,oe=Q.isBatchedMesh===!0,Ue=!!U.map,Dt=!!U.matcap,Zt=!!X,z=!!U.aoMap,kt=!!U.lightMap,wt=!!U.bumpMap,Ut=!!U.normalMap,bt=!!U.displacementMap,Yt=!!U.emissiveMap,Ct=!!U.metalnessMap,D=!!U.roughnessMap,T=U.anisotropy>0,$=U.clearcoat>0,lt=U.dispersion>0,gt=U.iridescence>0,_t=U.sheen>0,Kt=U.transmission>0,Ot=T&&!!U.anisotropyMap,Xt=$&&!!U.clearcoatMap,ye=$&&!!U.clearcoatNormalMap,Rt=$&&!!U.clearcoatRoughnessMap,qt=gt&&!!U.iridescenceMap,Jt=gt&&!!U.iridescenceThicknessMap,Qt=_t&&!!U.sheenColorMap,Ft=_t&&!!U.sheenRoughnessMap,ie=!!U.specularMap,ue=!!U.specularColorMap,ze=!!U.specularIntensityMap,W=Kt&&!!U.transmissionMap,Nt=Kt&&!!U.thicknessMap,ct=!!U.gradientMap,St=!!U.alphaMap,Lt=U.alphaTest>0,Pt=!!U.alphaHash,ae=!!U.extensions;let Ye=qa;U.toneMapped&&(Mt===null||Mt.isXRRenderTarget===!0)&&(Ye=o.toneMapping);const un={shaderID:yt,shaderType:U.type,shaderName:U.name,vertexShader:Et,fragmentShader:K,defines:U.defines,customVertexShaderID:ft,customFragmentShaderID:xt,isRawShaderMaterial:U.isRawShaderMaterial===!0,glslVersion:U.glslVersion,precision:M,batching:oe,batchingColor:oe&&Q._colorsTexture!==null,instancing:Gt,instancingColor:Gt&&Q.instanceColor!==null,instancingMorph:Gt&&Q.morphTexture!==null,supportsVertexTextures:S,outputColorSpace:Mt===null?o.outputColorSpace:Mt.isXRRenderTarget===!0?Mt.texture.colorSpace:Lr,alphaToCoverage:!!U.alphaToCoverage,map:Ue,matcap:Dt,envMap:Zt,envMapMode:Zt&&X.mapping,envMapCubeUVHeight:F,aoMap:z,lightMap:kt,bumpMap:wt,normalMap:Ut,displacementMap:S&&bt,emissiveMap:Yt,normalMapObjectSpace:Ut&&U.normalMapType===dx,normalMapTangentSpace:Ut&&U.normalMapType===hx,metalnessMap:Ct,roughnessMap:D,anisotropy:T,anisotropyMap:Ot,clearcoat:$,clearcoatMap:Xt,clearcoatNormalMap:ye,clearcoatRoughnessMap:Rt,dispersion:lt,iridescence:gt,iridescenceMap:qt,iridescenceThicknessMap:Jt,sheen:_t,sheenColorMap:Qt,sheenRoughnessMap:Ft,specularMap:ie,specularColorMap:ue,specularIntensityMap:ze,transmission:Kt,transmissionMap:W,thicknessMap:Nt,gradientMap:ct,opaque:U.transparent===!1&&U.blending===br&&U.alphaToCoverage===!1,alphaMap:St,alphaTest:Lt,alphaHash:Pt,combine:U.combine,mapUv:Ue&&A(U.map.channel),aoMapUv:z&&A(U.aoMap.channel),lightMapUv:kt&&A(U.lightMap.channel),bumpMapUv:wt&&A(U.bumpMap.channel),normalMapUv:Ut&&A(U.normalMap.channel),displacementMapUv:bt&&A(U.displacementMap.channel),emissiveMapUv:Yt&&A(U.emissiveMap.channel),metalnessMapUv:Ct&&A(U.metalnessMap.channel),roughnessMapUv:D&&A(U.roughnessMap.channel),anisotropyMapUv:Ot&&A(U.anisotropyMap.channel),clearcoatMapUv:Xt&&A(U.clearcoatMap.channel),clearcoatNormalMapUv:ye&&A(U.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Rt&&A(U.clearcoatRoughnessMap.channel),iridescenceMapUv:qt&&A(U.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&A(U.iridescenceThicknessMap.channel),sheenColorMapUv:Qt&&A(U.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&A(U.sheenRoughnessMap.channel),specularMapUv:ie&&A(U.specularMap.channel),specularColorMapUv:ue&&A(U.specularColorMap.channel),specularIntensityMapUv:ze&&A(U.specularIntensityMap.channel),transmissionMapUv:W&&A(U.transmissionMap.channel),thicknessMapUv:Nt&&A(U.thicknessMap.channel),alphaMapUv:St&&A(U.alphaMap.channel),vertexTangents:!!pt.attributes.tangent&&(Ut||T),vertexColors:U.vertexColors,vertexAlphas:U.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!pt.attributes.uv&&(Ue||St),fog:!!dt,useFog:U.fog===!0,fogExp2:!!dt&&dt.isFogExp2,flatShading:U.flatShading===!0,sizeAttenuation:U.sizeAttenuation===!0,logarithmicDepthBuffer:y,reverseDepthBuffer:Vt,skinning:Q.isSkinnedMesh===!0,morphTargets:pt.morphAttributes.position!==void 0,morphNormals:pt.morphAttributes.normal!==void 0,morphColors:pt.morphAttributes.color!==void 0,morphTargetsCount:N,morphTextureStride:at,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:h.numPlanes,numClipIntersection:h.numIntersection,dithering:U.dithering,shadowMapEnabled:o.shadowMap.enabled&&H.length>0,shadowMapType:o.shadowMap.type,toneMapping:Ye,decodeVideoTexture:Ue&&U.map.isVideoTexture===!0&&De.getTransfer(U.map.colorSpace)===Ge,decodeVideoTextureEmissive:Yt&&U.emissiveMap.isVideoTexture===!0&&De.getTransfer(U.emissiveMap.colorSpace)===Ge,premultipliedAlpha:U.premultipliedAlpha,doubleSided:U.side===sa,flipSided:U.side===Wn,useDepthPacking:U.depthPacking>=0,depthPacking:U.depthPacking||0,index0AttributeName:U.index0AttributeName,extensionClipCullDistance:ae&&U.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&U.extensions.multiDraw===!0||oe)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:U.customProgramCacheKey()};return un.vertexUv1s=p.has(1),un.vertexUv2s=p.has(2),un.vertexUv3s=p.has(3),p.clear(),un}function v(U){const C=[];if(U.shaderID?C.push(U.shaderID):(C.push(U.customVertexShaderID),C.push(U.customFragmentShaderID)),U.defines!==void 0)for(const H in U.defines)C.push(H),C.push(U.defines[H]);return U.isRawShaderMaterial===!1&&(B(C,U),L(C,U),C.push(o.outputColorSpace)),C.push(U.customProgramCacheKey),C.join()}function B(U,C){U.push(C.precision),U.push(C.outputColorSpace),U.push(C.envMapMode),U.push(C.envMapCubeUVHeight),U.push(C.mapUv),U.push(C.alphaMapUv),U.push(C.lightMapUv),U.push(C.aoMapUv),U.push(C.bumpMapUv),U.push(C.normalMapUv),U.push(C.displacementMapUv),U.push(C.emissiveMapUv),U.push(C.metalnessMapUv),U.push(C.roughnessMapUv),U.push(C.anisotropyMapUv),U.push(C.clearcoatMapUv),U.push(C.clearcoatNormalMapUv),U.push(C.clearcoatRoughnessMapUv),U.push(C.iridescenceMapUv),U.push(C.iridescenceThicknessMapUv),U.push(C.sheenColorMapUv),U.push(C.sheenRoughnessMapUv),U.push(C.specularMapUv),U.push(C.specularColorMapUv),U.push(C.specularIntensityMapUv),U.push(C.transmissionMapUv),U.push(C.thicknessMapUv),U.push(C.combine),U.push(C.fogExp2),U.push(C.sizeAttenuation),U.push(C.morphTargetsCount),U.push(C.morphAttributeCount),U.push(C.numDirLights),U.push(C.numPointLights),U.push(C.numSpotLights),U.push(C.numSpotLightMaps),U.push(C.numHemiLights),U.push(C.numRectAreaLights),U.push(C.numDirLightShadows),U.push(C.numPointLightShadows),U.push(C.numSpotLightShadows),U.push(C.numSpotLightShadowsWithMaps),U.push(C.numLightProbes),U.push(C.shadowMapType),U.push(C.toneMapping),U.push(C.numClippingPlanes),U.push(C.numClipIntersection),U.push(C.depthPacking)}function L(U,C){d.disableAll(),C.supportsVertexTextures&&d.enable(0),C.instancing&&d.enable(1),C.instancingColor&&d.enable(2),C.instancingMorph&&d.enable(3),C.matcap&&d.enable(4),C.envMap&&d.enable(5),C.normalMapObjectSpace&&d.enable(6),C.normalMapTangentSpace&&d.enable(7),C.clearcoat&&d.enable(8),C.iridescence&&d.enable(9),C.alphaTest&&d.enable(10),C.vertexColors&&d.enable(11),C.vertexAlphas&&d.enable(12),C.vertexUv1s&&d.enable(13),C.vertexUv2s&&d.enable(14),C.vertexUv3s&&d.enable(15),C.vertexTangents&&d.enable(16),C.anisotropy&&d.enable(17),C.alphaHash&&d.enable(18),C.batching&&d.enable(19),C.dispersion&&d.enable(20),C.batchingColor&&d.enable(21),U.push(d.mask),d.disableAll(),C.fog&&d.enable(0),C.useFog&&d.enable(1),C.flatShading&&d.enable(2),C.logarithmicDepthBuffer&&d.enable(3),C.reverseDepthBuffer&&d.enable(4),C.skinning&&d.enable(5),C.morphTargets&&d.enable(6),C.morphNormals&&d.enable(7),C.morphColors&&d.enable(8),C.premultipliedAlpha&&d.enable(9),C.shadowMapEnabled&&d.enable(10),C.doubleSided&&d.enable(11),C.flipSided&&d.enable(12),C.useDepthPacking&&d.enable(13),C.dithering&&d.enable(14),C.transmission&&d.enable(15),C.sheen&&d.enable(16),C.opaque&&d.enable(17),C.pointsUvs&&d.enable(18),C.decodeVideoTexture&&d.enable(19),C.decodeVideoTextureEmissive&&d.enable(20),C.alphaToCoverage&&d.enable(21),U.push(d.mask)}function w(U){const C=E[U.type];let H;if(C){const et=Ni[C];H=Xx.clone(et.uniforms)}else H=U.uniforms;return H}function q(U,C){let H;for(let et=0,Q=g.length;et<Q;et++){const dt=g[et];if(dt.cacheKey===C){H=dt,++H.usedTimes;break}}return H===void 0&&(H=new mA(o,C,U,u),g.push(H)),H}function G(U){if(--U.usedTimes===0){const C=g.indexOf(U);g[C]=g[g.length-1],g.pop(),U.destroy()}}function O(U){m.remove(U)}function j(){m.dispose()}return{getParameters:x,getProgramCacheKey:v,getUniforms:w,acquireProgram:q,releaseProgram:G,releaseShaderCache:O,programs:g,dispose:j}}function SA(){let o=new WeakMap;function e(h){return o.has(h)}function i(h){let d=o.get(h);return d===void 0&&(d={},o.set(h,d)),d}function s(h){o.delete(h)}function l(h,d,m){o.get(h)[d]=m}function u(){o=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:u}}function xA(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.z!==e.z?o.z-e.z:o.id-e.id}function Av(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function Rv(){const o=[];let e=0;const i=[],s=[],l=[];function u(){e=0,i.length=0,s.length=0,l.length=0}function h(y,S,M,E,A,x){let v=o[e];return v===void 0?(v={id:y.id,object:y,geometry:S,material:M,groupOrder:E,renderOrder:y.renderOrder,z:A,group:x},o[e]=v):(v.id=y.id,v.object=y,v.geometry=S,v.material=M,v.groupOrder=E,v.renderOrder=y.renderOrder,v.z=A,v.group=x),e++,v}function d(y,S,M,E,A,x){const v=h(y,S,M,E,A,x);M.transmission>0?s.push(v):M.transparent===!0?l.push(v):i.push(v)}function m(y,S,M,E,A,x){const v=h(y,S,M,E,A,x);M.transmission>0?s.unshift(v):M.transparent===!0?l.unshift(v):i.unshift(v)}function p(y,S){i.length>1&&i.sort(y||xA),s.length>1&&s.sort(S||Av),l.length>1&&l.sort(S||Av)}function g(){for(let y=e,S=o.length;y<S;y++){const M=o[y];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:i,transmissive:s,transparent:l,init:u,push:d,unshift:m,finish:g,sort:p}}function MA(){let o=new WeakMap;function e(s,l){const u=o.get(s);let h;return u===void 0?(h=new Rv,o.set(s,[h])):l>=u.length?(h=new Rv,u.push(h)):h=u[l],h}function i(){o=new WeakMap}return{get:e,dispose:i}}function EA(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new nt,color:new Le};break;case"SpotLight":i={position:new nt,direction:new nt,color:new Le,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new nt,color:new Le,distance:0,decay:0};break;case"HemisphereLight":i={direction:new nt,skyColor:new Le,groundColor:new Le};break;case"RectAreaLight":i={color:new Le,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return o[e.id]=i,i}}}function TA(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new me,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let bA=0;function AA(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function RA(o){const e=new EA,i=TA(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let p=0;p<9;p++)s.probe.push(new nt);const l=new nt,u=new Ke,h=new Ke;function d(p){let g=0,y=0,S=0;for(let U=0;U<9;U++)s.probe[U].set(0,0,0);let M=0,E=0,A=0,x=0,v=0,B=0,L=0,w=0,q=0,G=0,O=0;p.sort(AA);for(let U=0,C=p.length;U<C;U++){const H=p[U],et=H.color,Q=H.intensity,dt=H.distance,pt=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)g+=et.r*Q,y+=et.g*Q,S+=et.b*Q;else if(H.isLightProbe){for(let P=0;P<9;P++)s.probe[P].addScaledVector(H.sh.coefficients[P],Q);O++}else if(H.isDirectionalLight){const P=e.get(H);if(P.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const X=H.shadow,F=i.get(H);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,s.directionalShadow[M]=F,s.directionalShadowMap[M]=pt,s.directionalShadowMatrix[M]=H.shadow.matrix,B++}s.directional[M]=P,M++}else if(H.isSpotLight){const P=e.get(H);P.position.setFromMatrixPosition(H.matrixWorld),P.color.copy(et).multiplyScalar(Q),P.distance=dt,P.coneCos=Math.cos(H.angle),P.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),P.decay=H.decay,s.spot[A]=P;const X=H.shadow;if(H.map&&(s.spotLightMap[q]=H.map,q++,X.updateMatrices(H),H.castShadow&&G++),s.spotLightMatrix[A]=X.matrix,H.castShadow){const F=i.get(H);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,s.spotShadow[A]=F,s.spotShadowMap[A]=pt,w++}A++}else if(H.isRectAreaLight){const P=e.get(H);P.color.copy(et).multiplyScalar(Q),P.halfWidth.set(H.width*.5,0,0),P.halfHeight.set(0,H.height*.5,0),s.rectArea[x]=P,x++}else if(H.isPointLight){const P=e.get(H);if(P.color.copy(H.color).multiplyScalar(H.intensity),P.distance=H.distance,P.decay=H.decay,H.castShadow){const X=H.shadow,F=i.get(H);F.shadowIntensity=X.intensity,F.shadowBias=X.bias,F.shadowNormalBias=X.normalBias,F.shadowRadius=X.radius,F.shadowMapSize=X.mapSize,F.shadowCameraNear=X.camera.near,F.shadowCameraFar=X.camera.far,s.pointShadow[E]=F,s.pointShadowMap[E]=pt,s.pointShadowMatrix[E]=H.shadow.matrix,L++}s.point[E]=P,E++}else if(H.isHemisphereLight){const P=e.get(H);P.skyColor.copy(H.color).multiplyScalar(Q),P.groundColor.copy(H.groundColor).multiplyScalar(Q),s.hemi[v]=P,v++}}x>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=It.LTC_FLOAT_1,s.rectAreaLTC2=It.LTC_FLOAT_2):(s.rectAreaLTC1=It.LTC_HALF_1,s.rectAreaLTC2=It.LTC_HALF_2)),s.ambient[0]=g,s.ambient[1]=y,s.ambient[2]=S;const j=s.hash;(j.directionalLength!==M||j.pointLength!==E||j.spotLength!==A||j.rectAreaLength!==x||j.hemiLength!==v||j.numDirectionalShadows!==B||j.numPointShadows!==L||j.numSpotShadows!==w||j.numSpotMaps!==q||j.numLightProbes!==O)&&(s.directional.length=M,s.spot.length=A,s.rectArea.length=x,s.point.length=E,s.hemi.length=v,s.directionalShadow.length=B,s.directionalShadowMap.length=B,s.pointShadow.length=L,s.pointShadowMap.length=L,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=B,s.pointShadowMatrix.length=L,s.spotLightMatrix.length=w+q-G,s.spotLightMap.length=q,s.numSpotLightShadowsWithMaps=G,s.numLightProbes=O,j.directionalLength=M,j.pointLength=E,j.spotLength=A,j.rectAreaLength=x,j.hemiLength=v,j.numDirectionalShadows=B,j.numPointShadows=L,j.numSpotShadows=w,j.numSpotMaps=q,j.numLightProbes=O,s.version=bA++)}function m(p,g){let y=0,S=0,M=0,E=0,A=0;const x=g.matrixWorldInverse;for(let v=0,B=p.length;v<B;v++){const L=p[v];if(L.isDirectionalLight){const w=s.directional[y];w.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(x),y++}else if(L.isSpotLight){const w=s.spot[M];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(x),w.direction.setFromMatrixPosition(L.matrixWorld),l.setFromMatrixPosition(L.target.matrixWorld),w.direction.sub(l),w.direction.transformDirection(x),M++}else if(L.isRectAreaLight){const w=s.rectArea[E];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(x),h.identity(),u.copy(L.matrixWorld),u.premultiply(x),h.extractRotation(u),w.halfWidth.set(L.width*.5,0,0),w.halfHeight.set(0,L.height*.5,0),w.halfWidth.applyMatrix4(h),w.halfHeight.applyMatrix4(h),E++}else if(L.isPointLight){const w=s.point[S];w.position.setFromMatrixPosition(L.matrixWorld),w.position.applyMatrix4(x),S++}else if(L.isHemisphereLight){const w=s.hemi[A];w.direction.setFromMatrixPosition(L.matrixWorld),w.direction.transformDirection(x),A++}}}return{setup:d,setupView:m,state:s}}function Cv(o){const e=new RA(o),i=[],s=[];function l(g){p.camera=g,i.length=0,s.length=0}function u(g){i.push(g)}function h(g){s.push(g)}function d(){e.setup(i)}function m(g){e.setupView(i,g)}const p={lightsArray:i,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:p,setupLights:d,setupLightsView:m,pushLight:u,pushShadow:h}}function CA(o){let e=new WeakMap;function i(l,u=0){const h=e.get(l);let d;return h===void 0?(d=new Cv(o),e.set(l,[d])):u>=h.length?(d=new Cv(o),h.push(d)):d=h[u],d}function s(){e=new WeakMap}return{get:i,dispose:s}}const wA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,DA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function UA(o,e,i){let s=new l0;const l=new me,u=new me,h=new an,d=new nM({depthPacking:fx}),m=new iM,p={},g=i.maxTextureSize,y={[Wa]:Wn,[Wn]:Wa,[sa]:sa},S=new ha({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new me},radius:{value:4}},vertexShader:wA,fragmentShader:DA}),M=S.clone();M.defines.HORIZONTAL_PASS=1;const E=new Ai;E.setAttribute("position",new Oi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const A=new la(E,S),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bv;let v=this.type;this.render=function(G,O,j){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||G.length===0)return;const U=o.getRenderTarget(),C=o.getActiveCubeFace(),H=o.getActiveMipmapLevel(),et=o.state;et.setBlending(Xa),et.buffers.color.setClear(1,1,1,1),et.buffers.depth.setTest(!0),et.setScissorTest(!1);const Q=v!==aa&&this.type===aa,dt=v===aa&&this.type!==aa;for(let pt=0,P=G.length;pt<P;pt++){const X=G[pt],F=X.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;l.copy(F.mapSize);const yt=F.getFrameExtents();if(l.multiply(yt),u.copy(F.mapSize),(l.x>g||l.y>g)&&(l.x>g&&(u.x=Math.floor(g/yt.x),l.x=u.x*yt.x,F.mapSize.x=u.x),l.y>g&&(u.y=Math.floor(g/yt.y),l.y=u.y*yt.y,F.mapSize.y=u.y)),F.map===null||Q===!0||dt===!0){const N=this.type!==aa?{minFilter:bi,magFilter:bi}:{};F.map!==null&&F.map.dispose(),F.map=new Ts(l.x,l.y,N),F.map.texture.name=X.name+".shadowMap",F.camera.updateProjectionMatrix()}o.setRenderTarget(F.map),o.clear();const Tt=F.getViewportCount();for(let N=0;N<Tt;N++){const at=F.getViewport(N);h.set(u.x*at.x,u.y*at.y,u.x*at.z,u.y*at.w),et.viewport(h),F.updateMatrices(X,N),s=F.getFrustum(),w(O,j,F.camera,X,this.type)}F.isPointLightShadow!==!0&&this.type===aa&&B(F,j),F.needsUpdate=!1}v=this.type,x.needsUpdate=!1,o.setRenderTarget(U,C,H)};function B(G,O){const j=e.update(A);S.defines.VSM_SAMPLES!==G.blurSamples&&(S.defines.VSM_SAMPLES=G.blurSamples,M.defines.VSM_SAMPLES=G.blurSamples,S.needsUpdate=!0,M.needsUpdate=!0),G.mapPass===null&&(G.mapPass=new Ts(l.x,l.y)),S.uniforms.shadow_pass.value=G.map.texture,S.uniforms.resolution.value=G.mapSize,S.uniforms.radius.value=G.radius,o.setRenderTarget(G.mapPass),o.clear(),o.renderBufferDirect(O,null,j,S,A,null),M.uniforms.shadow_pass.value=G.mapPass.texture,M.uniforms.resolution.value=G.mapSize,M.uniforms.radius.value=G.radius,o.setRenderTarget(G.map),o.clear(),o.renderBufferDirect(O,null,j,M,A,null)}function L(G,O,j,U){let C=null;const H=j.isPointLight===!0?G.customDistanceMaterial:G.customDepthMaterial;if(H!==void 0)C=H;else if(C=j.isPointLight===!0?m:d,o.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const et=C.uuid,Q=O.uuid;let dt=p[et];dt===void 0&&(dt={},p[et]=dt);let pt=dt[Q];pt===void 0&&(pt=C.clone(),dt[Q]=pt,O.addEventListener("dispose",q)),C=pt}if(C.visible=O.visible,C.wireframe=O.wireframe,U===aa?C.side=O.shadowSide!==null?O.shadowSide:O.side:C.side=O.shadowSide!==null?O.shadowSide:y[O.side],C.alphaMap=O.alphaMap,C.alphaTest=O.alphaTest,C.map=O.map,C.clipShadows=O.clipShadows,C.clippingPlanes=O.clippingPlanes,C.clipIntersection=O.clipIntersection,C.displacementMap=O.displacementMap,C.displacementScale=O.displacementScale,C.displacementBias=O.displacementBias,C.wireframeLinewidth=O.wireframeLinewidth,C.linewidth=O.linewidth,j.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const et=o.properties.get(C);et.light=j}return C}function w(G,O,j,U,C){if(G.visible===!1)return;if(G.layers.test(O.layers)&&(G.isMesh||G.isLine||G.isPoints)&&(G.castShadow||G.receiveShadow&&C===aa)&&(!G.frustumCulled||s.intersectsObject(G))){G.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,G.matrixWorld);const Q=e.update(G),dt=G.material;if(Array.isArray(dt)){const pt=Q.groups;for(let P=0,X=pt.length;P<X;P++){const F=pt[P],yt=dt[F.materialIndex];if(yt&&yt.visible){const Tt=L(G,yt,U,C);G.onBeforeShadow(o,G,O,j,Q,Tt,F),o.renderBufferDirect(j,null,Q,Tt,G,F),G.onAfterShadow(o,G,O,j,Q,Tt,F)}}}else if(dt.visible){const pt=L(G,dt,U,C);G.onBeforeShadow(o,G,O,j,Q,pt,null),o.renderBufferDirect(j,null,Q,pt,G,null),G.onAfterShadow(o,G,O,j,Q,pt,null)}}const et=G.children;for(let Q=0,dt=et.length;Q<dt;Q++)w(et[Q],O,j,U,C)}function q(G){G.target.removeEventListener("dispose",q);for(const j in p){const U=p[j],C=G.target.uuid;C in U&&(U[C].dispose(),delete U[C])}}}const NA={[zh]:Ih,[Bh]:Gh,[Fh]:Vh,[Cr]:Hh,[Ih]:zh,[Gh]:Bh,[Vh]:Fh,[Hh]:Cr};function LA(o,e){function i(){let W=!1;const Nt=new an;let ct=null;const St=new an(0,0,0,0);return{setMask:function(Lt){ct!==Lt&&!W&&(o.colorMask(Lt,Lt,Lt,Lt),ct=Lt)},setLocked:function(Lt){W=Lt},setClear:function(Lt,Pt,ae,Ye,un){un===!0&&(Lt*=Ye,Pt*=Ye,ae*=Ye),Nt.set(Lt,Pt,ae,Ye),St.equals(Nt)===!1&&(o.clearColor(Lt,Pt,ae,Ye),St.copy(Nt))},reset:function(){W=!1,ct=null,St.set(-1,0,0,0)}}}function s(){let W=!1,Nt=!1,ct=null,St=null,Lt=null;return{setReversed:function(Pt){if(Nt!==Pt){const ae=e.get("EXT_clip_control");Nt?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT);const Ye=Lt;Lt=null,this.setClear(Ye)}Nt=Pt},getReversed:function(){return Nt},setTest:function(Pt){Pt?Mt(o.DEPTH_TEST):Vt(o.DEPTH_TEST)},setMask:function(Pt){ct!==Pt&&!W&&(o.depthMask(Pt),ct=Pt)},setFunc:function(Pt){if(Nt&&(Pt=NA[Pt]),St!==Pt){switch(Pt){case zh:o.depthFunc(o.NEVER);break;case Ih:o.depthFunc(o.ALWAYS);break;case Bh:o.depthFunc(o.LESS);break;case Cr:o.depthFunc(o.LEQUAL);break;case Fh:o.depthFunc(o.EQUAL);break;case Hh:o.depthFunc(o.GEQUAL);break;case Gh:o.depthFunc(o.GREATER);break;case Vh:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}St=Pt}},setLocked:function(Pt){W=Pt},setClear:function(Pt){Lt!==Pt&&(Nt&&(Pt=1-Pt),o.clearDepth(Pt),Lt=Pt)},reset:function(){W=!1,ct=null,St=null,Lt=null,Nt=!1}}}function l(){let W=!1,Nt=null,ct=null,St=null,Lt=null,Pt=null,ae=null,Ye=null,un=null;return{setTest:function(Ae){W||(Ae?Mt(o.STENCIL_TEST):Vt(o.STENCIL_TEST))},setMask:function(Ae){Nt!==Ae&&!W&&(o.stencilMask(Ae),Nt=Ae)},setFunc:function(Ae,yn,pi){(ct!==Ae||St!==yn||Lt!==pi)&&(o.stencilFunc(Ae,yn,pi),ct=Ae,St=yn,Lt=pi)},setOp:function(Ae,yn,pi){(Pt!==Ae||ae!==yn||Ye!==pi)&&(o.stencilOp(Ae,yn,pi),Pt=Ae,ae=yn,Ye=pi)},setLocked:function(Ae){W=Ae},setClear:function(Ae){un!==Ae&&(o.clearStencil(Ae),un=Ae)},reset:function(){W=!1,Nt=null,ct=null,St=null,Lt=null,Pt=null,ae=null,Ye=null,un=null}}}const u=new i,h=new s,d=new l,m=new WeakMap,p=new WeakMap;let g={},y={},S=new WeakMap,M=[],E=null,A=!1,x=null,v=null,B=null,L=null,w=null,q=null,G=null,O=new Le(0,0,0),j=0,U=!1,C=null,H=null,et=null,Q=null,dt=null;const pt=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,X=0;const F=o.getParameter(o.VERSION);F.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(F)[1]),P=X>=1):F.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),P=X>=2);let yt=null,Tt={};const N=o.getParameter(o.SCISSOR_BOX),at=o.getParameter(o.VIEWPORT),Et=new an().fromArray(N),K=new an().fromArray(at);function ft(W,Nt,ct,St){const Lt=new Uint8Array(4),Pt=o.createTexture();o.bindTexture(W,Pt),o.texParameteri(W,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(W,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let ae=0;ae<ct;ae++)W===o.TEXTURE_3D||W===o.TEXTURE_2D_ARRAY?o.texImage3D(Nt,0,o.RGBA,1,1,St,0,o.RGBA,o.UNSIGNED_BYTE,Lt):o.texImage2D(Nt+ae,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,Lt);return Pt}const xt={};xt[o.TEXTURE_2D]=ft(o.TEXTURE_2D,o.TEXTURE_2D,1),xt[o.TEXTURE_CUBE_MAP]=ft(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),xt[o.TEXTURE_2D_ARRAY]=ft(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),xt[o.TEXTURE_3D]=ft(o.TEXTURE_3D,o.TEXTURE_3D,1,1),u.setClear(0,0,0,1),h.setClear(1),d.setClear(0),Mt(o.DEPTH_TEST),h.setFunc(Cr),wt(!1),Ut(b_),Mt(o.CULL_FACE),z(Xa);function Mt(W){g[W]!==!0&&(o.enable(W),g[W]=!0)}function Vt(W){g[W]!==!1&&(o.disable(W),g[W]=!1)}function Gt(W,Nt){return y[W]!==Nt?(o.bindFramebuffer(W,Nt),y[W]=Nt,W===o.DRAW_FRAMEBUFFER&&(y[o.FRAMEBUFFER]=Nt),W===o.FRAMEBUFFER&&(y[o.DRAW_FRAMEBUFFER]=Nt),!0):!1}function oe(W,Nt){let ct=M,St=!1;if(W){ct=S.get(Nt),ct===void 0&&(ct=[],S.set(Nt,ct));const Lt=W.textures;if(ct.length!==Lt.length||ct[0]!==o.COLOR_ATTACHMENT0){for(let Pt=0,ae=Lt.length;Pt<ae;Pt++)ct[Pt]=o.COLOR_ATTACHMENT0+Pt;ct.length=Lt.length,St=!0}}else ct[0]!==o.BACK&&(ct[0]=o.BACK,St=!0);St&&o.drawBuffers(ct)}function Ue(W){return E!==W?(o.useProgram(W),E=W,!0):!1}const Dt={[ys]:o.FUNC_ADD,[IS]:o.FUNC_SUBTRACT,[BS]:o.FUNC_REVERSE_SUBTRACT};Dt[FS]=o.MIN,Dt[HS]=o.MAX;const Zt={[GS]:o.ZERO,[VS]:o.ONE,[kS]:o.SRC_COLOR,[Oh]:o.SRC_ALPHA,[ZS]:o.SRC_ALPHA_SATURATE,[YS]:o.DST_COLOR,[qS]:o.DST_ALPHA,[XS]:o.ONE_MINUS_SRC_COLOR,[Ph]:o.ONE_MINUS_SRC_ALPHA,[jS]:o.ONE_MINUS_DST_COLOR,[WS]:o.ONE_MINUS_DST_ALPHA,[KS]:o.CONSTANT_COLOR,[QS]:o.ONE_MINUS_CONSTANT_COLOR,[JS]:o.CONSTANT_ALPHA,[$S]:o.ONE_MINUS_CONSTANT_ALPHA};function z(W,Nt,ct,St,Lt,Pt,ae,Ye,un,Ae){if(W===Xa){A===!0&&(Vt(o.BLEND),A=!1);return}if(A===!1&&(Mt(o.BLEND),A=!0),W!==zS){if(W!==x||Ae!==U){if((v!==ys||w!==ys)&&(o.blendEquation(o.FUNC_ADD),v=ys,w=ys),Ae)switch(W){case br:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case A_:o.blendFunc(o.ONE,o.ONE);break;case R_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case C_:o.blendFuncSeparate(o.ZERO,o.SRC_COLOR,o.ZERO,o.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case br:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case A_:o.blendFunc(o.SRC_ALPHA,o.ONE);break;case R_:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case C_:o.blendFunc(o.ZERO,o.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}B=null,L=null,q=null,G=null,O.set(0,0,0),j=0,x=W,U=Ae}return}Lt=Lt||Nt,Pt=Pt||ct,ae=ae||St,(Nt!==v||Lt!==w)&&(o.blendEquationSeparate(Dt[Nt],Dt[Lt]),v=Nt,w=Lt),(ct!==B||St!==L||Pt!==q||ae!==G)&&(o.blendFuncSeparate(Zt[ct],Zt[St],Zt[Pt],Zt[ae]),B=ct,L=St,q=Pt,G=ae),(Ye.equals(O)===!1||un!==j)&&(o.blendColor(Ye.r,Ye.g,Ye.b,un),O.copy(Ye),j=un),x=W,U=!1}function kt(W,Nt){W.side===sa?Vt(o.CULL_FACE):Mt(o.CULL_FACE);let ct=W.side===Wn;Nt&&(ct=!ct),wt(ct),W.blending===br&&W.transparent===!1?z(Xa):z(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),h.setFunc(W.depthFunc),h.setTest(W.depthTest),h.setMask(W.depthWrite),u.setMask(W.colorWrite);const St=W.stencilWrite;d.setTest(St),St&&(d.setMask(W.stencilWriteMask),d.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),d.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),Yt(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?Mt(o.SAMPLE_ALPHA_TO_COVERAGE):Vt(o.SAMPLE_ALPHA_TO_COVERAGE)}function wt(W){C!==W&&(W?o.frontFace(o.CW):o.frontFace(o.CCW),C=W)}function Ut(W){W!==LS?(Mt(o.CULL_FACE),W!==H&&(W===b_?o.cullFace(o.BACK):W===OS?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Vt(o.CULL_FACE),H=W}function bt(W){W!==et&&(P&&o.lineWidth(W),et=W)}function Yt(W,Nt,ct){W?(Mt(o.POLYGON_OFFSET_FILL),(Q!==Nt||dt!==ct)&&(o.polygonOffset(Nt,ct),Q=Nt,dt=ct)):Vt(o.POLYGON_OFFSET_FILL)}function Ct(W){W?Mt(o.SCISSOR_TEST):Vt(o.SCISSOR_TEST)}function D(W){W===void 0&&(W=o.TEXTURE0+pt-1),yt!==W&&(o.activeTexture(W),yt=W)}function T(W,Nt,ct){ct===void 0&&(yt===null?ct=o.TEXTURE0+pt-1:ct=yt);let St=Tt[ct];St===void 0&&(St={type:void 0,texture:void 0},Tt[ct]=St),(St.type!==W||St.texture!==Nt)&&(yt!==ct&&(o.activeTexture(ct),yt=ct),o.bindTexture(W,Nt||xt[W]),St.type=W,St.texture=Nt)}function $(){const W=Tt[yt];W!==void 0&&W.type!==void 0&&(o.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function lt(){try{o.compressedTexImage2D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function gt(){try{o.compressedTexImage3D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function _t(){try{o.texSubImage2D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Kt(){try{o.texSubImage3D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ot(){try{o.compressedTexSubImage2D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Xt(){try{o.compressedTexSubImage3D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ye(){try{o.texStorage2D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Rt(){try{o.texStorage3D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function qt(){try{o.texImage2D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Jt(){try{o.texImage3D.apply(o,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Qt(W){Et.equals(W)===!1&&(o.scissor(W.x,W.y,W.z,W.w),Et.copy(W))}function Ft(W){K.equals(W)===!1&&(o.viewport(W.x,W.y,W.z,W.w),K.copy(W))}function ie(W,Nt){let ct=p.get(Nt);ct===void 0&&(ct=new WeakMap,p.set(Nt,ct));let St=ct.get(W);St===void 0&&(St=o.getUniformBlockIndex(Nt,W.name),ct.set(W,St))}function ue(W,Nt){const St=p.get(Nt).get(W);m.get(Nt)!==St&&(o.uniformBlockBinding(Nt,St,W.__bindingPointIndex),m.set(Nt,St))}function ze(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),h.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),g={},yt=null,Tt={},y={},S=new WeakMap,M=[],E=null,A=!1,x=null,v=null,B=null,L=null,w=null,q=null,G=null,O=new Le(0,0,0),j=0,U=!1,C=null,H=null,et=null,Q=null,dt=null,Et.set(0,0,o.canvas.width,o.canvas.height),K.set(0,0,o.canvas.width,o.canvas.height),u.reset(),h.reset(),d.reset()}return{buffers:{color:u,depth:h,stencil:d},enable:Mt,disable:Vt,bindFramebuffer:Gt,drawBuffers:oe,useProgram:Ue,setBlending:z,setMaterial:kt,setFlipSided:wt,setCullFace:Ut,setLineWidth:bt,setPolygonOffset:Yt,setScissorTest:Ct,activeTexture:D,bindTexture:T,unbindTexture:$,compressedTexImage2D:lt,compressedTexImage3D:gt,texImage2D:qt,texImage3D:Jt,updateUBOMapping:ie,uniformBlockBinding:ue,texStorage2D:ye,texStorage3D:Rt,texSubImage2D:_t,texSubImage3D:Kt,compressedTexSubImage2D:Ot,compressedTexSubImage3D:Xt,scissor:Qt,viewport:Ft,reset:ze}}function OA(o,e,i,s,l,u,h){const d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),p=new me,g=new WeakMap;let y;const S=new WeakMap;let M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(D,T){return M?new OffscreenCanvas(D,T):Bc("canvas")}function A(D,T,$){let lt=1;const gt=Ct(D);if((gt.width>$||gt.height>$)&&(lt=$/Math.max(gt.width,gt.height)),lt<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const _t=Math.floor(lt*gt.width),Kt=Math.floor(lt*gt.height);y===void 0&&(y=E(_t,Kt));const Ot=T?E(_t,Kt):y;return Ot.width=_t,Ot.height=Kt,Ot.getContext("2d").drawImage(D,0,0,_t,Kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+gt.width+"x"+gt.height+") to ("+_t+"x"+Kt+")."),Ot}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+gt.width+"x"+gt.height+")."),D;return D}function x(D){return D.generateMipmaps}function v(D){o.generateMipmap(D)}function B(D){return D.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?o.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function L(D,T,$,lt,gt=!1){if(D!==null){if(o[D]!==void 0)return o[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let _t=T;if(T===o.RED&&($===o.FLOAT&&(_t=o.R32F),$===o.HALF_FLOAT&&(_t=o.R16F),$===o.UNSIGNED_BYTE&&(_t=o.R8)),T===o.RED_INTEGER&&($===o.UNSIGNED_BYTE&&(_t=o.R8UI),$===o.UNSIGNED_SHORT&&(_t=o.R16UI),$===o.UNSIGNED_INT&&(_t=o.R32UI),$===o.BYTE&&(_t=o.R8I),$===o.SHORT&&(_t=o.R16I),$===o.INT&&(_t=o.R32I)),T===o.RG&&($===o.FLOAT&&(_t=o.RG32F),$===o.HALF_FLOAT&&(_t=o.RG16F),$===o.UNSIGNED_BYTE&&(_t=o.RG8)),T===o.RG_INTEGER&&($===o.UNSIGNED_BYTE&&(_t=o.RG8UI),$===o.UNSIGNED_SHORT&&(_t=o.RG16UI),$===o.UNSIGNED_INT&&(_t=o.RG32UI),$===o.BYTE&&(_t=o.RG8I),$===o.SHORT&&(_t=o.RG16I),$===o.INT&&(_t=o.RG32I)),T===o.RGB_INTEGER&&($===o.UNSIGNED_BYTE&&(_t=o.RGB8UI),$===o.UNSIGNED_SHORT&&(_t=o.RGB16UI),$===o.UNSIGNED_INT&&(_t=o.RGB32UI),$===o.BYTE&&(_t=o.RGB8I),$===o.SHORT&&(_t=o.RGB16I),$===o.INT&&(_t=o.RGB32I)),T===o.RGBA_INTEGER&&($===o.UNSIGNED_BYTE&&(_t=o.RGBA8UI),$===o.UNSIGNED_SHORT&&(_t=o.RGBA16UI),$===o.UNSIGNED_INT&&(_t=o.RGBA32UI),$===o.BYTE&&(_t=o.RGBA8I),$===o.SHORT&&(_t=o.RGBA16I),$===o.INT&&(_t=o.RGBA32I)),T===o.RGB&&$===o.UNSIGNED_INT_5_9_9_9_REV&&(_t=o.RGB9_E5),T===o.RGBA){const Kt=gt?zc:De.getTransfer(lt);$===o.FLOAT&&(_t=o.RGBA32F),$===o.HALF_FLOAT&&(_t=o.RGBA16F),$===o.UNSIGNED_BYTE&&(_t=Kt===Ge?o.SRGB8_ALPHA8:o.RGBA8),$===o.UNSIGNED_SHORT_4_4_4_4&&(_t=o.RGBA4),$===o.UNSIGNED_SHORT_5_5_5_1&&(_t=o.RGB5_A1)}return(_t===o.R16F||_t===o.R32F||_t===o.RG16F||_t===o.RG32F||_t===o.RGBA16F||_t===o.RGBA32F)&&e.get("EXT_color_buffer_float"),_t}function w(D,T){let $;return D?T===null||T===Es||T===Ur?$=o.DEPTH24_STENCIL8:T===ra?$=o.DEPTH32F_STENCIL8:T===Fo&&($=o.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Es||T===Ur?$=o.DEPTH_COMPONENT24:T===ra?$=o.DEPTH_COMPONENT32F:T===Fo&&($=o.DEPTH_COMPONENT16),$}function q(D,T){return x(D)===!0||D.isFramebufferTexture&&D.minFilter!==bi&&D.minFilter!==Li?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function G(D){const T=D.target;T.removeEventListener("dispose",G),j(T),T.isVideoTexture&&g.delete(T)}function O(D){const T=D.target;T.removeEventListener("dispose",O),C(T)}function j(D){const T=s.get(D);if(T.__webglInit===void 0)return;const $=D.source,lt=S.get($);if(lt){const gt=lt[T.__cacheKey];gt.usedTimes--,gt.usedTimes===0&&U(D),Object.keys(lt).length===0&&S.delete($)}s.remove(D)}function U(D){const T=s.get(D);o.deleteTexture(T.__webglTexture);const $=D.source,lt=S.get($);delete lt[T.__cacheKey],h.memory.textures--}function C(D){const T=s.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),s.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(T.__webglFramebuffer[lt]))for(let gt=0;gt<T.__webglFramebuffer[lt].length;gt++)o.deleteFramebuffer(T.__webglFramebuffer[lt][gt]);else o.deleteFramebuffer(T.__webglFramebuffer[lt]);T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer[lt])}else{if(Array.isArray(T.__webglFramebuffer))for(let lt=0;lt<T.__webglFramebuffer.length;lt++)o.deleteFramebuffer(T.__webglFramebuffer[lt]);else o.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&o.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&o.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let lt=0;lt<T.__webglColorRenderbuffer.length;lt++)T.__webglColorRenderbuffer[lt]&&o.deleteRenderbuffer(T.__webglColorRenderbuffer[lt]);T.__webglDepthRenderbuffer&&o.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const $=D.textures;for(let lt=0,gt=$.length;lt<gt;lt++){const _t=s.get($[lt]);_t.__webglTexture&&(o.deleteTexture(_t.__webglTexture),h.memory.textures--),s.remove($[lt])}s.remove(D)}let H=0;function et(){H=0}function Q(){const D=H;return D>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+l.maxTextures),H+=1,D}function dt(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function pt(D,T){const $=s.get(D);if(D.isVideoTexture&&bt(D),D.isRenderTargetTexture===!1&&D.version>0&&$.__version!==D.version){const lt=D.image;if(lt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K($,D,T);return}}i.bindTexture(o.TEXTURE_2D,$.__webglTexture,o.TEXTURE0+T)}function P(D,T){const $=s.get(D);if(D.version>0&&$.__version!==D.version){K($,D,T);return}i.bindTexture(o.TEXTURE_2D_ARRAY,$.__webglTexture,o.TEXTURE0+T)}function X(D,T){const $=s.get(D);if(D.version>0&&$.__version!==D.version){K($,D,T);return}i.bindTexture(o.TEXTURE_3D,$.__webglTexture,o.TEXTURE0+T)}function F(D,T){const $=s.get(D);if(D.version>0&&$.__version!==D.version){ft($,D,T);return}i.bindTexture(o.TEXTURE_CUBE_MAP,$.__webglTexture,o.TEXTURE0+T)}const yt={[qh]:o.REPEAT,[xs]:o.CLAMP_TO_EDGE,[Wh]:o.MIRRORED_REPEAT},Tt={[bi]:o.NEAREST,[cx]:o.NEAREST_MIPMAP_NEAREST,[nc]:o.NEAREST_MIPMAP_LINEAR,[Li]:o.LINEAR,[ih]:o.LINEAR_MIPMAP_NEAREST,[Ms]:o.LINEAR_MIPMAP_LINEAR},N={[px]:o.NEVER,[Sx]:o.ALWAYS,[mx]:o.LESS,[Qv]:o.LEQUAL,[gx]:o.EQUAL,[yx]:o.GEQUAL,[_x]:o.GREATER,[vx]:o.NOTEQUAL};function at(D,T){if(T.type===ra&&e.has("OES_texture_float_linear")===!1&&(T.magFilter===Li||T.magFilter===ih||T.magFilter===nc||T.magFilter===Ms||T.minFilter===Li||T.minFilter===ih||T.minFilter===nc||T.minFilter===Ms)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(D,o.TEXTURE_WRAP_S,yt[T.wrapS]),o.texParameteri(D,o.TEXTURE_WRAP_T,yt[T.wrapT]),(D===o.TEXTURE_3D||D===o.TEXTURE_2D_ARRAY)&&o.texParameteri(D,o.TEXTURE_WRAP_R,yt[T.wrapR]),o.texParameteri(D,o.TEXTURE_MAG_FILTER,Tt[T.magFilter]),o.texParameteri(D,o.TEXTURE_MIN_FILTER,Tt[T.minFilter]),T.compareFunction&&(o.texParameteri(D,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(D,o.TEXTURE_COMPARE_FUNC,N[T.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===bi||T.minFilter!==nc&&T.minFilter!==Ms||T.type===ra&&e.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||s.get(T).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");o.texParameterf(D,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,l.getMaxAnisotropy())),s.get(T).__currentAnisotropy=T.anisotropy}}}function Et(D,T){let $=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",G));const lt=T.source;let gt=S.get(lt);gt===void 0&&(gt={},S.set(lt,gt));const _t=dt(T);if(_t!==D.__cacheKey){gt[_t]===void 0&&(gt[_t]={texture:o.createTexture(),usedTimes:0},h.memory.textures++,$=!0),gt[_t].usedTimes++;const Kt=gt[D.__cacheKey];Kt!==void 0&&(gt[D.__cacheKey].usedTimes--,Kt.usedTimes===0&&U(T)),D.__cacheKey=_t,D.__webglTexture=gt[_t].texture}return $}function K(D,T,$){let lt=o.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(lt=o.TEXTURE_2D_ARRAY),T.isData3DTexture&&(lt=o.TEXTURE_3D);const gt=Et(D,T),_t=T.source;i.bindTexture(lt,D.__webglTexture,o.TEXTURE0+$);const Kt=s.get(_t);if(_t.version!==Kt.__version||gt===!0){i.activeTexture(o.TEXTURE0+$);const Ot=De.getPrimaries(De.workingColorSpace),Xt=T.colorSpace===ka?null:De.getPrimaries(T.colorSpace),ye=T.colorSpace===ka||Ot===Xt?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);let Rt=A(T.image,!1,l.maxTextureSize);Rt=Yt(T,Rt);const qt=u.convert(T.format,T.colorSpace),Jt=u.convert(T.type);let Qt=L(T.internalFormat,qt,Jt,T.colorSpace,T.isVideoTexture);at(lt,T);let Ft;const ie=T.mipmaps,ue=T.isVideoTexture!==!0,ze=Kt.__version===void 0||gt===!0,W=_t.dataReady,Nt=q(T,Rt);if(T.isDepthTexture)Qt=w(T.format===Nr,T.type),ze&&(ue?i.texStorage2D(o.TEXTURE_2D,1,Qt,Rt.width,Rt.height):i.texImage2D(o.TEXTURE_2D,0,Qt,Rt.width,Rt.height,0,qt,Jt,null));else if(T.isDataTexture)if(ie.length>0){ue&&ze&&i.texStorage2D(o.TEXTURE_2D,Nt,Qt,ie[0].width,ie[0].height);for(let ct=0,St=ie.length;ct<St;ct++)Ft=ie[ct],ue?W&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Ft.width,Ft.height,qt,Jt,Ft.data):i.texImage2D(o.TEXTURE_2D,ct,Qt,Ft.width,Ft.height,0,qt,Jt,Ft.data);T.generateMipmaps=!1}else ue?(ze&&i.texStorage2D(o.TEXTURE_2D,Nt,Qt,Rt.width,Rt.height),W&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Rt.width,Rt.height,qt,Jt,Rt.data)):i.texImage2D(o.TEXTURE_2D,0,Qt,Rt.width,Rt.height,0,qt,Jt,Rt.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ue&&ze&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Nt,Qt,ie[0].width,ie[0].height,Rt.depth);for(let ct=0,St=ie.length;ct<St;ct++)if(Ft=ie[ct],T.format!==Ti)if(qt!==null)if(ue){if(W)if(T.layerUpdates.size>0){const Lt=av(Ft.width,Ft.height,T.format,T.type);for(const Pt of T.layerUpdates){const ae=Ft.data.subarray(Pt*Lt/Ft.data.BYTES_PER_ELEMENT,(Pt+1)*Lt/Ft.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,Pt,Ft.width,Ft.height,1,qt,ae)}T.clearLayerUpdates()}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,0,Ft.width,Ft.height,Rt.depth,qt,Ft.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,ct,Qt,Ft.width,Ft.height,Rt.depth,0,Ft.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ue?W&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,ct,0,0,0,Ft.width,Ft.height,Rt.depth,qt,Jt,Ft.data):i.texImage3D(o.TEXTURE_2D_ARRAY,ct,Qt,Ft.width,Ft.height,Rt.depth,0,qt,Jt,Ft.data)}else{ue&&ze&&i.texStorage2D(o.TEXTURE_2D,Nt,Qt,ie[0].width,ie[0].height);for(let ct=0,St=ie.length;ct<St;ct++)Ft=ie[ct],T.format!==Ti?qt!==null?ue?W&&i.compressedTexSubImage2D(o.TEXTURE_2D,ct,0,0,Ft.width,Ft.height,qt,Ft.data):i.compressedTexImage2D(o.TEXTURE_2D,ct,Qt,Ft.width,Ft.height,0,Ft.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ue?W&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,Ft.width,Ft.height,qt,Jt,Ft.data):i.texImage2D(o.TEXTURE_2D,ct,Qt,Ft.width,Ft.height,0,qt,Jt,Ft.data)}else if(T.isDataArrayTexture)if(ue){if(ze&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Nt,Qt,Rt.width,Rt.height,Rt.depth),W)if(T.layerUpdates.size>0){const ct=av(Rt.width,Rt.height,T.format,T.type);for(const St of T.layerUpdates){const Lt=Rt.data.subarray(St*ct/Rt.data.BYTES_PER_ELEMENT,(St+1)*ct/Rt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,St,Rt.width,Rt.height,1,qt,Jt,Lt)}T.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Rt.width,Rt.height,Rt.depth,qt,Jt,Rt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Qt,Rt.width,Rt.height,Rt.depth,0,qt,Jt,Rt.data);else if(T.isData3DTexture)ue?(ze&&i.texStorage3D(o.TEXTURE_3D,Nt,Qt,Rt.width,Rt.height,Rt.depth),W&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Rt.width,Rt.height,Rt.depth,qt,Jt,Rt.data)):i.texImage3D(o.TEXTURE_3D,0,Qt,Rt.width,Rt.height,Rt.depth,0,qt,Jt,Rt.data);else if(T.isFramebufferTexture){if(ze)if(ue)i.texStorage2D(o.TEXTURE_2D,Nt,Qt,Rt.width,Rt.height);else{let ct=Rt.width,St=Rt.height;for(let Lt=0;Lt<Nt;Lt++)i.texImage2D(o.TEXTURE_2D,Lt,Qt,ct,St,0,qt,Jt,null),ct>>=1,St>>=1}}else if(ie.length>0){if(ue&&ze){const ct=Ct(ie[0]);i.texStorage2D(o.TEXTURE_2D,Nt,Qt,ct.width,ct.height)}for(let ct=0,St=ie.length;ct<St;ct++)Ft=ie[ct],ue?W&&i.texSubImage2D(o.TEXTURE_2D,ct,0,0,qt,Jt,Ft):i.texImage2D(o.TEXTURE_2D,ct,Qt,qt,Jt,Ft);T.generateMipmaps=!1}else if(ue){if(ze){const ct=Ct(Rt);i.texStorage2D(o.TEXTURE_2D,Nt,Qt,ct.width,ct.height)}W&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,qt,Jt,Rt)}else i.texImage2D(o.TEXTURE_2D,0,Qt,qt,Jt,Rt);x(T)&&v(lt),Kt.__version=_t.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function ft(D,T,$){if(T.image.length!==6)return;const lt=Et(D,T),gt=T.source;i.bindTexture(o.TEXTURE_CUBE_MAP,D.__webglTexture,o.TEXTURE0+$);const _t=s.get(gt);if(gt.version!==_t.__version||lt===!0){i.activeTexture(o.TEXTURE0+$);const Kt=De.getPrimaries(De.workingColorSpace),Ot=T.colorSpace===ka?null:De.getPrimaries(T.colorSpace),Xt=T.colorSpace===ka||Kt===Ot?o.NONE:o.BROWSER_DEFAULT_WEBGL;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,T.flipY),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),o.pixelStorei(o.UNPACK_ALIGNMENT,T.unpackAlignment),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xt);const ye=T.isCompressedTexture||T.image[0].isCompressedTexture,Rt=T.image[0]&&T.image[0].isDataTexture,qt=[];for(let St=0;St<6;St++)!ye&&!Rt?qt[St]=A(T.image[St],!0,l.maxCubemapSize):qt[St]=Rt?T.image[St].image:T.image[St],qt[St]=Yt(T,qt[St]);const Jt=qt[0],Qt=u.convert(T.format,T.colorSpace),Ft=u.convert(T.type),ie=L(T.internalFormat,Qt,Ft,T.colorSpace),ue=T.isVideoTexture!==!0,ze=_t.__version===void 0||lt===!0,W=gt.dataReady;let Nt=q(T,Jt);at(o.TEXTURE_CUBE_MAP,T);let ct;if(ye){ue&&ze&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Nt,ie,Jt.width,Jt.height);for(let St=0;St<6;St++){ct=qt[St].mipmaps;for(let Lt=0;Lt<ct.length;Lt++){const Pt=ct[Lt];T.format!==Ti?Qt!==null?ue?W&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt,0,0,Pt.width,Pt.height,Qt,Pt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt,ie,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ue?W&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt,0,0,Pt.width,Pt.height,Qt,Ft,Pt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt,ie,Pt.width,Pt.height,0,Qt,Ft,Pt.data)}}}else{if(ct=T.mipmaps,ue&&ze){ct.length>0&&Nt++;const St=Ct(qt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Nt,ie,St.width,St.height)}for(let St=0;St<6;St++)if(Rt){ue?W&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,qt[St].width,qt[St].height,Qt,Ft,qt[St].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ie,qt[St].width,qt[St].height,0,Qt,Ft,qt[St].data);for(let Lt=0;Lt<ct.length;Lt++){const ae=ct[Lt].image[St].image;ue?W&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt+1,0,0,ae.width,ae.height,Qt,Ft,ae.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt+1,ie,ae.width,ae.height,0,Qt,Ft,ae.data)}}else{ue?W&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,0,0,Qt,Ft,qt[St]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,0,ie,Qt,Ft,qt[St]);for(let Lt=0;Lt<ct.length;Lt++){const Pt=ct[Lt];ue?W&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt+1,0,0,Qt,Ft,Pt.image[St]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+St,Lt+1,ie,Qt,Ft,Pt.image[St])}}}x(T)&&v(o.TEXTURE_CUBE_MAP),_t.__version=gt.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function xt(D,T,$,lt,gt,_t){const Kt=u.convert($.format,$.colorSpace),Ot=u.convert($.type),Xt=L($.internalFormat,Kt,Ot,$.colorSpace),ye=s.get(T),Rt=s.get($);if(Rt.__renderTarget=T,!ye.__hasExternalTextures){const qt=Math.max(1,T.width>>_t),Jt=Math.max(1,T.height>>_t);gt===o.TEXTURE_3D||gt===o.TEXTURE_2D_ARRAY?i.texImage3D(gt,_t,Xt,qt,Jt,T.depth,0,Kt,Ot,null):i.texImage2D(gt,_t,Xt,qt,Jt,0,Kt,Ot,null)}i.bindFramebuffer(o.FRAMEBUFFER,D),Ut(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,lt,gt,Rt.__webglTexture,0,wt(T)):(gt===o.TEXTURE_2D||gt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&gt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,lt,gt,Rt.__webglTexture,_t),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Mt(D,T,$){if(o.bindRenderbuffer(o.RENDERBUFFER,D),T.depthBuffer){const lt=T.depthTexture,gt=lt&&lt.isDepthTexture?lt.type:null,_t=w(T.stencilBuffer,gt),Kt=T.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ot=wt(T);Ut(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,Ot,_t,T.width,T.height):$?o.renderbufferStorageMultisample(o.RENDERBUFFER,Ot,_t,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,_t,T.width,T.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Kt,o.RENDERBUFFER,D)}else{const lt=T.textures;for(let gt=0;gt<lt.length;gt++){const _t=lt[gt],Kt=u.convert(_t.format,_t.colorSpace),Ot=u.convert(_t.type),Xt=L(_t.internalFormat,Kt,Ot,_t.colorSpace),ye=wt(T);$&&Ut(T)===!1?o.renderbufferStorageMultisample(o.RENDERBUFFER,ye,Xt,T.width,T.height):Ut(T)?d.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ye,Xt,T.width,T.height):o.renderbufferStorage(o.RENDERBUFFER,Xt,T.width,T.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Vt(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(o.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const lt=s.get(T.depthTexture);lt.__renderTarget=T,(!lt.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),pt(T.depthTexture,0);const gt=lt.__webglTexture,_t=wt(T);if(T.depthTexture.format===Ar)Ut(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,gt,0,_t):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_ATTACHMENT,o.TEXTURE_2D,gt,0);else if(T.depthTexture.format===Nr)Ut(T)?d.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,gt,0,_t):o.framebufferTexture2D(o.FRAMEBUFFER,o.DEPTH_STENCIL_ATTACHMENT,o.TEXTURE_2D,gt,0);else throw new Error("Unknown depthTexture format")}function Gt(D){const T=s.get(D),$=D.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==D.depthTexture){const lt=D.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),lt){const gt=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,lt.removeEventListener("dispose",gt)};lt.addEventListener("dispose",gt),T.__depthDisposeCallback=gt}T.__boundDepthTexture=lt}if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Vt(T.__webglFramebuffer,D)}else if($){T.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer[lt]),T.__webglDepthbuffer[lt]===void 0)T.__webglDepthbuffer[lt]=o.createRenderbuffer(),Mt(T.__webglDepthbuffer[lt],D,!1);else{const gt=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,_t=T.__webglDepthbuffer[lt];o.bindRenderbuffer(o.RENDERBUFFER,_t),o.framebufferRenderbuffer(o.FRAMEBUFFER,gt,o.RENDERBUFFER,_t)}}else if(i.bindFramebuffer(o.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=o.createRenderbuffer(),Mt(T.__webglDepthbuffer,D,!1);else{const lt=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,gt=T.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,gt),o.framebufferRenderbuffer(o.FRAMEBUFFER,lt,o.RENDERBUFFER,gt)}i.bindFramebuffer(o.FRAMEBUFFER,null)}function oe(D,T,$){const lt=s.get(D);T!==void 0&&xt(lt.__webglFramebuffer,D,D.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),$!==void 0&&Gt(D)}function Ue(D){const T=D.texture,$=s.get(D),lt=s.get(T);D.addEventListener("dispose",O);const gt=D.textures,_t=D.isWebGLCubeRenderTarget===!0,Kt=gt.length>1;if(Kt||(lt.__webglTexture===void 0&&(lt.__webglTexture=o.createTexture()),lt.__version=T.version,h.memory.textures++),_t){$.__webglFramebuffer=[];for(let Ot=0;Ot<6;Ot++)if(T.mipmaps&&T.mipmaps.length>0){$.__webglFramebuffer[Ot]=[];for(let Xt=0;Xt<T.mipmaps.length;Xt++)$.__webglFramebuffer[Ot][Xt]=o.createFramebuffer()}else $.__webglFramebuffer[Ot]=o.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){$.__webglFramebuffer=[];for(let Ot=0;Ot<T.mipmaps.length;Ot++)$.__webglFramebuffer[Ot]=o.createFramebuffer()}else $.__webglFramebuffer=o.createFramebuffer();if(Kt)for(let Ot=0,Xt=gt.length;Ot<Xt;Ot++){const ye=s.get(gt[Ot]);ye.__webglTexture===void 0&&(ye.__webglTexture=o.createTexture(),h.memory.textures++)}if(D.samples>0&&Ut(D)===!1){$.__webglMultisampledFramebuffer=o.createFramebuffer(),$.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Ot=0;Ot<gt.length;Ot++){const Xt=gt[Ot];$.__webglColorRenderbuffer[Ot]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,$.__webglColorRenderbuffer[Ot]);const ye=u.convert(Xt.format,Xt.colorSpace),Rt=u.convert(Xt.type),qt=L(Xt.internalFormat,ye,Rt,Xt.colorSpace,D.isXRRenderTarget===!0),Jt=wt(D);o.renderbufferStorageMultisample(o.RENDERBUFFER,Jt,qt,D.width,D.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ot,o.RENDERBUFFER,$.__webglColorRenderbuffer[Ot])}o.bindRenderbuffer(o.RENDERBUFFER,null),D.depthBuffer&&($.__webglDepthRenderbuffer=o.createRenderbuffer(),Mt($.__webglDepthRenderbuffer,D,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(_t){i.bindTexture(o.TEXTURE_CUBE_MAP,lt.__webglTexture),at(o.TEXTURE_CUBE_MAP,T);for(let Ot=0;Ot<6;Ot++)if(T.mipmaps&&T.mipmaps.length>0)for(let Xt=0;Xt<T.mipmaps.length;Xt++)xt($.__webglFramebuffer[Ot][Xt],D,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ot,Xt);else xt($.__webglFramebuffer[Ot],D,T,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+Ot,0);x(T)&&v(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Kt){for(let Ot=0,Xt=gt.length;Ot<Xt;Ot++){const ye=gt[Ot],Rt=s.get(ye);i.bindTexture(o.TEXTURE_2D,Rt.__webglTexture),at(o.TEXTURE_2D,ye),xt($.__webglFramebuffer,D,ye,o.COLOR_ATTACHMENT0+Ot,o.TEXTURE_2D,0),x(ye)&&v(o.TEXTURE_2D)}i.unbindTexture()}else{let Ot=o.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Ot=D.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ot,lt.__webglTexture),at(Ot,T),T.mipmaps&&T.mipmaps.length>0)for(let Xt=0;Xt<T.mipmaps.length;Xt++)xt($.__webglFramebuffer[Xt],D,T,o.COLOR_ATTACHMENT0,Ot,Xt);else xt($.__webglFramebuffer,D,T,o.COLOR_ATTACHMENT0,Ot,0);x(T)&&v(Ot),i.unbindTexture()}D.depthBuffer&&Gt(D)}function Dt(D){const T=D.textures;for(let $=0,lt=T.length;$<lt;$++){const gt=T[$];if(x(gt)){const _t=B(D),Kt=s.get(gt).__webglTexture;i.bindTexture(_t,Kt),v(_t),i.unbindTexture()}}}const Zt=[],z=[];function kt(D){if(D.samples>0){if(Ut(D)===!1){const T=D.textures,$=D.width,lt=D.height;let gt=o.COLOR_BUFFER_BIT;const _t=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Kt=s.get(D),Ot=T.length>1;if(Ot)for(let Xt=0;Xt<T.length;Xt++)i.bindFramebuffer(o.FRAMEBUFFER,Kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Xt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Xt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Kt.__webglMultisampledFramebuffer),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Kt.__webglFramebuffer);for(let Xt=0;Xt<T.length;Xt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(gt|=o.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(gt|=o.STENCIL_BUFFER_BIT)),Ot){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Kt.__webglColorRenderbuffer[Xt]);const ye=s.get(T[Xt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ye,0)}o.blitFramebuffer(0,0,$,lt,0,0,$,lt,gt,o.NEAREST),m===!0&&(Zt.length=0,z.length=0,Zt.push(o.COLOR_ATTACHMENT0+Xt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(Zt.push(_t),z.push(_t),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,z)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,Zt))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),Ot)for(let Xt=0;Xt<T.length;Xt++){i.bindFramebuffer(o.FRAMEBUFFER,Kt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Xt,o.RENDERBUFFER,Kt.__webglColorRenderbuffer[Xt]);const ye=s.get(T[Xt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Kt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Xt,o.TEXTURE_2D,ye,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Kt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&m){const T=D.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[T])}}}function wt(D){return Math.min(l.maxSamples,D.samples)}function Ut(D){const T=s.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function bt(D){const T=h.render.frame;g.get(D)!==T&&(g.set(D,T),D.update())}function Yt(D,T){const $=D.colorSpace,lt=D.format,gt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||$!==Lr&&$!==ka&&(De.getTransfer($)===Ge?(lt!==Ti||gt!==ua)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),T}function Ct(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(p.width=D.naturalWidth||D.width,p.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(p.width=D.displayWidth,p.height=D.displayHeight):(p.width=D.width,p.height=D.height),p}this.allocateTextureUnit=Q,this.resetTextureUnits=et,this.setTexture2D=pt,this.setTexture2DArray=P,this.setTexture3D=X,this.setTextureCube=F,this.rebindTextures=oe,this.setupRenderTarget=Ue,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=Gt,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Ut}function PA(o,e){function i(s,l=ka){let u;const h=De.getTransfer(l);if(s===ua)return o.UNSIGNED_BYTE;if(s===Rd)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Cd)return o.UNSIGNED_SHORT_5_5_5_1;if(s===kv)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===Gv)return o.BYTE;if(s===Vv)return o.SHORT;if(s===Fo)return o.UNSIGNED_SHORT;if(s===Ad)return o.INT;if(s===Es)return o.UNSIGNED_INT;if(s===ra)return o.FLOAT;if(s===Ho)return o.HALF_FLOAT;if(s===Xv)return o.ALPHA;if(s===qv)return o.RGB;if(s===Ti)return o.RGBA;if(s===Wv)return o.LUMINANCE;if(s===Yv)return o.LUMINANCE_ALPHA;if(s===Ar)return o.DEPTH_COMPONENT;if(s===Nr)return o.DEPTH_STENCIL;if(s===jv)return o.RED;if(s===wd)return o.RED_INTEGER;if(s===Zv)return o.RG;if(s===Dd)return o.RG_INTEGER;if(s===Ud)return o.RGBA_INTEGER;if(s===wc||s===Dc||s===Uc||s===Nc)if(h===Ge)if(u=e.get("WEBGL_compressed_texture_s3tc_srgb"),u!==null){if(s===wc)return u.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Dc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Uc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Nc)return u.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(u=e.get("WEBGL_compressed_texture_s3tc"),u!==null){if(s===wc)return u.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Dc)return u.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Uc)return u.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Nc)return u.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Yh||s===jh||s===Zh||s===Kh)if(u=e.get("WEBGL_compressed_texture_pvrtc"),u!==null){if(s===Yh)return u.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===jh)return u.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Zh)return u.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Kh)return u.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Qh||s===Jh||s===$h)if(u=e.get("WEBGL_compressed_texture_etc"),u!==null){if(s===Qh||s===Jh)return h===Ge?u.COMPRESSED_SRGB8_ETC2:u.COMPRESSED_RGB8_ETC2;if(s===$h)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:u.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===td||s===ed||s===nd||s===id||s===ad||s===sd||s===rd||s===od||s===ld||s===cd||s===ud||s===fd||s===hd||s===dd)if(u=e.get("WEBGL_compressed_texture_astc"),u!==null){if(s===td)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:u.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===ed)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:u.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===nd)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:u.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===id)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:u.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ad)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:u.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===sd)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:u.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===rd)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:u.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===od)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:u.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ld)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:u.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===cd)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:u.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===ud)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:u.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===fd)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:u.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===hd)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:u.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===dd)return h===Ge?u.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:u.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Lc||s===pd||s===md)if(u=e.get("EXT_texture_compression_bptc"),u!==null){if(s===Lc)return h===Ge?u.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:u.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===pd)return u.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===md)return u.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Kv||s===gd||s===_d||s===vd)if(u=e.get("EXT_texture_compression_rgtc"),u!==null){if(s===Lc)return u.COMPRESSED_RED_RGTC1_EXT;if(s===gd)return u.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===_d)return u.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===vd)return u.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Ur?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const zA={type:"move"};class Nh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,u=null,h=null;const d=this._targetRay,m=this._grip,p=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(p&&e.hand){h=!0;for(const A of e.hand.values()){const x=i.getJointPose(A,s),v=this._getHandJoint(p,A);x!==null&&(v.matrix.fromArray(x.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=x.radius),v.visible=x!==null}const g=p.joints["index-finger-tip"],y=p.joints["thumb-tip"],S=g.position.distanceTo(y.position),M=.02,E=.005;p.inputState.pinching&&S>M+E?(p.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!p.inputState.pinching&&S<=M-E&&(p.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else m!==null&&e.gripSpace&&(u=i.getPose(e.gripSpace,s),u!==null&&(m.matrix.fromArray(u.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,u.linearVelocity?(m.hasLinearVelocity=!0,m.linearVelocity.copy(u.linearVelocity)):m.hasLinearVelocity=!1,u.angularVelocity?(m.hasAngularVelocity=!0,m.angularVelocity.copy(u.angularVelocity)):m.hasAngularVelocity=!1));d!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&u!==null&&(l=u),l!==null&&(d.matrix.fromArray(l.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,l.linearVelocity?(d.hasLinearVelocity=!0,d.linearVelocity.copy(l.linearVelocity)):d.hasLinearVelocity=!1,l.angularVelocity?(d.hasAngularVelocity=!0,d.angularVelocity.copy(l.angularVelocity)):d.hasAngularVelocity=!1,this.dispatchEvent(zA)))}return d!==null&&(d.visible=l!==null),m!==null&&(m.visible=u!==null),p!==null&&(p.visible=h!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Tc;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const IA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,BA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class FA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,s){if(this.texture===null){const l=new Yn,u=e.properties.get(l);u.__webglTexture=i.texture,(i.depthNear!==s.depthNear||i.depthFar!==s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new ha({vertexShader:IA,fragmentShader:BA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new la(new Vc(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class HA extends As{constructor(e,i){super();const s=this;let l=null,u=1,h=null,d="local-floor",m=1,p=null,g=null,y=null,S=null,M=null,E=null;const A=new FA,x=i.getContextAttributes();let v=null,B=null;const L=[],w=[],q=new me;let G=null;const O=new di;O.viewport=new an;const j=new di;j.viewport=new an;const U=[O,j],C=new sM;let H=null,et=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ft=L[K];return ft===void 0&&(ft=new Nh,L[K]=ft),ft.getTargetRaySpace()},this.getControllerGrip=function(K){let ft=L[K];return ft===void 0&&(ft=new Nh,L[K]=ft),ft.getGripSpace()},this.getHand=function(K){let ft=L[K];return ft===void 0&&(ft=new Nh,L[K]=ft),ft.getHandSpace()};function Q(K){const ft=w.indexOf(K.inputSource);if(ft===-1)return;const xt=L[ft];xt!==void 0&&(xt.update(K.inputSource,K.frame,p||h),xt.dispatchEvent({type:K.type,data:K.inputSource}))}function dt(){l.removeEventListener("select",Q),l.removeEventListener("selectstart",Q),l.removeEventListener("selectend",Q),l.removeEventListener("squeeze",Q),l.removeEventListener("squeezestart",Q),l.removeEventListener("squeezeend",Q),l.removeEventListener("end",dt),l.removeEventListener("inputsourceschange",pt);for(let K=0;K<L.length;K++){const ft=w[K];ft!==null&&(w[K]=null,L[K].disconnect(ft))}H=null,et=null,A.reset(),e.setRenderTarget(v),M=null,S=null,y=null,l=null,B=null,Et.stop(),s.isPresenting=!1,e.setPixelRatio(G),e.setSize(q.width,q.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){u=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){d=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return p||h},this.setReferenceSpace=function(K){p=K},this.getBaseLayer=function(){return S!==null?S:M},this.getBinding=function(){return y},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(v=e.getRenderTarget(),l.addEventListener("select",Q),l.addEventListener("selectstart",Q),l.addEventListener("selectend",Q),l.addEventListener("squeeze",Q),l.addEventListener("squeezestart",Q),l.addEventListener("squeezeend",Q),l.addEventListener("end",dt),l.addEventListener("inputsourceschange",pt),x.xrCompatible!==!0&&await i.makeXRCompatible(),G=e.getPixelRatio(),e.getSize(q),l.enabledFeatures!==void 0&&l.enabledFeatures.includes("layers")){let xt=null,Mt=null,Vt=null;x.depth&&(Vt=x.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,xt=x.stencil?Nr:Ar,Mt=x.stencil?Ur:Es);const Gt={colorFormat:i.RGBA8,depthFormat:Vt,scaleFactor:u};y=new XRWebGLBinding(l,i),S=y.createProjectionLayer(Gt),l.updateRenderState({layers:[S]}),e.setPixelRatio(1),e.setSize(S.textureWidth,S.textureHeight,!1),B=new Ts(S.textureWidth,S.textureHeight,{format:Ti,type:ua,depthTexture:new u0(S.textureWidth,S.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:S.ignoreDepthValues===!1})}else{const xt={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:u};M=new XRWebGLLayer(l,i,xt),l.updateRenderState({baseLayer:M}),e.setPixelRatio(1),e.setSize(M.framebufferWidth,M.framebufferHeight,!1),B=new Ts(M.framebufferWidth,M.framebufferHeight,{format:Ti,type:ua,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}B.isXRRenderTarget=!0,this.setFoveation(m),p=null,h=await l.requestReferenceSpace(d),Et.setContext(l),Et.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return A.getDepthTexture()};function pt(K){for(let ft=0;ft<K.removed.length;ft++){const xt=K.removed[ft],Mt=w.indexOf(xt);Mt>=0&&(w[Mt]=null,L[Mt].disconnect(xt))}for(let ft=0;ft<K.added.length;ft++){const xt=K.added[ft];let Mt=w.indexOf(xt);if(Mt===-1){for(let Gt=0;Gt<L.length;Gt++)if(Gt>=w.length){w.push(xt),Mt=Gt;break}else if(w[Gt]===null){w[Gt]=xt,Mt=Gt;break}if(Mt===-1)break}const Vt=L[Mt];Vt&&Vt.connect(xt)}}const P=new nt,X=new nt;function F(K,ft,xt){P.setFromMatrixPosition(ft.matrixWorld),X.setFromMatrixPosition(xt.matrixWorld);const Mt=P.distanceTo(X),Vt=ft.projectionMatrix.elements,Gt=xt.projectionMatrix.elements,oe=Vt[14]/(Vt[10]-1),Ue=Vt[14]/(Vt[10]+1),Dt=(Vt[9]+1)/Vt[5],Zt=(Vt[9]-1)/Vt[5],z=(Vt[8]-1)/Vt[0],kt=(Gt[8]+1)/Gt[0],wt=oe*z,Ut=oe*kt,bt=Mt/(-z+kt),Yt=bt*-z;if(ft.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Yt),K.translateZ(bt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),Vt[10]===-1)K.projectionMatrix.copy(ft.projectionMatrix),K.projectionMatrixInverse.copy(ft.projectionMatrixInverse);else{const Ct=oe+bt,D=Ue+bt,T=wt-Yt,$=Ut+(Mt-Yt),lt=Dt*Ue/D*Ct,gt=Zt*Ue/D*Ct;K.projectionMatrix.makePerspective(T,$,lt,gt,Ct,D),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function yt(K,ft){ft===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ft.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let ft=K.near,xt=K.far;A.texture!==null&&(A.depthNear>0&&(ft=A.depthNear),A.depthFar>0&&(xt=A.depthFar)),C.near=j.near=O.near=ft,C.far=j.far=O.far=xt,(H!==C.near||et!==C.far)&&(l.updateRenderState({depthNear:C.near,depthFar:C.far}),H=C.near,et=C.far),O.layers.mask=K.layers.mask|2,j.layers.mask=K.layers.mask|4,C.layers.mask=O.layers.mask|j.layers.mask;const Mt=K.parent,Vt=C.cameras;yt(C,Mt);for(let Gt=0;Gt<Vt.length;Gt++)yt(Vt[Gt],Mt);Vt.length===2?F(C,O,j):C.projectionMatrix.copy(O.projectionMatrix),Tt(K,C,Mt)};function Tt(K,ft,xt){xt===null?K.matrix.copy(ft.matrixWorld):(K.matrix.copy(xt.matrixWorld),K.matrix.invert(),K.matrix.multiply(ft.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ft.projectionMatrix),K.projectionMatrixInverse.copy(ft.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=yd*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(S===null&&M===null))return m},this.setFoveation=function(K){m=K,S!==null&&(S.fixedFoveation=K),M!==null&&M.fixedFoveation!==void 0&&(M.fixedFoveation=K)},this.hasDepthSensing=function(){return A.texture!==null},this.getDepthSensingMesh=function(){return A.getMesh(C)};let N=null;function at(K,ft){if(g=ft.getViewerPose(p||h),E=ft,g!==null){const xt=g.views;M!==null&&(e.setRenderTargetFramebuffer(B,M.framebuffer),e.setRenderTarget(B));let Mt=!1;xt.length!==C.cameras.length&&(C.cameras.length=0,Mt=!0);for(let Gt=0;Gt<xt.length;Gt++){const oe=xt[Gt];let Ue=null;if(M!==null)Ue=M.getViewport(oe);else{const Zt=y.getViewSubImage(S,oe);Ue=Zt.viewport,Gt===0&&(e.setRenderTargetTextures(B,Zt.colorTexture,S.ignoreDepthValues?void 0:Zt.depthStencilTexture),e.setRenderTarget(B))}let Dt=U[Gt];Dt===void 0&&(Dt=new di,Dt.layers.enable(Gt),Dt.viewport=new an,U[Gt]=Dt),Dt.matrix.fromArray(oe.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(oe.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(Ue.x,Ue.y,Ue.width,Ue.height),Gt===0&&(C.matrix.copy(Dt.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Mt===!0&&C.cameras.push(Dt)}const Vt=l.enabledFeatures;if(Vt&&Vt.includes("depth-sensing")){const Gt=y.getDepthInformation(xt[0]);Gt&&Gt.isValid&&Gt.texture&&A.init(e,Gt,l.renderState)}}for(let xt=0;xt<L.length;xt++){const Mt=w[xt],Vt=L[xt];Mt!==null&&Vt!==void 0&&Vt.update(Mt,ft,p||h)}N&&N(K,ft),ft.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:ft}),E=null}const Et=new f0;Et.setAnimationLoop(at),this.setAnimationLoop=function(K){N=K},this.dispose=function(){}}}const _s=new fa,GA=new Ke;function VA(o,e){function i(x,v){x.matrixAutoUpdate===!0&&x.updateMatrix(),v.value.copy(x.matrix)}function s(x,v){v.color.getRGB(x.fogColor.value,s0(o)),v.isFog?(x.fogNear.value=v.near,x.fogFar.value=v.far):v.isFogExp2&&(x.fogDensity.value=v.density)}function l(x,v,B,L,w){v.isMeshBasicMaterial||v.isMeshLambertMaterial?u(x,v):v.isMeshToonMaterial?(u(x,v),y(x,v)):v.isMeshPhongMaterial?(u(x,v),g(x,v)):v.isMeshStandardMaterial?(u(x,v),S(x,v),v.isMeshPhysicalMaterial&&M(x,v,w)):v.isMeshMatcapMaterial?(u(x,v),E(x,v)):v.isMeshDepthMaterial?u(x,v):v.isMeshDistanceMaterial?(u(x,v),A(x,v)):v.isMeshNormalMaterial?u(x,v):v.isLineBasicMaterial?(h(x,v),v.isLineDashedMaterial&&d(x,v)):v.isPointsMaterial?m(x,v,B,L):v.isSpriteMaterial?p(x,v):v.isShadowMaterial?(x.color.value.copy(v.color),x.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function u(x,v){x.opacity.value=v.opacity,v.color&&x.diffuse.value.copy(v.color),v.emissive&&x.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(x.map.value=v.map,i(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,i(v.alphaMap,x.alphaMapTransform)),v.bumpMap&&(x.bumpMap.value=v.bumpMap,i(v.bumpMap,x.bumpMapTransform),x.bumpScale.value=v.bumpScale,v.side===Wn&&(x.bumpScale.value*=-1)),v.normalMap&&(x.normalMap.value=v.normalMap,i(v.normalMap,x.normalMapTransform),x.normalScale.value.copy(v.normalScale),v.side===Wn&&x.normalScale.value.negate()),v.displacementMap&&(x.displacementMap.value=v.displacementMap,i(v.displacementMap,x.displacementMapTransform),x.displacementScale.value=v.displacementScale,x.displacementBias.value=v.displacementBias),v.emissiveMap&&(x.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,x.emissiveMapTransform)),v.specularMap&&(x.specularMap.value=v.specularMap,i(v.specularMap,x.specularMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest);const B=e.get(v),L=B.envMap,w=B.envMapRotation;L&&(x.envMap.value=L,_s.copy(w),_s.x*=-1,_s.y*=-1,_s.z*=-1,L.isCubeTexture&&L.isRenderTargetTexture===!1&&(_s.y*=-1,_s.z*=-1),x.envMapRotation.value.setFromMatrix4(GA.makeRotationFromEuler(_s)),x.flipEnvMap.value=L.isCubeTexture&&L.isRenderTargetTexture===!1?-1:1,x.reflectivity.value=v.reflectivity,x.ior.value=v.ior,x.refractionRatio.value=v.refractionRatio),v.lightMap&&(x.lightMap.value=v.lightMap,x.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,x.lightMapTransform)),v.aoMap&&(x.aoMap.value=v.aoMap,x.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,x.aoMapTransform))}function h(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,v.map&&(x.map.value=v.map,i(v.map,x.mapTransform))}function d(x,v){x.dashSize.value=v.dashSize,x.totalSize.value=v.dashSize+v.gapSize,x.scale.value=v.scale}function m(x,v,B,L){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.size.value=v.size*B,x.scale.value=L*.5,v.map&&(x.map.value=v.map,i(v.map,x.uvTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,i(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function p(x,v){x.diffuse.value.copy(v.color),x.opacity.value=v.opacity,x.rotation.value=v.rotation,v.map&&(x.map.value=v.map,i(v.map,x.mapTransform)),v.alphaMap&&(x.alphaMap.value=v.alphaMap,i(v.alphaMap,x.alphaMapTransform)),v.alphaTest>0&&(x.alphaTest.value=v.alphaTest)}function g(x,v){x.specular.value.copy(v.specular),x.shininess.value=Math.max(v.shininess,1e-4)}function y(x,v){v.gradientMap&&(x.gradientMap.value=v.gradientMap)}function S(x,v){x.metalness.value=v.metalness,v.metalnessMap&&(x.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,x.metalnessMapTransform)),x.roughness.value=v.roughness,v.roughnessMap&&(x.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,x.roughnessMapTransform)),v.envMap&&(x.envMapIntensity.value=v.envMapIntensity)}function M(x,v,B){x.ior.value=v.ior,v.sheen>0&&(x.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),x.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(x.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,x.sheenColorMapTransform)),v.sheenRoughnessMap&&(x.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,x.sheenRoughnessMapTransform))),v.clearcoat>0&&(x.clearcoat.value=v.clearcoat,x.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(x.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,x.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,x.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(x.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,x.clearcoatNormalMapTransform),x.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Wn&&x.clearcoatNormalScale.value.negate())),v.dispersion>0&&(x.dispersion.value=v.dispersion),v.iridescence>0&&(x.iridescence.value=v.iridescence,x.iridescenceIOR.value=v.iridescenceIOR,x.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],x.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(x.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,x.iridescenceMapTransform)),v.iridescenceThicknessMap&&(x.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,x.iridescenceThicknessMapTransform))),v.transmission>0&&(x.transmission.value=v.transmission,x.transmissionSamplerMap.value=B.texture,x.transmissionSamplerSize.value.set(B.width,B.height),v.transmissionMap&&(x.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,x.transmissionMapTransform)),x.thickness.value=v.thickness,v.thicknessMap&&(x.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,x.thicknessMapTransform)),x.attenuationDistance.value=v.attenuationDistance,x.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(x.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(x.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,x.anisotropyMapTransform))),x.specularIntensity.value=v.specularIntensity,x.specularColor.value.copy(v.specularColor),v.specularColorMap&&(x.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,x.specularColorMapTransform)),v.specularIntensityMap&&(x.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,x.specularIntensityMapTransform))}function E(x,v){v.matcap&&(x.matcap.value=v.matcap)}function A(x,v){const B=e.get(v).light;x.referencePosition.value.setFromMatrixPosition(B.matrixWorld),x.nearDistance.value=B.shadow.camera.near,x.farDistance.value=B.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function kA(o,e,i,s){let l={},u={},h=[];const d=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function m(B,L){const w=L.program;s.uniformBlockBinding(B,w)}function p(B,L){let w=l[B.id];w===void 0&&(E(B),w=g(B),l[B.id]=w,B.addEventListener("dispose",x));const q=L.program;s.updateUBOMapping(B,q);const G=e.render.frame;u[B.id]!==G&&(S(B),u[B.id]=G)}function g(B){const L=y();B.__bindingPointIndex=L;const w=o.createBuffer(),q=B.__size,G=B.usage;return o.bindBuffer(o.UNIFORM_BUFFER,w),o.bufferData(o.UNIFORM_BUFFER,q,G),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,L,w),w}function y(){for(let B=0;B<d;B++)if(h.indexOf(B)===-1)return h.push(B),B;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function S(B){const L=l[B.id],w=B.uniforms,q=B.__cache;o.bindBuffer(o.UNIFORM_BUFFER,L);for(let G=0,O=w.length;G<O;G++){const j=Array.isArray(w[G])?w[G]:[w[G]];for(let U=0,C=j.length;U<C;U++){const H=j[U];if(M(H,G,U,q)===!0){const et=H.__offset,Q=Array.isArray(H.value)?H.value:[H.value];let dt=0;for(let pt=0;pt<Q.length;pt++){const P=Q[pt],X=A(P);typeof P=="number"||typeof P=="boolean"?(H.__data[0]=P,o.bufferSubData(o.UNIFORM_BUFFER,et+dt,H.__data)):P.isMatrix3?(H.__data[0]=P.elements[0],H.__data[1]=P.elements[1],H.__data[2]=P.elements[2],H.__data[3]=0,H.__data[4]=P.elements[3],H.__data[5]=P.elements[4],H.__data[6]=P.elements[5],H.__data[7]=0,H.__data[8]=P.elements[6],H.__data[9]=P.elements[7],H.__data[10]=P.elements[8],H.__data[11]=0):(P.toArray(H.__data,dt),dt+=X.storage/Float32Array.BYTES_PER_ELEMENT)}o.bufferSubData(o.UNIFORM_BUFFER,et,H.__data)}}}o.bindBuffer(o.UNIFORM_BUFFER,null)}function M(B,L,w,q){const G=B.value,O=L+"_"+w;if(q[O]===void 0)return typeof G=="number"||typeof G=="boolean"?q[O]=G:q[O]=G.clone(),!0;{const j=q[O];if(typeof G=="number"||typeof G=="boolean"){if(j!==G)return q[O]=G,!0}else if(j.equals(G)===!1)return j.copy(G),!0}return!1}function E(B){const L=B.uniforms;let w=0;const q=16;for(let O=0,j=L.length;O<j;O++){const U=Array.isArray(L[O])?L[O]:[L[O]];for(let C=0,H=U.length;C<H;C++){const et=U[C],Q=Array.isArray(et.value)?et.value:[et.value];for(let dt=0,pt=Q.length;dt<pt;dt++){const P=Q[dt],X=A(P),F=w%q,yt=F%X.boundary,Tt=F+yt;w+=yt,Tt!==0&&q-Tt<X.storage&&(w+=q-Tt),et.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),et.__offset=w,w+=X.storage}}}const G=w%q;return G>0&&(w+=q-G),B.__size=w,B.__cache={},this}function A(B){const L={boundary:0,storage:0};return typeof B=="number"||typeof B=="boolean"?(L.boundary=4,L.storage=4):B.isVector2?(L.boundary=8,L.storage=8):B.isVector3||B.isColor?(L.boundary=16,L.storage=12):B.isVector4?(L.boundary=16,L.storage=16):B.isMatrix3?(L.boundary=48,L.storage=48):B.isMatrix4?(L.boundary=64,L.storage=64):B.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",B),L}function x(B){const L=B.target;L.removeEventListener("dispose",x);const w=h.indexOf(L.__bindingPointIndex);h.splice(w,1),o.deleteBuffer(l[L.id]),delete l[L.id],delete u[L.id]}function v(){for(const B in l)o.deleteBuffer(l[B]);h=[],l={},u={}}return{bind:m,update:p,dispose:v}}class XA{constructor(e={}){const{canvas:i=Ex(),context:s=null,depth:l=!0,stencil:u=!1,alpha:h=!1,antialias:d=!1,premultipliedAlpha:m=!0,preserveDrawingBuffer:p=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:y=!1,reverseDepthBuffer:S=!1}=e;this.isWebGLRenderer=!0;let M;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=s.getContextAttributes().alpha}else M=h;const E=new Uint32Array(4),A=new Int32Array(4);let x=null,v=null;const B=[],L=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hi,this.toneMapping=qa,this.toneMappingExposure=1;const w=this;let q=!1,G=0,O=0,j=null,U=-1,C=null;const H=new an,et=new an;let Q=null;const dt=new Le(0);let pt=0,P=i.width,X=i.height,F=1,yt=null,Tt=null;const N=new an(0,0,P,X),at=new an(0,0,P,X);let Et=!1;const K=new l0;let ft=!1,xt=!1;this.transmissionResolutionScale=1;const Mt=new Ke,Vt=new Ke,Gt=new nt,oe=new an,Ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Dt=!1;function Zt(){return j===null?F:1}let z=s;function kt(R,Y){return i.getContext(R,Y)}try{const R={alpha:!0,depth:l,stencil:u,antialias:d,premultipliedAlpha:m,preserveDrawingBuffer:p,powerPreference:g,failIfMajorPerformanceCaveat:y};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${bd}`),i.addEventListener("webglcontextlost",St,!1),i.addEventListener("webglcontextrestored",Lt,!1),i.addEventListener("webglcontextcreationerror",Pt,!1),z===null){const Y="webgl2";if(z=kt(Y,R),z===null)throw kt(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let wt,Ut,bt,Yt,Ct,D,T,$,lt,gt,_t,Kt,Ot,Xt,ye,Rt,qt,Jt,Qt,Ft,ie,ue,ze,W;function Nt(){wt=new $T(z),wt.init(),ue=new PA(z,wt),Ut=new YT(z,wt,e,ue),bt=new LA(z,wt),Ut.reverseDepthBuffer&&S&&bt.buffers.depth.setReversed(!0),Yt=new nb(z),Ct=new SA,D=new OA(z,wt,bt,Ct,Ut,ue,Yt),T=new ZT(w),$=new JT(w),lt=new cM(z),ze=new qT(z,lt),gt=new tb(z,lt,Yt,ze),_t=new ab(z,gt,lt,Yt),Qt=new ib(z,Ut,D),Rt=new jT(Ct),Kt=new yA(w,T,$,wt,Ut,ze,Rt),Ot=new VA(w,Ct),Xt=new MA,ye=new CA(wt),Jt=new XT(w,T,$,bt,_t,M,m),qt=new UA(w,_t,Ut),W=new kA(z,Yt,Ut,bt),Ft=new WT(z,wt,Yt),ie=new eb(z,wt,Yt),Yt.programs=Kt.programs,w.capabilities=Ut,w.extensions=wt,w.properties=Ct,w.renderLists=Xt,w.shadowMap=qt,w.state=bt,w.info=Yt}Nt();const ct=new HA(w,z);this.xr=ct,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const R=wt.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=wt.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(R){R!==void 0&&(F=R,this.setSize(P,X,!1))},this.getSize=function(R){return R.set(P,X)},this.setSize=function(R,Y,st=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=R,X=Y,i.width=Math.floor(R*F),i.height=Math.floor(Y*F),st===!0&&(i.style.width=R+"px",i.style.height=Y+"px"),this.setViewport(0,0,R,Y)},this.getDrawingBufferSize=function(R){return R.set(P*F,X*F).floor()},this.setDrawingBufferSize=function(R,Y,st){P=R,X=Y,F=st,i.width=Math.floor(R*st),i.height=Math.floor(Y*st),this.setViewport(0,0,R,Y)},this.getCurrentViewport=function(R){return R.copy(H)},this.getViewport=function(R){return R.copy(N)},this.setViewport=function(R,Y,st,rt){R.isVector4?N.set(R.x,R.y,R.z,R.w):N.set(R,Y,st,rt),bt.viewport(H.copy(N).multiplyScalar(F).round())},this.getScissor=function(R){return R.copy(at)},this.setScissor=function(R,Y,st,rt){R.isVector4?at.set(R.x,R.y,R.z,R.w):at.set(R,Y,st,rt),bt.scissor(et.copy(at).multiplyScalar(F).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(R){bt.setScissorTest(Et=R)},this.setOpaqueSort=function(R){yt=R},this.setTransparentSort=function(R){Tt=R},this.getClearColor=function(R){return R.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor.apply(Jt,arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha.apply(Jt,arguments)},this.clear=function(R=!0,Y=!0,st=!0){let rt=0;if(R){let k=!1;if(j!==null){const At=j.texture.format;k=At===Ud||At===Dd||At===wd}if(k){const At=j.texture.type,zt=At===ua||At===Es||At===Fo||At===Ur||At===Rd||At===Cd,Bt=Jt.getClearColor(),Ht=Jt.getClearAlpha(),se=Bt.r,re=Bt.g,$t=Bt.b;zt?(E[0]=se,E[1]=re,E[2]=$t,E[3]=Ht,z.clearBufferuiv(z.COLOR,0,E)):(A[0]=se,A[1]=re,A[2]=$t,A[3]=Ht,z.clearBufferiv(z.COLOR,0,A))}else rt|=z.COLOR_BUFFER_BIT}Y&&(rt|=z.DEPTH_BUFFER_BIT),st&&(rt|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(rt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",St,!1),i.removeEventListener("webglcontextrestored",Lt,!1),i.removeEventListener("webglcontextcreationerror",Pt,!1),Jt.dispose(),Xt.dispose(),ye.dispose(),Ct.dispose(),T.dispose(),$.dispose(),_t.dispose(),ze.dispose(),W.dispose(),Kt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Ir),ct.removeEventListener("sessionend",Br),Ri.stop()};function St(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),q=!0}function Lt(){console.log("THREE.WebGLRenderer: Context Restored."),q=!1;const R=Yt.autoReset,Y=qt.enabled,st=qt.autoUpdate,rt=qt.needsUpdate,k=qt.type;Nt(),Yt.autoReset=R,qt.enabled=Y,qt.autoUpdate=st,qt.needsUpdate=rt,qt.type=k}function Pt(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function ae(R){const Y=R.target;Y.removeEventListener("dispose",ae),Ye(Y)}function Ye(R){un(R),Ct.remove(R)}function un(R){const Y=Ct.get(R).programs;Y!==void 0&&(Y.forEach(function(st){Kt.releaseProgram(st)}),R.isShaderMaterial&&Kt.releaseShaderCache(R))}this.renderBufferDirect=function(R,Y,st,rt,k,At){Y===null&&(Y=Ue);const zt=k.isMesh&&k.matrixWorld.determinant()<0,Bt=Hr(R,Y,st,rt,k);bt.setMaterial(rt,zt);let Ht=st.index,se=1;if(rt.wireframe===!0){if(Ht=gt.getWireframeAttribute(st),Ht===void 0)return;se=2}const re=st.drawRange,$t=st.attributes.position;let Me=re.start*se,Ee=(re.start+re.count)*se;At!==null&&(Me=Math.max(Me,At.start*se),Ee=Math.min(Ee,(At.start+At.count)*se)),Ht!==null?(Me=Math.max(Me,0),Ee=Math.min(Ee,Ht.count)):$t!=null&&(Me=Math.max(Me,0),Ee=Math.min(Ee,$t.count));const Xe=Ee-Me;if(Xe<0||Xe===1/0)return;ze.setup(k,rt,Bt,st,Ht);let Re,le=Ft;if(Ht!==null&&(Re=lt.get(Ht),le=ie,le.setIndex(Re)),k.isMesh)rt.wireframe===!0?(bt.setLineWidth(rt.wireframeLinewidth*Zt()),le.setMode(z.LINES)):le.setMode(z.TRIANGLES);else if(k.isLine){let ee=rt.linewidth;ee===void 0&&(ee=1),bt.setLineWidth(ee*Zt()),k.isLineSegments?le.setMode(z.LINES):k.isLineLoop?le.setMode(z.LINE_LOOP):le.setMode(z.LINE_STRIP)}else k.isPoints?le.setMode(z.POINTS):k.isSprite&&le.setMode(z.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)le.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(wt.get("WEBGL_multi_draw"))le.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const ee=k._multiDrawStarts,fn=k._multiDrawCounts,be=k._multiDrawCount,zn=Ht?lt.get(Ht).bytesPerElement:1,gi=Ct.get(rt).currentProgram.getUniforms();for(let Dn=0;Dn<be;Dn++)gi.setValue(z,"_gl_DrawID",Dn),le.render(ee[Dn]/zn,fn[Dn])}else if(k.isInstancedMesh)le.renderInstances(Me,Xe,k.count);else if(st.isInstancedBufferGeometry){const ee=st._maxInstanceCount!==void 0?st._maxInstanceCount:1/0,fn=Math.min(st.instanceCount,ee);le.renderInstances(Me,Xe,fn)}else le.render(Me,Xe)};function Ae(R,Y,st){R.transparent===!0&&R.side===sa&&R.forceSinglePass===!1?(R.side=Wn,R.needsUpdate=!0,Qe(R,Y,st),R.side=Wa,R.needsUpdate=!0,Qe(R,Y,st),R.side=sa):Qe(R,Y,st)}this.compile=function(R,Y,st=null){st===null&&(st=R),v=ye.get(st),v.init(Y),L.push(v),st.traverseVisible(function(k){k.isLight&&k.layers.test(Y.layers)&&(v.pushLight(k),k.castShadow&&v.pushShadow(k))}),R!==st&&R.traverseVisible(function(k){k.isLight&&k.layers.test(Y.layers)&&(v.pushLight(k),k.castShadow&&v.pushShadow(k))}),v.setupLights();const rt=new Set;return R.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const At=k.material;if(At)if(Array.isArray(At))for(let zt=0;zt<At.length;zt++){const Bt=At[zt];Ae(Bt,st,k),rt.add(Bt)}else Ae(At,st,k),rt.add(At)}),L.pop(),v=null,rt},this.compileAsync=function(R,Y,st=null){const rt=this.compile(R,Y,st);return new Promise(k=>{function At(){if(rt.forEach(function(zt){Ct.get(zt).currentProgram.isReady()&&rt.delete(zt)}),rt.size===0){k(R);return}setTimeout(At,10)}wt.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let yn=null;function pi(R){yn&&yn(R)}function Ir(){Ri.stop()}function Br(){Ri.start()}const Ri=new f0;Ri.setAnimationLoop(pi),typeof self<"u"&&Ri.setContext(self),this.setAnimationLoop=function(R){yn=R,ct.setAnimationLoop(R),R===null?Ri.stop():Ri.start()},ct.addEventListener("sessionstart",Ir),ct.addEventListener("sessionend",Br),this.render=function(R,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(Y),Y=ct.getCamera()),R.isScene===!0&&R.onBeforeRender(w,R,Y,j),v=ye.get(R,L.length),v.init(Y),L.push(v),Vt.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),K.setFromProjectionMatrix(Vt),xt=this.localClippingEnabled,ft=Rt.init(this.clippingPlanes,xt),x=Xt.get(R,B.length),x.init(),B.push(x),ct.enabled===!0&&ct.isPresenting===!0){const At=w.xr.getDepthSensingMesh();At!==null&&Ya(At,Y,-1/0,w.sortObjects)}Ya(R,Y,0,w.sortObjects),x.finish(),w.sortObjects===!0&&x.sort(yt,Tt),Dt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Dt&&Jt.addToRenderList(x,R),this.info.render.frame++,ft===!0&&Rt.beginShadows();const st=v.state.shadowsArray;qt.render(st,R,Y),ft===!0&&Rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const rt=x.opaque,k=x.transmissive;if(v.setupLights(),Y.isArrayCamera){const At=Y.cameras;if(k.length>0)for(let zt=0,Bt=At.length;zt<Bt;zt++){const Ht=At[zt];Fr(rt,k,R,Ht)}Dt&&Jt.render(R);for(let zt=0,Bt=At.length;zt<Bt;zt++){const Ht=At[zt];Rs(x,R,Ht,Ht.viewport)}}else k.length>0&&Fr(rt,k,R,Y),Dt&&Jt.render(R),Rs(x,R,Y);j!==null&&O===0&&(D.updateMultisampleRenderTarget(j),D.updateRenderTargetMipmap(j)),R.isScene===!0&&R.onAfterRender(w,R,Y),ze.resetDefaultState(),U=-1,C=null,L.pop(),L.length>0?(v=L[L.length-1],ft===!0&&Rt.setGlobalState(w.clippingPlanes,v.state.camera)):v=null,B.pop(),B.length>0?x=B[B.length-1]:x=null};function Ya(R,Y,st,rt){if(R.visible===!1)return;if(R.layers.test(Y.layers)){if(R.isGroup)st=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Y);else if(R.isLight)v.pushLight(R),R.castShadow&&v.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||K.intersectsSprite(R)){rt&&oe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Vt);const zt=_t.update(R),Bt=R.material;Bt.visible&&x.push(R,zt,Bt,st,oe.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||K.intersectsObject(R))){const zt=_t.update(R),Bt=R.material;if(rt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),oe.copy(R.boundingSphere.center)):(zt.boundingSphere===null&&zt.computeBoundingSphere(),oe.copy(zt.boundingSphere.center)),oe.applyMatrix4(R.matrixWorld).applyMatrix4(Vt)),Array.isArray(Bt)){const Ht=zt.groups;for(let se=0,re=Ht.length;se<re;se++){const $t=Ht[se],Me=Bt[$t.materialIndex];Me&&Me.visible&&x.push(R,zt,Me,st,oe.z,$t)}}else Bt.visible&&x.push(R,zt,Bt,st,oe.z,null)}}const At=R.children;for(let zt=0,Bt=At.length;zt<Bt;zt++)Ya(At[zt],Y,st,rt)}function Rs(R,Y,st,rt){const k=R.opaque,At=R.transmissive,zt=R.transparent;v.setupLightsView(st),ft===!0&&Rt.setGlobalState(w.clippingPlanes,st),rt&&bt.viewport(H.copy(rt)),k.length>0&&ja(k,Y,st),At.length>0&&ja(At,Y,st),zt.length>0&&ja(zt,Y,st),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function Fr(R,Y,st,rt){if((st.isScene===!0?st.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[rt.id]===void 0&&(v.state.transmissionRenderTarget[rt.id]=new Ts(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float")?Ho:ua,minFilter:Ms,samples:4,stencilBuffer:u,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:De.workingColorSpace}));const At=v.state.transmissionRenderTarget[rt.id],zt=rt.viewport||H;At.setSize(zt.z*w.transmissionResolutionScale,zt.w*w.transmissionResolutionScale);const Bt=w.getRenderTarget();w.setRenderTarget(At),w.getClearColor(dt),pt=w.getClearAlpha(),pt<1&&w.setClearColor(16777215,.5),w.clear(),Dt&&Jt.render(st);const Ht=w.toneMapping;w.toneMapping=qa;const se=rt.viewport;if(rt.viewport!==void 0&&(rt.viewport=void 0),v.setupLightsView(rt),ft===!0&&Rt.setGlobalState(w.clippingPlanes,rt),ja(R,st,rt),D.updateMultisampleRenderTarget(At),D.updateRenderTargetMipmap(At),wt.has("WEBGL_multisampled_render_to_texture")===!1){let re=!1;for(let $t=0,Me=Y.length;$t<Me;$t++){const Ee=Y[$t],Xe=Ee.object,Re=Ee.geometry,le=Ee.material,ee=Ee.group;if(le.side===sa&&Xe.layers.test(rt.layers)){const fn=le.side;le.side=Wn,le.needsUpdate=!0,mi(Xe,st,rt,Re,le,ee),le.side=fn,le.needsUpdate=!0,re=!0}}re===!0&&(D.updateMultisampleRenderTarget(At),D.updateRenderTargetMipmap(At))}w.setRenderTarget(Bt),w.setClearColor(dt,pt),se!==void 0&&(rt.viewport=se),w.toneMapping=Ht}function ja(R,Y,st){const rt=Y.isScene===!0?Y.overrideMaterial:null;for(let k=0,At=R.length;k<At;k++){const zt=R[k],Bt=zt.object,Ht=zt.geometry,se=rt===null?zt.material:rt,re=zt.group;Bt.layers.test(st.layers)&&mi(Bt,Y,st,Ht,se,re)}}function mi(R,Y,st,rt,k,At){R.onBeforeRender(w,Y,st,rt,k,At),R.modelViewMatrix.multiplyMatrices(st.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),k.onBeforeRender(w,Y,st,rt,R,At),k.transparent===!0&&k.side===sa&&k.forceSinglePass===!1?(k.side=Wn,k.needsUpdate=!0,w.renderBufferDirect(st,Y,rt,k,R,At),k.side=Wa,k.needsUpdate=!0,w.renderBufferDirect(st,Y,rt,k,R,At),k.side=sa):w.renderBufferDirect(st,Y,rt,k,R,At),R.onAfterRender(w,Y,st,rt,k,At)}function Qe(R,Y,st){Y.isScene!==!0&&(Y=Ue);const rt=Ct.get(R),k=v.state.lights,At=v.state.shadowsArray,zt=k.state.version,Bt=Kt.getParameters(R,k.state,At,Y,st),Ht=Kt.getProgramCacheKey(Bt);let se=rt.programs;rt.environment=R.isMeshStandardMaterial?Y.environment:null,rt.fog=Y.fog,rt.envMap=(R.isMeshStandardMaterial?$:T).get(R.envMap||rt.environment),rt.envMapRotation=rt.environment!==null&&R.envMap===null?Y.environmentRotation:R.envMapRotation,se===void 0&&(R.addEventListener("dispose",ae),se=new Map,rt.programs=se);let re=se.get(Ht);if(re!==void 0){if(rt.currentProgram===re&&rt.lightsStateVersion===zt)return Pi(R,Bt),re}else Bt.uniforms=Kt.getUniforms(R),R.onBeforeCompile(Bt,w),re=Kt.acquireProgram(Bt,Ht),se.set(Ht,re),rt.uniforms=Bt.uniforms;const $t=rt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&($t.clippingPlanes=Rt.uniform),Pi(R,Bt),rt.needsLights=qc(R),rt.lightsStateVersion=zt,rt.needsLights&&($t.ambientLightColor.value=k.state.ambient,$t.lightProbe.value=k.state.probe,$t.directionalLights.value=k.state.directional,$t.directionalLightShadows.value=k.state.directionalShadow,$t.spotLights.value=k.state.spot,$t.spotLightShadows.value=k.state.spotShadow,$t.rectAreaLights.value=k.state.rectArea,$t.ltc_1.value=k.state.rectAreaLTC1,$t.ltc_2.value=k.state.rectAreaLTC2,$t.pointLights.value=k.state.point,$t.pointLightShadows.value=k.state.pointShadow,$t.hemisphereLights.value=k.state.hemi,$t.directionalShadowMap.value=k.state.directionalShadowMap,$t.directionalShadowMatrix.value=k.state.directionalShadowMatrix,$t.spotShadowMap.value=k.state.spotShadowMap,$t.spotLightMatrix.value=k.state.spotLightMatrix,$t.spotLightMap.value=k.state.spotLightMap,$t.pointShadowMap.value=k.state.pointShadowMap,$t.pointShadowMatrix.value=k.state.pointShadowMatrix),rt.currentProgram=re,rt.uniformsList=null,re}function Sn(R){if(R.uniformsList===null){const Y=R.currentProgram.getUniforms();R.uniformsList=Pc.seqWithValue(Y.seq,R.uniforms)}return R.uniformsList}function Pi(R,Y){const st=Ct.get(R);st.outputColorSpace=Y.outputColorSpace,st.batching=Y.batching,st.batchingColor=Y.batchingColor,st.instancing=Y.instancing,st.instancingColor=Y.instancingColor,st.instancingMorph=Y.instancingMorph,st.skinning=Y.skinning,st.morphTargets=Y.morphTargets,st.morphNormals=Y.morphNormals,st.morphColors=Y.morphColors,st.morphTargetsCount=Y.morphTargetsCount,st.numClippingPlanes=Y.numClippingPlanes,st.numIntersection=Y.numClipIntersection,st.vertexAlphas=Y.vertexAlphas,st.vertexTangents=Y.vertexTangents,st.toneMapping=Y.toneMapping}function Hr(R,Y,st,rt,k){Y.isScene!==!0&&(Y=Ue),D.resetTextureUnits();const At=Y.fog,zt=rt.isMeshStandardMaterial?Y.environment:null,Bt=j===null?w.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Lr,Ht=(rt.isMeshStandardMaterial?$:T).get(rt.envMap||zt),se=rt.vertexColors===!0&&!!st.attributes.color&&st.attributes.color.itemSize===4,re=!!st.attributes.tangent&&(!!rt.normalMap||rt.anisotropy>0),$t=!!st.morphAttributes.position,Me=!!st.morphAttributes.normal,Ee=!!st.morphAttributes.color;let Xe=qa;rt.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Xe=w.toneMapping);const Re=st.morphAttributes.position||st.morphAttributes.normal||st.morphAttributes.color,le=Re!==void 0?Re.length:0,ee=Ct.get(rt),fn=v.state.lights;if(ft===!0&&(xt===!0||R!==C)){const Je=R===C&&rt.id===U;Rt.setState(rt,R,Je)}let be=!1;rt.version===ee.__version?(ee.needsLights&&ee.lightsStateVersion!==fn.state.version||ee.outputColorSpace!==Bt||k.isBatchedMesh&&ee.batching===!1||!k.isBatchedMesh&&ee.batching===!0||k.isBatchedMesh&&ee.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&ee.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&ee.instancing===!1||!k.isInstancedMesh&&ee.instancing===!0||k.isSkinnedMesh&&ee.skinning===!1||!k.isSkinnedMesh&&ee.skinning===!0||k.isInstancedMesh&&ee.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&ee.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&ee.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&ee.instancingMorph===!1&&k.morphTexture!==null||ee.envMap!==Ht||rt.fog===!0&&ee.fog!==At||ee.numClippingPlanes!==void 0&&(ee.numClippingPlanes!==Rt.numPlanes||ee.numIntersection!==Rt.numIntersection)||ee.vertexAlphas!==se||ee.vertexTangents!==re||ee.morphTargets!==$t||ee.morphNormals!==Me||ee.morphColors!==Ee||ee.toneMapping!==Xe||ee.morphTargetsCount!==le)&&(be=!0):(be=!0,ee.__version=rt.version);let zn=ee.currentProgram;be===!0&&(zn=Qe(rt,Y,k));let gi=!1,Dn=!1,gn=!1;const Ie=zn.getUniforms(),Un=ee.uniforms;if(bt.useProgram(zn.program)&&(gi=!0,Dn=!0,gn=!0),rt.id!==U&&(U=rt.id,Dn=!0),gi||C!==R){bt.buffers.depth.getReversed()?(Mt.copy(R.projectionMatrix),bx(Mt),Ax(Mt),Ie.setValue(z,"projectionMatrix",Mt)):Ie.setValue(z,"projectionMatrix",R.projectionMatrix),Ie.setValue(z,"viewMatrix",R.matrixWorldInverse);const xn=Ie.map.cameraPosition;xn!==void 0&&xn.setValue(z,Gt.setFromMatrixPosition(R.matrixWorld)),Ut.logarithmicDepthBuffer&&Ie.setValue(z,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(rt.isMeshPhongMaterial||rt.isMeshToonMaterial||rt.isMeshLambertMaterial||rt.isMeshBasicMaterial||rt.isMeshStandardMaterial||rt.isShaderMaterial)&&Ie.setValue(z,"isOrthographic",R.isOrthographicCamera===!0),C!==R&&(C=R,Dn=!0,gn=!0)}if(k.isSkinnedMesh){Ie.setOptional(z,k,"bindMatrix"),Ie.setOptional(z,k,"bindMatrixInverse");const Je=k.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),Ie.setValue(z,"boneTexture",Je.boneTexture,D))}k.isBatchedMesh&&(Ie.setOptional(z,k,"batchingTexture"),Ie.setValue(z,"batchingTexture",k._matricesTexture,D),Ie.setOptional(z,k,"batchingIdTexture"),Ie.setValue(z,"batchingIdTexture",k._indirectTexture,D),Ie.setOptional(z,k,"batchingColorTexture"),k._colorsTexture!==null&&Ie.setValue(z,"batchingColorTexture",k._colorsTexture,D));const An=st.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&Qt.update(k,st,zn),(Dn||ee.receiveShadow!==k.receiveShadow)&&(ee.receiveShadow=k.receiveShadow,Ie.setValue(z,"receiveShadow",k.receiveShadow)),rt.isMeshGouraudMaterial&&rt.envMap!==null&&(Un.envMap.value=Ht,Un.flipEnvMap.value=Ht.isCubeTexture&&Ht.isRenderTargetTexture===!1?-1:1),rt.isMeshStandardMaterial&&rt.envMap===null&&Y.environment!==null&&(Un.envMapIntensity.value=Y.environmentIntensity),Dn&&(Ie.setValue(z,"toneMappingExposure",w.toneMappingExposure),ee.needsLights&&Xc(Un,gn),At&&rt.fog===!0&&Ot.refreshFogUniforms(Un,At),Ot.refreshMaterialUniforms(Un,rt,F,X,v.state.transmissionRenderTarget[R.id]),Pc.upload(z,Sn(ee),Un,D)),rt.isShaderMaterial&&rt.uniformsNeedUpdate===!0&&(Pc.upload(z,Sn(ee),Un,D),rt.uniformsNeedUpdate=!1),rt.isSpriteMaterial&&Ie.setValue(z,"center",k.center),Ie.setValue(z,"modelViewMatrix",k.modelViewMatrix),Ie.setValue(z,"normalMatrix",k.normalMatrix),Ie.setValue(z,"modelMatrix",k.matrixWorld),rt.isShaderMaterial||rt.isRawShaderMaterial){const Je=rt.uniformsGroups;for(let xn=0,Cs=Je.length;xn<Cs;xn++){const In=Je[xn];W.update(In,zn),W.bind(In,zn)}}return zn}function Xc(R,Y){R.ambientLightColor.needsUpdate=Y,R.lightProbe.needsUpdate=Y,R.directionalLights.needsUpdate=Y,R.directionalLightShadows.needsUpdate=Y,R.pointLights.needsUpdate=Y,R.pointLightShadows.needsUpdate=Y,R.spotLights.needsUpdate=Y,R.spotLightShadows.needsUpdate=Y,R.rectAreaLights.needsUpdate=Y,R.hemisphereLights.needsUpdate=Y}function qc(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(R,Y,st){Ct.get(R.texture).__webglTexture=Y,Ct.get(R.depthTexture).__webglTexture=st;const rt=Ct.get(R);rt.__hasExternalTextures=!0,rt.__autoAllocateDepthBuffer=st===void 0,rt.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),rt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(R,Y){const st=Ct.get(R);st.__webglFramebuffer=Y,st.__useDefaultFramebuffer=Y===void 0};const Wo=z.createFramebuffer();this.setRenderTarget=function(R,Y=0,st=0){j=R,G=Y,O=st;let rt=!0,k=null,At=!1,zt=!1;if(R){const Ht=Ct.get(R);if(Ht.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(z.FRAMEBUFFER,null),rt=!1;else if(Ht.__webglFramebuffer===void 0)D.setupRenderTarget(R);else if(Ht.__hasExternalTextures)D.rebindTextures(R,Ct.get(R.texture).__webglTexture,Ct.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const $t=R.depthTexture;if(Ht.__boundDepthTexture!==$t){if($t!==null&&Ct.has($t)&&(R.width!==$t.image.width||R.height!==$t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(R)}}const se=R.texture;(se.isData3DTexture||se.isDataArrayTexture||se.isCompressedArrayTexture)&&(zt=!0);const re=Ct.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(re[Y])?k=re[Y][st]:k=re[Y],At=!0):R.samples>0&&D.useMultisampledRTT(R)===!1?k=Ct.get(R).__webglMultisampledFramebuffer:Array.isArray(re)?k=re[st]:k=re,H.copy(R.viewport),et.copy(R.scissor),Q=R.scissorTest}else H.copy(N).multiplyScalar(F).floor(),et.copy(at).multiplyScalar(F).floor(),Q=Et;if(st!==0&&(k=Wo),bt.bindFramebuffer(z.FRAMEBUFFER,k)&&rt&&bt.drawBuffers(R,k),bt.viewport(H),bt.scissor(et),bt.setScissorTest(Q),At){const Ht=Ct.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Ht.__webglTexture,st)}else if(zt){const Ht=Ct.get(R.texture),se=Y;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ht.__webglTexture,st,se)}else if(R!==null&&st!==0){const Ht=Ct.get(R.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Ht.__webglTexture,st)}U=-1},this.readRenderTargetPixels=function(R,Y,st,rt,k,At,zt){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=Ct.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&zt!==void 0&&(Bt=Bt[zt]),Bt){bt.bindFramebuffer(z.FRAMEBUFFER,Bt);try{const Ht=R.texture,se=Ht.format,re=Ht.type;if(!Ut.textureFormatReadable(se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ut.textureTypeReadable(re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=R.width-rt&&st>=0&&st<=R.height-k&&z.readPixels(Y,st,rt,k,ue.convert(se),ue.convert(re),At)}finally{const Ht=j!==null?Ct.get(j).__webglFramebuffer:null;bt.bindFramebuffer(z.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(R,Y,st,rt,k,At,zt){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Bt=Ct.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&zt!==void 0&&(Bt=Bt[zt]),Bt){const Ht=R.texture,se=Ht.format,re=Ht.type;if(!Ut.textureFormatReadable(se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ut.textureTypeReadable(re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(Y>=0&&Y<=R.width-rt&&st>=0&&st<=R.height-k){bt.bindFramebuffer(z.FRAMEBUFFER,Bt);const $t=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,$t),z.bufferData(z.PIXEL_PACK_BUFFER,At.byteLength,z.STREAM_READ),z.readPixels(Y,st,rt,k,ue.convert(se),ue.convert(re),0);const Me=j!==null?Ct.get(j).__webglFramebuffer:null;bt.bindFramebuffer(z.FRAMEBUFFER,Me);const Ee=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Tx(z,Ee,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,$t),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,At),z.deleteBuffer($t),z.deleteSync(Ee),At}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,Y=null,st=0){R.isTexture!==!0&&(Sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),Y=arguments[0]||null,R=arguments[1]);const rt=Math.pow(2,-st),k=Math.floor(R.image.width*rt),At=Math.floor(R.image.height*rt),zt=Y!==null?Y.x:0,Bt=Y!==null?Y.y:0;D.setTexture2D(R,0),z.copyTexSubImage2D(z.TEXTURE_2D,st,0,0,zt,Bt,k,At),bt.unbindTexture()};const Za=z.createFramebuffer(),Gr=z.createFramebuffer();this.copyTextureToTexture=function(R,Y,st=null,rt=null,k=0,At=null){R.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture function signature has changed."),rt=arguments[0]||null,R=arguments[1],Y=arguments[2],At=arguments[3]||0,st=null),At===null&&(k!==0?(Sr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),At=k,k=0):At=0);let zt,Bt,Ht,se,re,$t,Me,Ee,Xe;const Re=R.isCompressedTexture?R.mipmaps[At]:R.image;if(st!==null)zt=st.max.x-st.min.x,Bt=st.max.y-st.min.y,Ht=st.isBox3?st.max.z-st.min.z:1,se=st.min.x,re=st.min.y,$t=st.isBox3?st.min.z:0;else{const An=Math.pow(2,-k);zt=Math.floor(Re.width*An),Bt=Math.floor(Re.height*An),R.isDataArrayTexture?Ht=Re.depth:R.isData3DTexture?Ht=Math.floor(Re.depth*An):Ht=1,se=0,re=0,$t=0}rt!==null?(Me=rt.x,Ee=rt.y,Xe=rt.z):(Me=0,Ee=0,Xe=0);const le=ue.convert(Y.format),ee=ue.convert(Y.type);let fn;Y.isData3DTexture?(D.setTexture3D(Y,0),fn=z.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(D.setTexture2DArray(Y,0),fn=z.TEXTURE_2D_ARRAY):(D.setTexture2D(Y,0),fn=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,Y.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,Y.unpackAlignment);const be=z.getParameter(z.UNPACK_ROW_LENGTH),zn=z.getParameter(z.UNPACK_IMAGE_HEIGHT),gi=z.getParameter(z.UNPACK_SKIP_PIXELS),Dn=z.getParameter(z.UNPACK_SKIP_ROWS),gn=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,Re.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,Re.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,se),z.pixelStorei(z.UNPACK_SKIP_ROWS,re),z.pixelStorei(z.UNPACK_SKIP_IMAGES,$t);const Ie=R.isDataArrayTexture||R.isData3DTexture,Un=Y.isDataArrayTexture||Y.isData3DTexture;if(R.isDepthTexture){const An=Ct.get(R),Je=Ct.get(Y),xn=Ct.get(An.__renderTarget),Cs=Ct.get(Je.__renderTarget);bt.bindFramebuffer(z.READ_FRAMEBUFFER,xn.__webglFramebuffer),bt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Cs.__webglFramebuffer);for(let In=0;In<Ht;In++)Ie&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ct.get(R).__webglTexture,k,$t+In),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ct.get(Y).__webglTexture,At,Xe+In)),z.blitFramebuffer(se,re,zt,Bt,Me,Ee,zt,Bt,z.DEPTH_BUFFER_BIT,z.NEAREST);bt.bindFramebuffer(z.READ_FRAMEBUFFER,null),bt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(k!==0||R.isRenderTargetTexture||Ct.has(R)){const An=Ct.get(R),Je=Ct.get(Y);bt.bindFramebuffer(z.READ_FRAMEBUFFER,Za),bt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Gr);for(let xn=0;xn<Ht;xn++)Ie?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,An.__webglTexture,k,$t+xn):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,An.__webglTexture,k),Un?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Je.__webglTexture,At,Xe+xn):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Je.__webglTexture,At),k!==0?z.blitFramebuffer(se,re,zt,Bt,Me,Ee,zt,Bt,z.COLOR_BUFFER_BIT,z.NEAREST):Un?z.copyTexSubImage3D(fn,At,Me,Ee,Xe+xn,se,re,zt,Bt):z.copyTexSubImage2D(fn,At,Me,Ee,se,re,zt,Bt);bt.bindFramebuffer(z.READ_FRAMEBUFFER,null),bt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else Un?R.isDataTexture||R.isData3DTexture?z.texSubImage3D(fn,At,Me,Ee,Xe,zt,Bt,Ht,le,ee,Re.data):Y.isCompressedArrayTexture?z.compressedTexSubImage3D(fn,At,Me,Ee,Xe,zt,Bt,Ht,le,Re.data):z.texSubImage3D(fn,At,Me,Ee,Xe,zt,Bt,Ht,le,ee,Re):R.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,At,Me,Ee,zt,Bt,le,ee,Re.data):R.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,At,Me,Ee,Re.width,Re.height,le,Re.data):z.texSubImage2D(z.TEXTURE_2D,At,Me,Ee,zt,Bt,le,ee,Re);z.pixelStorei(z.UNPACK_ROW_LENGTH,be),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,zn),z.pixelStorei(z.UNPACK_SKIP_PIXELS,gi),z.pixelStorei(z.UNPACK_SKIP_ROWS,Dn),z.pixelStorei(z.UNPACK_SKIP_IMAGES,gn),At===0&&Y.generateMipmaps&&z.generateMipmap(fn),bt.unbindTexture()},this.copyTextureToTexture3D=function(R,Y,st=null,rt=null,k=0){return R.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),st=arguments[0]||null,rt=arguments[1]||null,R=arguments[2],Y=arguments[3],k=arguments[4]||0),Sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,Y,st,rt,k)},this.initRenderTarget=function(R){Ct.get(R).__webglFramebuffer===void 0&&D.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?D.setTextureCube(R,0):R.isData3DTexture?D.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?D.setTexture2DArray(R,0):D.setTexture2D(R,0),bt.unbindTexture()},this.resetState=function(){G=0,O=0,j=null,bt.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorspace=De._getDrawingBufferColorSpace(e),i.unpackColorSpace=De._getUnpackColorSpace()}}const wv={type:"change"},Od={type:"start"},g0={type:"end"},Cc=new Xo,Dv=new Va,qA=Math.cos(70*Mx.DEG2RAD),dn=new nt,qn=2*Math.PI,Ve={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Lh=1e-6;class WA extends oM{constructor(e,i=null){super(e,i),this.state=Ve.NONE,this.enabled=!0,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Tr.ROTATE,MIDDLE:Tr.DOLLY,RIGHT:Tr.PAN},this.touches={ONE:xr.ROTATE,TWO:xr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new nt,this._lastQuaternion=new bs,this._lastTargetPosition=new nt,this._quat=new bs().setFromUnitVectors(e.up,new nt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new iv,this._sphericalDelta=new iv,this._scale=1,this._panOffset=new nt,this._rotateStart=new me,this._rotateEnd=new me,this._rotateDelta=new me,this._panStart=new me,this._panEnd=new me,this._panDelta=new me,this._dollyStart=new me,this._dollyEnd=new me,this._dollyDelta=new me,this._dollyDirection=new nt,this._mouse=new me,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=jA.bind(this),this._onPointerDown=YA.bind(this),this._onPointerUp=ZA.bind(this),this._onContextMenu=n1.bind(this),this._onMouseWheel=JA.bind(this),this._onKeyDown=$A.bind(this),this._onTouchStart=t1.bind(this),this._onTouchMove=e1.bind(this),this._onMouseDown=KA.bind(this),this._onMouseMove=QA.bind(this),this._interceptControlDown=i1.bind(this),this._interceptControlUp=a1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(wv),this.update(),this.state=Ve.NONE}update(e=null){const i=this.object.position;dn.copy(i).sub(this.target),dn.applyQuaternion(this._quat),this._spherical.setFromVector3(dn),this.autoRotate&&this.state===Ve.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=qn:s>Math.PI&&(s-=qn),l<-Math.PI?l+=qn:l>Math.PI&&(l-=qn),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let u=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const h=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),u=h!=this._spherical.radius}if(dn.setFromSpherical(this._spherical),dn.applyQuaternion(this._quatInverse),i.copy(this.target).add(dn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let h=null;if(this.object.isPerspectiveCamera){const d=dn.length();h=this._clampDistance(d*this._scale);const m=d-h;this.object.position.addScaledVector(this._dollyDirection,m),this.object.updateMatrixWorld(),u=!!m}else if(this.object.isOrthographicCamera){const d=new nt(this._mouse.x,this._mouse.y,0);d.unproject(this.object);const m=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),u=m!==this.object.zoom;const p=new nt(this._mouse.x,this._mouse.y,0);p.unproject(this.object),this.object.position.sub(p).add(d),this.object.updateMatrixWorld(),h=dn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;h!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(h).add(this.object.position):(Cc.origin.copy(this.object.position),Cc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Cc.direction))<qA?this.object.lookAt(this.target):(Dv.setFromNormalAndCoplanarPoint(this.object.up,this.target),Cc.intersectPlane(Dv,this.target))))}else if(this.object.isOrthographicCamera){const h=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),h!==this.object.zoom&&(this.object.updateProjectionMatrix(),u=!0)}return this._scale=1,this._performCursorZoom=!1,u||this._lastPosition.distanceToSquared(this.object.position)>Lh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Lh||this._lastTargetPosition.distanceToSquared(this.target)>Lh?(this.dispatchEvent(wv),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?qn/60*this.autoRotateSpeed*e:qn/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){dn.setFromMatrixColumn(i,0),dn.multiplyScalar(-e),this._panOffset.add(dn)}_panUp(e,i){this.screenSpacePanning===!0?dn.setFromMatrixColumn(i,1):(dn.setFromMatrixColumn(i,0),dn.crossVectors(this.object.up,dn)),dn.multiplyScalar(e),this._panOffset.add(dn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;dn.copy(l).sub(this.target);let u=dn.length();u*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*u/s.clientHeight,this.object.matrix),this._panUp(2*i*u/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,u=i-s.top,h=s.width,d=s.height;this._mouse.x=l/h*2-1,this._mouse.y=-(u/d)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,u=Math.sqrt(s*s+l*l);this._dollyStart.set(0,u)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),u=.5*(e.pageY+s.y);this._rotateEnd.set(l,u)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(qn*this._rotateDelta.x/i.clientHeight),this._rotateUp(qn*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,u=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,u),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const h=(e.pageX+i.x)*.5,d=(e.pageY+i.y)*.5;this._updateZoomParameters(h,d)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new me,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function YA(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o)))}function jA(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function ZA(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(g0),this.state=Ve.NONE;break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function KA(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Tr.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Ve.DOLLY;break;case Tr.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ve.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ve.ROTATE}break;case Tr.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ve.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ve.PAN}break;default:this.state=Ve.NONE}this.state!==Ve.NONE&&this.dispatchEvent(Od)}function QA(o){switch(this.state){case Ve.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Ve.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Ve.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function JA(o){this.enabled===!1||this.enableZoom===!1||this.state!==Ve.NONE||(o.preventDefault(),this.dispatchEvent(Od),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(g0))}function $A(o){this.enabled!==!1&&this._handleKeyDown(o)}function t1(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case xr.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Ve.TOUCH_ROTATE;break;case xr.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Ve.TOUCH_PAN;break;default:this.state=Ve.NONE}break;case 2:switch(this.touches.TWO){case xr.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Ve.TOUCH_DOLLY_PAN;break;case xr.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Ve.TOUCH_DOLLY_ROTATE;break;default:this.state=Ve.NONE}break;default:this.state=Ve.NONE}this.state!==Ve.NONE&&this.dispatchEvent(Od)}function e1(o){switch(this._trackPointer(o),this.state){case Ve.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Ve.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Ve.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Ve.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Ve.NONE}}function n1(o){this.enabled!==!1&&o.preventDefault()}function i1(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function a1(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const s1=`
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;

  varying vec3 vColor;
  varying float vAlpha;

  uniform float uPixelRatio;

  void main() {
    vColor = aColor;
    vAlpha = aAlpha;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (180.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`,r1=`
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = smoothstep(0.12, 0.0, dist);

    vec3 color = mix(vColor, vec3(1.0), core * 0.35);
    gl_FragColor = vec4(color, glow * glow * vAlpha);
  }
`;function o1({phase:o,nodes:e,edges:i,clusters:s,selectedNodeId:l,hoveredClusterId:u,onNodeClick:h,onNodeHover:d}){const m=Ze.useRef(null),p=Ze.useRef({phase:"hero",nodes:[],edges:[],clusters:[],selectedNodeId:null,hoveredClusterId:null,hoveredNodeIndex:null});return Ze.useEffect(()=>{const g=m.current;if(!g)return;const y=g.clientWidth||window.innerWidth,S=g.clientHeight||window.innerHeight,M=new Zx;M.background=new Le(16316146);const E=new di(60,y/S,.1,1e3);E.position.set(0,0,75);const A=new XA({antialias:!0});A.setSize(y,S),A.setPixelRatio(Math.min(window.devicePixelRatio,2)),g.appendChild(A.domElement);const x=new WA(E,A.domElement);x.autoRotate=!0,x.autoRotateSpeed=.4,x.enableDamping=!0,x.dampingFactor=.05,x.minDistance=20,x.maxDistance=150,x.enablePan=!1;const v=new rM;v.params.Points.threshold=1.2;const B=new me,L=1500,w=new On(new Float32Array(L*3),3),q=new On(new Float32Array(L*3),3),G=new On(new Float32Array(L),1),O=new On(new Float32Array(L),1),j=new Ai;j.setAttribute("position",w),j.setAttribute("aColor",q),j.setAttribute("aSize",G),j.setAttribute("aAlpha",O);const U=new ha({vertexShader:s1,fragmentShader:r1,uniforms:{uPixelRatio:{value:A.getPixelRatio()}},transparent:!0,depthWrite:!1}),C=new eM(j,U);M.add(C);const H=5e3,et=new On(new Float32Array(H*6),3),Q=new On(new Float32Array(H*6),3),dt=new Ai;dt.setAttribute("position",et),dt.setAttribute("color",Q);const pt=new c0({vertexColors:!0,transparent:!0,opacity:.12}),P=new $x(dt,pt);M.add(P);const X=new Float32Array(L*3),F=new Float32Array(L*3),yt=new Float32Array(L),Tt=new Float32Array(L),N=new Float32Array(L*3);function at(Dt){const Zt=Math.min(Dt.length,L);j.setDrawRange(0,Zt);for(let z=0;z<Zt;z++){const kt=Dt[z],wt=z*3;w.array[wt]=kt.x,w.array[wt+1]=kt.y,w.array[wt+2]=kt.z,X[wt]=kt.x,X[wt+1]=kt.y,X[wt+2]=kt.z,N[wt]=kt.x,N[wt+1]=kt.y,N[wt+2]=kt.z,q.array[wt]=kt.color[0],q.array[wt+1]=kt.color[1],q.array[wt+2]=kt.color[2],F[wt]=kt.color[0],F[wt+1]=kt.color[1],F[wt+2]=kt.color[2],G.array[z]=kt.size,Tt[z]=kt.size,O.array[z]=kt.alpha,yt[z]=kt.alpha}w.needsUpdate=!0,q.needsUpdate=!0,G.needsUpdate=!0,O.needsUpdate=!0}function Et(Dt,Zt){const z=Math.min(Dt.length,H);dt.setDrawRange(0,z*2);for(let kt=0;kt<z;kt++){const[wt,Ut]=Dt[kt],bt=kt*6,Yt=Zt[wt],Ct=Zt[Ut];if(!Yt||!Ct)continue;et.array[bt]=Yt.x,et.array[bt+1]=Yt.y,et.array[bt+2]=Yt.z,et.array[bt+3]=Ct.x,et.array[bt+4]=Ct.y,et.array[bt+5]=Ct.z;const D=.65;for(let T=0;T<6;T++)Q.array[bt+T]=D}et.needsUpdate=!0,Q.needsUpdate=!0}function K(){const Dt=p.current,Zt=Dt.nodes,z=Math.min(Zt.length,L);if(Dt.phase==="hero"){for(let kt=0;kt<z;kt++){const wt=Zt[kt],Ut=kt*3;X[Ut]=N[Ut],X[Ut+1]=N[Ut+1],X[Ut+2]=N[Ut+2],F[Ut]=wt.color[0],F[Ut+1]=wt.color[1],F[Ut+2]=wt.color[2],yt[kt]=wt.alpha,Tt[kt]=wt.size}pt.opacity=.12}else if(Dt.phase==="clustering"||Dt.phase==="scanning"||Dt.phase==="results"){const kt=Dt.clusters;if(!kt.length)return;const wt={};kt.forEach(Yt=>{wt[Yt.id]=Yt});for(let Yt=0;Yt<z;Yt++){const Ct=Zt[Yt],D=Yt*3;if(Ct.clusterId!==null&&Ct.clusterId!==void 0&&wt[Ct.clusterId]){const T=wt[Ct.clusterId],$=T.center,lt=Uv(T.color),gt=5;X[D]=$.x+(Math.random()-.5)*gt*2,X[D+1]=$.y+(Math.random()-.5)*gt*2,X[D+2]=$.z+(Math.random()-.5)*gt*2,F[D]=lt[0],F[D+1]=lt[1],F[D+2]=lt[2],yt[Yt]=.85,Tt[Yt]=3+Ct.matchScore*4}else X[D]=N[D]*1.8,X[D+1]=N[D+1]*1.8,X[D+2]=N[D+2]*1.8,F[D]=.8,F[D+1]=.78,F[D+2]=.75,yt[Yt]=.06,Tt[Yt]=1.5}const Ut=Dt.edges,bt=Math.min(Ut.length,H);for(let Yt=0;Yt<bt;Yt++){const[Ct,D]=Ut[Yt],T=Zt[Ct],$=Zt[D];if(!T||!$)continue;const lt=Yt*6;if(T.clusterId!==null&&T.clusterId===$.clusterId&&wt[T.clusterId]){const gt=Uv(wt[T.clusterId].color);Q.array[lt]=gt[0],Q.array[lt+1]=gt[1],Q.array[lt+2]=gt[2],Q.array[lt+3]=gt[0],Q.array[lt+4]=gt[1],Q.array[lt+5]=gt[2]}else for(let gt=0;gt<6;gt++)Q.array[lt+gt]=.85}if(Q.needsUpdate=!0,pt.opacity=.2,Dt.phase==="scanning"||Dt.phase==="results")for(let Yt=0;Yt<z;Yt++){const Ct=Zt[Yt];if(Ct.clusterId===null||Ct.clusterId===void 0)continue;const D=wt[Ct.clusterId];if(!D||!D.scanned)continue;const T=Yt*3;D.found?(F[T]=F[T]*.5+.13*.5,F[T+1]=F[T+1]*.5+.77*.5,F[T+2]=F[T+2]*.5+.29*.5):(F[T]=F[T]*.5+.94*.5,F[T+1]=F[T+1]*.5+.27*.5,F[T+2]=F[T+2]*.5+.27*.5)}}}function ft(){const Dt=p.current,Zt=Dt.nodes,z=Math.min(Zt.length,L);if(Dt.hoveredClusterId!==null&&Dt.hoveredClusterId!==void 0)for(let kt=0;kt<z;kt++){const wt=Zt[kt];wt.clusterId===Dt.hoveredClusterId?(yt[kt]=1,Tt[kt]=(3+wt.matchScore*4)*1.3):wt.clusterId!==null&&(yt[kt]=.25)}Dt.hoveredNodeIndex!==null&&Dt.hoveredNodeIndex<z&&(Tt[Dt.hoveredNodeIndex]=8,yt[Dt.hoveredNodeIndex]=1)}const xt=.04;let Mt;function Vt(){Mt=requestAnimationFrame(Vt);const Dt=performance.now()*.001,Zt=p.current,z=Math.min(Zt.nodes.length,L);for(let Ut=0;Ut<z;Ut++){const bt=Ut*3;w.array[bt]+=(X[bt]-w.array[bt])*xt,w.array[bt+1]+=(X[bt+1]-w.array[bt+1])*xt,w.array[bt+2]+=(X[bt+2]-w.array[bt+2])*xt,q.array[bt]+=(F[bt]-q.array[bt])*xt,q.array[bt+1]+=(F[bt+1]-q.array[bt+1])*xt,q.array[bt+2]+=(F[bt+2]-q.array[bt+2])*xt,O.array[Ut]+=(yt[Ut]-O.array[Ut])*xt,G.array[Ut]+=(Tt[Ut]-G.array[Ut])*xt}if(Zt.phase==="hero")for(let Ut=0;Ut<z;Ut++){const bt=Ut*3,Yt=.12;w.array[bt]+=Math.sin(Dt*.3+Ut*.37)*Yt*.01,w.array[bt+1]+=Math.cos(Dt*.25+Ut*.41)*Yt*.01,w.array[bt+2]+=Math.sin(Dt*.2+Ut*.29)*Yt*.01}if(Zt.selectedNodeId!==null){const Ut=Zt.nodes.findIndex(bt=>bt.id===Zt.selectedNodeId);if(Ut!==-1){const bt=6+Math.sin(Dt*3)*2;G.array[Ut]=bt,O.array[Ut]=1}}w.needsUpdate=!0,q.needsUpdate=!0,G.needsUpdate=!0,O.needsUpdate=!0;const kt=Zt.edges,wt=Math.min(kt.length,H);for(let Ut=0;Ut<wt;Ut++){const[bt,Yt]=kt[Ut],Ct=Ut*6;et.array[Ct]=w.array[bt*3],et.array[Ct+1]=w.array[bt*3+1],et.array[Ct+2]=w.array[bt*3+2],et.array[Ct+3]=w.array[Yt*3],et.array[Ct+4]=w.array[Yt*3+1],et.array[Ct+5]=w.array[Yt*3+2]}et.needsUpdate=!0,x.update(),A.render(M,E)}function Gt(Dt){const Zt=g.getBoundingClientRect();B.x=(Dt.clientX-Zt.left)/Zt.width*2-1,B.y=-((Dt.clientY-Zt.top)/Zt.height)*2+1,v.setFromCamera(B,E);const z=v.intersectObject(C);if(z.length>0){const kt=z[0].index;if(p.current.hoveredNodeIndex=kt,g.style.cursor="pointer",d){const wt=p.current.nodes[kt];d(wt,Dt.clientX,Dt.clientY)}}else p.current.hoveredNodeIndex!==null&&(p.current.hoveredNodeIndex=null,g.style.cursor="default",d&&d(null,0,0))}function oe(Dt){const Zt=g.getBoundingClientRect();B.x=(Dt.clientX-Zt.left)/Zt.width*2-1,B.y=-((Dt.clientY-Zt.top)/Zt.height)*2+1,v.setFromCamera(B,E);const z=v.intersectObject(C);if(z.length>0){const kt=z[0].index,wt=p.current.nodes[kt];h&&h(wt)}}function Ue(){const Dt=g.clientWidth,Zt=g.clientHeight;E.aspect=Dt/Zt,E.updateProjectionMatrix(),A.setSize(Dt,Zt)}return g.addEventListener("pointermove",Gt),g.addEventListener("click",oe),window.addEventListener("resize",Ue),p.current.three={scene:M,camera:E,renderer:A,controls:x,nodesMesh:C,edgesMesh:P,positionAttr:w,colorAttr:q,sizeAttr:G,alphaAttr:O,edgePosAttr:et,edgeColorAttr:Q,edgeMaterial:pt,targetPos:X,targetColor:F,targetAlpha:yt,targetSize:Tt,basePos:N,syncNodes:at,syncEdges:Et,applyPhaseTargets:K,applyHighlights:ft},Vt(),()=>{cancelAnimationFrame(Mt),g.removeEventListener("pointermove",Gt),g.removeEventListener("click",oe),window.removeEventListener("resize",Ue),A.dispose(),j.dispose(),U.dispose(),dt.dispose(),pt.dispose(),g.contains(A.domElement)&&g.removeChild(A.domElement),p.current.three=null}},[]),Ze.useEffect(()=>{!e||!p.current.three||(p.current.nodes=e,p.current.three.syncNodes(e))},[e]),Ze.useEffect(()=>{!i||!p.current.three||(p.current.edges=i,p.current.three.syncEdges(i,p.current.nodes))},[i]),Ze.useEffect(()=>{p.current.phase=o,p.current.three&&p.current.three.applyPhaseTargets()},[o,s]),Ze.useEffect(()=>{p.current.clusters=s||[],p.current.three&&p.current.three.applyPhaseTargets()},[s]),Ze.useEffect(()=>{p.current.selectedNodeId=l},[l]),Ze.useEffect(()=>{p.current.hoveredClusterId=u,p.current.three&&p.current.phase!=="hero"&&(p.current.three.applyPhaseTargets(),p.current.three.applyHighlights())},[u]),ht.jsx("div",{ref:m,style:{position:"absolute",inset:0,zIndex:0}})}function Uv(o){const e=parseInt(o.slice(1,3),16)/255,i=parseInt(o.slice(3,5),16)/255,s=parseInt(o.slice(5,7),16)/255;return[e,i,s]}function l1({visible:o,onTryIt:e}){return ht.jsxs("div",{className:`hero-overlay ${o?"":"hidden"}`,children:[ht.jsx("div",{className:"hero-logo",children:"TinyUser"}),ht.jsx("h1",{className:"hero-headline",children:"Find out if your product is invisible."}),ht.jsx("p",{className:"hero-subtext",children:"100,000 synthetic users. Real Google searches. Real answers."}),ht.jsx("button",{className:"hero-cta",onClick:e,children:"Try it →"}),ht.jsx("div",{className:"hero-stats",children:"100K personas · 34 provinces · real search results"})]})}const c1=["Notion","TinyFish.ai","Shopee seller tools","VIB mobile banking","Hotel management SaaS"];function u1({isOpen:o,onClose:e,onRun:i}){const[s,l]=Ze.useState("");if(!o)return null;function u(){s.trim()&&(i(s.trim()),l(""))}function h(m){l(m)}function d(m){m.key==="Enter"&&!m.shiftKey&&s.trim()&&(m.preventDefault(),u())}return ht.jsx("div",{className:"modal-backdrop",onClick:e,children:ht.jsxs("div",{className:"modal-card",onClick:m=>m.stopPropagation(),children:[ht.jsx("button",{className:"modal-close",onClick:e,children:"×"}),ht.jsx("div",{className:"modal-label",children:"Product Description"}),ht.jsx("textarea",{className:"modal-textarea",placeholder:"Paste your product URL or describe what it does...",value:s,onChange:m=>l(m.target.value),onKeyDown:d,autoFocus:!0}),ht.jsx("div",{className:"modal-chips",children:c1.map(m=>ht.jsx("button",{className:"modal-chip",onClick:()=>h(m),children:m},m))}),ht.jsx("div",{className:"modal-footer",children:ht.jsx("button",{className:"modal-run",onClick:u,disabled:!s.trim(),children:"Run →"})})]})})}function f1({productName:o}){return ht.jsxs("div",{className:"top-bar",children:[ht.jsx("span",{className:"top-bar-logo",children:"TinyUser"}),ht.jsx("span",{className:"top-bar-divider"}),ht.jsx("span",{className:"top-bar-product",children:o})]})}const Nv=[{key:"clustering",label:"Clustering"},{key:"scanning",label:"Scanning"},{key:"results",label:"Results"}],h1={clustering:"Personas forming into natural audience segments...",scanning:"Running search queries against live Google...",results:"Analysis complete."};function d1({phase:o}){const e=Nv.findIndex(i=>i.key===o);return ht.jsxs("div",{className:"progress-bar",children:[ht.jsx("div",{className:"progress-phases",children:Nv.map((i,s)=>ht.jsxs("span",{children:[s>0&&ht.jsx("span",{className:"progress-arrow",children:"→ "}),ht.jsx("span",{className:`progress-phase ${s===e?"active":s<e?"done":""}`,children:i.label})]},i.key))}),ht.jsx("div",{className:"progress-status",children:h1[o]||""})]})}function p1({clusters:o,onClusterHover:e}){return!o||o.length===0?null:ht.jsx("div",{className:"cluster-legend",children:o.map(i=>ht.jsxs("div",{className:"cluster-item",onMouseEnter:()=>e==null?void 0:e(i.id),onMouseLeave:()=>e==null?void 0:e(null),children:[ht.jsx("div",{className:"cluster-dot",style:{background:i.color}}),ht.jsxs("div",{className:"cluster-info",children:[ht.jsx("div",{className:"cluster-name",children:i.name}),ht.jsxs("div",{className:"cluster-meta",children:[i.size.toLocaleString()," personas",i.scanned&&i.topQuery&&ht.jsxs(ht.Fragment,{children:[" · “",i.topQuery,"”"]})]})]}),i.scanned&&ht.jsx("div",{className:`cluster-badge ${i.found?"found":"invisible"}`,children:i.found?`#${i.rank}`:"✗"})]},i.id))})}function m1({clusters:o,discoverability:e,qualifying:i}){var d;if(!o||o.length===0)return null;const s=o.filter(m=>m.found),l=o.filter(m=>!m.found),u=l.sort((m,p)=>p.size-m.size)[0],h=s.sort((m,p)=>(m.rank||99)-(p.rank||99))[0];return ht.jsxs("div",{className:"results-panel",children:[ht.jsxs("div",{className:`results-score ${e>=50?"good":"bad"}`,children:[e,"%"]}),ht.jsx("div",{className:"results-label",children:"Discoverability Score"}),ht.jsxs("div",{className:"results-stats",children:[ht.jsxs("div",{className:"results-stat",children:[ht.jsx("span",{className:"results-stat-value",children:i==null?void 0:i.toLocaleString()}),ht.jsx("span",{className:"results-stat-label",children:"qualifying personas"})]}),ht.jsxs("div",{className:"results-stat",children:[ht.jsx("span",{className:"results-stat-value",children:o.length}),ht.jsx("span",{className:"results-stat-label",children:"segments found"})]}),ht.jsxs("div",{className:"results-stat",children:[ht.jsx("span",{className:"results-stat-value",children:l.length}),ht.jsx("span",{className:"results-stat-label",children:"invisible"})]})]}),ht.jsx("div",{className:"results-divider"}),u&&ht.jsxs("div",{className:"results-card gap",children:[ht.jsx("div",{className:"results-card-title",children:"Biggest Gap"}),ht.jsxs("div",{className:"results-card-body",children:[u.size.toLocaleString()," personas search “",u.topQuery,"” — you rank nowhere.",ht.jsx("br",{}),ht.jsxs("span",{style:{fontSize:12,color:"#999",marginTop:4,display:"inline-block"},children:["Instead: ",(d=u.competitors)==null?void 0:d.join(", ")]})]})]}),h&&ht.jsxs("div",{className:"results-card win",children:[ht.jsx("div",{className:"results-card-title",children:"Best Ranking"}),ht.jsxs("div",{className:"results-card-body",children:[h.name.split("(")[0].trim()," search “",h.topQuery,"” — you rank #",h.rank,"."]})]}),ht.jsx("div",{className:"results-divider"}),ht.jsx("div",{style:{fontSize:12,color:"#999",marginTop:8},children:"Click any node in the graph to see the full persona and TinyFish search session."})]})}const g1=[{name:"Ho Chi Minh City",region:"Southeast",weight:.1381},{name:"Hanoi",region:"Red River Delta",weight:.0869},{name:"Hai Phong",region:"Red River Delta",weight:.046},{name:"Can Tho",region:"Mekong Delta",weight:.0414},{name:"Da Nang",region:"South Central",weight:.0302},{name:"Dong Nai",region:"Southeast",weight:.0443},{name:"Bac Ninh",region:"Red River Delta",weight:.0357},{name:"Thanh Hoa",region:"North Central",weight:.0427},{name:"Nghe An",region:"North Central",weight:.0378},{name:"An Giang",region:"Mekong Delta",weight:.0489},{name:"Dong Thap",region:"Mekong Delta",weight:.0431},{name:"Vinh Long",region:"Mekong Delta",weight:.042},{name:"Ninh Binh",region:"Red River Delta",weight:.0435},{name:"Phu Tho",region:"Northeast",weight:.0397},{name:"Lam Dong",region:"Central Highlands",weight:.0382},{name:"Gia Lai",region:"Central Highlands",weight:.0354},{name:"Dak Lak",region:"Central Highlands",weight:.033},{name:"Tay Ninh",region:"Southeast",weight:.0321},{name:"Khanh Hoa",region:"South Central",weight:.0221},{name:"Ca Mau",region:"Mekong Delta",weight:.0257},{name:"Hue",region:"North Central",weight:.0141},{name:"Thai Nguyen",region:"Northeast",weight:.0178},{name:"Lao Cai",region:"Northwest",weight:.0175},{name:"Son La",region:"Northwest",weight:.0139}],_1=[{range:"18-24",weight:.145},{range:"25-34",weight:.22},{range:"35-44",weight:.205},{range:"45-54",weight:.17},{range:"55-64",weight:.14},{range:"65+",weight:.12}],Lv={Southeast:[{title:"Software engineer",industry:"Technology",education:"university",income:"15-30M",platform:"Google",lang:"english"},{title:"Marketing specialist",industry:"Retail & e-commerce",education:"university",income:"7-15M",platform:"Facebook",lang:"mixed"},{title:"Grab driver",industry:"Transportation & logistics",education:"secondary",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Factory worker",industry:"Manufacturing",education:"vocational",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Bank teller",industry:"Banking & finance",education:"university",income:"7-15M",platform:"Facebook",lang:"vietnamese"},{title:"Shopee seller",industry:"Retail & e-commerce",education:"secondary",income:"7-15M",platform:"Shopee",lang:"vietnamese"},{title:"Accountant",industry:"Banking & finance",education:"university",income:"7-15M",platform:"Google",lang:"mixed"},{title:"UI/UX designer",industry:"Technology",education:"university",income:"15-30M",platform:"Google",lang:"english"},{title:"Street food vendor",industry:"Food & beverage",education:"primary",income:"<3M VND/month",platform:"Zalo",lang:"vietnamese"},{title:"Logistics coordinator",industry:"Transportation & logistics",education:"university",income:"7-15M",platform:"Zalo",lang:"vietnamese"}],"Red River Delta":[{title:"Government clerk",industry:"Government",education:"university",income:"7-15M",platform:"Zalo",lang:"vietnamese"},{title:"High school teacher",industry:"Education",education:"university",income:"7-15M",platform:"Facebook",lang:"vietnamese"},{title:"Factory worker",industry:"Manufacturing",education:"vocational",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Small business owner",industry:"Retail & e-commerce",education:"vocational",income:"7-15M",platform:"Facebook",lang:"vietnamese"},{title:"Nurse",industry:"Healthcare",education:"vocational",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Construction worker",industry:"Construction",education:"secondary",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"University lecturer",industry:"Education",education:"postgraduate",income:"15-30M",platform:"Google",lang:"mixed"}],"Mekong Delta":[{title:"Rice farmer",industry:"Agriculture & aquaculture",education:"primary",income:"<3M VND/month",platform:"Zalo",lang:"vietnamese"},{title:"Shrimp farmer",industry:"Agriculture & aquaculture",education:"secondary",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Fish trader",industry:"Agriculture & aquaculture",education:"secondary",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Street food vendor",industry:"Food & beverage",education:"primary",income:"<3M VND/month",platform:"Zalo",lang:"vietnamese"},{title:"Primary school teacher",industry:"Education",education:"university",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Boat mechanic",industry:"Transportation & logistics",education:"vocational",income:"3-7M",platform:"Zalo",lang:"vietnamese"}],"North Central":[{title:"Farmer",industry:"Agriculture & aquaculture",education:"primary",income:"<3M VND/month",platform:"Zalo",lang:"vietnamese"},{title:"Teacher",industry:"Education",education:"university",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Carpenter",industry:"Construction",education:"vocational",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Market vendor",industry:"Retail & e-commerce",education:"secondary",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Government clerk",industry:"Government",education:"university",income:"7-15M",platform:"Zalo",lang:"vietnamese"}],"South Central":[{title:"Tour guide",industry:"Tourism & hospitality",education:"university",income:"7-15M",platform:"Facebook",lang:"mixed"},{title:"Hotel front desk manager",industry:"Tourism & hospitality",education:"university",income:"7-15M",platform:"Zalo",lang:"mixed"},{title:"Fisherman",industry:"Agriculture & aquaculture",education:"primary",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Restaurant owner",industry:"Food & beverage",education:"secondary",income:"7-15M",platform:"Facebook",lang:"vietnamese"},{title:"Souvenir shop owner",industry:"Retail & e-commerce",education:"secondary",income:"3-7M",platform:"Facebook",lang:"vietnamese"}],"Central Highlands":[{title:"Coffee farmer",industry:"Agriculture & aquaculture",education:"primary",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Rubber plantation worker",industry:"Agriculture & aquaculture",education:"primary",income:"<3M VND/month",platform:"Zalo",lang:"vietnamese"},{title:"Teacher",industry:"Education",education:"university",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Small trader",industry:"Retail & e-commerce",education:"secondary",income:"3-7M",platform:"Facebook",lang:"vietnamese"}],Northeast:[{title:"Tea farmer",industry:"Agriculture & aquaculture",education:"primary",income:"<3M VND/month",platform:"Zalo",lang:"vietnamese"},{title:"Miner",industry:"Manufacturing",education:"vocational",income:"3-7M",platform:"Zalo",lang:"vietnamese"},{title:"Border trader",industry:"Retail & e-commerce",education:"secondary",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Teacher",industry:"Education",education:"university",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Factory worker",industry:"Manufacturing",education:"vocational",income:"3-7M",platform:"Zalo",lang:"vietnamese"}],Northwest:[{title:"Farmer",industry:"Agriculture & aquaculture",education:"no_formal",income:"<3M VND/month",platform:"Zalo",lang:"vietnamese"},{title:"Teacher",industry:"Education",education:"university",income:"3-7M",platform:"Facebook",lang:"vietnamese"},{title:"Handicraft worker",industry:"Manufacturing",education:"primary",income:"<3M VND/month",platform:"none/offline",lang:"vietnamese"},{title:"Construction worker",industry:"Construction",education:"primary",income:"3-7M",platform:"Zalo",lang:"vietnamese"}]},Ov={Technology:["Our codebase has zero documentation and the senior dev just quit","I spend half my day in meetings instead of coding","The company uses 5 different tools and none of them talk to each other","Sprint deadlines are always unrealistic","Legacy systems nobody wants to touch but everyone depends on","No proper CI/CD pipeline — deploys are manual and scary","Hiring takes forever and good candidates get poached","Product requirements change mid-sprint constantly"],"Retail & e-commerce":["Customer messages come from 5 platforms and I miss half of them","Inventory tracking is done in a spreadsheet that breaks weekly","Shipping costs eat all my margins on small orders","Shopee keeps changing their algorithm and my sales drop","I can't find reliable suppliers who deliver on time","Returns are a nightmare to process and track","Competitors copy my product photos the next day","Facebook ad costs keep going up but conversion goes down"],"Banking & finance":["Too much paperwork for every single transaction","Our internal systems are from 2005 and crash twice a week","Customers complain about slow service at the branch","Compliance requirements change faster than we can adapt","Manual reconciliation takes hours every day","The mobile banking app has terrible UX and customers call us instead"],"Agriculture & aquaculture":["Crop prices dropped but input costs went up 30%","Saltwater intrusion is getting worse every dry season","I can't get a loan without weeks of paperwork","Weather forecasts are unreliable for my farming decisions","Middlemen take most of the profit — I can't reach buyers directly","Pests are getting resistant to the usual treatments","No cold storage nearby so produce spoils in transport"],Education:["Class sizes are too big — 45 students per class is common","Parents demand more results but resources stay the same","Grading 200 papers by hand every week is exhausting","No budget for updated textbooks or teaching materials","Students in remote areas have no internet for online lessons","Administrative paperwork eats into teaching time"],"Tourism & hospitality":["Guest complaints pile up and there's no system to track them","I manually update room availability across 3 booking platforms","Staff scheduling is done on paper and always has conflicts","Off-season months are brutal — revenue drops 70%","Online reviews can destroy our reputation overnight","Tour cancellations due to weather have no backup plan"],"Food & beverage":["Ingredient prices change daily and I can't adjust menu prices that fast","Delivery platforms take 25% commission — barely profitable","Food safety inspections have gotten stricter but guidance is vague","Staff turnover is constant — training never ends","Peak hours are chaos — orders get mixed up constantly","Waste management is expensive and inefficient"],Manufacturing:["Quality control catches problems too late in the line","Machine downtime costs us millions per year","Workers keep leaving for factories that pay slightly more","Supply chain disruptions are getting more frequent","Safety incidents happen because training is insufficient","Overtime is mandatory but barely pays more than regular hours"],Healthcare:["Patient records are still on paper at many facilities","Equipment maintenance is always behind schedule","Night shifts are understaffed and dangerous","Insurance paperwork takes longer than the actual treatment","Rural clinics lack basic diagnostic equipment"],Government:["Citizens wait hours for simple paperwork","Digital transformation is slow — everything still needs stamps and signatures","Budget allocation doesn't match actual needs","Coordination between departments is terrible","Public complaints go into a black hole"],Construction:["Material prices fluctuate wildly mid-project","Safety regulations are ignored under schedule pressure","Weather delays have no good contingency plans","Workers are undertrained on new building codes","Payment from contractors is always late"],"Transportation & logistics":["Route planning is manual and inefficient","Fuel costs eat into already thin margins","Package tracking is unreliable — customers call constantly","Traffic in major cities makes delivery times unpredictable","Vehicle maintenance is reactive instead of preventive"]},v1={Southeast:[.98,.56,.35],"Red River Delta":[.31,.8,.77],"Mekong Delta":[.59,.81,.7],"North Central":[.27,.72,.82],"South Central":[1,.52,.63],"Central Highlands":[.48,.41,.93],Northeast:[.56,.74,.93],Northwest:[.97,.86,.44]},Pv=["#FF6B35","#4ECDC4","#7B68EE","#FF85A2","#45B7D1","#96CEB4","#DDA0DD","#F7DC6F"],Ed={Technology:{query:"project management tool for developers",queryVi:"công cụ quản lý dự án phần mềm",competitors:["Jira","Notion","Linear"]},"Retail & e-commerce":{query:"e-commerce management tool",queryVi:"công cụ quản lý đơn hàng online",competitors:["Shopee Center","Haravan","Sapo"]},"Banking & finance":{query:"banking automation software",queryVi:"phần mềm tự động hóa ngân hàng",competitors:["FIS","Temenos","Finastra"]},"Agriculture & aquaculture":{query:"farm management app",queryVi:"giá nông sản hôm nay tra cứu",competitors:["Facebook groups","Zalo groups"]},Education:{query:"classroom management software",queryVi:"phần mềm quản lý lớp học",competitors:["Google Classroom","ClassDojo"]},"Tourism & hospitality":{query:"hotel management system",queryVi:"phần mềm quản lý khách sạn",competitors:["Cloudbeds","ezCloud","hotel.vn"]},"Food & beverage":{query:"restaurant POS system",queryVi:"phần mềm quản lý quán ăn",competitors:["KiotViet","iPOS","CukCuk"]},Manufacturing:{query:"factory production management",queryVi:"phần mềm quản lý sản xuất",competitors:["SAP","Oracle","Odoo"]},Healthcare:{query:"clinic management software",queryVi:"phần mềm quản lý phòng khám",competitors:["FPT Healthcare","VNPT-HIS"]},Government:{query:"public service digitization",queryVi:"phần mềm hành chính công",competitors:["VNPT","FPT IS"]},Construction:{query:"construction project estimator",queryVi:"phần mềm dự toán xây dựng",competitors:["Dự Toán GXD","Excel templates"]},"Transportation & logistics":{query:"fleet management software",queryVi:"phần mềm quản lý vận tải",competitors:["Abivin","LogiNext"]}};function zv(o,e="weight"){const i=o.reduce((l,u)=>l+u[e],0);let s=Math.random()*i;for(const l of o)if(s-=l[e],s<=0)return l;return o[o.length-1]}function Er(o){return o[Math.floor(Math.random()*o.length)]}function _0(o,e){return[...o].sort(()=>Math.random()-.5).slice(0,e)}function y1(o=1500){const e=[];for(let i=0;i<o;i++){const s=zv(g1),l=zv(_1),u=Math.random()<.49?"male":"female",h=Lv[s.region]||Lv.Southeast,d=Er(h),m=Ov[d.industry]?_0(Ov[d.industry],3):["No specific frustrations recorded"],p=Math.acos(1-2*(i+.5)/o),g=Math.PI*(1+Math.sqrt(5))*i,y=28+Math.random()*16,S=.25,M=Math.sin(p)*Math.cos(g),E=Math.sin(p)*Math.sin(g),A=Math.cos(p),x=v1[s.region]||[.7,.7,.7];e.push({id:i,x:(M+(Math.random()-.5)*S)*y,y:(E+(Math.random()-.5)*S)*y,z:(A+(Math.random()-.5)*S)*y,color:x,size:2.5+Math.random()*2.5,alpha:.75+Math.random()*.25,persona:{age:l.range,gender:u,province:s.name,region:s.region,jobTitle:d.title,industry:d.industry,companySize:Er(["solo/freelance","micro (<10)","small (10-50)","medium (50-200)","large (200-1000)"]),educationLevel:d.education,incomeBracket:d.income,primaryPlatform:d.platform,searchLanguage:d.lang,frustrations:m},matchScore:0,clusterId:null})}return e}function S1(o,e=3500){const i=[],s={};o.forEach((d,m)=>{const p=d.persona.region;s[p]||(s[p]=[]),s[p].push(m)});const l=new Set;for(const d of Object.keys(s)){const m=s[d],p=Math.floor(e*(m.length/o.length));let g=0,y=0;for(;g<p&&y<p*3;){y++;const S=Er(m),M=Er(m);if(S===M)continue;const E=Math.min(S,M)+"-"+Math.max(S,M);l.has(E)||(l.add(E),!(o[S].persona.industry!==o[M].persona.industry&&Math.random()>.3)&&(i.push([S,M]),g++))}}const u={};o.forEach((d,m)=>{const p=d.persona.industry;u[p]||(u[p]=[]),u[p].push(m)});let h=0;for(const d of Object.keys(u)){const m=u[d];if(!(m.length<2)){for(let p=0;p<Math.min(30,m.length);p++){const g=Er(m),y=Er(m);if(g===y)continue;const S=Math.min(g,y)+"-"+Math.max(g,y);if(!l.has(S)&&(l.add(S),i.push([g,y]),h++,h>500))break}if(h>500)break}}return i}function x1(o,e){const i=[...new Set(o.map(M=>M.persona.industry))],s=_0(i,3+Math.floor(Math.random()*3)),l=o.map(M=>{const E=s.includes(M.persona.industry);let A=0;return E?A=.55+Math.random()*.4:A=Math.random()*.45,{...M,matchScore:A}}),u=l.filter(M=>M.matchScore>.55),h={};u.forEach(M=>{const E=M.persona.industry;h[E]||(h[E]=[]),h[E].push(M.id)});const d=Object.entries(h).sort((M,E)=>E[1].length-M[1].length).slice(0,7),m=d.map(([M,E],A)=>{const x=Math.acos(1-2*(A+.5)/d.length),v=Math.PI*(1+Math.sqrt(5))*A,B=22,L=Ed[M]||{query:`best ${M.toLowerCase()} tool`,queryVi:`phần mềm ${M.toLowerCase()}`,competitors:["Google","Facebook"]},w=Math.random()>.55,q=w?Math.floor(Math.random()*8)+1:null,G=E.slice(0,20).map(U=>l[U]),O=Iv(G.map(U=>U.persona.province),2),j=Iv(G.map(U=>U.persona.age),1);return{id:A,name:`${M} in ${O.join(" & ")} (${j[0]})`,industry:M,color:Pv[A%Pv.length],nodeIds:E,size:E.length,center:{x:Math.sin(x)*Math.cos(v)*B,y:Math.sin(x)*Math.sin(v)*B,z:Math.cos(x)*B},found:w,rank:q,topQuery:L.queryVi,competitors:L.competitors,scanned:!1}});m.forEach(M=>{M.nodeIds.forEach(E=>{l[E].clusterId=M.id})});const g=m.filter(M=>M.found).reduce((M,E)=>M+E.size,0),y=u.length,S=y>0?Math.round(g/y*100):0;return{nodes:l,clusters:m,qualifying:u.length,discoverability:S,matchingIndustries:s}}function Iv(o,e){const i={};return o.forEach(s=>{i[s]=(i[s]||0)+1}),Object.entries(i).sort((s,l)=>l[1]-s[1]).slice(0,e).map(([s])=>s)}function M1(o,e){if(!e)return null;const i=Ed[o.persona.industry]||Ed.Technology,s=o.persona.searchLanguage==="english"?i.query:i.queryVi,l=(i.competitors||[]).map((u,h)=>({rank:h+1,title:u,url:`https://${u.toLowerCase().replace(/\s+/g,"")}.com`}));return e.found&&e.rank&&(l.splice(e.rank-1,0,{rank:e.rank,title:"Your Product",url:"https://yourproduct.com",isProduct:!0}),l.forEach((u,h)=>{u.rank=h+1})),{query:s,found:e.found,rank:e.rank,steps:[{done:!0,text:`Navigated to ${o.persona.searchLanguage==="english"?"google.com":"google.com.vn"}`},{done:!0,text:`Typed "${s}"`},{done:!0,text:"Extracted search results (page 1)"},{done:e.found,text:e.found?`Product found at rank #${e.rank}`:"Product URL not found in results"}],topResults:l}}function E1({node:o,cluster:e,onClose:i}){if(!o)return null;const s=o.persona,l=M1(o,e);return ht.jsxs("div",{className:"node-detail",children:[ht.jsxs("div",{className:"node-detail-header",children:[ht.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12},children:[ht.jsxs("h3",{children:["Persona #",o.id.toLocaleString()]}),e&&ht.jsx("span",{className:"node-detail-segment",style:{background:e.color},children:e.industry})]}),ht.jsx("button",{className:"node-detail-close",onClick:i,children:"×"})]}),ht.jsxs("div",{className:"node-detail-body",children:[ht.jsxs("div",{className:"node-detail-grid",children:[ht.jsx("span",{className:"node-detail-key",children:"Age"}),ht.jsx("span",{className:"node-detail-value",children:s.age}),ht.jsx("span",{className:"node-detail-key",children:"Gender"}),ht.jsx("span",{className:"node-detail-value",children:s.gender}),ht.jsx("span",{className:"node-detail-key",children:"Province"}),ht.jsxs("span",{className:"node-detail-value",children:[s.province," (",s.region,")"]}),ht.jsx("span",{className:"node-detail-key",children:"Job"}),ht.jsx("span",{className:"node-detail-value",children:s.jobTitle}),ht.jsx("span",{className:"node-detail-key",children:"Industry"}),ht.jsx("span",{className:"node-detail-value",children:s.industry}),ht.jsx("span",{className:"node-detail-key",children:"Company"}),ht.jsx("span",{className:"node-detail-value",children:s.companySize}),ht.jsx("span",{className:"node-detail-key",children:"Education"}),ht.jsx("span",{className:"node-detail-value",children:s.educationLevel}),ht.jsx("span",{className:"node-detail-key",children:"Income"}),ht.jsx("span",{className:"node-detail-value",children:s.incomeBracket}),ht.jsx("span",{className:"node-detail-key",children:"Platform"}),ht.jsx("span",{className:"node-detail-value",children:s.primaryPlatform}),ht.jsx("span",{className:"node-detail-key",children:"Language"}),ht.jsx("span",{className:"node-detail-value",children:s.searchLanguage})]}),ht.jsxs("div",{className:"node-detail-section",children:[ht.jsx("h4",{children:"Frustrations"}),s.frustrations.map((u,h)=>ht.jsx("div",{className:"frustration-item",children:u},h))]}),l&&ht.jsxs("div",{className:"node-detail-section",children:[ht.jsx("h4",{children:"Search Query"}),ht.jsx("div",{className:"search-query-box",children:ht.jsxs("div",{className:"search-query-text",children:["“",l.query,"”"]})}),ht.jsxs("div",{className:"search-match-row",children:[ht.jsx("span",{children:"Match Score:"}),ht.jsx("span",{style:{fontWeight:600},children:o.matchScore.toFixed(2)}),ht.jsx("span",{style:{margin:"0 4px"},children:"·"}),ht.jsx("span",{children:"Rank:"}),ht.jsx("span",{style:{fontWeight:600,color:l.found?"var(--found)":"var(--invisible)"},children:l.found?`#${l.rank}`:"Not found"})]})]}),l&&ht.jsxs("div",{className:"node-detail-section",children:[ht.jsx("h4",{children:"TinyFish Session"}),ht.jsxs("div",{className:"tinyfish-session",children:[ht.jsx("div",{className:"tinyfish-session-header",children:"TinyFish Agent"}),l.steps.map((u,h)=>ht.jsxs("div",{className:"tinyfish-step",children:[ht.jsx("span",{className:`tinyfish-step-icon ${u.done?"done":"fail"}`,children:u.done?"✓":"✗"}),ht.jsx("span",{children:u.text})]},h)),ht.jsxs("div",{className:"tinyfish-results",children:[ht.jsx("h5",{children:"Top results instead"}),l.topResults.slice(0,5).map((u,h)=>ht.jsxs("div",{className:`tinyfish-result-item ${u.isProduct?"is-product":""}`,children:[u.rank,". ",u.title," — ",u.url]},h))]})]})]})]})]})}function T1(){const[o,e]=Ze.useState("hero"),[i,s]=Ze.useState(""),[l,u]=Ze.useState([]),[h,d]=Ze.useState([]),[m,p]=Ze.useState([]),[g,y]=Ze.useState(0),[S,M]=Ze.useState(0),[E,A]=Ze.useState(null),[x,v]=Ze.useState(null),[B,L]=Ze.useState(null),w=Ze.useRef([]);Ze.useEffect(()=>{const et=y1(1500),Q=S1(et,3e3);u(et),d(Q)},[]),Ze.useEffect(()=>()=>{w.current.forEach(clearTimeout)},[]);function q(){e("input")}function G(){e("hero")}function O(et){s(et),e("clustering"),A(null);const Q=x1(l);u(Q.nodes),p(Q.clusters),y(Q.discoverability),M(Q.qualifying),w.current.forEach(clearTimeout),w.current=[];const dt=setTimeout(()=>{e("scanning"),Q.clusters.forEach((pt,P)=>{const X=setTimeout(()=>{if(p(F=>F.map(yt=>yt.id===pt.id?{...yt,scanned:!0}:yt)),P===Q.clusters.length-1){const F=setTimeout(()=>{e("results")},800);w.current.push(F)}},1200+P*1500);w.current.push(X)})},4e3);w.current.push(dt)}function j(et){o==="hero"||o==="input"||A(Q=>(Q==null?void 0:Q.id)===et.id?null:et)}function U(et,Q,dt){if(!et){L(null);return}L({x:Q,y:dt,jobTitle:et.persona.jobTitle,province:et.persona.province})}function C(){A(null)}const H=(E==null?void 0:E.clusterId)!==null&&(E==null?void 0:E.clusterId)!==void 0?m.find(et=>et.id===E.clusterId):null;return ht.jsxs("div",{className:"app",children:[ht.jsx(o1,{phase:o,nodes:l,edges:h,clusters:m,selectedNodeId:(E==null?void 0:E.id)??null,hoveredClusterId:x,onNodeClick:j,onNodeHover:U}),ht.jsx(l1,{visible:o==="hero",onTryIt:q}),ht.jsx(u1,{isOpen:o==="input",onClose:G,onRun:O}),o!=="hero"&&o!=="input"&&ht.jsx(f1,{productName:i}),(o==="clustering"||o==="scanning"||o==="results")&&ht.jsx(d1,{phase:o}),(o==="clustering"||o==="scanning"||o==="results")&&ht.jsx(p1,{clusters:m,onClusterHover:v}),o==="results"&&ht.jsx(m1,{clusters:m,discoverability:g,qualifying:S}),E&&ht.jsx(E1,{node:E,cluster:H,onClose:C}),B&&ht.jsxs("div",{className:"tooltip",style:{left:B.x+14,top:B.y+14},children:[ht.jsx("div",{className:"tooltip-job",children:B.jobTitle}),ht.jsx("div",{className:"tooltip-location",children:B.province})]})]})}NS.createRoot(document.getElementById("root")).render(ht.jsx(Ze.StrictMode,{children:ht.jsx(T1,{})}));
