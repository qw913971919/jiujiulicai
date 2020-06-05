<template>
	<view class="content">
		<view>金额：<input v-model="form.money" disabled="true" style="background-color: #d4dadb;" /></view>
		<view>卡号：<input v-model="form.card" disabled="true" style="background-color: #d4dadb;"/></view>
		<view>所属银行:<input v-model="form.bank" disabled="true" style="background-color: #d4dadb;"/></view>
		<view>姓名:<input v-model="form.name" disabled="true" style="background-color: #d4dadb;"/></view>
		<view>打款备注:<input v-model="form.remarks" disabled="true" style="background-color: #d4dadb;"/></view>
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
		},
		methods: {
			submit() {
				this.form.money = parseInt(this.form.money)
				this.form.card = parseInt(this.form.card)
				this.form.remarks = parseInt(this.form.remarks)
				let patt = /^[\u4e00-\u9fa5]{0,}$/; //验证银行和姓名是否是纯汉字
				let patt2 = /^[0-9]*$/; //验证卡号是否是纯数字
				if (!RegExp(patt2).test(this.form.card)) {
					uni.showModal({
						title: '提交失败',
						content: '请输入正确的银行卡卡号'
					})
					this.form.card='';
					return;
				}
				if (!RegExp(patt).test(this.form.name)||this.form.name.length===0) {
					uni.showModal({
						title: '提交失败',
						content: '姓名含有非法字符或为空，请输入正确的姓名'
					})
					return;
				}
				console.log(this.form.name.length===0)
				if (!RegExp(patt).test(this.form.bank)||this.form.bank.length===0) {
					uni.showModal({
						title: '提交失败',
						content: '请输入正确的银行名称'
					})
					return;
				}
				console.log('即将发起订单',this.form)
				// 发起订单后，跳转回首页
				
				// 以上应该写发起订单，一下是跳转回首页
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
