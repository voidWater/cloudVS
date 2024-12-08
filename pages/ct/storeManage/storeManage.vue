<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">店铺管理</block>
		</cu-custom>
		<view class="cu-card article" @click="toEdit(0)" v-for="(item,index) in list">
			<view class="cu-item shadow">
				<view class="title"><view class="text-cut">{{item.title}}</view></view>
				<view class="content">
					<image :src="item.info.storeimgUrl"
					 mode="aspectFill"></image>
					<view class="desc">
						<view class="text-content"> {{item.info.description}}</view>
						<!-- <view>
							<view class="cu-tag bg-red light sm round">正义天使</view>
							<view class="cu-tag bg-green light sm round">史诗</view>
						</view> -->
					</view>
				</view>
			</view>
		</view>
		<button  @click="toEdit()" class="cu-btn margin-tb-sm lg" :style="{'background-color':customData.color}" style="color: #fff;width: 100%;" >新建店铺</button>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				done:false,
				list:[]
			}
		},
		computed: {
			...mapState( ['isLogin','userInfo','customData'])
		},
		onLoad() {
			if(!this.isLogin){
				this.$vscommon.toLogin();
			}
			this.storeController = uniCloud.importObject("storeController");
			this.query()
		},
		methods: {
			...mapMutations(['login']),
			toEdit(id){
				if(id){
					uni.navigateTo({
						url: "/pages/ct/storeManage/editStore/editStore?id="+id
					});
				}else{
					uni.navigateTo({
						url: "/pages/ct/storeManage/editStore/editStore"
					});
				}
			},
			query(){
				this.storeController.list({status:0}).then(res=>{
					if(res.data){
						this.list=res.data
					}
					console.log(this.list)
				})
			},
			rebackToRefresh(){
				this.query();
			}
		}
	}
</script>

<style>

</style>
