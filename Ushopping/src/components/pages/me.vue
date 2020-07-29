<template>
  <div class="me">
    <mt-header title="个人中心" class="head">
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <!-- top -->
    <div class="top">
      <div class="topleft">
        <div class="user">
          <img src="../../assets/images/mine.png" alt="mine" @click="popupVisible = !popupVisible" />
        </div>
        <div class="name">
          <p class="namer">{{name}}</p>
          <p class="level">V1</p>
        </div>
      </div>
      <div class="topright">
        <p class="qiandao">每日签到</p>
      </div>
      <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade"
        @click="popupVisible = !popupVisible"
      >
        <ul>
          <li>
            <h1>登录信息</h1>
          </li>
          <li>
            <span>姓名：</span>
            <i>{{name}}</i>
          </li>
          <li>
            <span>电话：</span>
            <i>{{phone}}</i>
          </li>
          <li>
            <button @click="$router.push('/login')" v-if="name == '未登录'">去登陆</button>
            <button @click="exit" v-else>退出</button>
          </li>
        </ul>
      </mt-popup>
    </div>
    <!-- Navicons -->
    <div class="Navicons">
      <a href="#">
        <img class="iconMine1" src="../../assets/img/订单.png" alt="iconMine_1" />
        <i>全部订单</i>
      </a>
      <a href="#">
        <img class="iconMine3" src="../../assets/img/待付款.png" alt="iconMine_2" />
        <i>待付款</i>
      </a>
      <a href="#">
        <img class="iconMine3" src="../../assets/img/待收货.png" alt="iconMine_3" />
        <i>待收货</i>
      </a>
    </div>
    <!-- manage -->
    <div class="manage">
      <ul class="List">
        <li class="one">
          <div class="txt">
            <div class="pic">
              <img class="one_pic" src="../../assets/img/地址.png" alt="iconMine_4" />
            </div>

            <p>地址管理</p>
          </div>
          <div class="arrow_rt">
            <img src="../../assets/images/arrowRight.png" alt="arrowRight" />
          </div>
        </li>
        <li class="two">
          <div class="txt">
            <div class="pic">
              <img class="two_pic" src="../../assets/img/钱包.png" alt="iconMine_5" />
            </div>

            <p>我的钱包</p>
          </div>
          <div class="arrow_rt">
            <img src="../../assets/images/arrowRight.png" alt="arrowRight" />
          </div>
        </li>
        <li class="three">
          <div class="txt">
            <div class="pic">
              <img class="three_pic" src="../../assets/img/优惠券.png" alt="iconMine_6" />
            </div>

            <p>我的优惠券</p>
          </div>
          <div class="arrow_rt">
            <img src="../../assets/images/arrowRight.png" alt="arrowRight" />
          </div>
        </li>
        <li class="four">
          <div class="txt">
            <div class="pic">
              <img class="four_pic" src="../../assets/img/二维码.png" alt="iconMine_7" />
            </div>

            <p>我的二维码</p>
          </div>

          <div class="arrow_rt">
            <img src="../../assets/images/arrowRight.png" alt="arrowRight" />
          </div>
        </li>
        <li class="five">
          <div class="txt">
            <div class="pic">
              <img class="five_pic" src="../../assets/img/小伙伴.png" alt="iconMine_8" />
            </div>

            <p>我的小伙伴</p>
          </div>
          <div class="arrow_rt">
            <img src="../../assets/images/arrowRight.png" alt="arrowRight" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "未登录",
      phone: "未登录",
      popupVisible: false
    };
  },
  methods: {
    exit() {
      sessionStorage.removeItem("umember");
      this.$router.push("/");
    }
  },
  mounted() {
    if (JSON.parse(sessionStorage.getItem("umember"))) {
      (this.name = JSON.parse(sessionStorage.getItem("umember")).nickname),
        (this.phone = JSON.parse(sessionStorage.getItem("umember")).phone);
    } else {
      return;
    }
  }
};
</script>
<style lang="stylus" scoped>
.me {
  .head {
    background-color: rgb(130, 0, 0);
  }

  .top {
    display: flex;
    justify-content: space-between;
    background: rgb(130, 0, 0);

    .topleft {
      display: flex;

      .user {
        width: 1.51rem;
        height: 1.51rem;
        border: 0.04rem solid #fff5fa;
        border-radius: 50%;
        text-align: center;
        overflow: hidden;
        background-color: #822e02;
        margin: 0.28rem 0 0.27rem 0.33rem;

        img {
          width: 1.3rem;
          height: 1.36rem;
        }
      }

      .name {
        margin: 0.6rem 0 0 0.26rem;

        .namer {
          font: 0.3rem / 0.52rem '微软雅黑';
          color: #fffeff;
        }

        .level {
          font: 0.28rem / 0.44rem Mangal;
        }
      }
    }

    .topright {
      .qiandao {
        font: 0.26rem / 0.71rem '微软雅黑';
        padding: 0 0.3rem 0 0.29rem;
        margin: 0.74rem 0.38rem 0 0;
        background: #ffffff;
        color: rgb(130, 0, 0);
        border-radius: 0.04rem;
      }
    }

    .mint-popup {
      width: 70%;
      height: 40%;
      border-radius: 10%;
      color: #000;

      ul {
        text-align: center;

        li {
          line-height: 1rem;

          h1 {
            font-size: 0.6rem;
            margin-top: 0.2rem;
          }

          button {
            width: 1.6rem;
            height: 0.7rem;
            font-size: 0.4rem;
            color: white;
            border: none;
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
    }

    .mt-popup {
      ul {
        text-align: center;

        li {
          line-height: 1.5rem;

          h1 {
            font-size: 0.6rem;
          }
        }
      }
    }
  }

  .Navicons {
    display: flex;
    justify-content: space-between;
    padding: 0.34rem 0.66rem 0.33rem 0.51rem;
    background-color: #ffffff;
    border-bottom: 0.09rem solid #ececec;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;

      .iconMine1, .iconMine2 {
        width: 0.34rem;
        height: 0.34rem;
      }

      .iconMine3 {
        width: 0.34rem;
        height: 0.29rem;
      }

      i {
        font: 0.24rem '微软雅黑';
        padding-top: 0.22rem;
        color: #656565;
      }
    }
  }

  .manage {
    margin-top: 0.12rem;
    // padding-bottom: 3rem;
    background: #ffffff;

    .List {
      .two, .three, .four, .five {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d9d9d9;

        .txt {
          display: flex;

          p {
            font: 0.26rem '微软雅黑';
            color: #5d5d5d;
            padding: 0.47rem 0 0.45rem 0;
          }

          .pic {
            width: 0.93rem;

            .two_pic {
              width: 0.36rem;
              height: 0.36rem;
              margin: 0.41rem 0 0 0.35rem;
            }

            .three_pic {
              width: 0.46rem;
              height: 0.32rem;
              margin: 0.44rem 0 0 0.28rem;
            }

            .four_pic {
              width: 0.36rem;
              height: 0.34rem;
              margin: 0.44rem 0 0 0.36rem;
            }

            .five_pic {
              width: 0.38rem;
              height: 0.36rem;
              margin: 0.41rem 0 0 0.33rem;
            }
          }
        }

        .arrow_rt {
          margin: 0.47rem 0.37rem 0 0;

          img {
            width: 0.19rem;
            height: 0.26rem;
          }
        }
      }

      .one {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d9d9d9;

        .txt {
          display: flex;

          .pic {
            width: 0.93rem;

            img {
              width: 0.36rem;
              height: 0.4rem;
              margin: 0.35rem 0 0 0.37rem;
            }
          }

          p {
            font: 0.26rem '微软雅黑';
            color: #5d5d5d;
            padding: 0.43rem 0;
          }
        }

        .arrow_rt {
          margin: 0.47rem 0.37rem 0 0;

          img {
            width: 0.19rem;
            height: 0.26rem;
          }
        }
      }
    }
  }
}
</style>