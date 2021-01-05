<template>
  <div class="container">
    <div class="img">
      <!-- <img src="./pics/undraw_personalization_triu.svg" alt="Personalization" /> -->
    </div>
    <div class="login-container">
      <form action="login.php" method="POST">
        <!-- <img class="avatar" src="./pics/undraw_profile_pic_ic5t.svg" alt="Profile-picture" /> -->
        <h1>Welcome</h1>
        <div class="input-div one">
          <font-awesome-icon :icon="['fas', 'user']" />
          <!-- <div class="i">
            <em class="fas fa-user"></em>
          </div> -->
          <div>
            <h2>Username</h2>
            <input type="text" class="input" name="user" />
          </div>
        </div>
        <div class="input-div two">
          <div class="i">
            <em class="fas fa-lock"></em>
          </div>
          <div>
            <h2>Password</h2>
            <input type="password" class="input" name="pass" />
          </div>
        </div>
        <span id="forget" data-toggle="modal" data-target="#forget_modal">Forgot password</span>
        <input type="submit" value="Login" class="btn" />
      </form>
    </div>
  </div>
  <!-- Modal -->
  <div
    class="modal fade"
    id="forget_modal"
    tabindex="-1"
    aria-labelledby="forget_modal"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="forget_modal">Bejenetkezési adatok:</h5>
          <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-muted">Username: Admin</div>
          <div class="text-muted">Password: Abc123456</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const adat = route.query.mode;


    const inputs = document.querySelectorAll('.input');

    function focusFunc() {
      let parent = this.parentNode.parentNode;
      parent.classList.add('focus');
    }
    function blurFunc() {
      let parent = this.parentNode.parentNode;
      if (this.value == '') parent.classList.remove('focus');
    }

    inputs.forEach(x => {
      x.addEventListener('focus', focusFunc);
      x.addEventListener('blur', blurFunc);
    });

    return { adat };
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
