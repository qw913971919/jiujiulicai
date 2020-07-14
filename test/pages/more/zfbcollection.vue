<template>
	<view class="content">
		<prompt ref="prompt" @onConfirm="onConfirm" @onCancel="onCancel" title="提示" :text="promptText" :textname="name"></prompt>
		<view class="button" @tap="prompt()">+</view>
		<view v-if="userdata.alipay[0]">
			<view class="item_box" style="margin:20upx 0upx;" v-if="trueimages[0]">
				<text style="font-weight: 550;font-size: 35upx;">启用中的账户</text>
				<view class="item" v-for='(item,i) in trueimages' :key='i'>
					<image src="../../static/image/zfbcollection.jpg" mode="aspectFit"></image>
					<view class="text">
						<text style="font-size: 38upx;color: #000000;font-weight: 550;margin-top: 20upx;">支付宝</text>
						<text>状态:{{item.mode?'使用中':'未启用'}}</text>
						<text>收款账户:{{item.username}}</text>
						<text>收款人:{{item.name}}</text>
					</view>
					<view>
						<image src="../../static/image/edit.png" mode="aspectFit" @click="changePayPicMode(item._id,item.mode)"></image>
						<image src="../../static/image/delete.png" mode="aspectFit" @click="deletePayPic(item._id)"></image>
					</view>
				</view>
			</view>
			<view class="item_box" style="margin:20upx 0upx;" v-if="falseimages[0]">
				<text style="font-weight: 550;font-size: 35upx;">未启用的账户</text>
				<view class="item" v-for='(item,i) in falseimages' :key='i'>
					<image src="../../static/image/zfbcollection.jpg" mode="aspectFit"></image>
					<view class="text">
						<text style="font-size: 38upx;color: #000000;font-weight: 550;margin-top: 20upx;">支付宝</text>
						<text>状态:{{item.mode?'使用中':'未启用'}}</text>
						<text>收款账户:{{item.username}}</text>
						<text>收款人:{{item.name}}</text>
					</view>
					<view>
						<image src="../../static/image/edit.png" mode="aspectFit" @click="changePayPicMode(item._id,item.mode)"></image>
						<image src="../../static/image/delete.png" mode="aspectFit" @click="deletePayPic(item._id)"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="none">暂未设置支付宝收款账户
		</view>
	</view>
</template>

<script>
	import prompt from '../../components/prompt.vue';
	export default {
		data() {
			return {
				images: false,
				trueimages: [],
				falseimages: [],
				promptText:'请输入账号名',
				name:'请输入支付宝真实姓名',
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
					}
				},
				flag: false,
			};
		},
		onLoad(option) {
			// 通过token在这里获取用户的收款账户页数据
			// 获取数据成功后降flag的值改为true；
			// this.flag=true;
			this.getimageslist()
		},
		components: {
			prompt,
		},
		methods: {
			onConfirm(a,b) {
				var _this=this
				console.log(a,'支付宝账号')
				console.log(b,'支付宝实名')
				uni.chooseImage({
					count: 1, //上传图片的数量，默认是9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const tempFilePaths = res.tempFilePaths; //拿到选择的图片，是一个数组
						// 这里已经拿到了支付宝的上传图片，使用临时图片上传至，服务器。
						console.log(tempFilePaths)
						uni.uploadFile({
							url: 'http://139.155.25.239:3001/paypic/addPayPic', //post请求的地址
							filePath: tempFilePaths[0],
							name: 'images',
							header: {
								token: uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								//这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
								var obj = JSON.parse(uploadFileRes.data);
								console.log(obj,'看看是啥')
								_this.getopenprofituser(obj.data,a,b)
								setTimeout(()=>{
									location.reload();
								},200)
							},
							fail:(err)=>{
								console.log(err)
							}
						})
					},

				});
			},
			onCancel(e){
				console.log(e)
			},
			changePayPicMode(id,mode){
				console.log(id,mode)
				uni.request({
					url: 'http://139.155.25.239:3001/paypic/changePayPicMode',
					method: 'POST',
					data: {
						authorId:uni.getStorageSync('id'),
						id: id,
						mode:!mode
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success: (res) => {
						console.log(res)
						if (res.statusCode === 200) {
							console.log(res,'是否成功更改状态')
							uni.showToast({
								title:'切换成功',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.navigateTo({
											url:'./zfbcollection'
										})
										// 刷新页面
									},1500)
								}
							})
						}
					},
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
								success:(res)=>{
									setTimeout(()=>{
										uni.navigateTo({
											url:'./zfbcollection'
										})
										// 刷新页面
									},1500)
								}
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
							this.userdata.alipay=res.data.data
							this.images=true;
							for(var i=0;i<this.userdata.alipay.length;i++){
								if(this.userdata.alipay[i].mode===true){
									this.trueimages.push(this.userdata.alipay[i])
								}
								if(this.userdata.alipay[i].mode===false){
									this.falseimages.push(this.userdata.alipay[i])
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
		overflow: auto;
		background-color: #f0f0f0;
		padding: 10upx 20upx;
		padding-bottom: 100upx;
		.none {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 34upx;
			white-space: nowrap;
		}

		.button {
			z-index: 50;
			position: fixed;
			color: #FFFFFF;
			bottom: 30upx;
			right: 30upx;
			width: 130upx;
			height: 130upx;
			background-color: #A4B1E3;
			text-align: center;
			line-height: 130upx;
			font-size: 45upx;
			border-radius: 50%;
			box-shadow: -1upx -2upx 5upx 2upx #939fcb, 2upx 2upx 5upx 2upx #939fcb;
		}

		text {
			display: block;
		}

		.item {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			border-radius: 10upx;
			margin: 20upx 0;
			border: 1upx solid rgba(0, 0, 0, .2);

			image:first-child {

				flex: 2;
				width: 100%;
				height: 100upx;
			}

			.text {
				flex: 4;
				font-size: 33upx;
				color: #666666;

				text {
					margin: 10upx;
				}
			}

			view:last-child {
				flex: 2;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-shrink: 0;

				image {
					flex: 1;
					box-sizing: border-box;
					width: 49%;
					padding: 20upx;
					height: 100upx;
				}

				image:last-child {
					border-left: 1upx solid rgba(0, 0, 0, .2);
				}

				image:first-child {
					border-right: 1upx solid rgba(0, 0, 0, .2);
				}
			}
		}
	}
</style>
