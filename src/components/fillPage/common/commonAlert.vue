
<template>
    <span>
        <div id="protocol-desc" class="popup">
            <div class="content">
                <slot name='content'></slot>
                <!-- DSF continues to focus on ensuring that children and adults with learning disabilities are supported adequately and appropriately, and that all students are provided with the opportunity to achieve their potential. In addition it provides advice and support to families and educators on successful literacy acquisition, evidence-based practice, and the strategies most likely to improve literacy outcomes for all students. Our role includes supporting and advising students, adults and families directly, as well as indirectly through the support and advice provided at a school or employment level. -->
            </div>
            <a class="popup-close" @click="popupClose" href="JavaScript:;"></a>
        </div>
        <!-- <div class="popMask" v-if='showMask'></div>  -->
    </span>
</template>

<script>
export default {
    name: 'modal',
    data() {
        return {
        };
    },
    props: [],
    computed: {
        
    },
    methods: {
        popupClose: function() {
            this.$store.commit('newProtocolFlag', false);
            this.$store.commit('newSorryBuyFlag', false);
            this.$store.commit('newSorryCard', false);
            this.$store.commit('newSorryWait', false);
            this.$store.commit('newSorryOvertime', false);
            this.$store.commit('newSorryTryagain', false);
            this.$store.commit('newShowMask', false);
        }
    }
};
</script>

<style lang="scss" scoped>
.popMask {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 1001;
	background: rgba(0, 0, 0, .7);
}
.popup {
    width: 100%;
    padding: 0 12px;
    background-color: transparent;
    z-index: 1003;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .content {
        background-color: #fff;
        padding-bottom: 20px;
        border-radius: 5px;
        position: relative;
    }
    .popup-close {
        display: block;
        position: absolute;
        bottom: -56px;
        left: 50%;
        margin-left: -13px;
        width: 26PX;
        height: 26PX;
        background: url(../../../assets/closeImg.png) no-repeat;
        background-size: 26PX;
    }
}
</style>    
