(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/hk/main/main"],{187:function(e,t,n){"use strict";(function(e,t){var i=n(4);n(26),n(27);i(n(25));var r=i(n(188));e.__webpack_require_UNI_MP_PLUGIN__=n,t(r.default)}).call(this,n(1)["default"],n(2)["createPage"])},188:function(e,t,n){"use strict";n.r(t);var i=n(189),r=n(191);for(var d in r)["default"].indexOf(d)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(d);n(193);var o,a=n(45),u=Object(a["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],o);u.options.__file="pages/hk/main/main.vue",t["default"]=u.exports},189:function(e,t,n){"use strict";n.r(t);var i=n(190);n.d(t,"render",(function(){return i["render"]})),n.d(t,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(t,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(t,"components",(function(){return i["components"]}))},190:function(e,t,n){"use strict";var i;n.r(t),n.d(t,"render",(function(){return r})),n.d(t,"staticRenderFns",(function(){return o})),n.d(t,"recyclableRender",(function(){return d})),n.d(t,"components",(function(){return i}));var r=function(){var e=this,t=e.$createElement;e._self._c},d=!1,o=[];r._withStripped=!0},191:function(e,t,n){"use strict";n.r(t);var i=n(192),r=n.n(i);for(var d in i)["default"].indexOf(d)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(d);t["default"]=r.a},192:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{markers:[{id:0,latitude:"",longitude:""}],latitude:"",longitude:"",address:{get:{townName:"请选择地址",receiverName:"请完善发件信息",receiverMobile:""},send:{townName:"请选择地址",receiverName:"请完善发件信息",receiverMobile:""}}}},created:function(){var t=this;e.getLocation({type:"wgs84",geocode:!0,success:function(e){console.log(e),t.latitude=e.latitude,t.longitude=e.longitude,console.log(t.latitude,t.latitude),t.markers[0]={id:0,latitude:e.latitude,longitude:e.longitude}}})},methods:{confirmLocation:function(e){console.log(e),1==e.type?this.address.get={id:e.id,townName:e.townName,receiverName:e.receiverName,receiverMobile:e.receiverMobile}:this.address.send={id:e.id,townName:e.townName,receiverName:e.receiverName,receiverMobile:e.receiverMobile},this.address.get.id&&this.address.send.id&&this.toEditOrder()},toEditOrder:function(){e.navigateTo({url:"/pages/hk/editOrderInfo/editOrderInfo?getId="+this.address.get.id+"&sendId="+this.address.send.id})},toAddrList:function(t){e.navigateTo({url:"/pages/hk/addrList/addrList?type="+t})},editAddr:function(t){e.navigateTo({url:"/pages/hk/editAddr/editAddr?type="+t})},isLogin:function(){this.$store.state.isLogin||e.navigateTo({url:"/pages/hk/login/login"})}}};t.default=n}).call(this,n(2)["default"])},193:function(e,t,n){"use strict";n.r(t);var i=n(194),r=n.n(i);for(var d in i)["default"].indexOf(d)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(d);t["default"]=r.a},194:function(e,t,n){}},[[187,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/hk/main/main.js.map