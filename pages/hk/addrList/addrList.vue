<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true">
		    <block slot="content">比比谁送快</block>
		</cu-custom>
		<scroll-view style="margin-bottom: 200rpx;">
			<view class="cu-list menu-avatar">
				<view  class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in addrLists" :key="index"
				 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index">
					
					<view  class="content" style="left: 50rpx;" @click="selected(item)">
						<view class="text-grey">{{item.receiverName}}:{{item.receiverMobile}}</view>
						<view class="text-gray text-lg">
							<text class="cuIcon-locationfill text-green  margin-right-xs"></text> {{item.townName}}</view>
					</view>
					<view class="action">
						
					</view>
					<view class="move">
						<view class="bg-grey">默认</view>
						<view class="bg-red" @click="remove(item.id)">删除</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view style="padding: 20px;position: absolute;bottom: 20rpx;width: 100%;">
			<view class="padding flex flex-direction" style="width: 100%;">
				<button  class="cu-btn margin-tb-sm lg" style="width: 100%;background-color: #41a863;color: #fff;" @click="toEditAddr">新建地址</button>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/common/httpRequest.js';
	export default {
		data() {
			return {
				addrLists:[],
				modalName: null,
				type:0
			}
		},
		onLoad(option) {
			this.type = option.type;
		},
		onShow(){
			this.queryList();	
		},
		methods: {
			selected(item){
				let pages = getCurrentPages() // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
				let prevPage = pages[pages.length - 2] //上一页页面实例
				if(this.type=='1'){
					item.type='1'
					uni.navigateBack({
					  delta:1,
					  success:() => {
						prevPage.$vm.confirmLocation(item) // 给上一页绑定方法otherFun,传参地址id
					  }
					})
				}else if(this.type=='2'){
					item.type='2'
					uni.navigateBack({
					  delta:1,
					  success:() => {
						prevPage.$vm.confirmLocation(item) // 给上一页绑定方法otherFun,传参地址id
					  }
					})
				}
			},
			queryList(){
				uni.showLoading({
					mask:true,
					title: '加载中'
				});
				api.request("/address/list","GET",null,true,false,true).then(res=>{
					console.log(res)
					if(res.code==200){
						this.addrLists = res.rows;
						uni.hideLoading();
					}else if(res.code == 401){
						uni.navigateTo({
							url: '/pages/hk/login/login'
						});
					}
				})
			},
			toEditAddr(){
				uni.navigateTo({
					url: '/pages/hk/editAddr/editAddr'
				});
			},
			remove(id){
				api.request("/address/"+id,"DELETE",{ids:id},true,false,true).then(res=>{
					if(res.code==200){
						this.queryList();
					}
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>
</style>
