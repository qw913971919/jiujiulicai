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
</template>

<script>
	export default {
		data() {
			return {
				problem: [{
					title: '[新手帮助]，随便乱写几行字，好累啊',
					id: 10
				}, {
					title: '[新手帮助]，随便乱写啊啊啊啊啊啊啊',
					id: 11
				}, {
					title: '[新手帮助]，随便我写个三个复制一下充数可以吧',
					id: 12
				}, {
					title: '[新手帮助]，随便乱写几行字',
					id: 13
				}, {
					title: '[新手帮助]，随便乱写啊啊啊啊啊啊啊',
					id: 14
				}, {
					title: '[新手帮助]，随便我写个三个复制一下充数可以吧',
					id: 15
				}, ]
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
