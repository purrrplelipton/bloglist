import{d as Vt,P as H,r as x,A as Ge,j as r,H as Zt,e as Kt,T as Jt,f as Qt,g as en,h as tn,X as nn,i as on,c as yt,k as an,M as sn,l as rn,L as ln,U as cn}from"./index-63495004.js";import{u as un,g as mn}from"./user-efedc070.js";import{v as P}from"./v4-a960c1f4.js";const Ye=Vt.create({baseURL:"http://localhost:3000/api/blogs"});async function fn(){const{data:a}=await Ye.get("/");return a}async function dn(a){const n=localStorage.getItem("bloglist");if(n){const{token:l}=JSON.parse(n),{data:s}=await Ye.post("/",a,{headers:{Authorization:`Bearer ${l}`}});return s}}async function fe(a,n){const l=localStorage.getItem("bloglist");if(l){const{token:s}=JSON.parse(l),{data:m}=await Ye.patch(`/${a}`,n,{headers:{Authorization:`Bearer ${s}`}});return m}}const pn="_blog_fmaa2_1",hn="_blog-title_fmaa2_15",_n="_blog-doohickeys_fmaa2_35",Tn="_fave-toggle-btn_fmaa2_39",gn="_blog-thumbnail_fmaa2_57",bn="_btn-wrapper_fmaa2_62",En="_blog-content_fmaa2_79",J={blog:pn,"blog-title":"_blog-title_fmaa2_15",blogTitle:hn,"blog-doohickeys":"_blog-doohickeys_fmaa2_35",blogDoohickeys:_n,"fave-toggle-btn":"_fave-toggle-btn_fmaa2_39",faveToggleBtn:Tn,"blog-thumbnail":"_blog-thumbnail_fmaa2_57",blogThumbnail:gn,"btn-wrapper":"_btn-wrapper_fmaa2_62",btnWrapper:bn,"blog-content":"_blog-content_fmaa2_79",blogContent:En},Rt=({blog:a})=>{const{dispatch:n}=x.useContext(Ge),{homeStates:{faves:l},homeDispatch:s}=x.useContext(ie),[m,f]=x.useState({isAFave:l.includes(a.id),isLiked:!1,isDisliked:!1});x.useEffect(()=>{const E=localStorage.getItem("bloglist");if(E){const{id:p}=JSON.parse(E);a.likes.includes(p)?f(u=>({...u,isLiked:!0})):a.dislikes.includes(p)&&f(u=>({...u,isDisliked:!0}))}},[m.isLiked,m.isDisliked,f]);function _(E){un({favorites:m.isAFave?l.filter(p=>p!==p):[...l,E]}).then(({favorites:p})=>{s(u=>({...u,faves:p})),f(u=>({...u,isAFave:!u.isAFave})),n(u=>({...u,notifs:u.notifs.concat({message:p.includes(E)?"Blog added to favorites":"Blog removed from favorites",color:"info",id:P()})}))}).catch(({message:p})=>n(u=>({...u,notifs:u.notifs.concat({message:p,color:"error",id:P()})})))}async function U(){const E=localStorage.getItem("bloglist");if(E){const{id:p}=JSON.parse(E);if(m.isLiked)try{const{likes:u}=await fe(a.id,{userId:p,likes:a.likes.filter(c=>c!==p)});f(c=>({...c,isLiked:u.includes(p)})),n(c=>({...c,blogs:c.blogs.map(g=>g.id===a.id?{...g,likes:u}:g)}))}catch({message:u}){n(c=>({...c,notifs:c.notifs.concat({message:u,color:"error",id:P()})}))}else try{const{likes:u}=await fe(a.id,{userId:p,likes:[...a.likes,p]});f(c=>({...c,likes:u.includes(p)})),n(c=>({...c,blogs:c.blogs.map(g=>g.id===a.id?{...g,likes:u}:g)}))}catch({message:u}){n(c=>({...c,notifs:c.notifs.concat({message:u,color:"error",id:P()})}))}}}async function w(){const E=localStorage.getItem("bloglist");if(console.log(E),E){const{id:p}=JSON.parse(E);if(console.log(p),m.isDisliked)try{const{dislikes:u}=await fe(a.id,{userId:p,dislikes:a.dislikes.filter(c=>c!==p)});f(c=>({...c,isDisliked:u.includes(p)})),n(c=>({...c,blogs:c.blogs.map(g=>g.id===a.id?{...g,dislikes:u}:g)}))}catch({message:u}){n(c=>({...c,notifs:c.notifs.concat({message:u,color:"error",id:P()})}))}else try{const{dislikes:u}=fe(a.id,{userId:p,dislikes:[...a.dislikes,p]});f(c=>({...c,dislikes:u.includes(p)})),n(c=>({...c,blogs:c.blogs.map(g=>g.id===a.id?{...g,dislikes:u}:g)}))}catch({message:u}){n(c=>({...c,notifs:c.notifs.concat({message:u,color:"error",id:P()})}))}}}return r.jsxs("article",{className:`${J.blog} blog-${a.id}`,children:[r.jsx("p",{className:J.blogTitle,children:a.title}),r.jsxs("div",{className:J.blogDoohickeys,children:[r.jsx("div",{className:J.faveToggleBtn,children:r.jsx("button",{"aria-label":m.isAFave?"remove from favorites":"add to favoriites",onClick:()=>_(a.id),children:m.isAFave?r.jsx(Zt,{}):r.jsx(Kt,{})})}),a.thumbnail&&r.jsx("img",{className:J.blogThumbnail,src:a.thumbnail,alt:`thumbnail for blog titled: ${a.title}`}),r.jsxs("div",{className:J.btnWrapper,children:[r.jsx("button",{type:"button","aria-label":m.isLiked?"Remove like":"Like",onClick:U,children:m.isLiked?r.jsx(Jt,{}):r.jsx(Qt,{})}),r.jsx("button",{type:"button","aria-label":m.isDisliked?"Remove dislike":"Disike",onClick:w,children:m.isDisliked?r.jsx(en,{}):r.jsx(tn,{})})]})]})]})};Rt.propTypes={blog:H.object.isRequired};/*! @license DOMPurify 3.0.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.0.5/LICENSE */const{entries:xt,setPrototypeOf:ht,isFrozen:An,getPrototypeOf:Sn,getOwnPropertyDescriptor:yn}=Object;let{freeze:D,seal:C,create:Rn}=Object,{apply:He,construct:ze}=typeof Reflect<"u"&&Reflect;He||(He=function(n,l,s){return n.apply(l,s)});D||(D=function(n){return n});C||(C=function(n){return n});ze||(ze=function(n,l){return new n(...l)});const xn=O(Array.prototype.forEach),_t=O(Array.prototype.pop),oe=O(Array.prototype.push),he=O(String.prototype.toLowerCase),Ce=O(String.prototype.toString),Nn=O(String.prototype.match),k=O(String.prototype.replace),Dn=O(String.prototype.indexOf),Ln=O(String.prototype.trim),L=O(RegExp.prototype.test),ae=wn(TypeError);function O(a){return function(n){for(var l=arguments.length,s=new Array(l>1?l-1:0),m=1;m<l;m++)s[m-1]=arguments[m];return He(a,n,s)}}function wn(a){return function(){for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return ze(a,l)}}function d(a,n,l){var s;l=(s=l)!==null&&s!==void 0?s:he,ht&&ht(a,null);let m=n.length;for(;m--;){let f=n[m];if(typeof f=="string"){const _=l(f);_!==f&&(An(n)||(n[m]=_),f=_)}a[f]=!0}return a}function Q(a){const n=Rn(null);for(const[l,s]of xt(a))n[l]=s;return n}function de(a,n){for(;a!==null;){const s=yn(a,n);if(s){if(s.get)return O(s.get);if(typeof s.value=="function")return O(s.value)}a=Sn(a)}function l(s){return console.warn("fallback value for",s),null}return l}const Tt=D(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ve=D(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Me=D(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),In=D(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Pe=D(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),On=D(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),gt=D(["#text"]),bt=D(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),Ue=D(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Et=D(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),pe=D(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),kn=C(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Cn=C(/<%[\w\W]*|[\w\W]*%>/gm),vn=C(/\${[\w\W]*}/gm),Mn=C(/^data-[\-\w.\u00B7-\uFFFF]/),Pn=C(/^aria-[\-\w]+$/),Nt=C(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Un=C(/^(?:\w+script|data):/i),Fn=C(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Dt=C(/^html$/i);var At=Object.freeze({__proto__:null,MUSTACHE_EXPR:kn,ERB_EXPR:Cn,TMPLIT_EXPR:vn,DATA_ATTR:Mn,ARIA_ATTR:Pn,IS_ALLOWED_URI:Nt,IS_SCRIPT_OR_DATA:Un,ATTR_WHITESPACE:Fn,DOCTYPE_NAME:Dt});const jn=()=>typeof window>"u"?null:window,Hn=function(n,l){if(typeof n!="object"||typeof n.createPolicy!="function")return null;let s=null;const m="data-tt-policy-suffix";l&&l.hasAttribute(m)&&(s=l.getAttribute(m));const f="dompurify"+(s?"#"+s:"");try{return n.createPolicy(f,{createHTML(_){return _},createScriptURL(_){return _}})}catch{return console.warn("TrustedTypes policy "+f+" could not be created."),null}};function Lt(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:jn();const n=i=>Lt(i);if(n.version="3.0.5",n.removed=[],!a||!a.document||a.document.nodeType!==9)return n.isSupported=!1,n;const l=a.document,s=l.currentScript;let{document:m}=a;const{DocumentFragment:f,HTMLTemplateElement:_,Node:U,Element:w,NodeFilter:E,NamedNodeMap:p=a.NamedNodeMap||a.MozNamedAttrMap,HTMLFormElement:u,DOMParser:c,trustedTypes:g}=a,Y=w.prototype,It=de(Y,"cloneNode"),Ot=de(Y,"nextSibling"),kt=de(Y,"childNodes"),_e=de(Y,"parentNode");if(typeof _=="function"){const i=m.createElement("template");i.content&&i.content.ownerDocument&&(m=i.content.ownerDocument)}let N,ee="";const{implementation:Te,createNodeIterator:Ct,createDocumentFragment:vt,getElementsByTagName:Mt}=m,{importNode:Pt}=l;let v={};n.isSupported=typeof xt=="function"&&typeof _e=="function"&&Te&&Te.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:ge,ERB_EXPR:be,TMPLIT_EXPR:Ee,DATA_ATTR:Ut,ARIA_ATTR:Ft,IS_SCRIPT_OR_DATA:jt,ATTR_WHITESPACE:qe}=At;let{IS_ALLOWED_URI:$e}=At,A=null;const Xe=d({},[...Tt,...ve,...Me,...Pe,...gt]);let S=null;const Ve=d({},[...bt,...Ue,...Et,...pe]);let b=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),te=null,Ae=null,Ze=!0,Se=!0,Ke=!1,Je=!0,q=!1,z=!1,ye=!1,Re=!1,$=!1,se=!1,re=!1,Qe=!0,et=!1;const Ht="user-content-";let xe=!0,ne=!1,X={},V=null;const tt=d({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let nt=null;const ot=d({},["audio","video","img","source","image","track"]);let Ne=null;const at=d({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),le="http://www.w3.org/1998/Math/MathML",ce="http://www.w3.org/2000/svg",F="http://www.w3.org/1999/xhtml";let Z=F,De=!1,Le=null;const zt=d({},[le,ce,F],Ce);let W;const Wt=["application/xhtml+xml","text/html"],Bt="text/html";let y,K=null;const Gt=m.createElement("form"),it=function(e){return e instanceof RegExp||e instanceof Function},we=function(e){if(!(K&&K===e)){if((!e||typeof e!="object")&&(e={}),e=Q(e),W=Wt.indexOf(e.PARSER_MEDIA_TYPE)===-1?W=Bt:W=e.PARSER_MEDIA_TYPE,y=W==="application/xhtml+xml"?Ce:he,A="ALLOWED_TAGS"in e?d({},e.ALLOWED_TAGS,y):Xe,S="ALLOWED_ATTR"in e?d({},e.ALLOWED_ATTR,y):Ve,Le="ALLOWED_NAMESPACES"in e?d({},e.ALLOWED_NAMESPACES,Ce):zt,Ne="ADD_URI_SAFE_ATTR"in e?d(Q(at),e.ADD_URI_SAFE_ATTR,y):at,nt="ADD_DATA_URI_TAGS"in e?d(Q(ot),e.ADD_DATA_URI_TAGS,y):ot,V="FORBID_CONTENTS"in e?d({},e.FORBID_CONTENTS,y):tt,te="FORBID_TAGS"in e?d({},e.FORBID_TAGS,y):{},Ae="FORBID_ATTR"in e?d({},e.FORBID_ATTR,y):{},X="USE_PROFILES"in e?e.USE_PROFILES:!1,Ze=e.ALLOW_ARIA_ATTR!==!1,Se=e.ALLOW_DATA_ATTR!==!1,Ke=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Je=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,q=e.SAFE_FOR_TEMPLATES||!1,z=e.WHOLE_DOCUMENT||!1,$=e.RETURN_DOM||!1,se=e.RETURN_DOM_FRAGMENT||!1,re=e.RETURN_TRUSTED_TYPE||!1,Re=e.FORCE_BODY||!1,Qe=e.SANITIZE_DOM!==!1,et=e.SANITIZE_NAMED_PROPS||!1,xe=e.KEEP_CONTENT!==!1,ne=e.IN_PLACE||!1,$e=e.ALLOWED_URI_REGEXP||Nt,Z=e.NAMESPACE||F,b=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&it(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(b.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&it(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(b.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(b.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),q&&(Se=!1),se&&($=!0),X&&(A=d({},[...gt]),S=[],X.html===!0&&(d(A,Tt),d(S,bt)),X.svg===!0&&(d(A,ve),d(S,Ue),d(S,pe)),X.svgFilters===!0&&(d(A,Me),d(S,Ue),d(S,pe)),X.mathMl===!0&&(d(A,Pe),d(S,Et),d(S,pe))),e.ADD_TAGS&&(A===Xe&&(A=Q(A)),d(A,e.ADD_TAGS,y)),e.ADD_ATTR&&(S===Ve&&(S=Q(S)),d(S,e.ADD_ATTR,y)),e.ADD_URI_SAFE_ATTR&&d(Ne,e.ADD_URI_SAFE_ATTR,y),e.FORBID_CONTENTS&&(V===tt&&(V=Q(V)),d(V,e.FORBID_CONTENTS,y)),xe&&(A["#text"]=!0),z&&d(A,["html","head","body"]),A.table&&(d(A,["tbody"]),delete te.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!="function")throw ae('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ae('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=e.TRUSTED_TYPES_POLICY,ee=N.createHTML("")}else N===void 0&&(N=Hn(g,s)),N!==null&&typeof ee=="string"&&(ee=N.createHTML(""));D&&D(e),K=e}},st=d({},["mi","mo","mn","ms","mtext"]),rt=d({},["foreignobject","desc","title","annotation-xml"]),Yt=d({},["title","style","font","a","script"]),ue=d({},ve);d(ue,Me),d(ue,In);const Ie=d({},Pe);d(Ie,On);const qt=function(e){let t=_e(e);(!t||!t.tagName)&&(t={namespaceURI:Z,tagName:"template"});const o=he(e.tagName),h=he(t.tagName);return Le[e.namespaceURI]?e.namespaceURI===ce?t.namespaceURI===F?o==="svg":t.namespaceURI===le?o==="svg"&&(h==="annotation-xml"||st[h]):!!ue[o]:e.namespaceURI===le?t.namespaceURI===F?o==="math":t.namespaceURI===ce?o==="math"&&rt[h]:!!Ie[o]:e.namespaceURI===F?t.namespaceURI===ce&&!rt[h]||t.namespaceURI===le&&!st[h]?!1:!Ie[o]&&(Yt[o]||!ue[o]):!!(W==="application/xhtml+xml"&&Le[e.namespaceURI]):!1},B=function(e){oe(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch{e.remove()}},Oe=function(e,t){try{oe(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch{oe(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!S[e])if($||se)try{B(t)}catch{}else try{t.setAttribute(e,"")}catch{}},lt=function(e){let t,o;if(Re)e="<remove></remove>"+e;else{const I=Nn(e,/^[\r\n\t ]+/);o=I&&I[0]}W==="application/xhtml+xml"&&Z===F&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const h=N?N.createHTML(e):e;if(Z===F)try{t=new c().parseFromString(h,W)}catch{}if(!t||!t.documentElement){t=Te.createDocument(Z,"template",null);try{t.documentElement.innerHTML=De?ee:h}catch{}}const R=t.body||t.documentElement;return e&&o&&R.insertBefore(m.createTextNode(o),R.childNodes[0]||null),Z===F?Mt.call(t,z?"html":"body")[0]:z?t.documentElement:R},ct=function(e){return Ct.call(e.ownerDocument||e,e,E.SHOW_ELEMENT|E.SHOW_COMMENT|E.SHOW_TEXT,null,!1)},$t=function(e){return e instanceof u&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof p)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},me=function(e){return typeof U=="object"?e instanceof U:e&&typeof e=="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"},j=function(e,t,o){v[e]&&xn(v[e],h=>{h.call(n,t,o,K)})},ut=function(e){let t;if(j("beforeSanitizeElements",e,null),$t(e))return B(e),!0;const o=y(e.nodeName);if(j("uponSanitizeElement",e,{tagName:o,allowedTags:A}),e.hasChildNodes()&&!me(e.firstElementChild)&&(!me(e.content)||!me(e.content.firstElementChild))&&L(/<[/\w]/g,e.innerHTML)&&L(/<[/\w]/g,e.textContent))return B(e),!0;if(!A[o]||te[o]){if(!te[o]&&ft(o)&&(b.tagNameCheck instanceof RegExp&&L(b.tagNameCheck,o)||b.tagNameCheck instanceof Function&&b.tagNameCheck(o)))return!1;if(xe&&!V[o]){const h=_e(e)||e.parentNode,R=kt(e)||e.childNodes;if(R&&h){const I=R.length;for(let T=I-1;T>=0;--T)h.insertBefore(It(R[T],!0),Ot(e))}}return B(e),!0}return e instanceof w&&!qt(e)||(o==="noscript"||o==="noembed"||o==="noframes")&&L(/<\/no(script|embed|frames)/i,e.innerHTML)?(B(e),!0):(q&&e.nodeType===3&&(t=e.textContent,t=k(t,ge," "),t=k(t,be," "),t=k(t,Ee," "),e.textContent!==t&&(oe(n.removed,{element:e.cloneNode()}),e.textContent=t)),j("afterSanitizeElements",e,null),!1)},mt=function(e,t,o){if(Qe&&(t==="id"||t==="name")&&(o in m||o in Gt))return!1;if(!(Se&&!Ae[t]&&L(Ut,t))){if(!(Ze&&L(Ft,t))){if(!S[t]||Ae[t]){if(!(ft(e)&&(b.tagNameCheck instanceof RegExp&&L(b.tagNameCheck,e)||b.tagNameCheck instanceof Function&&b.tagNameCheck(e))&&(b.attributeNameCheck instanceof RegExp&&L(b.attributeNameCheck,t)||b.attributeNameCheck instanceof Function&&b.attributeNameCheck(t))||t==="is"&&b.allowCustomizedBuiltInElements&&(b.tagNameCheck instanceof RegExp&&L(b.tagNameCheck,o)||b.tagNameCheck instanceof Function&&b.tagNameCheck(o))))return!1}else if(!Ne[t]){if(!L($e,k(o,qe,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&Dn(o,"data:")===0&&nt[e])){if(!(Ke&&!L(jt,k(o,qe,"")))){if(o)return!1}}}}}}return!0},ft=function(e){return e.indexOf("-")>0},dt=function(e){let t,o,h,R;j("beforeSanitizeAttributes",e,null);const{attributes:I}=e;if(!I)return;const T={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:S};for(R=I.length;R--;){t=I[R];const{name:M,namespaceURI:ke}=t;if(o=M==="value"?t.value:Ln(t.value),h=y(M),T.attrName=h,T.attrValue=o,T.keepAttr=!0,T.forceKeepAttr=void 0,j("uponSanitizeAttribute",e,T),o=T.attrValue,T.forceKeepAttr||(Oe(M,e),!T.keepAttr))continue;if(!Je&&L(/\/>/i,o)){Oe(M,e);continue}q&&(o=k(o,ge," "),o=k(o,be," "),o=k(o,Ee," "));const pt=y(e.nodeName);if(mt(pt,h,o)){if(et&&(h==="id"||h==="name")&&(Oe(M,e),o=Ht+o),N&&typeof g=="object"&&typeof g.getAttributeType=="function"&&!ke)switch(g.getAttributeType(pt,h)){case"TrustedHTML":{o=N.createHTML(o);break}case"TrustedScriptURL":{o=N.createScriptURL(o);break}}try{ke?e.setAttributeNS(ke,M,o):e.setAttribute(M,o),_t(n.removed)}catch{}}}j("afterSanitizeAttributes",e,null)},Xt=function i(e){let t;const o=ct(e);for(j("beforeSanitizeShadowDOM",e,null);t=o.nextNode();)j("uponSanitizeShadowNode",t,null),!ut(t)&&(t.content instanceof f&&i(t.content),dt(t));j("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(i){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t,o,h,R;if(De=!i,De&&(i="<!-->"),typeof i!="string"&&!me(i))if(typeof i.toString=="function"){if(i=i.toString(),typeof i!="string")throw ae("dirty is not a string, aborting")}else throw ae("toString is not a function");if(!n.isSupported)return i;if(ye||we(e),n.removed=[],typeof i=="string"&&(ne=!1),ne){if(i.nodeName){const M=y(i.nodeName);if(!A[M]||te[M])throw ae("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof U)t=lt("<!---->"),o=t.ownerDocument.importNode(i,!0),o.nodeType===1&&o.nodeName==="BODY"||o.nodeName==="HTML"?t=o:t.appendChild(o);else{if(!$&&!q&&!z&&i.indexOf("<")===-1)return N&&re?N.createHTML(i):i;if(t=lt(i),!t)return $?null:re?ee:""}t&&Re&&B(t.firstChild);const I=ct(ne?i:t);for(;h=I.nextNode();)ut(h)||(h.content instanceof f&&Xt(h.content),dt(h));if(ne)return i;if($){if(se)for(R=vt.call(t.ownerDocument);t.firstChild;)R.appendChild(t.firstChild);else R=t;return(S.shadowroot||S.shadowrootmode)&&(R=Pt.call(l,R,!0)),R}let T=z?t.outerHTML:t.innerHTML;return z&&A["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&L(Dt,t.ownerDocument.doctype.name)&&(T="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+T),q&&(T=k(T,ge," "),T=k(T,be," "),T=k(T,Ee," ")),N&&re?N.createHTML(T):T},n.setConfig=function(i){we(i),ye=!0},n.clearConfig=function(){K=null,ye=!1},n.isValidAttribute=function(i,e,t){K||we({});const o=y(i),h=y(e);return mt(o,h,t)},n.addHook=function(i,e){typeof e=="function"&&(v[i]=v[i]||[],oe(v[i],e))},n.removeHook=function(i){if(v[i])return _t(v[i])},n.removeHooks=function(i){v[i]&&(v[i]=[])},n.removeAllHooks=function(){v={}},n}var We=Lt();const zn="_input_p4mpc_1",Wn={input:zn},Be=({label:a,placeholder:n,value:l,onInput:s,...m})=>{const f=x.useRef(null);x.useEffect(()=>{f.current&&(f.current.textContent=l||"")},[l]);function _(){if(f.current){const w=We.sanitize(f.current.textContent);s(w)}}function U(w){w.key==="Enter"&&!w.shiftKey&&w.preventDefault()}return r.jsx("div",{contentEditable:!0,role:"textbox","aria-label":a,"data-placeholder":n,onInput:_,onKeyDown:U,ref:f,className:Wn.input,"aria-multiline":"true",spellCheck:!0,tabIndex:0,...m})};Be.propTypes={label:H.string,placeholder:H.string,value:H.string,onInput:H.func.isRequired};const Bn="_overlay_1k6gf_1",Gn="_content_1k6gf_15",Yn="_close-btn_1k6gf_20",Fe={overlay:Bn,content:Gn,"close-btn":"_close-btn_1k6gf_20",closeBtn:Yn},wt=({isOpen:a,onClose:n,children:l})=>a?r.jsx("div",{className:Fe.overlay,children:r.jsxs("div",{className:Fe.content,children:[r.jsx("button",{type:"button","aria-label":"close",onClick:n,className:Fe.closeBtn,children:r.jsx(nn,{})}),l]})}):null;wt.propTypes={isOpen:H.bool.isRequired,onClose:H.func.isRequired,children:H.node.isRequired};const qn="_form-wrapper_mv4d9_1",$n="_create-form_mv4d9_6",Xn="_field-wrapper_mv4d9_18",Vn="_content-wrapper_mv4d9_34",Zn="_choose-thumbnail_mv4d9_42",Kn="_thumbnail-preview_mv4d9_71",G={"form-wrapper":"_form-wrapper_mv4d9_1",formWrapper:qn,"create-form":"_create-form_mv4d9_6",createForm:$n,"field-wrapper":"_field-wrapper_mv4d9_18",fieldWrapper:Xn,"content-wrapper":"_content-wrapper_mv4d9_34",contentWrapper:Vn,"choose-thumbnail":"_choose-thumbnail_mv4d9_42",chooseThumbnail:Zn,"thumbnail-preview":"_thumbnail-preview_mv4d9_71",thumbnailPreview:Kn},St={title:"",content:"",thumbnail:null},Jn=()=>{const{dispatch:a}=x.useContext(Ge),{homeStates:{formIsOpen:n},homeDispatch:l}=x.useContext(ie),[s,m]=x.useState(St),[f,_]=x.useState(!1);function U(){l(p=>({...p,formIsOpen:!1}))}function w(p){p.preventDefault(),_(!0),dn(s).then(u=>{l(c=>({...c,blogs:[...c.blogs,u]})),a(c=>({...c,notifs:c.notifs.concat({message:"Blog Uploaded",color:"success",id:P()})}))}).catch(({message:u})=>a(c=>({...c,notifs:c.notifs.concat({message:u,color:"error",id:P()})}))).finally(()=>{_(!1),m(St)})}function E(p){const u=p.target.files[0],c=new FileReader;c.onload=g=>m(Y=>({...Y,thumbnail:g.target.result})),c.readAsDataURL(u)}return r.jsx(wt,{isOpen:n,onClose:U,children:r.jsx("div",{className:G.formWrapper,children:r.jsxs("form",{action:"/upload-blog",method:"POST",encType:"multipart/form-data",onSubmit:w,className:G.createForm,children:[r.jsx("div",{className:G.fieldWrapper,children:r.jsx(Be,{label:"Title",placeholder:"title",onInput:p=>m(u=>({...u,title:p})),value:We.sanitize(s.title)})}),r.jsx("div",{className:[G.fieldWrapper,G.contentWrapper].join(" "),children:r.jsx(Be,{label:"Content",placeholder:"content",onInput:p=>m(u=>({...u,content:p})),value:We.sanitize(s.content)})}),r.jsxs("div",{className:G.chooseThumbnail,children:[r.jsxs("label",{htmlFor:"blog-thumbnail",children:[r.jsx(on,{}),s.thumbnail?"change":"pick a"," thumbnail"]}),r.jsx("input",{type:"file",accept:"image/*",name:"thumbnail",id:"blog-thumbnail",onChange:E}),s.thumbnail&&r.jsx("img",{src:s.thumbnail,alt:"Thumbnail Preview",className:G.thumbnailPreview})]}),r.jsx("button",{type:"submit",disabled:!(s.title.trim()&&s.content.trim())||f,"aria-label":"upload blog",children:f?r.jsx(yt,{width:18}):"upload"})]})})})},Qn="_toolbar_1s2nz_1",eo="_X7tY4Z_1s2nz_1",to="_X7tY4Z_1s2nz_1",no={toolbar:Qn,X7tY4Z:eo,x7TY4Z:to},oo=()=>{const{homeDispatch:a}=x.useContext(ie);return r.jsx("footer",{className:no.toolbar,children:r.jsx("button",{"aria-label":"create blog",type:"button",onClick:()=>a(n=>({...n,formIsOpen:!0})),children:r.jsx(an,{})})})},ao="_header_cq9qd_1",io="_drawer-toggler_cq9qd_19",so="_user-info_cq9qd_63",je={header:ao,"drawer-toggler":"_drawer-toggler_cq9qd_19",drawerToggler:io,"user-info":"_user-info_cq9qd_63",userInfo:so},ro=()=>{const{homeStates:{drawerIsOpen:a,searchQuery:n},homeDispatch:l}=x.useContext(ie);return r.jsxs("header",{className:je.header,children:[r.jsx("button",{type:"button",className:je.drawerToggler,onClick:()=>l(s=>({...s,drawerIsOpen:!s.drawerIsOpen})),"aria-label":a?"close side-drawer":"open side-drawer",children:r.jsx(sn,{})}),r.jsxs("label",{htmlFor:"blog-search",children:[r.jsx(rn,{}),r.jsx("input",{type:"text",id:"blog-search",value:n,onChange:s=>l(m=>({...m,searchQuery:s.target.value})),placeholder:"search"})]}),r.jsx(ln,{"aria-label":"my account",to:"/acc",className:je.userInfo,children:r.jsx(cn,{})})]})},lo="_blogs_1mcdc_1",co={blogs:lo},ie=x.createContext(null),uo=()=>{const{dispatch:a}=x.useContext(Ge);JSON.parse(localStorage.getItem("bloglist"));const[n,l]=x.useState({drawerIsOpen:!1,searchQuery:"",blogs:[],faves:[],formIsOpen:!1}),[s,m]=x.useState(!1);return x.useEffect(()=>{m(!0),fn().then(f=>l(_=>({..._,blogs:f}))).catch(({message:f})=>a(_=>({notifs:_.notifs.concat({message:f,color:["secondary","info","success","warning","error"][Math.floor(Math.random()*5)],id:P()})}))).finally(()=>m(!1))},[]),x.useEffect(()=>{mn().then(({favorites:f})=>l(_=>({..._,faves:f}))).catch(({message:f})=>{a(_=>({..._,notifs:_.notifs.concat({message:f,color:"error",id:P()})}))})},[]),r.jsxs(ie.Provider,{value:{homeStates:n,homeDispatch:l},children:[r.jsx(ro,{}),r.jsx("section",{className:co.blogs,"aria-live":"polite",children:s?r.jsx(yt,{text:"Please wait",width:40}):n.blogs.map(f=>r.jsx(Rt,{blog:f},f.id))}),r.jsx(Jn,{}),r.jsx(oo,{})]})},_o=uo;export{_o as Home,ie as HomeContext};