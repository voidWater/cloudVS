<template>
	<view>
		<view class="head">
			<view class="title">比比谁送快</view>
			<view class="sub-title">比比谁送快跑腿最便宜，送贵了退差价，还赔差价</view>
		</view>
		<view class="foot">
			<view style="padding: 20px;">
				<view class="padding flex flex-direction">
					<button v-if="isLoading" class="cu-btn margin-tb-sm lg" style="background-color: #41a863;color: #fff;" loading disabled="true">登录中 </button>
					<button v-else  @click="login" class="cu-btn margin-tb-sm lg" style="background-color: #41a863;color: #fff;" >确定</button>
				</view>
				<!-- <view class="padding flex flex-direction">
					<button v-if="isLoading" class="cu-btn margin-tb-sm lg" style="background-color: #41a863;color: #fff;" loading disabled="true">登录中 </button>
					<button v-else @click="login" class="cu-btn margin-tb-sm lg" style="background-color: #41a863;color: #fff;" >确定</button>
				</view>
				<view class="no-botton" @click="toBack">暂不登录</view> -->
			</view>
			<!-- <view>{{message}}</view> -->
			<!-- <view class="ys-c">
				<view class="radio"><u-radio></u-radio></view>
				我已认真阅读并同意
			    <text class="font-red">《用户协议》</text>与
				<text class="font-red">《隐私条款》</text>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	import api from '@/common/httpRequest.js';
	export default {
		data() {
			return {
				isLoading:false,
				message:"123"
			}
		},
		onLoad() {
			console.log(this.$store.state.login)
		},
		methods: {
			toBack(){
				uni.navigateBack({
				  delta:1
				})
			},
			// getPhoneNumber(e){
			// 	this.isLoading = true
			// 	uni.login({provider: 'weixin',success: res => {
			// 		if(res.code){
			// 			api.request("/wechat/getSessionId?code="+res.code,"GET",{},true,false,true).then(res=>{
			// 				api.request("/wechat/login","GET",{
			// 					wechatEncryptedData:e.detail.encryptedData,
			// 					wechatIv:e.detail.iv,
			// 					wechatSessionKey:res.data.sessionKey,
			// 					wechatOpenId:res.data.openId
			// 				},true,false,true).then(res=>{
								
			// 					if(res.token){
			// 						this.$store.commit('login',res.token)
			// 						uni.setStorageSync("token",res.token)
			// 						uni.navigateBack({
			// 						  delta:1
			// 						})
			// 					}else{
			// 						//TODO登录失败
			// 					}
								
			// 				})
			// 			})
			// 		}
			// 	}})
			// },
			getUserInfo(){
				return new Promise((resolve, reject) => {
					uni.getUserInfo({
					      provider: 'weixin',
					      success: function (infoRes) {
					        console.log( infoRes.userInfo);
							resolve(infoRes.userInfo.nickName)
					      }
					    });
				})
			},
			login(){
				console.log(uni.getSystemInfoSync().platform)
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.xcxLogin();
						break;
					case 'ios':
						console.log('运行iOS上');
						this.xcxLogin();
						break;
					default:
						this.xcxLogin();
						break;
				}
				
				
				//uniapp cloud
				// uni.login({
				// 	provider: 'weixin',
				// 	success: res => {
				// 		let code = res.code;//获取登录需要的code
				// 		var userController = uniCloud.importObject("userController");
				// 		userController.userLogin(code).then(res=>{
				// 			console.log(res);
				// 		})
						// wx.wxLogin(code).then((res=>{
						// 	var userController = uniCloud.importObject("userController");
						// 	var openid = res.openid;
						// 	userController.checkUser(res.openid).then(res=>{
						// 		if(res){
						// 			userController.getUserInfo(openid).then(res=>{
						// 				console.log(res);
						// 			})
						// 		}else{
						// 			userController.createUser(openid).then(res=>{
						// 				console.log(res);
						// 			})
						// 		}
						// 	})
						// }))
				// 	}
				// });
			},
			azLogin(){
				uni.preLogin({
					provider: 'univerify',
					success(res){  //预登录成功
						// 显示一键登录选项
						console.log(res)
					},
					fail(res){  // 预登录失败
						// 不显示一键登录选项（或置灰）
				    // 根据错误信息判断失败原因，如有需要可将错误提交给统计服务器
						this.message = res.errMsg
						console.log(res.errCode)
						console.log(res.errMsg)
					}
				})
				
				var that = this;
				uni.login({
					provider: 'univerify',
					univerifyStyle: {
				    fullScreen: true
				  },
				  success(res){ // 登录成功
				  		console.log(res.authResult);  // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
						uni.closeAuthView()
						api.request("/wechat/login","GET",{
							wechatOpenId:res.authResult.openid
						},true,false,true).then(res=>{
							that.message = JSON.stringify(res)
							if(res.token){
								that.$store.commit('login',res.token)
								uni.setStorageSync("token",res.token)
								uni.navigateBack({
								  delta:1
								})
							}else{
								//TODO登录失败
							}
							
						})
				   },
			      fail(res){  // 登录失败
						uni.closeAuthView()
						that.message = res.errCode + res.errMsg
						console.log(res.errCode)
						console.log(res.errMsg)
			      }
				})
			},
			xcxLogin(){
				this.isLoading = true
				uni.login({provider: 'weixin',success: res => {
					console.log(res)
					if(res.code){
						api.request("/wechat/getSessionId?code="+res.code,"GET",{},true,false,true).then(res=>{
							api.request("/wechat/login","GET",{
								wechatOpenId:res.data.openId
							},true,false,true).then(res=>{
								
								if(res.token){
									this.$store.commit('login',res.token)
									uni.setStorageSync("token",res.token)
									uni.navigateBack({
									  delta:1
									})
								}else{
									//TODO登录失败
								}
								
							})
						})
					}
				}})
			}
		},
		
	}
</script>

<style scoped>
.head{
	width: 100%;
	text-align: center;
	margin-top: 600rpx;
	color: #41a863;
}
.head .title{
	font-size: 60rpx;
	font-weight: bold;
	background-color: #fff;
	padding: 30rpx;
}
.head .sub-title{
	font-size: 28rpx;
	margin-top: 20rpx;
}
.foot{
	position: fixed;
	width: 100%;
	bottom: 66rpx;
}
.no-botton{
	text-align: center;
	padding: 30rpx 0 0 0;
	font-weight: bold;
	color: #41a863;
}
.ys-c{
	font-size: 25rpx;
	padding: 0 30rpx 0 30rpx;
	margin-bottom: 100rpx;
}
.radio{
	float: left;
}
.font-red{
	color: red;
}
</style>
