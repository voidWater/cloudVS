const { resolve } = require("path");
const appData = require('app-data')
const wxCommon = require('wx-common');
const userDB= uniCloud.database().collection("uni-id-users")
const goodsDB= uniCloud.database().collection("opendb-mall-goods")
const skuDB= uniCloud.database().collection("opendb-mall-sku")
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
	 * method1方法描述
	 * @param {string} param1 参数1描述
	 * @returns {object} 返回值描述
	 */
	/* 
	method1(param1) {
		// 参数校验，如无参数则不需要
		if (!param1) {
			return {
				errCode: 'PARAM_IS_NULL',
				errMsg: '参数不能为空'
			}
		}
		// 业务逻辑
		
		// 返回结果
		return {
			param1 //请根据实际需要返回值
		}
	}
	*/
}
