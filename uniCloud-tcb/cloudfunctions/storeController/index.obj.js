const { resolve } = require("path");
const appData = require('app-data')
const wxCommon = require('wx-common');
const userDB= uniCloud.database().collection("uni-id-users")
const storeDB= uniCloud.database().collection("vs-store")
module.exports = {
	_before: function () { // 通用预处理器

	},
	/**
	 * 新增
	 * @param {Object} data
	 */
	async add(data){
		let res = await storeDB.add(data)
		if(res.inserted == 1){
			return true
		}else{
			return false
		}
	},
	/**
	 * 修改
	 * @param {Object} data
	 */
	async updata(data) {
		return await storeDB.doc(data._id).set(data)
	},
	/**
	 * 设置店长
	 * @param {Object} userId
	 */
	async setUser(userId){
		return await storeDB.doc(data._id).set({
			'manager_uid':userId
		})
	},
	/**
	 * 停用店铺
	 * @param {Object} id
	 */
	async stop(id) {
		return await storeDB.doc(id).set({
			status: 1
		})
	},
	/**
	 * 启用店铺
	 * @param {Object} id
	 */
	async enable(id) {
		return await storeDB.doc(id).set({
			status: 0
		})
	},
	/**
	 * 查询列表
	 * @param {Object} where
	 */
	async list(where){
		return await storeDB.where(where).get()
	},
}