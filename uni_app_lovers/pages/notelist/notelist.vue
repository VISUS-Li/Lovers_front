<template>
	<view class="content">
		<!--导航栏，uview组件，采用esaymode方式导入-->
		<u-navbar :back-icon-name="backIconName" :back-icon-color="backIconColor" :isFixed="navIsFixed" :background="navBackColor":back-icon-size="navBackIconSize" 
		 :title="navTitle" :title-color="navTitleColor" :title-size="navTitleSize"
		 :back-text="navBackText" :back-text-style="navBackTextStyle"></u-navbar>
		 <u-collapse  :head-style="collapseStyle">
		 	<u-collapse-item :open="collapseItem.show" :index="collapseIndex" :title="collapseItem.head" v-for="(collapseItem, collapseIndex) in collapseList" :key="collapseIndex">
		 		<u-cell-group >
					<u-cell-item v-if="listItem.status == collapseItem.caseFlag" v-for = "(listItem,listIndex) in caseList" :index="listIndex" @click="cellItemClickHandle" 
					 :arrow='true' :title="listItem.title" :icon="listItem.leftImg">
						
					</u-cell-item>
				</u-cell-group>
		 	</u-collapse-item>
		 </u-collapse>
		 
		 <!-- <view class="addButton">
			 <u-icon class="addButtonIcon" name="close" size="70" color="#fff" ></u-icon>
		 </view> -->
		 <view @touchstart="openMenu" v-model="iconRotation">
		 <sa-hover-menu :show="false" :bottom="200" :Rotation="iconRotation"></sa-hover-menu>
		 </view>
		 <u-popup border-radius="10" v-model="upPopShow"
			:mode=bottom 
		 	length="50%" :mask="true"
		 	:closeable="true"
		 	:close-icon-pos="closeIconPos"
		 ></u-popup>
	</view>
</template>

<script>
	import hoverMenu from "../../components/sa-hover-menu/sa-hover-menu.vue"
	export default {
		components: {

		},
		data() {
			return {
				
				//标题栏相关参数
				backIconName: "close",
				backIconColor: "#000",
				navIsFixed: true,
				navBackColor: {
					// 'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
					background:'rgba(255,255,255,0)'
				},
				navBackIconSize: 20,
				navTitle: "",
				navTitleColor:"#007AFF",
				navTitleSize:30,
				navBackText:"事件清单",
				navBackTextStyle:{
					color:"#000",
					width:"150rpx",
					"margin-left":"20rpx",
					"margin-top":"10rpx"
				},
				
				//事件清单折叠菜单数据
				collapseList: [{
					head: "· 未完成",
					caseFlag:false,
					show: true,
				}, {
					head: "· 已完成",
					caseFlag:true,
					show: false,
				}],
				collapseStyle:{
					"color":"#007aff",
					"font-size":"40rpx",
					"font-weight":"bold",
					"margin-left":"30rpx"
				},
				
				caseList:[{
					"title":"一起做飞机",
					"leftImg":"close",
					"abstract":"想和你一起做飞机环游世界",
					"status":false //完成状态，true已完成,false未完成
				},
				{
					"title":"一起做做爱做的事",
					"leftImg":"close",
					"abstract":"想和你一起做爱",
					"status":true //完成状态，true已完成,false未完成
				}],
				
				//悬浮菜单
				iconRotation:45,
				upPopShow:false,
			}
		},
		methods: {
				cellItemClickHandle(index){
					var path = "/pages/notelist/noteItem";
					this.$u.route({
						url: path,
						params:{
							index:index
						}
					})
				},
				
				openMenu:function(e){
					console.log("打开按钮");
					this.iconRotation = 0;
					this.upPopShow = true;
				}
		}

	}
</script>

<style>
	@import "../../common/css/common.css";
	.addButton{
		width: 120rpx;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		background-color: #DD524D;
		border-radius: 60rpx;
		box-shadow: 5rpx 5rpx 5rpx #909090;
	}
	.addButtonIcon{
		
	}
</style>
