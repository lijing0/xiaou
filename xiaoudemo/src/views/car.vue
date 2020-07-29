<template>
  <div>
    <!-- 顶部导航 -->
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.title" left-text="返回" left-arrow></van-nav-bar>
    <van-list>
      <van-swipe-cell v-for="item in carList" :key="item.id">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-checkbox :name="item.id"></van-checkbox>
        <van-card
          class="card"
          :price="item.price"
          :desc="item.goodsname"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        >
          <template #footer>
            <van-stepper :value="item.num" async-change />
          </template>
        </van-card>
        </van-checkbox-group>
        <template #right>
          <van-button square text="删除" @click="del" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-empty v-if="carList==null" description="购物车空空如也，快去买买买。。。" />
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";
import { Checkbox, CheckboxGroup } from 'vant';
import { cartlist } from "../util/axios";
export default {
  data() {
    return {
      value: 1,
      carList: [],
       result: [],
    };
  },
  mounted() {
    this.getCarList();
  },
  methods: {
    getCarList() {
      cartlist({
        uid: JSON.parse(sessionStorage.getItem("userInfo")).uid,
      }).then((res) => {
        if (res.code == 200) {
          console.log(res, "返回值");
          this.carList = res.list;
          this.carList.map((item) => {
            item.status = item.status == 1 ? true : false;
          });
        } else {
          Toast(res.msg);
        }
      });
    },
    del(i) {
      console.log("删除它");
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
  /* margin-bottom: 10px !important; */
}
.delete-button {
  height: 76%;
  margin-top: 30px;
}
.van-card{
  width: 95%;
  margin-left: 30px;
}
.van-stepper {
  width: 200px;
  height: 50px;
  margin-left: 80px;
  margin-top: -50px;
}
.van-checkbox{
  width: 20px;
  height: 20px;
  position: relative;
  left: 10px;
  top: 80px;
  z-index: 9999;
}

.van-checkbox-group{
  /* background: #f3f3f3; */
}
</style>
