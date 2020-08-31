<template>
	<view>
		<nav-bar>事件清单</nav-bar>
		<ss-navbar :navArr="navArr" :tabCurrentIndex="currentIndex" @navbarTap="navbarTapHandler1">
		</ss-navbar>
	</view>
</template>

<script>
	import navBar from "../../components/third-common/zhouWei-navBar/index.vue";
	import ssNavBar from "../../components/third-common/ss-navbar/ss-navbar.vue";
	export default {
		components: {
			navBar,
			ssNavBar
		},
		data() {
			return {
				currentIndex: 0,

				navArr: [{
					title: '待完成',
					url: ''
				}, {
					title: '已完成',
					url: ''
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
</style>
