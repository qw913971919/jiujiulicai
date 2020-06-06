<template>
	<view class="content">
		<view class="button" @tap="chooseImage()">+</view>
		<view v-if="flag">
			<view v-if="userdata.alipay.enable" class="item_box" style="margin:20upx 0upx;">
				<text style="font-weight: 550;font-size: 35upx;">启用中的账户</text>
				<view class="item">
					<image src="../../static/image/zfbcollection.jpg" mode="aspectFit"></image>
					<view class="text">
						<text style="font-size: 38upx;color: #000000;font-weight: 550;margin-top: 20upx;">微信</text>
						<text>状态:{{userdata.alipay.enable.state?'使用中':'未启用'}}</text>
						<text>收款账户:{{userdata.alipay.enable.username}}</text>
						<text>今日收款:{{userdata.alipay.enable.today}}元</text>
					</view>
					<view>
						<image src="../../static/image/edit.png" mode="aspectFit"></image>
						<image src="../../static/image/delete.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<view v-if="userdata.alipay.deactivation" class="item_box" style="margin:20upx 0upx;">
				<text style="font-weight: 550;font-size: 35upx;">未启用的账户</text>
				<view class="item" v-for='(item,i) in userdata.alipay.deactivation' :key='i'>
					<image src="../../static/image/zfbcollection.jpg" mode="aspectFit"></image>
					<view class="text">
						<text style="font-size: 38upx;color: #000000;font-weight: 550;margin-top: 20upx;">微信</text>
						<text>状态:{{item.state?'使用中':'未启用'}}</text>
						<text>收款账户:{{item.username}}</text>
						<text>今日收款:{{item.today}}元</text>
					</view>
					<view>
						<image src="../../static/image/edit.png" mode="aspectFit"></image>
						<image src="../../static/image/delete.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="none">暂未设置支付宝收款账户
		
		</view>
		<image :src="image[0]" v-if="image">{{image[0]}}</image>
		<!-- 如果前两者都没有，后台这里还应该做下处理，显示一行提示信息，但是目前不知道后台如何处理，暂时不写 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image:[],
				userdata: {
					alipay:{
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
				flag:false,
			};
		},
		onLoad(option) {
			// 通过token在这里获取用户的收款账户页数据
			// 获取数据成功后降flag的值改为true；
			// this.flag=true;
		},
		methods: {
		chooseImage(){
			uni.chooseImage({
			    count: 1, //上传图片的数量，默认是9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
			         const tempFilePaths = res.tempFilePaths;    //拿到选择的图片，是一个数组
					// 这里已经拿到了支付宝的上传图片，使用临时图片上传至，服务器。
					            // uni.uploadFile({
					            //   url:'http://localhost:3000/users/upload',		//post请求的地址
					            //   filePath:tempFilePaths[0],
					            //   name:'avatar',	
					            //   formData: {
					            //     'username': this.userInfo.username  //formData是指除了图片以外，额外加的字段
					            //   },
					            //   success: (uploadFileRes) => {
					            //     //这里要注意，uploadFileRes.data是个String类型，要转对象的话需要JSON.parse一下
					            //     var obj = JSON.parse(uploadFileRes.data);
					            //   }
					            // })
			    }
			});
		}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		position: fixed;
		width:100%;
		height: 100%;
		overflow: auto;
		background-color: #f0f0f0;
		padding:10upx 20upx;
		.none{
			position:fixed;
			top:50%;
			left:50%;
			transform: translate(-50%,-50%);
			font-size: 34upx;
			white-space: nowrap;
		}
		.button{
			z-index: 50;
			position: fixed;
			color: #FFFFFF;
			bottom: 30upx;
			right: 30upx;
			width:130upx;
			height: 130upx;
			background-color: #A4B1E3;
			text-align: center;
			line-height: 130upx;
			font-size: 45upx;
			border-radius: 50%;
			box-shadow:-1upx -2upx 5upx 2upx #939fcb, 2upx 2upx 5upx 2upx #939fcb;
		}
		text{
			display: block;
		}
		.item{
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			border-radius: 10upx;
			margin:20upx 0;
			border: 1upx solid rgba(0, 0, 0, .2);
			image:first-child{
				
				flex:2;
				width:100%;
				height: 100upx;
			}
			.text{
				flex:4;
				font-size: 33upx;
				color: #666666;
				text{
					margin:10upx;	
				}
			}
			view:last-child{
				flex:2;
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-shrink: 0;
				image{
					flex:1;
					box-sizing: border-box;
					width: 49%;
					padding:20upx;
					height: 100upx;
				}
				image:last-child{
					border-left: 1upx solid rgba(0, 0, 0, .2);
				}
				image:first-child{
					border-right: 1upx solid rgba(0, 0, 0, .2);
				}
			}
		}
	}
</style>
