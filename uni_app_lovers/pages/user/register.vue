<template>
	<view class="my-width-600rpx my-position-absolute my-position-bottom-200rpx my-position-left-70rpx my-color-gray-5">
		<view class="cu-form-group moyi-bg-b round ">
			<view class="title">手机:
			</view>
			<input class="text-right" placeholder="请输入手机号" v-model="param.Phone"></input>
		</view>
		<view class="cu-form-group moyi-bg-b round margin-top-xl">
			<view class="title">密码:</view>
			<input class="text-right" placeholder="请输入密码" v-model="param.PassWord"></input>
		</view>
		<view class="cu-form-group moyi-bg-b round margin-top-xl">
			<view class="title">确认密码:</view>
			<input class="text-right" placeholder="请确认密码" v-model="param.verifyPassword"></input>
		</view>
		<view class="cu-form-group moyi-bg-b round margin-top-xl" @tap="upPicker">
			<view class="title">性别:</view>
			<view class="text-right">{{selectedGender}}</view>
		</view>
		<u-picker :mode="selectMode" :safe-area-inset-bottom="true" v-model="selectShow" @confirm="selectConfirm" :range="selectRange"></u-picker>
		<view class="cu-form-group moyi-bg-c moyi-te-c round margin-top-xl" @tap="register">
			<view style="width: 100%" class="text-center">
				注册/登陆
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//性别选择器
				selectShow: false,
				selectMode: 'selector',
				selectRange: ['男', '女'],
				selectedGender: "",

				verifyPassword: '123456',
				param: {
					Phone: '15002326237',
					PassWord: '123456',
					Sex: 1
				},
			}
		},

		methods: {
			upPicker() {
				this.selectShow = true;
			},
			selectConfirm(e) {
				this.param.Sex = e[0];
				this.selectedGender = this.selectRange[e[0]];
			},

			register: function() {
				let _this = this;
				if (_this.param.Phone == '' || !/^1\d{10}$/.test(_this.param.Phone)) {
					_this.$common.errorToShow('手机号不正确');
				} else {
					_this.loadModal = true;
					setTimeout(() => {
						_this.$api.pwdRegister(_this.param, res => {
							_this.registerRespHandler(res);
							// _this.$common.errorToShow(res.msg);
							// if (res.code) {
							// 	_this.$common.saveUserInfo(res.data);
							// 	_this.loginSuccess();
							// }
						}, () => {
							_this.loadModal = false;
						});
					}, 1000);
				}
			},
			registerRespHandler: function(resp) {
				let _this = this;
				let code = _this.$define.respStatus;
				switch (resp.code) {
					case code.CODE_ERR_PARAM_EMPTY:
						_this.$common.errorToShow('手机或密码为空');
						break;
					case code.CODE_ERR_REG_PHONE_ERR:
						_this.$common.errorToShow('手机号格式错误');
						break;
					case code.CODE_ERR_REG_PHONE_EXIST:
						_this.$common.errorToShow('手机号已注册,请登录');
						let param = {
							'Phone': _this.param.Phone
						};
						_this.$u.route({
							type: "navigateTo",
							params: param,
							url: 'pages/user/login',
							animationType: 'slide-in-bottom'
						});
						break;
					case code.CODE_ERR_SERVER_INTERNAL:
						_this.$common.errorToShow('注册失败，服务器内部错误');
						break;
					default:

						break;
				}
			}
		}
	}
</script>

<style>
</style>
