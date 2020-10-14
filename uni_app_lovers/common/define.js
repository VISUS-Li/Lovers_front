var respStatus = {};
//通用
respStatus.SUCCESS		 = 1000;
respStatus.UNKNOW 		 = 50000;
respStatus.INVALID_PARAMS = 400;
respStatus.CODE_ERR_PARAM_EMPTY = 1005;

//注册
respStatus.CODE_ERR_REG_PHONE_EXIST = 1018; //注册手机号已存在
respStatus.CODE_ERR_REG_PHONE_ERR	= 1010; //注册手机号格式错误

export{
	respStatus
}
