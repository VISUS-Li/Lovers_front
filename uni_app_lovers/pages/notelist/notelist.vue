<template>
<u-navbar ></u-navbar>
</template>

<script>
	import navBar from "../../components/third-common/zhouWei-navBar/index.vue";
	//import ssNavBar from "../../components/third-common/ss-navbar/ss-navbar.vue";
	export default {
		components: {
			navBar,
			//ssNavBar
		},
		data() {
			return {
				currentIndex: 0,

				navArr: [{
					title: '待完成',
					url: '1'
				}, {
					title: '已完成',
					url: '1'
				}]
			}
		},
		methods: {
			navbarTapHandler(index) {
				this.currentIndex = index;
				var obj = this.navArr[index];
			}
		}

	}
</script>

<style>
	@import "../../static/css/common.css";
	.nav-bar{
		height: 100rpx;
		width: 85%;
	}
</style>
