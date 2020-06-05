<template>
	<view>
		<text class="date">{{noticecontent.date}}</text>
		<text class="title">{{noticecontent.title}}</text>
		<view class="content">{{noticecontent.content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				noticecontent: {
					date:'2020/5/28',
					title:'随便写几个循环用，这是第一个系统公告',
					id:1,
					content:'内容会是一样的，因为没有接口，因为之后会有接口，就不做太多假数据了。'
				},
				
			}
		},
		onLoad(option) {
			this.id=option.id
			console.log(option.id)
			// getNoticeContent(option.id)
		},
		methods: {
			getNoticeContent(id){
				// 暂无接口
			}
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
