
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/home","pages/more/more","pages/service/service","pages/user/user","pages/more/information","pages/more/collection","pages/more/withdrawal","pages/more/form","pages/notice/noticecontent","pages/notice/notice","pages/problem/problem","pages/problem/problemcontent","pages/recharge/recharge","pages/order/order","pages/more/get","pages/more/wxcollection","pages/more/zfbcollection"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#566DCC","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#3cc51f","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/home/home","iconPath":"static/image/home.png","selectedIconPath":"static/image/home.png","text":"首页"},{"pagePath":"pages/user/user","iconPath":"static/image/user.png","selectedIconPath":"static/image/user.png","text":"我的"},{"pagePath":"pages/service/service","iconPath":"static/image/service.png","selectedIconPath":"static/image/service.png","text":"客服"},{"pagePath":"pages/more/more","iconPath":"static/image/more.png","selectedIconPath":"static/image/more.png","text":"更多"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"test","compilerVersion":"2.7.9","entryPagePath":"pages/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"久久收益"}},{"path":"/pages/more/more","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"更多","navigationStyle":"custom"}},{"path":"/pages/service/service","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"客服"}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":true,"backgroundTextStyle":"dark"}},{"path":"/pages/more/information","meta":{},"window":{"navigationBarTitleText":"账号安全"}},{"path":"/pages/more/collection","meta":{},"window":{"navigationBarTitleText":"收款账户"}},{"path":"/pages/more/withdrawal","meta":{},"window":{"navigationBarTitleText":"提现账号"}},{"path":"/pages/more/form","meta":{},"window":{"navigationBarTitleText":"盈利报表"}},{"path":"/pages/notice/noticecontent","meta":{},"window":{"navigationBarTitleText":"公告内容"}},{"path":"/pages/notice/notice","meta":{},"window":{"navigationBarTitleText":"系统公告"}},{"path":"/pages/problem/problem","meta":{},"window":{"navigationBarTitleText":"常见问题"}},{"path":"/pages/problem/problemcontent","meta":{},"window":{"navigationBarTitleText":" "}},{"path":"/pages/recharge/recharge","meta":{},"window":{"navigationBarTitleText":"在线充值"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"提交订单"}},{"path":"/pages/more/get","meta":{},"window":{"navigationBarTitleText":"修改个人信息"}},{"path":"/pages/more/wxcollection","meta":{},"window":{"navigationBarTitleText":"我的微信账户"}},{"path":"/pages/more/zfbcollection","meta":{},"window":{"navigationBarTitleText":"我的支付宝账户"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
