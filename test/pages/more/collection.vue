<template>
	<view class="content">
			<view class="item_box" @tap="goalipay()">
				<image mode="aspectFit" src="../../static/image/zfbcollection.jpg"></image>
				<view class="item">
					<text style="font-size: 38upx;color: #000000;font-weight: 550;margin-top: 20upx;">支付宝</text>
					<text>状态:{{userdata.alipay.enable?'已设置完成':'尚未设置'}}</text>
					<text v-if='userdata.alipay.enable'>收款账户:{{userdata.alipay.enable.username}}</text>
				</view>
				<view class="text">></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userdata: {
					alipay: {
						// enable: {
						// 	state: true, //判断是否是启用状态
						// 	username: '启用的测试用0', //收款的用户名
						// 	today: 0, //今日收款的金额
						// 	id: 0, //通过id发起请求，来确认是哪个账户被启用和停用
						// },
						// deactivation: [{
						// 	state: false,
						// 	username: '测试用1',
						// 	today: 0, //今日收款的金额
						// 	id: 1, //通过id发起请求，来确认是哪个账户被启用和停用
						// }, {
						// 	state: false,
						// 	username: '测试用2',
						// 	today: 0, //今日收款的金额
						// 	id: 2, //通过id发起请求，来确认是哪个账户被启用和停用
						// }]
					}
				}
			};
		},
		onLoad(option) {
			// 通过token在这里获取用户的收款账户页数据
		},
		methods: {
			gowx() {
				uni.navigateTo({
					url: './wxcollection'
				})
			},
			goalipay() {
				uni.navigateTo({
					url: './zfbcollection'
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
		background-color: #F0F0F0;
		overflow: auto;
		padding: 20upx;

		.item_box {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			border-radius: 10upx;
			margin: 20upx 0;
			border: 1upx solid rgba(0, 0, 0, .2);
			align-items: center;

			image {
				flex: 2;
				width: 100%;
				height: 100upx;
			}

			.item {
				flex: 5;
				display: flex;
				flex-direction: column;
				font-size: 33upx;
				color: #666666;

				text {
					display: block;
					margin: 10upx;
				}
			}

			.text {
				flex: 2;
				margin-right: 20upx;
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}
</style>
