<template>
    <section class="site-text">
        <h3 class="sub_title">{{ sub_title }}</h3>
        <h1 class="title">{{ title }}</h1>

    </section>
</template>
<script>
export default {
    props: {
        sub_title: String,
        title: String
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/styles/components/_mixsin.scss';
@import '../assets/styles/components/_vars.scss';

.site-text {
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;
    z-index: 10;

    .sub-title {
        font-size: 21px;
        font-weight: 500;
    }

    .title {
        font-size: 40px;
        font-weight: 700;

        @include md {
            font-size: 1.5rem;
        }
    }
}</style>