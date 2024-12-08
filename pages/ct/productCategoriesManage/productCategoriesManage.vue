<template>
	<view>
		  <form>
		  <view class="cu-bar bg-white">
			<view class="action">
				类别图片
			</view>
		  </view>
		  <view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							 <image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="chooseImg" v-if="imgList.length<4">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
		  </view>
			<view class="cu-form-group">
				<view class="title">名称</view>
				<input placeholder="类别名称" name="input" v-model="form.name"></input>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1" v-model="form.description"  placeholder="类别介绍"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">是否热门</view>
				<switch @change="SwitchA" :class="switchA?'checked':''" :checked="switchA?true:false"></switch>
			</view>
			<view class="cu-form-group ">
				<view class="title">是否首页显示</view>
				<switch @change="SwitchB" :class="switchA?'checked':''" :checked="switchB?true:false"></switch>
			</view>
			
		  </form>
		  <view class="bottm">
			  <view class="padding flex flex-direction">
			  	<button class="cu-btn bg-red margin-tb-sm lg" @click="submit">保存</button>
			  </view>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '123',
					icon: '',
					description: '',
					is_hot_show:'',
					is_index_show:""
				},
				switchA:false,
				imgList:[]  
			}
		},
		methods: {
			 chooseImg(){
				 this.$fileupload.uploadFile("cate_img",2,1000).then(res=>{
					 console.log(res)
					 this.imgList = res
					 //https://7463-tcb-rfa8nrbya6fyiri-3c3re75872eb-1252168680.tcb.qcloud.la/cate_img/292.jpg
				 })
			},
			SwitchA(e) {
				this.form.is_hot_show = e.detail.value
			},
			SwitchB(e){
				this.form.is_index_show = e.detail.value
			},
			submit(){
				console.log(this.form)
				console.log(this.form)
			}
		}
	}
</script>

<style scoped>
.bottm{
	position: fixed;
	bottom: 10rpx;
	width: 100%;
}

</style>
