<template>
	<view>
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe emptyText="暂无更多数据" @selection-change="selectionChange">
				<uni-tr>
					<uni-th width="150" align="center">日期</uni-th>
					<uni-th width="150" align="center">姓名</uni-th>
					<uni-th width="150" align="center">姓名</uni-th>
					<uni-th width="150" align="center">姓名</uni-th>
					<uni-th width="150" align="center">姓名</uni-th>
					<uni-th width="150" align="center">姓名</uni-th>
					<uni-th width="150" align="center">姓名</uni-th>
					<uni-th width="150" align="center">姓名</uni-th>
					<uni-th align="center">地址</uni-th>
					<uni-th width="204" align="center">设置</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td>{{ item.date }}</uni-td>
					<uni-td>
						<view class="name">{{ item.name }}</view>
					</uni-td>
					<uni-td align="center">{{ item.address }}</uni-td>
				</uni-tr>
			</uni-table>
			<view class="uni-pagination-box"><uni-pagination show-icon :page-size="pageSize" :current="pageCurrent" :total="total" @change="change" /></view>
		</view>
	</view>
</template>

<script>
import tableData from './tableData.js'
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
import uniCard from "@/components/uni-card/uni-card"
import uniTag from '@/components/uni-tag/uni-tag.vue'
import uniIcons from '@/components/uni-icons/uni-icons.vue'
import uniTable from '@/components/uni-table/uni-table.vue'
import uniTr from '@/components/uni-tr/uni-tr.vue'
import uniTd from '@/components/uni-td/uni-td.vue'
import uniTh from '@/components/uni-th/uni-th.vue'
import uniTbody from '@/components/uni-tbody/uni-tbody.vue'
import uniThead from '@/components/uni-thead/uni-thead.vue'
import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
import { mapGetters } from 'vuex'
export default {
	components: {
		MescrollUni,
		uniCard,
		uniTag,
		uniIcons,
		uniTable,
		uniTr,
		uniTd,
		uniTh,
		uniTbody,
		uniThead,
		uniPagination
	},
	computed: mapGetters(['user']),
	data() {
		return {
			searchVal: '',
			tableData: [],
			// 每页数据量
			pageSize: 10,
			// 当前页
			pageCurrent: 1,
			// 数据总量
			total: 0,
			loading: false
		}
	},
	onLoad() {
		this.selectedIndexs = []
		this.getData(1)
	},
	methods: {
		// 多选处理
		selectedItems() {
			return this.selectedIndexs.map(i => this.tableData[i])
		},
		// 多选
		selectionChange(e) {
			console.log(e.detail.index)
			this.selectedIndexs = e.detail.index
		},
		//批量删除
		delTable() {
			console.log(this.selectedItems())
		},
		// 分页触发
		change(e) {
			this.$refs.table.clearSelection()
			this.selectedIndexs.length = 0
			this.getData(e.current)
		},
		// 搜索
		search() {
			this.getData(1, this.searchVal)
		},
		// 获取数据
		getData(pageCurrent, value = '') {
			this.loading = true
			this.pageCurrent = pageCurrent
			this.request({
				pageSize: this.pageSize,
				pageCurrent: pageCurrent,
				value: value,
				success: res => {
					// console.log('data', res);
					this.tableData = res.data
					this.total = res.total
					this.loading = false
				}
			})
		},
		// 伪request请求
		request(options) {
			const { pageSize, pageCurrent, success, value } = options
			let total = tableData.length
			let data = tableData.filter((item, index) => {
				const idx = index - (pageCurrent - 1) * pageSize
				return idx < pageSize && idx >= 0
			})
			if (value) {
				data = []
				tableData.forEach(item => {
					if (item.name.indexOf(value) !== -1) {
						data.push(item)
					}
				})
				total = data.length
			}

			setTimeout(() => {
				typeof success === 'function' &&
					success({
						data: data,
						total: total
					})
			}, 500)
		}
	}
}
</script>

<style>
/* #ifndef H5 */
/* page {
	padding-top: 85px;
} */
/* #endif */
.uni-group {
	display: flex;
	align-items: center;
}
.uni-container {
    padding: 15px;
    background-color: #f8f8f8;
}
/* 分页容器 */
.uni-pagination-box {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}
</style>
