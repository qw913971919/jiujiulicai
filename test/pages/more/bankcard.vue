<template>
	<view class="content">
		<view>卡号：<input v-model="form.card" style="background-color: #FFFFFF;" :class="{'test':flag1}" @focus="flag1=true" @blur="flag1=false"/></view>
		<view>所属银行:<input v-model="form.bank" style="background-color: #FFFFFF;" :class="{'test':flag2}" @focus="flag2=true" @blur="flag2=false"/></view>
		<view>开户人姓名:<input v-model="form.name" style="background-color: #FFFFFF;" :class="{'test':flag3}" @focus="flag3=true" @blur="flag3=false"/></view>
		<view>开户省份:<input v-model="form.address" style="background-color: #FFFFFF;" :class="{'test':flag4}" @focus="flag4=true" @blur="flag4=false"/></view>
		<button @tap="submit" style="width:65%;margin-top:50upx;">提交信息</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flag1: false,
				flag2: false,
				flag3: false,
				flag4: false,
				form: {
					card: "", //银行卡卡号
					bank: "", //所属银行
					name: "",//开户人姓名
					address: ""//开户地址
				},

			}
		},
		onLoad(option) {
var a = [1,2,3,4,5];  //定义数组
var b = a.splice(2);  //从第三个元素开始执行删除
console.log(b);  //被删除的子数组是[1,2]
console.log(a)

		},
		methods: {
			submit() {
				this.form.money = parseInt(this.form.money)
				this.form.card = parseInt(this.form.card)
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
				if (!RegExp(patt).test(this.form.address)||this.form.address.length===0) {
					uni.showModal({
						title: '提交失败',
						content: '请输入正确的银行名称'
					})
					return;
				}
				console.log('即将发起订单',this.form)
				// 发起订单后，跳转回首页
				uni.request({
					url:'http://139.155.25.239:3001/user/getUserInfo',
					method:'POST',
					data:{
						id:uni.getStorageSync('id'),
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res,'用户信息')
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
							uni.request({
								url:'http://139.155.25.239:3001/user/completeInfo',
								method:'POST',
								data:{
									id:uni.getStorageSync('id'),
									username:res.data.data.username,
									qq:res.data.data.qq,
									name:this.form.name,
									cardid:this.form.card,//卡号
									bankname:this.form.bank,//所属银行
									bank:this.form.address,//开户地
								},
								header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
								success:(res)=>{
									console.log(res,'用户信息')
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
										
									}
								}
							})
							
						}
					}
				})
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
