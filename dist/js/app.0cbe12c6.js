(function(t){function e(e){for(var r,a,s=e[0],u=e[1],l=e[2],d=0,p=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&p.push(i[a][0]),i[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);c&&c(e);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],r=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(r=!1)}r&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},i={app:0},o=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="https://iming.work/demo/vitepress-blog-vs-inner-editor/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var c=u;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},2395:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("textarea",{ref:"editor",staticClass:"editor",attrs:{placeholder:"# hello world"},domProps:{value:t.input},on:{input:t.update,paste:t.paste,keydown:[function(e){return e.type.indexOf("key")||9===e.keyCode?e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.tab(e,!0)):null},function(e){return(e.type.indexOf("key")||9===e.keyCode)&&e.shiftKey?e.ctrlKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.tab(e,!1)):null}]}}),n("div",{staticClass:"vs-button",class:{disable:t.disable},on:{click:t.handleClick}},[t._v("保存")]),t.showProgress?n("div",{staticClass:"progress"},[t._v("图片上传中...")]):t._e()])},o=[],a=n("1da1");n("96cf"),n("99af"),n("498a"),n("ac1f"),n("5319"),n("d3b7"),n("25f0"),n("00b4"),n("1276");function s(t){return u.apply(this,arguments)}function u(){return u=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:window.acquireVsCodeApi&&(n=window.acquireVsCodeApi(),n.postMessage({type:"blog-upload",data:e}));case 1:case"end":return t.stop()}}),t)}))),u.apply(this,arguments)}var l={name:"App",components:{},data:function(){return{input:"",editor:null,item:null,disable:!1,showProgress:!1,uploadProgress:0}},created:function(){var t=this;window.addEventListener("message",(function(e){if("blog"===e.data.type)t.item=e.data.data,t.input="# ".concat(t.item.title," \n\n\n").concat(t.item.input);else if("blog-upload"===e.data.type){var n=e.data.data;t.uploadProgress=0,t.showProgress=!1;var r="![".concat(n.data.sha,"](").concat(n.data.download_url,")");t.insertEditorString(r,r.length)}}))},mounted:function(){this.editor=this.$refs.editor},methods:{handleClick:function(){if(!this.disable){var t=this.input.indexOf("\n"),e=this.input.substr(0,t).replace(/#/g,"").trim(),n=this.input.substr(t);if(window.acquireVsCodeApi){this.disable=!0;var r=window.acquireVsCodeApi();r.postMessage({type:"blog",data:{title:e,input:n,id:this.item.id}})}}},update:function(t){this.disable=!1,this.input=t.target.value},tab:function(t,e){var n="",r="",i=window.getSelection().toString();e?(n="  ",r=n+i.replace(/\n/g,"\n"+n)):(r=i.replace(/^\s{2}/,""),r=r.replace(/\n\s{2}/g,"\n")),this.insertEditorString(r,r.length,!!i)},insertEditorString:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=this.editor,o=i.selectionStart,a=i.selectionEnd,s=this.input.substring(0,o),u=this.input.substring(a);this.input=s+t+u,this.$nextTick((function(){var t=r?o:o+n,i=o+n;e.editor.focus(),e.editor.setSelectionRange(t,i)}))},paste:function(t){var e=this,n=t.clipboardData.items[0];if(n&&/image/.test(n.type)){t.preventDefault();var r=n.getAsFile(),i=new FileReader;i.onloadend=function(){e.upload(e.title,i.result)},i.readAsDataURL(r)}else n.getAsString((function(t){console.log(t),e.$message.info("复制的是字符串")}))},upload:function(t,e){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n.showProgress=!0,n.uploadProgress=50,r.next=4,s({commit:t,base64:e.split(",")[1]});case 4:case"end":return r.stop()}}),r)})))()}}},c=l,d=(n("7c55"),n("2877")),p=Object(d["a"])(c,i,o,!1,null,null,null),f=p.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(f)}}).$mount("#app")},"7c55":function(t,e,n){"use strict";n("2395")}});
//# sourceMappingURL=app.0cbe12c6.js.map