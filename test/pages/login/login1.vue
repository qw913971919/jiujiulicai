<template>
	<view class="content">
		<view class="box">
			<view class="title">
				<view v-for='(item,i) in lis' :key='i' :class="{active:flag===i}" @click="switchActive(i)" style="padding:20upx;width: 100%;text-align: center;padding-bottom: 15upx;font-size: 35upx;">
					{{item}}
				</view>
			</view>
			<view style="display: flex;">
				<view style="width: 100%;flex-shrink: 0;position: relative;top:130upx;":animation="animationData">
					<input type="text" placeholder="请输入手机号" v-model="username">
					<input type="password" placeholder="请输入密码" v-model="password">
					<button @click="login()" style="background: #A4B1E3;">登录</button>
				</view>
				<view style="width: 100%;flex-shrink: 0;" :animation="animationData">
					<input type="text" placeholder="请输入您的注册手机号" v-model="username">
					<input type="password" placeholder="请输入您的密码" v-model="password">
					<input type="password" placeholder="请再次验证密码" v-model="newpassword">
					<input type="text" placeholder="请输入您的用户邀请码" v-model="Invite_code">
					<view>
						<radio style="float: right;margin:10upx" :checked="aflag" @click="aflag=!aflag"><text @click.stop="goagreement()">用户协议</text></radio>
					</view>
					<button @click="regist()" style="background: #A4B1E3;" :disabled='!flag'>注册</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag: 0,
				lis: ['密码登录', '账号注册'],
				username: '',
				password: '',
				newpassword: '',
				Invite_code:'',
				animationData: {},
				aflag:true,
			};
		},
		onLoad(){
			var animation=uni.createAnimation({
				duration:1000,
				timingFunction: 'ease',
			})
			this.animation=animation
		},
		methods: {
			switchActive(i) {
				this.username = '',
					this.password = '',
					this.newpassword = '',
					this.flag = i;
					if(i==0){
						this.leftAnimation()
						
					}else{
						this.rightAnimation()
						
					}
			},
			goagreement(){
				uni.navigateTo({
					url:'../more/agreement'
				})
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
						if (res.data.code === 0) {
							uni.setStorageSync('token', res.data.data.token)
							uni.setStorageSync('id', res.data.data.id)
							console.log(uni.getStorageSync('id'))
							uni.showToast({
								title: '登录成功',
								icon: 'none',
								success: (res) => {
									setTimeout(() => {
										uni.switchTab({
											url: '../home/home'
										})
									}, 1500)
								}
							})
						} else if (res.data.code === 1) {
							uni.showToast({
								title: '账号密码错误或该账号暂未注册',
								icon: 'none'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '请稍后再试',
							icon: 'none'
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
				if (this.password !== this.newpassword) {
					uni.showToast({
						title: '两次密码输入不一致',
						icon: 'none'
					})
					return;
				}
				uni.request({
					url: 'http://139.155.25.239:3001/user/regist',
					data: {
						telephone: this.username,
						password: this.password,
						invitecode:this.Invite_code
					},
					method: 'POST',
					success: (res) => {
						console.log(res)
						if (res.data.code === 0) {
							uni.showToast({
								title: res.data.data,
								icon: 'none'
							})
							this.switchActive(0)
						} else if (res.data.code === 1) {
							uni.showToast({
								title: res.data.data,
								icon: 'none'
							})
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '请稍后再试',
							icon: 'none'
						})
					}
				})
			},
			leftAnimation(){
				this.animation.translateX('0upx').step();
				this.animationData=this.animation.export()
			},
			rightAnimation(){

				this.animation.translateX('-'+(750-80)+'upx').step();
				this.animationData=this.animation.export()
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
		background-image: url(../../static/image/bb.jpg);
		// background-image: url(../../static/image/logo.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-position: center top;

		.box {
			background-image: url(../../static/image/caizhi.png);
			background-size: 1upx 100%;//宽度是1upx，高度是撑满这个盒子，默认会将这个竖条重复也就是repeat
			overflow: hidden;
			margin: auto 40upx;
			margin-top: 40%;
			border: 1upx solid rgba(0, 0, 0, .2);
			border-radius: 20upx;

		}

		.title {
			display: flex;
			justify-content: space-around;
			background-color: #88aade;
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
