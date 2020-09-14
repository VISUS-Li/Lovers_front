<template>

	<view style="height: 100%;">
			<text>aaaaaaaabbcccccccccccccccccc</text>
		<view class="title">
			<view class="flex_col color_fff">
				<view class="box1"><uni-icons type="search" size="20" color="#fff"></uni-icons></view>
				<view class="flex_grow flex_col flex_center tab">
					<view :class="{ active: listType == 0 }" data-type="0" @tap="changeType">最新</view>
					<view :class="{ active: listType == 1 }" data-type="1" @tap="changeType">热门</view>
				</view>
				<view class="box1"></view>
			</view>
		</view>

		<swiper class="swiper" :duration="duration" :vertical="true" @change="onChange" :current="activeIndex">
			<swiper-item v-for="(item, index) in dataList" :key="index">
				<view class="swiper-item" v-if="activeIndex >= index - 1">
					<image :src="item.zhanst" mode="aspectFill"></image>
					<image :src="item.zhanst" mode="aspectFit"></image>
					<!-- 左下部分 -->
					<view class="info-box">
						<view v-if="item.shop" style="position: relative;height: 100rpx;display: flex;align-items: center;" @click="navTo('/pages/product/product?id='+item.spid)">
							<view class="zwyDrop" style="margin-left: 13upx;"></view>
							<image class="zwyCart" style="width: 30rpx;height: 25rpx;" src="./static/icon_cart.png"></image>
							<view style="margin-left: 20upx;font-size: 25upx;">{{ item.title }}</view>
						</view>
						<!-- 广告 -->
						<view class="seedetails" v-if="item.gg">
							<text class="seedetails-text" @click="navTo(item.gg)">{{startProgress?'下载进度 ' + downloadProgress +'%':'立即下载>'}}</text>
						</view>
						<view class="size_16">@ {{ item.name }}</view>
						<view>{{ item.content }}</view>
						<view class="size_12">当前正播放 {{audioList[audioPlaySrc].name}}</view>
					</view>
					<!-- 右侧部分 -->
					<view class="sidebar">
						<view v-if="item.flag" class="circle zwyPortrait" style="--color:#ff0081;" @tap.stop="quanw(item)">
							<image :src="item.itempic" class="zwyBeat" mode="aspectFill"></image>
							<text class="follow" v-if="!guanz" @tap.stop="quanw('gz')">+</text>
						</view>
						<view v-if="!item.flag" class="circle zwyHotWhite" @tap.stop="quanw(item)">
							<image :src="item.itempic" mode="aspectFill"></image>
							<text class="follow" v-if="!guanz" @tap.stop="quanw('gz')">+</text>
						</view>
						<view class="like" @click.stop="tapLove">
							<uni-icons class="zwyHover2" :type="check ? 'heart' : 'heart-filled'" size="30" color="#F12F5B"></uni-icons>
							<view>{{ item.commentsNum > 0 ? item.commentsNum : '收藏' }}</view>
						</view>
						<view class="likee">
							<uni-icons type="weixin" size="30" color="#00ff00"></uni-icons>
							<view>{{ item.giveNum > 0 ? item.giveNum : '留言' }}</view>
						</view>
						<view class="read" @tap="share">
							<uni-icons type="redo" size="25" color="#fff"></uni-icons>
							<view>{{ item.forwardsNum > 0 ? item.forwardsNum : '转发' }}</view>
						</view>
						<view class="menu" @tap="play"><image :class="playState ? 'xuanz' : ''" :src="item.itempic" mode="aspectFill"></image></view>
						<view v-if="playState" class="zwyMusic"></view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
