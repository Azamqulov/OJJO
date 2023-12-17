<template>
    <section class="video-modal">
        <div class="modal-item">
            <div class="video-plyr">
                <vue-plyr>
                    <div>
                        <iframe :src="video"></iframe>
                        <!-- <iframe src="https://youtu.be/vTCHd_ir4Vo?t=6" frameborder="0"></iframe> -->
                    </div>
                </vue-plyr>
            </div>
            <!-- ----- -->
            <div class="modal-title">
                <h1 v-for=" item in videoTitle" :key="item.title">{{ item.title }}</h1>

            </div>

            <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'"
                :coverflowEffect="{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }" :pagination="true" :modules="modules" class="mySwiper">
                <swiper-slide v-for="item in swiperImg" :key="item">
                    <img :src="item.img" /> </swiper-slide>
            </swiper>
            <p>{{  }}</p>
            <!-- ----- -->

        </div>
        <div class="icon">
            <i class="fa-solid fa-x" @click="$emit('IsOpen')"></i>
        </div>
    </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import videoBlog from '@/videoBlog.js'; 
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
export default {
    props: {
        swiperImg: Array,
        video: String,
        
    },
    components: {
        Swiper,
        SwiperSlide,
        videoBlog
    },
    data() {
        return {
            videoTitle:videoBlog
        }
    },
    setup() {
        return {
            modules: [EffectCoverflow, Pagination],
        };
    },
};

</script>
<style lang="scss">
@import '../../../assets/styles/components/_mixsin.scss';
@import '../../../assets/styles/components/_vars.scss';



.swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;

    @include md {
        width: 200px;
        height: 200px;

    }
}

.swiper-slide img {
    display: block;
    width: 100%;
}


.video-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba($dark, $alpha: 0.9);
    z-index: 0545641651;
    overflow: scroll;
    padding: 50px 0;

.modal-title{
text-align: center;
padding: 10px 0 50px 0;
}

    .icon {
        position: fixed;
        top: 2%;
        right: 5%;
        width: 28px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid $white;
        padding: 0 5px 0 5px;
        cursor: pointer;

        .fa-solid.fa-x {
            font-size: 20px;
            color: $white;
        }
    }

    .modal-item {
        width: 1200px;
        margin: 0 auto;
        background: $white;
        flex-wrap: nowrap;

        @include xl {
            width: 900px;
        }

        @include lg {
            width: 800px;
        }

        @include md {
            width: 80%;
        }

        //         @include xl{
        //     width: 900px;
        // }
    }
}
</style>