<template>
	<view class="content">
		<view class="body">
			<view class="title">个人报表</view>
			<view class="details">
				<view class="box" style="width:100%;border-bottom: 1upx solid  rgba(0, 0, 0, .2);">
					<text class="top">交易量</text>
					<text class="money">￥{{userdata.totalMoney||0}}</text>
				</view>
				<view class="box">
					<text class="top">充值</text>
					<text class="money">￥{{userdata.chargeMoney||0}}</text>
				</view>
			</view>
		</view>
		<view class="body" style="margin-top: 50upx;">
			<view class="title">下级报表</view>
			<view class="details">
				<view class="box" style="width:100%;border-bottom: 1upx solid  rgba(0, 0, 0, .2);">
					<text class="top">交易量</text>
					<text class="money">￥{{userdata.totalMoneySubordinate||0}}</text>
				</view>
				<view class="box" style="display: flex;justify-content:space-around;">
					<div>
						<text class="top">充值</text>
						<text class="money">￥{{userdata.chargeMoneySubordinate||0}}</text>
					</div>
					<div>
						<text class="top">分红</text>
						<text class="money">￥{{userdata.profitMoneySubordinate||0}}</text>
					</div>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userdata: {
				}
			};
		},
		onLoad(option) {
		this.getUserData()
		},
		methods: {
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
								}
							}
						})
					},
		}
	}
</script>
<style lang="scss" scoped>
	.content {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #F0F0F0;
		overflow: auto;
		padding: 20upx;
		text{
			display: block;
			margin:10upx;
		}
		.body{
			background-color: #FFFFFF;
			border-radius: 8upx;
			border: 1upx solid rgba(0, 0, 0, .2);
			.title{
				border-bottom: 1px solid #A4B1E3;
				color:#A4B1E3;
				padding:20upx;
				text-align: center;
			}
			.details{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.box{
					width:100%;
					text-align: center;	
					.top{
						font-size: 30upx;
					}
					.money{
						font-weight: 570;
					}
				}
			}
		}
		}
</style>
