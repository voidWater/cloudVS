<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{type==0?'新增分类':'编辑分类'}}</block>
		</cu-custom>
		<form>
			<view class="cu-form-group ">
				<view class="title">分类名</view>
				<input placeholder="分类名" name="input"  v-model="form.name"></input>
			</view>
			<view class="cu-form-group align-start">
				<textarea maxlength="-1" v-model="form.description" placeholder="分类简介"></textarea>
			</view>
			<view class="cu-form-group ">
				<view class="title">热卖</view>
				<switch @change="switchHot" :class="form.is_hot_show?'checked':''" :checked="form.is_hot_show?true:false"></switch>
			</view>
			<view class="cu-form-group ">
				<view class="title">首页置顶</view>
				<switch @change="switchUp" :class="form.is_index_show?'checked':''" :checked="form.is_index_show?true:false"></switch>
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
import form from '../../../../uni_modules/uview-ui/libs/config/props/form';
	export default {
		data() {
			return {
				type:0, //0新增，1修改
				form:{
					parent_id:'0',//默认零
					name:"",
					icon:"",
					sort:"0",
					description:"",
					is_hot_show:false,
					is_index_show:false
				}
			}
		},
		computed: {
			...mapState( ['isLogin','customData'])
		},
		onLoad(option){
			this.categoryController = uniCloud.importObject("categoryController");
			this.type = option.type;
			this.id = option.id;
			if(this.type == 1){
				this.getCategory(this.id);
			}
		},
		methods: {
			...mapMutations(['login']),
			submit(){
				if(this.form.name){
					this.categoryController.list({name:this.form.name}).then(res=>{
						console.log(res.data.length)
						if(res.data.length > 0){
							this.$vscommon.showToast("分类名已存在!")
							return;
						}else{
							if(this.type==0){//新增
								this.categoryController.add(this.form).then(res=>{
									console.log(res)
									this.$vscommon.rebackAndRefresh(true);
								})
							}else{//修改
								this.categoryController.updata(this.form).then(res=>{
									console.log(res)
									this.$vscommon.rebackAndRefresh(true);
								})
							}
							
						}
					})
					
				}else{
					uni.showModal({
						title:'分类名不能为空！'
					})
				}
			},
			getCategory(id){
				this.categoryController.get(id).then(res=>{
					if(res.data.length > 0 && res.data.length == 1){
						this.form = res.data[0]
					}
				})
			},
			switchHot(e){
				this.form.is_hot_show = e.detail.value
			},
			switchUp(e){
				this.form.is_index_show = e.detail.value
			}
		}
	}
</script>

<style>

</style>
