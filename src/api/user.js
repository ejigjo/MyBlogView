//導入request.js請求工具
import request from '@/utils/request.js'

//提供註冊接口函數
export const userRegisterService = (registerData)=>{
    //使用URLSearchParams接收參數
    const params = new URLSearchParams()
    for(let key in registerData){
        params.append(key,registerData[key]);
    }
    return request.post('/user/register',params);
}

//提供登錄接口函數
export const userLoginService = (loginData)=>{
    //使用URLSearchParams接收參數
    const params = new URLSearchParams()
    for(let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post('/user/login',params);
}

//獲取登錄用戶訊息
export const userInfoService = ()=>{
    return request.get('/user/userInfo') 
}
//編輯用戶訊息
export const userInfoUpdateService = (userInfoData)=>{
    return request.put('/user/update',userInfoData) 
}
//修改用戶密碼
export const userUpdatePwdService = (rePasswordData)=>{
    return request.patch('/user/updatePwd',rePasswordData) 
}
//上傳/修改用戶頭像
export const userAvatarUpdateService = (avatarUrl)=>{
    const params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}