<template>
	<view class="content">
		<!-- 顶部填充色 -->
		<view style="width:100%;height:60upx;background-color: #566Dcc;"></view>
		<!--头部区域-->
		<view class="title">
			<image src="../../static/image/logo192x192.png" mode="aspectFit"></image>
			<view>
				<text>账号</text>
				<text>{{userdata.name}}</text>
			</view>
		</view>
		<!-- 菜单区域 -->
		<view class="menu">
			<view class="menu_item" @tap="goinformation()">
				<text class="iconfont icon-yonghu"></text>
				<view>账号安全</view>
			</view>
			<view class="menu_item" @tap="gocollection()">
				<text class="iconfont icon-shoukuan"></text>
				<view>收款账户</view>
			</view>
			<view class="menu_item" @tap="gowithdrawal()">
				<text class="iconfont icon-shoukuanzhanghao"></text>
				<view>提现账号</view>
			</view>
			<view class="menu_item" @tap="gorecharge()">
				<text class="iconfont icon-chongzhi"></text>
				<view>我要充值</view>
			</view>
			<view class="menu_item" @tap="goform()">
				<text class="iconfont icon-tubiao"></text>
				<view>盈利报表</view>
			</view>
			<view class="menu_item">
				<button class="button" hover-class="hover">登出</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userdata: {
					name: 'Cc'
				}
			}
		},
		onLoad() {

		},
		methods: {
			goform(){
				uni.navigateTo({
					url:"../more/form"
				})
			},
			goinformation(){
				uni.navigateTo({
					url:"../more/information"
				})
			},
			gocollection(){
				uni.navigateTo({
					url:'../more/collection'
				})
			},
			gowithdrawal(){
				uni.navigateTo({
					url:'../more/withdrawal'
				})
			},
			gorecharge(){
				uni.navigateTo({
					url:'../recharge/recharge'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		.button{
			width:100%;height:100%;background-color:#566DCC;
		}
		.hover{
			background-color: #4b62b5;
		}
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: #F0F0F0;
		.title {
			display: flex;
			box-sizing: border-box;
			height: 150upx;
			padding: 20upx;
			background-color: #A4B1EC;
			view{
				display: flex;
				flex-direction: column;
				justify-content: space-around;
			}
			image {
				width:100upx;
				height:100%;
				margin:0upx 20upx;
			}
		}
		.menu{
			width: 100%;
			display: flex;
			flex-direction: column;
			.menu_item{
				background-color:#FFFFFF;
				border-bottom: 1upx solid  rgba(0, 0, 0, .2);
				width:100%;
				padding:30upx 30upx;
				display: flex;
				align-items: center;
				text{
					font-size: 70upx;
					color:#566DCC;
					margin:10upx 20upx;
				}
				view{
					margin:0upx 20upx;
				}
			}
		}
	}
</style>
