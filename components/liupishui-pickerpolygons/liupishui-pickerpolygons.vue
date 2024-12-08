<template>
	<view class="box-picker_position">
		<view class="map_wp">
			<map id="map_20221212" class="picker-map" scale="12" min-scale="12" @regionchange="handleRegionchange" :latitude="position.latitude" :longitude="position.longitude" show-location='true' :polygons="polygons"></map>
			<view :class="['picker_map_location', animateLocation?'animated':'']"></view>
		</view>
		<view class="list-picker_position">
			<view class="hd">
				<input type="text" v-model="searchKey" class="input_text" placeholder="请输入搜索地点">
				<button class="btn-search" type="default" @click="searchPosition"><view class="picker-search"></view>搜索</button>
			</view>
			<view class="bd">
				<view v-for="(item,index) in searchlist" @click="changeSelectItem(index)" class='item' :key="index">
					<view class="item-l">
						<view class="picker-address"></view>
					</view>
					<view class="item-c">
						<view class="title">{{item.title}}</view>
						<view class="address">{{item.address}}</view>
					</view>
					<view class="item-r">
						<view v-if="item.select" class="picker-checked"></view>
					</view>
				</view>
			</view>
			<view class="ft">
				<button @click="confirmSelect" :class="['btn-selected', canConfirm?'':'disabled']">确定选点</button>
			</view>
		</view>
	</view>
</template>

