<template>
	<u-popup border-radius="10" v-model="show" @close="close" @open="open" mode="center" length="70%" :closeable="true"
	 close-icon-pos="top-right">
		<view class="my-color-theme my-margin-top-sm my-margin-left-sm my-text-font-bold">{{title}}</view>
		<view class="my-margin-top-ls"></view>
		<view class="my-margin-left-ls my-margin-right-ls my-text-font-m my-color-black">{{content}}</view>
		<view class="my-margin-top-ls"></view>
		<u-button class="" @click="close" data-name="3333" :customStyle="{'background-color':'#ffd250','box-shadow':'2rpx 7rpx 10rpx #aaaaaa'}"
		 type="primary" shape="square" :ripple="true" :hairLine="true">
			<text class="my-text-font-bolder">确定</text>
		</u-button>
	</u-popup>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '提示'
			},
			content: {
				type: String,
				default: '发生错误'
			},
		},
		methods: {
			open(e) {
				this.$emit('open', e);
			},
			close(e) {
				this.$emit('close', e);
			}
		}
	}
</script>

<style>
</style>
