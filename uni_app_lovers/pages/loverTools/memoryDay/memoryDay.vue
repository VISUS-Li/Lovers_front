<template>
	<view class="content">
		<!--导航栏，uview组件，采用esaymode方式导入-->
		<my-navbar navBackText="纪念日"></my-navbar>
		<!--end 导航栏，uview组件，采用esaymode方式导入-->
		<view v-for="(memoryItem,memoryIndex) in memoryList">
			<view class="margin-top-20">
			<my-mask-image imgType="2" :imgUrl="memoryItem.imgUrl"></my-mask-image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				memoryList: [{
						"title": "一起做飞机",
						"imgUrl": "../../../static/images/blackboard.png",
						"abstract": "想和你一起做飞机环游世界",
						"CreatedDate": "20200901",
						"status": false, //完成状态，true已完成,false未完成
					},
					{
						"title": "一起做做爱做的事",
						"imgUrl": "../../../static/images/alarm.png",
						"abstract": "想和你一起做爱",
						"CreatedDate": "20200901",
						"status": false //完成状态，true已完成,false未完成
					}
				]
			}
		}
	}
</script>

<style>
</style>
