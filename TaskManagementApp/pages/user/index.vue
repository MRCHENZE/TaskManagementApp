<template>
	<view :class="darkMode?'custom-dark':'custom-light'" class="w-h-100">
		<view>
		  <view class="person-head">
		    <cmd-avatar src="/static/img/logo2.jpg" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
		    <view class="person-head-box">
		      <view class="person-head-nickname">{{user?user.userName:''}}({{user?user.name:''}})</view>
		      <view class="person-head-username">{{user?user.roleStr:''}}</view>
		    </view>
		  </view>
		  <view class="person-list">
		    <cmd-cell-item title="我的设备" slot-left arrow>
		      <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
		    </cmd-cell-item>
		    <cmd-cell-item title="消息通知" slot-left arrow>
		      <cmd-icon type="message" size="24" color="#368dff"></cmd-icon>
		    </cmd-cell-item>
		    <cmd-cell-item title="检查版本" addon="v1.0.1" slot-left arrow>
		      <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
		    </cmd-cell-item>
		  </view>
		</view>
		<!--
		<view class="cu-bar solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>{{$t('UserInfo')}}
			</view>
		</view>
		<view class="padding-lr padding-tb-xs">
			<view class="uni-flex uni-row">
				<view class="flex-item-30">{{$t('UserName')}}</view>
				<view class="flex-item-70">{{user?user.name:''}}</view>
			</view>
		</view>
		<view class="padding-lr padding-tb-xs">
			<view class="uni-flex uni-row">
				<view class="flex-item-30">{{$t('Name')}}</view>
				<view class="flex-item-70">{{user?user.userName:''}}</view>
			</view>
		</view>
		<view class="padding-lr padding-tb-xs">
			<view class="uni-flex uni-row">
				<view class="flex-item-30">{{$t('Role')}}</view>
				<view class="flex-item-70">{{user?user.roleStr:''}}</view>
			</view>
		</view>-->
		<view class="padding-lr padding-tb-xs">
			<button class="cu-btn block shadow bg-gradual-blue margin" @tap="tapSettings">{{$t('Settings')}}</button>
			<!--<button class="cu-btn block shadow bg-gradual-blue margin" @tap="modifyPass">{{$t('ChangePassword')}}</button>-->
			<!--<button class="cu-btn block shadow bg-gradual-orange margin" @tap="appUpgrade">{{$t('Upgrade')}}</button>-->
			<button class="cu-btn block shadow bg-white margin text-black" @tap="logout">{{$t('SignOut')}}</button>
		</view>
		<view v-if="appInfo.version" class="text-grey text-center">
			{{appInfo.name}} {{appInfo.version}}
		</view>
		<uni-popup ref="modifyPassPopup" type="bottom" :custom="true">
			<view class="uni-share uni-share-padding-bottom">
				<view>
					<form>
						<view class="cu-form-group">
							<view class="title">原密码</view>
							<input password placeholder="原密码" name="oldPassword" v-model="item.oldPassword"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">新密码</view>
							<input password placeholder="新密码" name="newPassword" v-model="item.newPassword"></input>
						</view>
					</form>
					<view class="flex">
						<view class="flex-sub margin-sm">
							<button class="cu-btn block bg-blue margin" @tap="okClick">确认</button>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import md5 from '@/common/lib/md5.min.js'
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
	import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	export default {
		components: {
			uniPopup,
			cmdAvatar,
			cmdIcon,
			cmdCellItem
		},
		computed: {
			...mapGetters(['user', 'themeBgColor', 'darkMode'])
		},
		data() {
			return {
				appInfo: {
					version: '',
					name: ''
				},
				item: {
					oldPassword: '',
					newPassword: ''
				},
				logoImage: '/static/img/logo2.jpg',
			}
		},
		onShow() {
			this.initTheme()
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('Profile')
			})
			this.initTheme()
		},
		onLoad() {
			//#ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				this.appInfo.version = wgtinfo.version
				this.appInfo.name = wgtinfo.name
			})
			//#endif
		},
		methods: {
			initTheme() {
				this.setNavBarColor()
				this.setDarkMode()
			},
			setDarkMode() {
				this.darkMode ? uni.setTabBarStyle({
				  backgroundColor: '#2a2b2d'
				}) : uni.setTabBarStyle({
					backgroundColor: '#ffffff'
				})
			},
			setNavBarColor() {
				// navBar-bg-color
				uni.setNavigationBarColor({
				    frontColor: '#ffffff',
				    backgroundColor: this.themeBgColor,
				    animation: {
				        duration: 400,
				        timingFunc: 'easeIn'
				    }
				})
			},
			okClick() {
				const params = {
					id: this.user.id,
					password: md5(this.item.oldPassword),
					newpw: md5(this.item.newPassword)
				}
				this.$minApi.userPwdModify(params).then(res => {
					if (res.ok()) {
						this.$refs.modifyPassPopup.close()
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
						setTimeout(() => {
							this.logout()
						}, 2000)
					} else {
						uni.showToast({
							title: '原密码不正确！',
							icon: 'none'
						})
					}
				})
			},
			modifyPass() {
				this.$refs.modifyPassPopup.open()
			},
			logout() {
				this.$store.dispatch('logout')
			},
			tapSettings() {
				uni.navigateTo({
					url: '/pages/user/setting'
				})
			},
			/**
			 * app整包更新检测
			 */
			appUpgrade() {
				//#ifndef APP-PLUS
				uni.showToast({
					title: '目前只支持Android版本软件更新',
					icon: 'none'
				})
				//#endif
				//#ifdef APP-PLUS
				uni.getSystemInfo({
					success: sysInfo => {
						let platform = sysInfo.platform
						plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
							// this.appInfo.version = wgtinfo.version
							// this.appInfo.name = wgtinfo.name
							let params = {
								appid: plus.runtime.appid,
								version: wgtinfo.versionCode,
								platform: platform
							}
							this.$minApi.findUpgradeApp(params).then(appRes => {
								if (appRes.appid) {
									uni.showModal({
										title: "下载更新提示",
										content: appRes.note,
										showCancel: false,
										confirmText: '确定',
										success: sucRes => {
											if (sucRes.confirm) {
												plus.runtime.openURL(appRes.url)
												// uni.downloadFile({
												//     url: appRes.url,
												//     success: res => {}
												// })
											}
										}
									})
								} else {
									uni.showToast({
										title: '已经是最新版本了。',
										icon: 'none'
									})
								}
							})
						})
					}
				})
				//#endif
			}
		}
	}
