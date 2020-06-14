<template>
	<view class="content">
		<view :class="{'login-wrap':true,'move':move,'go':flag}" v-show="showLogin">
			<text style="color: #000000;">登录</text>
			<input type="text" placeholder="请输入用户名" v-model="username">
			<input type="password" placeholder="请输入密码" v-model="password">
			<button @click="login()">登录</button>
			<text @click="ToRegister">没有账号？马上注册</text>
		</view>

		<view :class="{'register-wrap':true,'move':move,'go':!flag}" v-show="showRegister">
			<text style="color: #000000;">注册</text>
			<input type="text" placeholder="请输入用户名" v-model="newUsername">
			<input type="password" placeholder="请输入密码" v-model="newPassword">
			<button @click="register">注册</button>
			<text @click="ToLogin">已有账号？马上登录</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				move:false,
				flag:false,
				showLogin: true,
				showRegister: false,
				showTishi: false,
				tishi: '',
				username: '',
				password: '',
				newUsername: '',
				newPassword: ''
			}
		},
		methods: {
			ToRegister(){
				this.move=true;
				this.flag=false;
				setTimeout(()=>{
					this.showLogin=false;
					this.showRegister=true;
					this.move=false;
				},1000)
			},
			ToLogin(){
				this.move=true;
				this.flag=!this.flag;
				setTimeout(()=>{
					this.showLogin=true;
					this.showRegister=false;
					this.move=false;
				},1000)

			},
			login(){
				// 向服务器发起请求，如果返回token则登录成功，储存token跳转至 home界面
				if(this.username==='NB00'&&this.password==='000000'){
					uni.setStorage({
						key:'token',
						data:{
							token:1
						}
					})
					console.log('跳转页面')
					uni.switchTab({
						url:'../home/home'
					})
				}else{
					uni.showToast({
						title:'登录失败',
						icon:'none',
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.login-wrap {
		text-align: center;
		position: relative;
		top:50%;
		left:50%;
		transform: translate(-50%,-40%);
	}
	.move{
		animation: move 1s;
		animation-fill-mode:forwards;
		@keyframes move
		{
			from{left:50%}
			to{left:-50%}
		}

	}
	.go{
		animation: goto 1s;
		animation-fill-mode:forwards;
		@keyframes goto
		{
			from{left:150%}
			to{left:50%}
		}
	
	}
	.register-wrap{
		text-align: center;
		position: relative;
		top:50%;
		left:50%;
		transform: translate(-50%,-40%);
	}
	.content{
		position: fixed;
		overflow: auto;
		width:100%;
		height: 100%;
		background-image: url(../../static/image/login.png);
		background-repeat: no-repeat;
		background-size:100% 100%;
		overflow-x: hidden;
	}
	input {
		display: block;
		border-radius: 20upx;
		width: 400upx;
		height: 50upx;
		line-height: 50upx;
		margin: 0 auto;
		margin-bottom: 30upx;
		outline: none;
		border: 1upx solid #888;
		padding: 10upx;
		background-color: #FFFFFF;
		z-index: 100;
	}

	p {
		color: red;
	}

	button {
		display: block;
		width: 400upx;
		height: 50upx;
		line-height: 50upx;
		margin: 0 auto;
		border: none;
		background-color: #41b883;
		color: #fff;
		font-size: 30upx;
		margin-bottom: 20upx;
	}

	text {
		cursor: pointer;
	}

	text {
		color: #41b883;
	}
</style>
