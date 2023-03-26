<template>
	<view>
		<view v-if="list.length > 0">
			<view class="box" v-for="(item, index) in list" :key="index">
				<view class="tilte">{{item.name}}</view>
				<view class="cardList">
					<view class="card" v-for="(obj, iii) in item.arr" :key="iii">
						<image v-if="obj.img" :src="obj.img" mode="aspectFill"></image>
						<u-icon v-else :name="obj.icon" color="#007aff" size="68" class="iconClass"></u-icon>
						<view>{{obj.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
			}
		},
		onShow() {
			this.setMenuList();
		},
		methods: {
			setMenuList: function() {
				let list = [];
				list = [{
						name: '客户管理',
						arr: [{
								name: '线索池',
								img: '../../static/crm/threadChi.png',
								url: './thread/threadc',
								menu_id: 'threadC'
							},
							{
								name: '线索',
								img: '../../static/crm/thread.png',
								url: './thread/thread',
								menu_id: 'thread'
							},
							{
								name: '客户池',
								img: '../../static/crm/gonghaichi.png',
								url: './kehu/kehuGh',
								menu_id: 'clientGh'
							},
							{
								name: '客户',
								img: '../../static/crm/kehu1.png',
								url: './kehu/kehu',
								menu_id: 'client'
							},
							{
								name: '联系人',
								img: '../../static/crm/lianxiren.png',
								url: './lianxiren/lianxiren',
								menu_id: 'linkman'
							},
							{
								name: '企微客户',
								img: '../../static/crm/qywxLogo.png',
								url: '../../qywxPage/view/qywxClient/qywxClient',
								menu_id: 'qywxClient'
							},
							{
								name: '跟进记录',
								img: '../../static/crm/genjin.png',
								url: './genJin/genJin',
								menu_id: 'followUp'
							},
							{
								name: '企微跟进',
								img: '../../static/crm/genjin.png',
								url: './genJin/genJin?isQywx=true',
								menu_id: 'followUpQywx'
							},
						]
					},
					{
						name: '销售管理',
						arr: [{
								name: '商机',
								img: '../../static/crm/shangji.png',
								url: './shangji/shangji',
								menu_id: 'business'
							},
							{
								name: '企微商机',
								img: '../../static/crm/shangji.png',
								url: './shangji/shangji?isQywx=true',
								menu_id: 'businessQywx'
							},
							{
								name: '报价单',
								img: '../../static/crm/baojiadan.png',
								url: './baoJiaDan/baoJiaDan',
								menu_id: 'quotation'
							},
							{
								name: '企微报价单',
								img: '../../static/crm/baojiadan.png',
								url: './baoJiaDan/baoJiaDan?isQywx=true',
								menu_id: 'quotationQywx'
							},
							{
								name: '合同',
								img: '../../static/crm/hetong.png',
								url: './hetong/hetong',
								menu_id: 'contract'
							},
							{
								name: '企微合同',
								img: '../../static/crm/hetong.png',
								url: './hetong/hetong?isQywx=true',
								menu_id: 'contractQywx'
							},
						]
					},
					{
						name: '财务管理',
						arr: [{
								name: '回款计划',
								img: '../../static/crm/hkjh.png',
								url: './huikuanJH/huikuanJH',
								menu_id: 'hkjh'
							},
							{
								name: '企微计划',
								img: '../../static/crm/hkjh.png',
								url: './huikuanJH/huikuanJH?isQywx=true',
								menu_id: 'hkjhQywx'
							},
							{
								name: '实际回款',
								img: '../../static/crm/huikuan.png',
								url: './huikuan/huikuan',
								menu_id: 'sjhk'
							},
							{
								name: '企微回款单',
								img: '../../static/crm/huikuan.png',
								url: './huikuan/huikuan?isQywx=true',
								menu_id: 'sjhkQywx'
							},
						]
					},
					{
						name: '产品管理',
						arr: [{
								name: '商城预览',
								img: '../../static/crm/shopIcon.png',
								url: '../../chanpin/view/shop'
							},
							{
								name: '产品管理',
								img: '../../static/crm/chanpin.png',
								url: '../../chanpin/view/chanpin',
								menu_id: 'pList'
							},
							{
								name: '产品分类',
								img: '../../static/crm/cpfl.png',
								url: '../../chanpin/view/classify',
								menu_id: 'pClassify'
							}
						]
					},
				]
				let arr = [];
				let mArr = uni.$menuList || [];
				if (!mArr || mArr.length == 0) {
					mArr = uni.getStorageSync('menuList') || [];
				}
				let rArr = uni.$userRoles || [];
				if (!rArr || rArr.length == 0) {
					rArr = uni.getStorageSync('userRoles') || [];
				}
				let mList = [];
				let m_idList = [];
				for (var j = 0; j < rArr.length; j++) {
					for (var i = 0; i < mArr.length; i++) {
						var pArr = mArr[i].permission || [];
						if (pArr.indexOf(rArr[j]) != -1) {
							if (m_idList.indexOf(mArr[i]._id) == -1) {
								m_idList.push(mArr[i]._id);
								mList.push(mArr[i]);
							}
						}
					}
				}
				for (var i = 0; i < list.length; i++) {
					var obj = list[i];
					var cArr = obj.arr;
					var sArr = [];
					for (var c = 0; c < cArr.length; c++) {
						for (var j = 0; j < mList.length; j++) {
							if (cArr[c].menu_id == mList[j].menu_id) {
								sArr.push(cArr[c])
								break
							}
						}
					}
					if (sArr.length > 0) {
						arr.push({
							name: obj.name,
							arr: sArr
						})
					}
				}
				this.list = arr;
			}
		}
	}
</script>

<style>
	page {
		padding-bottom: 100rpx;
	}

	.box {
		box-sizing: border-box;
		border-radius: 16rpx;
		width: 686rpx;
		margin: 32rpx;
		padding: 26rpx;
		box-shadow: #dddddd 0px 0px 32rpx;
	}

	.tilte {
		font-size: 32rpx;
		font-weight: bold;
	}

	.cardList {
		margin-top: 26rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.card {
		font-size: 28rpx;
		width: 159rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 32rpx;
	}

	.card>image {
		width: 68rpx;
		height: 68rpx;
		margin-bottom: 6rpx;
	}

	.iconClass {
		margin-bottom: 6rpx;
	}
</style>