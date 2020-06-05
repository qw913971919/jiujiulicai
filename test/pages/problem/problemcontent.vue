<template>
	<view>
		<text class="title">{{problemcontent.title}}</text>
		<view class="content">{{problemcontent.content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				problemcontent: {
					date:'2020/5/28',
					title:'这是新手帮助的其中一个title',
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
