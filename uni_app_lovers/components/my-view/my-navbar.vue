<template>
	<view>
		<u-navbar :back-icon-name="backIconName" :back-icon-color="backIconColor" :isFixed="navIsFixed" :background="navBackColor"
		 :back-icon-size="navBackIconSize" :title="navTitle" :title-color="navTitleColor" :title-size="navTitleSize"
		 :back-text="navBackText" :back-text-style="navBackTextStyle">
		</u-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题栏相关参数
				backIconName: "close",
				backIconColor: "#fff",
				navIsFixed: true,
				navBackColor: {
					// 'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
					background: 'rgba(255,255,255,0)'
				},
				navBackIconSize: 20,
				navTitle: "",
				navTitleColor: "#007AFF",
				navTitleSize: 30,
				navBackTextStyle: {
					color: "#fff",
					width: "150rpx",
					"margin-left": "20rpx",
					"margin-top": "10rpx"
				},
			};
		},
		
		props:{
			navBackText:{
				type: String,
				default: 'Lovers'
			},
		}
	}
</script>

<style>

</style>
