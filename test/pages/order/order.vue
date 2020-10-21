<template>
	<view class="content">
		<view>金额：<input v-model="form.money" disabled="true" style="background-color: #d4dadb;" /></view>
		<view>充值卡号：<input v-model="form.card" disabled="true" style="background-color: #d4dadb;"/></view>
		<view>所属银行:<input v-model="form.bank" disabled="true" style="background-color: #d4dadb;"/></view>
		<view>姓名:<input v-model="form.name" disabled="true" style="background-color: #d4dadb;"/></view>
		<view>请在打款时备注该验证码:<input v-model="form.remarks" disabled="true" style="background-color: #d4dadb;"/></view>
		<button @tap="submit" style="width:65%;margin-top:50upx;">提交订单</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag1: false,
				flag2: false,
				flag3: false,
				form: {
					money: 0,
					card: "", //银行卡卡号
					bank: "", //所属银行
					name: "",
					remarks: 0
				},

			}
		},
		onLoad(option) {
			this.form.money = option.money
			this.form.remarks = Math.round(Math.random()*1000000)
			this.getAdminBank();
		},
		methods: {
			getAdminBank(){
				uni.request({
					url:'http://139.155.25.239:3001/admin/getAdminBank',
					method:'POST',
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res)
						if(res.data.code==0){
							this.form.card=res.data.data[0].cardid,
							this.form.bank=res.data.data[0].bankname,
							this.form.name=res.data.data[0].username
						}
					}
				})
			},
			submit() {
				this.form.money = parseInt(this.form.money)
				this.form.card = parseInt(this.form.card)
				this.form.remarks = parseInt(this.form.remarks)
				console.log('即将发起订单',this.form)
				// 发起订单后，跳转回首页
				
				// 以上应该写发起订单，一下是跳转回首页
				uni.request({
					url:'http://139.155.25.239:3001/order/addOrder',
					method:'POST',
					data:{
						authorId:uni.getStorageSync('id'),
						money:this.form.money,
						remarks:this.form.remarks,
						name:this.form.name
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res,'返回值')
						if(res.data.code===401){
							uni.showToast({
								title:'登录已超时，请重新登录',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.redirectTo({
											url: '../login/login1'
										})
									},1500)
								}
							})
						};
						if(res.data.code===0){
							console.log(res)
							uni.showToast({
								title:'提交订单成功',
								success:function(){
									setTimeout(()=>{
										uni.switchTab({
											url:'../home/home'
										})
									},1500)
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f0f0f0;
		position: fixed;
		width: 100%;
		height: 100%;
		flex-direction: column;
		overflow: auto;
		padding: 25upx 20upx;
		display: flex;

		view {
			width: 100%;
			display: flex;
			margin: 50upx 0;
			justify-content: space-between;
			align-items: center;
		}

		input {
			width: 65%;
			height: 100%;
			border: 1upx solid rgba(0, 0, 0, .2);
			border-radius: 20upx;
			padding-left: 20upx;
			background-color: #FFFFFF;
			vertical-align: middle;
		}

		.test {
			border: 1upx solid #549df8;
		}
	}
</style>
