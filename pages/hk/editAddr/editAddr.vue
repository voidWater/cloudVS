<template>
	
    <view>
		<cu-custom bgColor="bg-green" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">编辑地址</block>
		</cu-custom>
		<view class="main">
			<view class="content ">
				<view class="page-body content">
					<view class="page-section page-section-gap">
						<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="marker">
						</map>
					</view>
				</view>
				<form>
					<view class="cu-form-group" @click="toMap">
						<view class="title">城市</view>
						<picker mode="region" @change="RegionChange" :value="region" disabled>
							<view class="picker">
								{{region[0]}}，{{region[1]}}，{{region[2]}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group" @click="toMap">
						<view class="title">选择地址</view>
						<input placeholder="点击选择地址"  :value="formData.townName"></input>
						<text class='cuIcon-locationfill text-orange'></text>
					</view>
					<view class="cu-form-group" >
						<view class="title">详细地址</view>
						<input placeholder="楼栋 门牌号"  :value="formData.receiverAddress" @input="receiverAddressChange"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">收货人</view>
						<input placeholder="收货人姓名"  :value="formData.receiverName" @input="receiverNameChange"></input>
					</view>
					
					<view class="cu-form-group">
						<view class="title">手机号码</view>
						<input placeholder="输入框带标签" type="digit"  :value="formData.receiverMobile" @input="receiverMobileChange"></input>
						<view class="cu-capsule radius">
							<view class='cu-tag bg-blue '>
								+86
							</view>
							<view class="cu-tag line-blue">
								中国大陆
							</view>
						</view>
					</view>
				</form>
			</view>
			
		</view>
		<view v-if="!isLoading" style="padding: 20px;">
			<view class="padding flex flex-direction">
				<button  class="cu-btn margin-tb-sm lg" style="background-color: #41a863;color: #fff;" @click="save">保存</button>
			</view>
		</view>
		<view v-else style="padding: 20px;">
			<view class="padding flex flex-direction">
				<button  class="cu-btn margin-tb-sm lg" style="background-color: #41a863;color: #fff;" disabled loading>保存</button>
			</view>
		</view>
		
        
    </view>
</template>

<script>
	import api from '@/common/httpRequest.js';
    export default {
        data() {
            return {
				marker:[{
					id:0,
					latitude:"",
					longitude:""
				}],
				index: -1,
				region: ['海南省', '海口市', '龙华区'],
				id:0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: '',
				longitude: '',
				formData: {
					receiverName:'',
					receiverMobile:'',
					provinceCode:'',
					provinceName:'',
					cityCode:'',
					cityName:'',
					areaCode:'',
					areaName:'',
					townCode:'',
					townName:'',
					receiverAddress:'',
					defaultFlag:"0",
					latitude:'',
					longitude:''
				},
				isLoading:false,
				type:'0'
            }
        },
		onLoad(option){
			var that = this;
			this.isLogin = this.$store.state.isLogin;
			this.type = option.type;
			uni.getLocation({
				type: 'wgs84',
				success: function (res) {
					that.latitude = res.latitude;
					that.longitude = res.longitude;
				}
			});
			if(!this.isLogin){
				this.toLogin()
			}
		},
		onShow() {
			
		},
        methods: {
			toLogin(){
				uni.navigateTo({
					url: '/pages/hk/login/login'
				});
			},
			toMap(){
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
								console.log(1,res);
								that.ysTx(res)
							}
						})
					}
				});
				// uni.navigateTo({
				// 	url: '/pages/hk/mapChooseAddr/mapChooseAddr'
				// });
				// uni.navigateTo({
				// 	url: '/pages/hk/mapChooseAddr_gd/mapChooseAddr_gd'
				// });
			},
			ysTx(data){
				let province = data.address.substring(0,data.address.indexOf('省')+1);
				let city = data.address.substring(data.address.indexOf('省')+1,data.address.indexOf('市')+1);
				let district = data.address.substring(data.address.indexOf('市')+1,data.address.indexOf('区')+1);
				console.log(province);
				console.log(city);
				console.log(district);
				this.latitude=data.latitude;
				this.longitude=data.longitude;
				this.region = [province,city,district]
				this.formData = {
					receiverName:this.formData.receiverName,
					receiverMobile:this.formData.receiverMobile,
					receiverAddress:this.formData.receiverAddress,
					provinceCode:'',
					provinceName:province,
					cityCode:'',
					cityName:city,
					areaCode:'',
					areaName:district,
					townCode:'',
					townName:data.name,
					defaultFlag:this.formData.defaultFlag,
					latitude:this.latitude,
					longitude:this.longitude
				}
				this.marker[0] = {
					id:0,
					latitude:this.latitude,
					longitude:this.longitude
				}
			},
			gdMapData(data){
				console.log(data,333)
				let dw = data.location.split(",")
				this.latitude=dw[1];
				this.longitude=dw[0];
				this.region = [data.province,data.city,data.district]
				this.formData = {
					receiverName:this.formData.receiverName,
					receiverMobile:this.formData.receiverMobile,
					receiverAddress:this.formData.receiverAddress,
					provinceCode:'',
					provinceName:data.province,
					cityCode:'',
					cityName:data.city,
					areaCode:'',
					areaName:data.district,
					townCode:'',
					townName:data.address+data.name,
					defaultFlag:this.formData.defaultFlag,
					latitude:this.latitude,
					longitude:this.longitude
				}
				 this.marker[0] = {
					id:0,
					latitude:this.latitude,
					longitude:this.longitude
				 }
			},
			otherFun(data){
				data = JSON.parse(data);
				this.latitude=data.location.lat;
				this.longitude=data.location.lng;
				this.region = [data.ad_info.province,data.ad_info.city,data.ad_info.district]
				this.formData = {
					receiverName:this.formData.receiverName,
					receiverMobile:this.formData.receiverMobile,
					receiverAddress:this.formData.receiverAddress,
					provinceCode:data.ad_info.adcode,
					provinceName:data.ad_info.province,
					cityCode:'',
					cityName:data.ad_info.city,
					areaCode:'',
					areaName:data.ad_info.district,
					townCode:'',
					townName:data.title,
					defaultFlag:this.formData.defaultFlag,
					latitude:this.latitude,
					longitude:this.longitude
				}
				 this.marker[0] = {
					id:0,
					latitude:this.latitude,
					longitude:this.longitude
				 }
			},
			save(){
				if(!this.formData.receiverName){
					uni.showToast({
						title: '请输入收货人',
						duration: 2000
					});
					return
				}
				if(!this.formData.receiverName){
					uni.showToast({
						title: '请输入联系电话',
						duration: 2000
					});
					return
				}
				if(!this.formData.receiverAddress){
					uni.showToast({
						title: '请输入详细地址',
						duration: 2000
					});
					return
				}
				if(!this.formData.longitude){
					uni.showToast({
						title: '请选择地址',
						duration: 2000
					});
					return
				}
				this.isLoading = true;
				
				api.request("/address","POST",this.formData,true,false,true).then(res=>{
					console.log(res)
					res.data.type = this.type;
					let pages = getCurrentPages() // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
					let prevPage = pages[pages.length - 2] //上一页页面实例
					uni.showToast({
						title: '保存成功',
						icon : 'success',
						duration: 2000,
						complete(){
							uni.navigateBack({
							  delta:1,
							  success:() => {
								prevPage.$vm.confirmLocation(res.data) // 给上一页绑定方法otherFun,传参地址id
							  }
							})
						}
					});
				})
			},
			receiverAddressChange(e){
				this.formData.receiverAddress = e.detail.value
			},
			receiverNameChange(e){
				this.formData.receiverName = e.detail.value
			},
			receiverMobileChange(e){
				this.formData.receiverMobile = e.detail.value
			}
        }
    }
</script>

<style>
page{
	background-color:#f0f0f0;
}
.main{
	padding: 20rpx;
	background:repeating-linear-gradient(to bottom,#39b54a,#fff);
}
.content{
	border-radius: 20rpx;
}
</style>