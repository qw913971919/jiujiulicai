<template>
	<view class="content">
		<view>
			<view class="username">账号：{{userdata.telephone}}</view>
			<view class="userinformation">
				<view class="user_box">
					<view>初始金余额</view>
					<view class="information">¥{{userdata.initialMoney}}</view>
				</view>
				<view class="user_box">
					<view>进行中的订单</view>
					<view class="information">￥{{money}}</view>
				</view>
			</view>
			<view class="box">
				<view class="getmoney">
					<view style="font-size: 33upx;position: relative;text-align: center;display: flex;align-items: center;"><span
						 class="iconfont icon-weibiaoti1" style="font-size: 50upx;"></span>利润:<text style="color:#FF7C7C;font-weight: bold;text-indent: 15upx;">{{userdata.profitMoney}}</text></view>
					<view style="display: flex;">
						<view class="recharge" @tap="goprofitMoney">红利转移</view>
						<view class="recharge" @tap="goRecharge">充值</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view v-for='(item,i) in msglist' :class="{mymsg:item.mymsg,fmsg:item.fmsg,gx:true}" :key='i'>
				<text style="background: #FFFFFF;padding: 10upx 20upx;border-radius: 20upx;" v-show='item.type==0'>{{item.msg}}</text>
				<image style="background: #FFFFFF;padding: 10upx 20upx;border-radius: 20upx;width:50%;" mode="aspectFit" v-show='item.type==1'
				 :src="'http://139.155.25.239:3001'+item.message"></image>
				<view v-show="item.type==2" style="background: #FFFFFF;padding: 20upx;">
					<view v-if='item.money'>
						<view>金额:{{item.money}}</view>
						<view class="text" style="display: flex;justify-content: space-between;"><text>订单信息：</text><text v-show="item.pay=='apay'">(支付宝)</text><text v-show="item.pay=='wpay'">(微信)</text></view>
						<view v-show="item.date">派单时间：{{renderTime(item.date)}}</view>
					</view>

					<button @tap="confirm(item.money,item.orderid,i)">进行获利</button>
				</view>
			</view>
		</view>
		<view style="display: flex;background-color: #FFFFFF;height:140upx;position: fixed;width: 100%;bottom: 0upx;flex-direction: column;">
			<view style="display: flex;flex:1;width: 100%;">
				<input v-model="value" style="height: 70upx;width: 100%;"><button style="margin-right:0;line-height: 70upx;font-size: 30upx;flex-grow: 0;width: 150upx;"
				 @click="sendmsg">发送</button>
			</view>
			<view style="flex:1;background-color: #B0BCE3;">
				<view style="display: flex;align-items: center;height: 100%;">
					<span class="iconfont icon-tupian" style="font-size: 50upx;margin:0 20upx;display: block;" @click="onConfirm"></span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				bb: false,
				cc: false,
				te: null,
				money: 0,
				time: null,
				value: '',
				msglist: [],
				userdata: {
					username: '会员',
					bond: 0, //保证金
					orderlist: []
				},
				switchmode: [],
				switchmode1: []
			}
		},
		async onLoad() {
			await this.getUserData() //经过改造的同步请求
			console.log(uni.getStorageSync('id'), '测试输出id')
			this.profit()
			clearInterval(this.te)
		},
		onHide() {
			// 隐藏时
			this.socket.emit('disconnect')

		},
		async onShow() {
			// 进页面获取数据
			await this.getUserData()
			this.join()
			this.sockettest()




		},
		onPullDownRefresh() {
			// 刷新获取数据在这里获取，这里是页面刷新动画启用时的生命周期，如果想要刷新数据，在这里调用
			// this.flag = uni.getStorageSync('flag');
			// this.money = 0;
			// setTimeout(() => {
			// 	uni.stopPullDownRefresh()
			// 	if (this.userdata.userForbiden == true) {
			// 		uni.setStorageSync('flag', false)
			// 	}
			// 	clearInterval(this.te)
			// 	this.swichMoney(uni.getStorageSync('flag'))
			// 	//重新发起获取数据请求，写在这里
			// }, 1000)
		},
		methods: {
			onConfirm() {
				var _this = this;
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
								token: uni.getStorageSync('token'),

							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes)
								//这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
								let o = JSON.parse(uploadFileRes.data);
								let obj = {
									type: 1,
									mymsg: 1,
									message: o.data
								}
								let bj = {
									type: 1,
									fmsg: 1,
									message: o.data
								}
								console.log(obj, '看看是啥')
								_this.socket.emit('sendMsg', bj, _this.userdata._id, "5f22ffd93fbd6d4435711dfa")
								_this.msglist.push(obj)
								console.log(_this.msglist)
							},
							fail: (err) => {
								console.log(err)
							}
						})
					},

				});
			},
			renderTime(date) {
				var dateee = new Date(date).toJSON();
				return new Date(+new Date(dateee) + 8 * 3600 * 1000)
					.toISOString()
					.replace(/T/g, " ")
					.replace(/\.[\d]{3}Z/, "");
			},
			goprofitMoney() {
				uni.navigateTo({
					url: '../profitMoney/profitMoney'
				})
			},
			profit(){
				uni.request({
					url: 'http://139.155.25.239:3001/profit/getProfit',
					method: 'post',
					data: {
						userId: uni.getStorageSync('id'),
					},
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync('token')
					},
					success:(res)=>{
						console.log(res,'订单')
						if(res.data.code==0){
							
							for(var i=0;i<res.data.data.length;i++){
								let sg={};
								sg.money=res.data.data[i].money;
								sg.pay=res.data.data[i].type;
								sg.orderid=res.data.data[i]._id;
								sg.type=2;
								sg.date=res.data.data[i].createdate;
								this.msglist.push(sg)
							}
						}
					},
					fail:(err)=>{
						console.log(err)
					},
					})
			},
			//登录websocket
			join() {
				console.log(this.userdata._id, '看看呢')
				this.socket.emit('login', this.userdata._id)
				this.socket.emit('userList', '触发了')
			},
			sockettest() {
				// console.log('测试')
				this.socket.on('sendMsg', data => {
					if(this.msglist.length==0){
						let obj = data;
						obj.fmsg = 1;
						this.msglist.push(obj)
						console.log(this.msglist, '测试')
					}else if(this.msglist[this.msglist.length-1].flag!=data.flag){
						let obj = data;
						obj.fmsg = 1;
						this.msglist.push(obj)
						console.log(this.msglist, '测试第二个判断')
						}
				})
			},
			//发送消息给后端
			sendmsg() {
				console.log('发送' + this.value)
				var msg = {};
				msg.mymsg = 1;
				msg.msg = this.value;
				msg.type = 0;
				this.msglist.push(msg)
				let sg = {};
				sg.msg = this.value;
				sg.type = 0;
				sg.fmsg = 1;
				console.log(this.msglist)
				this.socket.emit('sendMsg', sg, this.userdata._id, "5f22ffd93fbd6d4435711dfa")
				this.value = ''
				
			},
			//接收消息
			receiveSocketMsg() {
				console.log('接收测试')
				this.socket.on('sendMsg', (msg, formid) => {
					if (msg.tpye == 1) {
						var sg = msg;
						sg.fmsg = 1;
						this.msglist.push(sg)
					} else {
						var sg = {};
						sg.fmsg = 1;
						sg.msg = msg;
						this.msglist.push(sg)
					}

				})
			},
			//开关开启之后，开启一个定时器循环请求
			getMoney() {
				if (this.userdata.userForbiden == true) {
					console.log('输出入了')
					this.flag = false;
					this.money = 0;
					clearInterval(this.te)
					this.swichMoney(this.flag)
					return;
				}
				this.flag = !this.flag;
				if (this.flag) {
					console.log('开启时')
					clearInterval(this.te)
					this.swichMoney(this.flag);
				} else {
					this.money = 0;
					clearInterval(this.te)
					this.swichMoney(this.flag)
				}
			},
			getUserData() {
				return new Promise((resolve, reject) => {

					uni.request({
						url: 'http://139.155.25.239:3001/user/getUserInfo',
						method: 'POST',
						data: {
							id: uni.getStorageSync('id'),
						},
						header: {
							'Authorization': 'Bearer ' + uni.getStorageSync('token')
						},
						success: (res) => {
							console.log(res, '用户信息')

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
								this.userdata = res.data.data
								console.log(this.userdata, '获取到的数据')
								if (this.userdata.userForbiden == true) {
									console.log('bbbbbbbbbb')
									uni.setStorageSync('flag', false)
									uni.showToast({
										title: '用户已被禁止开启获利模式，暂不会有新的订单派送',
										icon: 'none',
									})
								}
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
										console.log(res.data.data, '支付宝数组')
										this.switchmode = res.data.data.wpay
										this.switchmode1 = res.data.data.apay
									}
								})

							}
							resolve('1')
						},
						fail: (err) => {
							reject(err)
						}
					})
				})
			},
			goRecharge() {
				setTimeout(() => {
					uni.navigateTo({
						url: '../recharge/recharge'
					})
				}, 200)

			},
			confirm(money, orderid,i) {
				console.log(orderid)
				uni.showModal({
					title: '确定订单',
					content: '确认收到此比款项' + money + '元',
					confirmText: '确认',
					cancelText: '取消',
					success: res => {
						if (res.confirm) {
							console.log('确认收款')
							uni.request({
								url: 'http://139.155.25.239:3001/profit/checkUserProfit',
								method: 'POST',
								data: {
									userId: uni.getStorageSync('id'),
									id: orderid
								},
								header: {
									'Authorization': 'Bearer ' + uni.getStorageSync('token')
								},
								success: (res) => {
									console.log(res, '获利成功')
									this.money = 0;
									if (res.data.code === 0) {
										// 删除订单
										uni.showToast({
											title: res.data.data,
											icon: 'none'
										})
										uni.request({
											url: 'http://139.155.25.239:3001/profit/deleteProfit',
											method: 'POST',
											data: {
												id: orderid
											},
											header: {
												'Authorization': 'Bearer ' + uni.getStorageSync('token')
											},
											success: (res) => {
												console.log(res, '删除订单')
												if (res.data.code === 0) {
													console.log('删除订单成功')
													// 重新获取订单数据
													this.msglist.splice(i,1)
													this.getUserData()
													uni.request({
														url: 'http://139.155.25.239:3001/profit/getProfit',
														method: 'POST',
														data: {
															userId: uni.getStorageSync('id'),
														},
														header: {
															'Authorization': 'Bearer ' + uni.getStorageSync('token')
														},
														success: (res) => {
															if (res.data.code === 0) {
																this.userdata.orderlist = res.data.data;
																for (var i = 0; i < res.data.data.length; i++) {
																	console.log(res.data.data[i].money)
																	this.money += Number(res.data.data[i].money)
																}
																console.log(res.data.data, '获取到的订单数据')
															}
														},
														fail: (err) => {
															console.log(err)
														}
													})
												}
											},
											fail: (err) => {
												console.log(err)
											}
										})

									}


								},
							})

							//调用接口，发起请求，更改订单状态，同时重新调获取页面数据的接口，刷新页面
						} else if (res.cancel) {
							console.log('取消提交')
						}
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;
		overflow: auto;
		position: fixed;
		background-color: #f0f0f0;
		padding-bottom: 350upx;

		.order:last-child {}

		.tips {
			margin: 80upx auto;
			text-align: center;
			color: #636363;
		}

		.order {


			.gx {
				width: 90%;
				margin: 30upx;
			}

			.mymsg {
				float: right;
				text-align: right;
			}

			.fmsg {
				float: left;
			}
		}

		.username {
			background: #b0bce3;
			margin-bottom: -5upx;
			padding: 10upx 20upx;
			text-align: center;
		}

		.box {
			background: #b0bce3;
			margin-top: -3upx;
			padding: 20upx 10upx;

			.getmoney {
				background-color: #FFFFFF;
				border: 1upx solid rgba(0, 0, 0, .2);
				margin: 20upx 0;
				padding: 20upx;
				border-radius: 10upx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.recharge {
					padding: 10upx 20upx;
					margin: 0 10upx;
					font-size: 25upx;
					border-radius: 30upx;
					background-color: #000000;
					color: #FFFFFF;
					flex-shrink: 0;
				}
			}
		}

		.userinformation {
			width: 100%;
			display: flex;
			justify-content: space-around;
			text-align: center;
			padding: 40upx 0upx;
			background: #b0bce3;
			color: #566DCC;
			font-size: 35upx;

			.user_box {
				flex: 1;

				.information {
					color: #FF7C7C;
					font-weight: bold;
					font-size: 40upx;
				}
			}

			.user_box:first-child {
				border-right: 1px solid #c4c4c4;
			}

			.user_box:last-child {
				border-left: 1px solid #c4c4c4;
			}
		}
	}
</style>
