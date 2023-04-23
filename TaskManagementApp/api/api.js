import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = globalConfig.baseUrl
	return config
})

export default {
	// 这里统一管理api请求
	apis: {
		login(params) {

			if (params){
				return minRequest.post('/taskmanagement/getaccount',params)
			}
			else {
				const param = {
					name: 'none',
					passwd:'1'
				}
				return  minRequest.post('/taskmanagement/getaccount',param)
			}
		},
		//获取当月任务情况
		getCurrentMonthTasks(){
			return minRequest.post('/taskmanagement/getcurrentmonthinfo',{})
		},
		getLastYearTasks(){
			return minRequest.post('/taskmanagement/getlastyeartaskinfo',{})
		},
		getUnfinishedTaskInfo(params){
			return minRequest.post('/taskmanagement/getunfinishedtaskinfo',params)
		},
		userPwdModify(params) {
			return minRequest.post('/post/user/pwd/modify', params)
		},
		// 项目审批列表
		listAuditProject() {
			//return [{'':''},{'':''}]
			return minRequest.get('/get/audit/project/list')
		},
		// 用户审批列表
		listAuditUser() {
			//return [{'':''},{'':''}]
			return minRequest.get('/get/audit/user/list')
		}
	}
}
