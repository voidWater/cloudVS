<script>
	import appData from './common/appData';
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			console.log(appData)
			console.log('App Launch')
			var taht = this;
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					console.log('getloginInfo',res.data);
					taht.$store.commit('login', res.data);
				}
			});
			uni.getSystemInfo({
			    success: function(e) {
			      // #ifndef MP
			      Vue.prototype.StatusBar = e.statusBarHeight;
			      if (e.platform == 'android') {
			        Vue.prototype.CustomBar = e.statusBarHeight + 50;
			      } else {
			        Vue.prototype.CustomBar = e.statusBarHeight + 45;
			      };
			      // #endif
			      // #ifdef MP-WEIXIN
			      Vue.prototype.StatusBar = e.statusBarHeight;
			      let custom = wx.getMenuButtonBoundingClientRect();
			      Vue.prototype.Custom = custom;
			      Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			      // #endif		
			      // #ifdef MP-ALIPAY
			      Vue.prototype.StatusBar = e.statusBarHeight;
			      Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
			      // #endif
			    }
			  })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "colorui/main.css";
	@import "colorui/icon.css";
</style>