var api = require('./common/api.js');
import { mapState, mapMutations } from 'vuex';
import uniIcons from './components/uni-icons/uni-icons';
let innerAudioContext = '';
export default {
	components: {uniIcons},
	data() {
		return {
			check: true,
			guanz: false,
			listType: 1,
			activeIndex: 0,
			duration: 300,
			rows: 10,
			page: 1,
			da: [],
			dataList: [],
			nowmiao: 0, //当前时间
			allmiao: 0, //全部时间
			lineBarWid: 520, //进度条的宽度跟css一只
			playState: 0, //播放状态
			audioCont: '',
			audioPlaySrc: 0, //当前播放的歌曲index
			audioWay: 0, //播放方式 0顺序播放 1随机播放 2单曲循环
			collect: 0, //是否收藏
			packgePath: null, // 更新包的文件地址
			downloadTask: null, // 下载任务
			startProgress: false, // 下载进行 - 标记
			downloadProgress: 0, // 下载进度
			audioList: [
				{
					name: '春暖',
					author: '林心如',
					src: 'http://120.79.191.222/home/fgy/mp3/春暖.mp3',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630610810&di=1a0c6d9557aa2bba822c54694a55429e&imgtype=0&src=http%3A%2F%2Fmp0.iqiyipic.com%2Fimage%2F20180827%2Fff%2F79%2Fh_1199249539_h_601_400_400.jpg'
				},
				{
					name: '方古云APP',
					author: '林心如',
					src: 'http://120.79.191.222/home/fgy/mp3/方古广告.mp3',
					img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630610810&di=1a0c6d9557aa2bba822c54694a55429e&imgtype=0&src=http%3A%2F%2Fmp0.iqiyipic.com%2Fimage%2F20180827%2Fff%2F79%2Fh_1199249539_h_601_400_400.jpg'
				},
				{
					name: '你笑起来真好看',
					author: '林心如',
					src: 'http://120.79.191.222/home/fgy/mp3/你笑起来真好看.mp3',
					img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630610810&di=1a0c6d9557aa2bba822c54694a55429e&imgtype=0&src=http%3A%2F%2Fmp0.iqiyipic.com%2Fimage%2F20180827%2Fff%2F79%2Fh_1199249539_h_601_400_400.jpg'
				},
				{
					name: '少年',
					author: '辉气*蛋',
					src: 'http://120.79.191.222/home/fgy/mp3/少年.mp3',
					img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547631130547&di=076c9275ce160baa2ff5cb66eed4ad53&imgtype=0&src=http%3A%2F%2Fwww.mixtapetorrent.com%2Fsystem%2Ffiles%2Ffollowmernb.jpg'
				},
				{
					name: '只要平凡',
					author: '李玉刚',
					src:'http://120.79.191.222/home/fgy/mp3/只要平凡.mp3',
					img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547631330468&di=517d6b42ed32567a5798fd9bbe13ff9c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170830%2F2dbe36dfa0a14c0c94b672f445c02a21.jpeg'
				},
				{
					name: '半壶沙',
					author: '岑军',
					src: 'http://120.79.191.222/home/fgy/mp3/半壶沙.mp3',
					img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547630762297&di=2c3317bf38f107287414b1b0cd33f0e5&imgtype=0&src=http%3A%2F%2Fsingerimg.kugou.com%2Fuploadpic%2Fpass%2Fsofthead%2F400%2F20140829%2F20140829161553861786.jpg'
				}
			]
		};
	},
	computed: {
		...mapState(['hasLogin', 'userInfo']),
	},
	mounted: function() {
		this.audioPlaySrc = 0;
		this.audioInit();//进入页面播放歌曲
	},
	onLoad() {
		this.getList();
	},
	onHide(){

	},
	methods: {
		//播放歌曲
		audioInit() {
			let src = this.audioList[this.audioPlaySrc].src;
			if (innerAudioContext) {
				innerAudioContext.destroy();
				innerAudioContext = '';
			}
			innerAudioContext = uni.createInnerAudioContext();
			innerAudioContext.src = src;
			innerAudioContext.autoplay = true;
			let dura = setInterval(() => {
				this.allmiao = Math.floor(innerAudioContext.duration);
				if (this.allmiao) {
					clearInterval(dura);
				}
			});
			innerAudioContext.onPlay(() => {
				this.playFunc();
			});
			innerAudioContext.onPause(() => {
				this.pauseFunc();
			});
			innerAudioContext.onTimeUpdate(e => {
				this.nowmiao = Math.floor(innerAudioContext.currentTime);
			});
			innerAudioContext.onEnded(() => {
				this.nextPlay();
			});
		},
		playFunc() {
			this.playState = 1;
		},
		pauseFunc() {
			this.playState = 0;
		},
		//0循环1随机2单曲
		audioWayFunc() {
			if (this.audioWay > 1) {
				this.audioWay = 0;
			} else {
				this.audioWay = this.audioWay + 1;
			}
		},
		// 播放/暂停
		play() {
			if (this.playState) {
				innerAudioContext.pause();
			} else {
				innerAudioContext.play();
			}
		},
		// 播放下一首
		nextPlay() {
			if (this.audioWay == 1) {
				//随机
				this.audioPlaySrc = Math.floor(Math.random() * 10) % this.audioList.length;
			} else if (this.audioWay == 0) {
				//顺序
				if (this.audioPlaySrc >= this.audioList.length - 1) {
					this.audioPlaySrc = 0;
				} else {
					this.audioPlaySrc = this.audioPlaySrc + 1;
				}
			} //单曲循环
			this.audioInit();
		},
		// 播放上一首
		upPlay() {
			if (this.audioWay == 1) {
				//随机
				this.audioPlaySrc = Math.floor(Math.random() * 10) % this.audioList.length;
			} else if (this.audioWay == 0) {
				//顺序
				if (this.audioPlaySrc < 1) {
					this.audioPlaySrc = this.audioList.length - 1;
				} else {
					this.audioPlaySrc = this.audioPlaySrc - 1;
				}
			} //单曲循环
			this.audioInit();
		},
		navTo(upurl) {
			// uni.navigateTo({
			// 	upurl
			// });
			if (!this.startProgress) {
				this.downloadProgress = 0
				this.startProgress = true
				// 创建下载任务对象
				this.downloadTask = uni.downloadFile({
					url: upurl,
					success: (res) => {
						if (res.statusCode === 200) {
							// 保存下载的安装包
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: (res) => {
									this.packgePath = res.savedFilePath
									// 进行安装
									plus.runtime.install(this.packgePath, { force: true })
									// 任务完成，关闭下载任务
									this.downloadTask.abort()
									this.downloadTask = null
									this.startProgress = false
								}
							})
						}
					}
				})
				// 进度条更新
				this.downloadTask.onProgressUpdate((res) => {
					this.downloadProgress = res.progress
				})
			}
		},
		tapLove() {
			this.check = !this.check;
		},
		/* 改变类型 */
		changeType(e) {
			this.listType = e.currentTarget.dataset.type;
			this.page = 1;
			this.getList(this.listType);
		},
		/* 获取列表 */
		getList(way) {
			if (this.page == 1) {
				uni.showLoading({
					title: '正在加载',
					mask: true
				});
			}
			this.huoqsj(this.page,way);
			new Promise((success, error) => {
				/* 此处为数据，请自行修改 */
				let getImgs = () => {
					let urls = [];
					for (let k in this.da) {
						urls.push({
							spid: this.da[k].spid, //商品id
							id: this.da[k].id, //用户id
							gg: this.da[k].gg,
							name: this.da[k].name, //用户名
							shop: this.da[k].shop, //是否有商品
							itempic: this.da[k].itempic, //头像
							zhanst: this.da[k].zst, //展示图
							title: this.da[k].itemshorttitle,
							content: this.da[k].video_title, //内容
							dubbedText: this.da[k].itemtitle, //音乐名
							giveNum: this.da[k].praise, //点赞数
							commentsNum: this.da[k].discuss, //评论数
							forwardsNum: this.da[k].share //转发数
						});
					}
					return urls;
				};
				setTimeout(() => {
					success(getImgs());
				}, 500);
			}).then(data => {
				uni.hideLoading();
				if (this.page == 1) {
					/* 关闭切换效果 */
					this.duration = 0;
					this.$nextTick(() => {
						this.dataList = data; //网络数据
						/* 切换到轮播第0个 */
						this.activeIndex = 0;
						this.$nextTick(() => {
							/* 恢复切换效果 */
							this.duration = 300;
						});
					});
				} else {
					this.dataList = [...this.dataList, ...data]; //增加新数据
				}
				this.page++; //页数增加
			});
		},
		huoqsj(page,way) {
			// console.log('当前第' + page + '页',way); //输出数组返回值
			var fs = 2;
			if (way == 0) {
				fs = 0;
			} else {
				fs = 1;
			}
			api.get({
				url: 'home/fgy/api.php',
				data: {
					user: '13925838823',
					token: 0,
					page: page,
					fas: fs,
					way: 'hqtulist'
				},
				success: result => {
					// console.log(JSON.stringify(result));  //输出数组返回值
					result.data.forEach((item, index) => {
						this.da.push(Object.assign(item, { state: 'pause' }));
					});
					if (this.da.length > 10) {
						//当数组大于某个值的时候，就删除
						this.da.splice(0, 10);
					}
				}
			});
		},
		/* 切换监听 */
		onChange(e) {
			this.nextPlay();//播放下一首歌曲
			var index = e.detail.current;
			this.activeIndex = index;
			if (index == this.dataList.length - 3) {
				this.getList(); //每页10张图片，翻到第7张就增加一页
			}
		},
		share() {
			//#ifdef APP-PLUS
			plus.share.sendWithSystem({
				content: "方古云视频",
				href: 'http://www.tsopay.com/'
			}, function() {
				// console.log('分享成功');
			}, function(e) {
				// console.log('分享失败：' + JSON.stringify(e));
			});
			//#endif
		},
		// 关注或者进入他的主页
		quanw(e) {
			if (e == 'gz') {
				this.guanz = !this.guanz
			} else {
				uni.navigateTo({
					url: `/pages/user/pyuser?data=${JSON.stringify(e)}`
				});
			}
		}
	},
	// 是否全局播放
	destroyed(){
		innerAudioContext.destroy()
		innerAudioContext = ''
	}
};
</script>

