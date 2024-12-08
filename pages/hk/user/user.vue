<template>
	<view>
		 <cu-custom bgColor="bg-green">
		    <block slot="content">我的</block>
		 </cu-custom>
		
		<view class="panel" v-if="isLogin">
			<view >微信用户</view>
			<view class="cu-avatar xl round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view>
		<view v-else class="panel">
			<view @click="toLogin">请登录</view>
			<view class="cu-avatar xl round margin-left" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg);"></view>
		</view>
		
		<view class="list">
			<view class="item solids-bottom" @click="toAddrList">
				<text>地址簿</text>
				<text class="lg text-gray cuIcon-copy" ></text>
			</view>
			<view class="item solids-bottom" @click="toOrder">
				<text>我的订单</text>
				<text class="lg text-gray cuIcon-pay" ></text>
			</view>
			<view class="item">
				<text>联系客服</text>
				<text class="lg text-gray cuIcon-dianhua" >
					.
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:false
			}
		},
		created() {
			
		},
		onShow(){
			this.isLogin = this.$store.state.isLogin;
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url: '/pages/hk/login/login'
				});
			},
			toAddrList(){
				if(this.isLogin){
					uni.navigateTo({
						url: '/pages/hk/addrList/addrList'
					});
				}else{
					this.toLogin()
				}
			},
			toOrder(){
				uni.switchTab({
					url: '/pages/hk/order/order'
				});
			}
		}
	}
</script>

<style>
.panel{
	background-color: #fff;
	border-radius: 20rpx;
	margin: 28rpx 18rpx 18rpx 18rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 30rpx;
	font-size: 36rpx;
}
.list{
	background-color: #fff;
	border-radius: 20rpx;
	margin: 18rpx;
	padding: 18rpx 5rpx;
}
.list .item{
	font-size: 32rpx;
	margin: 20rpx 18rpx;
	padding-bottom: 18rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
</style>
