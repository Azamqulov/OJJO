<template>
    <div class="search-bar" :class="{ active: isActive}"  v-if="!isOpen">
        <div class="search-box">
            <div class="search">
                <i class="fa fa-search" ></i>
                <input type="text" placeholder="Search ..." >
            </div>
            <i class="fa fa-times" v-if="!isOpen"  @click="$emit('removeActive')"></i>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: () => false
        }
      

    },
    data() {
        return {
            isOpen: false,
            OpenIs: true
        }
    },
}
</script>
<style lang="scss"  >
@import '../assets/styles/components/_mixsin.scss';
@import '../assets/styles/components/_vars.scss';


.search-bar {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11111;
    width: 100%;
    height: 100px;
    display: flex;
    background: $dark;
    justify-content: center;
    transform: translateY(-100%);
    align-items: center;
    transition: .5s;

    &.active {
        transform: translateY(0%);
        transition: .5s;
    }

    .search-box {
        display: flex;
        align-items: center;
    }

    i {
        color: $white;
        margin-left: 20px;
        font-size: 25px;
        cursor: pointer;
    }

    .search {
        width: 400px;
        padding: 10px;
        display: flex;
        align-items: center;
        background: white;
        border-radius: 20px;

        i {
            margin-right: 10px;
            font-size: 14px;
            color: $dark;
        }

        input {
            border: none;
        }


    }

}
</style>