<template>
	<view calss="content">
		<uni-pop-up ref="showpopup" type="bottom" @change="upPopChange" v-model="bMenuOpened">
			<view class="content">
				<view class="header" style="">
					<text class="header-text">功能列表</text>
					<view class="header-text-line">
					</view>
				</view>
				<scroll-view :scroll-y="true">
					<view class="uni-list" style="flex: 1;" show-scrollbar="false">
						<view class="uni-list-cell" v-for="(cellItem,index) in funcCell" :key="index">

							<view class="grid-Title">
								<view class="grid-titleLine"></view>
								<p class="grid-titleText">{{cellItem.cellName}}</p>
								<view class="grid-titleLine"></view>
							</view>

							<view class="s-grids" style="padding-bottom: 20upx;background: white">
								<view class="is-col-1-4 is-center" style="margin-top: 16upx;" v-for="(Item, i) in cellItem.itemData" :key="i">

									<view class="menu-item" @tap="toFuncPage(Item.pageUrl)">
										<view class="img-border"><img :src="Item.imgUrl" class="menu-item-img" /></view>
										<p class="menu-item-text">{{Item.name}}</p>
									</view>

								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>

		</uni-pop-up>
		<scroll-view scroll-y="true">
		<!-- 首页头部信息 -->
		<view class="mainHead">
			<view class="mainDate">
				<view class="nowDate">{{nowDate}}</view>
				<view class="today">{{todayMsg}}</view>
			</view>
			<view class="userPic">
				<view id="myPic">
					<u-image shape="circle" :width="headPicWidth" :height="headPicHeight" :src="myPicUrl"></u-image>
				</view>
				<view id="loverPic">
					<u-image shape="circle" :width="headPicWidth" :height="headPicHeight" :src="loverPicUrl"></u-image>
				</view>
			</view>
		</view>
		<!-- end 首页头部信息 -->

		<!-- 主页广告信息 -->
		<view id="adView">

			<view v-for="(adItem,adIndex) in adList">
				<view :style="{'margin-top':40 + 'rpx'}">
				<my-mask-image 
				:imgTwoStyle="adItem.imgTwoStyle" 
				:bottomTwoStyle="adItem.bottomTwoStyle" 
				:imgWidth = "650"
				:imgHeigh = "650"
				:imgUrl="adItem.imgUrl"
				:title="adItem.title" :desc="adItem.desc" :theme="adItem.theme"
				></my-mask-image>
				</view>
			</view>
		</view>
		</scroll-view>
		<!-- end 主页广告信息 -->
		
		<view @tap="hoverMenuHandle" v-model="iconRotation" v-if="showMenu">
			<my-hover-menu width="90" height="90" :show="false" :bottom="200" :Rotation="iconRotation"></my-hover-menu>
		</view>


	</view>
</template>

<script>
	import uniPopUp from '../../components/uni-popup/uni-popup.vue'

	export default {


		onLoad: function(option) {
			//console.log(option.id);
			this.$nextTick(() => {
				//this.$refs.showpopup.open();
			})
		},
		onShow() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowHeight = windowHeight
		},
		components: {
			uniPopUp,
		},

		data() {
			return {

				//头部信息
				headPicWidth: 100,
				headPicHeight: 100,
				myPicUrl: "../../static/images/1.jpg",
				loverPicUrl: "../../static/images/8.jpg",
				nowDate: "20200912",
				todayMsg: "今天",
				//广告图片列表

				adList: [{
					imgUrl: "../../static/images/1.jpg",
					title: "第一个广告",
					desc: "第一个广告的描述",
					theme: "第一个广告的主题",
				},
				{
					imgUrl: "../../static/images/2.jpg",
					title: "第二个广告",
					desc: "第二个广告的描述",
					theme: "第二个广告的主题",
				},
				{
					imgUrl: "../../static/images/4.jpg",
					title: "第三个广告",
					desc: "第三个广告的描述",
					theme: "第三个广告的主题",
				}],
				//悬浮菜单
				iconRotation: 45,
				showMenu: true, //显示悬浮菜单
				bMenuOpened: false, //上滑菜单是否打开状态

				//悬浮菜单打开的内容
				funcCell: [{
						cellName: "一见钟情",
						itemData: [{
								name: "事情清单",
								imgUrl: "../../static/images/list.png",
								pageUrl: "../loverTools/notelist/notelist",
							},
							{
								name: "纪念日",
								imgUrl: "../../static/images/books.png",
								pageUrl: "../loverTools/memoryDay/memoryDay",
							},
							{
								name: "日记",
								imgUrl: "../../static/images/diary.png",
							},
							{
								name: "留言板",
								imgUrl: "../../static/images/blackboard.png",
							},
							{
								name: "闹钟",
								imgUrl: "../../static/images/alarm.png",
							},
							{
								name: "姨妈来了",
								imgUrl: "../../static/images/dayima.png",
							}
						]
					},
					{
						cellName: "天荒地老",
						itemData: [{
								name: "运动运动",
								imgUrl: "../../static/images/list.png",
							},
							{
								name: "看看电影",
								imgUrl: "../../static/images/list.png",
							},
							{
								name: "旅游旅游",
								imgUrl: "../../static/images/list.png",
							},
							{
								name: "学习学习",
								imgUrl: "../../static/images/list.png",
							}
						],
					}
				],
			}
		},
		methods: {
			onLoad() {
				this.nowDate = new Date().toISOString().slice(0, 10);
			},
			upPopChange: function(e) {
				if (e.show) {
					this.showMenu = false;
					this.bMenuOpened = true;
					this.iconRotation = 0;
				} else {
					this.bMenuOpened = false;
					this.showMenu = true;
					this.iconRotation = 45;
				}
			},

			hoverMenuHandle: function(e) {
				this.bMenuOpened = true;

				this.iconRotation = 0;
				this.$nextTick(() => {
					this.$refs.showpopup.open();
				})
			},
			toFuncPage(pageUrl) {
				if (pageUrl != "") {
					console.log(pageUrl);
					this.$refs.showpopup.close();
					uni.navigateTo({
						url: pageUrl,
						events: {
							// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
							acceptDataFromOpenedPage: function(data) {
								console.log(data)
							},
							someEvent: function(data) {
								console.log(data)
							}
						},
						success: function(res) {
							//关闭弹出菜单
							this.bMenuOpened = false;
							this.showMenu = true;
							this.iconRotation = 45;
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('acceptDataFromOpenerPage', {
								data: 'test'
							})
						},

						fail: function(res) {
							console.log(res)
						}
					})

				}
			}

		},
		computed: {

		}
	}
