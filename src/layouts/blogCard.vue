<template >
    <div class="blog" :style="{ backgroundImage: `url(${image})` }">
        <h3 class="title">{{ title }}</h3>
    </div>
</template>
<script>
export default {
    props: {
        image: String,
        title: String
    }
}
</script>
<style lang="scss">
@import '../assets/styles/components/_vars.scss';
@import '../assets/styles/components/_mixsin.scss';

.blog {
    width: 450px;
    height: 370px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: end;
    justify-content: center;
    padding: 30px;
    position: relative;
    color: white;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgba(180, 180, 180, 0) 0%, #333333 100%);


    }
 @include xxl {
        width: 380px;
    }
    @include xl {
        width: 370px;
        justify-content: center;
        margin: 20px auto;
    }

    @include lg {
        width: 300px;
        // display: flex;
        // justify-content: center;1
        // margin: 20px auto;
    }
        @include md {
        width: 350px;
        display: flex;
        justify-content: center;
        margin: 20px auto;
    }
    

    .title {
        max-width: 210px;
        text-align: center;
        color: $white;
        font-size: 18px;
        line-height: 25px;
        font-weight: 400;
        position: relative;
        z-index: 5;
    }
}
</style>