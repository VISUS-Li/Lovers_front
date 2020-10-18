<template>
	<view class="" @tap="playMusic">
		<view class="my-width-400rpx my-height-400rpx my-radius-all-400rpx my-position-relative">
			<image class="my-width-400rpx my-height-400rpx my-radius-all-400rpx my-border-width-m my-border-solid my-border-color-theme"
			 :src="audioData.HomeImgUrl" mode="aspectFit" :style="styleObj">
				<view class="my-width-200rpx my-height-200rpx my-radius-all-100rpx my-border-width-s my-border-solid my-border-color-gray my-bg-color-white my-position-absolute my-position-top-100rpx my-position-left-100rpx">
					<view v-if="isPlay == true">
						<image src="../../../static/images/play.png" class="my-width-90rpx my-height-90rpx my-position-absolute my-position-top-120rpx my-position-left-120rpx"></image>
					</view>
					<view v-if="isPlay == false">
						<image src="../../../static/images/pause.png" class="my-width-90rpx my-height-90rpx my-position-absolute my-position-top-120rpx my-position-left-120rpx"></image>
					</view>
				</view>
			</image>
		</view>
	</view>
</template>

<script>
	const audioContext = uni.createInnerAudioContext();
	
	audioContext.autoplay = false;
	export default {
		data() {
			return {
				
				
				duration: '100',
				currentTime: '0',
				audioDuration: ['0', '00'],
				audioCurTime: ['0', '00'],
				longth: '',
				isPlay: false,
				timer: null,
				system: '',
				styleObj: {
					transform: '',
					transformOrigin: 'center'
				},
				rotateTimer: null,
				rotateDeg: 0
			}
		},
		onUnload() {
			audioContext.destroy()
		},
		
		created(e) {
			let a = this
			audioContext.src = a.audioData.AudioFileUrl
			audioContext.loop = true
			a.longth = a.audioData.AudioLength
			a.system = uni.getSystemInfoSync().platform
			audioContext.onEnded((e) => {
				clearInterval(a.timer)
				clearInterval(a.rotateTimer)
				a.timer = null
				a.rotateTimer = null
				a.isPlay = false
				audioContext.seek(0);
				a.audioCurTime = ['0', '00']
				a.currentTime = '0'
			});
			setTimeout(() => {
					this.playMusic()
				},100)
		},
		onShow() {
		},
		onReady() {
			//let a = this
			// uni.setNavigationBarTitle({
			// 	title: a.audioData[0].name
			// });	
		},
		props:{
			audioData:{
				type:Object,
			}
		},
		methods: {
			// audio player part : in this part we'd like to show the similar layouts and functions as wangyi music. created by Hsi (1563792476@qq.com)
			// in order to avoid syntax error of playing time , use backend data to show duration time instead of calculating by yourself
			next() {
				// next song function, the main thought of next song function is that we should find out the index of song which is playing. 
				// first of all , clear the timer and stop rotating cover, and then find out the index 
				clearInterval(this.rotateTimer)
				this.rotateTimer = null
				let src = audioContext.src
				//tips: (complex array may cause performance issues)
				this.audioData.filter((currentValue, index, arr) => {
					if (currentValue.file == src) {
						if (index + 1 >= arr.length) {
							clearInterval(this.timer)
							let timer = null
							this.isPlay = false;
							// once click next button , pause and reset playingtime 
							audioContext.seek(0);
							this.currentTime = '0'
							this.audioCurTime = ['0', '00']
							audioContext.src = this.audioData[0].AudioFileUrl
							this.longth = this.audioData[0].AudioLength
							uni.setNavigationBarTitle({
								title: this.audioData[0].name
							})
						} else {
							clearInterval(this.timer)
							let timer = null
							this.isPlay = false;
							audioContext.seek(0);
							this.currentTime = '0'
							this.audioCurTime = ['0', '00']
							audioContext.src = this.audioData[index + 1].AudioFileUrl
							this.longth = this.audioData[index + 1].AudioLength
							uni.setNavigationBarTitle({
								title: this.audioData[index + 1].name
							})
						}
					} else {}
				});
			},
			pre() {
				clearInterval(this.rotateTimer)
				this.rotateTimer = null
				let src = audioContext.src
				this.audioData.filter((currentValue, index, arr) => {
					if (currentValue.file == src) {
						if (index == 0) {
							clearInterval(this.timer)
							let timer = null
							this.isPlay = false;
							audioContext.seek(0);
							this.currentTime = '0'
							this.audioCurTime = ['0', '00']
							audioContext.src = this.audioData[arr.length - 1].AudioFileUrl
							this.longth = this.audioData[arr.length - 1].AudioLength
							uni.setNavigationBarTitle({
								title: this.audioData[arr.length - 1].name
							});
						} else {
							clearInterval(this.timer)
							let timer = null
							this.isPlay = false;
							audioContext.seek(0);
							this.currentTime = '0'
							this.audioCurTime = ['0', '00']
							audioContext.src = this.audioData[index - 1].AudioFileUrl
							this.longth = this.audioData[index - 1].AudioLength
							uni.setNavigationBarTitle({
								title: this.audioData[index - 1].Title
							});
						}
					} else {}
				});
			},
			playMusic() {
				// reset duration time by clicking midbutton only 
				let duration = audioContext.duration;
				let currentTime = audioContext.currentTime;
				this.duration = duration;
				this.currentTime = currentTime;
				this.audioCurTime[0] = Math.floor(Math.floor(currentTime) / 60);
				this.audioCurTime[1] = Math.floor(currentTime) % 60;
				if (this.isPlay) {
					this.isPlay = false;
					clearInterval(this.timer)
					clearInterval(this.rotateTimer)
					this.timer = null
					this.rotateTimer = null
					audioContext.pause();
				} else {
					this.isPlay = true;
					this.rotateTimer = setInterval(() => {
						this.rotateDeg++
						this.styleObj.transform = `rotate(${this.rotateDeg}deg)`
					}, 50)
					audioContext.play();
					this.timer = setInterval(() => {
						this.currentTime++
						if (this.audioCurTime[1] > 58) {
							this.audioCurTime[0]++
							this.audioCurTime[1] = 0
							this.audioCurTime[1]++
						} else {
							this.audioCurTime[1]++
						}
					}, 1000)
				}
			},

		
			changeProgress(e) {
				// ios 拖动slider 会出现漂移，定位不准，苹果暂时用拖动时暂停播放来规避
				// ios pause music when dragging , Android could still play
				audioContext.seek(e.detail.value);
				// pause music when dragging , in order to load timer repeatly
				if (this.system == 'ios') {
					this.audioCurTime[0] = Math.floor(Math.floor(e.detail.value) / 60);
					this.audioCurTime[1] = Math.floor(e.detail.value) % 60;
					clearInterval(this.timer)
					clearInterval(this.rotateTimer)
					this.timer = null
					this.rotateTimer = null
					this.isPlay = false
					audioContext.pause();
				} else {
					clearInterval(this.timer)
					clearInterval(this.rotateTimer)
					this.timer = null
					this.rotateTimer = null
					this.isPlay = false;
					this.playMusic()
				}
			}
		}
	}
</script>

<style>

</style>
