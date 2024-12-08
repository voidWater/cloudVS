<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">惠快到家</block>
		</cu-custom>
		<view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-green "></text> 物品
				</view>
			</view>
			<view>
				<view class='padding-sm flex flex-wrap'>
					<view @click="chooseThings(item)" class="padding-xs" v-for="(item,index) in things" :key="index" onclik="">
						<view class='cu-tag ' :class="[ item.name == chooseName?'bg-green':'line-green']" >{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-green "></text> 重量
				</view>
			</view>
			<view>
				<view class="weight" >{{weight}}kg</view>
				<u-slider v-model="weight" min="1" max="50" activeColor="#41a863" inactiveColor="#c0c4cc"></u-slider>
			</view>
		</view>
		<view >
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-green "></text> 大小
				</view>
			</view>
			<view class="dx">
				<view class="title">长（cm/厘米）</view>
				<u-slider v-model="length" min="1" max="100" activeColor="#41a863" inactiveColor="#c0c4cc" showValue="true"></u-slider>
			</view>
			<view class="dx">
				<view class="title">宽（cm/厘米）</view>
				<u-slider v-model="width" min="1" max="100" activeColor="#41a863" inactiveColor="#c0c4cc" showValue="true"></u-slider>
			</view>
			<view class="dx">
				<view class="title">高（cm/厘米）</view>
				<u-slider v-model="height" min="1" max="100" activeColor="#41a863" inactiveColor="#c0c4cc" showValue="true"></u-slider>
			</view>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn margin-tb-sm lg" style="background-color: #41a863;color: #fff;" @click="submit">确定</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				things:[
					{name:'文件'},
					{name:'食品'},
					{name:'蛋糕'},
					{name:'数码'},
					{name:'证件'},
					{name:'药品'},
					{name:'海鲜'},
					{name:'水果'},
					{name:'鲜花'},
					{name:'汽配'},
					{name:'服饰'},
					{name:'其他'}
				],
				weight:1,
				height:10,
				width:10,
				length:10,
				chooseName:'',
				getId:'',
				sendId:''
			}
		},
		onLoad(option){
			this.getId = option.getId;
			this.sendId = option.sendId;
		},
		methods: {
			chooseThings(e){
				console.log(e.name)
				this.chooseName = e.name;
			},
			submit(){
				uni.navigateTo({
					url: '/pages/hk/confirmOrder/confirmOrder?getId='+this.getId + 
					"&sendId="+this.sendId+ "&height="+this.height+ "&weight="+this.weight+ "&length="+this.length
					+ "&width="+this.width+ "&chooseName="+this.chooseName
				});
			}
		}
	}
</script>

<style>
.dx{
	margin: 20rpx;
}
.dx .title{
	margin-left: 30rpx;
}
.weight{
	text-align: center;
	margin: 50rpx 0 20rpx 0;
	font-size: 48rpx;
}
</style>
