//自訂請求的實例

//導入axios npm install axios
import axios from 'axios';
//定義一個變數,記錄公共的前綴 , baseURL
const baseURL = '/api';
const instance = axios.create({ baseURL })
import { ElMessage } from 'element-plus'

import { useTokenStore } from '@/stores/token.js';
//新增請求攔截氣
instance.interceptors.request.use(
    (config) => {
        //請求前回調
        //添加token
        const tokenStore = useTokenStore();

        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }

        return config;
    },

    (err) => {

        Promise.reject(err)
    }
)
// import { useRouter } from 'vue-router'
// const router = useRouter();
import router from '@/router'
//新增響應攔截器
instance.interceptors.response.use(
    result => {
        if (result.data.code === 0) {
            return result.data;
        }
        if (result.data.code === 1) {
            console.log('Error message from server:', result.data.message);  // 添加這行
            ElMessage.error(result.data.message);
            return Promise.reject(result.data);
        }
        ElMessage.error('服務異常');
        return Promise.reject(result.data);
    },
    err => {
        console.error('Error in response interceptor:', err);  // 添加這行
        if (err.response.status === 401) {
            ElMessage.error('請先登錄');
            router.push('/login');
        }

        ElMessage.error('服務異常');
        return Promise.reject(err);
    }
)

export default instance;