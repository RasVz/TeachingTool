<template>
    <a-space>
        <a-select v-model:value="value" style="width: 258   px" @change="handleChange">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
        </a-select>
    </a-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const value = ref('');
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};
</script>