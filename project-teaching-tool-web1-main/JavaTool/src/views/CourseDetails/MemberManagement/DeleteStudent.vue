<template>


    <a-modal title="批量删除"  width="800px" >
        <p style="color:red">删除后所选学生在之前班级和小组产生的学习数据会有影响，请慎重操作！
            确认要删除所选学生吗？</p>
        <DeleteStudentTable/>
    </a-modal>


   


</template>
<script lang="ts" setup>


import DeleteStudentTable from './DeleteStudentTable.vue';
import { ref } from 'vue';



</script>