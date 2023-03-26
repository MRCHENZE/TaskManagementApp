<template>
	<view :class="darkMode?'custom-dark':'custom-light'">
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
					<text class="analysis-num">{{abc}}</text>
				</view>
				<view class="padding">{{$t('UnFinishedTaskCountThisMonth')}}</view>
			</view>
		</view>
		<ucharts-demo></ucharts-demo>
		<!--<project-time-table></project-time-table>-->
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
	import ProjectTimeTable from '@/pages/analysis/time-table.vue'
	import UchartsDemo from '@/pages/analysis/ucharts-demo.vue'
	export default {
		components: {
			ProjectTimeTable,
			UchartsDemo
		},
		computed: {
			...mapGetters(['themeBgColor', 'darkMode']),
		},
		data() {
			return {
				projectNum: 100,
				userNum: 60,
				abc:40
			}
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
			}
		}
	}
</script>
