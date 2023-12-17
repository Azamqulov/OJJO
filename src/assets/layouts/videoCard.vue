<template>
    <div class="video_img">
        <img class="video_link" :src="videoLink" alt="">
        <div class="img">
            <img class="img" v-for="item in videoImg" :key="item" :src="item.img" alt="">

        </div>
    </div>
</template>
<script>

export default {

    props: {
        videoLink: String,
        videoImg: String
    }
}
</script>
<style lang="scss">
@import '../assets/styles/components/_mixsin.scss';
@import '../assets/styles/components/_vars.scss';

.video_img {
    display: flex;
    align-items: center;

    &:nth-child(2) {
        flex-direction: row-reverse;
    }

    @include md {
        &:nth-child(2) {
            flex-direction: column;
            display: flex !important;

        }
    }

    @include md {
        flex-direction: column;


    }

    .video_link {
        width: 700px;
        height: 390px;

        @include xxl {
            width: 600px;
            height: 300px;
        }

        @include xl {
            width: 505px;
            height: 250px;
        }

        @include lg {
            width: 485px;
            height: 250px;
        }

        @include md {
            width: 455px;
            height: 250px;
        }

        @include sm {
            width: 100%;
            height: 250px;
        }

        @include xs {
            height: 200px;
        }
    }
}

.img {
    display: flex !important;

    .img {
        width: 350px;
        height: 390px;

        @include xxl {
            width: 300px;
            height: 300px;
        }

        @include xl {
            width: 242px;
            height: 250px;
        }

        @include lg {
            width: 242px;
            height: 250px;
        }

        @include md {
            width: 228px;
            height: 200px;
            display: flex !important;

        }

        @include sm {
            width: 50%;
            height: 200px;
        }

        @include xs {
            height: 200px;
        }
    }

}</style>