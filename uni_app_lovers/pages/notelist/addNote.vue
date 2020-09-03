<template>
	<view>
		<u-navbar :back-icon-name="backIconName" :back-icon-color="backIconColor" :isFixed="navIsFixed" :background="navBackColor"
		 :back-icon-size="navBackIconSize" :title="navTitle" :title-color="navTitleColor" :title-size="navTitleSize"
		 :back-text="navBackText" :back-text-style="navBackTextStyle">
			<u-button @click="btnClick" data-name="3333" shape="circle" type="primary" :custom-style="okBntStyle">完成</u-button>
		</u-navbar>


		
			<view class="formItem">
				<u-icon class="HeaderIcon" name="bag">
				</u-icon>
				<view class="itemRight">
					<view class="inputHeader">
						<view class="HeaderTextView">
							<text class="HeaderText">一起做些什么好呢</text>
						</view>
					</view>
					<u-field
						placeholder="事件名称"
						:clearable="false"
						class="formItemContext"
						label-width="0"
						:border-bottom="true"
						:field-style = "fieldStyle"
					>
					</u-field>
					<u-line class="line"></u-line>
				</view>
			</view>

			<view class="formItem">
				<u-icon class="HeaderIcon" name="clock">
				</u-icon>
				<view class="itemRight">
					<view class="inputHeader">
						<view class="HeaderTextView">
							<text class="HeaderText">在这之前搞定它吧</text>
						</view>
					</view>
						<view class="dateSection">
							<view class="dateText">{{CaseDate}}</view>
							<u-button @click="dateBtnClick" data-name="3333" shape="circle" type="primary" :custom-style="dateBtnStyle">
								<u-icon name="close" color="#fff"></u-icon>
							</u-button>
						</view>
				</view>
			</view>
			
			<u-calendar v-model="dateSelectShow" >
			</u-calendar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

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
				navBackText: "添加事件",
				navBackTextStyle: {
					color: "#000",
					width: "150rpx",
					"margin-left": "20rpx",
					"margin-top": "10rpx"
				},
				okBntStyle: {
					"width": "140rpx",
					"height": "50rpx",
					"font-size": "30rpx",
					"color": "#fff",
					left: "140rpx"
				},
				
				//输入框自定义样式
				fieldStyle:{
				},
				CaseDate:"",
				
				dateBtnStyle:{
					width:"100rpx",
					height:"50rpx",
				},
				dateSelectShow:false
			}
		},
		
		computed:{
			selectedDate:{
				get:function(){
					
				},
				set:function(newDate){
					this.CaseDate = newDate;
				}
			}
		},
		
		methods:{
			dateBtnClick:function(){
				this.dateSelectShow = true;
			}
		},
		onLoad() {
			this.CaseDate = new Date().toISOString().slice(0, 10);
		}
	}
</script>

<style>
	.formItem {
		display: flex;
		margin-top: 30rpx;
	}
	.line{
	}
	
	.itemRight {
		width: 100%;
	}

	.inputHeader {
		margin-top: 20rpx;
		display: flex;
	}

	.formItem .HeaderIcon {
		height: 50rpx;
		width: 35rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
		margin-right: 10rpx;
		background-color: "";
		padding-left: 5rpx;
		padding-right: 7rpx;
		color: #EC971F;
	}

	.inputHeader .HeaderTextView {
		width: 400rpx;
		height: 50rpx;
		margin: 0rpx;
		margin-left: 10rpx;
		background-color: #EC971F;
		display: flex;
		justify-content: start;
		align-items: center;
	}

	.inputHeader .HeaderText {
		font-size: 30rpx;
		margin-left: 30rpx;
		font-weight: 900;
		color: #FFFFFF;
	}

	.formItemContext {
		margin-left: 10rpx;
	}
	
	.dateSection{
		width: 850rpx;
		height: 50rpx;
		padding-left: 30rpx;
		padding-top: 10rpx;
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

</style>
