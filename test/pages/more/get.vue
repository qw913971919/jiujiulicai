<template>
	<view>
		<!-- 使用子组件并向子组件传递参数，以及可以调用的两个父组件函数 -->
		<child :title="title" @modifyname='modifyname' @modifyqq='modifyqq'></child>
	</view>
</template>

<script>
	import child from '../../components/input.vue'//引入子组件
	export default {
		data() {
			return {
				title:''
			};
		},
		onLoad(option){
			this.title=option.type
			console.log(this.title)
		},
		components:{
			'child':child,//注册子组件
		},
		methods:{
			modifyname(re){
				console.log('调用了修改姓名的接口'+re)
			},
			modifyqq(re){
				console.log('调用了修改qq的接口'+re)
			}
		}
	}
</script>

<style lang="scss">

</style>
