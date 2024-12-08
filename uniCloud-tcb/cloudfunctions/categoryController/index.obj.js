const { resolve } = require("path");
const appData = require('app-data')
const wxCommon = require('wx-common')
const categoriesDB= uniCloud.database().collection("opendb-mall-categories")
const obj = {
	_before: function () { // 通用预处理器
	},
	async add(data){
		let res = await categoriesDB.add(data)
		if(res.inserted == 1){
			return true
		}else{
			return false
		}
	},
	async get(id){
		return await categoriesDB.doc(id).get()
	},
	async check(){
		
	},
	async list(where){
		return await categoriesDB.where(where).get()
	},
	async delete(id){
		
	},
	async updata(data){
		return await categoriesDB.doc(data._id).set(data)
	}
}
module.exports = obj
