<template>
	<view class="content">
			<view class="item_box" @tap="goalipay()">
				<image mode="aspectFit" src="../../static/image/zfbcollection.jpg"></image>
				<view class="item">
					<text style="font-size: 38upx;color: #000000;font-weight: 550;margin-top: 20upx;">支付宝</text>
					<text>状态:{{trueimages.length?'已设置完成':'尚未设置'}}</text>
					<text v-if='userdata.alipay.enable'>收款账户:{{userdata.alipay.enable.username}}</text>
				</view>
				<view class="text">></view>
			</view>
			<view class="item_box" @tap="gowx()">
				<image mode="aspectFit" src="../../static/image/wxcollection.jpg"></image>
				<view class="item">
					<text style="font-size: 38upx;color: #000000;font-weight: 550;margin-top: 20upx;">微信</text>
					<text>状态:{{trueimages1.length?'已设置完成':'尚未设置'}}</text>
					<text v-if='userdata.wpay.enable'>收款账户:{{userdata.wpay.enable.username}}</text>
				</view>
				<view class="text">></view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				trueimages:[],
				trueimages1:[],
				falseimages:[],
				falseimages1:[],
				userdata: {
					alipay: {
						// enable: {
						// 	state: true,//判断是否是启用状态
						// 	username:'启用的测试用0',//收款的用户名
						// 	today:0,//今日收款的金额
						// 	id:0,//通过id发起请求，来确认是哪个账户被启用和停用
						// },
						// deactivation: [{
						// 	state: false,
						// 	username:'测试用1',
						// 	today:0,//今日收款的金额
						// 	id:1,//通过id发起请求，来确认是哪个账户被启用和停用
						// },{
						// 	state: false,
						// 	username:'测试用2',
						// 	today:0,//今日收款的金额
						// 	id:2,//通过id发起请求，来确认是哪个账户被启用和停用
						// }]
					},
					wpay:{},
				},
			};
		},
		onLoad(option) {
			// 通过token在这里获取用户的收款账户页数据
			this.getimageslist()
		},
		onShow(){
			this.getimageslist()
		},
		methods: {
			gowx() {
				uni.navigateTo({
					url: './wxcollection'
				})
			},
			goalipay() {
				uni.navigateTo({
					url: './zfbcollection'
				})
			},
			deletePayPic(id){
				console.log(this.trueimages)
				uni.request({
					url: 'http://139.155.25.239:3001/paypic/deletePayPic',
					method: 'POST',
					data: {
						id: id,
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							console.log(res,'是否成功删除')
							uni.showToast({
								title:'删除成功',
								icon:'none',
							})
						}
					},
				})
			},
			prompt() {
				this.$refs.prompt.show();
			},
			getopenprofituser(url,a,b) {
				uni.request({
					url: 'http://139.155.25.239:3001/paypic/userAddPaypic',
					method: 'POST',
					data: {
						authorId: uni.getStorageSync('id'),
						picUrl:url,
						name:b,
						username:a,
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res, '收款二维码设置成功')
						if (res.data.code === 401) {
							uni.showToast({
								title: '登录已超时，请重新登录',
								icon: 'none',
								success: (res) => {
									setTimeout(() => {
										uni.redirectTo({
											url: '../login/login1'
										})
									}, 1500)
								}
							})
						};
						if (res.data.code === 0) {
							this.images = res.data.data
							for (var i = 0; i < this.images.length; i++) {
								if (this.images[i].mode == true) {
									this.images[i].picUrl = this.images[i].picUrl.replace(/^.\//, '/')
									this.trueimages.push(this.images[i])
								}
								if (this.images[i].mode == false) {
									this.falseimages.push(this.images[i])
								}
							}
						}
					},
				})
			},
			getimageslist(){
				uni.request({
					url: 'http://139.155.25.239:3001/paypic/getUserPayPic',
					method: 'POST',
					data: {
						id: uni.getStorageSync('id'),
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res, '获取图片')
						if (res.data.code === 0) {
							this.userdata.alipay=res.data.data.apay
							this.images=true;
							for(var i=0;i<this.userdata.alipay.length;i++){
								if(this.userdata.alipay[i].mode===true){
									this.trueimages.push(this.userdata.alipay[i])
								}
								if(this.userdata.alipay[i].mode===false){
									this.falseimages.push(this.userdata.alipay[i])
								}
							}
							this.userdata.wpay=res.data.data.wpay
							this.images1=true;
							for(var i=0;i<this.userdata.wpay.length;i++){
								if(this.userdata.wpay[i].mode===true){
									this.trueimages1.push(this.userdata.wpay[i])
								}
								if(this.userdata.wpay[i].mode===false){
									this.falseimages1.push(this.userdata.wpay[i])
								}
							}
						}
					},
				})
			}
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

		.item_box {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			border-radius: 10upx;
			margin: 20upx 0;
			border: 1upx solid rgba(0, 0, 0, .2);
			align-items: center;

			image {
				flex: 2;
				width: 100%;
				height: 100upx;
			}

			.item {
				flex: 5;
				display: flex;
				flex-direction: column;
				font-size: 33upx;
				color: #666666;

				text {
					display: block;
					margin: 10upx;
				}
			}

			.text {
				flex: 2;
				margin-right: 20upx;
				height: 100upx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}
</style>