</script>

<style>
	.flex-item-70 {
		font-family:Helvetica Neue, Helvetica, sans-serif;
		font-weight: 600;
		font-size: larger;
		color: deepskyblue;
	}
	
	.person-head {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  height: 100px;
	  padding-left: 20px;
	  /*background: linear-gradient(to right, #365fff, #36bbff);*/
	  background: linear-gradient(to right, #27547d, #177cb0);
	}
	
	.person-head-box {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: flex-start;
	  margin-left: 10px;
	}
	
	.person-head-nickname {
	  font-size: 14px;
	  font-weight: 500;
	  padding-bottom: 10rpx;
	  color: #fff;
	}
	
	.person-head-username {
	  font-size: 16px;
	  font-weight: 500;
	  color: #fff;
	}
	
	.person-list {
	  line-height: 0;
	  padding-bottom: 100px;
	}
	
</style>

<style lang="scss" scoped>

	.user {
		.promotion-center {
			background: #fff;
			margin-bottom: 20upx;

			/*分类列表*/
			.category-list {
				width: 100%;
				padding: 0 0 30upx 0;
				border-bottom: solid 2upx #f6f6f6;
				display: flex;
				flex-wrap: wrap;

				.category {
					width: 33.3%;
					margin-top: 50upx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img {
						width: 100%;
						display: flex;
						justify-content: center;

						.iconfont {
							font-size: 32upx + 24upx;
						}
					}

					.text {
						width: 100%;
						display: flex;
						justify-content: center;
						font-size: 24upx;
						color: #3c3c3c;
					}

					.share-btn {
						height: 142upx;
						text-align: left;
						background: none;
						padding: 0;
						margin: 0;
					}

					.share-btn:after {
						border: none;
						border-radius: none;
					}
				}
			}
		}


		.no-foot-print {
			text-align: center;
			padding: 48upx 0;

			.no-foot-print-icon {
				font-size: 32upx + 2upx;
				margin-right: 10upx;
			}
		}

		.set {
			padding: 20upx 0;

		}

		.cu-list.card-menu {
			margin: 20upx 0;

			.title {
				margin-left: 20upx;
			}
		}

		.user-section {
			height: 520upx;
			padding: 100upx 30upx 0;
			position: relative;

			.bg {
				position: absolute;
				left: 0;
				top: 0;
				width: 100vw;
				height: 60vw;
				opacity: 0.84;
			}

			.user-info-box {
				height: 180upx;
				display: flex;
				align-items: center;
				position: relative;
				z-index: 1;
				justify-content: space-between;
				background-color: #0055ff;

				.portrait-box {
					display: flex;
					align-items: center;

					.portrait {
						width: 130upx;
						height: 130upx;
						border: 5upx solid #fff;
						border-radius: 50%;
					}

					.username {
						font-size: 32upx + 6upx;
						color: #fff;
						margin-left: 20upx;
					}

					button {
						background-color: transparent;
						font-size: 32upx + 6upx;
						color: #303133;
						border: none;
					}

					button::after {
						border: none;
					}
				}
			}

			.vip-card-box {
				display: flex;
				flex-direction: column;
				color: #f7d680;
				height: 240upx;
				background: url('/static/img/vip-card.png');
				background-size: 100% 100%;
				border-radius: 16upx 16upx 0 0;
				overflow: hidden;
				position: relative;
				padding: 20upx 24upx;

				.b-btn {
					position: absolute;
					right: 24upx;
					top: 24upx;
					width: 160upx;
					height: 40upx;
					text-align: center;
					line-height: 40upx;
					font-size: 22upx;
					color: #36343c;
					border-radius: 20px;
					background: linear-gradient(to left, #f9e6af, #ffd465);
					z-index: 1;
				}

				.tit {
					font-size: 28upx + 2upx;
					color: #f7d680;
					margin-bottom: 28upx;

					.iconfont {
						color: #f6e5a3;
						display: inline-block;
						margin-right: 16upx;
					}
				}
			}
		}

		.cover-container {
			margin-top: -150upx;
			padding: 0 30upx 20upx;
			position: relative;
			background-color: #f8f8f8;

			.arc {
				position: absolute;
				left: 0;
				top: -34upx;
				width: 100%;
				height: 36upx;
			}

			.promotion-center {
				background: #fff;
				margin-bottom: 20upx;

				/*分类列表*/
				.category-list {
					width: 100%;
					padding: 0 0 30upx 0;
					border-bottom: solid 2upx #f6f6f6;
					display: flex;
					flex-wrap: wrap;

					.category {
						width: 33.3%;
						margin-top: 50upx;
						display: flex;
						justify-content: center;
						flex-wrap: wrap;

						.img {
							width: 100%;
							display: flex;
							justify-content: center;

							.iconfont {
								font-size: 32upx + 24upx;
							}
						}

						.text {
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 24upx;
							color: #3c3c3c;
						}

						.share-btn {
							height: 142upx;
							text-align: left;
							background: none;
							padding: 0;
							margin: 0;
						}

						.share-btn:after {
							border: none;
							border-radius: none;
						}
					}
				}
			}
		}
	}

</style>