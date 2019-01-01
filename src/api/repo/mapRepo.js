var request=require('request');

exports.getMapAPI = function(url) {
    return new Promise((resolve, reject) => {
        request({
        	url:url,
            json:true
        },(error,respone,body)=>{
            if(error){
            	reject(error);
            }else
            {
            	resolve(body);
            }
        })
    });
}