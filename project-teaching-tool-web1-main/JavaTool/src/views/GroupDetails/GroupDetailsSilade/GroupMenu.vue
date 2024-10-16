<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" mode="vertical">
    <template v-for="route in GroupDetailRoutes" :key="route.path">
      <a-menu-item @click="to(route)">
        <span style="width: auto">
          {{ route.meta.title }}
        </span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const router = useRouter();
const GroupDetailRoutes = ref<any[]>([]);

// 获取所有路由
const allRoutes = router.getRoutes();

// 找到 'GroupDetail' 路由
const GroupDetailRoute = allRoutes.find((route) => route.name === 'GroupDetail');

// 获取 'GroupDetail' 路由下的所有子路由
if (GroupDetailRoute && GroupDetailRoute.children) {
  GroupDetailRoutes.value = GroupDetailRoute.children;
}

function to(route) {
  router.push({ name: route.name });
}
</script>

<style scoped>
.ant-menu-item-selected {
  /* background-color: #241212; */
}

:where(.css-dev-only-do-not-override-b92jn9).ant-menu-light.ant-menu-root.ant-menu-vertical {
  border-inline-end: 0px;
}
</style>