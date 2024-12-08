<template>
	<view>
		<cu-custom  :isBack="true" :backcolor="customData">
			<block slot="backText">返回</block>
			<block slot="content">{{type==0?'新增店铺':'编辑店铺'}}</block>
		</cu-custom>
		<form >
			<view class="shadow" style="margin:30rpx;20rpx;" >
				<view class="cu-form-group shadow radius-top" >
					<view v-if="!info.storeimgUrl" class="cu-avatar lg round margin" @click="chooseStoreImg"><text class='cuIcon-cameraadd'></text></view>
					<view v-else class="cu-avatar lg round margin" @click="chooseStoreImg"  :style="[{'background-image':'url('+ info.storeimgUrl + ')'}]"></view>
					<input placeholder="店铺名" name="input"  v-model="title"></input>
				</view>
				<view class="cu-form-group align-start radius-bottom">
					<textarea maxlength="-1" v-model="info.description" placeholder="店铺简介"></textarea>
				</view>
			</view>
			<view style="margin:30rpx;20rpx;">
				<view class="cu-form-group radius-top" @click="chooseMap">
					<view class="title"></view>
					<picker @change="PickerChange" :value="index" :range="picker" disabled="true">
						<view class="picker">
							{{info.location.address}}
						</view>
					</picker>
				</view>
				<view v-if="info.location.latitude" class="page-section page-section-gap radius-bottom">
					<map style="width: 100%; height: 150px;" :latitude="info.location.latitude" :longitude="info.location.longitude" :markers="markers">
					</map>
				</view>
				<view v-else class="page-section page-section-gap">
					<map style="width: 100%; height: 150px;" :latitude="latitude" :longitude="longitude" :markers="markers">
					</map>
				</view>
			</view>
			<view style="margin:30rpx;20rpx;">
				<view class="cu-bar bg-white radius-top">
					<view class="action">
						宣传轮播图上传（不上传就不展示）
					</view>
					<view class="action">
						{{imgList.length}}/6
					</view>
				</view>
				<view class="cu-form-group radius-bottom">
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
			</view>
		</form>
		<view class="padding flex flex-direction bottom">
			<button v-if="isLoading" class="cu-btn margin-tb-sm lg"  :style="{'background-color':customData.color}" style="color:#fff;" loading disabled="true">保存中</button>
			<button v-else  @click="submit" class="cu-btn margin-tb-sm lg" :style="{'background-color':customData.color}" style="color: #fff;">保存</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				latitude:'',
				longitude:'',
				imgList: [],
				title:"",
				info:{
					storeimg:"",
					location:{
						storeimgUrl:'',
						address:'选择店铺地址',
						description:''
					}
				},
				markers:[],
			}
		},
		computed: {
			...mapState( ['isLogin','customData'])
		},
		onLoad() {
			var that = this;
			this.storeController = uniCloud.importObject("storeController");
			uni.getLocation({
				type: 'wgs84',
				geocode:true,
				success: function (res) {
					that.latitude = res.latitude
					that.longitude = res.longitude
				},
			})
		},
		methods: {
			...mapMutations(['login']),
			chooseStoreImg(){
				var that = this;
				this.$vscommon.uploadImg(1,"store",res=>{
					console.log(res)
					that.info.storeimg = res.fileID;
					uniCloud.getTempFileURL({
							fileList: [res.fileID]
						})
						.then(res => {
							that.info.storeimgUrl=res.fileList[0].download_url;
						});
				})
			},
			chooseImg(){
				var that = this;
				this.$vscommon.uploadImg(3,"store",res=>{
					console.log(res)
					uniCloud.getTempFileURL({
							fileList: [res.fileID]
						})
						.then(res => {
							that.imgList.push(res.fileList[0].download_url) 
						});
				})
			},
			chooseMap(){
				var that = this;
				uni.getLocation({
					type: 'wgs84',
					geocode:true,
					success: function (res) {
						console.log(res)
						wx.chooseLocation({
							latitude:res.latitude,
							longitude:res.longitude,
							success(res) {
								console.log(res)
								console.log(res.latitude)
								that.info.location = {
									address: res.address,
									latitude: res.latitude,
									longitude: res.longitude,
									name: res.name
								}
								that.markers.push({
									id:0,
									latitude:res.latitude,
									longitude:res.longitude,
									with:'15',
									height:'30'
								})
							}
						})
					}
				});
			},
			submit(){
				if(!this.title){
					this.$vscommon.showToast("请输入店铺名")
					return;
				}
				if(!this.info.storeimgUrl){
					this.$vscommon.showToast("请上传店铺图标")
					return;
				}
				if(!this.info.location){
					this.$vscommon.showToast("请选择店铺地址")
					return;
				}
				this.info.imgList = this.imgList;
				this.storeController.add({title:this.title,info:this.info,status:0}).then(res=>{
					if(res){
						this.$vscommon.rebackAndRefresh();
					}
				})
			}
		}
	}
</script>

<style>
.radius-top{
	border-radius: 20rpx 20rpx 0 0
}
.radius-bottom{
	border-radius: 0 0 20rpx 20rpx 
}
</style>
