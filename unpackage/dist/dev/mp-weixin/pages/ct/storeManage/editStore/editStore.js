(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/ct/storeManage/editStore/editStore"],{336:function(t,e,n){"use strict";(function(t,e){var o=n(4);n(26),n(27);o(n(25));var i=o(n(337));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n(1)["default"],n(2)["createPage"])},337:function(t,e,n){"use strict";n.r(e);var o=n(338),i=n(340);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n(342);var s,c=n(45),u=Object(c["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],s);u.options.__file="pages/ct/storeManage/editStore/editStore.vue",e["default"]=u.exports},338:function(t,e,n){"use strict";n.r(e);var o=n(339);n.d(e,"render",(function(){return o["render"]})),n.d(e,"staticRenderFns",(function(){return o["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return o["recyclableRender"]})),n.d(e,"components",(function(){return o["components"]}))},339:function(t,e,n){"use strict";var o;n.r(e),n.d(e,"render",(function(){return i})),n.d(e,"staticRenderFns",(function(){return s})),n.d(e,"recyclableRender",(function(){return r})),n.d(e,"components",(function(){return o}));var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.imgList.length),o=t.imgList.length;t.$mp.data=Object.assign({},{$root:{g0:n,g1:o}})},r=!1,s=[];i._withStripped=!0},340:function(t,e,n){"use strict";n.r(e);var o=n(341),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},341:function(t,e,n){"use strict";(function(t,o,i){var r=n(4);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=r(n(11)),c=n(170);function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){(0,s.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l={data:function(){return{latitude:"",longitude:"",imgList:[],title:"",info:{storeimg:"",location:{storeimgUrl:"",address:"选择店铺地址",description:""}},markers:[]}},computed:a({},(0,c.mapState)(["isLogin","customData"])),onLoad:function(){var e=this;this.storeController=t.importObject("storeController"),o.getLocation({type:"wgs84",geocode:!0,success:function(t){e.latitude=t.latitude,e.longitude=t.longitude}})},methods:a(a({},(0,c.mapMutations)(["login"])),{},{chooseStoreImg:function(){var e=this;this.$vscommon.uploadImg(1,"store",(function(n){console.log(n),e.info.storeimg=n.fileID,t.getTempFileURL({fileList:[n.fileID]}).then((function(t){e.info.storeimgUrl=t.fileList[0].download_url}))}))},chooseImg:function(){var e=this;this.$vscommon.uploadImg(3,"store",(function(n){console.log(n),t.getTempFileURL({fileList:[n.fileID]}).then((function(t){e.imgList.push(t.fileList[0].download_url)}))}))},chooseMap:function(){var t=this;o.getLocation({type:"wgs84",geocode:!0,success:function(e){console.log(e),i.chooseLocation({latitude:e.latitude,longitude:e.longitude,success:function(e){console.log(e),console.log(e.latitude),t.info.location={address:e.address,latitude:e.latitude,longitude:e.longitude,name:e.name},t.markers.push({id:0,latitude:e.latitude,longitude:e.longitude,with:"15",height:"30"})}})}})},submit:function(){var t=this;this.title?this.info.storeimgUrl?this.info.location?(this.info.imgList=this.imgList,this.storeController.add({title:this.title,info:this.info,status:0}).then((function(e){e&&t.$vscommon.rebackAndRefresh()}))):this.$vscommon.showToast("请选择店铺地址"):this.$vscommon.showToast("请上传店铺图标"):this.$vscommon.showToast("请输入店铺名")}})};e.default=l}).call(this,n(27)["default"],n(2)["default"],n(1)["default"])},342:function(t,e,n){"use strict";n.r(e);var o=n(343),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);e["default"]=i.a},343:function(t,e,n){}},[[336,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/ct/storeManage/editStore/editStore.js.map