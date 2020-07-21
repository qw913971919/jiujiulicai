<template>
	<view>
		<view v-for="(item,i) in problem" :key="i" @tap="goProblemContent(item._id)" class="problem">
			<image src="../../static/image/help.png" model="widthFix"></image>
			<text>{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	import get from '@/new_file.js'
	export default {
		data() {
			return {
				problem: []
			}
		},
		onLoad() {
			// get.request(123)
			this.getAllAnnounce()
		},
		methods: {
			goProblemContent(id) {
				console.log(id)
				uni.navigateTo({
					url:'./problemcontent?id='+id
				})
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
							this.problem=[];
							for(var i=0;i<res.data.data.length;i++){
								if(res.data.data[i].type=="problem"){
									this.problem.push(res.data.data[i])
								}
							}
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	view{
		width:100%;
		height: 100%;
	}
	span{
		text-indent: 10upx;
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
