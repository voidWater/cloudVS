<template>
	<view>
		<view>
			<view></view>
		</view>
		<view style="margin-top: 300rpx;">
			<view class="grid padding margin-bottom text-center col-2">
				<view class="padding"  v-for="(item,index) in tags" :key="index">
					<view class="user-tag" @click="switchPanel(index)">
						<text class="lg text-gray " :class="item.cuIcon" style="font-size: 56rpx;"></text>
						<view>{{item.name}}</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:'user',
		props:{
			
		},
		data() {
			return {
				tags:[
					{
						name:'店铺管理',
						cuIcon:'cuIcon-shop'
					},{
						name:'分类管理',
						cuIcon:'cuIcon-cascades'
					},{
						name:'商品管理',
						cuIcon:'cuIcon-goods'
					},{
						name:'订单管理',
						cuIcon:'cuIcon-punch'
					},{
						name:'营销管理',
						cuIcon:'cuIcon-group'
					},{
						name:'统计',
						cuIcon:'cuIcon-rank'
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			toLogin(){
				uni.navigateTo({
					url: '/pages/ct/login/login'
				});
			},
			switchPanel(index){
				if(index == 1){
					uni.navigateTo({
						url: '/pages/ct/categoryManage/categoryManage'
					});
				}else if(index == 0){
					uni.navigateTo({
						url: '/pages/ct/storeManage/storeManage'
					});
				}else{
					uni.navigateTo({
						url: '/pages/ct/productManage/productManage'
					});
				}
			}
		},
		computed: {
					// 调用 mapState 方法， 把m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
					// ...mapSate('模块的名称',['要映射的模块里的数据名称'])
					// ...mapState('m_cart', ['cart'])
		}
	}
</script>

<style scoped>
.user-tag{
	border: 1rpx solid silver;
	padding: 60rpx 0;
	border-radius: 20rpx;
}
</style>
