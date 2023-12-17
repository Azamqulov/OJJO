<template>
  <section class="footer_blog">
    <Title :sub_title="subTitle" :title="title" />

    <div class="container">
      <div class="wrapper">
        <ul class="blog_text">

          <li class="title" v-for="item in footerBlog" :key="item"><i class="fa-brands fa-google-play"></i>{{ item.text }}
          </li>

        </ul>
        <div class="blog_send">
          <form  @click.prevent  class="send">
            <input type="text" placeholder="Ваш e-mail" v-model="message">
            <Button class="btn1" @click="Send">отправить</Button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Title from '@/layouts/Title.vue';
import Button from '@/layouts/Button.vue';
export default {
  components: { Title, Button },
  data() {
    return {
      subTitle: 'Полезные советы и персональный предложения',
      title: 'Эксклюзивная рассылка',
      footerBlog: [
        {
          text: 'Личный менеджер'
        },
        {
          text: 'Доставка и оформление'
        },
        {
          text: 'Индивидуальный дизайн'
        },
      ],



      botApi: '6906925063:AAHUFOIljvKmUFGRm5DS3Gp65cN_upr6M4Y',
      chatApi: '-1002121320663',
      message: ''
    }
  },
  methods: {

    async Send() {
      console.log(this.message);
      const habar = JSON.stringify(this.message);

      await fetch(
        `https://api.telegram.org/bot${this.botApi}/sendMessage?chat_id=${this.chatApi}&parse_mode=html&text=${habar}`
      );
      this.message = '';
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/components/_mixsin.scss';
@import '../../../assets/styles/components/_vars.scss';

.footer_blog {
  background-image: url(../../../assets/images/loyauts/bg-section.png);
  width: 100%;
  padding: 100px;
  color: $white;

  @include sm {
    padding: 80px 30px;

  }

  .container {
    .wrapper {
      margin: 30px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 50px;

      @include md {
        display: flex;
        flex-direction: column;
      }

      .blog_text {
        .title {
          font-weight: 300;
          padding: 5px 35px;

          @include sm {
            font-size: 14px;
          }
        }
      }

      .blog_send {
        padding: 20px;
        border: 1px solid $white;

        @include sm {
          padding: 10px;
        }

        .send {
          padding: 20px;
          background-color: $white;
          display: flex;
          gap: 20px;

          @include sm {
            padding: 10px;
          }

          input {
            padding-left: 15px;
            border: none;
            border: 1px solid $br-color;

            @include sm {
              width: 100px;
            }
          }

          .btn1 {
            font-size: 14px;
            padding: 10px 25px;
          }
        }
      }
    }
  }
}
</style>