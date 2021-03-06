var Vue=require('vue')
var errorMessage=require('lm-sr-error-message')
var calcUriParams=require('lm-ut-calc-uri-params')

module.exports=function(success,fail){
	Vue.http.get('/rest/json.jhtml',{
			params:{
				req:JSON.stringify({
					methodName:'QueryJssdkConfig',
					urlInfo:location.href.split('#')[0],
					wechatOpenId:calcUriParams.getUriQuery().state})
			}
		}).then(function(response){
		var data=JSON.parse(response.data)
		if(data.resultCode==100){
			success && success(data)
		}else{
			fail && fail(errorMessage[data.resultCode])
		}
	},function(response){
		fail && fail('网络错误')
	})
}

