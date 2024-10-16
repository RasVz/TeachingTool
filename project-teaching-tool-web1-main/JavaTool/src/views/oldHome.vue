<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" style="padding: 20px">
        <img src="@/assets/feiyuan.jpg" style="width: 100%" />
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <pie-chart-outlined />
          <span>菜品管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-modal v-model:open="modalVisible" title="添加菜品" centered @ok="onSubmit">
      <a-form :model="dish" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-item label="菜品名称">
          <a-input v-model:value="dish.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input v-model:value="dish.price" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model:value="dish.desc" autoSize="true" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <div
          style="display: flex; flex-flow: row; justify-content: space-between; align-items: center"
        >
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>菜品管理</a-breadcrumb-item>
          </a-breadcrumb>
          <a-button type="primary" @click="showModal">添加菜品</a-button>
        </div>

        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <a-table :columns="columns" :data-source="data">
            <template #headerCell="{ column }">
              <template v-if="column.key === 'name'">
                <span>
                  <smile-outlined />
                  菜品名
                </span>
              </template>
            </template>

            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <a>
                  {{ record.name }}
                </a>
              </template>
              <template v-else-if="column.key === 'action'">
                <span>
                  <a @click="deleteDish(record.id)">删除</a>
                  &nbsp;
                  <a-divider type="vertical" />
                  &nbsp;
                  <a>停售</a>
                </span>
              </template>
            </template>
          </a-table>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        copyright © 2008-2023 粤ICP备10066694号 版权所有：广州市飞元信息科技有限公司
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
  <script lang="ts">
const columns = [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: '上架时间',
    key: 'createTime',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    key: 'action'
  }
];

interface Dish {
  name: string;
  price: number;
  desc: string;
}

import {
  SmileOutlined,
  DownOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

import { defineComponent, reactive, ref, UnwrapRef, toRaw } from 'vue';
import DishDao from '@/daos/dish_dao';
const dishDao = new DishDao();

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined,
    TeamOutlined,
    FileOutlined
  },

  setup() {
    const array: Object[] = [];
    const data = ref(array);
    const modalVisible = ref<boolean>(false);

    const init = async () => {
      let result = await dishDao.listAll();
      result.data.data.forEach((element: { key: any; id: any; price: any }) => {
        element.key = element.id.toString();
        element.price = element.price / 100;
      });
      console.log(result.data.data);
      data.value = result.data.data;
    };

    const deleteDish = async (dishId: number) => {
      let result = await dishDao.deleteDish(dishId);
      if (result.data.code == 1) {
        message.info(result.data.data);
        init();
      } else {
        message.error(result.data.msg);
      }
      console.log(result);
    };

    const dish: UnwrapRef<Dish> = reactive({
      name: '',
      price: 0,
      desc: ''
    });
    //保存菜品
    const onSubmit = async () => {
      console.log('submit!', toRaw(dish));
      try {
        let result = await dishDao.saveDish(toRaw(dish));
        if (result.data.code == 1) {
          message.info(result.data.data);
          init();
        } else {
          message.error(result.data.msg);
        }
      } catch (error) {
        message.error('请求错误');
      }
      init();
    };
    //现在添加菜品的模态框
    const showModal = () => {
      modalVisible.value = true;
    };

    init();

    return {
      data,
      columns,
      deleteDish,
      modalVisible,
      showModal,
      onSubmit,
      dish,
      collapsed: ref<boolean>(false),
      selectedKeys: ref<string[]>(['1']),
      labelCol: { style: { width: '100px' } },
      wrapperCol: { style: { width: '250px' }, span: 14 }
    };
  }
});
</script>
  
  
  <style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>