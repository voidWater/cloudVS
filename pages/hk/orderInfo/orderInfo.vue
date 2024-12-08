<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">比比谁送快</block>
		</cu-custom>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="map" style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude"  :markers="markers" :polyline="polyline">
				</map>
			</view>
		</view>
		<view class="status">
			<view class="level-one" >
				<view>
					<image class="scroll-list__goods-item__image" style="width: 180rpx;height: 180rpx;" :src="brandImg"></image>
				</view>
				<view style="height: 180rpx;display: flex;flex-direction: column;align-items:center;align-content:space-between">
					<view>￥{{amount}}</view>
					<view style="margin-top: 90rpx;">{{getStatus()}}</view>
				</view>
			</view>
			<view v-if="status=='4'">
				<view>订单号:{{deliveryOrderNo}}</view>
				<view>骑手：{{courierName}} <text class=" text-gray cuIcon-phone" style="font-size: 32rpx;color:#41a863" @click="call()"></text></view>
				<view>距离终点还有{{distanceStr}}</view>
			</view>
		</view>
		
		<view class="wp-panel">
			<view>
				<view>物品类型/{{chooseName}}</view>
				<view class="margin-top-sm">重量/{{weight}}千克</view>
				<view class="margin-top-sm">体积/{{length}}cm/{{width}}cm/{{height}}cm</view>
			</view>
			<view style="font-size: 32rpx;font-weight: bold;color: #41a863;">
				{{distanceStr}}
			</view>
		</view>
		
		<view class="bz" >
			<view>备注</view>
			<view>
				{{marker}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import api from '@/common/httpRequest.js';
	export default {
		data() {
			return {
				weight:1,
				height:10,
				width:10,
				length:10,
				chooseName:'',
				getId:'',
				sendId:'',
				latitude:0,
				longitude:0,
				markers:[],
				polyline:[{points:[]}],
				distanceStr:'',
				expectFinishMin:'',
				list: [{
					show:false,
					price: '0.0',
					brandStr:'闪送',
					brand:'ss',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173541856-8762-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'美团配送',
					brand:'mtzb',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173604234-4667-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'蜂鸟配送',
					brand:'fnpt',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173618386-1542-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'顺丰同城',
					brand:'sftc',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173630071-2143-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'UU跑腿',
					brand:'uupt',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173643268-8703-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'爱跑腿',
					brand:'apt',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173656147-1828-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'达达',
					brand:'ddks',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240511110835932-6620-1.png'
				}],

				marker:"",
				brandStr:"",
				brand:"",
				brandImg:'',
				amount:'',
				distanceStr:'',
				status: 0,
				courierName:'',
				deliveryOrderNo:''
			}
		},
		onLoad(option){
			this.id = option.id;
			// uni.showLoading({
			// 	title: '加载中'
			// });
			var that = this;
			that.init()
			this.xh = setInterval(function(){
				that.refresh()
			}, 5000);
		}, 
		onUnload (){
			clearInterval(this.xh);
		},
		onReady(){
			
		},
		methods: {
			refresh(){
				if(this.status == '4'){
					this.getDetail()
					this.getCourierInfo()   
				}
			},
			init(){
				uni.showLoading({
					mask:true,
					title: '加载中'
				});
				api.request("/order/"+this.id,"GET",{},true,false,true).then(res=>{
					if(res.code==200){
						console.log(res)
						this.mapContext = uni.createMapContext("map", this)
						var that = this;
						var dd = res;
						for(let i of this.list ){
							if(i.brand == res.data.deliveryOrderBrand){
								this.brandStr = i.brandStr;
								this.brandImg = i.thumb
							}
						}
						this.amount = res.data.actuallyAmount
						this.marker = res.data.note
						this.weight = res.data.weight
						this.height = res.data.height
						this.width = res.data.width
						this.length = res.data.length
						this.status = res.data.status
						
						
						api.request("/address/"+res.data.senderAddressId,"GET",null,true,false,true).then(res=>{
							console.log(res)
							if(res.code==200){
								this.latitude = res.data.latitude;
								this.longitude = res.data.longitude;
								this.markers.push({
									id:0,
									latitude:res.data.latitude,
									longitude:res.data.longitude,
									title:'取',
									iconPath:'/static/location.png',
									with:'30',
									height:'30'
								})
								api.request("/address/"+dd.data.deliveryAddressId,"GET",null,true,false,true).then(res=>{
									uni.hideLoading();
									that.markers.push({
										id:1,
										latitude:res.data.latitude,
										longitude:res.data.longitude,
										title:'收',
										iconPath:'/static/location.png',
										with:'30',
										height:'30'
									})
									
									
									that.mapContext.includePoints({
										padding: [80, 50, 80, 50],
										points: that.markers
									})
									
									if(that.status == '4'){
										that.getDetail()
										that.getCourierInfo()   
									}
									
									that.polyline[0].color='#41a863';
									that.polyline[0].dottedLine=true;
									that.polyline[0].width=5;
									that.polyline[0].points.push({
										latitude:that.markers[0].latitude,
										longitude:that.markers[0].longitude
									},{
										latitude:res.data.latitude,
										longitude:res.data.longitude
									})
								})
							}
						})
					}
					
				})
			},
			toMarke(){
				uni.navigateTo({
					url: '/pages/hk/marke/marke'
				});
			},
			getMarker(e){
				this.marker = e;
			},
			choosePt(e){
				console.log(e)
				this.brandStr = "（"+e.brandStr+"）";
				this.brand = e.brand;
				this.amount = e.price;
			},
			js(amount){
				console.log(amount)
				return (amount/100).toFixed(1);
			},
			getDetail(){
				api.request("/judanke/getDeliveryOrderDetail","POST",{"orderId":this.id},true,false,true).then(res=>{
					if(res.code == 200){
						this.deliveryOrderNo = res.data.deliveryOrderNo
					}
				})
			},
			getCourierInfo(){
				var that = this;
				api.request("/judanke/getCourierInfo","POST",{"orderId":that.id},true,false,true).then(res=>{
					if(res.code == 200){
						console.log("res",res)
						console.log("res",that.markers)
						if(that.marker.length == 3){
							that.markers[2] = {
								id:3,
								latitude:res.data.courierLat,
								longitude:res.data.courierLng,
								iconPath:'/static/psy-r.png',
								with:'30',
								height:'30'
							}
						}else{
							that.markers.push({
								id:3,
								latitude:res.data.courierLat,
								longitude:res.data.courierLng,
								iconPath:'/static/psy-r.png',
								with:'30',
								height:'30'
							})
						}
						
						that.mapContext.includePoints({
							padding: [80, 50, 80, 50],
							points: that.markers
						})
						that.distanceStr = res.data.distanceStr
						that.courierPhone = res.data.courierPhone
						that.courierName = res.data.courierName
					}
				})
			},
			call(){
				if(this.courierPhone){
					uni.makePhoneCall({
						phoneNumber: this.courierPhone
					});
				}
			},
			getStatus(){
					let str = ''
					switch(this.status){
						case "1":
							str = '待支付'
							break;
						case "2":
							str = '待接单'
							break;
						case "3":
							str = '待发货'
							break;
						case "4":
							str = '待收货'
							break;
						case "5":
							str = '已完成'
							break;
						case "6":
							str = '已取消'
							break;
						default:
							str = ''
						
				}
				return str;
			}
		},
		computed:{
			
		}
	   
	}
</script>

<style lang="scss">
.scroll-list {
	@include flex(column);

	&__goods-item {
		margin-right: 20px;

		&__image {
			width: 60px;
			height: 60px;
			border-radius: 4px;
		}

		&__text {
			color: #f56c6c;
			text-align: center;
			font-size: 12px;
			margin-top: 5px;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}
}
.wp-panel{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background-color: #fff;
	margin: 20rpx;
	border-radius: 20rpx;
	padding: 20rpx;
}
.status{
	background-color: #fff;
	margin: 20rpx;
	border-radius: 20rpx;
	padding: 20rpx;
	box-shadow: #bfbfbf;
}
.status .level-one{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.bz{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	background-color: #fff;
	margin: 20rpx;
	border-radius: 20rpx;
	padding: 20rpx;
	box-shadow: #bfbfbf;
}
.foot{
	background-color: #fff;
	position: absolute;
	bottom: 30rpx;
	left:20rpx;
	right: 20rpx;
	border-radius: 50rpx;
	box-shadow: #bfbfbf;
}
.foot .panel{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	
}
.zf-jq{
	padding: 20rpx;
	color: #41a863;
	font-weight: bold;
	font-size: 36rpx;
}
.zf-panel{
	background-color: #41a863;
	color: #fff;
	border-radius: 50rpx;
	padding: 20rpx;
	font-size: 36rpx;
}																																																							
</style>
