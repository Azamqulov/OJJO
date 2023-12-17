<template >
    <div class="brend" v-for="brend in brendLogo">
       <img :src="brend.img" alt=""> 
    </div>
</template>
<script>
import './header-btn.vue'
export default {
    data() {
        return {
            brendLogo:[
                {
                     img: require('../assets/images/logo/brands-item.png')
                },
                 {
                    img: require('../assets/images/logo/brands-item.png')
                },
                 {
                    img: require('../assets/images/logo/brands-item.png')
                },
                 {
                    img: require('../assets/images/logo/brands-item.png')
                },
                 {
                    img: require('../assets/images/logo/brands-item.png')
                }, {
                    img: require('../assets/images/logo/brands-item.png')
                },
            ]
        }
    },
}
</script>
<style lang="scss">
@import '../assets/styles/components/_mixsin.scss';
@import '../assets/styles/components/_vars.scss';


</style>