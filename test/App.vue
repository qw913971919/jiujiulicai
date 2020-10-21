<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log('1')
			uni.getStorage({
				key:'token',
				success:function(res){
					if(res.data.token){
						uni.switchTab({
							url:'pages/home/home'
						})
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	view {
		box-sizing: border-box;
	}
@font-face {font-family: "iconfont";
  src: url('./static/icon/iconfont.eot?t=1600535170380'); /* IE9 */
  src: url('./static/icon/iconfont.eot?t=1600535170380#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('./static/icon/iconfont.woff?t=1600535170380') format('woff'),
  url('./static/icon/iconfont.ttf?t=1600535170380') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./static/icon/iconfont.svg?t=1600535170380#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-tupian:before {
  content: "\e61e";
}
.icon-weibiaoti1:before {
  content: "\e62e";
}

.icon-fenhongqingkuang:before {
  content: "\e60c";
}

.icon-tixian:before {
  content: "\e678";
}

.icon-shoukuan:before {
  content: "\e62d";
}

.icon-chongzhi:before {
  content: "\e600";
}

.icon-tubiao:before {
  content: "\e602";
}

.icon-shoukuanzhanghao:before {
  content: "\e6b7";
}

.icon-yonghu:before {
  content: "\e701";
}

.icon-bofangqi-zantingxiaodianshi:before {
  content: "\e6ac";
}

.icon-shouji:before {
  content: "\e621";
}




</style>
