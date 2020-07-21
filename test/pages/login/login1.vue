<template>
	<view class="content">
		<view class="box">
			<view class="title">
				<view v-for='(item,i) in lis' :key='i' :class="{active:flag===i}" @click="switchActive(i)" style="margin:20upx;width: 200upx;text-align: center;padding-bottom: 15upx;">
					{{item}}
				</view>
			</view>
			<view v-if="flag===0">
				<input type="text" placeholder="请输入手机号" v-model="username">
				<input type="password" placeholder="请输入密码" v-model="password">
				<button @click="login()">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: 0,
				lis: ['密码登录'],
				username: '',
				password: '',
			};
		},
		methods: {
			switchActive(i) {
				this.flag = i;
			},
			login() {
				// 向服务器发起请求，如果返回token则登录成功，储存token跳转至 home界面
				uni.request({
					url: 'http://139.155.25.239:3001/user/login',
					data: {
						telephone: this.username,
						password: this.password
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						if(res.data.code===0){
							uni.setStorageSync('token',res.data.data.token)
							uni.setStorageSync('id',res.data.data.id)
							uni.showToast({
								title:'登录成功',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.switchTab({
											url: '../home/home'
										})
									},1500)
								}
							})
						}else if(res.data.code===1){
							uni.showToast({
								title:'账号密码错误或该账号暂未注册',
								icon:'none'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							title:'请稍后再试',
							icon:'none'
						})
					}
				})
				// if (this.username === 'NB00' && this.password === '000000') {
				// 	uni.setStorage({
				// 		key: 'token',
				// 		data: {
				// 			token: 1
				// 		}
				// 	})
				// 	console.log('跳转页面')

				// } else {
				// 	uni.showToast({
				// 		title: '登录失败',
				// 		icon: 'none',
				// 	})
				// }
			},
			regist() {
				console.log('注册')
				uni.request({
					url: 'http://139.155.25.239:3001/user/regist',
					data: {
						telephone: this.username,
						password: this.password
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						if(res.data.code===0){
							uni.showToast({
								title:res.data.data,
								icon:'none'
							})
						}else if(res.data.code===1){
							uni.showToast({
								title:res.data.data,
								icon:'none'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							title:'请稍后再试',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #FFF1DC;
		background-image: url(../../static/image/logo.png);
		background-repeat: no-repeat;
		background-size: 100% 35%;
		background-position: center top;

		.box {
			margin-top: 60%;
		}

		.title {
			display: flex;
		}
	}

	input {
		width: 90%;
		height: 100upx;
		margin: 40upx auto;
		box-sizing: border-box;
		padding: 20upx;
		border-radius: 50upx;
		background-color: #FFFFFF;
	}

	button {
		width: 90%;
		background-color: #566DCC;
		margin: 40upx auto;
	}

	.active {
		border-bottom: 10upx solid #000000;
	}
</style>
