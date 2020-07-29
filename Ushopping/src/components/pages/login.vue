<template>
  <div class="login">
    <div class="info">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">登录</mt-tab-item>
        <mt-tab-item id="2">注册</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell>
            <ul>
              <li>
                <span>手机号：</span>
                <input type="text" placeholder="请输入手机号" v-model="logininfo.phone" />
              </li>
              <li>
                <span>密码：</span>
                <input type="password" placeholder="请输入密码" v-model="logininfo.password" />
              </li>
              <li>
                <button @click="login">登录</button>
              </li>
            </ul>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell>
            <ul>
              <li>
                <span>手机号：</span>
                <input type="text" placeholder="请输入手机号" v-model="zcinfo.phone" />
              </li>
              <li>
                <span>昵称：</span>
                <input type="text" placeholder="请输入昵称" v-model="zcinfo.nickname" />
              </li>
              <li>
                <span>密码：</span>
                <input type="password" placeholder="请输入密码" v-model="zcinfo.password" />
              </li>
              <li>
                <button @click="register">注册</button>
              </li>
            </ul>
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: '1',
      logininfo: {
        phone: "",
        password: ""
      },
      zcinfo: {
        phone: "",
        nickname: "",
        password: ""
      }
    };
  },
    methods:{
        login(){
            this.$axios.post('/api/login',this.logininfo).then(res => {
                if(res.data.code == 200){
                    sessionStorage.setItem('umember',JSON.stringify(res.data.list));
                    this.$router.push('/');
                }else{
                    alert(res.data.msg);
                }
            })
        },
        register(){
            this.$axios.post('/api/register',this.zcinfo).then(res => {
                if(res.data.code == 200){
                    this.selected = '1';
                }else{
                    alert(res.data.msg);
                }
            })
        }
    },
    watch:{
        selected(){
            this.$forceUpdate();
        }
    }
};
</script>
<style lang="stylus" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/wine/login.jpg') center;

  .info {
    width: 80%;
    height: 40%;
    margin: 0 auto;
    transform: translateY(40%);
  }

  .mint-navbar {
    color: white;
    background-color: rgba(255, 255, 255, 0);

    .mint-tab-item-label {
      font-size: 0.5rem;
    }
  }

  .mint-cell {
    background-color: rgba(255, 255, 255, 0);

    ul {
      font-size: 0.4rem;

      li {
        line-height: 1rem;
        color: rgba(255, 255, 255, 0.9);

        span {
          display: inline-block;
          width: 2rem;
          text-align: right;
        }
        input{
            color rgba(255, 255, 255, 0.9);
            font-size 0.2rem
        }
        input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
          color: rgba(255, 255, 255, 0.8);
        }

        button {
          width: 1.7rem;
          height: 0.5rem;
          margin-left: 35%;
          background-color: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.1);
          font-size: 0.3rem;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>