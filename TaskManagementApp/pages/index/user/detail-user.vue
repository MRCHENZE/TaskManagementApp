<!-- 项目审批明细 -->
<template>
	<view :class="darkMode?'custom-dark':'custom-light'">
		<view class="place-detail">
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">单据类型</view>
					<view class="flex-item-70">{{item.projectType}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">单据编号</view>
					<view class="flex-item-70">{{item.billcode}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">审核状态</view>
					<view class="flex-item-70">
						<uni-tag size="small" :text="formatAuditStatus(item.auditStatus).text" :type="formatAuditStatus(item.auditStatus).color"
						 :circle="true"></uni-tag>
					</view>
				</view>
			</view>		
			<view class="padding-lr padding-tb-xs detail-item" v-if="item.opinionList && item.opinionList.length > 0">
				<view class="uni-flex uni-row">
					<view class="uni-timeline">
						<!-- opIndex===0?'uni-timeline-first-item':(opIndex===(item.opinionList.length-1)?'uni-timeline-last-item':'') -->
						<view v-for="(opinion,opIndex) in item.opinionList" :key="opinion.id" class="uni-timeline-item" :class="opIndex===0?'uni-timeline-first-item':(opIndex===(item.opinionList.length-1)?'uni-timeline-last-item':'')">
							<view class="uni-timeline-item-keynode">{{opinion.createTime}}</view>
							<view class="uni-timeline-item-divider"></view>
							<view class="uni-timeline-item-content">
								<view>
									{{`${opinion.examiner}-${opinion.opinion}`}}
								</view>
								<view>
									<uni-tag :inverted="true" size="small" :text="formatAuditStatus(opinion.status).text" :type="formatAuditStatus(opinion.status).color"
									 :circle="false"></uni-tag>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">项目</view>
					<view class="flex-item-70">{{item.xiangmu}}</view>
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
					<view class="flex-item-30">被考核人</view>
					<view class="flex-item-70">{{item.checkedman}}</view>
				</view>
			</view>
			<view class="padding-lr padding-tb-xs detail-item">
				<view class="uni-flex uni-row">
					<view class="flex-item-30">考核任务</view>
					<view class="flex-item-70">{{item.taskinfo}}</view>
				</view>
			</view>
			<view>
				<uni-section title="审批流程" type="line" padding>
					<uni-steps :options="list2" active-color="#007AFF" :active="count"  direction="column" />
				</uni-section>
			</view>
		</view>

	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import auditIdea from '@/pages/index/audit-idea.vue'
	import UniSteps from '@/components/uni-steps/uni-steps.vue'
	import UniSection from '@/components/uni-section/uni-section.vue'
	import {
		filePreview,
		formatAuditStatus
	} from '@/utils/index.js'
	export default {
		components: {
			uniGoodsNav,
			uniTag,
			uniIcons,
			auditIdea,
			UniSteps,
			UniSection
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode']),
			count(){
				return this.list2.length-1
			}
		},
		data() {
			return {
				isPass: false,
				item: {},
				options: [{
					icon: '/static/img/edit.png',
					text: '打分'
				}],
				buttonGroup: [{
						text: '拒绝',
						backgroundColor: '#e54d42',
						color: '#fff'
					},
					{
						text: '通过',
						backgroundColor: '#39b54a',
						color: '#fff'
					}
				],
				active:1,
				list2: [{
					title: '张三',
					desc: '2023-03-01'
				}, {
					title: '李四',
					desc: '2023-03-02'
				}, {
					title: '杨星',
					desc: '2023-03-03'
				}]
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
			    title: this.$t('ProjectApproval')
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
			onClick(e) {
				// uni.showToast({
				// 	title: `点击${e.content.text}`,
				// 	icon: 'none'
				// })
				if (e.content.text === '打分') {
					uni.navigateTo({
						url: '/pages/index/project/adjust-project?data=' + JSON.stringify(this.item)
					})
				}
			},
			buttonClick(e) {
				if (e.index === 0) {
					this.isPass = false
					this.$refs.popupAuditIdeaRef.$refs.share.open()
				} else if (e.index === 1) {
					this.isPass = true
					this.$refs.popupAuditIdeaRef.$refs.share.open()
				}
			},
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

<style>
	.place-detail {
		/* margin: 27rpx 20rpx 104rpx 20rpx; */
		padding-bottom: 104rpx;
	}

	/* .place-detail .uni-row {
		margin: 5rpx 0;
	} */
</style>

<style lang="scss">
	.status-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 92rpx;
		margin: 30rpx;
		background-color: #007AFF;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		flex-direction: row;
	}
</style>
