<template>
	<view>
		<cu-custom bgColor="bg-green" :isBack="true" :flsd="flsd">
		    <block slot="backText">返回</block>
		    <block slot="content">编辑地址</block>
		</cu-custom>
		<map-Point @commitCheck="commitCheck" :mapKey='mapKey' :showResetting='showResetting' :listIco='listIco' :orientationIco='orientationIco' :resettingIco='resettingIco'></map-Point>
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
	            mapKey:'b75f50945b6c85023a4ad5cc5eddfb43',
	            address: '',
	            latitude: '',
	            longitude: '',
	            listIco:'/static/location.png',
	            orientationIco:'/static/location.png',
	            resettingIco:"/static/location.png",
	            showResetting:true,
				flsd:'flsd'
	        };
	    },
	    methods: {
	        commitCheck(data) {
	            console.log(data, 565);
				let pages = getCurrentPages() // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
				let prevPage = pages[pages.length - 2] //上一页页面实例
				uni.navigateBack({
				  delta:1,
				  success:() => {
					prevPage.$vm.gdMapData(data) // 给上一页绑定方法otherFun,传参地址id
				  }
				})
				// uni.$emit('commitCheck', e);
				// uni.navigateBack({
				//     delta: 1
				// });
	        }
	    }
	}
</script>

<style>

</style>
