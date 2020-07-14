<template>
	<view class="content">
		<view class="button" @click="go()">
			立即登录
			<view class="go">→</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				move: false,
				flag: false,
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
			go(){
				uni.redirectTo({
					url:'./login1'
				})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.login-wrap {
		text-align: center;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -40%);
	}

	.move {
		animation: move 1s;
		animation-fill-mode: forwards;

		@keyframes move {
			from {
				left: 50%
			}

			to {
				left: -50%
			}
		}

	}

	// .go {
	// 	animation: goto 1s;
	// 	animation-fill-mode: forwards;

	// 	@keyframes goto {
	// 		from {
	// 			left: 150%
	// 		}

	// 		to {
	// 			left: 50%
	// 		}
	// 	}

	// }

	.register-wrap {
		text-align: center;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -40%);
	}

	.content {
		position: fixed;
		overflow: auto;
		width: 100%;
		height: 100%;
		background-image: url(../../static/image/login.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
		overflow-x: hidden;

		.button {
			background-color: #1d193a;
			position:absolute;
			color: #FFFFFF;
			text-align: center;
			line-height: 100upx;
			width: 60%;
			height: 100upx;
			bottom: 220upx;
			border-radius: 50upx;
			left:50%;
			transform: translateX(-50%);
			.go{
				width:80upx;
				height: 80upx;
				line-height: 80upx;
				background-color: #dcad14;
				position: absolute;
				top: 10upx;
				right: 20upx;
				border-radius: 50%;
				color:#1d193a;
				font-size: 60upx;
				font-weight: 900;
			}
		}
	}

	input {
		display: block;
		border-radius: 20upx;
		width: 80%;
		height: 60upx;
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
		width: 80%;
		height: 60upx;
		line-height: 60upx;
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
