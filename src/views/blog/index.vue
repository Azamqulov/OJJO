<template>
  <section class="blog_template">
    <div class="block_template">
      <Title :sub_title="subTitle" :title="title" />
    </div>
    <div class="container">
      <div class="wrapper">
        <BlogCard v-for="post in blog_Post" :key="post.id" :image="post.img" :title="post.title" :text="post.text" @click="$router.push({ name: 'post', params: { postId: post.id } })" />
      </div>
      <Button @click="$router.push('/')">Home</Button>
    </div>
  </section>
</template>
<script>
import Button from '@/layouts/Button.vue';
import BlogPost from '@/BlogPost.js';
import BlogCard from '@/layouts/blogCard.vue';
import Title from '@/layouts/Title.vue';
export default {
  components: {
    Title,
    BlogCard,
    Button
  },
  data() {
    return {
      subTitle: 'JEWELLERY BLOG',
      title: 'Articles by Australian designer Simone Walsh',
      blog_Post: BlogPost,
    }
  },
}
</script>
<style lang="scss">
@import '../../assets/styles/components/_mixsin.scss';
@import '../../assets/styles/components/_vars.scss';

.blog_template {

 
  .block_template {
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
    .wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 25px;
      position: relative;
      z-index: 999;

      @include xl {
        justify-content: center !important;
        gap: 50px;

      }
    }
  }
  button{
    margin-top: 20px;
    text-align: center;
  }
}
</style>