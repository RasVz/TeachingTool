<template>
     <div style="display: flex; justify-content: space-between;width: 100%;height: 100%;">
          <div style="display: flex ;width: 70%;">
            <div style="margin:0 7%;">
              <img src="@/assets/logo.png" alt="Logo" class="logo" style="height: 62px" />
            </div>
            <div>
              <Breadcrumb/>
            </div>
          </div>
          <a-dropdown>
            <a-avatar style="margin: 10px 30px 10px 10px" src="" />
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="goTo">个人中心</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">我的小组</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">退出登录</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
      </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Breadcrumb from '../components/Breadcrumb/index.vue';

const router = useRouter()
function goTo(){
  router.push( { name: '个人中心' } ); 
}
</script>