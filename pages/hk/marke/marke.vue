<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">备注</block>
		</cu-custom>
		<view class="padding" style="border-radius: 20rpx;"> 
			<view class="cu-form-group align-start " style="border-radius: 20rpx;">
				<textarea maxlength="-1" :disabled="modalName!=null" :value="marker" @input="textareaBInput" placeholder="请输入备注"></textarea>
			</view>
		</view>
		
		<view class="padding">
			<view v-for="item in markers" @click="onChooseMarker(item)" class='cu-tag round line-green'>{{item}}</view>
		</view>
		<view style="padding: 20px;">
			<view class=" flex flex-direction" style="width: 100%;">
				<button  class="cu-btn  lg" style="width: 100%;background-color: #41a863;color: #fff;" @click="submit">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				markers:['轻拿轻放','易碎物品','请勿折叠'],
				marker:''
			}
		},
		methods: {
			textareaBInput(e){
				this.marker = e.detail.value;
			},
			onChooseMarker(e){
				console.log(e)
				this.marker = this.marker + e;
			},
			submit(){
				let pages = getCurrentPages() // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
				let prevPage = pages[pages.length - 2] //上一页页面实例
				uni.navigateBack({
				  delta:1,
				  success:() => {
					prevPage.$vm.getMarker(this.marker) // 给上一页绑定方法otherFun,传参地址id
				  }
				})
			}
		}
	}
</script>

<style>

</style>
