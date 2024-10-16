<template>
    <div class="body">
        <!-- 标签页-->
        <a-tabs v-model:activeKey="activeKey" style="height: 100% ;">
            <!-- 个人信息 -->
            <a-tab-pane key="1" tab="个人信息">
                <div style=" display: flex;justify-content: center">
                    <a-table :columns="columns" :data-source="data" :show-header="false" :pagination="false"
                        style="width: 100%;">
                    </a-table>
                </div>
                <br>
                <div style=" display: flex;justify-content: center">
                    <a-button type="primary" @click="modal2Visible = true">修改信息</a-button>
                </div>
            </a-tab-pane>
            <!-- 身份信息 -->
            <a-tab-pane key="2" tab="身份信息" force-render>
                <div style=" display: flex;justify-content: center">
                    <a-table :columns="columns" :data-source="data1" :show-header="false" :pagination="false"
                        style="width: 100%;">
                    </a-table>
                </div>
            </a-tab-pane>
            <!-- 账户信息 -->
            <a-tab-pane key="3" tab="账户信息">
                <div style=" display: flex;justify-content: center">
                    <a-table :columns="columns" :data-source="data2" :show-header="false" :pagination="false"
                        style="width: 100%;">
                    </a-table>
                </div>
                <br>
                <div style=" display: flex;justify-content: center" @click="modal3Visible = true">
                    <a-button type="primary">修改信息</a-button>
                </div>
            </a-tab-pane>
        </a-tabs>
        <!-- 个人信息修改弹窗 -->
        <a-modal v-model:open="modal2Visible" title="个人信息" centered @ok="modal2Visible = false">
            <div class="form-container">
                <a-form :rules="rules" :layout="formState.layout" :model="formState" v-bind="formItemLayout"
                    style="width: 100%;">
                    <a-form-item label="姓名" name="name">
                        <a-input v-model:value="formState.name" placeholder="请输入姓名" />
                    </a-form-item>
                    <a-form-item label="微信">
                        <a-input v-model:value="formState.wx" placeholder="请输入微信号" />
                    </a-form-item>
                    <a-form-item label="电话" name="phone">
                        <a-input v-model:value="formState.phone" placeholder="请输入电话" />
                    </a-form-item>
                    <a-form-item label="QQ">
                        <a-input v-model:value="formState.qq" placeholder="请输入QQ号" />
                    </a-form-item>
                    <a-form-item label="邮箱">
                        <a-input v-model:value="formState.email" placeholder="请输入邮箱" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
        <!-- 账户信息修改弹窗 -->
        <a-modal v-model:open="modal3Visible" title="个人信息" centered @ok="modal2Visible = false">
            <div class="form-container">
                <a-form :rules="rules" :layout="formState.layout" :model="formState" v-bind="formItemLayout"
                    style="width: 100%;">
                    <a-form-item label="密码" name="password">
                        <a-input v-model:value="formState.password" placeholder="请输入密码" />
                    </a-form-item>
                    <a-form-item label="确认密码" name="rePassword">
                        <a-input v-model:value="formState.rePassword" placeholder="请输入确认密码" />
                    </a-form-item>
                </a-form>
            </div>
        </a-modal>
    </div>
</template>
<script lang="ts" setup>
import type { Rule } from 'ant-design-vue/es/form';
import { computed, reactive, ref, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';

// 弹窗判断值
const modal2Visible = ref<boolean>(false);
const modal3Visible = ref<boolean>(false);

// 标签页默认显示第一页
const activeKey = ref('1');

// 表单接口
interface FormState {
    layout: 'horizontal'; //布局
    name: string;
    wx: string;
    phone: string;
    qq: string;
    email: string;
    account: string;
    password: string;
    rePassword: string //确认密码
    posts: string; //职位
    unit_id: string // 工号/学号
    attribution:string //所属项目的相关信息
}
const formRef = ref();
// 表单具体数据 数据应从后端获取
const formState: UnwrapRef<FormState> = reactive({
    layout: 'horizontal',
    name: '欣欣',
    wx: 'xixx',
    phone: '1698635475',
    qq: '896325412',
    email: '896325412@qq.com',
    account: '78965412325',
    password: '',
    rePassword: '',
    posts: '前端开发人员',
    unit_id: '114514',
    attribution:'广州城市理工学院-项目式教学1班-第4小组'
});
// 表单项的布局
const formItemLayout = computed(() => {
    const { layout } = formState;
    return layout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        }
        : {};
});
// 表单验证规则
const rules: Record<string, Rule[]> = {
    name: [
        { required: true, message: '请输入名字', trigger: 'change' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入电话号码', trigger: 'change' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
    rePassword: [
        { required: true, message: '请重新输入密码', trigger: 'change' },
        { min: 3, max: 5, message: '密码6-20位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'change' },
        { min: 6, max: 20, message: '密码6-20位', trigger: 'blur' },
    ]
};
// 提交表单触发的方法
const onSubmit = () => {
    formRef.value
        .validate()
        .then(() => {
            console.log('values', formState, toRaw(formState));
        })
        .catch(error => {
            console.log('error', error);
        });
};

// 表格的列
const columns = [
    {
        title: 'Header',
        dataIndex: 'header',
        key: 'header',
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
    },
];
// 表格的具体数据 数据应从后端获取
const data = [
    {
        header: '姓名',
        message: formState.name
    },
    {
        header: '微信',
        message: formState.wx
    },
    {
        header: '电话',
        message: formState.phone
    },
    {
        header: 'QQ',
        message: formState.qq
    },
    {
        header: '邮箱',
        message: formState.email
    },
];
// 表格的具体数据 数据应从后端获取
const data1 = [
    {
        header: '归属',
        message: formState.attribution
    },
    {
        header: '职位',
        message: formState.posts
    },
    {
        header: '工号',
        message: formState.unit_id
    },
];
// 表格的具体数据 数据应从后端获取
const data2 = [
    {
        header: '账户',
        message: formState.account
    },
    {
        header: '密码',
        message: '**********',
        key: '密码'
    },
];

</script>
<style scoped>
.head {
    display: flex;
    justify-content: space-between;
    padding: 1.5%;
    margin: 1%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #fff;
}

.body {
    display: flex;
    flex-direction: column;
    padding: 1.5%;
    margin: 1%;
    height: 700px;
    max-width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: #fff;
    overflow: auto;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%
}
</style>