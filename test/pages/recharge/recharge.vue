<template>
	<view class="content">
		<view class="notice">
			<view style="font-size: 45upx;font-weight: 550;">充值金额限制</view>
			<view>最低<text style="color:red">￥2.000</text>,最高<text style="color:red">￥50.000</text></view>
		</view>
		<view class="test">
			<text style="font-size: 42upx;margin:20upx 0;display:block;">充值方式:</text>
			<radio-group style="margin-left: 20upx;">
				<radio checked="true"></radio>
				网银充值
			</radio-group>
		</view>
		<view class="main_box">
			<input v-model="money" style="text-align: center;border: 1upx solid rgba(0, 0, 0, .2);line-height: 100%;"  @tap="money=''"/>
			<view class="button">
				<view @tap="change2000()">￥2,000</view>
				<view @tap="change4000()">￥4,000</view>
				<view @tap="change6000()">￥6,000</view>
				<view @tap="change8000()">￥8,000</view>
				<view @tap="change10000()">￥10,000</view>
				<view @tap="change20000()">￥20,000</view>
				<view @tap="change30000()">￥30,000</view>
				<view @tap="change40000()">￥40,000</view>
				<view @tap="change50000()">￥50,000</view>
			</view>
			<button style="background-color: #566DCC;" @tap="goorder()">确认提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				money:"请输入金额"
			}
		},
		onLoad() {

		},
		methods: {
			goorder(){
				console.log(this.money)
				this.money=parseInt(this.money)
				console.log(this.money)
				if(isNaN(this.money)){
					this.money="请输入金额"
					uni.showToast({
						title:'请输入正确的金额',
						duration:2000,
						icon:'none'
					})
				}else if(this.money<2000){
					uni.showToast({
						title:'订单金额不能小于2000',
						duration:2000,
						icon:'none'
					})
				}else if(this.money>50000){
					uni.showToast({
						title:'订单金额不能大于50000',
						duration:2000,
						icon:'none'
					})
				}else{
					uni.navigateTo({
						url:'../order/order?money='+this.money
					})
				}
			},
			change2000(){
				this.money=2000
			},
			change4000(){
				this.money=4000
			},
			change6000(){
				this.money=6000
			},
			change8000(){
				this.money=8000
			},
			change10000(){
				this.money=10000
			},
			change20000(){
				this.money=20000
			},
			change30000(){
				this.money=30000
			},
			change40000(){
				this.money=40000
			},
			change50000(){
				this.money=50000
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		position: fixed;
		background-color:#f0f0f0;
		height: 100%;
		width: 100%;
		padding:25upx;
		display: flex;
		flex-direction: column;
		.notice{
			flex:1;
			box-sizing: border-box;
			border-radius: 15upx;
			width:100%;
			background-color: #A4B1E3;
			padding:15upx;
			flex-grow:0;
			view:first-child{
				margin:15upx 0upx;
				}
		}
		.test{
			flex:1;
			flex-grow:0;
		}
		.main_box{
			flex:5;
			margin-top: 30upx;
			input{
				border: 1upx solid #FFFFFF;
				background-color:#FFFFFF;
				margin-top:20upx;
				padding: 15upx 10upx;
				border-radius: 30upx;
			}
			.button{
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				text-align: center;
				view{
					background-color: #2994db;
					margin:60upx auto;
					padding:5upx 15upx;
					color: #FFFFFF;
					width:30%;
					border-radius: 15upx;
				}
			}
		}
		
	}
	input{
		border: 1px solid #2C405A;
	}
</style>
