(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/index"],{"60f4":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uniPopup:function(){return n.e("components/uni-popup/uni-popup").then(n.bind(null,"cb68"))}},r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.$t("UserInfo")),o=t.$t("UserName"),r=t.$t("Name"),i=t.$t("Role"),a=t.$t("Settings"),u=t.$t("ChangePassword"),s=t.$t("SignOut");t.$mp.data=Object.assign({},{$root:{m0:n,m1:o,m2:r,m3:i,m4:a,m5:u,m6:s}})},i=[]},6341:function(t,e,n){"use strict";n.r(e);var o=n("60f4"),r=n("a2c0");for(var i in r)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(i);var a=n("f0c5"),u=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=u.exports},a2c0:function(t,e,n){"use strict";n.r(e);var o=n("e911"),r=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=r.a},e911:function(t,e,n){"use strict";(function(t){var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("9523")),i=n("26cb"),a=o(n("67d4"));function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var s={components:{uniPopup:function(){n.e("components/uni-popup/uni-popup").then(function(){return resolve(n("cb68"))}.bind(null,n)).catch(n.oe)}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){(0,r.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},(0,i.mapGetters)(["user","themeBgColor","darkMode"])),data:function(){return{appInfo:{version:"",name:""},item:{oldPassword:"",newPassword:""}}},onShow:function(){this.initTheme()},onReady:function(){t.setNavigationBarTitle({title:this.$t("Profile")}),this.initTheme()},onLoad:function(){},methods:{initTheme:function(){this.setNavBarColor(),this.setDarkMode()},setDarkMode:function(){this.darkMode?t.setTabBarStyle({backgroundColor:"#2a2b2d"}):t.setTabBarStyle({backgroundColor:"#ffffff"})},setNavBarColor:function(){t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:this.themeBgColor,animation:{duration:400,timingFunc:"easeIn"}})},okClick:function(){var e=this,n={id:this.user.id,password:(0,a.default)(this.item.oldPassword),newpw:(0,a.default)(this.item.newPassword)};this.$minApi.userPwdModify(n).then((function(n){n.ok()?(e.$refs.modifyPassPopup.close(),t.showToast({title:"修改成功",icon:"none"}),setTimeout((function(){e.logout()}),2e3)):t.showToast({title:"原密码不正确！",icon:"none"})}))},modifyPass:function(){this.$refs.modifyPassPopup.open()},logout:function(){this.$store.dispatch("logout")},tapSettings:function(){t.navigateTo({url:"/pages/user/setting"})},appUpgrade:function(){t.showToast({title:"目前只支持Android版本软件更新",icon:"none"})}}};e.default=s}).call(this,n("543d")["default"])},f7d0:function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("6318");o(n("66fd"));var r=o(n("6341"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(r.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])}},[["f7d0","common/runtime","common/vendor"]]]);