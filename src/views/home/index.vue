<template >

<main-section/>
<Event/>
<Mascove/> 
<HomeBlog/>
<videoBlog/>
<FooterBlog/>
<FooterText/>
</template>

<script>
import videoBlog from './components/videoBlog.vue';
import Event from './components/Event.vue';
import HomeBlog from './components/HomeBlog.vue';
import mainSection from './components/main-section.vue';
import Mascove from './components/mascove.vue';
import FooterBlog from './components/footerBlog.vue';
import FooterText from './components/footerText.vue';
export default {
    components:{ mainSection, Event, Mascove, HomeBlog, videoBlog, FooterBlog, FooterText },
}
</script>
<style lang="scss">
    
</style>