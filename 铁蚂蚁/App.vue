
<script>
export default {
	onLaunch: function(options) {
		// setFontSize();
		// 邀请码
		if(options.query.InvitationCode){
			uni.setStorageSync('InvitationCode',options.query.InvitationCode)
		}
	},
	onShow: function() {
		// console.log('App Show')
	},
	onHide: function() {
		// console.log('App Hide')
	}
}
</script>
<style>
	/*每个页面公共css */
	@import url('css/common.css');
	@import url('css/global.css');
	@import url('css/style.css');
    @import url('css/d_style.css');
</style>
