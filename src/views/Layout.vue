<script setup>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
//import router from '@/router';

import { userInfoService } from '@/api/user.js';
import { useUserInfoStore } from '@/stores/userInfo.js';
import { useTokenStore } from '@/stores/token.js';
const userInfoStore = useUserInfoStore();
const tokenStore = useTokenStore();
//獲取用戶資訊
const getUserInfo = async () => {
    let result = await userInfoService();
    userInfoStore.setInfo(result.data);
}

getUserInfo();
import { ElMessageBox ,ElMessage} from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter();
const handleCommand = (command) => {
    if (command === 'logout') {
    
        ElMessageBox.confirm(
        '你確認要退出登錄嗎?',
        '提示',
        {
            confirmButtonText: '確認',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
        //清空pinia中存檔的token以及個人訊息
            tokenStore.removeToken();
            userInfoStore.removeInfo();
         //跳轉到登錄畫面
         router.push('/login')
            ElMessage({
                type: 'success',
                message: '退出成功',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '退出取消',
            })
        })
    } else {
        router.push('/user/' + command)
    }
}


</script>

<template>
    <el-container class="layout-container">
        <!-- 左側選單 -->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-menu-item index="/article/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分類</span>
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>個人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本資料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avatar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更換頭像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetPassword">
                        <el-icon>
                            <EditPen />
                        </el-icon>
                        <span>重設密碼</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!-- 右側主區域 -->
        <el-container>
            <!-- 頭部區域 -->
            <el-header>
                <div>Blog使用者：<strong>{{ userInfoStore.info.nickname }}</strong></div>
                <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar" />
                        <el-icon>
                            <CaretBottom />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本資料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更換頭像</el-dropdown-item>
                            <el-dropdown-item command="resetpassword" :icon="EditPen">重設密碼</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">退出登入</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!-- 中間區域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
            <!-- 底部區域 -->
            <el-footer>JSKMyBlog ©2023 Created by JasonKuo</el-footer>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
    height: 100vh;
    background-color: #ffffff;

    .el-aside {
        background-color: #202022;

        &__logo {
            height: 150px;
            background: url('@/assets/logo.png') no-repeat center / 120px auto;
        }

        .el-menu {
            border-right: none;
        }
    }

    .el-header {
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box {
            display: flex;
            align-items: center;

            .el-icon {
                color: #ffffff;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }
    }

    .el-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        background-color: #ffffff;
    }
}
</style>