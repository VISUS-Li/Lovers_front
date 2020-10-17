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

		<my-load-refresh 
		ref="loadRefresh" 
		:backgroundCover="'#FFFFFF'" 
		:pageNo="currentAdCardIndex" 
		:totalPageNo="adTotalCount" 
		:isRefresh="true" 
		@endRefresh= "afterRefresh"
		:refreshTime="refreshDur" 
		@loadMore="LoadMore" 
		@refresh="Refresh">
		<view slot="content-list">
			<!-- 首页头部信息 -->
			<view class="my-flex my-flex-between my-margin-bottom-sm my-margin-top-ml">
				<!--头部日期信息-->
				<view class="my-flex my-flex-align-end">
					<view class="my-flex my-flex-col my-flex-align-end my-margin-left-mm my-margin-right-sm">
						<view class="text-xxl text-bold my-color-theme">{{todayWeek}}</view>
						<view class="my-text-font-m my-color-gray-1">星期</view>
					</view>
					<u-line direction="col" length="70rpx" margin="1rpx 0rpx 1rpx 0rpx"></u-line>
					<view class="my-flex my-flex-col  my-margin-left-sm my-margin-right-mm">
						<view class="text-xxl text-bold my-color-theme">{{this.todayDate}}</view>
						<view class="my-text-font-m my-color-gray-1">{{this.todayMonth}}月</view>
					</view>
				</view>
				<!--end 头部日期信息-->

				<!--头部头像-->
				<view class="my-flex my-margin-right-mm">
					<view class="my-radius-all-100rpx my-border-width-sm my-border-solid my-border-color-theme">
						<u-image shape="circle" :width="headPicWidth" :height="headPicHeight" :src="myPicUrl"></u-image>
					</view>
					<view class="my-radius-all-100rpx my-border-width-sm my-border-solid my-border-color-gray3">
						<u-image shape="circle" :width="headPicWidth" :height="headPicHeight" :src="loverPicUrl"></u-image>
					</view>
				</view>
			</view>
			<!--end 头部头像-->

			<u-line></u-line>
			<!-- end 首页头部信息 -->


			<!-- 首页主卡片 -->
			<view class="my-margin-top-s my-height-900rpx">
				<swiper class="my-height-900rpx" @change="mainCardSwiperChange">
					<swiper-item v-for="(listItem,listIndex) in mainCardList" :key="listIndex">

							<!--  主卡片是图片类型-->
							<view v-if="listItem.CardMediaType == 1 ? true : false">
								<u-image height="500rpx" mode="aspectFit" :src="listItem.HomeImgUrl"></u-image>
							</view>

							<!--主卡片是音频类型-->
							<view v-if="listItem.CardMediaType == 2 ? true : false">
								<view class="my-margin-auto my-width-300rpx my-height-300rpx my-margin-top-ml">
									<ex-my-audio :audioData="listItem"></ex-my-audio>
								</view>
								<view class="my-width-50rpx my-height-120rpx my-position-absolute my-position-top-320rpx my-position-left-50rpx">
									<text class=" my-text-font-ml my-color-gray-1 my-text-font-bold">音</text>
									
									<view class="my-margin-top-sm">
										<u-line color="#8799a3" length="630rpx"></u-line>
									</view>
									
									<view class="my-margin-top-sm">
										<text class=" my-text-font-ml my-color-gray-2 my-text-font-bold">乐</text>
									</view>
								</view>
								<view class="my-width-400rpx my-position-absolute my-position-top-450rpx my-position-left-150rpx">
									<text class="my-text-font-mm my-text-font-500">{{listItem.Title}}</text>
								</view>
								
								<view class="my-width-400rpx my-position-absolute my-position-top-500rpx my-position-left-200rpx">
									<text class="my-text-font-sl my-text-font-100 my-color-gray-1">{{listItem.Content}}</text>
								</view>
							</view>
					</swiper-item>
				</swiper>
				<u-line></u-line>
			</view>
			<!-- end 首页主卡片 -->
			<!-- 主页广告信息 -->
			<view id="adView">

				<view v-for="(adItem,adIndex) in adCardList">
					<view class="my-margin-top-ls">
						<my-mask-image :ImgType="adItem.ImgType" :ImgUrl = "adItem.HomeImgUrl" :Title="adItem.Title" :Content="adItem.Content" :TypeDesc="adItem.TypeDesc"></my-mask-image>
					</view>
				</view>
			</view>
			</view>
		</my-load-refresh>
		
		<!-- end 主页广告信息 -->

		<view @tap="hoverMenuHandle" v-model="iconRotation" v-if="showMenu">
			<my-hover-menu width="90" height="90" :show="false" :bottom="200" :Rotation="iconRotation"></my-hover-menu>
		</view>


	</view>
