<template>
	<view>
		<u-navbar :back-icon-name="backIconName" :back-icon-color="backIconColor" :isFixed="navIsFixed" :background="navBackColor"
		 :back-icon-size="navBackIconSize" :title="navTitle" :title-color="navTitleColor" :title-size="navTitleSize"
		 :back-text="navBackText" :back-text-style="navBackTextStyle">
		 <u-button @click="btnClick" data-name="3333"  shape="circle" type="primary" :custom-style="okBntStyle">完成</u-button>
		 </u-navbar>
		 
		 
		<u-form>
			<u-form-item :leftIconStyle="{color: '#888', fontSize: '32rpx'}" left-icon="account" label-width="120"
			 label-position="left" :label-style="formLabelStyle" >
			 
				<u-input :border="border" placeholder="说点什么吧" v-model="model.name" type="text"></u-input>
			</u-form-item>
		</u-form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				//标题栏相关参数
				backIconName: "close",
				backIconColor: "#000",
				navIsFixed: true,
				navBackColor: {
					// 'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
					background: 'rgba(255,255,255,0)'
				},
				navBackIconSize: 20,
				navTitle: "",
				navTitleColor: "#007AFF",
				navTitleSize: 30,
				navBackText: "添加事件",
				navBackTextStyle: {
					color: "#000",
					width: "150rpx",
					"margin-left": "20rpx",
					"margin-top": "10rpx"
				},
				okBntStyle:{
					"width":"140rpx",
					"height":"50rpx",
					"font-size":"12rpx",
					"color":"#fff",
					left:"140rpx"
				},
				
				//表单相关参数
				model: {
					name: '',
					sex: '',
					likeFruit: '',
					intro: '',
					payType: '支付宝',
					agreement: false,
					region: '',
					goodsType: '',
					phone: '',
					code: '',
					password: '',
					rePassword: '',
					remember: false,
					photo: ''
				},
				formLabelStyle:{
					"background-color":"red",
					color:"white",
			
				}
			}
		}
	}
</script>

<style>

</style>
