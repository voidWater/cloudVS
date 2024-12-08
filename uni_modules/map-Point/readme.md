###使用

```
1.<template>

<map-Point @commitCheck="commitCheck" :mapKey='mapKey' :showResetting='showResetting' :listIco='listIco' :orientationIco='orientationIco' :resettingIco='resettingIco'></map-Point>

2.<script>

export default {
	data() {
		return {
			mapKey:'737965f92c797efb5447a4d658328513',
			address: '',
			latitude: '',
			longitude: '',
			listIco:'https://mp-6a7d27e4-49d1-42f7-b4bc-37bc5964c0a8.cdn.bspapp.com/item-inx.png',
			orientationIco:'https://mp-6a7d27e4-49d1-42f7-b4bc-37bc5964c0a8.cdn.bspapp.com/map-inx.png',
			resettingIco:"https://mp-6a7d27e4-49d1-42f7-b4bc-37bc5964c0a8.cdn.bspapp.com/position.png",
			showResetting:true
		};
	},
	methods: {
		commitCheck(e) {
			console.log(e, 565);
			uni.$emit('commitCheck', e);
			uni.navigateBack({
				delta: 1
			});
		}
	}
};

```
### 属性说明

| 属性名           | 类型     | 默认值   | 说明              |
|-----------------|----------|----------|-----------------------|
| mapKey       	  | String   | " "      | 高德Web服务Key必须传             |
| resettingIco    | String   | base64   | 定位复位图标--图标必传--app不支持base64           |
| orientationIco  | String   | base64   | 定位图标--图标必传--app不支持base64               |
| listIco         | String   | base64   | 列表图标--图标必传--app不支持base64   |
| showResetting   | Boolean  | true     | 复位定位功能显示      |

注意：
1. mapKey的高德Web服务Key是我的个人注册测试使用的，使用次数有限，大家换成自己的

###事件说明

| 事件名        | 说明                  | 返回值 |
|---------------|----------------------|--------|
| @commitCheck  | 选中地址的确认地址回调 | data，详情见下方说明 |

#### @commitCheck 返回值 data 说明 

| 值      | 类型    | 说明  |
| ------- | ------ | ----- |
| id      | String | 地址id |
| name    | String | 地点名称|
| address | String | 地点详细地址|
| province| String | 省   |
| city    | String | 市 |
| district| String | 区 |
| location| String | 经纬度坐标 |

###注意：微信小程序使用
```
1.运行微信小程序使用--在【manifest.json】配置自己的微信小程序appid

2.在manifest.json中声明定位
			 /* 小程序特有相关 */
		"mp-weixin" : {
			"appid" : "",
			"setting" : {
				"urlCheck" : false,
				"es6" : true,
				"postcss" : true,
				"minified" : true
			},
			"usingComponents" : true,
			"permission" : {
				"scope.userLocation" : {
					"desc" : "定位"
				}
			},
			"requiredPrivateInfos" : [
				"getLocation", //使用uni.getlocation才需声明
				"startLocationUpdate", //必要
				"onLocationChange" //必要
			]
		},


```


###注意：h5使用

- 1.h5使用
		必须去高德申请Web端的ksy和密钥
- 2.然后再【manifest.json】配置定位地图
		1.选择高德
		2.把申请的web的key配置在key那里
		3.把申请的web的秘钥配置在securityJsCode那里
		4.运行
- 3.注意：去[高德开发申请网站](https://console.amap.com/dev/key/app)区申请
		可以使用我的测试key配置体验--注意是测试有次数限制，尽量用自己的
		key：'6fd9d6c8b1015a6d9f9454d5df596a0f'
		code:'dc3a5f4976a6b06d3cf3ab280f672a17'


###有不懂可以
```
有任何疑问可以  加qq1848961270  备注插件名称
```
