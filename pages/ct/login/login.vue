<template>
	<view>
		<view v-if="done">
			<view class="padding flex flex-direction bottom">
				<button v-if="isLoading" class="cu-btn margin-tb-sm lg"  :style="{'background-color':customData.color}" style="color:#fff;" loading disabled="true">登录中 </button>
				<button v-else  @click="submit" class="cu-btn margin-tb-sm lg" :style="{'background-color':customData.color}" style="color: #fff;" >微信登录{{}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				done:false,
				isLoading:false,
				userController:null
			}
		},
		computed: {
			...mapState( ['isLogin','customData'])
		},
		onLoad() {
			this.userController = uniCloud.importObject("userController");
			this.done = true;
		},
		methods: {
			...mapMutations(['login']),
			custom(){
				//this.$store.state.isLoading
			},
			submit(){
				this.isLoading = true
				var that = this;
				uni.login({
					provider: 'weixin',
					success: res => {
						let code = res.code;//获取登录需要的code
						this.userController.userLogin(code).then(res=>{
							console.log(res.open_id.mp);
							var openId = res.open_id.mp;
							this.userController.checkUser(openId).then(res=>{//判断是否存在用户
								if(res){
									this.userController.getUserInfo(openId).then(res=>{
										this.login(res)
										this.reback()
									})
								}else{
									this.userController.createUser(openId).then(res=>{
										console.log("create",res);
										this.login(res)
										this.reback();
									})
								}
							})
						}).catch(res=>{
							console.log("c1",res)
						}).finally(()=>{
							this.isLoading = false;
						})
					},
					fail: (res) => {
						console.log("sdd",res)
					}
				});
			},
			reback(){
				uni.navigateBack({
				  delta:1
				})
			}
		}
	}
</script>

<style scoped>
.bottom{
	position: absolute;
	bottom: 20rpx;
	width: 100%;
}

</style>
