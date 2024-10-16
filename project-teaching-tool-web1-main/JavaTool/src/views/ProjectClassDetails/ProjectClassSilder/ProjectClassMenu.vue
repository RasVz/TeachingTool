<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="vertical"
  >
    <template v-for="route in ProjectClassDetailRoutes" :key="route.path">
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
const ProjectClassDetailRoutes = ref<any[]>([]);

// 获取所有路由
const allRoutes = router.getRoutes();
console.log('所有路由:', allRoutes);

// 找到 'ProjectClassDetail' 路由
const ProjectClassDetailRoute = allRoutes.find((route) => route.name === 'ProjectClassDetail');
console.log('ProjectClassDetail 路由:', ProjectClassDetailRoute);

// 获取 'ProjectClassDetail' 路由下的所有子路由
if (ProjectClassDetailRoute && ProjectClassDetailRoute.children) {
  ProjectClassDetailRoutes.value = ProjectClassDetailRoute.children;
}

console.log('ProjectClassDetail 子路由:', ProjectClassDetailRoutes.value);
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