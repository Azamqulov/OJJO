<template >
    <section class="video_blog">
        <Title :sub_title="subTitle" :title="title" />

        <div class="container">
            <div class="wrapper">
                <videoCard
                 v-for="item in video_Blog"
                :key="item.id"
                :videoLink="item.video_Img" 
                :videoImg="item.allImg"
                @click="video_scr(item),isSwiper = item.swiper_Img" />
            </div>
        </div>
    </section>
    <videoModal v-if="isSwiper" :swiperImg="isSwiper" :video="video_link" @isOpen="isSwiper = false" />
</template>
<script>
import videoBlog from '@/videoBlog.js';
import Title from '@/layouts/Title.vue';
import videoCard from '@/layouts/videoCard.vue';
import videoModal from './videoModal.vue';
export default {
    components: {
        Title,
        videoCard,
        videoModal,

    },

    data() {
        return {
            subTitle: '#ojjo_jewerly',
            title: 'Мы в социальных сетях',
            video_Blog: videoBlog,
            isSwiper: null,
            video_link: null,
            isOpen: true
        }
    },
    methods: {
        video_scr(item) {
            this.video_link = item.video_src
        }
    },
}
</script>
<style lang="scss">
@import '../../../assets/styles/components/_mixsin.scss';
@import '../../../assets/styles/components/_vars.scss';

.video_blog {
    .container {
        .wrapper {
            padding: 100px 0;
        }
    }
}
</style>