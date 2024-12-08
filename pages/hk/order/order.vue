<template>
	<view>
		<cu-custom bgColor="bg-green" >
		    <block slot="content">比比谁送快</block>
		</cu-custom>	
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect" :data-id="index">
				{{item.name}}
			</view>
		</scroll-view>
		<view >
			<view class="panel" v-for="item in orderList" @click="toInfo(item)">
				<view class="solids-bottom btw">
					<text style="font-weight: bold;font-size: 30rpx;">{{item.type}}</text>
					<text>{{getStatus(item.status)}}</text>
				</view>
				<view >
					
					<view class="pan-ad">
						<view style="margin-right: 30rpx;">
							<view class="cu-avatar sm round margin-left bg-green">取</view>
						</view>
						<view>
							<view>{{item.sendAddress.townName}}</view>
							<view>
								<text style="font-weight: bold; margin-right: 10rpx;">{{item.sendAddress.receiverName}}</text>
								<text>{{item.sendAddress.receiverMobile}}</text>
							</view>
						</view>
					</view>
					
					<view class="pan-ad">
						<view style="margin-right: 30rpx;">
							<view class="cu-avatar sm round margin-left bg-green">收</view>
						</view>
						<view>
							<view>{{item.getAddress.townName}}</view>
							<view>
								<text style="font-weight: bold; margin-right: 10rpx;">{{item.getAddress.receiverName}}</text>
								<text>{{item.getAddress.receiverMobile}}</text>
							</view>
						</view>
					</view>
					
					
				</view>
				<view class="date solids-top" style="padding-left: 30rpx;">{{item.createDateTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/httpRequest.js';
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				tabList:[{
					name:'进行中'
				},{
					name:'已完成'
				}],
				orderList:[],
				pageNum:1,
				pageSize:5,
				total:1
			};
		},
		onLoad() {
			
		},
		onShow() {
			console.log('ssssss')
			this.pageNum = 1;
			this.pageSize = 5;
			this.total = 1;
			this.orderList=[];
			if(this.TabCur==0){
				this.currList()
			}else{
				this.list()
			}
		},
		onReachBottom(){
			if(this.TabCur==0){
				this.currList()
			}else{
				this.list()
			}
			 
		
		},
		methods: {
			toInfo(item){
				uni.navigateTo({
					url: '/pages/hk/orderInfo/orderInfo?id='+item.id
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.total = 1;
				this.pageNum = 0;
				this.orderList =[];
				if(this.TabCur==0){
					this.currList()
				}else{
					this.list()
				}
			},
			currList(){
				if(this.orderList.length < this.total){
					uni.showLoading({
						mask:true,
						title: '加载中'
					});
					api.request("/order/currList","GET",{pageNum:this.pageNum,pageSize:this.pageSize},true,false,true).then(res=>{
						if(res.code==200){
							this.orderList = this.orderList.concat(res.rows)
							this.pageNum = this.pageNum + 1
							this.total = res.total
						}else if(res.code == 401){
						uni.navigateTo({
							url: '/pages/hk/login/login'
						});
					}
						uni.hideLoading();
					})
				}else{
					
				}
			},
			list(){
				if(this.orderList.length < this.total){
					uni.showLoading({
						mask:true,
						title: '加载中'
					});
					api.request("/order/list","GET",{pageNum:this.pageNum,pageSize:this.pageSize},true,false,true).then(res=>{
						if(res.code == 200){
							this.orderList = this.orderList.concat(res.rows)
							this.pageNum = this.pageNum + 1
							this.total = res.total
						}else if(res.code == 401){
						uni.navigateTo({
							url: '/pages/hk/login/login'
						});
					}
						uni.hideLoading();
					})
				}else{
					
				}
				
			},
			getStatus(status){
					let str = ''
					switch(status){
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

<style>
.btw{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding-bottom: 20rpx;
}
.panel{
	background-color: #fff;
	margin: 18rpx;
	border-radius: 20rpx;
	padding: 20rpx;
}
.panel .head{
	padding-bottom: 20rpx;
}
.panel .date{
	padding: 15rpx 0 10rpx 0;
	margin-top: 10rpx;
}
.pan-ad{
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: start;
    align-items: center;		
	margin: 20rpx 0rpx;
}
</style>
