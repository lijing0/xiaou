<template>
    <div>
        <router-view></router-view>
        <!-- 底部导航 -->
        <v-tab></v-tab>
    </div>
</template>
<script>
import vTab from '../views/tabber'
export default {
    components:{
        vTab
    },
}
</script>