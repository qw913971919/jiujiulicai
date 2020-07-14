<template>
	<view>
		<!-- 使用子组件并向子组件传递参数，以及可以调用的两个父组件函数 -->
		<child :title="title" @modifyname='modifyname' @modifyqq='modifyqq' @modifypassword='modifypassword'></child>
	</view>
</template>

<script>
	import child from '../../components/input.vue'//引入子组件
	export default {
		data() {
			return {
				title:'',
				username:'',
				name:'',
				qq:'',
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
				uni.request({
					url:'http://139.155.25.239:3001/user/getUserInfo',
					method:'POST',
					data:{
						id:uni.getStorageSync('id'),
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res,'用户信息')
						if(res.data.code===401){
							uni.showToast({
								title:'登录已超时，请重新登录',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.redirectTo({
											url: '../login/login1'
										})
									},1500)
								}
							})
						};
						if(res.data.code===0){
							this.username=res.data.data.username;
							this.name=res.data.data.name;
							this.qq=res.data.data.qq;
							uni.request({
								url:'http://139.155.25.239:3001/user/completeinfo',
								method:'POST',
								data:{
									id:uni.getStorageSync('id'),
									username:re,
									qq:this.qq,
									name:this.name,
								},
								header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
								success:(res)=>{
									console.log(res,'参数')
									if(res.data.code===401){
										uni.showToast({
											title:'登录已超时，请重新登录',
											icon:'none',
											success:(res)=>{
												setTimeout(()=>{
													uni.redirectTo({
														url: '../login/login1'
													})
												},1500)
											}
										})
									};
									if(res.data.code===0){
										uni.showToast({
											title:'更新成功',
											icon:'none',
											success: (res) => {
												setTimeout(()=>{
													uni.switchTab({
														url: '../home/home'
													})
												},1500)
											}
										})
									}
								}
							})
						}
					}
				})

			},
			modifypassword(re){
				uni.request({
					url:'http://139.155.25.239:3001/user/getUserInfo',
					method:'POST',
					data:{
						id:uni.getStorageSync('id'),
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res,'用户信息')
						if(res.data.code===401){
							uni.showToast({
								title:'登录已超时，请重新登录',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.redirectTo({
											url: '../login/login1'
										})
									},1500)
								}
							})
						};
						if(res.data.code===0){
							this.username=res.data.data.username;
							this.name=res.data.data.name;
							this.qq=res.data.data.qq;
							uni.request({
								url:'http://139.155.25.239:3001/user/changeUserPassword',
								method:'POST',
								data:{
									id:uni.getStorageSync('id'),
									password:re
								},
								header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
								success:(res)=>{
									console.log(res,'参数')
									if(res.data.code===401){
										uni.showToast({
											title:'登录已超时，请重新登录',
											icon:'none',
											success:(res)=>{
												setTimeout(()=>{
													uni.redirectTo({
														url: '../login/login1'
													})
												},1500)
											}
										})
									};
									if(res.data.code===0){
										uni.showToast({
											title:'更新成功',
											icon:'none',
											success: (res) => {
												setTimeout(()=>{
													uni.switchTab({
														url: '../home/home'
													})
												},1500)
											}
										})
									}
								}
							})
						}
					}
				})
			},
			modifyqq(re){
				console.log('调用了修改qq的接口'+re)
				uni.request({
					url:'http://139.155.25.239:3001/user/getUserInfo',
					method:'POST',
					data:{
						id:uni.getStorageSync('id'),
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res,'用户信息')
						if(res.data.code===401){
							uni.showToast({
								title:'登录已超时，请重新登录',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.redirectTo({
											url: '../login/login1'
										})
									},1500)
								}
							})
						};
						if(res.data.code===0){
							this.username=res.data.data.username;
							this.name=res.data.data.name;
							this.qq=res.data.data.qq;
							uni.request({
								url:'http://139.155.25.239:3001/user/completeinfo',
								method:'POST',
								data:{
									id:uni.getStorageSync('id'),
									username:this.username,
									name:this.name,
									qq:re
								},
								header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
								success:(res)=>{
									console.log(res,'参数')
									if(res.data.code===401){
										uni.showToast({
											title:'登录已超时，请重新登录',
											icon:'none',
											success:(res)=>{
												setTimeout(()=>{
													uni.redirectTo({
														url: '../login/login1'
													})
												},1500)
											}
										})
									};
									if(res.data.code===0){
										uni.showToast({
											title:'更新成功',
											icon:'none',
											success: (res) => {
												setTimeout(()=>{
													uni.switchTab({
														url: '../home/home'
													})
												},1500)
											}
										})
									}
								}
							})
						}
					}
				})
				console.log(this.username,'名字')

			}
		}
	}
</script>

<style lang="scss">

</style>
