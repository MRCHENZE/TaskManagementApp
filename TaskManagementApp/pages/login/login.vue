<template>
	<view class="login login-bg w-h-100" :class="darkMode?'custom-dark':'custom-light'">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="用户名"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="密码" isShowPass></wInput>
			</view>
			<wButton text="登 录" :rotate="isRotate" @click.native="startLogin()"></wButton>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import wInput from '@/components/watch-login/watch-input.vue'
	import wButton from '@/components/watch-login/watch-button.vue'
	import md5 from '@/common/lib/md5.min.js'

	export default {
		computed: {
			...mapGetters(['darkMode'])
		},
		data() {
			return {
				// logo图片
				logoImage: '/static/img/tasklogo.png',
				phoneData: '', //用户/电话
				passData: '', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components: {
			wInput,
			wButton,
		},
		onLoad(options) {
			if (options.errorMsg) {
				uni.showToast({
					title: options.errorMsg,
					icon: 'none'
				})
			}
		},
		methods: {
			login(params) {
				if (params) {
					this.isRotate = true
					this.$store.dispatch('login', params).then(res => {
						this.isRotate = false
						uni.reLaunch({
							url: '/pages/index/index',
						})
					}).catch(() => {
						this.isRotate = false
					})
				}
			},
			startLogin() {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.passData.length < 0) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}

				// 网络请求
				const params = {
					name: this.phoneData,
					passwd: this.passData//md5(this.passData)
				}
				this.login(params)
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");

	.login-bg .content .header uni-image {
		width: 660rpx; /*需要在微信中修改*/
		height: 120rpx;
	}
	
</style>

