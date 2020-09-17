!function(E,y,C,o){"use strict";var i=function t(e,i){return new t.Instance(e,i||{})},c=i.globalSettings={scrollMinUpdateInterval:25,checkFrequency:1e3,pauseCheck:!1};i.defaults={preventParentScroll:!1,forceScrollbars:!1,scrollStopDelay:300,maxTrackSize:95,minTrackSize:5,draggableTracks:!0,autoUpdate:!0,classPrefix:"optiscroll-",wrapContent:!0,rtl:!1},(i.Instance=function(t,e){this.element=t,this.settings=S(S({},i.defaults),e||{}),"boolean"!=typeof e.rtl&&(this.settings.rtl="rtl"===E.getComputedStyle(t).direction),this.cache={},this.init()}).prototype={init:function(){var t=this.element,e=this.settings,i=!1,l=this.scrollEl=e.wrapContent?u.createWrapper(t):t.firstElementChild;T(l,e.classPrefix+"content",!0),T(t,"is-enabled"+(e.rtl?" is-rtl":""),!0),this.scrollbars={v:s("v",this),h:s("h",this)},(w.scrollbarSpec.width||e.forceScrollbars)&&(i=u.hideNativeScrollbars(l,e.rtl)),i&&h(this.scrollbars,"create"),w.isTouch&&e.preventParentScroll&&T(t,e.classPrefix+"prevent",!0),this.update(),this.bind(),e.autoUpdate&&w.instances.push(this),e.autoUpdate&&!w.checkTimer&&u.checkLoop()},bind:function(){var l,s,r,n,t=this.listeners={},e=this.scrollEl;for(var i in t.scroll=(l=a.scroll.bind(this),s=c.scrollMinUpdateInterval,function(){var t=this,e=Date.now(),i=arguments;r&&e<r+s?(clearTimeout(n),n=setTimeout(function(){r=e,l.apply(t,i)},s)):(r=e,l.apply(t,i))}),w.isTouch&&(t.touchstart=a.touchstart.bind(this),t.touchend=a.touchend.bind(this)),t.mousewheel=t.wheel=a.wheel.bind(this),t)e.addEventListener(i,t[i],w.passiveEvent)},update:function(){var t=this.scrollEl,e=this.cache,i=e.clientH,l=t.scrollHeight,s=t.clientHeight,r=t.scrollWidth,n=t.clientWidth;if(l!==e.scrollH||s!==e.clientH||r!==e.scrollW||n!==e.clientW){if(e.scrollH=l,e.clientH=s,e.scrollW=r,e.clientW=n,i!==o){if(0===l&&0===s&&!y.body.contains(this.element))return this.destroy(),!1;this.fireCustomEvent("sizechange")}h(this.scrollbars,"update")}},scrollTo:function(t,e,i){var l,s,r,n,o=this.cache;w.pauseCheck=!0,this.update(),l=this.scrollEl.scrollLeft,s=this.scrollEl.scrollTop,r=+t,"left"===t&&(r=0),"right"===t&&(r=o.scrollW-o.clientW),!1===t&&(r=l),n=+e,"top"===e&&(n=0),"bottom"===e&&(n=o.scrollH-o.clientH),!1===e&&(n=s),this.animateScroll(l,r,s,n,+i)},scrollIntoView:function(t,e,i){var l,s,r,n,o,c,a,h,u,p,d,f,v=this.scrollEl;w.pauseCheck=!0,this.update(),"string"==typeof t?t=v.querySelector(t):t.length&&t.jquery&&(t=t[0]),"number"==typeof i&&(i={top:i,right:i,bottom:i,left:i}),i=i||{},l=t.getBoundingClientRect(),s=v.getBoundingClientRect(),u=d=v.scrollLeft,p=f=v.scrollTop,a=u+l.left-s.left,h=p+l.top-s.top,r=a-(i.left||0),n=h-(i.top||0),r<u&&(d=r),u<(o=a+l.width-this.cache.clientW+(i.right||0))&&(d=o),n<p&&(f=n),p<(c=h+l.height-this.cache.clientH+(i.bottom||0))&&(f=c),this.animateScroll(u,d,p,f,+e)},animateScroll:function(l,s,r,n,o){var c=this,a=this.scrollEl,h=Date.now();if(s!==l||n!==r){if(0===o)return a.scrollLeft=s,void(a.scrollTop=n);isNaN(o)&&(o=15*C.pow(C.max(C.abs(s-l),C.abs(n-r)),.54)),function t(){var e=C.min(1,(Date.now()-h)/o),i=u.easingFunction(e);n!==r&&(a.scrollTop=~~(i*(n-r))+r),s!==l&&(a.scrollLeft=~~(i*(s-l))+l),c.scrollAnimation=e<1?E.requestAnimationFrame(t):null}()}},destroy:function(){var t,e=this,i=this.element,l=this.scrollEl,s=this.listeners;if(this.scrollEl){for(var r in s)l.removeEventListener(r,s[r]);if(h(this.scrollbars,"remove"),this.settings.wrapContent){for(;t=l.childNodes[0];)i.insertBefore(t,l);i.removeChild(l),this.scrollEl=null}T(i,this.settings.classPrefix+"prevent",!1),T(i,"is-enabled",!1),E.requestAnimationFrame(function(){var t=w.instances.indexOf(e);-1<t&&w.instances.splice(t,1)})}},fireCustomEvent:function(t){var e,i,l=this.cache,s=l.scrollH,r=l.scrollW;e={scrollbarV:S({},l.v),scrollbarH:S({},l.h),scrollTop:l.v.position*s,scrollLeft:l.h.position*r,scrollBottom:(1-l.v.position-l.v.size)*s,scrollRight:(1-l.h.position-l.h.size)*r,scrollWidth:r,scrollHeight:s,clientWidth:l.clientW,clientHeight:l.clientH},"function"==typeof CustomEvent?i=new CustomEvent(t,{detail:e}):(i=y.createEvent("CustomEvent")).initCustomEvent(t,!1,!1,e),this.element.dispatchEvent(i)}};var t,e,a={scroll:function(t){w.pauseCheck||this.fireCustomEvent("scrollstart"),w.pauseCheck=!0,this.scrollbars.v.update(),this.scrollbars.h.update(),this.fireCustomEvent("scroll"),clearTimeout(this.cache.timerStop),this.cache.timerStop=setTimeout(a.scrollStop.bind(this),this.settings.scrollStopDelay)},touchstart:function(t){w.pauseCheck=!1,this.scrollbars.v.update(),this.scrollbars.h.update(),a.wheel.call(this,t)},touchend:function(t){clearTimeout(this.cache.timerStop)},scrollStop:function(){this.fireCustomEvent("scrollstop"),w.pauseCheck=!1},wheel:function(t){var e=this.cache,i=e.v,l=e.h,s=this.settings.preventParentScroll&&w.isTouch;E.cancelAnimationFrame(this.scrollAnimation),s&&i.enabled&&i.percent%100==0&&(this.scrollEl.scrollTop=i.percent?e.scrollH-e.clientH-1:1),s&&l.enabled&&l.percent%100==0&&(this.scrollEl.scrollLeft=l.percent?e.scrollW-e.clientW-1:1)}},s=function(e,i){var n="v"===e,l=i.element,o=i.scrollEl,c=i.settings,a=i.cache,r=a[e]={},t=n?"H":"W",h="client"+t,u="scroll"+t,p=n?"scrollTop":"scrollLeft",s=n?["top","bottom"]:["left","right"],d=/^(mouse|touch|pointer)/,f=w.scrollbarSpec.rtl,v=!1,m=null,g=null,b={dragData:null,dragStart:function(t){t.preventDefault();var e=t.touches?t.touches[0]:t;b.dragData={x:e.pageX,y:e.pageY,scroll:o[p]},b.bind(!0,t.type.match(d)[1])},dragMove:function(t){var e,i=t.touches?t.touches[0]:t,l=c.rtl&&1===f&&!n?-1:1;t.preventDefault(),e=(n?i.pageY-b.dragData.y:i.pageX-b.dragData.x)/a[h],o[p]=b.dragData.scroll+e*a[u]*l},dragEnd:function(t){b.dragData=null,b.bind(!1,t.type.match(d)[1])},bind:function(t,e){var i=(t?"add":"remove")+"EventListener",l=e+"move",s=e+("touch"===e?"end":"up");y[i](l,b.dragMove),y[i](s,b.dragEnd),y[i](e+"cancel",b.dragEnd)}};return{toggle:function(t){v=t,g&&T(l,"has-"+e+"track",v),r.enabled=v},create:function(){(m=y.createElement("div"),g=y.createElement("b"),m.className=c.classPrefix+e,g.className=c.classPrefix+e+"track",m.appendChild(g),l.appendChild(m),c.draggableTracks)&&(E.PointerEvent?["pointerdown"]:["touchstart","mousedown"]).forEach(function(t){g.addEventListener(t,b.dragStart)})},update:function(){var t,e,i,l,s;(v||a[h]!==a[u])&&(t=(i=this.calc()).size,e=r.size,l=1/t*i.position*100,s=C.abs(i.position-(r.position||0))*a[h],1===t&&v&&this.toggle(!1),t<1&&!v&&this.toggle(!0),g&&v&&this.style(l,s,t,e),r=S(r,i),v&&this.fireEdgeEv())},style:function(t,e,i,l){i!==l&&(g.style[n?"height":"width"]=100*i+"%",c.rtl&&!n&&(g.style.marginRight=100*(1-i)+"%")),g.style[w.cssTransform]="translate("+(n?"0%,"+t+"%":t+"%,0%")+")"},calc:function(){var t,e=o[p],i=a[h],l=a[u],s=i/l,r=l-i;return 1<=s||!l?{position:0,size:1,percent:0}:(!n&&c.rtl&&f&&(e=r-e*f),t=100*e/r,e<=1&&(t=0),r-1<=e&&(t=100),s=C.max(s,c.minTrackSize/100),{position:t/100*(1-(s=C.min(s,c.maxTrackSize/100))),size:s,percent:t})},fireEdgeEv:function(){var t=r.percent;r.was!==t&&t%100==0&&(i.fireCustomEvent("scrollreachedge"),i.fireCustomEvent("scrollreach"+s[t/100])),r.was=t},remove:function(){this.toggle(!1),m&&(m.parentNode.removeChild(m),m=null)}}},u={hideNativeScrollbars:function(t,e){var i=w.scrollbarSpec.width,l=t.style;if(0===i){var s=Date.now();return t.setAttribute("data-scroll",s),u.addCssRule('[data-scroll="'+s+'"]::-webkit-scrollbar',"display:none;width:0;height:0;")}return l[e?"left":"right"]=-i+"px",l.bottom=-i+"px",!0},addCssRule:function(t,e){var i=y.getElementById("scroll-sheet");i||((i=y.createElement("style")).id="scroll-sheet",i.appendChild(y.createTextNode("")),y.head.appendChild(i));try{return i.sheet.insertRule(t+" {"+e+"}",0),!0}catch(t){return}},createWrapper:function(t,e){for(var i,l=y.createElement("div");i=t.childNodes[0];)l.appendChild(i);return t.appendChild(l)},checkLoop:function(){w.instances.length?(w.pauseCheck||h(w.instances,"update"),c.checkFrequency&&(w.checkTimer=setTimeout(function(){u.checkLoop()},c.checkFrequency))):w.checkTimer=null},easingFunction:function(t){return--t*t*t+1}},w=i.G={isTouch:"ontouchstart"in E,cssTransition:l("transition"),cssTransform:l("transform"),scrollbarSpec:function(){var t,e,i=y.documentElement,l=0,s=1;(t=y.createElement("div")).style.cssText="overflow:scroll;width:50px;height:50px;position:absolute;left:-100px;direction:rtl",(e=y.createElement("div")).style.cssText="width:100px;height:100px",t.appendChild(e),i.appendChild(t),l=t.offsetWidth-t.clientWidth,0<t.scrollLeft?s=0:(t.scrollLeft=1,0===t.scrollLeft&&(s=-1));return i.removeChild(t),{width:l,rtl:s}}(),passiveEvent:(t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}}),E.addEventListener("test",null,e),!!t&&{capture:!1,passive:!0}),instances:[],checkTimer:null,pauseCheck:!1};function l(t){var e=t.charAt(0).toUpperCase()+t.slice(1),i=y.createElement("test"),l=[t,"Webkit"+e];for(var s in l)if(i.style[l[s]]!==o)return l[s];return""}function T(t,e,i){var l=t.className.split(/\s+/),s=l.indexOf(e);i?~s||l.push(e):~s&&l.splice(s,1),t.className=l.join(" ")}function S(t,e,i){for(var l in e)!e.hasOwnProperty(l)||t[l]!==o&&i||(t[l]=e[l]);return t}function h(t,e,i){var l,s;if(t.length)for(l=0,s=t.length;l<s;l++)t[l][e].apply(t[l],i);else for(l in t)t[l][e].apply(t[l],i)}"function"==typeof define&&define.amd&&define(function(){return i}),"undefined"!=typeof module&&module.exports&&(module.exports=i),E.Optiscroll=i}(window,document,Math),function(r){var n="optiscroll";r.fn[n]=function(i){var l,s;return"string"==typeof i&&(s=Array.prototype.slice.call(arguments),l=s.shift()),this.each(function(){var t=r(this),e=t.data(n);e?e&&"string"==typeof l&&(e[l].apply(e,s),"destroy"===l&&t.removeData(n)):(e=new window.Optiscroll(this,i||{}),t.data(n,e))})}}(jQuery||Zepto);