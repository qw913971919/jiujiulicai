<template>
	<view>
		<text class="date">{{dateedit(noticecontent.title,noticecontent.date)}}</text>
		<text class="title">{{noticecontent.title}}</text>
		<view class="content" v-html="noticecontent.content"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				noticecontent: {

				},
				
			}
		},
		onLoad(option) {
			this.id=option.id
			console.log(option.id)
			this.getNoticeContent(this.id)
		},
		methods: {
			dateedit(title, date) {
				if(title=="请仔细阅读平台公告和新手帮助"){
					return "2020-06-07 00:00:00"
				}
				if (title == "平台运营火爆开启"){
					return "2020-06-07 00:00:00"
				}
				if (title == "十码同跑模式"){
					return "2020-06-08 00:00:00"
				}
				if (title == "关于代理公告"){
					return "2020-06-07 00:00:00"
				}
				if(title=="大量订单火爆开启!"){
					return "2020-06-15 00:00:00"
				}
				if(title=="未及时处理处罚公告"){
					return "2020-06-20 23:00:00"
				}
				if(title=="大量订单火爆开启!!"){
					return "2020-07-01 00:00:00"
				}
				if(title=="提现公告"){
					return "2020-07-10 00:00:00"
				}
				if(title=="支付宝二维码异常"){
					return "2020-07-15 23:00:00" 
				}
				if(title=="近期充值重复提交"){
					return "2020-07-18 00:00:00"
				}
				if (title == "关于未及时处理相关"){
					return "2020-07-01 00:00:00"
				}
					return this.renderTime(date);
				},
			getNoticeContent(id){
				uni.request({
					url:'http://139.155.25.239:3001/announce/getAnnounceDetail',
					method:"POST",
					data:{
						id:id
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:res=>{
						if(res.data.code==0){
							this.noticecontent=res.data.data
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
