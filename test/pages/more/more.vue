<template>
	<view class="content">
		<!-- 顶部填充色 -->
		<view style="width:100%;height:60upx;background-color: #6875ec;"></view>
		<!--头部区域-->
		<view class="title">
			<image src="../../static/image/A.jpg" mode="aspectFit" style="border-radius: 50%;flex-shrink: 0;"></image>
			<view style="display: flex;flex-direction: row;width: 100%;justify-content:space-between">
				<view>
					<text>一级优享用户</text>
					<text>{{userdata.telephone}}</text>
				</view>
				<button size="mini" style="height: 50upx;width: 150upx;margin:0;font-size: 25upx;background-color:#c6494b;position: relative;top:25upx;"
				 @click="gologin()">登出</button>
			</view>

		</view>
		<!-- 菜单区域 -->
		<view>
			<view class="menu">
				<view class="data">
					<view>
						<text>{{userdata.bond}}</text>
						<text>保证金</text>
					</view>
					<view>
						<text>{{userdata.initialMoney}}</text>
						<text>初始金</text>
					</view>
					<view>
						<text>0.00</text>
						<text>获利</text>
					</view>
					<view>
						<text>0</text>
						<text>团队人数</text>
					</view>
				</view>

			</view>
			<view class="menu">
				<view style="margin:20upx;font-weight: bold;">等级优享用户 <text style="margin-left: 20upx;font-weight: 400;font-size: 30upx;">一级优享用户</text></view>
				<view class="data">
					<view>
						<text>0</text>
						<text>团队人数</text>
					</view>
					<view>
						<text>0</text>
						<text>团队初始金总额</text>
					</view>
					<view>
						<text>0</text>
						<text>团队获利总额</text>
					</view>
					<view>
						<text>15%</text>
						<text>团队获利总额百分比</text>
						<!---判断一下是否是一级用户，然后是否显示就行了!-->
					</view>
				</view>

			</view>

			<view class="menu">
				<view style="margin:20upx;font-weight: bold;">我的邀请码 <text style="color:#FF7C7C;margin-left: 20upx;font-weight: bold;font-size: 30upx;">{{userdata.invite_code}}</text></view>
				<view style="margin:20upx;font-weight: bold;" v-show="pidname">我的上级 <text style="color:#FF7C7C;margin-left: 20upx;font-weight: bold;font-size: 30upx;">{{pidname}}</text></view>

			</view>
			<view class="menu">
				<view class="menu_item" @tap="goinformation()">
					<text class="iconfont icon-yonghu"></text>
					<view>账号安全</view>
				</view>
<!-- 				<view class="menu_item" @tap="gocollection()">
					<text class="iconfont icon-shoukuan"></text>
					<view>收款账户</view>
				</view> -->
				<view class="menu_item" @tap="gowithdrawal()">
					<text class="iconfont icon-shoukuanzhanghao"></text>
					<view>提现账号</view>
				</view>
				<view class="menu_item" @tap="godeposit()">
					<text class="iconfont icon-tixian"></text>
					<view>保证金提现</view>
				</view>
				<view class="menu_item" @tap="goindeposit()">
					<text class="iconfont icon-tixian"></text>
					<view>初始金提现</view>
				</view>
				<view class="menu_item" @tap="gorecharge()">
					<text class="iconfont icon-chongzhi"></text>
					<view>我要充值</view>
				</view>
<!-- 				<view class="menu_item" @tap="goform()">
					<text class="iconfont icon-tubiao"></text>
					<view>盈利报表</view>
				</view> -->
