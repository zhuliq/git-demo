<script setup lang="ts">
import { reactive, computed, ComputedRef, watchEffect } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

interface FormState {
    username: string;
    password: string;
    remember: boolean;
}

const store = useStore()
const router = useRouter()
const rules: Record<string, Rule[]> = {
    username: [{ required: true, validator: validateUser, trigger: 'blur' }],
    password: [{ required: true, validator: validatePass, trigger: 'blur' }],
};

const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
});
const disabled: ComputedRef = computed(() => {
    return !(formState.username && formState.password);
});


// method
// 提交表单且数据验证成功后回调事件
async function onFinish(values: object) {
    // 请求登录并获取歌单
    const res = await store.dispatch('login/getLoginByPass', values)
    // 获取用户等级
    store.dispatch('login/getUserLevel', Storage.prototype.getCanExpireLocal('login_cookie'))
    if (store.state.login.data.isLogin) {
        //路由跳转
        router.push({
            path: '/my'
        })
    } else {
        // 清空输入框
        formState.password = ''
        alert(res.data.msg)
    }
};
// 提交表单且数据验证失败后回调事件
function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo);
};

//使用正则表达式验证手机号
// value为input中输入的值
async function validateUser(_rule: Rule, value: string) {
    if (value === '') {
        return Promise.reject('手机号不能为空');
    } else {
        //获取工具类中的手机号正则表达式
        const phoneReg =
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (phoneReg.test(value)) {
            return Promise.resolve();
        } else {
            //如果验证输入错误就清空
            formState.username = "";
            return Promise.reject("请输入正确的手机号");
        }
    }
};
//使用正则表达式验证密码,密码8-20位，至少包含字母/数字/字符2种组合
async function validatePass(_rule: Rule, value: string) {
    if (value === '') {
        return Promise.reject('密码不能为空');
    } else {
        //获取工具类中的手机号正则表达式
        const passwordReg =
            /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,20}$/;
        if (passwordReg.test(value)) {
            return Promise.resolve();
        } else {
            //如果验证输入错误就清空
            formState.password = "";
            return Promise.reject("请输入正确的密码");
        }
    }
};
// 返回上一级
function leftClick():void{
    router.go(-1)
}

function noDevelop(){
    alert('暂未开发')
}
</script>

<template>
    <div class="loginWrap">
        <!-- 顶部导航栏 -->
        <TopNav iconListLeft="#icon-xitongfanhui" iconListRight='#icon-diandian' middleStyle = 'login'
            :leftClick='leftClick' />

        <!-- <div class="welcomeLogin">欢迎登录</div> -->
        <!-- 表单 -->
        <a-form :model="formState" name="normal_login" class="login-form" @finish="onFinish"
            @finishFailed="onFinishFailed" :rules="rules">
            <a-form-item name="username">
                <a-input v-model:value="formState.username" placeholder="请输入手机号">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item name="password">
                <a-input-password v-model:value="formState.password" placeholder="请输入密码">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
                </a-form-item>
                <a class="login-form-forgot" @click="noDevelop">忘记密码</a>
            </a-form-item>

            <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                    登录
                </a-button>
            </a-form-item>
        </a-form>
        <!-- 其他登录 -->
        <div class="otherWayLogin">—————— 其他登录方式 ——————</div>
        <div class="loginWay">
            <span @click="noDevelop">扫码登陆</span>
            <span @click="noDevelop">验证码登陆</span>
        </div>
    </div>
</template>

<style scoped lang="less">
.loginWrap {
    margin: 0 3.5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 12vw;

    .login-form {
        width: 55rem;
        margin-top: 3.5vw;

        .login-form-forgot {
            float: right;
        }

        .login-form-button {
            width: 100%;
        }
    }

    .loginWay {
        width: 55rem;
        display: flex;
        justify-content: space-between;
        margin-top: 3.5vw;
    }
}
</style>