</template>

<script>
	import uniPopUp from '../../components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopUp,
		},

		created: function() {
			this.GetConfig();
			
			//计算当前日期
			this.nowDate = new Date().toISOString().slice(0, 10);
			this.todayWeek = this.GetWeekDay();
			this.todayDate = this.GetDateDay();
			this.todayMonth = this.GetMonthDay();
			//获取用户信息
			this.GetUserInfo();
			//加载首页卡片
			this.LoadHomeCard();
			
		},
		
		mounted:function(){
			//this.GetHomeMainCardList()
		},

		data() {
			return {
				//刷新
				currentPage:1,
				refreshDur:1000,
				endRefresh:false,
				tmpMainCardList:[],
				tmpAdCardList:[],
				//头部信息
				headPicWidth: 100,
				headPicHeight: 100,
				myPicUrl: "../../static/images/1.jpg",
				loverPicUrl: "../../static/images/8.jpg",
				nowDate: "20200912",
				todayWeek: "",
				todayDate: "",
				todayMonth: "",
				detailUrl: "./homeDetail",
				//广告图片列表
				//mainCardList:[],
				mainCardList: [{
						AudioFileUrl: "http://app.tiantai.com.cn/uploads/20200819/a25100936ec5d372c6805e5b476dbd59.mp3",
						AudioLength: "02:49",
						HomeImgUrl: "http://app.tiantai.com.cn/uploads/20200818/7f62a7cc3ca42c3e0fb130e79aa8cb9f.jpg",
						CardMediaType: 2,
						Title: "第一个广告",
						Content: "第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述",
						TypeDesc: "第一个广告的主题",
						detailData: "http://localhost/1/2/3.html",
						ImgType:5,
					},
					{
						HomeImgUrl: "http://app.tiantai.com.cn/uploads/20200818/7f62a7cc3ca42c3e0fb130e79aa8cb9f.jpg",
						CardMediaType: 1,
						Title: "个广告第二个个广告第二个个广告第二个",
						Content: "第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述",
						TypeDesc: "第二个广告的主题",
						ImgType:3,
						detailData: "http://localhost/1/2/3.html"
					}],
				adCardGetCount:0,
				adTotalCount:100,
				currentAdCardIndex:0,
				//adCardList:[],
				adCardList:[{
						AudioFileUrl: "http://app.tiantai.com.cn/uploads/20200819/a25100936ec5d372c6805e5b476dbd59.mp3",
						AudioLength: "02:49",
						HomeImgUrl: "http://app.tiantai.com.cn/uploads/20200818/7f62a7cc3ca42c3e0fb130e79aa8cb9f.jpg",
						CardMediaType: 1,
						Title: "第一个广告",
						Content: "第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述第一个广告的描述",
						TypeDesc: "第一个广告的主题",
						detailData: "http://localhost/1/2/3.html",
						ImgType:5,
					},
					{
						HomeImgUrl: "http://app.tiantai.com.cn/uploads/20200818/7f62a7cc3ca42c3e0fb130e79aa8cb9f.jpg",
						MediaType: 0,
						Title: "个广告第二个个广告第二个个广告第二个",
						Content: "第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述第二个广告的描述",
						TypeDesc: "第二个广告的主题",
						ImgType:3,
						detailData: "http://localhost/1/2/3.html"
					},
					{
						HomeImgUrl: "../../static/images/4.jpg",
						Title: "第三个广告第三个广告第三个广告第三个广告第三个广告第三个广告",
						Content: "第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述第三个广告的描述",
						TypeDesc: "第三个广告的主题",
						ImgType:4
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
			GetConfig:function(){
				let _this = this;
				_this.refreshDur = _this.$config.refreshDur;
			},
			
			//启动时加载用户信息
			GetUserInfo:function(){
				let _this = this;
				let userInfo = _this.$common.getUserInfo();
				_this.myPicUrl = userInfo.Sculpture;
				_this.loverPicUrl = userInfo.Sculpture;
				if(_this.$common.isEmpty(_this.myPicUrl)){
					_this.myPicUrl = _this.$common.getRandImg();
				}
				if(_this.$common.isEmpty(_this.loverPicUrl)){
					_this.myPicUrl = _this.$common.getRandImg();
				}
			},
			
			//启动时加载主页卡片
			LoadHomeCard:function(){
				let _this = this;
				_this.GetCardData(1);
				setTimeout(()=>{
					_this.afterRefresh()
					},1000);
			},
			
			//刷新
			Refresh:function(){
				let _this = this;
				_this.tmpMainCardList = [];
				_this.tmpAdCardList = [];
				_this.GetCardData(1);
				_this.GetUserInfo();
			},
			
			//加载更多
			LoadMore:function(){
				let _this = this;
				_this.tmpMainCardList = [];
				_this.tmpAdCardList = [];
				_this.GetCardData(2);
			},
			
			//请求服务器，获取首页卡片列表数据
			GetCardData:function(type){
				let _this = this;
				/* type 1代表下拉刷新 2代表加载更多 */
				setTimeout(()=>{
					if(type == 1){
						//请求服务器获取数据到tmpMainCardList
						_this.GetHomeMainCardList()
						
						//请求服务器获取Ad列表数据到tmpAdCardList
						var param={
							"startIndex":0,
							"endIndex":_this.$config.reqHomeCardCount,
						};
						_this.GetAdCardList(param)
					}else if(type == 2){
						//加载更多
						var endIndex = _this.currentAdCardIndex + _this.$config.reqHomeCardCount;
						var param={
							"startIndex":_this.currentAdCardIndex,
							"endIndex":endIndex,
						};
						_this.GetAdCardList(param);
						
						//处理加载更多得到的数据
						setTimeout(()=>{
							if(_this.tmpAdCardList.length <= 0){
								_this.adTotalCount = 0;
							}else{
								_this.adCardList = _this.adCardList.concat(_this.tmpAdCardList);
								_this.currentAdCardIndex += _this.tmpAdCardList.length;
							}
							_this.$refs.loadRefresh.loadOver(_this.currentAdCardIndex, _this.adTotalCount);
						},500);
					}
				},50);
			},
			
			//刷新动画完成后填充从服务器获取的数据
			afterRefresh:function(){
				let _this = this;
				if(_this.tmpMainCardList.length <= 0){
					uni.showToast({
						title: "请求主卡片失败，请重试",
						icon: 'none',
						duration: 2000,
					});
				}else{
					_this.mainCardList = _this.tmpMainCardList;
				}
				if(_this.tmpAdCardList.length <= 0){
					uni.showToast({
						title: "请求流式卡片失败，请重试",
						icon: 'none',
						duration: 2000,
					});
				}else{
					_this.adCardList = _this.tmpAdCardList;
					_this.currentAdCardIndex = _this.tmpAdCardList.length;
				}
			},
			
			//获取HomeMainCard
			async GetHomeMainCardList() {
				var _this = this
				_this.$api.getHomeMainCard("", res => {
					if (res.data.content) {
						_this.tmpMainCardList = [].concat(res.data.content.MainCardInfo);
					}
				},_this.$config.reqTimeout)
			},
			
			//获取AdCardList
			async GetAdCardList(param) {
				var _this = this
				_this.$api.getCardByIndex(param, res => {
					if (res.data.content) {
						_this.tmpAdCardList = res.data.content.AdCardList;
						_this.adCardGetCount = res.data.content.Count;
						_this.adTotalCount = res.data.content.totalCount;
					}
				},_this.$config.reqTimeout)
			},

			//获取今天星期几
			GetWeekDay: function() {
				var a = new Array("日", "一", "二", "三", "四", "五", "六");
				var week = new Date().getDay();
				return a[week];
			},

			//获取日期
			GetDateDay: function() {
				var date = new Date();
				var tDay = date.getDate();

				if (tDay.toString().length == 1) {
					tDay = "0" + tDay;
				}
				return tDay;
			},

			//获取月份
			GetMonthDay: function() {
				var aMonth = new Array("一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二");
				var myDate = new Date();
				var tMonth = myDate.getMonth();
				return aMonth[tMonth];
			},

			//主卡片滑动变换时
			mainCardSwiperChange:function(e){
				let _this = this;
				let curIndex = e.detail.current;
				
			},

			navToDetail: function(url, paramData) {
				uni.navigateTo({
					url: url,
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
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: paramData
						})
					}
				})
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
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		// margin-left: 30rpx;
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
