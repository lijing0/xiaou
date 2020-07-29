<template>
  <div class="cart">
    <mt-header title="购物车" class="head">
      <router-link to="/cate" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="container" v-for="item of goodslist" :key="item.id">
      <input
        type="radio"
        v-model="item.ischecked"
        @click="item.ischecked = !item.ischecked"
        :class="{active:item.ischecked}"
      />
      <img :src="item.img" alt="pic" @click="todetail(item.goodsid)" />
      <div class="right">
        <h2>{{item.goodsname}}</h2>
        <h3>￥{{item.price}}</h3>
        <div class="count">
          <b>数 量：</b>
          <span @click="edit(item.id,1)">-</span>
          <i>{{item.num}}</i>
          <span @click="edit(item.id,2)">+</span>
        </div>
        <span class="del" @click="delgood(item.id)">X</span>
      </div>
    </div>
    <div class="bottom">
      <ul>
        <li>
          全选：
          <input type="radio" :class="{active:allcheck}" />
        </li>
        <li>
          总计：
          <span>￥{{totalMoney}}</span>
        </li>
        <li>
          <mt-button size="large" color="#820000" background-color="skyblue" @click="buy">结算</mt-button>
        </li>
      </ul>
    </div>
    <div class="money" v-show="isshow">
      <div class="info">
        <h1>结算</h1>
        <h2>共计：￥{{totalMoney}}</h2>
        <div class="btn">
          <button @click="isshow = false">取消</button>
          <button @click="ok">结算</button>
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="right">
      <button class="success" @click="success">结算成功</button>
    </mt-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodslist: [],
      willbuy: [],
      allcheck: false,
      isshow: false,
      popupVisible: false
    };
  },
  methods: {
    getlist() {
      this.$http
        .get("/api/cartlist", {
          uid: JSON.parse(sessionStorage.getItem("umember")).uid
        })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.list != null) {
              res.data.list.map(item => {
                item.ischecked = false;
              });
              this.goodslist = res.data.list;
            } else {
              this.goodslist = [];
            }
          }
        });
    },
    todetail(id) {
      this.$router.push("/detail/" + id);
    },
    delgood(id) {
      let data = {};
      data.id = id;
      this.$http.post("/api/cartdelete", data).then(res => {
        if (res.data.code == 200) {
          this.getlist();
        }
      });
    },
    edit(id, n) {
      let data = {};
      data.id = id;
      data.type = n;
      this.$http.post("/api/cartedit", data).then(res => {
        if (res.data.code == 200) {
          this.getlist();
        }
      });
    },
    buy() {
      let check = this.goodslist.filter(item => {
        return item.ischecked == true;
      });
      this.willbuy = check;
      this.isshow = true;
    },
    ok() {
      this.popupVisible = true;
    },
    success() {
      this.popupVisible = false;
      this.isshow = false;
      this.allcheck = false;
      if (this.willbuy.length > 0) {
        this.willbuy.map(item => {
          this.delgood(item.id);
        });
        this.willbuy = [];
      } else {
        return;
      }
    }
  },
  mounted() {
    if (sessionStorage.getItem("umember")) {
      this.getlist();
    } else {
      this.$router.push("/login");
    }
  },
  computed: {
    totalMoney() {
      let money = this.goodslist.reduce((all, item) => {
        if (item.ischecked == true) {
          all += item.price * item.num;
        }
        return all;
      }, 0);
      let all = this.goodslist.every(item => {
        return item.ischecked == true;
      });
      if (all) {
        this.allcheck = true;
      } else {
        this.allcheck = false;
      }
      return money.toFixed(2);
    }
  },
  watch: {
    $router() {
      this.$forceUpdate();
    }
  }
};
</script>
<style lang="stylus" scoped>
.cart {
  width: 100%;
  height: 100vh;
  position: relative;

  .head {
    background-color: skyblue;
  }

  .container {
    height: 2.5rem;
    display: flex;
    margin: 0.1rem 0 0.3rem 0;
    // border: 0.1rem solid rgba(20, 21, 23, 0.2);
    border: 0.1rem solid rgba(130, 0, 0, 0.2);

    img {
      width: 2.5rem;
      height: 2.3rem;
      margin: 0.1rem;
    }

    .right {
      // color: rgb(255, 255, 255);
      color: rgb(199, 161, 114);
      background-color: rgb(20, 21, 23);
      flex: 1;
      margin: 0.2rem;
      padding-right: 0.3rem;
      position: relative;

      h2 {
        height: 0.6rem;
        overflow: hidden;
        font-size: 0.3rem;
        font-weight: 600;
        margin: 0.2rem 0.3rem;
      }

      h3 {
        font-size: 0.3rem;
        font-weight: 600;
        margin: 0 0.2rem;
      }

      .count {
        font-size: 0.2rem;
        margin-top: 0.2rem;
        margin-left: 0.3rem;

        b {
          font-size: 0.3rem;
          margin-right: 0.1rem;
        }

        span, i {
          display: inline-block;
          text-align: center;
          padding-top: 0.1rem;
        }

        span {
          border: 1px solid #000;
          font-weight: 600;
          width: 0.4rem;
          height: 0.4rem;
        }

        i {
          margin: 0 0.1rem;
        }
      }

      .del {
        font-size: 0.4rem;
        position: absolute;
        top: 0.1rem;
        right: 0.2rem;
        color: rgb(199, 161, 114);
      }
    }
  }

  .bottom {
    margin-bottom: 1rem;
    position: fixed;
    bottom: 0;
    width: 100vw;
    padding-top: 0.2rem;
    background-color: #fff;

    ul {
      display: flex;
      justify-content: space-around;
      font-size: 0.3rem;
      width: 100%;

      li {
        .mint-button--default {
          background-color: #820000;
          color: white;
          width: 2rem;
        }

        span {
          color: #820000;
          font-size: 0.4rem;
        }
      }
    }
  }

  .money {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100vw;
    height: 100vh;
    // border:1px solid skyblue
    // background: url('../../assets/images/wine/buy.jpg') top;

    .info {
      text-align: center;
      margin-top: 3.9rem;
      background-color: #fff;

      h1 {
        padding-top: 0.3rem;
        font-size: 0.6rem;
        line-height: 1rem;
      }

      h2 {
        font-size: 0.4rem;
        line-height: 1rem;
      }

      button {
        margin-top: 0.4rem;
        margin-bottom: 0.5rem;
        line-height: 0.6rem;
        width: 2rem;
        font-size: 0.3rem;
        color: white;
        background-color: skyblue;
        border: none;
        border-radius: 10%;
      }
    }
  }

  .success {
    margin-right: 40%;
    width: 4rem;
    height: 1rem;
    font-size: 0.5rem;
    background-color: #820000;
    color: white;
  }

  .mint-popup-right {
    left: 22%;
  }

  .mint-popup {
    background-color: transparent;
  }

  input {
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    border: 1px solid black;
  }

  .active {
    // background-color: #;
  }
}
</style>