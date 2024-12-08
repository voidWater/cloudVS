const fileUpload = {
	/**
	* @param {Object} filePath
	* @param {Object} count 1~9
	* @param {Object} limit 0~2024,单位k
	 */
	uploadFile:async function(filePath,count,limit){
		if(!count){
			count = 1
		}
		if(count > 9||count < 1){
			count = 1
		}
		if(!limit){
			limit = 2024
		}
		return new Promise((resolve, reject)=>{
			uni.chooseImage({
			  count: count,
			  success(res) {
			    if (res.tempFilePaths.length > 0) {
					for(let i = 0;i<res.tempFiles.length ;i++){
						let file = res.tempFiles[i]
						if(file.size > limit*1000){
							uni.showToast({
								title: '图片大小超过限制，最大'+limit+'k',
								//显示持续时间为 2秒
								duration: 2000
							})
							return
						}
					}
					var resultImg = []
					var queue =[]
					for(let i = 0;i<res.tempFiles.length ;i++){
						let file = res.tempFiles[i]
						const upload =  uniCloud.uploadFile({
						  filePath: file.path,
						  cloudPath: filePath+"/"+new Date().getMilliseconds()+'.jpg',
						  onUploadProgress: function(progressEvent) {
						    var percentCompleted = Math.round(
						      (progressEvent.loaded * 100) / progressEvent.total
						    );
						  }
						});
						queue.push(upload)
					}
					Promise.all(queue).then(res=>{
						var list = [];
						for(let r of res){
							list.push(r.fileID)
						}
						uniCloud.getTempFileURL({
								fileList: list
						}).then(res => {
							var list = []
							for(let r of res.fileList){
								list.push(r.download_url)
							}
							resolve(list)
						});
						
					})
			    }
			  }
			});
		})
	}
}
export default fileUpload