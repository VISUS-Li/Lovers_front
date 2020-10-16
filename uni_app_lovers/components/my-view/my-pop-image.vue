<template>
	<u-popup border-radius="10" v-model="PopupShow" @close="closePopup" @open="openPopup" mode="center" length="70%"
	 :closeable="true" close-icon-pos="bottom-right">
		<view class="my-color-theme my-margin-top-sm my-margin-left-sm">提示</view>
		<view class="my-margin-top-ls"></view>
		<view class="my-margin-auto">登录失败</view>
		<view class="my-margin-top-ls"></view>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			PopupShow: {
				type: Boolean,
				default: false
			},
		}
	}
</script>

<style>
</style>
