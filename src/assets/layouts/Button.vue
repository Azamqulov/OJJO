<template>
    <button class="site-btn" :class="{ light: isLight }">
        <slot/>
    </button>
</template>

<script>
export default {
    props: {
        isLight: {
            type: Boolean,
            default: () => false
        }
    }
}
</script>

<style lang="scss">
@import '../assets/styles/components/_mixsin.scss';
@import '../assets/styles/components/_vars.scss';

.site-btn {
    padding: 15px 35px;
    border: 1px solid #d6d6d6d6;
    font-size: 18px;
    font-weight: 500px;
    background: $dark;
    color: $white;
    cursor: pointer;

    // ----------
    &.light {
        background: $white;
        color: $dark;
    }
}
</style>