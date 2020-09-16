<template>
	<view>
		<my-navbar navBackText="添加事件">
			<u-button @click="btnClick" data-name="3333" shape="circle" type="primary" :custom-style="okBntStyle">完成</u-button>
		</my-navbar>


		
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
					<view class="line">
						<u-line></u-line>
					</view>
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
								<u-icon name="arrow-right-double" color="#fff"></u-icon>
							</u-button>
						</view>
						<view class="line">
							<u-line></u-line>
						</view>
				</view>

			</view>
			
			<view class="formItem">
				<u-icon class="HeaderIcon" name="pushpin">
				</u-icon>
				<view class="itemRight">
					<view class="inputHeader">
						<view class="HeaderTextView">
							<text class="HeaderText">具体怎么做呢，描述一下吧</text>
						</view>
					</view>
					<view class="caseDesView">
						<u-input type="textarea"  placeholder="事件描述" />
					</view>
					<view class="line">
						<u-line></u-line>
					</view>
				</view>
			</view>
			
			<view class="formItem">
			<u-icon class="HeaderIcon" name="photo">
			</u-icon>
			<view class="itemRight">
				<view class="inputHeader">
					<view class="HeaderTextView">
						<text class="HeaderText">选择一张背景吧</text>
					</view>
				</view>
				
				<u-upload ref="uUpload" :show-upload-list="showUploadList" :action="action" :auto-upload="autoUpload" :file-list="fileList"
				:deletable="true" max-count=1 @on-list-change="onListChange">
					<view v-if="customBtn" slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="photo" size="60" :color="$u.color['lightColor']"></u-icon>
					</view>
				</u-upload>
			</view>
			</view>
			
			<u-calendar @change="selectDateHandle" v-model="dateSelectShow" :safe-area-inset-bottom="true" :min-date="calendarMinDate" :max-date="calendarMaxDate" active-bg-color="#EC971F">
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
				
				//选择日期
				dateBtnStyle:{
					width:"90rpx",
					height:"50rpx",
				},
				dateSelectShow:false,
				calendarMinDate:"",
				calendarMaxDate:"2050-01-01",
				
				//上传图片
				imgSrc:""
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
			},
			selectDateHandle:function(e){
				this.CaseDate = e.result;
			},
			selectImgHandle:function(e){
			}
		},
		onLoad() {
			this.CaseDate = new Date().toISOString().slice(0, 10);
			this.calendarMinDate = new Date().toISOString().slice(0,10);
		}
	}
</script>

<style>
	.formItem {
		display: flex;
		margin-top: 30rpx;
	}
	.line{
		width: 610rpx;
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
		width: 900rpx;
		height: 50rpx;
		padding-left: 30rpx;
		padding-top: 10rpx;
		margin: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.dateText{
		font-size:30rpx;
		font-weight: 900;
	}
	
	.caseDesView{
		width: 600rpx;
		padding-left: 10rpx;
	}
	
	.uploadImgView{
		padding-left: 10rpx;
		margin-top: 20rpx;
	}
</style>
