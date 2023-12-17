<template>
    <section class="footter_box">
        <div class="container">
            <div class="content" v-for="item in Blog_text" :key="item">
                <div class="blog_text">
                    <h1>{{ item.tetle }}</h1>
                    <ul>
                        <li v-for="blog in item.text">{{ blog.temp }}</li>
                    </ul>
                </div>

            </div>
        </div>
    </section>
    <footer>
        <div class="container">
            <hr>
            <div class="block">
                <h4>2020 OJJO jewelry</h4>
                <h4>Договор публичной </h4>
                <h4>Контрагентам</h4>
                <h4>Сделано Figma.info</h4>
            </div>

        </div>
    </footer>
</template>
<script>
import footerText from '@/footerText.js'
export default {
    components: { footerText },
    data() {
        return {
            Blog_text: footerText
        }
    },
}
</script>
<style lang="scss">
@import '../../../assets/styles/layouts/footer.scss';
</style>