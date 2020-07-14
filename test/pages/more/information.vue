<template>
	<view class="content">
		<view class="item">
			<text>账号</text>
			<view>{{userdata.username}}<text></text></view>
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
			<view @tap="goget('输入新的密码')"><text>></text></view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userdata:{
					username:'遊客',
					name:'',
					qq:'',
				},
			}
		},
		onLoad(){
			this.getUserData()
			// 在这里获取用户设局，覆盖userdata
		},
		methods:{
			getUserData(){
				uni.request({
					url:'http://139.155.25.239:3001/user/getUserInfo',
					method:'POST',
					data:{
						id:uni.getStorageSync('id'),
					},
					header:{'Authorization': 'Bearer '+uni.getStorageSync('token')},
					success:(res)=>{
						console.log(res,'查看')
						if(res.data.code===401){
							uni.showToast({
								title:'登录已超时，请重新登录',
								icon:'none',
								success:(res)=>{
									setTimeout(()=>{
										uni.redirectTo({
											url: '../login/login1'
										})
									},1500)
								}
							})
						};
						if(res.data.code===0){
							this.userdata=res.data.data
						}
					}
				})
			},
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
