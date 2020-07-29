<template>
  <div class="tabber">
    <mt-tabbar fixed>
      <mt-tab-item id="/home" @click.native="switchTab('/home')">
        <img slot="icon" src="../../assets/img/home_active.png" v-if="this.selected == '/home'" />
        <img slot="icon" src="../../assets/img/home.png" v-else />
        首页
      </mt-tab-item>
      <mt-tab-item id="/cart" @click.native="switchTab('/cart')">
        <img slot="icon" src="../../assets/img/cart_active.png" v-if="this.selected == '/cart'" />
        <img slot="icon" src="../../assets/img/cart.png" v-else />
        购物车
      </mt-tab-item>
      <mt-tab-item id="/me" @click.native="switchTab('/me')">
        <img slot="icon" src="../../assets/img/me_active.png" v-if="this.selected == '/me'" />
        <img slot="icon" src="../../assets/img/me.png" v-else />
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "/home"
    };
  },
  mounted() {
    this.selected = this.$route.path;
  },
  methods: {
    switchTab(dress) {
      if (this.$route.path == dress) {
        return;
      }
      this.$router.push(dress);
    }
  },
  watch:{
      $route(now){
          this.selected = now.path;
      }
  }
};
</script>
<style lang="stylus" scoped>
.tabber{
  // margin-top 1.5rem
}
</style>