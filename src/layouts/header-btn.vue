<template>
    <div class="home-box">
        <div class="container">

            <div class="text">
                <h1>{{ let }}</h1>
            </div>
            <div class="btn">
                <Button>каталог изделий</Button>
            </div>

        </div>
        <div class="container cont1">
            <div class="brend">
                <headerLogo />
            </div>
        </div>
    </div>
</template>
<script>
import Button from './Button.vue';
import headerLogo from './header-logo.vue';
export default {
    components: {
        headerLogo, Button
    },
data() {
    return {
        let:'Долго, дорого, богато!'
    }
},
}
</script>
<style lang="scss"  >
@import '../assets/styles/components/_mixsin.scss';
@import '../assets/styles/components/_vars.scss';


.home-box {

    text-align: center;
    padding-top: 450px;

    @include sm {
        padding-top: 420px;
    }

    .text {
        color: $white;
        font-size: 28px;
        text-align: center;
        @include md {
            font-size: 1.5rem;
        }
    }

    button {
        padding: 10px 25px;
        font-size: 25px;
        color: $white;
        background: transparent;
        border: 1px solid $white;
        cursor: pointer;
        margin: 30px 0 50px;
        transition: 0.5s;

        &:hover {
            background-color: $white;
            color: $dark;
        }
    }

    .cont1 {
        border-top: 1px solid white;
        .brend {
            height: 100px;
            display: flex;
            align-items: center;
            gap: 30px;
            flex-wrap: wrap;
            justify-content: center;
            overflow: hidden;

            img {
                width: 175px;
                height: 65px;
            }
        }
    }

}</style>