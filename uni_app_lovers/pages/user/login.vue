<template>
	<view class="my-width-600rpx my-position-absolute my-position-bottom-200rpx my-position-left-70rpx my-color-gray-5">
		<view class="cu-form-group moyi-bg-b round">
			<view class="title">手机号:
			</view>
			<input class="text-right" placeholder="请输入手机号" v-model="param.Phone"></input>
		</view>
		<view class="cu-form-group moyi-bg-b round margin-top-xl">
			<view class="title">密码:
			</view>
			<input class="text-right" type="password" placeholder="请输入密码" v-model="param.PassWord"></input>
		</view>

		<view class="cu-form-group moyi-bg-c moyi-te-c round margin-top-xl" @tap="login">
			<view style="width: 100%" class="text-center">
				登陆
			</view>
		</view>
		<view class="padding text-center margin-lr text-sm ">
			<view class="inline-shrink" @tap="Toggle(0)">
				登陆即代表同意<text class="text-yellow" @tap="navigateTo('/pages/cms/index?id=1&title=用户协议')">《用户协议》</text>以及<text @tap="navigateTo('/pages/cms/index?id=2&title=隐私政策')"
				 class="text-yellow">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				param: {
					Phone: '15002326237',
					PassWord: '123456',
				},
			}
		},
		onLoad:function(){
			
		},
		methods:{
		
			login:function(){
				let _this = this;
				// 判断是否加载中，避免重复点击请求
					if (_this.param.Phone == '' || _this.param.PassWord.length < 6) {
						_this.$common.errorToShow('账号或密码错误');
					} else if(!/^1\d{10}$/.test(_this.param.Phone)){
						_this.$common.errorToShow('手机号格式不正确');
					}
					else {
						// 显示等待
						_this.loadModal = true;
						setTimeout(() => {
							_this.$api.pwdLogin(_this.param, res => {
								_this.$common.errorToShow(res.msg);
								if (res.code) {
									_this.$common.saveUserInfo(res.data);
									this.loginSuccess();
								}
							}, () => {
								_this.loadModal = false;
							},_this.$config.reqTimeout);
						}, 1000);
					}
				},
				loginSuccess:function(){
					let _this = this;
					_this.$u.route({
						type: "navigateTo",
						params: "",
						url: 'pages/index/index',
						animationType: 'slide-in-bottom'
					});
					_this.$common.errorToShow('登录成功!');
				},
			},
			
		
	}
</script>

<style>
</style>
