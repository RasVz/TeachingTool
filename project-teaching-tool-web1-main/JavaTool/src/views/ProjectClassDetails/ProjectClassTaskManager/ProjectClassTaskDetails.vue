<template>
    <h1>test01</h1>
    <button  @click="test">111111</button>
</template>
<script setup>

import { useRouter } from 'vue-router';
const router =useRouter();

function test(){
   
router.push("/oldhome") 
}
</script>
