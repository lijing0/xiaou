<template>
  <div class="goodslist">
    <mt-header title="商品列表" class="head">
      <router-link to="/cate" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="list">
      <div class="good" v-for="(good,idx) of goodslist" :key="idx">
        <img src="../../assets/images/wine/flower.png" alt="flower" class="flower" />
        <div class="container">
          <div class="pic" @touchstart="good.isshow = !good.isshow">
            <img :src="good.img" alt="pic" class="picture" />
            <div class="on" v-show="good.isshow">
              <h1>{{good.goodsname}}</h1>
              <h3>现价￥{{good.price}}</h3>
              <p>市场价格￥{{good.market_price}}</p>
              <button @click="todetail(good.id)">立即抢购</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow: false,
      goodslist: []
    };
  },
  methods:{
    todetail(id){
      this.$router.push('/detail/'+id);
    }
  },
  mounted() {
    this.$axios({
      url: "/api/getcategoods",
      params: { fid: this.$route.params.cateid }
    }).then(res => {
      res.data.list.map(item =>{
        item.isshow = false;
      })
      this.goodslist = res.data.list;
    });
    
  }
};
</script>
<style lang="stylus" scoped>
.head {
  background-color: rgb(130, 0, 0);
}

.goodslist {
  width: 100vw;
  height: 100vh;

  .list {
    width: 100%;
    height: 100%;

    .good {
      margin: 0.2rem 0.1rem;
      overflow: hidden;

      .flower {
        width: 100%;
        height: 0.2rem;
        margin: 0 0 0.3rem 0;
      }

      .container {
        .pic {
          position: relative;

          .picture {
            width: 80%;
            height: 6rem;
            margin-left: 0.6rem;
          }

          .on {
            width: 100%;
            height: 6rem;
            // margin-left: 0.3rem;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            position: absolute;
            top: 0px;
            left: 0px;
            animation: mover 10s infinite;
            color #ffb15a
            text-align center
            h1{
              font normal .4rem '仿宋'
              margin-top 2rem
            }
            h3{
              margin 0.5rem 0
              font normal .3rem '仿宋'
            }
            p{
              margin-bottom 0.5rem
              font normal .3rem '仿宋'
            }
            button{
              width 2rem
              height 0.5rem
              font normal .3rem '仿宋'
              background-color rgba(0, 0, 0, 0.8)
              border 1px solid 
              color #ffb15a
            }
          }
        }
      }
    }
  }
}

@keyframes mover {
  from {
    bottom: -4rem;
  }

  to {
    bottom: 0;
  }
}
</style>