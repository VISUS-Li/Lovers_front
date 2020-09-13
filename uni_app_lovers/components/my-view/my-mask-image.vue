<template>
	<view >
		<view class="OneContainer" v-if="imgType == 1">
		<view class="imgView" >
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
		</view>

		<view class="TwoContainer" v-if="imgType == 2" :style="{'width':imgWidth+'rpx','height':imgHeigh + 'rpx'}">
			<view class="imgViewTwo" :style="[GetImgTwoStyle]">
				<u-image class="imgTwo" :src="imgUrl" :height="imgHeigh * 0.71" mode="aspectFit"></u-image>
			</view>
			<view class="bottomTwo" :style="[GetBottomTwoStyle]">
				<text class="bottomTwoText Desc">{{desc}}</text>
				<text class="bottomTwoText Title">{{title}}</text>
				<text class="bottomTwoText Theme">{{theme}}</text>
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
			imgType: {
				type: [String, Number],
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
			theme: {
				type: String,
				default: ""
			},
			imgTwoStyle: {
				type: Object,
				default () {
					return {
						width: "100%",
						height: this.imgHeigh * 0.70 + 'rpx',
						"background-color": "#fff"
					};
				}
			},
			bottomTwoStyle: {
				type: Object,
				default () {
					return {
						width: '100%',
						height: this.imgHeigh * 0.30 + 'rpx',
						"background-color": "#fff"
					};
				}
			}
		},
		computed: {
			GetImgTwoStyle:function(){
				let style = {};
				Object.assign(style, this.imgTwoStyle);
				if (this.imgTwoStyle.height) {
					style.height = this.imgTwoStyle.height;
				} else {
					style.height = this.imgHeigh * 0.70 + 'rpx';
				}
				return style;
			},
			GetBottomTwoStyle: function() {
				let style = {};
				Object.assign(style, this.bottomTwoStyle);
				if (this.bottomTwoStyle.height) {
					style.height = this.bottomTwoStyle.height;
				} else {
					style.height = this.imgHeigh * 0.30 + 'rpx';
				}
				return style;
			}
		}
	}
</script>

<style lang="scss">
	.OneContainer {
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
	}

	.imgOne {
		position: absolute;
		z-index: 1;
	}


	/* img Two */
	.TwoContainer {
		margin: auto;
		
		// border-radius: 50rpx 50rpx 50rpx 50rpx;
	}

	.imgViewTwo {
		width: 100%;
		height: 100%;
		margin: auto;
		border: 10px solid #18B566;
		border-bottom: none;
		border-radius: 50rpx 50rpx 0rpx 0rpx;
	}

	.imgTwo {
		width: 100%;
	}

	.bottomTwo {
		width: 100%;
		display: flex;
		flex-direction: column;
		border: 10px solid #18B566;
		border-top: none;
		border-radius: 0rpx 0rpx 50rpx 50rpx;
		/* border-top:1rpx solid #000000 ; */
		box-shadow: inset 0 10rpx 10rpx -10rpx #18B566;
	}
	.bottomTwoText{
		margin-left: 20rpx;
		width: 300rpx;
		white-space:nowrap;
		height: 100%;
	}
	
	.bottomTwoText.Title{
		font-weight: 900;
	}
	
	.bottomTwoText.Desc{
		margin-top: 15rpx;
		font-size: 30rpx;
		color:$uni-text-color-grey;
		align-content: center;
	}
	
	.bottomTwoText.Theme{
		font-size: 20rpx;
		color:$uni-text-color-disable;
	}
	
	/* end img Two */
</style>
