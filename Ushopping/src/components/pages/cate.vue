<template>
  <div class="cate">
    <mt-header title="商品分类页面" class="head">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="content">
      <div class="left">
        <ul>
          <li
            v-for="(item,idx) of catearr"
            :key="idx"
            :class="{active:activeidx == idx}"
            @click="activeidx = idx"
          >{{ item.catename }}</li>
        </ul>
      </div>
      <div class="right">
        <div class="list" v-for="(item,idx) of catearr" :key="idx" v-show="activeidx == idx">
          <div
            class="item"
            v-for="good of item.children"
            :key="good.id"
            @click="togoodlist(good.pid)"
          >
            <div class="info">
              <img :src="good.img" alt="ic" />
              <span>{{ good.catename }}</span>
            </div>
            <div class="text" @click="togoodlist(good.pid)">
              <h2>2020,找一个懂自己的人一起喝酒</h2>
              <h3>一种品尝，一种回味，它是岁月的一种感动，是心灵的一种呵护</h3>
              <p>learn more about</p>
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
      catearr: [],
      activeidx: 0
    };
  },
  methods: {
    togoodlist(id) {
      this.$router.push("/cate/" + id);
    }
  },
  mounted() {
    this.$axios.get("/api/getcatetree").then(res => {
      this.catearr = res.data.list;
    });
  }
};
</script>
<style lang="stylus" scoped>
.cate {
  .head {
    background-color: rgb(130, 0, 0);
  }
  width: 100vw;
  height: 100vh;

  // background-color: #f0f0f0;
  .content {
    display: flex;
    width: 100%;
    height: 100%;

    .left {
      width: 1.5rem;
      border-right: 1px solid red;

      li {
        font-size: 0.4rem;
        padding: 0.45rem;
        // margin 0.5rem 0;
      }

      .active {
        color: rgb(199, 161, 114);
        border-left: 0.2rem solid rgb(130, 0, 0);
        background-color rgb(20, 21, 21)
      }
    }

    .right {
      flex: 1;
      margin: 0 0 0.1rem 0;

      .list {
        margin-bottom: 1rem;
        .item {
          width: 100%;
          background-color: rgb(20, 21, 21);
          display: flex;
          margin-bottom 0.1rem

          .info {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;

            span {
              font: 0.24rem '微软雅黑';
              color: rgb(199, 161, 114);
              margin-top: -0.1rem;
              margin-bottom: 0.1rem;
            }

            img {
              width: 0.82rem;
              height: 1.33rem;
              margin: 0.2rem;
            }
          }

          .text {
            h2 {
              margin: 0.3rem;
              font-size: 0.25rem;
              color: rgb(199, 161, 114);
            }

            h3 {
              margin-left: 0.2rem;
              font-size: 0.1rem;
              color: rgba(255, 255, 250, 0.4);
            }

            p {
              padding: 0.2rem 0 0.2rem 2rem;
              text-decoration: line-through;
              color: rgb(199, 161, 114);
            }
          }
        }
        .bgactive{
          background-color rgb(37,31,29)
        }
      }
    }
  }
}
</style>