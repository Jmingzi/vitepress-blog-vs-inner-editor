(function(t){function e(e){for(var i,a,s=e[0],l=e[1],u=e[2],d=0,p=[];d<s.length;d++)a=s[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&p.push(r[a][0]),r[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);c&&c(e);while(p.length)p.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],i=!0,s=1;s<n.length;s++){var l=n[s];0!==r[l]&&(i=!1)}i&&(o.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},r={app:0},o=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="https://iming.work/demo/vitepress-blog-vs-inner-editor/dist/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var c=l;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},2395:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"editor__title",attrs:{type:"text",placeholder:"请输入标题"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.tag,expression:"tag"}],staticClass:"editor__tag",attrs:{type:"text",placeholder:"标签一、标签二"},domProps:{value:t.tag},on:{input:function(e){e.target.composing||(t.tag=e.target.value)}}}),n("textarea",{ref:"editor",staticClass:"editor__content",attrs:{placeholder:"# hello world"},domProps:{value:t.input},on:{input:t.update,paste:t.paste,keydown:[function(e){return(e.type.indexOf("key")||88===e.keyCode)&&e.metaKey?e.ctrlKey||e.shiftKey||e.altKey?null:(e.preventDefault(),t.handleKeydownX.apply(null,arguments)):null},function(e){return e.type.indexOf("key")||9===e.keyCode?e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.tab(e,!0)):null},function(e){return(e.type.indexOf("key")||9===e.keyCode)&&e.shiftKey?e.ctrlKey||e.altKey||e.metaKey?null:(e.preventDefault(),t.tab(e,!1)):null}],scroll:t.handleScroll}}),n("div",{staticClass:"vs-button",class:{disable:t.disable},on:{click:t.handleClick}},[t._v("保存")]),t.showProgress?n("div",{staticClass:"progress"},[t._v("图片上传中...")]):t._e()])},o=[],a=n("1da1");n("96cf"),n("99af"),n("ac1f"),n("5319"),n("498a"),n("d3b7"),n("25f0"),n("00b4"),n("1276");function s(t){return l.apply(this,arguments)}function l(){return l=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:window.vscode.postMessage({type:"blog-upload",data:e});case 1:case"end":return t.stop()}}),t)}))),l.apply(this,arguments)}window.acquireVsCodeApi&&(window.vscode=window.acquireVsCodeApi());var u={name:"App",components:{},data:function(){return{title:"",input:"",tag:"",editor:null,item:null,disable:!1,showProgress:!1,uploadProgress:0,scrollTop:0}},created:function(){var t=this,e=window.vscode.getState();e&&this.setData(e),window.addEventListener("message",(function(e){if("blog"===e.data.type)t.setData(e.data.data),window.vscode.setState(t.item);else if("blog-upload"===e.data.type){var n=e.data.data;t.uploadProgress=0,t.showProgress=!1;var i="![".concat(n.data.sha,"](").concat(n.data.download_url,")");t.insertEditorString(i,i.length)}}))},mounted:function(){this.editor=this.$refs.editor},methods:{handleKeydownX:function(t){},handleScroll:function(t){this.scrollTop=t.target.scrollTop,window.vscode.setState(this.getData())},setData:function(t){var e=this;this.item=t,this.input=this.item.input.replace(/^\n+/,""),this.title=this.item.title,this.tag=this.item.tag||"",this.scrollTop=t.scrollTop||0,this.$nextTick((function(){e.editor&&(e.editor.scrollTop=e.scrollTop)}))},getData:function(){return{title:this.title.trim(),tag:this.tag.trim(),input:this.input.replace(/^\n+/,"").trim(),id:this.item.id,scrollTop:this.scrollTop}},handleClick:function(){this.disable||(this.disable=!0,window.vscode.postMessage({type:"blog",data:this.getData()}))},update:function(t){this.disable=!1,this.input=t.target.value,window.vscode.setState(this.getData())},tab:function(t,e){var n="",i="",r=window.getSelection().toString();e?(n="  ",i=n+r.replace(/\n/g,"\n"+n)):(i=r.replace(/^\s{2}/,""),i=i.replace(/\n\s{2}/g,"\n")),this.insertEditorString(i,i.length,!!r)},insertEditorString:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=this.editor,o=r.selectionStart,a=r.selectionEnd,s=this.input.substring(0,o),l=this.input.substring(a);this.input=s+t+l,this.$nextTick((function(){var t=i?o:o+n,r=o+n;e.editor.focus(),e.editor.setSelectionRange(t,r)}))},paste:function(t){var e=this,n=t.clipboardData.items[0];if(n&&/image/.test(n.type)){t.preventDefault();var i=n.getAsFile(),r=new FileReader;r.onloadend=function(){e.upload(e.title,r.result)},r.readAsDataURL(i)}else n.getAsString((function(t){console.log(t),e.$message.info("复制的是字符串")}))},upload:function(t,e){var n=this;return Object(a["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return n.showProgress=!0,n.uploadProgress=50,i.next=4,s({commit:t,base64:e.split(",")[1]});case 4:case"end":return i.stop()}}),i)})))()}}},c=u,d=(n("7c55"),n("2877")),p=Object(d["a"])(c,r,o,!1,null,null,null),f=p.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(f)}}).$mount("#app")},"7c55":function(t,e,n){"use strict";n("2395")}});