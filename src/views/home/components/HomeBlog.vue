<template>
    <div class="home_blog">
        <Title :sub_title="subTitle" :title="title" />
        <div class="container ">
            <div class="wrapper">
                <BlogCard v-for="post in 
                getArray" :key="post.id" :image="post.img"
                :title="post.title" @click="$router.push({name:'post', params:{postId : post.id}})" />
                
            </div>
        </div>
        <Button @click="$router.push({name:'blog'})" > читать наш блог</Button>
    </div>
</template>
<script>
import BlogPost from '@/BlogPost.js'
import BlogCard from '@/layouts/blogCard.vue';
import Button from '@/layouts/Button.vue';
import Title from '@/layouts/Title.vue';
export default {
    components: { Title, Button, BlogCard },
    data() {
        return {
            subTitle: 'Полезные статьи',
            title: 'Лучшие советы по подбору дорогих подарков',
            blog_post:BlogPost
        }

    },
    computed:{
        getRandom(){
            const max = BlogPost.length - 3
            const min = 0
            return Math.floor(Math.random() * (max - min ) + min )
        },
        getArray(){
            return this.blog_post.slice( this.getRandom, this.getRandom + 3 )
        }

    }
}
</script>
<style lang="scss">
@import '../../../assets/styles/components/_mixsin.scss';
@import '../../../assets/styles/components/_vars.scss';

.home_blog {
    padding: 100px 0 120px;
    text-align: center;

    @include md {
        padding: 50px 0;
    }

    .container {
        .wrapper {
            padding: 60px 0;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
        }

        // media
    }
    
}
</style>