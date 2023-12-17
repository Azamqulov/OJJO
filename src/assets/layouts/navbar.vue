<template >
    <header class="header">
        <div class="navbar" >
            <div class="container">
                <ul class="menu " v-if="!isMobile">
                    <li class="menu-item" v-for="itm in menuAll" :key="itm.text">
                        <a :href="itm.link">{{ itm.text }}</a>
                    </li>
                </ul>
                <!-- logo -->
                <div class="logo" :class="{ active: isOpen }">
                    <img :src="logoImg" alt="" class="logo-img">
                </div>
                <!-- logo end -->
                <div class="action" v-if="!isMobile" >
                  <!-- ====== -->
                    <div class="search-bars " @click="$emit('isActive')">
                        <i class="fa-solid fa-search"></i>
                        <span>Поиск</span>
                    </div>
                    <!-- ------ -->
                  
                    <div class="bxod">
                        <span>Вход/Регистрация</span>
                    </div>
                    <!-- ------ -->
                  
                    <div class="icon">
                        <i class="fa-solid fa-user"></i>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </div>
                
                
                <!-- media -->
                
                
                <div :class="['burger-menu ', { active: isOpen }]">
                    <ul class="burger-box">
                        <li class="burger-item" v-for="itm in menuAll " :key="itm.text">
                            <a :href="itm.link" class="burger-link">{{ itm.text }}</a>
                        </li>
                    </ul>
                    
                    <!-- ======= -->
                    
                    <div class="burger-title">
                        <div class="burger-search_bar">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search ..." name="" id="">
                        </div>
                    
                    <!-- ======= -->

                        <div class="burger-act">
                            <i class="fas fa-user"></i>
                            <i class="fas fa-heart"></i>
                        </div>
                    </div>
                </div>

                <!-- --- -->
                <div class="burger" v-if="isMobile">
                    <div class="login">
                        <i class="fa fa-sign-in"></i>
                    </div>
                    <div class="bur-menu">
                        <i class="fa fa-bars" v-if="!isOpen" @click="isOpen = true"></i>
                        <i class="fa fa-times" v-if="isOpen" @click="isOpen = false"></i>
                    </div>
                </div>
            </div>
        </div>
        <HeaderBtn />
    </header>
</template>
<!--  -->
<script>
import HeaderBtn from './header-btn.vue'
export default {
    components: {
        HeaderBtn
    },

    data() {
        return {
            isMobile: false,
            isOpen: false,
            logoImg: require('../assets/images/logo/OJJO.png'),
            menuAll: [
                {
                    text: 'Контрагентам',
                    link: ''
                },
                {
                    text: 'Дизайнерам',
                    link: ''
                },
                {
                    text: 'Вакансии',
                    link: ''
                },

            ]
        }
    },
    methods: {
        mobileActive() {
            const WinWidth = window.innerWidth

            if (WinWidth < 970) {
                this.isMobile = true
                return
            }
            this.isMobile = false
        }
    },
    mounted() {
        this.mobileActive()
        window.addEventListener('resize', this.mobileActive)
    }
}
</script>
<style lang="scss">
@import '@/assets/styles/layouts/navbar.scss';
</style>