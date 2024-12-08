// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj

const { resolve } = require("path");
const appData = require('app-data')
const wxCommon = require('wx-common')
const userDB= uniCloud.database().collection("uni-id-users")
const obj = {
	_before: function () { // 通用预处理器
	},
	async test(){
		return "hello"
	},
	async userLogin(code){
		let r = await wxCommon.wxLogin(code).then(res=>{
			var openid = res.openid
		    return obj.checkUser(res.openid).then(res=>{
				if(res){//存在
					return obj.getUserInfo(openid);
				}else{//不存在
					return obj.createUser(openid);
				}
			})
		})
		return r
	},
	async checkUser(openId){
		let res = await userDB.where({open_id: {'mp':openId}}).get()
		if(res.data && res.data.length == 1){
			return true;	
		}
		return false;
    },
	async getUserInfo(openId){
		let res = await userDB.where({open_id: {'mp':openId}}).get()
		if(res.data && res.data.length == 1){
			return res.data[0];	
		}
		return null;
	},
	async createUser(openId){
		res = await userDB.add({username: '微信用户',open_id: {'mp':openId}});
		if(res.inserted == 1){
			return obj.getUserInfo(openId);
		}else{
			return null;	
		}
	},
	updateUser(){
		
	},
	setUser(){
		
	}
}
module.exports = obj
