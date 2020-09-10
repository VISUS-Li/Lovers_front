<template>
	<view class="imgView">
		<u-image class="caseImg" :src="imgUrl" :width="imgWidth" :height="imgHeigh"></u-image>
		<view class="imgMask">
			<view class="maskTextView">
				<text class="maskText Title">{{title}}</text>
				<text class="maskText Desc">{{desc}}</text>
				<text calss="maskText Date">{{date}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgMaskStyle: {
					width: this.imgWidth,
					height: this.imgHeigh
				},
			}
		},
		props: {
			imgWidth:{
				type: String,
				default: "600rpx"
			},
			imgHeigh:{
				type: String,
				default: "600rpx"
			},
			imgUrl:{
				type: String,
				default: ""
			},
			title:{
				type: String,
				default: ""
			},
			desc:{
				type: String,
				default: ""
			},
			date:{
				type: String,
				default: ""
			}
		}
	}
</script>

<style>
	.imgView {
		width: 600rpx;
		height: 600rpx;
		margin: auto;
	}

	.imgMask {
		width: 600rpx;
		height: 590rpx;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.25);
		margin-top: 6rpx;
		z-index: 2;
	}

	.maskTextView {
		width: 600rpx;
		height: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
	}

	.maskText {
		color: #FFFFFF;
	}

	.caseImg {
		position: absolute;
		z-index: 1;
	}
</style>