<script>
	var QQMapWX = require('./qqmap-wx-jssdk.js');
	var qqmapsdk,handleRegionchangeTimmer;
	export default {
		props:{
			polygons:{
				type:Array,
				default:[
					{
						points:[
							{
								latitude:'36.829066',
								longitude:'118.025761',
							},
							{
								latitude:'36.825012',
								longitude:'118.066702',
							},
							{
								latitude:'36.81161',
								longitude:'118.042681'
							},
							{
								latitude:'36.801964',
								longitude:'118.034875',
							},
						],
						strokeWidth:1,
						strokeColor:'#ff000066',
						fillColor:'#ff000016'
					},
					{
						points:[
							{
								latitude:'36.817369',
								longitude:'118.001311',
							},
							{
								latitude:'36.808682',
								longitude:'118.010281',
							},{
								latitude:'36.805555',
								longitude:'117.996537',
							},
						],
						strokeWidth:1,
						strokeColor:'#ff000066',
						fillColor:'#ff000016'
					},
				]
			},
			qqmapsdkKey:{
				type:String,
				default:''
			},
			base_url:{
				type:String,
				default:''
			},
			sig:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				canConfirm: true,
				animateLocation:false,
				isChangeSelectItem:false,
				searchKey:'',
				position:{
					latitude:'36.811995',
					longitude:'118.05539'
				},
				searchlist:[]
			};
		},
		mounted(){
			if(this.qqmapsdkKey==''){
				console.error('需要腾讯地图开发Key，申请地址：https://lbs.qq.com/miniProgram/jsSdk/jsSdkGuide/jsSdkOverview')
				return;
			}
			qqmapsdk = new QQMapWX({
				key:this.qqmapsdkKey,
				BASE_URL:this.base_url
			});
			let that = this;
			let needRegetLocation = true;
			
			if(uni.getStorageSync('mapPickerPosition')){
				let data = JSON.parse(uni.getStorageSync('mapPickerPosition'));
				if(new Date().getTime() < data.expireTime){
					needRegetLocation = false;
					that.position.latitude = data.position.latitude;
					that.position.longitude = data.position.longitude;
					that.init();
				}
			}
			if(needRegetLocation){
				uni.getLocation({
					cacheTimeout:1,
					accuracy:'best',
					type:'gcj02',
					isHighAccuracy:true,
					success:function(e){
						console.log(e);
						that.position.latitude = e.latitude;
						that.position.longitude = e.longitude;
						uni.setStorageSync('mapPickerPosition',JSON.stringify({
							expireTime: new Date().getTime() - 0 + 60*1000,
							position:{
								latitude: e.latitude,
								longitude: e.longitude
							}
						}))
						that.init();
					},
					fail:function(e){
						console.log(e);
					}
				})
			}
			// uni.onLocationChange(function(e){
			// 		console.log(11111,e);
			// 		that.position.latitude = e.latitude;
			// 		that.position.longitude = e.longitude;
			// 	})
		},
		methods:{
			init(){
				this.animateLocation = true;
				handleRegionchangeTimmer = setTimeout(()=>{
					this.renderList();
				},400)
			},
			renderList(){
				let that = this;
				let mapContext = uni.createMapContext("map_20221212", that);
				mapContext.getCenterLocation({
						success:function(rst){
							let options = {
									location:rst.latitude+','+rst.longitude,
									get_poi:1,
									poi_options: 'radius=1000',
									sig:that.sig,
									success:function(res){
										//console.log('xxxxx',res.result.pois)
										let isSelect = false;
										if(res.message == "query ok"){
											//that.$data.searchlist = [];
											that.$data.searchlist = [...res.result.pois];
											for(let i = 0;i<that.$data.searchlist.length;i++){
												that.$data.searchlist.useable = true;
												that.$data.searchlist.select = false;
												for(let j = 0;j < that.polygons.length;j++){
													if(that.isPointInPolygon(that.$data.searchlist[i].location.lat,that.$data.searchlist[i].location.lng,that.polygons[j].points)){
														that.$data.searchlist[i].useable = true;
														if(!isSelect){
															that.$data.searchlist[i].select = true;
															isSelect = true;
														}
													}
												}
												
											}
											setTimeout(()=>{
												that.animateLocation = false;
											},200)
										}
										if(isSelect){
											that.canConfirm = true;
										}else{
											that.canConfirm = true;
										}
									},
									fail:function(error){
										console.log(error);
									}
								};
							if(typeof(window)==='undefined'){
								delete options.sig;
							}
							if(options.sig===''){
								delete options.sig;
							}
							qqmapsdk.reverseGeocoder(options);
							
						}
				});
			},
			searchPosition(){
				if(this.searchKey.replace(/\s+/,'')==''){
					return;
				}
				let that = this;
				let searchOptions = {
					keyword:this.searchKey,
					location:{
						latitude:this.position.latitude,
						longitude:this.position.longitude
					},
					sig:that.sig,
					success:function(rst){
						let isSelect = false;
						if(rst.message == "query ok"){
							//that.$data.searchlist = [];
							that.$data.searchlist = [...rst.data];
							for(let i = 0;i<that.$data.searchlist.length;i++){
								that.$data.searchlist.useable = true;
								that.$data.searchlist.select = false;
								for(let j = 0;j < that.polygons.length;j++){
									if(that.isPointInPolygon(that.$data.searchlist[i].location.lat,that.$data.searchlist[i].location.lng,that.polygons[j].points)){
										that.$data.searchlist[i].useable = true;
										if(!isSelect){
											that.$data.searchlist[i].select = true;
											that.position.latitude = that.$data.searchlist[i].location.lat;
											that.position.longitude = that.$data.searchlist[i].location.lng;
											isSelect = true;
										}
									}
								}
								
							}
						}
						if(isSelect){
							that.canConfirm = true;
						}else{
							that.canConfirm = true;
						}
					}
				};
				if(typeof(window)==='undefined'){
					delete searchOptions.sig;
				}
				if(searchOptions.sig===''){
					delete searchOptions.sig;
				}
				
				qqmapsdk.search(searchOptions);
			},
			changeSelectItem(index){
				for(let i = 0;i<this.$data.searchlist.length;i++){
					let temp = {};
					for(var key in this.$data.searchlist[i]){
						temp[key] = this.$data.searchlist[i][key];
					}
					if(i===index){
						temp.select = true;
						this.isChangeSelectItem = true;
						this.position.latitude = temp.location.lat;
						this.position.longitude = temp.location.lng;						
					}else{
						temp.select = false;
					}
					this.$set(this.$data.searchlist,i,temp);
				}
				
			},
			handleRegionchange(e){
				console.log(e);
				this.animateLocation = false;
				if(e.type=='end'){
					if(this.isChangeSelectItem){
						setTimeout(()=>{
							this.isChangeSelectItem = false;
						},100)
						return;
					}else{
							this.animateLocation = true;
							if(handleRegionchangeTimmer){
								clearTimeout(handleRegionchangeTimmer);
							}
							handleRegionchangeTimmer = setTimeout(()=>{
								this.renderList();
							},400)
						
					}
				}
			},

			isPointInPolygon(aLat, aLon, pointList){
						return true;
						/* 
			            :param aLon: double 经度 
			            :param aLat: double 纬度 
			            :param pointList: list [{latitude: 22.22, longitude: 113.113}...] 多边形点的顺序需根据顺时针或逆时针，不能乱 
			            */
			            var iSum = 0  
			            var iCount = pointList.length
			              
			            if(iCount < 3) {
			                return false 
			            }
			            //  待判断的点(x, y) 为已知值
			            var y = aLat
			            var x = aLon
			            for(var i = 0; i < iCount; i++) {
			                var y1 = pointList[i].latitude
			                var x1 = pointList[i].longitude
			                if(i == iCount - 1) {
			                    var y2 = pointList[0].latitude
			                    var x2 = pointList[0].longitude
			                } else {
			                    var y2 = pointList[i + 1].latitude  
			                    var x2 = pointList[i + 1].longitude
			                }
			                // 当前边的 2 个端点分别为 已知值(x1, y1), (x2, y2)
							if (((y >= y1) && (y < y2)) || ((y >= y2) && (y < y1))) {
			                    //  y 界于 y1 和 y2 之间
			                    //  假设过待判断点(x, y)的水平直线和当前边的交点为(x_intersect, y_intersect)，有y_intersect = y
			                    // 则有（2个相似三角形，公用顶角，宽/宽 = 高/高）：|x1 - x2| / |x1 - x_intersect| = |y1 - y2| / |y1 - y|
			                    if (Math.abs(y1 - y2) > 0) {
			                        var x_intersect = x1 - ((x1 - x2) * (y1 - y)) / (y1 - y2);  
			                        if(x_intersect < x) {
			                            iSum += 1 
			                        }
			                    }
			                } 
			            }
			            if(iSum % 2 != 0) { //true就是在
			                return true  
			            }else { //false就是不在
			                return false 
			            }  
				},
				confirmSelect(){
					if(this.canConfirm){
						this.searchlist.forEach(val=>{
							if(val.select){
								val.polygonIndex = [];
								this.polygons.forEach((polygon,index)=>{
									if(this.isPointInPolygon(val.location.lat,val.location.lng,polygon.points)){
										val.polygonIndex.push(index);
									}
								})
								uni.setStorageSync('polygonLocationPicker',JSON.stringify(val));
								this.$emit('selected',JSON.stringify(val));
							}
						})
					}
				}
		}

	}
