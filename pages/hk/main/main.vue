<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" >
		    <block slot="content">比比谁送快</block>
		</cu-custom>
		</u-navbar>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="markers">
				</map>
			</view>
		</view>
		<view class="pan-adrr">
			<view class="pan-title">比比快，同城送，我最快</view>
			<view class="pan-tip">
				<view class="pan-ad" @click="editAddr(1)">
					<view class="pan-av"><view class="cu-avatar sm round margin-left bg-green">取</view></view>
					<view class="pan-content">
						<view class="pan-up" >{{address.get.townName}}</view>
						<view class="pan-down">{{address.get.receiverName}}{{address.get.receiverMobile}}</view>
					</view>
				</view>
				<view class="addr-text" @click="toAddrList(1)">地址簿</view>
			</view>
			<view class="pan-tip">
				<view class="pan-ad" @click="editAddr(2)">
					<view class="pan-av">
						<view class="cu-avatar sm round margin-left bg-green">收</view>
					</view>
					<view class="pan-content">
						<view class="pan-up" >{{address.send.townName}}</view>
						<view class="pan-down">{{address.send.receiverName}}{{address.send.receiverMobile}}</view>
					</view>
				</view>
				<view class="addr-text" @click="toAddrList(2)">地址簿</view>
			</view>
			
			
			<view style="height: 20rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markers:[{
					id:0,
					latitude:"",
					longitude:""
				}],
				latitude:"",
				longitude:"",
				address:{
					get:{
						townName:'请选择地址',
						receiverName:'请完善发件信息',
						receiverMobile:''
					},
					send:{
						townName:'请选择地址',
						receiverName:'请完善发件信息',
						receiverMobile:''
					}
				}
			}
		},
		created(){
			
			
			var that = this;
			uni.getLocation({
				type: 'wgs84',
				geocode:true,
				success: function (res) {
					console.log(res)
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					console.log(that.latitude,that.latitude)
					that.markers[0] = {
						id:0,
						latitude:res.latitude,
						longitude:res.longitude
					}
				}
			});
		},
		methods: {
			confirmLocation(data){
				console.log(data)
				if(data.type==1){
					this.address.get = {
						id:data.id,                         
						townName:data.townName,
						receiverName:data.receiverName,
						receiverMobile:data.receiverMobile
					}
				}else{
					this.address.send = {
						id:data.id,
						townName:data.townName,
						receiverName:data.receiverName,
						receiverMobile:data.receiverMobile
					}
				}
				if(this.address.get.id && this.address.send.id){
					this.toEditOrder()
				}
			},
			toEditOrder(){
				uni.navigateTo({
					url: '/pages/hk/editOrderInfo/editOrderInfo?getId='+this.address.get.id+"&sendId="+this.address.send.id
				});
			},
			toAddrList(type){
				uni.navigateTo({
					url: '/pages/hk/addrList/addrList?type='+type
				});	
			},
			editAddr(type){
				uni.navigateTo({
					url: '/pages/hk/editAddr/editAddr?type='+type
				});	
			},
			isLogin(){
				if(!this.$store.state.isLogin){
					uni.navigateTo({
						url: '/pages/hk/login/login'
					});	
				}
			}
		}
	}
</script>

<style>
.pan-adrr{
	margin: 10rpx 15rpx;
	border-radius: 10rpx;
	background-color: #fff;
    
}
.pan-title{
	background-color: #41a863;
	padding: 12rpx 15rpx;
	border-radius: 10rpx 10rpx 0 0;
	font-size: 32rpx;
	color: #fff;
}
.pan-tip{
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: space-between;
    align-items: center;	
}
.addr-text{
	color:#41a863;
	margin-right: 20rpx;
	font-size: 24rpx;
}
.pan-ad{
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: start;
    align-items: center;		
	margin: 40rpx 25rpx;
}
.pan-av{
	margin-right: 20rpx;
}
.pan-up{
	font-size: 36rpx;
	font-weight: bold;
}
</style>
