<template >
    <section class=" BlogPost">
        <div class="blockPost">
            <Title :sub_title="subTitle" :title="title" />

        </div>
        <div class="container">
            <div class="PostId">
                <img :src="postArray.img" alt="">
                <h3 class="title">{{ postArray.title }}</h3>
                <p class="text">{{ postArray.text }}</p>
                <Button @click="$router.push({ name: 'blog' })">Blog</Button>
            </div>
        </div>

    </section>
</template>
<script>
import Title from '@/layouts/Title.vue';
import Button from '@/layouts/Button.vue';
import BlogPost from '@/BlogPost.js';
export default {
    components: { Title, Button },
    data() {
        return {
            subTitle: 'JEWELLERY BLOG',
            title: 'Articles by Australian designer Simone Walsh',
            PostItem: this.$route.params.postId,
            Blog_Post: BlogPost
        }
    },
    computed: {
        postArray() {
            return this.Blog_Post.find(user => user.id === this.PostItem)
        }
    }
}
</script>
<style lang="scss">
@import '../../../assets/styles/components/_mixsin.scss';
@import '../../../assets/styles/components/_vars.scss';

.BlogPost {
    .blockPost {
        padding: 200px 0;
        background-image: url(https://simonewalsh.com/cdn/shop/files/banner-gold-jewellery-2022.jpg?v=1670496877&width=1600);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        object-fit: cover;
        color: $white;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba($dark, $alpha: 0.5);
        }
    }

    .container {
        .PostId {
            position: relative;
            z-index: 99999;
            width: 80%;
            margin: 100px auto;

            img {
                width: 100%;
                height: 70vh;
                object-fit: cover;
            }

            .title {
                padding: 30px 0;
                text-align: start;
            }

            .text {
                color: $dark;
                margin: 20px 0;
                text-align: justify;
                line-height: 1.7;
            }

        }
    }
}</style>