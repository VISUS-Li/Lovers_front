<!-- 
	name: 悬浮菜单
	version: v0.0.1
	update_time: 2020-6-25 
 -->
<template>
	<view v-if= "mStyle == 'nav' " :menu-style="mStyle">
		<!-- 遮罩 -->
		<view class="mask" v-if="show" @tap="show = false" @touchmove.stop.prevent></view>
		<!-- 按钮 -->
		<view class="major-box" :class="{show: show}" :style="{top: top + 'rpx'}" >
			<view class="click-btn" @tap="show = !show" draggable="true" @touchstart="touchstart" @touchmove.stop.prevent="touchmove">
				<view>快捷</view>
				<view>导航</view>
			</view>
			<view class="nav-box">
				<view class="nav-btn" v-for="(btn, index) in btnList" :key="index" @tap="clickBtn(btn)">
					<view class="nav-icon" :style="{backgroundColor: btn.bgcolor}">{{btn.icon}}</view>
					<view class="nav-text">{{btn.text}}</view>
				</view>
			</view>
		</view>
	</view>
	<view v-else>
		<view class="major-box" :class="{show: show}" :style="{bottom:bottom + 'rpx',left:left + 'rpx'}" >
			<view class="click-btn" @tap="show = !show"   :style="{width:width + 'rpx', height:height + 'rpx'}">
				<u-icon name="close" class="menu-icon" :size="50"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			mStyle:'def',
			show: false ,// 是否显示
			bottom: 100,	// 顶端距离 
			left:570, //左边距离
			width:120,
			height:120,
			deviationTop: 0,	// 偏移量
			windowHeight: uni.getSystemInfoSync().windowHeight,	// 视图高度 
			btnList: [		// 所有按钮 
				{
					icon: '首',
					text: '平台首页',
					bgcolor: '#FE7A7D'
				},
				{
					icon: '坛',
					text: '在线论坛',
					bgcolor: '#CAB493'
				},
				{
					icon: '工',
					text: '平台工具',
					bgcolor: '#91B3B2'
				},
				{
					icon: '发',
					text: '我的发布',
					bgcolor: '#959AB3'
				},
				{
					icon: '个',
					text: '个人资料',
					bgcolor: '#73B3C7'
				},
				{
					icon: '软',
					text: '关于软件',
					bgcolor: '#66B26A'
				},
			]
		};
	},
	props:{
		// top:{
		// 	type:integer,
		// 	default:1000
		// }
	},
	methods: {
		// 点击按钮 
		clickBtn: function(btn) {
			console.log('点击了：' + btn.text);
		},
		// 拖动开始，记录一下偏移量
		touchstart: function(e) {
			var touch = e.touches[0] || e.changedTouches[0];
			this.deviationTop = touch.clientY - this.top;
			// console.log(this.deviationTop);
		},
		// 上下拖动时 
		touchmove: function(e) {
			var touch = e.touches[0] || e.changedTouches[0];
			var top = touch.clientY;
			top = top - this.deviationTop;
			if (top < 0) {
				top = 0;
			}
			if (top > this.windowHeight - 40) {
				top = this.windowHeight - 40;
			}
			this.top = top;
			return false;
		},
	}
};
</script>

<style>
	/* 遮罩 */
	.mask {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10000;
		background: rgba(0, 0, 0, 0.4);
	}
	/* 总盒子 */
	.major-box {
		border: 1px 0 solid;
		z-index: 10001;
		position: fixed;
		width: 100%;
		/* height: 0px; */
		left: 650rpx; 
		transition: left 0.5s;
		overflow: hidden;
	}
	/* 展开时 */
	.major-box.show{left: 110rpx;}
	
	.click-btn,
	.nav-box {
		float: left;
	}
	/* 按钮样式 */
	.nav-box{
		background-color: #FFF;
		border-radius: 0 0 0 5px;
	}
	.u-icon.menu-icon{
		padding-left: 0px;
	}
	
	.click-btn {
		width: 100rpx;
		background-color: #fe6d34;
		color: #fff;
		font-size: 10px;
		text-align: center;
		border-radius: 60rpx;
		line-height: 12px;
		display: flex;
		justify-content: center;//x轴排列
		align-items: center;//y轴排列
		margin: 5rpx;
		box-shadow: -2rpx 5rpx 5rpx #909090;
	}
	.click-btn view {
		padding-left: 15rpx;
	}

	/* 按钮盒子 */
	.nav-box {
		width: 500rpx;
		padding: 30rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		text-align: center;
		justify-content: center;
	}
	.nav-btn {
		flex: 1;
		border: 0px #000 solid;
		min-width: 150rpx;
		padding: 12rpx 0;
		padding-bottom: 20rpx;
	}
	.nav-icon {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		display: inline-block;
		font-size: 15px;
		border-radius: 50%;
		background-color: #666;
		color: #fff;
	}
	.nav-text {
		font-size: 12px;
		font-weight: bold;
		margin-top: 8rpx;
	}
</style>
