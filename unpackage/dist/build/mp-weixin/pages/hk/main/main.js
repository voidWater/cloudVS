(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/hk/main/main"],{2111:function(e,t,i){"use strict";i.r(t);var n=i("aacc"),d=i.n(n);for(var r in n)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(r);t["default"]=d.a},"22df":function(e,t,i){},"5e6c":function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return d})),i.d(t,"a",(function(){}));var n=function(){var e=this.$createElement;this._self._c},d=[]},"7ed8":function(e,t,i){"use strict";var n=i("22df"),d=i.n(n);d.a},8255:function(e,t,i){"use strict";(function(e,t){var n=i("4ea4");i("7e9c"),i("a9ff");n(i("66fd"));var d=n(i("dc97"));e.__webpack_require_UNI_MP_PLUGIN__=i,t(d.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},aacc:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{markers:[{id:0,latitude:"",longitude:""}],latitude:"",longitude:"",address:{get:{townName:"请选择地址",receiverName:"请完善发件信息",receiverMobile:""},send:{townName:"请选择地址",receiverName:"请完善发件信息",receiverMobile:""}}}},created:function(){var t=this;e.getLocation({type:"wgs84",success:function(e){t.latitude=e.latitude,t.longitude=e.longitude,t.markers[0]={id:0,latitude:e.latitude,longitude:e.longitude}}})},methods:{confirmLocation:function(e){console.log(e),1==e.type?this.address.get={id:e.id,townName:e.townName,receiverName:e.receiverName,receiverMobile:e.receiverMobile}:this.address.send={id:e.id,townName:e.townName,receiverName:e.receiverName,receiverMobile:e.receiverMobile},this.address.get.id&&this.address.send.id&&this.toEditOrder()},toEditOrder:function(){e.navigateTo({url:"/pages/hk/editOrderInfo/editOrderInfo?getId="+this.address.get.id+"&sendId="+this.address.send.id})},toAddrList:function(t){e.navigateTo({url:"/pages/hk/addrList/addrList?type="+t})},editAddr:function(t){e.navigateTo({url:"/pages/hk/editAddr/editAddr?type="+t})},isLogin:function(){this.$store.state.isLogin||e.navigateTo({url:"/pages/hk/login/login"})}}};t.default=i}).call(this,i("543d")["default"])},dc97:function(e,t,i){"use strict";i.r(t);var n=i("5e6c"),d=i("2111");for(var r in d)["default"].indexOf(r)<0&&function(e){i.d(t,e,(function(){return d[e]}))}(r);i("7ed8");var a=i("f0c5"),o=Object(a["a"])(d["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=o.exports}},[["8255","common/runtime","common/vendor"]]]);