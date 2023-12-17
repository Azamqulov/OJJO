<template>
    <section class="mascove">
        <Title :sub_title="subTitle" :title="title"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut duis tortor vitae pellentesque egestas quam pulvinar. Pellentesque porttitor velit sit pellentesque. Suspendisse donec pretium id dignissim. Dignissim ultrices eget orci viverra. Egestas quis et ut ultrices imperdiet lectus nulla tempus. Pharetra lorem sem purus nisi libero viverra ipsum.</p>
        <Button :isLight="true">наши салоны</Button>
    </section>
</template>

<script>
import Button from '@/layouts/Button.vue';
import Title from '@/layouts/Title.vue'
export default {
    components: { Title,Button },
    data() {
        return {
            subTitle:'Не знаете, что выбрать?',
            title:'Не знаете, что выбрать?'
        }
    },
}
</script>

<style lang="scss" >
@import '../../../assets/styles/components/_mixsin.scss';
@import '../../../assets/styles/components/_vars.scss';

.mascove{
    width: 100%;
    padding: 100px 0 120px;
    background: url(../../../assets/images/loyauts/bg-section.png);
    text-align: center;
    color: $white;

    p{
        width: 47% !important;
        margin: 20px auto;
        padding: 15px;
        line-height: 35px;
    }
    Button{
        transition: 0.5s;
    }
    Button:hover{
        background-color: $dark;
        color: $white;
    }
}

</style>
