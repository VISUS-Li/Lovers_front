//取值
import {isEmpty} from './common.js'
function get(key,sync = true,defaults = false) {
    try {
		if(sync){
			let data = uni.getStorageSync(key);
			if(data.data && data.type == 'object'){
				return data.data
			}
			console.log(key,data)
			if(!isEmpty(data)){
				console.log('noNULL')
				return data;
			}else{
				console.log('yseNULL',defaults)

				return defaults;
			}
			
		}else{
			let data = '';
			uni.getStorage({
				key:key,
				success: function (res) {
					data = res.data;
				}
			});
			
			if(data){
				return data;
			}else{
				return defaults;
			}
		}
    } catch (e) {
        return defaults;
    }
}

//赋值
function set(key, value, sync = true) {
    try {
        if (sync) {
			let res = uni.setStorageSync(key, value);
			console.log("set storage res:"+res);
            return res;
        } else {
            uni.setStorage({
                key: key,
                data: value
            });
        }
    } catch (e) {

    }
}

//移除
function del(key, sync = true){
    try {
        if (sync) {
            return uni.removeStorageSync(key);
        } else {
            uni.removeStorage({
                key: key
            });
        }
    } catch (e) {
        return false;
    }
}

//清空
function clear(sync = true){
    try {
        if (sync) {
            return uni.clearStorageSync();
        } else {
            uni.clearStorage();
        }
    } catch (e) {
        return false;
    }
}

export {
    get,
    set,
    del,
    clear
}