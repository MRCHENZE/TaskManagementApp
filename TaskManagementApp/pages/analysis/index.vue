<template>
	<view :class="darkMode?'custom-dark':'custom-light'">
		<!--<view class="common-page-head">
			<view class="common-page-head-title">责任目标管理系统</view>
		</view>-->
		<uni-notice-bar speed=50 show-icon scrollable color="#177cb0" background-color="#f2f2f2" text="企业哲学:向善而建!			企业使命:弘扬建筑文明,赋能美好生活!		核心价值观:人本,创新,担当,协作,共赢!		企业精神:敬业守信,勇担责任,建造精品,追求卓越!" />
		<view class="index-swiper">
			<swiper class="index-swiper-swiper" indicator-active-color="#ffffff" indicator-dots="true" autoplay="true" loop="true" circular="true">
				<block v-for="(item,index) in banner" :key="index">
					<swiper-item>
						<image  class="index-swiper-swiper-img" :src="'/static/img/'+item" mode="aspectFill"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!--<view class='container'>
			<swiper :indicator-dots="true" :autoplay="true" :interval="4000" :duration="150" :circular="true" class='tui-banner-box'
				@change="change">
				<swiper-item v-for="(item, index) in banner" :key="index" class="tui-banner-swiper">
					<image :src="'/static/img/'+item" mode="aspectFit" lazy-load=""> </image>
				</swiper-item>
			</swiper>
		</view>-->
		<view class="analysis padding-xs flex align-center">

			<view class="flex-sub text-center">
				<view class="solid-bottom text-xxl padding">
					<text class="analysis-num">{{projectNum}}</text>
				</view>
				<view class="padding">{{$t('TaskCountThisMonth')}}</view>
			</view>
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xxl padding">
					<text class="analysis-num">{{userNum}}</text>
				</view>
				<view class="padding">{{$t('FinishedTaskCountThisMonth')}}</view>
			</view>
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xxl padding">
					<text class="analysis-num">{{unfinishedNum}}</text>
				</view>
				<view class="padding">{{$t('UnFinishedTaskCountThisMonth')}}</view>
			</view>
		</view>
		<ucharts-demo></ucharts-demo>
		<!--<project-time-table></project-time-table>-->
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import ProjectTimeTable from '@/pages/analysis/time-table.vue'
	import UchartsDemo from '@/pages/analysis/ucharts-demo.vue'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			ProjectTimeTable,
			UchartsDemo,
			uniNoticeBar
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode']),
		},
		data() {
			return {
				projectNum: 0,
				userNum: 0,
				unfinishedNum: 0,
				banner: ['taskbackgroud.jpg', 'mothod.jpg'],
				current: 0,
			}
		},
		mounted() {
			this.initTaskInfo()
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.$t('TaskManagement')
			})
			this.setNavBarColor()
		},
		onShow() {
			this.setNavBarColor()
		},
		methods: {
			change: function(e) {
				this.current = e.detail.current;
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
			initTaskInfo() {
				this.$minApi.getCurrentMonthTasks().then(res => {
					// 接口返回的当前页数据列表 (数组)
					if (res.result) {
						this.projectNum = res.result.total
						this.userNum = res.result.finished
						this.unfinishedNum = res.result.unfinished
					}
				})
			}
		}
	}
</script>
<style>
	.index-swiper{
		width: 100%;
		height: 360rpx;
	}
	.index-swiper-swiper{
		width: 100%;
		height: 100%;
	}
	.index-swiper-swiper-img{
		width: 100%;
		height: 100%;
	}
	/*banner*/

	.tui-banner-box {
		height: 450rpx;
		width: 100%;
		box-sizing: border-box;
	}

	.tui-banner-swiper {
		display: block;
		height: 450rpx;
		width: 100%;		
		text-align: center;
	}

	.tui-banner-item {
		padding: 0 16rpx;
		box-sizing: border-box;
	}

	.tui-slide-image {
		width: 100%;
		height: 240rpx;
		display: block;
		border-radius: 12rpx;
		/* transition: all 0.1s linear; */
	}

	.tui-banner-scale {
		transform: scaleY(0.9);
		transform-origin: center center;
	}

	/* #ifdef MP-WEIXIN */
	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-banner-swiper .wx-swiper-dot-active::before {
		background: #fff;
	}

	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	::v-deep .tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	::v-deep .tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 16rpx;
		overflow: hidden;
	}

	::v-deep .tui-banner-swiper .uni-swiper-dot-active::before {
		background: #fff;
	}

	::v-deep .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 16rpx;
	}

	/* #endif */
	/*banner*/

	/*headlines*/

	.tui-rolling-news {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		background: #fff;
	}

	.tui-rolling-news::after {
		left: 0;
	}

	.tui-swiper {
		margin-left: 8rpx;
		font-size: 28rpx;
		height: 80rpx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-news-item {
		line-height: 28rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #555;
	}

	/*headlines*/

	/*classify*/

	.tui-classify-box {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 0;
		background-color: #fff;
	}

	.tui-classify-item {
		width: 20%;
		text-align: center;
	}

	.tui-classify-img {
		width: 88rpx;
		height: 88rpx;
		background-color: #ccc;
		border-radius: 50%;
	}

	.tui-classify-name {
		font-size: 26rpx;
		line-height: 26rpx;
		padding-top: 8rpx;
		color: #555;
		white-space: nowrap;
	}

	/*classify*/

	/*spike*/

	.tui-spike-box {
		background: #fff;
		margin-top: 20rpx;
	}

	.tui-spike-title {
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
	}

	.tui-spike-title::after {
		left: 0;
	}

	.tui-spike-swiper {
		min-height: 440rpx;
	}

	.tui-pro-item {
		display: flex;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		position: relative;
	}

	.tui-pro-item::after {
		left: 240rpx;
	}

	.tui-pro-img {
		width: 220rpx;
		height: 220rpx;
		display: block;
		flex-shrink: 0;
		border-radius: 12rpx;
	}

	.tui-pro-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-btmbox {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-countdown {
		display: flex;
		align-items: center;
	}

	.tui-countdown-text {
		padding: 0 8rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #555;
	}
	/*spike*/
</style>