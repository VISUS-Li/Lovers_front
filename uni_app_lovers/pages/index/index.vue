<template>
	<view >
			<home :style="PageCur=='home'?'':'display: none;'"></home>
			<rainbow :style="PageCur=='rainbow'?'':'display: none;'"></rainbow>
			<message :style="PageCur=='message'?'':'display: none;'"></message>
			<center :style="PageCur=='center'?'':'display: none;'"></center>

		<view class="menu-main shadow moyi-bg-b moyi-te-a">
			<view class="my-tab-item text-xxl" :class="[PageCur == 'home' ? 'active moyi-te-b' : '']" @tap="NavChange"
			 data-cur="home">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'home'  ? 'cuIcon-discoverfill' : 'cuIcon-discover']"></text></view>
				<view class="text">首页</view>
			</view>
			<view class="my-tab-item text-xxl" :class="[PageCur == 'rainbow' ? 'active moyi-te-b' : '']" @tap="NavChange" data-cur="rainbow">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'rainbow'  ? 'cuIcon-likefill' : 'cuIcon-like']"></text></view>
				<view class="text">彩虹岛</view>
			</view>
			<view class="my-tab-item text-xxl" :class="[PageCur == 'record' ? 'active moyi-te-b' : '']" @tap="NavChange"
			 data-cur="record">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'record'  ? 'cuIcon-camerafill' : 'cuIcon-camera']"></text></view>
				<view class="text">记录</view>
			</view>
			<view class="my-tab-item text-xxl" :class="[PageCur == 'message' ? 'active moyi-te-b' : '']" @tap="NavChange"
			 data-cur="message">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'message'  ? 'cuIcon-commentfill' : 'cuIcon-comment']"></text></view>
				<view class="text">消息</view>
			</view>
			<view class="my-tab-item text-xxl" :class="[PageCur == 'center' ? 'active moyi-te-b' : '']" @tap="NavChange"
			 data-cur="center">
				<view class="icon"><text class="text-xxl" :class="[PageCur == 'center'  ? 'cuIcon-peoplefill' : 'cuIcon-people']"></text></view>
				<view class="text">我</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		return {
				PageCur: 'home',
				userInfo: this.$common.userInfo(),
				windowWidth:0,
				windowHeight:0
			}
		},
		methods: {
			NavChange: function(e) {
				this.PageCur = e.currentTarget.dataset.cur
			}
		},
		onLoad(){
			this.$socket.connect();
			
			// 注册打开监听
			uni.$on('socketOpen', () => {
				console.log('socketOpen 服务器连接成功');
			});
			
			// 注册错误监听
			uni.$on('socketError', () => {
				console.log('socketError');
				this.$common.errorToShow('聊天服务器连接失败，部分功能不可用')
			});
			
			// 注册接受消息监听
			uni.$on('socketMessage', (res) => {
				console.log('socketMessage', res)
				switch (res.type) {
					case 'init':
						break;
						// 消息
					case 'msg':
						if (res.data.to && res.data.to == this.userInfo.id) {
							console.log('收到来自' + res.data.form + '消息', res.data);
							switch (res.data.type) {
								case 'text':
									this.$audio.palys();
									this.$common.addNewMessageList(res.data.form, res.data.value, res.data.type);
									uni.$emit('reMessgaeList');
									this.$common.addRecord(res.data.form, res.data);
									break;	
								case 'tips':
									console.log('收到用发来的文本消息');
									this.$common.addNewMessageList(res.data.form, res.data.value, res.data.type);
									uni.$emit('reMessgaeList');
									this.$common.addRecord(res.data.form, res.data);
									break;
								default:
									console.log('非常规消息', res.data);
									break;
							}
						} else {
							console.log('未知来源消息', res);
							return;
						}
						break;
						// 答复
					case 'response':
						// this.$common.updateRecordState(res.data);
						break;
						// 心跳
					case 'ping':
						uni.sendSocketMessage({
							data: JSON.stringify({
								type: 'ping'
							})
						});
						console.log('给服务器ping回去');
						break;
					default:
						console.log('啥玩意数据，我咋不认识')
						break;
				}
			});
			
			
		}
	}
</script>

<style lang="less">
	.menu-main {
		bottom: 0;
		width: 100%;
		// height: 100rpx;
		position: fixed;
		left: 0;
		white-space: nowrap;
		box-sizing: border-box;
		overflow: hidden;
		// line-height: 100rpx;
		z-index: 999;

		.my-tab-item {
			display: inline-block;
			width: 20%;
			text-align: center;

			.icon {
				margin-top: 10rpx;
			}

			.text {
				font-size: 20rpx;
			}
		}

		.active {
			font-size: larger;
		}
	}
</style>
