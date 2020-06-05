<template>
	<view>
		<view v-for="(item,i) in problem" :key="i" @tap="goProblemContent(item.id)" class="problem">
			<image src="../../static/image/help.png" model="widthFix"></image>
			<text>{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				problem: [{
					title: '[新手帮助]，随便乱写几行字，好累啊',
					id: 10
				}, {
					title: '[新手帮助]，随便乱写啊啊啊啊啊啊啊',
					id: 11
				}, {
					title: '[新手帮助]，随便我写个三个复制一下充数可以吧',
					id: 12
				}, {
					title: '[新手帮助]，随便乱写几行字',
					id: 13
				}, {
					title: '[新手帮助]，随便乱写啊啊啊啊啊啊啊',
					id: 14
				}, {
					title: '[新手帮助]，随便我写个三个复制一下充数可以吧',
					id: 15
				}, ]
			}
		},
		onLoad() {},
		methods: {
			goProblemContent(id) {
				console.log(id)
				uni.navigateTo({
					url:'./problemcontent?id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	view{
		width:100%;
		height: 100%;
	}
	.problem{
		display: flex;
		align-items:flex-start;
		align-items: center;
		border-bottom: 1upx solid #C4C4C4;
		image{
			width:100upx;
			height:100upx;
			flex-shrink:0;//图片不会被自动缩小，找了好久
			margin:10upx;
		}
		text{
			padding:10upx;
		}
	}
</style>
