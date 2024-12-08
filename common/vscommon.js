const vscommon = {
	/**
	* @param {Object} filePath
	* @param {Object} count 1~9
	* @param {Object} limit 0~2024,单位k
	 */
	showToast: function(message){
		uni.showToast({
			title: message
		})
	},
	/**
	 * 跳转到登录页面
	 */
	toLogin(){
		uni.navigateTo({
			url: "/pages/ct/login/login"
		});
	},
	/**
	 * 返回上级并刷新
	 * @param {Object} data
	 */
	rebackAndRefresh(data){
		let pages = getCurrentPages() // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
		let prevPage = pages[pages.length - 2] //上一页页面实例
		uni.navigateBack({
		  delta:1,
		  success:() => {
			prevPage.$vm.rebackToRefresh(data) // 给上一页绑定方法
		  }
		})
	},
	uploadImg(count,path,fn){
		//前端代码
		uni.chooseImage({
		  count: count,
		  success(res) {
		    console.log(res);
		    if (res.tempFilePaths.length > 0) {
		      let filePath = res.tempFilePaths[0]
		      //进行上传操作
		
		      // promise方式
		      // const result = await uniCloud.uploadFile({
		      //   filePath: filePath,
		      //   cloudPath: 'a.jpg',
		      //   onUploadProgress: function(progressEvent) {
		      //     console.log(progressEvent);
		      //     var percentCompleted = Math.round(
		      //       (progressEvent.loaded * 100) / progressEvent.total
		      //     );
		      //   }
		      // });
		
		      // callback方式，与promise方式二选一即可
		      uniCloud.uploadFile({
		        filePath: filePath,
		        cloudPath: path + '/11a.jpg',
		        onUploadProgress: function(progressEvent) {
		          console.log(progressEvent);
		          var percentCompleted = Math.round(
		            (progressEvent.loaded * 100) / progressEvent.total
		          );
		        },
		        success(res) {
					fn(res)
				},
		        fail() {},
		        complete() {}
		      });
		
		    }
		  }
		});
	}
}
export default vscommon