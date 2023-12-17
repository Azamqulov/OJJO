<template>
  <!-- <home /> -->
  <router-view></router-view>
  <navbar @isActive="SearchBarActive = true" />
  <SearchBar :isActive="SearchBarActive" @removeActive="SearchBarActive = false"  />
</template>
<script>
import navbar from '@/layouts/navbar.vue'
import SearchBar from './layouts/search-bar.vue';
import home from './views/home/index.vue'
export default {
  components: { home, navbar, SearchBar,  },
  data() {
    return {
      SearchBarActive: false,
    }
  },
}
</script>
<style lang="scss">
@import './assets/styles/main.scss';
</style>
