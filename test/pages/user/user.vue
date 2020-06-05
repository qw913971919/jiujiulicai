<template>
	<view class="content">
		<view>
			<view class="username">账号：{{userdata.username}}</view>
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
					<view>
						获利模式<switch @change="getMoney" :checked="!flag"></switch>
					</view>
					<view class="recharge" @tap="goRecharge">充值</view>
				</view>
			</view>
		</view>
		<view v-if="flag" class="tips">若要开始交易，请开启获利模式</view>
		<view v-else class="order" v-for="(item,i) in userdata.orderlist" :key="i">
			<view>
				<view>金额:{{item.money}}</view>
				<text>订单信息</text>
			</view>
			<view class="text">(支付宝)</view>
			<button @tap="confirm(item.money,item.orderid)">进行获利</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				flag: true,
				money: 0,
				userdata: {
					username: 'Cc',
					bond: 1, //保证金
					orderlist: [{
							money: 0,
							remarks: '无',
							bond: 2000, //单笔的保证金金额
							orderid: 123123, //订单的唯一ID
						}, //remarks是提交订单时候的随机备注
						{
							money: 3000,
							remarks: '无',
							bond: 2000, //单笔的保证金金额
							orderid: 1666
						}, //模拟数据
						{
							money: 8000,
							remarks: '无',
							bond: 2000, //单笔的保证金金额
							orderid: 1888
						} //模拟数据
					]
				}
			}
		},
		onLoad() {
			// 进页面获取数据


			//先获取数据覆盖userdata，
			for (var i = 0; i < this.userdata.orderlist.length; i++) {
				this.money += this.userdata.orderlist[i].money
			}
		},
		onPullDownRefresh(){
			// 刷新获取数据在这里获取，这里是页面刷新动画启用时的生命周期，如果想要刷新数据，在这里调用
			setTimeout(()=>{
				uni.stopPullDownRefresh()
				this.flag=true;
				//重新发起获取数据请求，写在这里
			},1000)
		},
		methods: {
			//开关开启之后，开启一个定时器循环请求
			getMoney(e) {
				if (e.target.value) {
					console.log(1)
					console.log(!e.target.value)
					this.flag = !e.target.value
				} else {
					this.flag = true;
				}
			},
			goRecharge() {
				uni.navigateTo({
					url: '../recharge/recharge'
				})
			},
			confirm(money, orderid) {
				uni.showModal({
					title: '确定订单',
					content: '确认收到此比款项' + money + '元',
					confirmText: '确认',
					cancelText: '取消',
					success: res => {
						if (res.confirm) {
							console.log('确认收款')
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
					padding: 10upx 30upx;
					border-radius: 30upx;
					background-color: #000000;
					color: #FFFFFF;
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
