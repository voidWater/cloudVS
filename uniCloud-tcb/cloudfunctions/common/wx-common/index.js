const appData = require('app-data')
async function wxLogin(code){//获取open_id
   const res = await uniCloud.httpclient.request(
		`https://api.weixin.qq.com/sns/jscode2session?appid=${appData.appId}&secret=${appData.appSecret}&js_code=${code}&grant_type=authorization_code`, {
			dataType: "json"
		}
	)
	let openid = res.data.openid;
	return {
		status:'0',
		openid:openid 	
	};
}
module.exports ={
	wxLogin
}
