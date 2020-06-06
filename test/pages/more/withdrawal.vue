<template>
	<view class="content">
		<view class="button" @tap="gobankcard()">+</view>
		<view v-if="flag">
			<view v-for="(item,i) in userdata.bank" :key="i" class="item_box">
				<text style="color:#000000;font-size: 45upx;">{{item.title}}</text>
				<text>账户号码:{{item.number}}</text>
				<text>账户名称:{{item.name}}</text>
				<text>开户省份:{{item.address}}</text>
			</view>
		</view>
		<view v-else class="none">暂未设置提现账户</view>
		<!-- 如果前两者都没有，后台这里还应该做下处理，显示一行提示信息，但是目前不知道后台如何处理，暂时不写 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userdata: {
					bank:[{
						title:'招商银行',//什么银行
						number:222222222,//卡号
						name:'蒋自豪',//开户人姓名
						address:'四川省 成都市',//开户省份
					},{
						title:'招商银行',//什么银行
						number:222222222,//卡号
						name:'蒋自豪',//开户人姓名
						address:'四川省 成都市',//开户省份
					}]
				},
				flag: false,
			};
		},
		onLoad(option) {
			// 在这里获取银行卡数据
			// 获取数据成功后将flag的值改为true；
			this.flag = true;
		},
		methods: {
			gobankcard() {
				uni.navigateTo({
					url: './bankcard'
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
		overflow: auto;
		background-color: #f0f0f0;
		padding: 10upx 20upx;
			.item_box{
				margin:20upx auto;
				background-color: #FFFFFF;
				padding:20upx;
				border: 1upx solid  rgba(0, 0, 0, .2);
				border-radius: 20upx;
				text{
					display: block;
					margin:8upx;
					color: #5B5B5B;
				}
			}
		.none {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 34upx;
			white-space: nowrap;
		}

		.button {
			z-index: 50;
			position: fixed;
			color: #FFFFFF;
			bottom: 30upx;
			right: 30upx;
			width: 130upx;
			height: 130upx;
			background-color: #A4B1E3;
			text-align: center;
			line-height: 130upx;
			font-size: 45upx;
			border-radius: 50%;
			box-shadow: -1upx -2upx 5upx 2upx #939fcb, 2upx 2upx 5upx 2upx #939fcb;
		}

	}
</style>
