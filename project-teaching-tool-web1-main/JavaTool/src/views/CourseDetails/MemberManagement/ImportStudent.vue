<template>
    <a-modal  title="导入学生" :destroyOnClose=true :footer="null" :keyboard=true  @cancel="handleModalCancel">

      <div style="margin-bottom:20px">
      <a>下载导入模版</a>
      </div>

      <div style="display: flex; align-items: center;">
    <a-upload
      v-model:file-list="fileList"
      name="file"
      action=""
      :headers="headers"
      @change="handleChange"

    >
    
      <a-button>
        <upload-outlined></upload-outlined>
        点击上传
      </a-button>
    
    </a-upload>
    <span style="margin-left: 10px;">只能上传xxx文件</span>
  </div>
</a-modal>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadChangeParam } from 'ant-design-vue';
  
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
  };
  
  const fileList = ref([]);
  const headers = {
    authorization: 'authorization-text',
  };

  const handleModalCancel = () => {
  fileList.value = [];
};

 





  </script>
  
  