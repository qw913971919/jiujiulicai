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
  src: url('./static/icon/iconfont.eot?t=1595871635032'); /* IE9 */
  src: url('./static/icon/iconfont.eot?t=1595871635032#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('./static/icon/iconfont.woff?t=1595871635032') format('woff'),
  url('./static/icon/iconfont.ttf?t=1595871635032') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./static/icon/iconfont.svg?t=1595871635032#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
