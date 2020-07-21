<template>
	<view class="content">
		<view class="title">可将红利点数合并到保证金余额内。请注意，合并以后<text style="color:red;">无法</text>再转回为红利点数</view>
		<text style="display:block;font-size: 30upx;margin:10upx 0;">转移金额</text>
		<view style="position: relative;">
			<input v-model="money" @focus="money=''">
			<view style="position: absolute;top:50%;left:10upx;transform: translate(0%,-50%);">¥</view>
		</view>
		<button @click="post()" style="background-color: #A4B1E3;margin:30upx 0;">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				money:0,
			};
		},
		methods:{
			post(){
				uni.request({
					url:'http://139.155.25.239:3001/profit/changeProfitToBond',
					method:'POST',
					data:{
						userId:uni.getStorageSync('id'),
						money:this.money
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res)
						if(res.data.code==0){
							uni.showToast({
								title:res.data.data,
								icon:"none",
							})
						}
						if(res.data.code==1){
							uni.showToast({
								title:res.data.data,
								icon:"none"
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
		width: 100%;
		height: 100%;
		background-color: #F0F0F0;
		padding: 0upx 20upx;
		input{
			background-color: #FFFFFF;
			padding:5upx 35upx;
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
	}
</style>
