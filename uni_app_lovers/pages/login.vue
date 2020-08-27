<template>
	<view class="content">
		<view class="logo-group">
			<image id = "logoImg" src="../static/images/user-photo.png" mode="aspectFit"></image>
			<text id = "logoText">Lovers</text>
		</view>

		<view class = "input-row border">
			<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入账号"></m-input>
		</view>

	</view>

</template>

<script>
</script>

<style>
	@import "../css/mui.min.css";
	.logo-group{
		width: 350upx;
		height: 100upx;
		margin: auto;
		margin-top: 150upx;
		
	}

	#logoImg{
		width: 100upx;
		height: 100upx;
		float: left; 
		display: block;	
	}
	
	#logoText{
		font-size: 70upx;
		margin-left: 10px;
		float: left;
	}
</style>
