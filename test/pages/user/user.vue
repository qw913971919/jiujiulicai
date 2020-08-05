<template>
	<view class="content">
		<view>
			<view class="username">账号：{{userdata.telephone}}</view>
			<view class="userinformation">
				<view class="user_box">
					<view>保证金余额</view>
					<view class="information">¥{{userdata.bond}}</view>
				</view>
				<view class="user_box">
					<view>进行中的订单</view>
					<view class="information">￥{{money}}</view>
				</view>
			</view>
			<view class="box">
				<view class="getmoney">
					<view style="font-size: 34upx;flex-shrink: 0;">
						<text>获利模式</text>
						<switch :checked="flag" @click="getMoney()" :disabled="userdata.userForbiden" style="width: 60upx;"></switch>
					</view>
					<view style="font-size: 33upx;position: relative;">红利：{{userdata.profitMoney}}</view>
					<view class="recharge" @tap="goprofitMoney">红利转移</view>
					<view class="recharge" @tap="goRecharge">充值</view>
				</view>
			</view>
		</view>
		<view v-if="!flag" class="tips">若要开始交易，请开启获利模式</view>
		<view v-if="flag" class="order" v-for="(item,i) in userdata.orderlist" :key="i">
			<view v-if='item.money'>
				<view>金额:{{item.money}}</view>
				<text>订单信息</text>
			</view>
			<view class="text" style="display: flex;justify-content: space-between;"><text>时间:{{renderTime(item.createdate)}}</text><text>(支付宝)</text></view>

			<button @tap="confirm(item.money,item._id)">进行获利</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				bb: false,
				cc:false,
				flag: false,
				te: null,
				money: 0,
				time: null,
				userdata: {
					username: '会员',
					bond: 0, //保证金
					orderlist: []
				},
				switchmode: [],
				switchmode1:[]
			}
		},
		async onLoad() {
			// 进页面获取数据
		},
		onHide() {
			// 隐藏时

		},
		onShow() {
			uni.switchTab({
				url: './user/user'
			})
			clearInterval(this.te)
			this.getUserData()
			if (this.userdata.userForbiden == true) {
				getMoney()
				uni.showToast({
					title: '用户已被禁止开启获利模式，暂不会有新的订单派送',
					icon: 'none',
				})
			}
			console.log(uni.getStorageSync('flag'),'切换后的flag')
			if (uni.getStorageSync('flag') == true) {
				this.flag = true;
				setTimeout(() => {
					this.swichMoney(this.flag)
				}, 200)
			}
		},
		onPullDownRefresh() {
			// 刷新获取数据在这里获取，这里是页面刷新动画启用时的生命周期，如果想要刷新数据，在这里调用
			this.flag = uni.getStorageSync('flag');
			this.money = 0;
			setTimeout(() => {
				uni.stopPullDownRefresh()
				if (this.userdata.userForbiden == true) {
					uni.setStorageSync('flag', false)
				}
				clearInterval(this.te)
				this.swichMoney(uni.getStorageSync('flag'))
				//重新发起获取数据请求，写在这里
			}, 1000)
		},
		methods: {
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000)
					.toISOString()
					.replace(/T/g, " ")
					.replace(/\.[\d]{3}Z/, "");
			},
			goprofitMoney() {
				uni.navigateTo({
					url: '../profitMoney/profitMoney'
				})
			},
			//开关开启之后，开启一个定时器循环请求
			getMoney() {
				if (this.userdata.userForbiden == true) {
					console.log('输出入了')
					this.flag = false;
					this.money = 0;
					clearInterval(this.te)
					this.swichMoney(this.flag)
					return;
				}
				this.flag = !this.flag;
				if (this.flag) {
					console.log('开启时')
					clearInterval(this.te)
					this.swichMoney(this.flag);
				} else{
					this.money = 0;
					clearInterval(this.te)
					this.swichMoney(this.flag)
				}
			},
			async getUserData() {
				await uni.request({
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
							console.log(this.userdata, '获取到的数据')
							if (this.userdata.userForbiden == true) {
								console.log('bbbbbbbbbb')
								uni.setStorageSync('flag', false)
								uni.showToast({
									title: '用户已被禁止开启获利模式，暂不会有新的订单派送',
									icon: 'none',
								})
							}
							uni.request({
								url: 'http://139.155.25.239:3001/paypic/getUserPayPic',
								method: 'POST',
								data: {
									id: uni.getStorageSync('id'),
								},
								header: {
									'Authorization': 'Bearer ' + uni.getStorageSync('token')
								},
								success: (res) => {
									console.log(res.data.data, '支付宝数组')
									this.switchmode = res.data.data.wpay
									this.switchmode1 = res.data.data.apay
								}
							})
						}
					}
				})
			},
			goRecharge() {
				setTimeout(() => {
					uni.navigateTo({
						url: '../recharge/recharge'
					})
				}, 200)

			},
			swichMoney(flag) {
				console.log(flag,'flag的值')
				uni.setStorageSync('flag', !flag)
				console.log('是否执行', this.switchmode)
				
				for (var i = 0; i < this.switchmode.length; i++) {
					if (this.bb == true) break;
					this.bb = this.switchmode[i].mode
				}
				for (var i = 0; i < this.switchmode1.length; i++) {
					if (this.cc == true) break;
					this.cc = this.switchmode1[i].mode
				}
				console.log(this.switchmode, '是否有支付宝的数组')
				if (this.bb == false&&this.cc==false) {
					uni.showToast({
						title: '请先绑定支付宝二维码',
						icon: 'none',
						success: (res) => {
							setTimeout(() => {
								uni.navigateTo({
									url: '../more/zfbcollection'
								})
							}, 1500)
						}
					})
				}
				if (flag == true) {					
					this.te = setInterval(() => {
						console.log('1111')
						uni.request({
							url: 'http://139.155.25.239:3001/user/changeProfit',
							method: 'POST',
							data: {
								id: uni.getStorageSync('id'),
								profit: flag
							},
							header: {
								'Authorization': 'Bearer ' + uni.getStorageSync('token')
							},
							success: (res) => {
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
								if (flag == false) return;
								if (res.data.code === 0) {
									uni.setStorageSync('flag',true)
									console.log(res, '已开启获利模式')
									if (flag) {
										//成功开启获利模式后，开始获取管理员的派单
										uni.request({
											url: 'http://139.155.25.239:3001/profit/getProfit',
											method: 'POST',
											data: {
												userId: uni.getStorageSync('id'),
											},
											header: {
												'Authorization': 'Bearer ' + uni.getStorageSync('token')
											},
											success: (res) => {
												if (res.data.code === 0) {
													this.userdata.orderlist = res.data.data;
													let mone = 0;
													for (var i = 0; i < res.data.data.length; i++) {
														console.log(res.data.data[i].money)
														mone += Number(res.data.data[i].money)
														this.money = mone
													}
													console.log(res.data.data, '获取到的订单数据')
												}
											},
											fail: (err) => {
												console.log(err)
											}
										})
									}

								}
							}
						})
					}, 3000)
				} else {
					setTimeout(this.te)
					uni.request({
						url: 'http://139.155.25.239:3001/user/changeProfit',
						method: 'POST',
						data: {
							id: uni.getStorageSync('id'),
							profit: false
						},
						header: {
							'Authorization': 'Bearer ' + uni.getStorageSync('token')
						},
						success: (res) => {
							this.userdata.orderlist = []
							console.log(res, '关闭获利模式')
							if (res.data.code == 0) {
								uni.setStorageSync('flag',false)
								uni.showToast({
									title: '已关闭获利模式',
									icon: "none"
								})
							}
						}
					})
				}
			},
			confirm(money, orderid) {
				console.log(orderid)
				uni.showModal({
					title: '确定订单',
					content: '确认收到此比款项' + money + '元',
					confirmText: '确认',
					cancelText: '取消',
					success: res => {
						if (res.confirm) {
							console.log('确认收款')
							uni.request({
								url: 'http://139.155.25.239:3001/profit/checkUserProfit',
								method: 'POST',
								data: {
									userId: uni.getStorageSync('id'),
									id: orderid
								},
								header: {
									'Authorization': 'Bearer ' + uni.getStorageSync('token')
								},
								success: (res) => {
									console.log(res, '获利成功')
									this.money = 0;
									if (res.data.code === 0) {
										// 删除订单
										uni.showToast({
											title: res.data.data,
											icon: 'none'
										})
										uni.request({
											url: 'http://139.155.25.239:3001/profit/deleteProfit',
											method: 'POST',
											data: {
												id: orderid
											},
											header: {
												'Authorization': 'Bearer ' + uni.getStorageSync('token')
											},
											success: (res) => {
												console.log(res, '删除订单')
												if (res.data.code === 0) {
													console.log('删除订单成功')
													// 重新获取订单数据
													this.getUserData()
													uni.request({
														url: 'http://139.155.25.239:3001/profit/getProfit',
														method: 'POST',
														data: {
															userId: uni.getStorageSync('id'),
														},
														header: {
															'Authorization': 'Bearer ' + uni.getStorageSync('token')
														},
														success: (res) => {
															if (res.data.code === 0) {
																this.userdata.orderlist = res.data.data;
																for (var i = 0; i < res.data.data.length; i++) {
																	console.log(res.data.data[i].money)
																	this.money += Number(res.data.data[i].money)
																}
																console.log(res.data.data, '获取到的订单数据')
															}
														},
														fail: (err) => {
															console.log(err)
														}
													})
												}
											},
											fail: (err) => {
												console.log(err)
											}
										})

									}


								},
							})

							//调用接口，发起请求，更改订单状态，同时重新调获取页面数据的接口，刷新页面
						} else if (res.cancel) {
							console.log('取消提交')
						}
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		overflow: auto;
		position: fixed;
		background-color: #f0f0f0;

		.order:last-child {
			margin-bottom: 180upx;
		}

		.tips {
			margin: 80upx auto;
			text-align: center;
			color: #636363;
		}

		.order {
			width: 90%;
			margin: 50upx auto;
			background-color: #FFFFFF;
			border-radius: 18upx;
			padding: 20upx 20upx;
			color: #636363;
			border: 1upx solid rgba(0, 0, 0, .2);

			view:first-child {
				display: flex;
				justify-content: space-between
			}

			.text {
				text-align: right;
				margin: 10upx 0;
			}

			button {
				width: 100%;
			}
		}

		.username {
			background-color: #A4B1E3;
			margin-bottom: -5upx;
			padding: 10upx 20upx;
			text-align: center;
		}

		.box {
			background: #A4B1E3;
			margin-top: -3upx;
			padding: 20upx 10upx;

			.getmoney {
				background-color: #FFFFFF;
				border: 1upx solid rgba(0, 0, 0, .2);
				margin: 20upx 0;
				padding: 20upx;
				border-radius: 10upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.recharge {
					padding: 10upx 20upx;
					font-size: 25upx;
					border-radius: 30upx;
					background-color: #000000;
					color: #FFFFFF;
					flex-shrink: 0;
				}
			}
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

			.user_box:first-child {
				border-right: 1px solid #c4c4c4;
			}

			.user_box:last-child {
				border-left: 1px solid #c4c4c4;
			}
		}
	}
</style>
