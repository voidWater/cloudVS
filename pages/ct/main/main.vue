<template>
	<view>
		<view>
			<user v-if="showIndex == 5"></user>
		</view>
		
		<view class="footer cu-bar tabbar  bg-white">
			<view class="action text-gray" :style="{'color': showIndex == 1? customData.color:''}" @click="switchTab(1)">
				<view class="cuIcon-homefill"></view> 首页
			</view>
			<view class="action text-gray" :style="{'color': showIndex == 2? customData.color:''}" @click="switchTab(2)">
				<view class="cuIcon-similar"></view> 分类
			</view>
			<view class="action text-gray add-action" :style="{'color': showIndex == 3? customData.color:''}" @click="switchTab(3)">
				<button class="cu-btn cuIcon-add bg-green shadow"></button>
				发布
			</view>
			<view class="action text-gray" :style="{'color': showIndex == 4? customData.color:''}" @click="switchTab(4)">
				<view class="cuIcon-cart">
					<view class="cu-tag badge">99</view>
				</view>
				购物车
			</view>
			<view class="action text-gray" :style="{'color': showIndex == 5? customData.color:''}" @click="switchTab(5)">
				<view class="cuIcon-my">
					<view class="cu-tag badge"></view>
				</view>
				我的
			</view>
		</view>
	</view>
</template>

<script>
	import user from "./user/user.vue"
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		components:{
			user
		},
		data() {
			return {
				showIndex:1
			}
		},
		computed: {
			...mapState( ['isLogin','customData'])
		},
		onLoad(){
			
		},
		methods: {
			...mapMutations(['login']),
			switchTab(index){
				this.showIndex = index;
			}
		}
	}
</script>

<style scoped>
.footer{
	position: absolute;
	bottom: 0rpx;
	width: 100%;
}
</style>
