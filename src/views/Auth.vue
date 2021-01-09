<template>
  <div class="reg" v-if="mode">
    <form @submit.prevent="submit">
      <base-input v-model="reg.fullName">Teljes név</base-input>
      <base-input v-model="reg.userName">Felhasználó név</base-input>
      <base-input v-model="reg.email" type="email">E-mail</base-input>
      <base-input v-model="reg.phoneNumber" type="phone">Telefonszám</base-input>
      <base-input v-model="reg.password" type="password">Jelszó</base-input>
      <base-input v-model="reg.pass2" type="password">Jelszó megismétlése</base-input>
      <!-- ÁSZF -->
      <base-button type="info" submit>Tovább</base-button>
      <hr />
      <!-- Google, FB -->
    </form>
  </div>
  <div class="login" v-else>
    <form @submit.prevent="submit">
      <base-input v-model="login.email" type="email">E-mail</base-input>
      <base-input v-model="login.password" type="password">Jelszó</base-input>
      <base-button type="info" submit>Tovább</base-button>
    </form>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';

export default {
  setup() {
    //*Store
    const store = useStore();
    //* Route
    const route = useRoute();
    const router = useRouter();
    const mode = computed(() => {
      return route.query.mode === 'reg';
    });

    //*Reg
    const reg = reactive({
      fullName: '',
      userName: '',
      email: '',
      phoneNumber: '',
      password: '',
      pass2: ''
    });
    const login = reactive({
      email: 'a@s.com',
      password: 'aaaaaa'
    });
    async function submitForm() {
      //*Form validálás
      // this.formIsValid = true;
      // if (
      //   this.email === '' ||
      //   !this.email.includes('@') ||
      //   this.pass.length < 6
      // ) {
      //   this.formIsValid = false;
      //   return;
      // }

      // this.isLoading = true;

      try {
        if (!mode.value) {
          console.log('login');
          await store.dispatch('login', { email: login.email, pass: login.password });
        } else {
          console.log('reg');
          await store.dispatch('signup', { email: reg.email, pass: reg.password });
        }

        const redirect = '/' + (route.query.redirect || 'teacher');
        router.replace(redirect);
      } catch (error) {
        // this.error = error.message || 'Failed to login.try later.';
        console.log(error.message || 'Failed to login.try later.');
      }

      // this.isLoading = false;
      console.log('state2', store);
    }
    //*Login

    function submit() {
      console.log('Submit');
      submitForm();
    }

    return { mode, submit, reg, login };
  }
};
</script>

<style scoped lang="scss">
$szin1: #009fe6;
$szin2: #00b0ff;
$betuszin: #333;
$h2szin: #666;
$feher: #fff;
.container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 7rem;
  padding: 0.2rem;
  .img {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img {
      width: 500px;
      @media screen and (max-width: 1000px) {
        width: 400px;
      }
    }
    @media screen and (max-width: 900px) {
      display: none;
    }
  }
  .login-container {
    display: flex;
    align-items: center;
    text-align: center;
    form {
      width: 360px;
      .avatar {
        width: 100px;
      }
      h1 {
        font-size: 2.6rem;
        text-transform: uppercase;
        margin: 15px 0;
        color: $betuszin;
        @media screen and (max-width: 1000px) {
          font-size: 2.4rem;
          margin: 8px 0;
        }
      }
      .input-div {
        position: relative;
        display: grid;
        grid-template-columns: 7% 93%;
        margin: 25px 0;
        padding: 5px 0;
        border-bottom: 2px solid #ccc;
        &:after,
        &:before {
          content: '';
          position: absolute;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: $szin1;
          transition: 0.3s;
        }
        &:after {
          right: 50%;
        }
        &:before {
          left: 50%;
        }
        &.one {
          margin-top: 0;
        }
        &.two {
          margin-bottom: 4px;
        }
        &.focus {
          &:after,
          &:before {
            width: 50%;
          }
          .i em {
            color: $szin1;
          }
          div h2 {
            top: -5px;
            font-size: 15px;
          }
        }
        .i {
          display: flex;
          justify-content: center;
          align-items: center;
          em {
            color: $h2szin;
            transition: 0.3s;
          }
        }
        & > div {
          position: relative;
          height: 45px;
          h2 {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            color: $h2szin;
            font-size: 18px;
            transition: 0.3s;
          }
          .input {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border: none;
            background: none;
            padding: 0.5rem;
            font-size: 1.2rem;
            color: $h2szin;
            font-family: 'Poppins', sans-serif;
            outline: none;
          }
        }
      }
      #forget {
        display: block;
        text-align: right;
        text-decoration: none;
        color: $h2szin;
        font-size: 0.9rem;
        transition: 0.3s;
        cursor: pointer;
        &:hover {
          color: $betuszin;
        }
      }
      .btn {
        display: block;
        width: 100%;
        height: 50px;
        border-radius: 25px;
        margin: 1rem 0;
        font-size: 1.2rem;
        outline: none;
        border: none;
        background-image: linear-gradient(to right, $szin2, $szin1, $szin2);
        cursor: pointer;
        color: $feher;
        text-transform: uppercase;
        font-family: 'Poppins', sans-serif;
        background-size: 200%;
        transition: 0.5s;
        &:hover {
          background-position: right;
        }
      }
      @media screen and (max-width: 1000px) {
        width: 290px;
      }
    }
    @media screen and (max-width: 900px) {
      justify-content: center;
    }
  }
  @media screen and (max-width: 1050px) {
    grid-gap: 5rem;
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}
</style>
