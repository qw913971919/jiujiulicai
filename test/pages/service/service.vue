<template>
	<view class="content">
		<view class="announcement">
			<view class="announcement_title">
				<text class="b">新手帮助</text>
				<view @tap="goproblem()">查看全部>></view>
			</view>
			<view v-for="(item,i) in problem" :key="i" @tap="goProblemContent(item.id)" class="problem">
				<image src="../../static/image/help.png" model="widthFix"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- #ifdef APP-PLUS -->
	<view style="width:100%;background-color: #FFFFFF;display: flex;flex-direction: column;align-items: center;border-top-left-radius: 60%;border-top-right-radius: 60%;position: fixed;bottom: 0px;
	border: 1upx solid rgba(0, 0, 0, .2);right: 0;color:#808080">	
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="width:100%;background-color: #FFFFFF;display: flex;flex-direction: column;align-items: center;border-top-left-radius: 60%;border-top-right-radius: 60%;position: fixed;bottom: 49px;
		border: 1upx solid rgba(0, 0, 0, .2);right: 0;color:#808080">
		<!-- #endif -->
			<text>客服微信</text>
			<image src="../../static/image/1.jpg" mode="aspectFit" style="width:300upx;height: 300upx;border-radius: 50%;border: 1upx solid rgba(0, 0, 0, .2)"></image>
		</view>
	</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				problem: [{
					date:'2020/5/28',
					title:'[新手帮助] 投资流程介绍',
					id:10,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">下载APP</span><br /><span style="font-family:宋体; font-size:12pt">↓</span><br /><span style="font-family:宋体; font-size:12pt">申请帐密</span><br /><span style="font-family:宋体; font-size:12pt">↓</span><br /><span style="font-family:宋体; font-size:12pt">点击[我要充值]存入保证金</span><br /><span style="font-family:宋体; font-size:12pt">↓</span><br /><span style="font-family:宋体; font-size:12pt">开启[获利模式]</span><br /><span style="font-family:宋体; font-size:12pt">等待投资配对</span><br /><span style="font-family:宋体; font-size:12pt">↓</span><br /><span style="font-family:宋体; font-size:12pt">核实并[确认]投资本金回收</span><br /><span style="font-family:宋体; font-size:12pt">完成投资</span><br /><br /><span style="font-family:宋体; font-size:12pt">成功赚取红利!</span><br /><br /><span style="font-family:宋体; font-size:12pt">一当您想要休息时，无论是睡眠时间或出门旅游，,都可以藉由关闭获利模式来中止投资配对。</span><br /><br /><span style="font-family:宋体; font-size:12pt">一投资配对成功后，若交易未完成，则20分钟后该笔订单失败，订单将自动取消。</span><br /><br /><span style="font-family:宋体; font-size:12pt">*只要是失败的交易单，我司将退还相应保证金,但该笔订单不会产生现金回馈，也不会扣除任何手续费。</span></p></div>'
				},
				{
					date:'2020/5/28',
					title:'[新手帮助] 投资的利润',
					id:11,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">每一单确认之后的利润会在保证金上面直接添加</p></div>'
				},
				{
					date:'2020/5/28',
					title:'[新手帮助] 如何充值',
					id:12,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">点击更多→我要充值→输入需要充值的金额→确认提交→对应提供的银行信息进行打款→打款后确认订单</p></div>'
				},
				{
					date:'2020/5/28',
					title:'[新手帮助] 充值后多久到账',
					id:13,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">正常情况下在十分钟内到账，如十分钟内未到账，请于客服人员进行联系</p></div>'
				},
				{
					date:'2020/5/28',
					title:'[新手帮助] 提现相关',
					id:14,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">在更多页面绑定好提现账号，在最后一笔订单结束后的12小时后可以申请提现，提现只需跟客服人员报备即可，提现到账时间是在2小时内，提现金额不得超过充值金额的70%，如超过70%将会收取30%的手续费。</p></div>'
				},
				{
					date:'2020/5/28',
					title:'[新手帮助] 如何投资理财',
					id:15,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">充值好保证金后，打开获利模式进行处理订单，按照平台给予的订单进行确认</p></div>'
				},
				{
					date:'2020/5/28',
					title:'[新手帮助] 订单失败或订单金额相关',
					id:16,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">在接到订单后，如平台的投资方未能打款到被投资人支付宝或聚合码，请勿确认只需等待十五分钟后即可。</span><br /><span style="font-family:宋体; font-size:12pt">如被投资方订单显示5000元，投资方只打款4900元的情况下，请跟客服报备。</span></p></div>'
				},
				{
					date:'2020/5/28',
					title:'[新手帮助] 被投资者需要提供什么',
					id:17,
					content:'<div><p style="margin:0pt; orphans:0; text-align:justify; widows:0"><span style="font-family:宋体; font-size:12pt">本平台是进行支付宝二维码和聚合码的投资理财。</span><br /><span style="font-family:宋体; font-size:12pt">需要被投资者提供支付宝的真实姓名和支付宝账户和支付宝二维码进行获利投资。</span><br /><span style="font-family:宋体; font-size:12pt">聚合码和支付宝理财填写的资料一样。</span></p></div>'
				},]
			}
		},
		onLoad() {
			console.log(this.problem.length)
			if (this.problem.length > 3) {
				this.problem.splice(3)
			}
		},
		methods: {
			goproblem() {
				uni.navigateTo({
					url: '../problem/problem'
				})
			},
			goProblemContent(id) {
				console.log(id)
				uni.navigateTo({
					url:'../problem/problemcontent?id='+id
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.content {
		background-color: #F0F0F0;
		width: 100%;
		height: 100%;
		padding: 10upx;
		position: fixed;
		overflow: auto;

		.announcement {
			width: 95%;
			margin: 20upx auto;
			background-color: #FFFFFF;
			border: 1upx solid rgba(0, 0, 0, .2);

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

			.problem {
				display: flex;
				align-items: flex-start;
				align-items: center;
				border-bottom: 1upx solid #C4C4C4;

				image {
					width: 100upx;
					height: 100upx;
					flex-shrink: 0; //图片不会被自动缩小，找了好久
					margin: 10upx;
				}

				text {
					padding: 10upx;
				}
			}
		}
	}
</style>
