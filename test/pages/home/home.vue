<template>
	<view class="content">
		<!--顶部区域!-->
		<view class="top">
			<view class="userinformation">
				<view class="user_box">
					<view>保证金余额</view>
					<view class="information">¥{{userData.bond}}</view>
				</view>
				<view class="recharge">
					<view @tap="goRecharge">充值</view>
				</view>
			</view>
			<view class="welcome">你好!<text>{{userData.username}}</text>,欢迎登陆</view>
		</view>
		<view class="help" @tap="goProblem()">
			<image src="../../static/image/help.png"></image>
			新手帮助
		</view>
		<!--系统公告区域-->
		<view class="announcement">
			<view class="announcement_title">
				<text class="b">系统公告</text>
				<view @tap="goNotice()">查看全部>></view>
			</view>
			<view v-for="(item,i) in announcement" :key="i" class="announcement_content" @tap="goNoticecotent(item._id)">
				<text>{{dateedit(item.title,item.date)}}</text>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: {
					bond: 0,
					username: '游客'
				},
				announcement: []
			}
		},
		onLoad() {

			this.getUserData()
			this.getAllAnnounce()
			// goNoticeData()
			//无接口，暂不写请求，伪造数据
		},
		onShow() {
			this.getUserData()
		},
		methods: {
			dateedit(title, date) {
				if(title=="请仔细阅读平台公告和新手帮助"){
					return "2020-06-07 00:00:00"
				}
				if (title == "平台运营火爆开启"){
					return "2020-06-07 00:00:00"
				}
				if (title == "十码同跑模式"){
					return "2020-06-08 00:00:00"
				}
				if (title == "关于代理公告"){
					return "2020-06-07 00:00:00"
				}
				if(title=="大量订单火爆开启!"){
					return "2020-06-15 00:00:00"
				}
				if(title=="未及时处理处罚公告"){
					return "2020-06-20 23:00:00"
				}
				if(title=="大量订单火爆开启!!"){
					return "2020-07-01 00:00:00"
				}
				if(title=="提现公告"){
					return "2020-07-10 00:00:00"
				}
				if(title=="支付宝二维码异常"){
					return "2020-07-15 23:00:00" 
				}
				if(title=="近期充值重复提交"){
					return "2020-07-18 00:00:00"
				}
				if (title == "关于未及时处理相关"){
					return "2020-07-01 00:00:00"
				}
					return this.renderTime(date);
				},
				renderTime(date) {
						var dateee = new Date(date).toJSON();
						return new Date(+new Date(dateee) + 8 * 3600 * 1000)
							.toISOString()
							.replace(/T/g, " ")
							.replace(/\.[\d]{3}Z/, "");
					},
					getAllAnnounce() {
						uni.request({
							url: 'http://139.155.25.239:3001/announce/getAllAnnounce',
							method: "GET",
							header: {
								'Authorization': 'Bearer ' + uni.getStorageSync('token')
							},
							success: res => {
								if (res.data.code == 0) {
									this.announcement = [];
									res.data.data.reverse()
									for (var i = 0; i < res.data.data.length; i++) {
										if (res.data.data[i].type == "notice" && this.announcement.length < 6) {
											this.announcement.push(res.data.data[i])
										}
									}
								}
							}
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
									this.userData = res.data.data
								}
							}
						})
					},
					goNoticeData() {
						// 暂无
					},
					goNoticecotent(id) {
						console.log(id)
						uni.navigateTo({
							url: '../notice/noticecontent?id=' + id,
						})
					},
					goProblem() {
						uni.navigateTo({
							url: '../problem/problem',
						})
					},
					goNotice() {
						uni.navigateTo({
							url: '../notice/notice?',
						})
					},
					goRecharge() {
						uni.navigateTo({
							url: '../recharge/recharge'
						})
					}
			}
		}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}

	.top {
		position: relative;
	}

	.userinformation {
		width: 100%;
		display: flex;
		justify-content: space-around;
		text-align: center;
		padding: 40upx 0upx;
		background: #A4B1E3;
		color: #566DCC;
		font-size: 35upx;

		.user_box {
			flex: 1;

			.information {
				color: #000000;
				font-weight: bold;
				font-size: 55upx;
			}
		}

		.recharge {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;

			view {
				padding: 10upx 30upx;
				border-radius: 30upx;
				background-color: #000000;
				color: #FFFFFF;
			}
		}

		.user_box:first-child {
			border-right: 1px solid #c4c4c4;
		}

		.user_box:last-child {
			border-left: 1px solid #c4c4c4;
		}
	}

	.welcome {
		border: 1px solid #808080;
		background-color: #FFFFFF;
		width: 90%;
		border-radius: 10upx;
		text-align: center;
		padding: 15upx 0upx;
		position: absolute;
		bottom: -50%;
		left: 50%;
		color: #8F8F94;
		transform: translate(-50%, -30%);
		font-weight: 500;

		text {
			margin: 0 20upx;
			color: #000000;
		}
	}

	.help {
		width: 95%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 90upx;
		border-radius: 16upx;
		background-color: #566DCC;
		padding: 10upx 0upx;

		image {
			width: 60upx;
			height: 60upx;
		}
	}

	.announcement {
		width: 95%;
		margin: 20upx auto;

		.announcement_title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20upx;
			font-size: 20upx;
			color: #808080;
			border: 1upx solid #F1F1F1;

			.b {
				color: #A4B1E3;
				font-size: 35upx;
			}
		}

		.announcement_content {
			border-left: 1upx solid #F1F1F1;
			border-right: 1upx solid #F1F1F1;
			border-bottom: 1upx solid #F1F1F1;
			font-size: 32upx;
			padding: 20upx;
			color: #808080;

			.title {
				color: #0C4DAF;
				font-weight: 500;
			}
		}
	}
</style>