</script>

<style scoped lang="scss">
	@keyframes bounceInDown {
		   from,
		    20%,
		    53%,
		    to {
		      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		      transform: translate3d(0, 0, 0);
		    }
		  
		    40%,
		    43% {
		      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
		      transform: translate3d(0, -30rpx, 0) scaleY(1.1);
		    }
		  
		    70% {
		      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
		      transform: translate3d(0, -15rpx, 0) scaleY(1.05);
		    }
		  
		    80% {
		      transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		      transform: translate3d(0, 0, 0) scaleY(0.95);
		    }
		  
		    90% {
		      transform: translate3d(0, -4rpx, 0) scaleY(1.02);
		    }
	  }
	
	.box-picker_position{
		height: 100%;
		width: 100%;
		background: #fff;
		display: flex;
		flex-flow: column;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}
	.map_wp{
		position: relative;
		width: 750rpx;
		height: 400rpx;
	}
	.picker_map_location{
		width: 60rpx;
		height: 60rpx;
		background-image: url("data:image/svg+xml,%3Csvg t='1670988557938' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='3498' width='200' height='200'%3E%3Cpath d='M511.968 0c-207.84 0-376.96 169.12-376.96 376.992 0 54.208 11.104 105.984 32.96 153.888 94.24 206.24 274.976 424 328.128 485.824 3.968 4.608 9.792 7.296 15.904 7.296s11.904-2.656 15.904-7.296c53.12-61.824 233.856-279.552 328.128-485.824 21.888-47.904 32.96-99.648 32.96-153.888-0.032-207.872-169.152-376.992-376.992-376.992zM511.968 572.8c-107.968 0-195.808-87.84-195.808-195.808s87.84-195.84 195.808-195.84 195.808 87.84 195.808 195.84c0 107.968-87.84 195.808-195.808 195.808z' fill='%23fa3c23' p-id='3499'%3E%3C/path%3E%3C/svg%3E");
		background-size: cover;
		background-position: center bottom;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -30rpx;
		margin-top: -60rpx;
		z-index: 999;
		transform-origin: center bottom;
	}
	.picker_map_location.animated{
		animation: bounceInDown .6s linear infinite;
	}
	.picker-map{
		width: 750rpx;
		height: 400rpx;
	}
	.list-picker_position{
		position: relative;
		flex: 1;
		display: flex;
		flex-flow: column;
		overflow: hidden;
		.hd{
			padding: 20rpx 20rpx 10rpx;
			display: flex;
			.input_text{
				flex: 1;
				box-sizing: border-box;
				background: #f2f2f2;
				border-radius: 6rpx;
				height: 60rpx;
				font-size: 28rpx;
				padding-left: 1em;
			}
		}
		.bd{
			padding: 20rpx;
			box-sizing: border-box;
			flex: 1;
			overflow-y: scroll;
			.item{
				display: flex;
				padding: 15rpx 10rpx;
				border-bottom: 1px solid #ccc;
				line-height: 1.92;
				align-items: stretch;
				.title{
					font-size: 32rpx;
				}
				.address{
					font-size: 24rpx;
					color: #999;
					line-height: 1.5;
				}
			}
			.item-l{
				padding: 10rpx 6rpx 0 0;
			}
			.item-c{
				flex: 1;
			}
			.item-r{
				width: 60rpx;
				display: flex;
				align-items: center;
				align-content: center;
			}
			.item.disabled{
				opacity: .5;
			}
		}
	}
	.btn-search{
		background: #41a863;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		padding: 0;
		align-items: center;
		justify-content: center;
		width: 120rpx;
	}
	.picker-search{
		background-image: url("data:image/svg+xml,%3Csvg t='1670900132396' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='2679' width='200' height='200'%3E%3Cpath d='M685.6 660.336l155.152 155.168a16 16 0 0 1 0 22.624l-11.312 11.328a16 16 0 0 1-22.624 0l-158.528-158.544a289.792 289.792 0 0 1-165.152 51.36C322.336 742.256 192 611.904 192 451.12 192 290.336 322.336 160 483.136 160c160.784 0 291.12 130.336 291.12 291.136 0 82.112-33.984 156.272-88.672 209.2z m-202.464 33.92c134.272 0 243.12-108.848 243.12-243.12C726.256 316.848 617.408 208 483.136 208 348.848 208 240 316.848 240 451.136c0 134.272 108.848 243.12 243.136 243.12z' p-id='2680' fill='%23dbdbdb'%3E%3C/path%3E%3C/svg%3E");			background-size: cover;
		background-size: cover;
		width:36rpx;
		height: 36rpx;
		width: 36rpx;
		display: block;
		margin-right: 5rpx;
	}
	.picker-checked{
		background-image: url("data:image/svg+xml,%3Csvg t='1670909673260' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='3763' width='200' height='200'%3E%3Cpath d='M417.185185 768c-9.481481 0-18.962963-3.792593-26.548148-11.377778l-246.518518-246.518518c-15.17037-15.17037-15.17037-37.925926 0-53.096297 15.17037-15.17037 37.925926-15.17037 53.096296 0L417.185185 676.977778l409.6-409.6c15.17037-15.17037 37.925926-15.17037 53.096296 0 15.17037 15.17037 15.17037 37.925926 0 53.096296l-436.148148 436.148148c-7.585185 7.585185-17.066667 11.377778-26.548148 11.377778z' p-id='3764' fill='%231e63ed'%3E%3C/path%3E%3C/svg%3E");
		background-size: cover;
		width: 46rpx;
		height: 46rpx;
		display: block;
	}
	.picker-address{
		background-image: url("data:image/svg+xml,%3Csvg t='1670910118471' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4833' width='200' height='200'%3E%3Cpath d='M508.313 1018.666c0 0-379.51-422.921-379.51-632.516 0-209.606 169.914-379.51 379.51-379.51s379.511 169.903 379.51 379.51c0 209.596-379.51 632.516-379.51 632.516zM508.313 55.295c-182.719 0-330.854 150.305-330.854 335.72s330.854 559.534 330.854 559.534 330.854-374.117 330.854-559.534c0-185.415-148.135-335.72-330.854-335.72zM508.312 512.654c-87.336 0-158.129-70.793-158.129-158.129s70.793-158.129 158.129-158.129 158.129 70.793 158.129 158.129c0 87.328-70.793 158.129-158.129 158.129zM508.313 240.185c-64.488 0-116.772 52.285-116.772 116.772s52.285 116.772 116.772 116.772c64.498 0 116.772-52.285 116.772-116.772 0-64.488-52.275-116.772-116.772-116.772z' fill='%23666666' p-id='4834'%3E%3C/path%3E%3C/svg%3E");
		background-size: cover;
		width: 36rpx;
		height: 36rpx;
		display: block;
	}
	.btn-selected{
		background: #41a863;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #fff;
		border: none;
		border-radius: 0;
	}
	.btn-selected.disabled{
		background: #f2f2f2;
		color: #ccc;
	}
</style>