<style lang="scss">
@import './common/tsopay.scss';
page {
	background-color: #76beff;
}

page,
.swiper,
.swiper-item {
	height: 100%;
}

/* 标题栏 */
.title {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	padding-top: var(--status-bar-height);
	z-index: 10;
	background-color: rgba(255, 255, 255, 0.08);
	box-shadow: 0 0 10px rgba(255, 255, 255, 0.08);

	& > view {
		height: 44px;
	}

	.box1 {
		width: 100rpx;
		margin: 0 40rpx;
		font-size: 40rpx;
	}

	.tab {
		& > view {
			margin: 0 30rpx;
			line-height: 64rpx;
			font-size: 32rpx;
			position: relative;
			color: rgba(255, 255, 255, 0.5);
			letter-spacing: 2px;

			&.active {
				color: rgba(255, 255, 255, 1);

				&:after {
					content: '';
					display: block;
					height: 2px;
					position: absolute;
					width: 70%;
					background-color: #fff;
					border-radius: 1px;
					left: 15%;
					bottom: 0;
				}
			}
		}
	}
}

.swiper .swiper-item {
	position: relative;
	background: #ffffff;
	overflow: hidden;

	& > image:nth-child(1) {
		display: block;
		width: 100%;
		height: 100%;
		box-sizing: content-box;
		padding: 40px 30px;
		position: absolute;
		z-index: 1;
		top: -40px;
		left: -30px;
		filter: blur(20px);
	}

	& > image:nth-child(2) {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 2;
		top: 0;
		left: 0;
	}

	/* 添加阴影遮罩，增强文字显示 */
	&:after {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 65%;
		z-index: 3;
		background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
	}
}