</script>

<style lang="scss">
	/* 首页头部信息 */
	.mainHead {
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30rpx;
	}

	.mainDate {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 30rpx;
	}

	.nowDate {
		color: #ffd250;
		font-size: 20rpx;
	}

	.today {
		color: #ffd250;
		font-size: 50rpx;
		font-weight: 900;
	}

	.userPic {

		margin-right: 30rpx;
		display: flex;
	}

	#myPic {
		border-radius: 50rpx;
		box-shadow: 2rpx 5rpx 15rpx #909090;
	}

	#loverPic {
		border-radius: 50rpx;
		box-shadow: 2rpx 5rpx 15rpx #909090;
	}

	/* end 首页头部信息 */


	/* 广告列表 */
	#adView {
		margin-top: 40rpx;
	}

	/* end 广告列表 */
	.barbox {
		position: fixed;
		bottom: 20rpx;
		left: 24%;
		height: 50rpx;
		width: 400rpx;

	}

	.popup-bar {
		height: 10rpx;
		width: 200rpx;
		background-color: #4399FC;
		border-radius: 50rpx;
		margin: auto;
		margin-top: 20rpx;
	}

	.opendBar {
		position: fixed;

	}

	.content {
		height: 850rpx;
		width: 750rpx;
		background-color: #FFFFFF;
		border-top-left-radius: 35rpx;
		border-top-right-radius: 35rpx;
	}

	.header {
		flex-direction: row;
		height: 80rpx;

		border-bottom-color: rgba(0, 0, 0, .1);
		border-bottom-width: 1rpx;
	}

	.header-text {
		font-size: 26rpx;
		margin-left: 30rpx;
	}

	.header-text-line {
		width: 100%;
		height: 2rpx;
		margin-top: 10rpx;
		background-color: #BBBBBB;
	}

	/* 宫格 */
	.s-grids {
		position: relative;
		overflow: hidden;
	}

	.is-col-1,
	.is-col-2,
	.is-col-3,
	.is-col-4,
	.is-col-5,
	.is-col-6,
	.is-col-7,
	.is-col-1-5,
	.is-col-1-4,
	.is-col-1-8 {
		float: left;
		-webkit-box-flex: 0;
		-ms-flex: 0 0 auto;
		flex: 0 0 auto;
	}

	.is-col-1-5 {
		display: block;
		width: 20%;
	}

	.is-col-1-4 {
		display: block;
		width: 25%;
	}

	.func-cell {
		padding: 0 20rpx;
		height: 80rpx;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}





	/*侧滑菜单栏菜单标题*/
	.grid-Title {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 10rpx;
		padding-bottom: 0rpx;
	}

	.grid-titleText {
		width: 60px;
		height: 20px;
		margin: 0 0 0 0;
		font-size: 12px;
		text-align: center;
	}

	.grid-titleLine {
		width: 50px;
		height: 1px;
		border: 0.3px solid #CCCCCC;
	}

	/*侧滑菜单项*/
	.menu-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 150rpx;
		height: 150rpx;
	}

	.img-border {
		display: flex;
		justify-content: center;
		align-items: flex-end;
		width: 85rpx;
		height: 85rpx;
		background-color: #DD524D;
		border-radius: 50rpx;
		box-shadow: 5rpx 5rpx 5rpx #909090;
	}

	.menu-item-img {
		width: 60rpx;
		height: 60rpx;
	}

	.menu-item-text {
		padding-top: 10rpx;
		font-size: 30rpx;
		text-align: justify;
		text-align: center;
	}
</style>
