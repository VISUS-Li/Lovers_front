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

		<u-button class="cu-form-group moyi-bg-c moyi-te-c round margin-top-xl" @click="register" data-name="3333"
		 :customStyle="{'background-color':'#ffd250','box-shadow':'2rpx 7rpx 10rpx #aaaaaa'}" type="primary" shape="square"
		 :ripple="true" :hairLine="true">
			<text class="my-text-font-bolder">注册/登陆</text>
		</u-button>

		<my-pop-image :show="bPopupShow" :title="popupTitle" :content="popupCotent" @open="popupOpen" @close="popupClose"></my-pop-image>
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

				//弹出提示
				bPopupShow: false,
				popupTitle: '提示', //提示框的抬头
				popupCotent: '', //提示框的消息
				popupClosed: true, //提示框是否关闭
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

			popupOpen: function() {
				let _this = this;
				_this.bPopupShow = true;
			},
			popupClose: function() {
				let _this = this;
				_this.bPopupShow = false;

				let param = {
					'Phone': _this.param.Phone
				};
				setTimeout(()=>{
					_this.$u.route({
					type: "reLaunch",
					params: param,
					url: 'pages/user/login',
					animationType: 'slide-in-bottom'
				});},1000);
				
			},

			register: function() {
				let _this = this;
				if (_this.param.Phone == '' || !/^1\d{10}$/.test(_this.param.Phone)) {
					_this.$common.errorToShow('手机号不正确');
				} else {
					setTimeout(() => {
						_this.$api.pwdRegister(_this.param, res => {
							_this.registerRespHandler(res);
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
						_this.bPopupShow = true;
						_this.popupCotent = '手机号已注册，请登录';

						break;
					case code.CODE_ERR_SERVER_INTERNAL:
						_this.$common.errorToShow('注册失败，服务器内部错误');
						break;
					case code.SUCCESS:
						param = {
							'Phone': _this.param.Phone,
							'PassWord': _this.param.PassWord,
							'bNavToHome': true //登录成功后是否跳转到首页
						};
						_this.$common.autoLogin(param)
						break;
					default:
						_this.bPopupShow = true;
						_this.popupCotent = '手机号已注册，请登录';
						_this.$common.errorToShow(resp.msg)
						break;
				}
			}
		}
	}
</script>

<style>
</style>
