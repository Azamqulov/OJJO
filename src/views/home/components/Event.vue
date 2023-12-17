<template >
    <section class="event">
        <div class="container">
            <Title :sub_title="subTitle" :title="title" />
            <div class="event_btn">
                <button class="btn_item" v-for="(item, index) in Collection" :key="item"
                    :class="{ active: ActiveBtn === index }" @click="ActiveBtn = index">
                    <span>{{ item.ctg_name.Text }}</span>
                </button>
            </div>
            <div class="event-wrapper">
                <div class="wrapper" @click="isOpen = item" v-for="item in Collection[ActiveBtn].data" :key="item.conId">
                    <img :src="item.img" :alt="title">
                    <h3>{{ item.title }}</h3>
                </div>
            </div>
        </div>

    </section>

    <HomeModal v-if="isOpen" @action="isOpen = false" :modalItem="isOpen" />
</template>
<script>
import HomeModal from './HomeModal.vue';
import Title from '@/layouts/Title.vue';
import collection from '@/collection';
export default {
    components: {
        Title, collection, HomeModal
    },
    data() {
        return {
            ActiveBtn: 0,
            isOpen: null,
            subTitle: 'К мероприятиям',
            title: 'Настоящая красота здесь!',
            Collection: collection
        }
    },
}
</script>
<style lang="scss">
@import '@/assets/styles/page/home/event.scss';
</style>