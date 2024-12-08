<template>
	<view style="height: 100vh;">
		<mapLocationPickerPolygons @selected="selected" :qqmapsdkKey="qqmapsdkKey" :polygons="polygons"></mapLocationPickerPolygons>
	</view>
</template>

<script>
import mapLocationPickerPolygons from '@/components/liupishui-pickerpolygons/liupishui-pickerpolygons.vue';

export default {
	components: {
		mapLocationPickerPolygons
	},
	data() {
		return {
			polygons:[],
			qqmapsdkKey:'YGDBZ-6BDCS-CV5O7-6ZGRG-DKPLE-OCFIN' ,//必须，申请地址：https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview，小程序还需要在控制台（https://lbs.qq.com/dev/console/application/mine）添加小程序的appid
		}
	},
	methods: {
		selected:(data)=>{
		    let pages = getCurrentPages() // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
		    let prevPage = pages[pages.length - 2] //上一页页面实例
		    uni.navigateBack({
			  delta:1,
			  success:() => {
				prevPage.$vm.otherFun(data) // 给上一页绑定方法otherFun,传参地址id
			  }
		    })
		}
	}
}
</script>

<style>

</style>