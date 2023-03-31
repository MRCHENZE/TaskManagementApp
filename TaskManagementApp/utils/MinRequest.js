const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')
const requestBefore = Symbol('requestBefore')
const requestAfter = Symbol('requestAfter')
import { checkLogin, checkResult } from '@/utils/checkResponse'

class MinRequest {
	[config] = {
		baseURL: '',
		header: {
			'content-type': 'application/json'
		},
		method: 'GET',
		dataType: 'json',
		responseType: 'text'
	}

	interceptors = {
		request: (func) => {
			if (func) {
				MinRequest[requestBefore] = func
			} else {
				MinRequest[requestBefore] = (request) => request
			}

		},
		response: (func) => {
			if (func) {
				MinRequest[requestAfter] = func
			} else {
				MinRequest[requestAfter] = (response) => response
			}
		}
	}

	static[requestBefore](config) {
		return config
	}

	static[requestAfter](response) {
		return response
	}

	static[isCompleteURL](url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	setConfig(func) {
		this[config] = func(this[config])
	}

	request(options = {}) {
		//options.baseURL = options.baseURL || this[config].baseURL 
		var BASE_URL = "http://1.15.241.188:8069";    //不是h5默认这个地址
		// #ifdef H5
		BASE_URL = '/taskmanagement';    //H5下将地址修改为/dpc
		// #endif
		options.baseURL = BASE_URL
		options.dataType = options.dataType || this[config].dataType
		options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url)
		options.data = options.data
		options.header = { ...options.header,
			...this[config].header
		}
		options.method = options.method || this[config].method

		options = { ...options,
			...MinRequest[requestBefore](options)
		}

		return new Promise((resolve, reject) => {
			options.success = function(res) {
				resolve(MinRequest[requestAfter](res))
			}
			options.fail = function(err) {
				reject(MinRequest[requestAfter](err))
			}
			uni.request(options)
		})
	}

	get(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options).then(checkLogin).then(checkResult)
	}

	post(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options).then(checkLogin).then(checkResult)
	}
	
	delete(url, data, options = {}) {
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options).then(checkLogin).then(checkResult)
	}
}

MinRequest.install = function(Vue) {
	Vue.mixin({
		beforeCreate: function() {
			if (this.$options.minApi) {
				Vue._minApi = this.$options.minApi
			}
		}
	})
	Object.defineProperty(Vue.prototype, '$minApi', {
		get: function() {
			return Vue._minApi.apis
		}
	})
}

export default MinRequest
