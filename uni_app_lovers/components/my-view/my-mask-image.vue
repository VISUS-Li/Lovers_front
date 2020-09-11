<template>
	<view class="container">
		<view class="imgView" v-if="imgType == 1">
			<u-image class="imgOne" :src="imgUrl" :width="imgWidth" :height="imgHeigh"></u-image>
			<view class="imgMask">
				<view class="bottomMask">
					<view class="maskTextView">
						<text class="maskText Title">{{title}}</text>
						<text class="maskText Desc">{{desc}}</text>
						<!-- <text class="maskText Date">{{date}}</text> -->
					</view>
				</view>
			</view>
		</view>
		
		<view class="imgViewTwo" v-if="imgType == 2">
			<u-image class="imgTwo" :src="imgUrl" :width="imgWidth" :height="imgHeigh * 0.75" mode="aspectFit"></u-image>
			<view class="bottomMaskTwo">
				<view class="maskTextViewTwo">
					<text class="maskText Title">{{title}}</text>
					<text class="maskText Desc">{{desc}}</text>
					<!-- <text class="maskText Date">{{date}}</text> -->
				</view>
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
			imgType:{
				type:[String, Number],
				default: 2
			},
			imgWidth: {
				type: [String, Number],
				default: 600
			},
			imgHeigh: {
				type: [String, Number],
				default: 600
			},
			imgUrl: {
				type: String,
				default: ""
			},
			title: {
				type: String,
				default: ""
			},
			desc: {
				type: String,
				default: ""
			},
			date: {
				type: String,
				default: ""
			},
		},
		computed:{
		}
	}
</script>

<style>
	.container {
		width: 600rpx;
		height: 600rpx;
		margin: auto;

	}

	.imgView {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		border: #000000;
	}

	.imgMask {
		width: 600rpx;
		height: 590rpx;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.25);
		margin-top: 6rpx;
		z-index: 2;
		display: flex;
		justify-content: flex-start;
		flex-direction: row;
		align-items: flex-end;
		border-radius: 50rpx;
	}

	.bottomMask {
		width: 100%;
		height: 150rpx;
		background-color: rgba(255, 255, 255, 0.8);
		box-shadow: 0rpx -5rpx 10rpx 2rpx rgba(0, 0, 0, 0.5);
		border-radius: 0rpx 0rpx 50rpx 50rpx;
	}

	.maskTextView {
		width: 100%;
		height: 100%;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.maskText {
		width: 100%;
		color: #FE7A7D
	}

	.maskText.Title {
		font-size: 50rpx;
		font-weight: 900;
		color: ;
	}

	.imgOne {
		position: absolute;
		z-index: 1;
	}
	
	
	/* img Two */
	.imgViewTwo{
		width: 100%;
		height: 450rpx;
		background-color: #000;
		border: 10px solid #18B566;
		border-radius: 50rpx 50rpx 0rpx 0rpx;
	}
	
	.maskTextViewTwo{
		background-color: #0062CC;
	}
	/* end img Two */
</style>
