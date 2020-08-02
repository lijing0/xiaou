<template>
  <div>
    <van-nav-bar @click-left="$router.back()" :title="$route.meta.title" left-text="返回" left-arrow></van-nav-bar>
    <van-address-edit
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import { AddressEdit } from "vant";
export default {
  data() {
    return {
      searchResult: [],
    };
  },
   methods: {
        onSave() {
        Toast('save');
        },
        onDelete() {
        Toast('delete');
        }
    }
}
</script>

<style  lang="" scoped>
</style>
