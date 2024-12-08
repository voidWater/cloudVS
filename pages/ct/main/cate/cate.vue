<template>
	<view>
		<cu-custom bgColor="bg-gradual-pink" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">列表</block>
		</cu-custom>
	</view>
</template>

<script>
	import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState( ['isLogin','customData'])
		},
		methods: {
			...mapMutations(['login']),
			
		}
	}
</script>

<style>

</style>
