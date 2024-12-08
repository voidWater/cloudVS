<template>
	<view class="map-content" v-show="showMap">
		<view class="top">
			<view class="cancel" @click="closeMap">
				取消
			</view>
			<view class="confirm" @click="confirmMap">
				确定	
			</view>
		</view>
		<map id="map" class="map" style="width:100%;height:300px;" :longitude="long" :latitude="lat" show-location 
		@regionchange="mapchange">
			<!-- 图片资源位自己放置 -->
			<cover-image class="position-icon" src="../map/icon/position.png"></cover-image>
		</map>
		<view class="bot-box">
			<view class="search">
				<input v-model="search" type="text" placeholder="搜索附近">
				<view class="search-btn" @click="gosearch">搜索</view>
			</view>
			<view class="poi-list">
				<view class="poi-item" :class="currentAd.id==item.id?'active':''" v-for="item in poiList" :key="item.id" @click="select(item)">
					<view class="poi-name">
						{{item.title}}
					</view>
					<view class="poi-address">
						<view class="address">{{item.address}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
const QQMapWX  = require("./qqmap-wx-jssdk.js") 

const KEY = ''  //你申请的key  地址 https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview
	export default{
		
		//父组件传递的信息  show为是否展示该地图 getMapAddress为回调方法回调中携带选择的地址参数
		// 示例  <mmap :show="showMyMap" @getMapAddress="getMapAddress"></mmap>   getMapAddress(data){ data为选择的数据 }
		props:['show','getMapAddress'],
		data(){
			return{	
				long:'116.397513',//维度
				lat:'39.908739' ,//经度
				moveLat:'',
				moveLong:'',
				search:'',
				qqmapsdk:{},
				poiList:[],
				currentAd:'', //选择的位址
			}
		},
		computed:{
			showMap(val){
				return this.show
			}
		},
		mounted() {
			this.getLoc()
			this.initData()
		},
		methods:{
			//获取位址
			getLoc(){
				uni.getLocation({
					type:"gcj02",
					isHighAccuracy:true,
					success:(data)=>{
						this.lat = data.latitude
						this.long = data.longitude
					}
				})
			},
			//初始化
			initData(){
				this._mapContext = uni.createMapContext("map", this);
				this._mapContext.getCenterLocation({
					success:(data)=>{
						this.lat = this.moveLat = data.latitude
						this.long = this.moveLong = data.longitude
						this.qqmapsdk = new QQMapWX({
							key:KEY
						});
						this.goSearchNearby()
					}
				})
				
			},
			//地图移动
			mapchange(e){
				if(e.type=='end'){
					this.moveLat = e.detail.centerLocation.latitude
					this.moveLong = e.detail.centerLocation.longitude
					this.goSearchNearby()
				}
			},
			//当前位址信息
			goSearchNearby(){
				let that = this
				this.qqmapsdk.reverseGeocoder({
					 location: {
						latitude: that.moveLat,
						longitude: that.moveLong
				   },
				   get_poi: 1,
				   poi_options:'policy=2;radius=3000;page_size=20;page_index=1',
					success:(data)=>{
						that.poiList = data.result.pois
						that.currentAd = data.result.pois[0]
					}
				})
			},
			//搜索
			gosearch(){
				if(!this.search){
					uni.showToast({
						title:"请输入搜索内容",
						icon:"error"
					})
				}
				let that = this
				that.qqmapsdk.search({
					keyword:that.search,
					location:that.moveLat+","+ that.moveLong,
					success:(data)=>{
						console.log(data);
						that.poiList = data.data
					}
				})
			},
			//关闭地图
			closeMap(){
				this.$emit('getMapAddress')
			},
			select(item){
				if(this.currentAd.id == item.id) return
				this.currentAd = item
				this._mapContext.moveToLocation({
					longitude:item.location.lng,
					latitude:item.location.lat,
					success(data){}
				})
			},
			//确定
			confirmMap(){
				this.$emit('getMapAddress',this.currentAd)
			}
		}
	}
	
</script>
<style lang="scss" scoped>
.map-content{
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 99;
	background-color: #fff;
	.top{
		position: absolute;
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 40rpx;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, .2);
		color: #fff;
		z-index: 999;
		.confirm{
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 20rpx;
			border-radius: 10rpx;
			background-color: #42B983;
		}
	}
	.map{
		position: relative;
		.position-icon{
			position: absolute;
			left: 50%;
			top: 50%;
			width: 70rpx;
			height: 60rpx;
			transform: translate(-50%,-50%);
		}
	}
	.bot-box{
		height: calc(100vh - 300px);
		overflow: auto;
		.search{
			margin: 10rpx auto;
			padding: 0 40rpx;
			display: flex;
			justify-content: center;
			input{
				width: 100%;
				padding:0 10rpx;
				height: 50rpx;
				border: 1px solid #ccc;
				border-top-left-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
			}
			.search-btn{
				width: 100rpx;
				height: 54rpx;
				line-height: 54rpx;
				text-align: center;
				color: #fff;
				font-size: 24rpx;
				background-color: #42B983;
				border-top-right-radius: 10rpx;
				border-bottom-right-radius: 10rpx;
			}
		}
		.poi-list{
			padding: 0 40rpx;
			box-sizing: border-box;
			.poi-item{
				margin: 20rpx 0;
				padding: 10rpx;
				.poi-name{
					font-size: 34rpx;
					color: #333;
				}
				.poi-address{
					.address{
						width: 100%;
						font-size: 26rpx;
						overflow: hidden;
						color: #999;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
			}
			.active{
				border: 1px solid #42B983;
				border-radius: 10rpx;
			}
		}
	}
}
</style>