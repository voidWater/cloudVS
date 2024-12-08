import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		customData:{
			color:'#41a863',
			subColor:'#45b588'
		},
		isLogin:false,
		userInfo:{},
		token:""
	},
    mutations: {
		async login(state,userInfo){
			state.userInfo=userInfo;
			state.isLogin=true;
			uni.setStorage({
				key: 'userInfo',
				data: userInfo,
				success: function () {
					console.log('set user login success');
				}
			});
		},
		logout(state){
			state.userInfo={};
			state.isLogin=false;
		}
	},
    actions: {}
})
export default store