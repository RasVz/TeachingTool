<template>
  <a-config-provider :locale="zhCN" >
    <div>
      <!-- vue3.0配置 -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.path" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import zhCN from "ant-design-vue/es/locale/zh_CN";
    const route = useRoute();
    console.log(route);

</script>

<style lang="scss">
@import url('./assets/iconfont/iconfont.css');


::-webkit-scrollbar {
  width: 0.5rem;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ccc;
}
</style>
