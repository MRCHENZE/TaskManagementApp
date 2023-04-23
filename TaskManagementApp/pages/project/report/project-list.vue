<!-- 项目审批 -->
<template>
	<view style="margin-bottom: 100rpx">
		<mescroll-uni :down="downOption" @emptyclick="downCallback" @down="downCallback" :up="upOption" @up="upCallback"
		 :fixed="false">
			<view class="mycard">
				<view v-for="item in cardList" :key="item.id" class="card-item">
					<uni-card is-full  is-shadow @tapHeader="clickCard(item)">
						<view class="audit-card-content">
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">填报单号</view>
								<view class="flex-item-80">{{item.billcode}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">考核任务</view>
								<view class="flex-item-80">{{item.taskinfo}}</view>
							</view>
						</view>
					</uni-card>
				</view>
			</view>
		</mescroll-uni>
		<audit-idea ref="popupAuditIdeaRef" :isPass="isPass" :isPaddingBottom="true" @updateQuery="updateQuery"></audit-idea>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import uniCard from "@/components/uni-card/uni-card"
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import auditIdea from '@/pages/index/audit-idea.vue'
	import { mapGetters } from 'vuex'
	import {
		filePreview,
		formatAuditStatus,
		formatProjectType
	} from '@/utils/index.js'
	export default {
		components: {
			MescrollUni,
			uniCard,
			uniTag,
			uniIcons,
			auditIdea
		},
		computed: mapGetters(['user']),
		data() {
			return {
				mescroll: null,
				isPass: false,
				selectedProject: {},
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					toTop: {
						src: '/static/img/backtop.png'
					},
					textNoMore: '没有更多数据了'
				},
				// 列表数据
				cardList: []
			}
		},
		methods: {
			filePreview,
			formatAuditStatus,
			formatProjectType,
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				// 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
				this.mescroll = mescroll
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				if (!this.user) {
					mescroll.endErr()
					return
				}

/* 				let data = [
					{
						id:'1',
						year:'2022年',
						month:'10月',
						billcode:'HB20221215002',
						projectType:'任务汇报单',
						xiangmu:'人力资源部',
						taskinfo:'完善所有人员的离职手续',
						tasktype:'材料员',
						manager:'杨星',
						checkman:'亢鹏利',
						taskno:'1',
						score:30,
						scored:15,
						actualscore:0,
						attachment:[{
							name:'测试',
							url:'ceshi'
						}]
					},
					{
						id:'2',
						year:'2022年',
						month:'10月',
						billcode:'TB20221215002',
						projectType:'任务填报单',
						xiangmu:'宜川县职业教育中心新校区建设项目',
						taskinfo:'督促12345学习',
						tasktype:'材料员',
						manager:'杨星',
						checkman:'亢鹏利',
						taskno:'1',
						score:10,
						scored:0,
						actualscore:0,
						attachment:[{
							name:'测试',
							url:'ceshi',
							
						}]
					},
					{
						id:'3',
						year:'2022年',
						month:'10月',
						billcode:'TB20221215002',
						projectType:'任务填报单',
						xiangmu:'宜川县职业教育中心新校区建设项目',
						taskinfo:'监督项目管理人员12345学习',
						tasktype:'材料员',
						manager:'杨星',
						checkman:'亢鹏利',
						taskno:'1',
						score:20,
						scored:0,
						actualscore:0,
						attachment:[{
							name:'测试',
							url:'ceshi'
						}]
					},
					{
						id:'4',
						year:'2022年',
						month:'10月',
						billcode:'TB20221215002',
						projectType:'任务填报单',
						xiangmu:'宜川县职业教育中心新校区建设项目',
						taskinfo:'监督项目管理人员12345学习',
						tasktype:'材料员',
						manager:'杨星',
						checkman:'亢鹏利',
						taskno:'1',
						score:20,
						scored:0,
						actualscore:0,
						attachment:[{
							name:'测试',
							url:'ceshi'
						}]
					},
					{
						id:'5',
						year:'2022年',
						month:'10月',
						billcode:'TB20221215002',
						projectType:'任务填报单',
						xiangmu:'宜川县职业教育中心新校区建设项目',
						taskinfo:'监督项目管理人员12345学习',
						tasktype:'材料员',
						manager:'杨星',
						checkman:'亢鹏利',
						taskno:'1',
						score:20,
						scored:0,
						actualscore:0,
						attachment:[{
							name:'测试',
							url:'ceshi'
						}]
					}
				]
				// 接口返回的当前页数据列表 (数组)
				let curPageData = data
				// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
				let totalPage = data.length
				// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
				let totalSize = data.length
				// 接口返回的是否有下一页 (true/false)
				// let hasNext = res.hasNextPage

				if (mescroll.num == 1) this.cardList = [] //如果是第一页需手动置空列表
				this.cardList = this.cardList.concat(curPageData) //追加新数据

				// 成功隐藏下拉加载状态
				// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
				mescroll.endByPage(curPageData.length, totalPage)
				this.$nextTick(() => {
					mescroll.endSuccess(curPageData.length)
				}) */
				
				// 此时mescroll会携带page的参数:
				let pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				let params ={
					id:this.user.id
				}
				this.$minApi.getUnfinishedTaskInfo(params, pageNum, pageSize).then(res => {
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.result.data
					// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
					let totalPage = res.result.data.length
					// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
					let totalSize = res.result.data.length
					// 接口返回的是否有下一页 (true/false)
					// let hasNext = res.hasNextPage
				
					if (mescroll.num == 1) this.cardList = [] //如果是第一页需手动置空列表
					this.cardList = this.cardList.concat(curPageData) //追加新数据
				
					// 成功隐藏下拉加载状态
					// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
					mescroll.endByPage(curPageData.length, totalPage)
					this.$nextTick(() => {
						mescroll.endSuccess(curPageData.length)
						})
					}).catch(() => {
						// 失败隐藏下拉加载状态
						mescroll.endErr()
					})
				
			},
			clickCard(item) {
				uni.navigateTo({
					url: '/pages/project/report/project-detail?data=' + JSON.stringify(item)
				})
			},
			adjustClick(item) {
				uni.navigateTo({
					url: '/pages/index/project/adjust-project?data=' + JSON.stringify(item)
				})
			},
			passClick(item) {
				this.selectedProject = item
				this.isPass = true
				this.$refs.popupAuditIdeaRef.$refs.share.open()
			},
			unPassClick(item) {
				this.selectedProject = item
				this.isPass = false
				this.$refs.popupAuditIdeaRef.$refs.share.open()
			},
			async queryByName(name) {
				uni.showLoading({
					title: '正在查询数据...'
				})
				//const res = await this.$minApi.listAuditProject()
				//if (res.ok()) {
				//	this.cardList = res.data
				//}
				uni.hideLoading()
			},
			updateQuery() {
				// 无效
				// if (this.mescroll !== null) {
				// 	this.downCallback(this.mescroll)
				// }
				this.queryByName()
			}
		}
	}
</script>

<style>
	.mescroll-totop {
		opacity: 1 !important;
	}
</style>
