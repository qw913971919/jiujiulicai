<template>
	<view>
		<text class="title">{{problemcontent.title}}</text>
		<view class="content">
			<view v-html="problemcontent.content"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				html:{},
				problemcontent: [
				]
				
			}
		},
		onLoad(option) {
			this.id=option.id
			this.getNoticeContent(this.id)

		},
		methods: {
			getNoticeContent(id){
				uni.request({
					url:'http://139.155.25.239:3001/announce/getAnnounceDetail',
					method:"POST",
					data:{
						id:id
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:res=>{
						console.log(res)
						if(res.data.code==0){
							this.problemcontent=res.data.data
						}
					}
				})
			},
			renderTime(date) {
			      var dateee = new Date(date).toJSON();
			      return new Date(+new Date(dateee) + 8 * 3600 * 1000)
			        .toISOString()
			        .replace(/T/g, " ")
			        .replace(/\.[\d]{3}Z/, "");
			},
		}
	}
</script>

<style lang="scss" scoped>
	view{
		padding:20upx;
		font-weight: 600;
		font-size: 38upx;
		text:first-child{
			display: block;
		}
		.title{
			display: block;
			font-size: 50upx;
			text-align: center;
			margin:10upx 0;
		}
		.content{
			border-top:1upx solid #000000;
			font-size: 35upx;
		}
	}
</style>
