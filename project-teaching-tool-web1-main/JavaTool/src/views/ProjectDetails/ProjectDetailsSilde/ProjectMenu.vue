<template>
    <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 100%" mode="vertical">
        <template v-for="route in projectDetailRoutes" :key="route.path">
            <a-menu-item @click="to(route)">
                <span>
                    {{ route.meta.title }}
                </span>
            </a-menu-item>
        </template>
    </a-menu>

    <!-- <div>
        <template v-for="route in projectDetailRoutes" :key="route.path">
            <span @click="to(route)"></span>
        </template>
    </div> -->
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const selectedKeys = ref<string[]>([]);
const openKeys = ref<string[]>([]);

const router = useRouter();
const route = useRoute();
const projectDetailRoutes = ref<any[]>([]);

// 获取所有路由
const allRoutes = router.getRoutes();

// 找到 'ProjectDetail' 路由
const projectDetailRoute = allRoutes.find(route => route.path === '/ProjectDetail/:id');


// 获取 'ProjectDetail' 路由下的所有子路由
if (projectDetailRoute && projectDetailRoute.children) {
    projectDetailRoutes.value = projectDetailRoute.children;
}

function to(route) {
    router.push({ name: route.name });
}

watch(() => route.name as string, (newValue) => {
    selectedKeys.value = [newValue]
}, { immediate: true });

</script>

<style scoped>
.ant-menu-item-selected {
    /* background-color: #241212; */
}


:where(.css-dev-only-do-not-override-b92jn9).ant-menu-light.ant-menu-root.ant-menu-vertical {
    border-inline-end: 0px;
}
</style>