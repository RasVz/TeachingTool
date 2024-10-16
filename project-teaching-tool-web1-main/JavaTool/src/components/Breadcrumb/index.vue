<template>

  <div class="app-breadcrumb">
    <transition-group name="breadcrumb">
      <div class="app-breadcrumbs" v-for="(item, index) in levelList" :key="item.path">
        <span v-if="item.meta.toLink === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
          item.meta.title }}</span>

        <a class="app-a" v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        <span v-if="index != levelList.length - 1"> / </span>
      </div>
    </transition-group>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import store from '@/store'
//面包屑路由
let levelList = ref(null);
//获取当前路由
const route = useRoute();
//获取当前路由器
const router = useRouter();


const back = () => {
  if (store.getters.collapsed == true) {
    store.commit('CHANGE_COLLAPSED', false)
  }
  router.go(-1)
}
//面包屑获取当前的路由
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

//点击面包屑跳转路由
const handleLink = (item) => {
  const { redirect, name } = item;
  if (redirect) {
    router.push({name:redirect});
    return;
  }
  router.push({ name: name });
};
//监听路由变话改变面包屑
watch(
  () => router.currentRoute.value.path,
  () => {
    getBreadcrumb();
  }
);
//挂载时触发方法
onMounted(() => {
  getBreadcrumb();
});
</script>




<style lang="scss" scoped>
.app-breadcrumb {
  display: inline-block;
 
  font-size: 18px;

  margin-left: 20px;
}

.app-breadcrumbs {

  display: inline-block;
  font-size: 18px;
  margin-left: 5px;

}

.app-a {
  color: #817f7f;
}

.no-redirect {
  color: #000000;
  cursor: text;
}

.app-button {
  display: inline-block;
  margin-left: 10px;
}

.breadcrumb-move,
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s ease;
}

.breadcrumb-enter-from,
.breadcrumb-leave-to {
  opacity: 0;
  transform: translateX(30px);
}


.breadcrumb-leave-active {
  position: absolute;
}
</style>
