<template>
	<view class="content">
		<!--导航栏，uview组件，采用esaymode方式导入-->
		<my-navbar navBackText="事件列表"></my-navbar>
		<!--end 导航栏，uview组件，采用esaymode方式导入-->

		<!-- 已创建事件搜索框 -->
		<view class="mainSearch">
			<u-search v-model="MainSearchValue" placeholder="请输入事件名" @change="MainSearchChange" @search="MainSearchChange"
			 :clearabled="true" :show-action="false" @clear="MainSearchClear" :input-style="MainSearchStyle"></u-search>
		</view>
		<!-- end 已创建事件搜索框 -->


		<!--collapse列表-->
		<u-collapse :head-style="collapseStyle">
			<u-collapse-item :open="collapseItem.show" :index="collapseIndex" :title="collapseItem.head" v-for="(collapseItem, collapseIndex) in collapseList"
			 :key="collapseIndex">
			 <!-- 以前是列表，现在采用卡片形式 -->
				<!-- <u-cell-group>
					<u-cell-item v-if="listItem.status == collapseItem.caseFlag" v-for="(listItem,listIndex) in caseList" :index="listIndex"
					 @tap="cellItemClickHandle(listIndex)" :arrow='true' :title="listItem.title" :icon="listItem.leftImg">

					</u-cell-item>
				</u-cell-group> -->
				
				<u-cell-group>
					<u-cell-item v-if = "listItem.status == collapseItem.caseFlag" v-for="(listItem, listIndex) in caseList" :index="listIndex"
					 :arrow="false" :title-style="cellStyle">
						<view class="imgView">
							<u-image class="caseImg" :src="listItem.imgUrl" :width="imgWidth" :height="imgHeigh"  ></u-image>
							<view class="imgMask">
								<view class="maskTextView">
									<text class="maskText Title">aaaaaaaa</text>
									<text class="maskText Desc">bbbbb</text>
									<text calss="maskText Date">20200901</text>
								</view>
							</view>
						</view>
					</u-cell-item>
				</u-cell-group>
			</u-collapse-item>
		</u-collapse>
		<!--end collapse列表-->

		<!--悬浮菜单-->
		<view @tap="openMenu" v-model="iconRotation" v-if="showMenu">
			<my-hover-menu :show="false" :bottom="200" :Rotation="iconRotation"></my-hover-menu>
		</view>
		<!--end 悬浮菜单-->

		<!--下方弹出层-->
		<u-popup class="upPopView" border-radius="10" v-model="upPopShow" @close="upPopClose" @open="upPopOpen" mode="bottom"
		 length="50%" :mask="true" :closeable="false">

			<view class="upPopHead">
				<text class="upPopHeadText">随便看看</text>
				<u-icon class="upPopIcon" name="plus" color="#EC971F" size="50" @tap="addNewCase"></u-icon>
			</view>

			<u-cell-group>
				<u-cell-item :border-bottom="true"  v-for="(listItem,listIndex) in preCaseList" :index="listIndex" @click="preCaseItemClickHandle" 
				 :title="listItem.title" :icon="listItem.leftImg" :value="listItem.added == true ? '已添加':'添加'" 
				 :arrow= "listItem.added == true ? false:true" :value-style="rightTextStyle" :bg-color="backgroundColor">

				</u-cell-item>
			</u-cell-group>
		</u-popup>
		<!--end 下方弹出层-->
	</view>
</template>

