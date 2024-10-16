<template>
  <div class="team-details">
    <h2  style="text-align: center;">{{ teamName }}</h2>
    <p><strong>所属项目:</strong> </p>
    <p style="text-align: center;">{{ projectName }}</p>
    <p><strong>负责老师:</strong></p>
    <p style="text-align: center;">{{ teacher }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const teamName = ref('项目班名称');
const projectName = ref('在线教育平台，类淘宝系统');
const teacher = ref('张老师');
</script>

<style scoped>
.team-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 350px;
  margin: 0 auto;
}

h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 12px;
  font-weight: bold;
}

p {
  font-size: 1.1rem;
  color: #34495e;
  margin: 10px 0;
}

strong {
  color: #2980b9;
  font-weight: bold;
}
</style>
