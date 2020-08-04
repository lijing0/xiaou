<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar :title="$route.meta.title"  ></van-nav-bar>
    <van-list>
      <van-swipe-cell v-for="(item,index) in carList" :key="item.id">
        <input class="van-checkbox" type="checkbox" v-model="item.checked" />
        <van-card
          class="card"
          :price="item.price"
          :desc="item.goodsname"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        >
        </van-card>
        <div class="count">
            <span @click="minus(index)">-</span>
            <i>{{item.num}}</i>
            <span @click="add(index)">+</span>
        </div>
        <!-- </van-checkbox-group> -->
        <template #right>
          <van-button square text="删除" @click="del(item.id)" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-empty v-if="carList==null" description="购物车空空如也，快去买买买。。。" />

      <van-submit-bar :price="allPrice*100" button-text="去结算" @submit="onSubmit">
        <input type="checkbox" v-model="checkAll" @change="allCheck" />全选
      </van-submit-bar>
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
// import { Checkbox, CheckboxGroup } from "vant";
import { cartlist,cartdelete } from "../util/axios";
export default {
  data() {
    return {
      checkAll: false,
      value: 1,
      carList: [],//商品列表
      result: [],//多选组
    };
  },
  watch: {
    carList: {
      deep: true,
      handler() {
        this.checkAll = this.carList.every((item) => item.checked);
      },
    },
  },
  mounted() {
    this.getCarList();
  },
  computed: {
    allPrice() {
      let sum = 0;
      //map 映射  forEach reduce...
      //数组.map
      this.carList.map((item, index, arr) => {
        //item代表数组的每一项
        //index代表索引
        // arr 代表原数组
        //你可以return 一个新数组
        // console.log(item,index,arr)
        if (item.checked) {
          sum += item.price * item.num;
        }
      });
      return sum;
    },
  },
  methods: {
    
    getCarList() {  
      cartlist({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
      }).then((res) => {
        if (res.code == 200) {
          this.carList = res.list;
          this.carList.map((item) => {
            item.status = item.status == 1 ? true : false;
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    // 删除事件
    del(id) {
      // this.carList.splice(id, 1);
      cartdelete({id}).then(res=>{
        this.getCarList()
      })
    },
     //去结算
    onSubmit() {
      if (this.allPrice != 0) {
        sessionStorage.setItem("allPrice", JSON.stringify(this.allPrice));
        // this.$store.commit('allPrice',this.priceAll)
        // console.log(this.result)
        // let checkPro = this.result.map(item => {
        //   return this.carList[item];
        // });
        // console.log(this.checkPro)
        // sessionStorage.setItem("checkPro", JSON.stringify(checkPro));
        this.$router.push("/order");
      } else {
        Toast("您还未选择商品");
      }
    },
    // 数量增加
    add(a) {
      if (this.carList[a].num == 99) {
        return;
      }
      this.carList[a].num++;
    },
    // 数量减少
    minus(b) {
      if (this.carList[b].num == 1) {
        return;
      }
      this.carList[b].num--;
    },
    // 封装一个全选事件
    allCheck() {
      // 利用map对商品列表进行遍历
      this.carList.map((item) => {
        item.checked = this.checkAll;
      });
    },
    check() {
      console.log(this);
    },
  },
  beforeRouteEnter(to, from, next) {
    if (sessionStorage.getItem("userInfo")) {
      next();
    } else {
      Toast("请先登录,才能查看购物车");
      //直接给用户跳转到购物车
      next("/login");
    }
  },
};
</script>

<style  lang="" scoped>
.card {
  background: #fff !important;
}
.van-list{
  margin-bottom: 120px;
}
.delete-button {
  height: 82%;
  margin-top: 24px;
}
.van-card {
  width: 95%;
  margin-left: 30px;
}

.count {
  position: relative;
  float: right;
  margin-right: 30px;
  margin-top: -60px;
  width: 102px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #999;
}
.count span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
}
.count i {
  display: inline-block;
  width: 30px;
  height: 30px;
  font-style: normal;
  border: 1px solid #999;
  border-top: none;
  border-bottom: none;
  text-align: center;
}
.van-checkbox {
  width: 16px;
  height: 16px;
  position: relative;
  left: 10px;
  top: 70px;
  z-index: 9999;
}
.van-submit-bar{
  margin-bottom:50px;
}
</style>
