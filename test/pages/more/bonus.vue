<template>
	<view class="content">
		<view class="body">

				<image src="../../static/image/211.png" mode="aspectFit" style="width: 100%;border-radius: 20upx;height: 750upx;"></image>

			
			<view style="border: 1px solid rgba(0, 0, 0, 0.2);text-align:justify;background-color:#A4B1EC;padding:20upx;border-radius: 20upx;">
				<view style="margin:20upx;text-align: center;">详情</view>
				<view style="text-indent: 30upx;">团队业绩每超过10万，上级代理点位提升0.1。</view>
				<view style="text-indent: 30upx;">例：上级业绩1万交易量，下级BCD各3万交易量，总量10万交易量，上级的收益为：1万利润（120）+团队总量提成（10万×%0.1=100）+团队自身交易量（1万×0.1=10）＝230上级红利</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					a:{}
			}

		},
		created(){
			var b=this.a
				b.name="user"
				console.log(this.a,'a的值')
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: fixed;
		overflow-x: auto;
		width: 100%;
		height: 100%;
		background-color: #F0F0F0;
		padding-bottom: 200upx;
		.body {
			width: 90%;

			margin: 20upx auto;
		}
	}
</style>
