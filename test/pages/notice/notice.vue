<template>
		<view class="announcement">
			<view v-for="(item,i) in announcement" :key="i" class="announcement_content" @tap="goNoticecotent(item.id)">
				<text>{{item.date}}</text>
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
				announcement: [{
					date: "2020/5/28",
					title: "随便写几个循环用，这是第一个",
					id:1
				}, {
					date: "2020/5/28",
					title: "随便写几个，这是第二个",
					id:2
				}, {
					date: "2020/5/28",
					title: "随便写几个，这是第三个",
					id:3
				}, 
				{
					date: "2020/5/28",
					title: "随便写几个，这是第四个",
					id:4
				}, 
				{
					date: "2020/5/28",
					title: "随便写几个，这是第五个",
					id:5
				}, 
				{
					date: "2020/5/28",
					title: "随便写几个，这是第六个",
					id:6
				}, ]
			}
		},
		onLoad(option) {
			console.log(option.id)
		},
		methods: {
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
