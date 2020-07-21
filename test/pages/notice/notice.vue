<template>
		<view class="announcement">
			<view v-for="(item,i) in announcement" :key="i" class="announcement_content" @tap="goNoticecotent(item._id)">
				<text>{{dateedit(item.title,item.date)}}</text>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				announcement: []
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.getAllAnnounce()
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
						if(res.data.code==0){
							this.announcement=[];
							for(var i=0;i<res.data.data.length;i++){
								if(res.data.data[i].type=="notice"){
									this.announcement.push(res.data.data[i])
								}
							}
							this.announcement.reverse()
						}
					}
				})
			},
			goNoticecotent(id){
				console.log(id)
				uni.navigateTo({
					url:'../notice/noticecontent?id='+id,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.announcement{
		width:95%;
		margin:20upx auto;
		.announcement_title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding:20upx;
			font-size: 20upx;
			color:#808080;
			border: 1upx solid #F1F1F1;
			.b{
				color:#A4B1E3;
				font-size: 35upx;
			}
		}
		.announcement_content{
			border-left:1upx solid #F1F1F1;
			border-right:1upx solid #F1F1F1;
			border-bottom:1upx solid #F1F1F1;
			font-size: 32upx;
			padding:20upx;
			color:#808080;
			.title{
				color:#0C4DAF;
				font-weight: 500;
			}
		}
	}
</style>
