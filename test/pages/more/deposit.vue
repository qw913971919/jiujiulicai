<template>
	<view class="content">
		<view class="title">提现成功后，将<text style="color:red;">扣除</text>提现金额的5%作为该次交易的手续费</view>
		<text style="display:block;font-size: 30upx;margin:10upx 0;">提现</text>
		<view style="position: relative;">
			<input v-model="money" @focus="money=''">
			<view style="position: absolute;top:50%;left:10upx;transform: translate(0%,-50%);">¥</view>
		</view>
		<button @click="post()" style="background-color: #A4B1E3;margin:30upx 0;">提交</button>
		<view v-if="deposit.length" class="order" v-for="(item,i) in deposit">
			<view v-if='item.money'>
				<view>提现金额:{{item.money}}</view>
				<text v-if="item.status=='pending'" style="color:#FFD04B;">未审核</text>
				<text v-if="item.status=='success'" style="color:#409EFF;">已提现</text>
				<text v-if="item.status=='failed'" style="color:red;">已拒绝</text>
			</view>
			<view class="text" style="display: flex;justify-content: space-between;"><text>时间:{{renderTime(item.createTime)}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money: 0,
				deposit: []
			};
		},
		created() {
			this.get()
		},
		methods: {
			renderTime(date) {
					var dateee = new Date(date).toJSON();
					return new Date(+new Date(dateee) + 8 * 3600 * 1000)
						.toISOString()
						.replace(/T/g, " ")
						.replace(/\.[\d]{3}Z/, "");
				},
			post() {
				uni.request({
					url: 'http://139.155.25.239:3001/deposit/add',
					method: 'POST',
					data: {
						userId: uni.getStorageSync('id'),
						money: this.money
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 0) {
							uni.showToast({
								title: '提交成功',
								icon: "none",
							})
							this.get()
						}
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.data,
								icon: "none"
							})
						}
					}
				})
			},
			get() {
				uni.request({
					url: 'http://139.155.25.239:3001/deposit/getDeposit',
					method: 'GET',
					data: {
						userId: uni.getStorageSync('id'),
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res, '1')
						if (res.data.code == 0) {
							this.deposit = res.data.data.reverse()
						}
						if (res.data.code == 1) {
							uni.showToast({
								title: res.data.data,
								icon: "none"
							})
						}
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.content {
		position: fixed;
		overflow-x: auto;
		width: 100%;
		height: 100%;
		background-color: #F0F0F0;
		padding: 0upx 20upx;
		padding-bottom: 70upx;
		input {
			background-color: #FFFFFF;
			padding: 5upx 35upx;
			border-radius: 20upx;
		}

		.title {
			font-weight: 600;
			font-size: 35upx;
			margin: 20upx 0upx;
			border-radius: 20upx;
			padding: 20upx;
			background-color: #A4B1E3;
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
	}
</style>
