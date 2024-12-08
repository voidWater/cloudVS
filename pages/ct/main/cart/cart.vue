<template>
	<view>
		
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
