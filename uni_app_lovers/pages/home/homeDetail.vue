<template>
	<view>
		<jyf-parser :html="html" :domain="this.$WebDomain" lazy-load ref="article" selectable
		 show-with-animation use-anchor >加载中...</jyf-parser>
	</view>
</template>

<script>
	import jyfParser from '../../components/jyf-parser/jyf-parser';
	//const testHtml = require('./html.js');
	export default{
		components: {
			jyfParser
		},
		
		onLoad: function(option) {
		//通过emit和父页面通信
		   const eventChannel = this.getOpenerEventChannel()
		  // eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
		  // eventChannel.emit('someEvent', {data: 'test'});
		  
		  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
		  eventChannel.on('acceptDataFromOpenerPage', function(data) {
			this.html = "module.exports = `" + data + "`"
		    console.log(this.html)
		  })
		},
		data() {
			return {
				html: ""
			}
		},
		
	}
</script>

<style>
</style>
