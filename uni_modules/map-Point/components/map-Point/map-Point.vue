<template>
	<view class="map-min-box">
		<!-- 可视化地图 -->
		<view class="map-min-1" v-if="maptype == 1">
			<view class="map-box" v-if="longitude">
				<map
					id="myMap"
					:enable-poi="true"
					:show-location="true"
					style="height: 100%; width: 100%"
					:longitude="longitude"
					:latitude="latitude"
					scale="15"
					@regionchange="regionchangetab"
				>
					<cover-image :class="jump == 1 ? 'controls-play-img bounce-animation' : 'controls-play-img'" :src="orientationIco"></cover-image>
					<cover-image v-if="showResetting" @click="setposition" class="position-play-img" :src="resettingIco"></cover-image>
				</map>
			</view>
			<view class="sou-item-list">
				<view class="u-search-box" @click="opensea">
					<view class="search-min-box">
						<image src="https://lbs.gtimg.com/visual/miniprogram-plugin/location-picker/assets/s_search@2x.png" mode=""></image>
						搜索地点
					</view>
				</view>
				<view class="list-item-name-box">
					<view class="category-scroll-view">
						<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="lower">
							<view class="scroll-view-item" v-for="(item, index) in list" :key="index" @click="setpoi(item, index)">
								<view class="poi-item-name">
									<image :src="listIco" mode=""></image>
									{{ item.name }}
								</view>
								<view class="poi-address">{{ item.address }}</view>
								<view class="right-icon" v-if="locinx == index"></view>
							</view>
							<view class="loading-box" v-if="list.length == 0">
								<u-loading-icon :show="loading" text="加载中" textSize="30rpx" size="40rpx"></u-loading-icon>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="but-box">
					<view class="btn-location" @click="fixAddress">确认选点</view>
				</view>
			</view>
		</view>
		<view class="map-min-2" v-if="maptype == 2">
			<view style="height: 180rpx;"></view>
			<view class="map-min-2-search-box">
				<input v-model="keyword"  placeholder="搜索地点" @input="changeword" @confirm="changeword" class="locationpicker-search-content-ipt" />
				<view class="locationpicker-search-clear" @click="onClearInput">
					<image src="https://lbs.gtimg.com/visual/miniprogram-plugin/location-picker/assets/btn_close@2x.png" class="locationpicker-search-clear-ipt" mode=""></image>
				</view>
				<view class="locationpicker-search--content-btn-line"></view>
				<!-- <view class="locationpicker-search-content-btn" @click="changeword">搜索</view> -->
				<u-search placeholder="搜索地点" shape="square" bgColor="#ebebeb" v-model="keyword" @search='' @custom='changeword' @change="changeword"></u-search>
			</view>
			<u-line></u-line>
			<scroll-view scroll-y="true" class="scroll-Y">
				<block>
					<view class="scroll-view-item" v-for="(item, index) in seolist" :key="index" @click="seopoi(item, index)">
						<view class="poi-item-name">
							<image :src="listIco" mode=""></image>
							{{ item.name }}
						</view>
						<view class="poi-address">{{ item.address }}</view>
					</view>
				</block>
				<view class="loading-box" v-if="seolist.length == 0 && keyword != ''">
					<u-loading-icon :show="loading" text="加载中" textSize="30rpx" size="40rpx"></u-loading-icon>
				</view>
				<!-- 历史搜索记录 -->
				<view class="history-item-box" v-if="history.length == 0 && keyword == ''">
					<view class="empty-box">
						<view class="value-txt-box-1">还没有历史记录</view>
						<view class="value-txt-box-2">快来体验世界吧</view>
					</view>
				</view>
				<view class="history-item-box" v-if="history.length > 0 && keyword == ''">
					<view class="scroll-view-item" v-for="(item, index) in history" :key="index" @click="seopoi(item, index)">
						<view class="poi-item-name">
							<image src="/static/Invite/item-inx.png" mode=""></image>
							{{ item.name }}
						</view>
						<view class="poi-address">{{ item.address }}</view>
					</view>
					<view class="item-but-box" v-if="history.length > 0">
						<view class="locationpicker-clear-history-btn" @click="Clearhistory">清空历史记录</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
