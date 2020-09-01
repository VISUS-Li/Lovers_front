<template>
	<view class="content">
		<!--导航栏，uview组件，采用esaymode方式导入-->
		<u-navbar :back-icon-name="backIconName" :back-icon-color="backIconColor" :isFixed="navIsFixed" :background="navBackColor":back-icon-size="navBackIconSize" 
		 :title="navTitle" :title-color="navTitleColor" :title-size="navTitleSize"
		 :back-text="navBackText" :back-text-style="navBackTextStyle"></u-navbar>
		 <u-collapse  :head-style="collapseStyle">
		 	<u-collapse-item :open="item.show" :index="index" @change="itemChange" :title="item.head" v-for="(item, index) in collapseList" :key="index">
		 		<u-cell-group title="读万卷书">
					<u-cell-item center :is-link="true" :label="label" value="铁马冰河入梦来" i ndex="index" @click="click" :hover-class="hoverClass"
					 :arrow="arrow" :title="title" :icon="icon">
						<u-badge :absolute="false" v-if="rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
						<u-switch v-if="rightSlot == 'switch'" slot="right-icon" v-model="checked"></u-switch>
					</u-cell-item>
					<u-cell-item :border-bottom="false" value="" title="铁马冰河入梦来" value="行万里路" :arrow="false">
						<u-icon slot="icon" size="34" name="calendar" style="margin-right: 5px;"></u-icon>
						<u-icon slot="right-icon" size="34" name="calendar"></u-icon>
						<u-field slot="value"></u-field>
					</u-cell-item>
				</u-cell-group>
		 	</u-collapse-item>
		 </u-collapse>
		 
	</view>
</template>

<script>
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
				
				//时间清单折叠菜单数据
				collapseList: [{
					head: "· 未完成",
					show: true,
				}, {
					head: "· 已完成",
					show: false,
				}],
				collapseStyle:{
					"color":"#007aff",
					"font-size":"40rpx",
					"font-weight":"bold",
					"margin-left":"30rpx"
				}
			}
		},
		methods: {

		}

	}
</script>

<style>
	@import "../../static/css/common.css";

	.nav-bar {
		height: 100rpx;
		width: 85%;
	}
</style>