<!-- 				<view class="menu_item" @tap="gobonus()">
					<text class="iconfont icon-fenhongqingkuang"></text>
					<view>分润详细</view>
				</view> -->

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userdata: {
					username: '会员'
				},
				pidname: '0'
			}
		},
		onLoad() {
			this.getUserData();
		},
		onShow() {
			this.getUserData();
		},
		methods: {
			godeposit() {
				uni.navigateTo({
					url: "../more/deposit"
				})
			},
			goindeposit() {

				uni.navigateTo({

					url: "../more/indeposit"

				})

			},
			getUserData() {
				uni.request({
					url: 'http://139.155.25.239:3001/user/getUserInfo',
					method: 'POST',
					data: {
						id: uni.getStorageSync('id'),
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res, '用户信息')
						if (res.data.code === 401) {
							uni.showToast({
								title: '登录已超时，请重新登录',
								icon: 'none',
								success: (res) => {
									setTimeout(() => {
										uni.redirectTo({
											url: '../login/login1'
										})
									}, 1500)
								}
							})
						};
						if (res.data.code === 0) {
							this.userdata = res.data.data
							uni.request({
								url: 'http://139.155.25.239:3001/user/getUserInfo',
								method: 'POST',
								data: {
									id: res.data.data.pid,
								},
								header: {
									'Authorization': 'Bearer ' + uni.getStorageSync('token')
								},
								success: (res) => {
									console.log(res, '用户信息')
									this.pidname = res.data.data.telephone
									console.log(this.pidname)
								}
							})
						}
					}
				})
			},
			goform() {
				uni.navigateTo({
					url: "../more/form"
				})
			},
			goinformation() {
				uni.navigateTo({
					url: "../more/information"
				})
			},
			gocollection() {
				uni.navigateTo({
					url: '../more/collection'
				})
			},
			gowithdrawal() {
				uni.navigateTo({
					url: '../more/withdrawal'
				})
			},
			gorecharge() {
				uni.navigateTo({
					url: '../recharge/recharge'
				})
			},
			gologin() {
				console.log('1')
				uni.clearStorageSync()
				uni.removeStorage({
					key: 'token'
				})
				uni.removeStorage({
					key: 'id'
				})
				uni.showToast({
					title: '退出登录成功',
					icon: 'none',
					success: () => {
						setTimeout(() => {



							uni.navigateTo({
								// 需要先清除token
								url: '../login/login1'
							})
						}, 1000)
					}
				})
			},
			gobonus() {
				uni.navigateTo({
					url: '../more/bonus'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		padding-bottom: 100upx;

		.button {
			border-bottom: 1upx solid rgba(0, 0, 0, .2);
			margin: 0upx auto;
			font-size: 35upx;
			width: 60%;
			line-height: 60upx;
			height: 60upx;
			background-color: #5871d3;
			position: relative;
			top: -30upx;
		}

		.hover {
			background-color: #4b62b5;
		}

		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #f5f5f5;

		.title {
			display: flex;
			box-sizing: border-box;
			height: 200upx;
			padding: 20upx;
			background-color: #A4B1E3;
			line-height: 50upx;

			view {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;

			}

			image {
				// width: 100upx;
				// height: 100%;
				margin: 0upx 20upx;
				width: 100upx;
				height: 100upx;
			}
		}

		.menu {
			box-sizing: border-box;
			margin: 20upx 20upx;
			display: flex;
			flex-direction: column;
			border: 2upx solid rgba(0, 0, 0, .2);
			border-radius: 20upx;
			background-color: #FFFFFF;
			position: relative;
			top: -70upx;

			.data {
				display: flex;
				width: 100%;

				view {
					text-align: center;

					text:first-child {
						color: #ff7c7c;
						font-size: 35upx;
						padding: 10upx;
						font-weight: bold;
					}

					text:last-child {
						font-size: 30upx;
						padding: 10upx;
					}

					width:33%;
				}

				text {
					display: block;
				}
			}

			.menu_item {

				border-bottom: 1upx solid rgba(0, 0, 0, .2);
				width: 100%;
				padding: 10upx 10upx;
				display: flex;
				align-items: center;

				text {
					font-size: 50upx;
					color: #7152cc;
					margin: 10upx 10upx;
				}

				view {
					font-size: 30upx;
					margin: 0upx 20upx;
				}
			}
		}
	}
</style>
