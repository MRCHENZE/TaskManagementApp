<!-- 项目明细 -->
<template>
	<view :class="darkMode?'custom-dark':'custom-light'">
		<view>
			<view class="cu-bar detail-item solid-bottom">
				<view class="action">
					<text class="cuIcon-home text-blue"></text>填报单信息
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">填报单号</view>
					<view class="flex-item-70">{{item.billcode}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">年份</view>
					<view class="flex-item-70">{{item.year}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">月份</view>
					<view class="flex-item-70">{{item.month}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">项目</view>
					<view class="flex-item-70">{{item.xiangmu}}</view>
				</view>
			</view>
			<view class="cu-bar detail-item solid-bottom">
				<view class="action">
					<text class="cuIcon-card text-blue"></text>任务信息
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">任务编号</view>
					<view class="flex-item-70">{{item.taskno}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">考核任务</view>
					<view class="flex-item-70">{{item.taskinfo}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">考核类别</view>
					<view class="flex-item-70">{{item.tasktype}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">任务下发人</view>
					<view class="flex-item-70">{{item.manager}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">考核人</view>
					<view class="flex-item-70">{{item.checkman}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30"> 附件</view>
					<view class="flex-item-70">{{item.aFoundSource}}</view>
				</view>
			</view>
			<view class="goods-carts">
				<uni-goods-nav :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" />
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import {
		filePreview,
		formatAuditStatus
	} from '@/utils/index.js'
	export default {
		components: {
			uniTag,
			uniIcons
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode']),
		},
		data() {
			return {
				isPass: false,
				item: {},
				options: [{
					icon: '/static/img/upload.png',
					text: '上传附件'
				}],
				buttonGroup: [{
						text: '取消',
						backgroundColor: '#e54d42',
						color: '#fff'
					},
					{
						text: '确认汇报',
						backgroundColor: '#39b54a',
						color: '#fff'
					}
				]
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('ProjectDetail')
			})
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
		onLoad(options) {
			try {
				this.item = JSON.parse(options.data)
			} catch (e) {
				this.item = []
			}
		},
		methods: {
			filePreview,
			formatAuditStatus,
			updateQuery() {
				// 更新数据
				let pages = getCurrentPages()
				// let currPage = pages[pages.length - 1]; //当前页面
				let prevPage = pages[pages.length - 2] //上一个页面
				prevPage.isDoRefresh = true
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
		}
	}
</script>
