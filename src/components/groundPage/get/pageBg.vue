<template id="bgContainer">
	<div>
		<div class='bg-container' v-show='radioSwitchBg=="0"'>
	
		</div>
		<div class='bg-container' v-show='radioSwitchBg=="1"' :style='{backgroundColor:page_color}'>
	
		</div>
		<div class='bg-container' v-show='radioSwitchBg=="2"' :style='{backgroundImage:"url("+bgImgUrl+")"}'>
	
		</div>
	</div>
</template>

<script>
import { Config } from '../../common/api';
export default {
	name: 'bgContainer',
	data() {
		return {
		};
	},
	watch: {
	},
	methods: {
	},
	computed: {
		radioSwitchBg() {
			if (this.$store.state.background.radioSwitchBg) {
				return this.$store.state.background.radioSwitchBg;
			}
		},
		page_color() {
			if (this.$store.state.background.page_color) {
				return this.$store.state.background.page_color;
			}
		},
		bgImgUrl() {
			if (this.$store.state.background.bgImgUrl) {
				let image_url = this.$store.state.background.bgImgUrl.replace(/\\/g, '\\\\')
				return Config.image_url + image_url;
			} else {
				return '';
			}
		}
	}
};
</script>

<style scoped>
.bg-container {
	position: absolute;
	right: 0;
	left: 0;
	top: 0;
	bottom: 0;
	z-index: -1;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center center;
}
</style>