.info-box {
	position: absolute;
	bottom: 80rpx;
	left: 50rpx;
	z-index: 4;
	color: #fff;
	width: 500rpx;

	& > view {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

.sidebar {
	position: absolute;
	bottom: 100rpx;
	right: 50rpx;
	z-index: 5;
	color: #fff;
	text-align: center;
	// background-color: #005500;
	.circle {
		position: relative;
		box-shadow: 0px 6rpx 10rpx 0rpx rgba(106, 168, 194, 0.6);
		background: linear-gradient(-39deg, rgba(43, 161, 250, 1), rgba(156, 210, 252, 1));
		border-radius: 50%;
		width: 80rpx;
		height: 80rpx;
		& > image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: #fff solid 1px;
		}
		.follow {
			position: absolute;
			z-index: 100;
			top: 65upx;
			left: 25upx;
			color: #ffffff;
			font-size: 15px;
			width: 30upx;
			height: 30upx;
			background-color: #f12f5b;
			text-align: center;
			line-height: 30upx;
			border-radius: 17upx;
		}
	}

	.pic {
		margin-bottom: 20rpx;
		& > image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			border: #fff solid 1px;
		}
	}

	.like {
		font-size: 100rpx;
		margin-bottom: 20rpx;

		& > view {
			font-size: 20rpx;
			margin-top: 0;
		}
	}

	.likee {
		font-size: 50rpx;
		margin-bottom: 20rpx;

		& > view {
			font-size: 20rpx;
			margin-top: 0;
		}
	}

	.read {
		font-size: 64rpx;
		margin-bottom: 100rpx;

		& > view {
			font-size: 20rpx;
			margin-top: -6rpx;
		}
	}

	.menu {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		border: rgba(0, 0, 0, 0.5) solid 14rpx;
		box-sizing: border-box;

		& > image {
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}

	/* 按钮点击缩放效果 */
	& > view {
		transition: transform 0.05s ease 0s;

		&:active {
			transform: scale(0.95, 0.95);
		}
	}
}

.itt {
	font-size: 60rpx;
	color: #ffffff;
	text-align: center;
	margin-bottom: 10rpx;
}

.picture {
	color: #ffffff;
}

.cstIconfontN {
	text-align: center;
	font-size: 75rpx;
}
//广告背景
.seedetails{
	width: 480upx;
	height: 70upx;
	text-align: center;
	background-color: rgba(0, 170, 255, 0.3);
	border-radius: 6px;
	top: -5px;
	margin-top: 5px;//间距
}
// 查看广告详情文字
.seedetails-text{
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	line-height: 70upx;
}
.view-left-text{
	color: #FFFFFF;
	font-size: 18px;
	margin-bottom: 10upx;
	font-weight: bold;
}
</style>
