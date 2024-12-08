<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">列表</block>
		</cu-custom>
		<view class="cu-bar bg-white solid-bottom ">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 分类列表
			</view>
			<view class="action">
				<button class="cu-btn shadow text-white" :style="{'background-color': customData.color}" @click="toEditCategory(0,'')" >新增</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='gridModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop>
				<radio-group class="block" @change="Gridchange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in 3" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{index +3}} 列</view>
								<radio class="round" :value="(index + 3) + ''" :class="gridCol==index+3?'checked':''" :checked="gridCol==index+3"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="cu-list menu text-left solid-top">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">边框</text>
						</view>
						<view class="action">
							<switch @change="Gridswitch" :class="gridBorder?'checked':''" :checked="gridBorder?true:false"></switch>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']">
			<view class="cu-item" v-for="(item,index) in list" :key="index" v-if="index<gridCol*2" @click="toEditCategory(1,item._id)">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				list: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: 'VR'
				}],
				modalName: null,
				gridCol: 3,
				gridBorder: false,
				menuBorder: false,
				menuArrow: false,
				menuCard: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
			};
		},
		computed: {
			...mapState( ['isLogin','customData'])
		},
		onLoad(){
			this.categoryController = uniCloud.importObject("categoryController");
			this.getList()
		},
		methods: {
			...mapMutations(['login']),
			toEditCategory(type,id){
				uni.navigateTo({
					url: '/pages/ct/categoryManage/editCategory/editCategory?type='+type+"&id="+id
				});
			},
			getList(){
				this.categoryController.list({}).then(res=>{
					console.log(res)
					let list = []
					for(let i = 0;i<res.data.length;i++){
						list.push({
							_id: res.data[i]._id,
							cuIcon: 'commandfill',
							color: 'purple',
							badge: 0,
							name: res.data[i].name
						})
					}
					this.list = list;
				})
			},
			rebackToRefresh(data){
				console.log(data)
				this.getList();
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			Gridchange(e) {
				this.gridCol = e.detail.value
			},
			Gridswitch(e) {
				this.gridBorder = e.detail.value
			},
			MenuBorder(e) {
				this.menuBorder = e.detail.value
			},
			MenuArrow(e) {
				this.menuArrow = e.detail.value
			},
			MenuCard(e) {
				this.menuCard = e.detail.value
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			
			// ListTouch计算方向
			// ListTouchMove(e) {
			// 	this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			// },
			
			// ListTouch计算滚动
			// ListTouchEnd(e) {
			// 	if (this.listTouchDirection == 'left') {
			// 		this.modalName = e.currentTarget.dataset.target
			// 	} else {
			// 		this.modalName = null
			// 	}
			// 	this.listTouchDirection = null
			// }
			
		}
	}
</script>

<style>
	.page {
		height: 100Vh;
		width: 100vw;
	}

	.page.show {
		overflow: hidden;
	}

	.switch-sex::after {
		content: "\e716";
	}

	.switch-sex::before {
		content: "\e7a9";
	}

	.switch-music::after {
		content: "\e66a";
	}

	.switch-music::before {
		content: "\e6db";
	}
</style>