<script>
	export default {

		onLoad() {
			this.doTmp();
		},
		data() {
			return {

				userId:'',
				startIndex:0,
				endIndex:10,
				//标题栏相关参数
				backIconName: "close",
				backIconColor: "#000",
				navIsFixed: true,
				navBackColor: {
					// 'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
					background: 'rgba(255,255,255,0)'
				},
				navBackIconSize: 20,
				navTitle: "",
				navTitleColor: "#007AFF",
				navTitleSize: 30,
				navBackText: "事件清单",
				navBackTextStyle: {
					color: "#000",
					width: "150rpx",
					"margin-left": "20rpx",
					"margin-top": "10rpx"
				},

				//已创建事件搜索框相关参数
				MainSearchValue: "",
				MainSearchStyle: {
					"margin-left": "50rpx"
				},

				//事件清单折叠菜单数据
				collapseList: [{
					head: "· 未完成",
					caseFlag: false,
					show: true,
				}, {
					head: "· 已完成",
					caseFlag: true,
					show: false,
				}],
				collapseStyle: {
					"color": "#007aff",
					"font-size": "40rpx",
					"font-weight": "bold",
					"margin-left": "30rpx"
				},

				caseList: [{
						"title": "一起做飞机",
						"imgUrl":"../../static/images/blackboard.png",
						"abstract": "想和你一起做飞机环游世界",
						"CreatedDate":"20200901",
						"status": false ,//完成状态，true已完成,false未完成
					},
					{
						"title": "一起做做爱做的事",
						"imgUrl":"../../static/images/alarm.png",
						"abstract": "想和你一起做爱",
						"CreatedDate":"20200901",
						"status": false //完成状态，true已完成,false未完成
					}
				],
				
				cellStyle:{
					height:"610rpx",
					width:"0rpx"
				},

				imgWidth:"600rpx",
				imgHeigh:"600rpx",
				imgMaskStyle:{
					width:this.imgWidth,
					height:this.imgHeigh
				},
				//悬浮菜单
				iconRotation: 45,
				showMenu: true, //显示悬浮菜单
				upPopShow: false, //显示弹出框

				preCaseList: [{
					"title": "一起做飞机",
					"leftImg": "plus",
					"abstract": "想和你一起做飞机环游世界",
					"added": true,
					backgroundColor:"#007aff",
					"rightTextStyle":{
						"color":"#007aff"
					},
				},
				]
			}
		},
		methods: {

			//已创建事件的搜索框相关事件
			MainSearchChange: function(e) {

			},
			MainSearchClear: function(e) {

			},


			//事件清单点击每项事件，跳转页面
			imgDetailHandle:function(index){
				var path = "/pages/notelist/noteItem";
				this.$u.route({
					url: path,
					params: {
						index: index
					}
				})
			},

			//悬浮菜单相关事件
			openMenu: function(e) {
				this.iconRotation = 0;
				this.upPopShow = true;
			},
			upPopClose: function() {
				this.iconRotation = 45;
				this.upPopShow = false;
				this.showMenu = true;
			},
			upPopOpen: function() {
				this.showMenu = false;

			},
			
			//弹出框相关事件
			preCaseItemClickHandle:function(index){
				var path = "/pages/notelist/addNote";
				this.$u.route({
					url: path,
					params: {
						index: index,
					}
				})
			},
			
			addNewCase:function(){
				var path = "/pages/notelist/addNote";
				this.$u.route({
					url: path,
				})
			},
			
			
			//获取事件列表
			doGetCaseList:function(){
				uni.request({
					url: _this.websiteUrl + '/api/client/notelist/getNotelist',
					data: {
						'UserID':this.userId,
						'CaseStartIndex':this.startIndex,
						'CaseEndIndex':this.endIndex
					},
					method: 'GET',
					success: (res) => {
						if (res.data.code == 1000) {
							for(var i in res.data.data.CaseList){
								var caseItem = {
									title: res.data.data.CaseList[i].title,
									imgUrl:res.data.data.CaseList[i].imgUrl,
									abstract: res.data.data.CaseList[i].abstract,
									createdDate:res.data.data.CaseList[i].createdDate,
									status:res.data.data.CaseList[i].status
								}
								this.caseList.push(caseItem);
							}
						} else {
							var error = res.data.data.Error;
							
							return false;
						}
					},
					fail() {
						uni.reLaunch({
							url:'index/index?id=1'
						})
					}
				});
			},
			doTmp:function(){
				var res = {
					data:
						[{
								"title": "一起做飞机",
								"imgUrl":"../../static/images/blackboard.png",
								"abstract": "想和你一起做飞机环游世界",
								"CreatedDate":"20200901",
								"status": false ,//完成状态，true已完成,false未完成
							},
							{
								"title": "一起做做爱做的事",
								"imgUrl":"../../static/images/alarm.png",
								"abstract": "想和你一起做爱",
								"CreatedDate":"20200901",
								"status": false //完成状态，true已完成,false未完成
							}
						]
				};
				for(var i in res.data){
					console.log(res.data[i]);
					console.log(res.data[i].title);
				}
			}
		}

	}
</script>

<style>
	@import "../../common/css/common.css";

	//搜索框样式
	.mainSearch {
		margin-left: 50rpx;
		margin-right: 50rpx;
		margin-top: 15rpx;
		margin-bottom: 15rpx;
	}

	.addButton {
		width: 120rpx;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		background-color: #DD524D;
		border-radius: 60rpx;
		box-shadow: 5rpx 5rpx 5rpx #909090;
	}

	.addButtonIcon {}

	.imgView{
		width: 600rpx;
		height: 600rpx; 
		margin: auto; 
	}
	.imgMask{
		width: 600rpx;
		height: 590rpx;
		position: absolute;
		background-color: rgba(0,0,0,0.25);
		margin-top: 6rpx;
		z-index: 100;
	}
	
	.maskTextView{
		width: 600rpx;
		height: 600rpx;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
	}
	.maskText{
		color: #FFFFFF;
	}
	.caseImg{
		position: absolute;
		z-index: 1;
	}

	//下方弹出框相关样式
	.upPopView {
		display: flex;
	}

	//下方弹出框头部
	.upPopHead {
		display: flex;
		justify-content: space-between;
		margin-top: 15rpx;
	}

	.upPopHeadText {
		margin-left: 30rpx;
		padding-top: 5rpx;
		font-size: 30rpx;
		color: #EC971F;
	}

	//下方弹出框添加按钮
	.upPopIcon {
		margin-right: 20rpx;
	}
</style>
