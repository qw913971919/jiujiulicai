<template>
	<view class="content">
		<view class="body">
			<view class="title">{{userdata.name}}个人报表</view>
			<view class="details">
				<view class="box" style="width:100%;border-bottom: 1upx solid  rgba(0, 0, 0, .2);">
					<text class="top">交易量</text>
					<text class="money">￥{{userdata.total}}</text>
				</view>
				<view class="box">
					<text class="top">充值</text>
					<text class="money">￥{{userdata.recharge}}</text>
				</view>
				<view class="box">
					<text class="top">提现</text>
					<text class="money">￥{{userdata.extract}}</text>
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
					name:'Cc',//用户名
					total:0,//交易量
					recharge:0,//充值
					extract:0,//提现
				}
			};
		},
		onLoad(option) {

		},
		methods: {

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
					width:49%;
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
