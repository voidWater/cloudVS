<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">惠快到家</block>
		</cu-custom>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="map" style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude"  :markers="markers" :polyline="polyline">
				</map>
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
		
		<view class="bz" @click="toMarke">
			<view>备注</view>
			<view>
				{{marker}}<text class="lg text-gray cuIcon-right"></text>
			</view>
		</view>
		<view style="width: 100%;">
			<view class="foot">
				<u-scroll-list @right="right" @left="left" indicatorActiveColor="#41a863">
					<view class="scroll-list" style="flex-direction: row;background-color: #fff;border-radius: 20rpx;">
						<view  v-if="item.show"
								@click="choosePt(item)"
								class="scroll-list__goods-item"
								v-for="(item, index) in list"
								:key="index"
								:class="[(index === 9) && 'scroll-list__goods-item--no-margin-right']"
							>
							<image class="scroll-list__goods-item__image" style="width: 180rpx;height: 180rpx;" :src="item.thumb"></image>
							<view class="scroll-list__goods-item__text" style="width: 180rpx;text-align: center;">￥{{ item.price }}</view>
						</view>
						<!-- <view class="scroll-list__show-more">
							<text class="scroll-list__show-more__text">查看更多</text>
							<u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
						</view> -->
					</view>
				</u-scroll-list>
				<view style="width: 100%;height: 50rpx;"></view>
				<view class="panel">
					<view class="zf-jq">￥{{amount}}元{{brandStr}}</view>
					<view class="zf-panel" @click="submit()">
						确认支付
					</view>
				</view>
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
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173541856-8762-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'美团配送',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173604234-4667-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'蜂鸟配送',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173618386-1542-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'顺丰同城',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173630071-2143-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'UU跑腿',
					thumb: 'https://market-to-home.oss-accelerate.aliyuncs.com/image/20240428173643268-8703-1.png'
				}, {
					show:false,
					price: '0.0',
					brandStr:'爱跑腿',
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
				amount:'',
				distanceStr:''
			}
		},
		onLoad(option){
			this.getId = option.getId;
			this.sendId = option.sendId;
			this.width = option.width;
			this.height = option.height;
			this.length = option.length;
			this.weight = option.weight;
			this.chooseName = option.chooseName;
		}, 
		onReady(){
			uni.showLoading({
				title: '加载中'
			});
			this.mapContext = uni.createMapContext("map", this)
			var that = this;
			api.request("/address/"+this.getId,"GET",null,true,false,true).then(res=>{
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
					api.request("/address/"+this.sendId,"GET",null,true,false,true).then(res=>{
						
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
			api.request("/judanke/getQuotation","POST",{"senderAddressId":this.getId,"deliveryAddressId":this.sendId},true,false,true).then(res=>{
				if(res.code==200){
					this.distanceStr = res.data.distanceStr
					this.expectFinishMin = res.data.expectFinishMin
					this.amount = res.data.amount
					this.brandStr = "（"+res.data.brandStr+"）"; 
					this.brand = res.data.brand
					for(let item of this.list){
						for(let item2 of res.data.list){
							if(item.brandStr == item2.brandStr){
								item.show = true;
								item.price = this.js(item2.totalFee)
								item.brand = item2.brand
								item.brandStr = item2.brandStr
							}
						}
					}
					console.log(this.list)
					uni.hideLoading();
				}
			})
		},
		methods: {
			right(){
				
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
			submit(){
				console.log("123123")
				api.request("/order/add","POST",
				{"length":this.length,
				"width":this.width,
				"height":this.height,
				"note":this.marker,
				"weight":this.weight,
				"sumAmount":this.amount,
				"actuallyAmount":this.amount,
				"senderAddressId":this.getId,
				"deliveryAddressId":this.sendId,
				"deliveryOrderBrand":this.brand
				}
				,true,false,true).then(res=>{
					console.log(res    )
					if(res.code==200){
						uni.requestPayment({
							provider: 'wxpay', // 服务提提供商
							timeStamp: res.data.orderRequestWeChatPay.timeStamp, // 时间戳
							nonceStr: res.data.orderRequestWeChatPay.nonceStr, // 随机字符串
							package: res.data.orderRequestWeChatPay.prepayIdNameValue,
							signType: res.data.orderRequestWeChatPay.signType, // 签名算法
							paySign: res.data.orderRequestWeChatPay.paySign, // 签名
							success: function (res) {
								console.log('支付成功',res);
								uni.switchTab({
									url: '/pages/hk/order/order'
								});
							},
							fail: function (err) {
								console.log('支付失败',err);
							}
						});		
					}
				}).catch(e=>{
					console.log(e)
				})
			}
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
