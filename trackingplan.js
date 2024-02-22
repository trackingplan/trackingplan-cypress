
Cypress.Commands.add('trackingplan', (tpId, environment, testSessionId, options) => {
    /**
        Injecting and starting the Trackingplan SDK into all loaded pages to:
        - Make sure it's running and tracking all events without race conditions.
        - Not depending on the production version of the script.
        - Ease debugging.
        - Enabling options that fit better in testing environments (see realtime)
        - We dont need to use headers anymore to identify the test.
    **/
    options = options ?? {}

    cy.on('window:before:load', window => {

        // minified version of the Trackingplan SDK v1.17.2

        // eslint-disable-next-line
        (function(){function a(a){var b={method:"POST",endpoint:"TRACKINGPLAN",payload:JSON.stringify(a)};q(b)}function b(a){if(ja.includes("img"))try{j(a)}catch(a){O(a)}if(ja.includes("xhr"))try{l(a)}catch(a){O(a)}if(ja.includes("beacon"))try{m(a)}catch(a){O(a)}if(ja.includes("form"))try{p(a)}catch(a){O(a)}if(ja.includes("ws"))try{o(a)}catch(a){O(a)}if(ja.includes("fetch"))try{n(a)}catch(a){O(a)}}function c(){var a=d();if(null!==a&&!ha)return!1;var b={landing:document.location.href,referrer:document.referrer};return R.setItem("_trackingplan_initial",JSON.stringify(b)),!0}function d(){return JSON.parse(R.getItem("_trackingplan_initial"))}function e(){try{if(R.setItem("_tp_t","a"),"a"!==R.getItem("_tp_t"))return!1;if(R.removeItem("_tp_t"),"function"!=typeof navigator.sendBeacon)return!1}catch(a){return!1}return!0}function f(a){return"string"==typeof a||a instanceof String}function g(a){return JSON.stringify(a,function(a,b){return b instanceof HTMLElement?b.nodeType:b})}function h(a,b){if(0===b.length)return!0;for(var c=0;c<b.length;c++){if(U.call(a,"payload")&&"string"==typeof a.payload&&0<=a.payload.indexOf(b[c]))return!0;if(U.call(a,"endpoint")&&"string"==typeof a.endpoint&&0<=a.endpoint.indexOf(b[c]))return!0}return!1}function i(a){return!(null!==ra)||0<=ra.indexOf(a)}function j(a){var b=a.Object.getOwnPropertyDescriptor(a.HTMLImageElement.prototype,"src").set;a.Object.defineProperty(a.HTMLImageElement.prototype,"src",{set:function(a){return!f(a)||2048<a.length?b.apply(this,arguments):(q({method:"GET",endpoint:a,protocol:"img"}),b.apply(this,arguments))}});var c=a.HTMLImageElement.prototype.setAttribute;a.HTMLImageElement.prototype.setAttribute=function(a,b){if("src"==a.toLowerCase()){if(!f(b)||b.length>2048)return c.apply(this,arguments);q({method:"GET",endpoint:b,protocol:"img"})}return c.apply(this,arguments)}}function k(a){var b=a;try{b instanceof FormData&&(b=JSON.stringify(Object.fromEntries(b)))}catch(a){}return b}function l(a){var b=a.XMLHttpRequest.prototype.open,c=a.XMLHttpRequest.prototype.send;a.XMLHttpRequest.prototype.open=function(a,c){return this._tpUrl=c,this._tpMethod=a,b.apply(this,arguments)},a.XMLHttpRequest.prototype.send=function(a){var b=k(a);return q({method:this._tpMethod,endpoint:this._tpUrl,payload:b,protocol:"xhr"}),c.apply(this,arguments)}}function m(a){var b=a.navigator.sendBeacon;a.navigator.sendBeacon=function(a,c){if(!f(a)||2048<a.length)return b.apply(this,arguments);var d=k(c);return q({method:"POST",endpoint:a,payload:d,protocol:"beacon"}),b.apply(this,arguments)}}function n(a){var b=a.fetch;a.fetch=function(a,c){if(!f(a)||2048<a.length)return b.apply(this,arguments);var d="GET",e=null;return void 0!==c&&(void 0!==c.method&&(d=c.method.toUpperCase()),void 0!==c.body&&(e=k(c.body))),q({method:d,endpoint:a,payload:e,protocol:"fetch"}),b.apply(this,arguments)}}function o(a){var c=a.WebSocket;a.WebSocket=function(d,a){return a?new c(d,a):new c(d)};var b=c.prototype.send;c.prototype.send=function(a){return q({method:"WS",endpoint:this.url,payload:a,protocol:"ws"}),b.apply(this,arguments)},a.WebSocket.prototype=c.prototype}function p(a){function b(a){try{var b=a?a.target:this,c={method:b.method,endpoint:b.action,payload:JSON.stringify({location:S.location.href,form_id:b.id,method:b.method,form_data:Object.fromEntries(new FormData(b))}),protocol:"form"};q(c)}catch(a){}}a.addEventListener("submit",b,!0)}function q(a,b){setTimeout(function(){try{var c=M(a);if("TRACKINGPLAN"==a.endpoint&&(c="trackingplan"),!c)return;if(!i(c))return void O({m:"Request ignored ("+c+" not in whitelist)",request:a});if(!h(a,qa))return void O({m:"Request ignored (content filter)",request:a});var d=K();return!1===d?(va.push(a),O({m:"Pre queued, queue length = "+va.length}),setTimeout(F,ca),!1):(ya=B(),za=g(ya).length,!w(ea,d))?(O({m:"Request ignored (sampling)",mode:ea,dict:d}),!0):(r(z(a,c)),"function"==typeof b&&b(),!0)}catch(b){P({m:"Trackingplan process error",error:b,request:a})}},0)}function r(a){la(a);var b=g(a);if(2e5<b.length&&O({m:"Track Too big, ignored: "+b.length}),b.length+2+za>fa)return t(a,$),void O({m:"Track > Batch Size: "+b.length});var c=wa.length+b.length+za;c>fa&&(O({m:"Batch reaching limit: "+c}),s($)),c=wa.length+b.length+za,O({m:"Queue len: "+c,rawTrack:a}),0!==wa.length&&(wa+=","),wa+=b}function s(a){if(0!=wa.length){var b=wa;wa="";var c={requests:JSON.parse("["+b+"]"),common:B()};v(c,a)}}function t(a,b){var c={requests:[a],common:B()};v(c,b)}function u(){var a=aa+X;return na&&(a+="?debug=true"),a}function v(a,b){function c(a){var b=navigator.sendBeacon(u(),a),c=b?"accepted":"discarded";O("SendBeacon: "+c)}function d(a){var b=new XMLHttpRequest;b.open("POST",u(),!0),b.onreadystatechange=function(){if(4===b.readyState)try{O({m:"Parsed",response:JSON.parse(b.response)}),ka(a,b.response)}catch(a){}},b.send(a)}return("function"==typeof ma&&(a=ma(a)),O({m:"Sent",payload:a}),ia)?void O("Not sending, is dry run"):void("xhr"===b?d(g(a)):"beacon"===b?c(g(a)):void 0)}function w(a,b){switch(a){case"user":return 1===b.isSampledUser;case"track":return Math.random()<1/b.sampleRate;case"all":return!0;case"none":default:return!1}}function x(){return y().length}function y(){try{var a=ta();return"object"==typeof a[0]?a:[]}catch(a){return[]}}function z(a,b){return{provider:b,request:{endpoint:a.endpoint,method:a.method,post_payload:a.payload||null,protocol:a.protocol,href:S.location.href},ts:new Date().getTime(),dl_i:x()-1}}function A(){return N({hostname:S.location.hostname,user_agent:navigator.userAgent,load_url:xa},d())}function B(){return{context:A(),tp_id:X,source_alias:Z,environment:Y,sdk:Ca.sdk,sdk_version:Ca.sdkVersion,sampling_rate:K().sampleRate,debug:_,tags:oa,datalayer:y(),session_id:G()}}function C(){try{for(var a=window.performance.getEntriesByType("resource"),b={},c=[],d=0;d<a.length;d++){c.push(a[d].name);var e="",f=a[d].name.replace(/(^\w+:|^)\/\//,""),g=f.split("?"),h=g[0];g=h.split("/"),e=1<g.length?g[0]+"/"+g[1]:g[0];var j=e;U.call(b,j)||(b[j]=0),b[j]++}return b}catch(a){return null}}function D(){for(;va.length;){var a=va.shift();q(a)}}function E(a,b){return U.call(a,"environment_rates")&&U.call(a.environment_rates,b)?a.environment_rates[b]:a.sample_rate}function F(){if(!ua){var b=new XMLHttpRequest,c=ba+"config-"+X+".json";b.onreadystatechange=function(){if(4==this.readyState)try{J(E(JSON.parse(this.responseText),Y)),a({event_name:"new_dau"}),D()}catch(a){}ua=!1},b.open("GET",c,!0),ua=!0,b.send()}}function G(){if(!Ba)return null;var a=R.getItem("_trackingplan_session_id"),b=R.getItem("_trackingplan_session_ts");if(null===a||null===b)return O({m:"Session ID: Creating for the first time session "}),H();var c=Date.now(),d=parseInt(b,10),e=1e3*(60*Aa);return isNaN(d)||c>d+e?(O({m:"Session ID: Updating because timeout"}),H()):(O({m:"Session ID: Returning still alive session"}),R.setItem("_trackingplan_session_ts",c.toString()),a)}function H(){var b=I(),c=Date.now();return R.setItem("_trackingplan_session_id",b),R.setItem("_trackingplan_session_ts",c.toString()),a({event_name:"new_session"}),b}function I(){var a=new Date().getTime(),b="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=Math.floor,d=0|(a+16*Math.random())%16;return a=c(a/16),("x"===b?d:8|3&d).toString(16)});return b}function J(a){if(!1===a)return R.removeItem("_trackingplan_sample_rate"),R.removeItem("_trackingplan_sample_rate_ts"),void R.removeItem("_trackingplan_is_sampled_user");var b=Math.random()<1/a?1:0;O({m:"Trackingplan sample rate = "+a+". isSampledUser "+b}),R.setItem("_trackingplan_sample_rate_ts",new Date().getTime()),R.setItem("_trackingplan_sample_rate",a),R.setItem("_trackingplan_is_sampled_user",b)}function K(){var a=R.getItem("_trackingplan_sample_rate_ts");return null!==a&&(parseInt(a)+1e3*da<new Date().getTime()?(O({m:"Trackingplan sample rate expired"}),J(!1),!1):{sampleRate:parseInt(R.getItem("_trackingplan_sample_rate")),isSampledUser:parseInt(R.getItem("_trackingplan_is_sampled_user"))})}function L(a,b){if(null===a||null===b)return!0;if("/"===a[0]){var c=new RegExp(a.slice(1,-1));return c.test(b)}return-1!==b.indexOf(a)}function M(a){var b=a.endpoint,c=a.payload;if(f(b)){for(var d in W){var e=d.split("%"),g=e[0],h=2===e.length?e[1]:null;if(L(g,b)&&L(h,c))return W[d]}return!1}}function N(b,c){for(var d in c)b[d]=c[d];return b}function O(a){_&&T.log("TP "+X,a)}function P(a){S.console&&T.warn&&T.warn(a)}function Q(){function a(){for(var a=document.getElementsByTagName("IFRAME"),b=0;b<a.length;b++)d(a[b])}function c(a){try{return!!a.contentDocument}catch(a){return!1}}function d(a){try{c(a)&&(b(a.contentWindow),O("Intercepted frame "+a.id))}catch(a){}}function e(){var a=new MutationObserver(function(a){a.forEach(function(a){a.addedNodes.forEach(function(a){"IFRAME"==a.tagName&&d(a)})})});a.observe(document,{subtree:!0,childList:!0,attributes:!1,characterData:!1}),setTimeout(a.disconnect(),4e3)}"complete"===document.readyState?(a(),e()):document.onreadystatechange=function(){"complete"===document.readyState&&(a(),e())}}var R=localStorage,S=window,T=console,U=Object.prototype.hasOwnProperty;if(S.LocalTP)return void P("Trackingplan snippet included twice.");var V={"google-analytics.com":"googleanalytics","analytics.google.com":"googleanalytics","/.*/pagead/(viewthroughconversion|conversion)/.*/":"google_ads","api.segment.io":"segment",segmentapi:"segment","seg-api":"segment","segment-api":"segment","/.*api-iam.intercom.io/messenger/web/(ping|events|metrics|open).*/":"intercom","api.amplitude.com":"amplitude","ping.chartbeat.net":"chartbeat","/.*api(-eu)?(-js)?.mixpanel.com.*/":"mixpanel","trk.kissmetrics.io":"kissmetrics","ct.pinterest.com":"pinterest","facebook.com/tr/":"facebook","track.hubspot.com/__":"hubspot","/.*.heapanalytics.com/(h|api).*/":"heap","/.*snowplow.*/":"snowplow","/.*ws.*.hotjar.com/api/v2/client/ws/%identify_user":"hotjar","/.*ws.*.hotjar.com/api/v2/client/ws/%tag_recording":"hotjar","klaviyo.com/api/track":"klaviyo","app.pendo.io/data":"pendo","matomo.php":"matomo","rs.fullstory.com/rec%8137":"fullstory","rs.fullstory.com/rec%8193":"fullstory","logx.optimizely.com/v1/events":"optimizely","track.customer.io/events/":"customerio","alb.reddit.com/rp.gif":"reddit","px.ads.linkedin.com":"linkedin","/i/adsct":"twitter","bat.bing.com":"bing","pdst.fm":"podsights","analytics.tiktok.com/api/v2":"tiktok","/.*AQB=1.*AQE=1/":"adobe","posthog.com/i/":"posthog","/.*tealiumiq.com/.*.gif/":"tealium"},W={},X=null,Y="PRODUCTION",Z=null,$="xhr",_=!1,aa="https://tracks.trackingplan.com/v1/",ba="https://config.trackingplan.com/",ca=0,da=86400,ea="user",fa=6e4,ga=20,ha=!1,ia=!1,ja=["img","xhr","beacon","fetch"],ka=function(){},la=function(){},ma=function(a){return a},na=!1,oa={},pa=null,qa=[],ra=null,sa=!1,ta=function(){return window.dataLayer},ua=!1,va=[],wa="",xa="",ya=null,za=0,Aa=30,Ba=!1,Ca=S.LocalTP={sdk:"js",sdkVersion:"1.17.2",options:null,tpId:null,setOptions:function(a,b){b=this.options=b||{},X=this.tpId=a,Y=b.environment||Y,Z=b.sourceAlias||Z,$=b.sendMethod||$,W=N(V,b.customDomains||{}),_=b.debug||_,aa=b.tracksEndPoint||aa,ba=b.configEndPoint||ba,ca=b.delayConfigDownload||ca,da=b.sampleRateTTL||da,ea=b.samplingMode||ea,fa=b.batchSize||fa,ga=b.batchInterval||ga,ha=b.alwaysSendNewUser||ha,ia=b.dryRun||ia,ja=b.intercept||ja,ka=b.onSubmit||ka,na=b.parse||na,la=b.onQueue||la,ma=b.onBeforeSubmit||ma,oa=b.tags||oa,pa=b.samplingRate||pa,qa=b.contentFilters||qa,ra=b.providersWhitelist||ra,sa=b.realtime||sa,ta=b.getDataLayer||ta,Aa=b.sessionDurationMinutes||Aa,Ba=b.useSessions||Ba,sa&&(pa=1,ea="all",fa=1),O({m:"TP options updated",options:b})},init:function(d,f){try{if(!e())throw new Error("TP Not compatible browser");if(null!==X)throw new Error("TP Init already happened");Ca.setOptions(d,f),null!==pa&&J(pa),xa=S.location.href,b(window),ja.includes("frame")&&Q(),document.addEventListener("visibilitychange",function(){"hidden"===document.visibilityState&&s("beacon")}),S.addEventListener("pagehide",function(){s("beacon")}),S.addEventListener("beforeunload",function(){a({event_name:"page_unload"}),s("beacon")}),c()&&a({event_name:"new_user"}),a({event_name:"page_load"}),setTimeout(function(){a({event_name:"pixels",properties:{pixels:C()}})},1e4),setInterval(function(){s($)},1e3*ga),G(),O({m:"TP init finished",options:f})}catch(a){P({m:"TP init error",error:a})}},flush:function(){s($)},queueSize:function(){return wa.length},updateTags:function(a){s($),oa=N(oa,a)}}})();

        const testTitle = Cypress.currentTest.title.replace(/\s/g, "_");

        window.LocalTP.init(tpId, {
            // These options can be overriden
            intercept: ['img', 'xhr', 'beacon'],
            sourceAlias: 'cypress',
            realtime: true,
            ...options,
            // These options CANNOT be overriden
            environment: environment,
            tags: {
                ...options.tags,
                test_session_name: testSessionId,
                test_title: testTitle
            }
        });
    });
});


Cypress.Commands.add('trackingplan_after_each', () => {
    cy.window().then((window) => {
        // Flush
        if (window.LocalTP.queueSize() > 0) {
            window.LocalTP.flush();
        }
        window.LocalTP = null;
        // Grace period to send data
        cy.wait(1000);
    });
});