var amapFile = require('./amap-wx.js');
export default {
	name: 'gaode-map',
	props: {
		// 高德Web服务Key
		mapKey: {
			type: String,
			default: ''
		},
		// 定位复位图标
		resettingIco: {
			type: String,
			default:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAppJREFUaEPtWe1NAzEMTTehk0AngW7gDWg3yAaUSSiT0E3g3imurDSXxHECKrr7g3S9JH7Pz19h4+782dy5/W4F8NceXD2wesDIwFAJEdGDc+7Je38y2rm4fDSAL+ccQOxHgfgtAAfv/XGEF1YAktWg+efw7hAxfpni4eyce/fe42+Xp4sHguFvCNhKqwDm1ENWZgBEBKM/Emwj87yEIAbjMHrOSuJbvEeA47emxwSAiMA6jMQDI44y2xARZ6FrEAuZscRM3mgGQESvk9VsRJLJFACmOVoPELsWTzQBiGQDLe9T/iciSAuSgXE3gRu8gW8grYv3fqvVUSsAlsbZe79bOjQY6HLMEhEkCCniUdcLNYBI90lmtSwKOUFKCOrqNNsCgNlflE4DAEgI+6q9oAIQab8L+yKoOV6ysozJ0QK46nUqQqq1Ja+IWFAFc9EIDsRgAFInQMxpE+8KAVpsp8X++JYLIvae46CUWmsAfBfYWwy8XB3AniLN5o7IxloWQGCHgyt3yE2/H61NpsfhAAJLcC0/3LDNlbPk4tJEFskT2zFZ/SQkaZf5uqVq5lwoC5omQRRjIAIg83XvNMqNoaq+qAAESXUvZGFfThaq+bkFADOlLvtLEoqCeVtKnXKfFgCcr6s6SFTvXG8TVffxzVxwt5zCrO00Zx5VC8FeUHtA9C5yoEkOJIWBRrbR2LYpKVgAQEK4gVgcDTMjpbwAMMVSMwDhiZhJGMRXKDzUY8DHu/iqpUk2piBOZZKGaxVsow7Y1NlmDyQKHQL8UdxW8Cfz7cOk9U/NxFVoJMf+i6nUjZaMq/m9qwfiA/8DAB4TVe1BDfPmOlBzCN/C9bgDXTpvqIRqQFq/WQFYGbSuXz1gZdC6fvWAlUHr+h9gN19AhRDCKgAAAABJRU5ErkJggg=='
		},
		// 定位图标
		orientationIco: {
			type: String,
			default:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAd9JREFUWEfVV0FWwkAMTdq9yAmAm5Q9RW4gnEQ4CT0CUvbgSewNENd2olPAV0syman4eHbbafLz8/MzRbjxgzfOD/8LwH4y6cdlmRBSjwgTREgAoCCCAiMo0MBLGce77mpV+DLrzcB+Mkoig1uPwAUAZZ31ZuFxVm+BrRrLcnmq1ifm8QxCZjBeaGyoDBzG6SsA9P0z/zhZdNb5wPWtE8Bbmm6DK29mQ8g6z/lMAiECCOi5So6JaNhdbXbcQRGAB/WV2ACxD1RNg6tNYitYAGr1DVqtUCPz8filvLlEh8QCC+A9TaeEsOSCEcHuPs+HzXf6tNCcG00WwOEhXQLBlK+GD2TPHsajJ4kFCTgPwDl6MgAXc9YxuZFkAbjGT6rEMtDmuxYtsKkuWQgV7rm9QgvkXn7rAiGzy6eCg9RzTUDlzASzuzzPLn2KUdpxrEprwVd7TBQPuL0gG5FzEgJxOezYYcXXY0Gq/rg0HY9rrr05aLuMbALd3VQYv1vHZxBtBenags4xbNalOBxLg09yVQP1yCF6cLmllw9wJfnqISR5EAM+ogxNHgygJkp7PW/egFTFc8yqt2KpHZEp6yBaJW/FwBnQaV9UPyomopl06dScohUDdRDaj8efAtCC+7z/BM1rBTDA86U7AAAAAElFTkSuQmCC'
		},
		// 列表图标
		listIco: {
			type: String,
			default:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABD1JREFUeF7tWwGO2kAM3ED4B/eSFhEkflF4yR0vuesvkAg6+pK7voNIaYyyyLgOsXe9AQmQKlVNQtZjz3jWSzP34J/sweN3TwCeFfDgCNyMAsvlcgrYV1U1zfP8e7vdft8iF4MAAMFWVfXLOfezrutplmWn4OmnrusTCM31D+fcn7IsD6lBSQpAURSvTVCrroD7gmsBOUwmk02qCkkCAATeBPfWF6D0OgABVZHn+W9rIEwBgFI/Ho+fXMZ9EFmW/YW/Y95jPXDO/QCqtH8uMPLfUZblRgpe331mACwWi1Vd1+/MC6ES1HxGusFV0psVCCYAdJT8Ic/zdWzJdgEB1TCZTGax3x8NQFEUn0y5zqwVnKMXgLDf71/6yvza9SgAaOZbjq6tg/cBdFTDoSzLWSgIwQAURQFCBdk/fSyyIQ2CAf5jv9+vpc/j+2IAqHHwFnyUBtDS4TXLshV6Joh2QQDM5/N3i5dLA+bua+kAXQcqMbgC1QC0L/5CizJrSVpA6Foaj7He7XZgo8UfNQA4+0Pyviui2PWoAWgE6Mz9xuAE8Q6CabN32hiNx+NDaD9nKlK1JhUA1O01bkz1vA+cs8sxNpd4EVVbVAVAyk3deoSbJFUAACpuyVpaqgCIKX/qG66pVDMzUIEbQ4NgALTlj8GDLI1Go41XbNrSWnBUXMY00HQDMQA0gxoAmJ3if8ExIKioQHRA3JrFAJAgVIuTagfWCC2XiTm7LwCk2YkRMwKeWEPEFUAooKoAov6dzw5RZVR8xQBgpdWWJ81s18YJV4q2E8zn8y8/iksigrTVNAPKF6l7o8MMOjcw6gJBDlVcAa3hwNMfbZu6mB/4HVzHyFwsYr6kcZvVJCcGgJBFSsblKn0BAGIsuhYAHIB6oWgTdN7H46EKNkfi/axzjrRA1bpUAMRYThqQ3w3Cv8fMEGNnAioAGB1Qoa3JqvReOp3SOFR4hxoAyyqQBtl1X2z2gwCAh2KnMLGBI+W/OJPQZj8YgHuYC1Ll15gfnAA1BfzDt5wMMwkAIQ2KJeghbrRldVYnoQdzHKcyZSYVgHr6eUSu3SNIgqX3MMGrDZkZAJwL025iNCAwg5XoNhxMAbxwOuwMFaRrYKQ6izQBgDumAhBiHB4FA29322vBvDelgP8yqsyWemApehRYkwrwX0o5aqEHzFlCNO+TVAByZ3TLG6zSzFmCafDBTvCaWFnpAWd2Ys4iu9ZsSgGsB/j8L8QkpeR9UgogKtARmLh8GZsdTKM+n5GkAmL0YAjeD1IByCpf/Izlmj9I2UoH1QD8Mm4kLjkXsDQ712iQlAIak2S9yenjvr8+CAB9m6bUZufmFeAXwKk7/JD6Vj+4TGKE+kxS18/p0XMmm5y7o0CXHpCFDhr84BVAQBC3R2k2Q+4bTAS5xfn/KSI9ZQ4JsO+ZmwLQt7ghrj8BGALle37Hw1fAP+qnu26D9feYAAAAAElFTkSuQmCC'
		},
		//定位功能显示
		showResetting: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			maptype: 1,
			latitude: '',
			longitude: '',
			markers: [],
			list: [],
			history: [],
			seolist: [],
			myAmapFun: '',
			location: '',
			jump: 1,
			keyword: '',
			mapObj: '',
			loading: true,
			page: 1,
			count: 0,
			locinx: 0,
			changel: 1
		};
	},
	created: function () {
		var that = this;
		// if (options.locinx) {
		// 	that.locinx = options.locinx;
		// }
		that.mapObj = uni.createMapContext('myMap', this);
		that.myAmapFun = new amapFile.AMapWX({ key: this.mapKey });
		uni.getLocation({
			type: 'gcj02',
			altitude: true,
			geocode: true,
			isHighAccuracy: true,
			success: function (res) {
				try {
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					that.location = `${that.latitude},${that.longitude}`;
					that.attachments();
				} catch {}
			},
			fail: function (info) {
				//失败回调
				console.log(info, 2);
			}
		});
	},
	methods: {
		Clearhistory() {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确定清空全部历史记录？',
				success: function (res) {
					if (res.confirm) {
						uni.removeStorage({
							key: 'locationHistory',
							success: function (res) {
								console.log('success');
								_this.history = [];
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 返回
		getbacktrack() {
			if (this.maptype == 2) {
				var that = this;
				this.page = 1;
				that.attachments();
				this.maptype = 1;
				this.keyword = '';
			} else {
				uni.navigateBack({});
			}
		},
		// 确定地址
		fixAddress() {
			let location = this.list[this.locinx];
			console.log(123);
			this.$emit('commitCheck', location);
		},
		// 搜索选择
		seopoi(e) {
			var that = this;
			this.changel = 2;
			let lon = e.location.split(',');
			this.latitude = lon[1];
			this.longitude = lon[0];
			this.page = 1;
			this.list.push(e);
			const val = this.history.find((k) => k.id == e.id);
			if (!val) {
				this.history.unshift(e);
				uni.setStorage({
					key: 'locationHistory',
					data: this.history,
					success: function () {
						console.log('success');
					}
				});
			}
			that.location = e.location;
			that.attachments();
			setTimeout(() => {
				that.changel = 1;
			}, 1000);
			this.maptype = 1;
			this.keyword = '';
		},
		// 搜索
		changeword() {
			var that = this;
			console.log(that.location)
			that.loading = true;
			that.seolist = [];
			that.myAmapFun.getInputtips({
				location: that.location,
				keywords: that.keyword,
				city:'460100',
				success: function (data) {
					console.log(data, '--1--');
					data.tips.forEach((item, index) => {
						//成功回调
						if (item.location != '') {
							let province = item.district.match(/^(.*?省|.*?自治区)/)[0];
							let city = '';
							if (item.district.replace(province, '') != '') {
								city = item.district.replace(province, '').match(/^(.*?市|.*?地区)/)[0];
							}
							let district = '';
							if (item.district.replace(province + city, '') != '') {
								district = item.district.replace(province + city, '').match(/^.*?(区|县|镇)/)[0];
							}
							that.seolist.push({
								id: item.id,
								name: item.name,
								address: item.address,
								location: item.location,
								province: province,
								city: city,
								district: district
							});
						}
					});
					that.count = data.count;
					that.loading = false;
					uni.hideLoading();
				},
				fail: function (info) {
					//失败回调
					console.log(info, 2);
				}
			});
		},
		// 选择定位坐标地址
		setpoi(e, inx) {
			var that = this;
			this.locinx = inx;
			this.changel = 2;
			let lon = e.location.split(',');
			this.latitude = lon[1];
			this.longitude = lon[0];
			setTimeout(() => {
				that.changel = 1;
			}, 1000);
		},
		// 下拉加载
		lower() {
			if (this.list.length != this.count) {
				this.page++;
				uni.showLoading({
					title: '加载中...'
				});
				this.attachments();
			}
		},
		// 复原定位
		setposition() {
			var that = this;
			this.changel = 2;
			this.locinx = 0;
			this.page = 1;
			uni.getLocation({
				type: 'gcj02',
				altitude: true,
				geocode: true,
				isHighAccuracy: true,
				success: function (res) {
					console.log(res, 5656);
					try {
						that.location = `${res.latitude},${res.longitude}`;
						setTimeout(() => {
							console.log(that.mapObj, 'mod--1');
							that.mapObj.moveToLocation({
								latitude: res.latitude,
								longitude: res.longitude,
								scale: 15, // 可选，缩放比例
								animation: true, // 开启平滑移动动画
								complete(res) {
									console.log(res, '6633');
								}
							});
						}, 400);
						that.list = [];
						that.loading = true;
						that.attachments();
						setTimeout(() => {
							that.changel = 1;
						}, 1000);
					} catch {}
				},
				fail: function (info) {
					//失败回调
					console.log(info, 2);
				}
			});
		},
		// 搜索跳转
		opensea() {
			this.list = [];
			this.seolist = [];
			this.maptype = 2;
			let _this = this;
			uni.getStorage({
				key: 'locationHistory',
				success: function (res) {
					_this.history = res.data;
					console.log(_this.history, 5656);
				}
			});
		},
		// 发生变化定位
		regionchangetab(e) {
			if (this.changel == 1) {
				if (e.type == 'end') {
					this.page = 1;
					this.jump = 0;
					this.location = `${e.detail.centerLocation.latitude},${e.detail.centerLocation.longitude}`;
					// this.latitude = e.detail.centerLocation.latitude;
					// this.longitude = e.detail.centerLocation.longitude;
					this.list = [];
					this.attachments();
					setTimeout(() => {
						this.jump = 1;
					}, 400);
				}
			}
		},
		// 获取附近poi
		attachments() {
			var that = this;
			that.myAmapFun.getPoiAround({
				location: that.location,
				page: that.page,
				success: function (data) {
					console.log(data, '--1--', that.location);
					if (data) {
						data.poisData.forEach((item, index) => {
							//成功回调
							that.list.push({
								id: item.id,
								name: item.name,
								address: item.address,
								location: item.location,
								province: item.pname,
								city: item.cityname,
								district: item.adname
							});
						});
						that.count = data.count;
					}

					that.loading = false;
					uni.hideLoading();
				},
				fail: function (info) {
					//失败回调
					console.log(info, 2);
				}
			});
		},
		onClearInput() {
			this.keyword = '';
			this.seolist = [];
		}
		// // 点击定位
		// makertap(e) {
		// 	this.jump = 0;
		// 	this.location = `${e.detail.latitude},${e.detail.longitude}`;
		// 	this.mapObj.moveToLocation({
		// 		latitude: e.detail.latitude,
		// 		longitude: e.detail.longitude,
		// 		scale: 15, // 可选，缩放比例
		// 		animation: true // 开启平滑移动动画
		// 	});
		// 	this.changel=1
		// 	// setTimeout(() => {
		// 	// this.latitude = e.detail.latitude;
		// 	// this.longitude = e.detail.longitude;
		// 	// }, 1200);
		// }
	}
};
</script>

<style lang="scss">
.map-min-box {
	height: 100vh;
	width: 100vw;
	overflow: hidden;
	.top-box {
		background-color: #fff;
		.block_1 {
			position: relative;
			.Title-top {
				text-align: center;
				font-size: 34rpx;
				font-weight: 500;
				color: #000000;
			}
			.ioc-box {
				position: absolute;
				z-index: 999;
				left: 18rpx;
				top: 0rpx;
				height: 100%;
				display: flex;
				/deep/ .u-icon {
					.u-icon__icon {
						font-size: 45rpx !important;
						font-weight: bold !important;
					}
				}
			}
		}
	}
	// 可视化地图选点
	.map-min-1 {
		width: 100%;
		height: 100%;
		.map-box {
			width: 100%;
			height: 50%;
			#myMap {
				width: 100%;
				height: 100%;
				position: relative;
			}
			@keyframes bounce {
				0% {
					top: 50%;
					animation-timing-function: ease-in;
				} /* 动画开始时图片位于原始位置 */
				50% {
					top: 40%;
				} /* 动画进行到一半时，图片向上移动10像素 */
				100% {
					top: 50%;
					animation-timing-function: ease-out;
				} /* 动画结束时回到原始位置 */
			}
			.bounce-animation {
				animation: bounce 0.6s alternate; /* 动画名称、持续时间、重复次数和交替方向 */
			}
			.controls-play-img {
				height: 88rpx;
				left: 50%;
				margin-left: -40rpx;
				margin-top: -88rpx;
				top: 50%;
				width: 80rpx;
				z-index: 9999;
				position: absolute;
			}
			.position-play-img {
				bottom: 32rpx;
				height: 66rpx;
				right: 16rpx;
				width: 66rpx;
				border-radius: 50%;
				background-color: #fff;
				overflow: hidden;
				z-index: 9999;
				position: absolute;
			}
		}
		.sou-item-list {
			width: 100%;
			height: 50%;
			.u-search-box {
				padding: 28rpx 32rpx 20rpx;
				.search-min-box {
					background: #f2f2f2;
					border-radius: 14rpx;
					box-sizing: border-box;
					color: #999;
					font-size: 28rpx;
					height: 68rpx;
					line-height: 40rpx;
					padding: 14rpx 22rpx;
					image {
						display: inline-block;
						height: 32rpx;
						vertical-align: middle;
						width: 32rpx;
					}
				}
			}
			.list-item-name-box {
				height: calc(100% - 108rpx - 160rpx);
				width: calc(100% - 60rpx);
				padding: 0 20rpx 0 40rpx;
				.category-scroll-view {
					width: 100%;
					height: 100%;
					.scroll-Y {
						width: 100%;
						height: 100%;
						.scroll-view-item {
							border-bottom: 2rpx solid #e5e5e5;
							margin-right: 20rpx;
							padding: 32rpx 0 30rpx;
							position: relative;
							.poi-item-name {
								color: #333;
								font-size: 32rpx;
								line-height: 44rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								width: 90%;
								image {
									display: inline-block;
									height: 36rpx;
									margin-right: 8rpx;
									margin-top: -8rpx;
									vertical-align: middle;
									width: 36rpx;
								}
							}
							.poi-address {
								color: #666;
								font-size: 26rpx;
								line-height: 36rpx;
								margin-left: 44rpx;
								margin-top: 10rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								width: 80%;
							}
							.right-icon {
								border-bottom: 4rpx solid #427cff;
								border-left: 4rpx solid #427cff;
								height: 8rpx;
								margin-top: -2rpx;
								position: absolute;
								right: 0;
								top: 50%;
								-webkit-transform: rotate(-45deg);
								transform: rotate(-45deg);
								width: 20rpx;
							}
						}
						.loading-box {
							height: 100%;
							width: 100%;
							display: flex;
							/deep/ .u-loading-icon {
								margin: auto;
							}
						}
					}
				}
			}
			.but-box {
				padding: 20rpx 40rpx 22rpx;
				border-top: 2rpx solid #e5e5e5;
				padding-bottom: calc(22rpx + 30rpx);
				.btn-location {
					background: #427cff;
					border-radius: 200rpx;
					color: #fff;
					font-size: 32rpx;
					height: 68rpx;
					line-height: 68rpx;
					text-align: center;
				}
			}
		}
	}
	// 可视化地图选点结束
	.map-min-2 {
		width: 100vw;
		height: 100vh;
		background-color: #fff;
		.map-min-2-search-box {
			height: 84rpx;
			background: #efefef;
			border-radius: 7px;
			height: 42px;
			margin: 0 14px 10px;
			display: -webkit-flex;
			display: flex;
			-webkit-justify-content: space-around;
			justify-content: space-around;
			input {
				cursor: auto;
				display: block;
				font-family: UICTFontTextStyleBody;
				height: 1.4rem;
				min-height: 1.4rem;
				overflow: hidden;
				text-overflow: clip;
				white-space: nowrap;
			}
			.locationpicker-search-content-ipt {
				height: 42px;
				padding-left: 10px;
				width: 70%;
			}
			.locationpicker-search-clear {
				height: 43px;
				text-align: center;
				width: 33px;
				.locationpicker-search-clear-ipt {
					height: 16px;
					margin-top: 13px;
					width: 16px;
				}
				image {
					display: none;
				}
			}
			.locationpicker-search--content-btn-line {
				background: #c7c7c7;
				height: 16px;
				margin: 13px -10px 0 0;
				width: 1px;
			}
			.locationpicker-search-content-btn {
				color: #427cff;
				height: 42px;
				line-height: 42px;
				padding: 0 10px 0 20px;
			}
		}
		.scroll-Y {
			height: calc(100vh - 87px - 150rpx);
			width: 100vw;
			.scroll-view-item {
				border-bottom: 2rpx solid #e5e5e5;
				padding: 30rpx 40rpx 30rpx 40rpx;
				position: relative;
				.poi-item-name {
					color: #333;
					font-size: 32rpx;
					line-height: 44rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 90%;
					image {
						display: inline-block;
						height: 36rpx;
						margin-right: 8rpx;
						margin-top: -8rpx;
						vertical-align: middle;
						width: 36rpx;
					}
				}
				.poi-address {
					color: #666;
					font-size: 26rpx;
					line-height: 36rpx;
					margin-left: 44rpx;
					margin-top: 10rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					width: 80%;
				}
			}

			// 历史
			.history-item-box {
				width: 100vw;
				height: 100%;
				.empty-box {
					padding: 200rpx 0;
					text-align: center;
					width: 100%;
					.value-txt-box-1 {
						margin: 10rpx auto;
					}
					.value-txt-box-2 {
						color: #666;
						font-size: 26rpx;
						margin: 0 auto;
					}
				}
				.item-but-box {
					height: 160rpx;
					padding-top: 20rpx;
					.locationpicker-clear-history-btn {
						border: 2rpx solid #c7c7c7;
						border-radius: 32rpx;
						color: #666;
						font-size: 26rpx;
						height: 60rpx;
						line-height: 60rpx;
						margin: 0 auto;
						text-align: center;
						width: 268rpx;
					}
				}
				.scroll-view-item {
					border-bottom: 2rpx solid #e5e5e5;
					padding: 30rpx 40rpx 30rpx 40rpx;
					position: relative;
					.poi-item-name {
						color: #333;
						font-size: 32rpx;
						line-height: 44rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 90%;
						image {
							display: inline-block;
							height: 36rpx;
							margin-right: 8rpx;
							margin-top: -8rpx;
							vertical-align: middle;
							width: 36rpx;
						}
					}
					.poi-address {
						color: #666;
						font-size: 26rpx;
						line-height: 36rpx;
						margin-left: 44rpx;
						margin-top: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						width: 80%;
					}
				}
			}
		}
	}
}
</style>
