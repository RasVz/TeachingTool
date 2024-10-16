<template>

  <a-menu class="menu" v-model:selectedKeys="selectedKeys" theme="light">
    <template v-for="route in routes.children">
      <a-menu-item v-if="!route.meta.hidden" :key="route.meta.key as string || route.name" @click="to(route)">
        <svg-icon :name="route.meta.icon" />
        <span>{{ route.meta.title }}</span>
      </a-menu-item>
    </template>
  </a-menu>


</template>
<script setup lang="ts">

import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const props = defineProps({
  number: {
    type: Number,
  }
})


const routes = ref(useRouter().options.routes[props.number]);
const selectedKeys = ref<string[]>([]);
//获取所有路由对象
const route = useRoute();
//获取路由器对象
const router = useRouter();
function to(route: any) {
  const { redirect, name } = route;
  if (redirect) {
    router.push({ name: redirect });
    return;
  }
  router.push({ name: name });

}
watch(
  () => route.meta.key as string,
  (newValue) => {
          selectedKeys.value = [newValue];
  },
  { immediate: true }
);
</script>
<style scoped>
.menu {
  height: 100%;
  overflow-y: auto;
  /* 或者 auto，取决于你的需求 */
  -ms-overflow-style: none;
  /* IE 和 Edge */
  scrollbar-width: none;
  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
}

:deep(.ant-menu-item) {
  padding: 0 15px;
}

span {
  margin-left: 15px;
  vertical-align: middle;
}
</style>