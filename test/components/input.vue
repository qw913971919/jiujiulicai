<template>
	<view class="content">
		<text>请{{title}}</text>
		<!-- 动态绑定一个样式 -->
		<input v-model="text" :class="{'border':true,'border1':flag}" @focus="flag=true" @blur="flag=false"/>
		<button class="submit" @tap="submit()">更新</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text:'',
				flag:false
			};
		},
		props:{
			title:{
				type:String,
				default:'获取失败'//未获取到父组件传递来的参数时的默认值
			}
		},
		methods:{
			submit(){
				if(this.title==='输入QQ'){
					// 执行
					this.$emit('modifyqq',this.text)
					return
				}
				if(this.title==='输入姓名'){
					this.$emit('modifyname',this.text)
					return
				}
				if(this.title==='输入新的密码'){
					this.$emit('modifypassword',this.text)
					return
				}
			}
		}
	}
</script>

<style lang="scss">
	.content{
		position: fixed;
		width:100%;
		height: 100%;
		background-color: #F0f0f0;
		overflow: auto;
		text{
			display: block;
			margin:20upx;
		}
		.border{
			border-radius: 20upx;
			width:90%;
			height: 50upx;
			line-height: 50upx;
			padding:5upx 20upx;
			margin:10upx auto;
			background-color: #FFFFFF;
			border: 1upx solid rgba(0, 0, 0, .2);
		}
		.border1{
			border: 1upx solid rgba(90, 142, 239, 0.2);
		}
		.submit{
			background-color: #566DCC;
			margin:30upx 20upx;
		}
	}
</style>
