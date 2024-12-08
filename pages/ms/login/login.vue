<template>
	<view>
		
		<view class="head">
			<view>欢迎光临</view>
			<u-avatar :text="text" :src="headImg" size="80"></u-avatar>
		</view>
		<view class="foot">
			<view style="padding: 20px;">
				<u-button type="primary" text="确定" @click="login"></u-button>
				<view class="no-botton">暂不登录</view>
			</view>
			<view class="ys-c">
				<view class="radio"><u-radio></u-radio></view>
				我已认真阅读并同意
			    <text class="font-red">《用户协议》</text>与
				<text class="font-red">《隐私条款》</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headImg:"",
				userName:"",
				userPhone:""
			}
		},
		methods: {
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
			async login(){
				uni.login({
					provider: 'weixin',
					success: res => {
						let code = res.code;//获取登录需要的code
						var userController = uniCloud.importObject("userController");
						userController.userLogin(code).then(res=>{
							console.log(res);
						})
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
					}
				});
			}
		},
		onLoad() {
			console.log(this.$store.state.login)
		}
	}
</script>

<style scoped>
.head{
	width: 100%;
	text-align: center;
	margin-top: 200rpx;
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
	color: #3c9cff;
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
