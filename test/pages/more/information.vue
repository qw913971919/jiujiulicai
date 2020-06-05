<template>
	<view class="content">
		<view class="item">
			<text>账号</text>
			<view>{{userdata.user}}<text></text></view>
		</view>
		<view class="item">
			<text>姓名</text>
			<view @tap="goget('输入姓名')">{{userdata.name}}<text>></text></view>
		</view>
		<view class="item">
			<text>QQ号</text>
			<view @tap="goget('输入QQ')">{{userdata.qq}}<text>></text></view>
		</view>
		<view class="item">
			<text>变更密码</text>
			<view><text>></text></view>
		</view>
		<view class="item">
			<text>设定支付密码</text>
			<view>{{userdata.password?'已设定交易密码':'尚未设定'}}<text>></text></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userdata:{
					user:'Cc',
					name:'自卑',
					qq:'913971919',
					password:false//是否设定了支付密码
				},
			}
		},
		onLoad(){
			// 在这里获取用户设局，覆盖userdata
		},
		methods:{
			goget(type){
				uni.navigateTo({
					url:'./get?type='+type,
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		width:100%;
		height: 100%;
		position: fixed;
		overflow: auto;
		background-color: #F0F0F0;
		.item{
			background-color:#FFFFFF;
			padding:40upx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1upx solid rgba(0, 0, 0, .2);
			view{
				color:#5b5b5b;
				display: flex;
				justify-content: space-between;
				text{
					display: block;
					width:50upx;
					text-align: right;
				}
			}
		}
	}
</style>
