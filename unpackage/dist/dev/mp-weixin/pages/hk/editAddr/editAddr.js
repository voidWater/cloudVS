(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/hk/editAddr/editAddr"],{236:function(e,t,i){"use strict";(function(e,t){var a=i(4);i(26),i(27);a(i(25));var o=a(i(237));e.__webpack_require_UNI_MP_PLUGIN__=i,t(o.default)}).call(this,i(1)["default"],i(2)["createPage"])},237:function(e,t,i){"use strict";i.r(t);var a=i(238),o=i(240);for(var n in o)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return o[e]}))}(n);i(242);var r,d=i(45),s=Object(d["default"])(o["default"],a["render"],a["staticRenderFns"],!1,null,null,null,!1,a["components"],r);s.options.__file="pages/hk/editAddr/editAddr.vue",t["default"]=s.exports},238:function(e,t,i){"use strict";i.r(t);var a=i(239);i.d(t,"render",(function(){return a["render"]})),i.d(t,"staticRenderFns",(function(){return a["staticRenderFns"]})),i.d(t,"recyclableRender",(function(){return a["recyclableRender"]})),i.d(t,"components",(function(){return a["components"]}))},239:function(e,t,i){"use strict";var a;i.r(t),i.d(t,"render",(function(){return o})),i.d(t,"staticRenderFns",(function(){return r})),i.d(t,"recyclableRender",(function(){return n})),i.d(t,"components",(function(){return a}));var o=function(){var e=this,t=e.$createElement;e._self._c},n=!1,r=[];o._withStripped=!0},240:function(e,t,i){"use strict";i.r(t);var a=i(241),o=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=o.a},241:function(e,t,i){"use strict";(function(e,a){var o=i(4);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(i(233)),r={data:function(){return{marker:[{id:0,latitude:"",longitude:""}],index:-1,region:["海南省","海口市","龙华区"],id:0,title:"map",latitude:"",longitude:"",formData:{receiverName:"",receiverMobile:"",provinceCode:"",provinceName:"",cityCode:"",cityName:"",areaCode:"",areaName:"",townCode:"",townName:"",receiverAddress:"",defaultFlag:"0",latitude:"",longitude:""},isLoading:!1,type:"0"}},onLoad:function(t){var i=this;this.isLogin=this.$store.state.isLogin,this.type=t.type,e.getLocation({type:"wgs84",success:function(e){i.latitude=e.latitude,i.longitude=e.longitude}}),this.isLogin||this.toLogin()},onShow:function(){},methods:{toLogin:function(){e.navigateTo({url:"/pages/hk/login/login"})},toMap:function(){var t=this;e.getLocation({type:"wgs84",geocode:!0,success:function(e){console.log(e),a.chooseLocation({latitude:e.latitude,longitude:e.longitude,success:function(e){console.log(1,e),t.ysTx(e)}})}})},ysTx:function(e){var t=e.address.substring(0,e.address.indexOf("省")+1),i=e.address.substring(e.address.indexOf("省")+1,e.address.indexOf("市")+1),a=e.address.substring(e.address.indexOf("市")+1,e.address.indexOf("区")+1);console.log(t),console.log(i),console.log(a),this.latitude=e.latitude,this.longitude=e.longitude,this.region=[t,i,a],this.formData={receiverName:this.formData.receiverName,receiverMobile:this.formData.receiverMobile,receiverAddress:this.formData.receiverAddress,provinceCode:"",provinceName:t,cityCode:"",cityName:i,areaCode:"",areaName:a,townCode:"",townName:e.name,defaultFlag:this.formData.defaultFlag,latitude:this.latitude,longitude:this.longitude},this.marker[0]={id:0,latitude:this.latitude,longitude:this.longitude}},gdMapData:function(e){console.log(e,333);var t=e.location.split(",");this.latitude=t[1],this.longitude=t[0],this.region=[e.province,e.city,e.district],this.formData={receiverName:this.formData.receiverName,receiverMobile:this.formData.receiverMobile,receiverAddress:this.formData.receiverAddress,provinceCode:"",provinceName:e.province,cityCode:"",cityName:e.city,areaCode:"",areaName:e.district,townCode:"",townName:e.address+e.name,defaultFlag:this.formData.defaultFlag,latitude:this.latitude,longitude:this.longitude},this.marker[0]={id:0,latitude:this.latitude,longitude:this.longitude}},otherFun:function(e){e=JSON.parse(e),this.latitude=e.location.lat,this.longitude=e.location.lng,this.region=[e.ad_info.province,e.ad_info.city,e.ad_info.district],this.formData={receiverName:this.formData.receiverName,receiverMobile:this.formData.receiverMobile,receiverAddress:this.formData.receiverAddress,provinceCode:e.ad_info.adcode,provinceName:e.ad_info.province,cityCode:"",cityName:e.ad_info.city,areaCode:"",areaName:e.ad_info.district,townCode:"",townName:e.title,defaultFlag:this.formData.defaultFlag,latitude:this.latitude,longitude:this.longitude},this.marker[0]={id:0,latitude:this.latitude,longitude:this.longitude}},save:function(){var t=this;this.formData.receiverName?this.formData.receiverName?this.formData.receiverAddress?this.formData.longitude?(this.isLoading=!0,n.default.request("/address","POST",this.formData,!0,!1,!0).then((function(i){console.log(i),i.data.type=t.type;var a=getCurrentPages(),o=a[a.length-2];e.showToast({title:"保存成功",icon:"success",duration:2e3,complete:function(){e.navigateBack({delta:1,success:function(){o.$vm.confirmLocation(i.data)}})}})}))):e.showToast({title:"请选择地址",duration:2e3}):e.showToast({title:"请输入详细地址",duration:2e3}):e.showToast({title:"请输入联系电话",duration:2e3}):e.showToast({title:"请输入收货人",duration:2e3})},receiverAddressChange:function(e){this.formData.receiverAddress=e.detail.value},receiverNameChange:function(e){this.formData.receiverName=e.detail.value},receiverMobileChange:function(e){this.formData.receiverMobile=e.detail.value}}};t.default=r}).call(this,i(2)["default"],i(1)["default"])},242:function(e,t,i){"use strict";i.r(t);var a=i(243),o=i.n(a);for(var n in a)["default"].indexOf(n)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(n);t["default"]=o.a},243:function(e,t,i){}},[[236,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/hk/editAddr/editAddr.js.map