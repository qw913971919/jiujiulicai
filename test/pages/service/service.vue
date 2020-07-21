<template>
	<view class="content">
		<view class="announcement">
			<view class="announcement_title">
				<text class="b">新手帮助</text>
				<view @tap="goproblem()">查看全部>></view>
			</view>
			<view v-for="(item,i) in problem" :key="i" @tap="goProblemContent(item._id)" class="problem">
				<image src="../../static/image/help.png" model="widthFix"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		<view style="position: relative;top:170upx;width:100%;text-align: center;font-size: 35upx;" @click="go()">请下载蝙蝠APP，www.batchat.com
		<image src="../../static/image/bianfu.png" model="widthFix" style="width:250upx;height: 200upx;"></image>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view style="width:100%;background-color: #FFFFFF;display: flex;flex-direction: column;align-items: center;border-top-left-radius: 60%;border-top-right-radius: 60%;position: fixed;bottom: 0px;
	border: 1upx solid rgba(0, 0, 0, .2);right: 0;color:#808080;padding:20upx 0upx 10upx;font-size: 30upx;">

			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view style="width:100%;background-color: #FFFFFF;display: flex;flex-direction: column;align-items: center;border-top-left-radius: 60%;border-top-right-radius: 60%;position: fixed;bottom: 49px;
		border: 1upx solid rgba(0, 0, 0, .2);right: 0;color:#808080;padding:20upx 0upx 10upx;font-size: 30upx;">
				<!-- #endif -->
				<text>专线客服：2322799</text>
				<text>专线客服：2521857</text>
				<text style="margin-bottom:20upx;">提现客服：2772876</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				problem: [
				]
			}
		},
		onLoad() {
			this.getAllAnnounce()
		},
		methods: {
			renderTime(date) {
			      var dateee = new Date(date).toJSON();
			      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
			        .toISOString()
			        .replace(/T/g, " ")
			        .replace(/\.[\d]{3}Z/, "");
			},
			getAllAnnounce(){
				uni.request({
					url:'http://139.155.25.239:3001/announce/getAllAnnounce',
					method:"GET",
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:res=>{
						console.log(res)
						if(res.data.code==0){
							this.problem=[];
							for(var i=0;i<res.data.data.length;i++){
								if(res.data.data[i].type=="problem"&&this.problem.length<3){
									this.problem.push(res.data.data[i])
								}
							}
						}
					}
				})
			},
			goproblem() {
				uni.navigateTo({
					url: '../problem/problem'
				})
			},
			goProblemContent(id) {
				console.log(id)
				uni.navigateTo({
					url: '../problem/problemcontent?id=' + id
				})
			},
			go() {
				plus.runtime.openURL('https://www.batchat.com/')
			}
		}
	}
</script>

<style scoped lang='scss'>
	.content {
		background-color: #F0F0F0;
		width: 100%;
		height: 100%;
		padding: 10upx;
		position: fixed;
		overflow: auto;

		.announcement {
			width: 95%;
			margin: 20upx auto;
			background-color: #FFFFFF;
			border: 1upx solid rgba(0, 0, 0, .2);

			.announcement_title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20upx;
				font-size: 20upx;
				color: #808080;
				border: 1upx solid #F1F1F1;

				.b {
					color: #A4B1E3;
					font-size: 35upx;
				}
			}

			.problem {
				display: flex;
				align-items: flex-start;
				align-items: center;
				border-bottom: 1upx solid #C4C4C4;

				image {
					width: 100upx;
					height: 100upx;
					flex-shrink: 0; //图片不会被自动缩小，找了好久
					margin: 10upx;
				}

				text {
					padding: 10upx;
				}
			}
		}
	}
</style>
