<template>
    <div class="header">
        <div class="header_content">
            <div class="text_portal">
                <NuxtLink to="/" style="text-decoration: none;"><h1 class="text1">НОВОСТНОЙ<span style="color: #8657E9;">ПОРТАЛ</span></h1></NuxtLink>
            </div>

            <div class="buttons" v-if="dsa">
				<button class="btn1" @click="routerPushAuthorization">Войти</button>
				<button class="btn2" @click="routerPushRegistr">Зарегистрироваться</button>
			</div>

			<div v-else class="profile">

                <img  @click="show = !show" src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
                <button class="btn3">Мой профиль</button>


                <div class="profile_list" v-if="show">
            
                    <div class="flex">
                        <img   src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
                        <p class="nickname">@{{ nickname }}</p>
                    </div>
                            
                    <hr class="hr_profile">

                    <div class="public_profile">
                        <NuxtLink class="text_my_public">Мои публикации</NuxtLink>
                        <NuxtLink class="text_add_public">Создать публикацию</NuxtLink>
                        <NuxtLink class="text_add_public">Сменить тему</NuxtLink>
                        <NuxtLink class="text_add_public" to="/public">Паблики</NuxtLink>
                    </div>
                
                    <hr class="hr_profile">

                    <div class="settings_profile">
                        <div class="settings_flex">
                            <img src="../public/img/Help.svg" alt="" class="img">
                            <p class="help" style="color: #818181;">Поддержка</p>
                        </div>
                        <div class="settings_flex">
                            <img src="../public/img/Settings.svg" alt="" class="img">
                            <p class="settings" style="color: #818181;">Настройки профиля</p>
                        </div>
                        <div class="settings_flex" @click="usersExit">
                            <img src="../public/img/Cancel.svg" alt="" class="img">
                            <p class="exit" style="color: #EB3223;" >Выйти</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="scrollToTop" class="scroll_btn"></button>
    </div>
</template>

<script setup>
import { useApiStore } from '#imports';
import { jwtDecode } from 'jwt-decode';
// import { authorization } from '~/pages/authorization.vue';

const api = useApiStore();
let show = ref(false);
let dsa = ref(true);
let router = useRouter();
let nickname = ref('');

function routerPushAuthorization() {
    router.push({path: "/authorization"});
}

function routerPushRegistr() {
    router.push({path: "/registr"});
}

onMounted(async () => {
    if (localStorage.getItem('token') == null) {
        dsa.value = true;
    }
    else {
        let id = jwtDecode(localStorage.getItem('token')).data.id;
        console.log(id);

        let res = await api.getUserInfoById(id);
        
        nickname.value = res.nickname;
        dsa.value = false;
    }
});

function usersExit() {
    localStorage.removeItem('token');
    window.location.reload();
}

function scrollToTop(){
  let currentScroll = document.documentElement.scrollTop,
    int = setInterval(frame, 6)
    
  function frame(){
      if( 0 > currentScroll)
          clearInterval(int)
          
      else {
          currentScroll = currentScroll - 12
          document.documentElement.scrollTop = currentScroll
      }
  }
} 
</script>

<style scoped>
a{
    text-decoration: none;
}

p{
    padding-left: 5px;
}

button {
    cursor: pointer;
}

.header{
    background-color: #202124;
    height: 150px;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0px;
}

.header_content{
    display: flex;
    justify-content: space-between;
    width: 100%;
}

.text_portal{
    padding-top: 60px;
    padding-left: 120px;
}

.text1{
    color: #ffffff;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.8px;
}

.buttons{
    display: flex;
    padding-right: 50px;
}

.btn1{
    border: none;
    background: none;
    color: white;
    font-size: 16px;
    line-height: 19px;
    margin-right: 20px;
}

.btn2{
    margin-top: 50px;
    border-radius: 4px;
    background-color: #8657E9;
    border: none;
    padding: 15px 15px;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    height: 50px;
}

.profile{
    width: auto;
    margin-top: 50px;
    margin-right: 150px;
    display: flex;
}

.btn3{
    border-radius: 4px;
    background-color: #8657E9;
    border: none;
    padding: 15px 15px;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    height: 50px;
}

.ava{
    margin-top: 4px;
    margin-right: 10px;
    width: 40px;
    height: 40px;    
    border-radius: 49px;
    cursor: pointer;
}

.profile_list{
    display: flex;
    flex-direction: column;
    position: fixed;
    width: auto;
    height: auto;
    background-color: #ffffff;
    right: 45px;
    top: 80px;
    border-radius: 4px;
    -webkit-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
}

.flex{
    display: flex;
    align-items: center;
    padding: 10px;
}

.nickname{
    color: #0047FF99;
    font-size: 18px;
    line-height: 19.36px;
    width: 300;
    font-family: 'Inter Variable', sans-serif; 
}

.hr_profile{
    margin-top: 10px;
    color: #81818180;
    width: 250px;
    border: 1px solid;
}


.public_profile{
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 80px;
}

.public_profile a{
  font-size: 20px;
  font-weight: 300;
  line-height: 19px;
  padding-left: 5px;
}

.text_add_public{
    padding-top: 20px;
    color: #202124;;
}

.settings_profile{
    display: flex;
    flex-direction: column;
    padding: 10px;

}

.settings_flex{
  display: flex;
  padding-top: 10px;
  cursor: pointer;
  font-size: 20px;
}

.img{
  width: 25px;
  height: 25px;
}

.scroll_btn{
  position: fixed;
  background-color: #673ab7;
  left: 20px;
  bottom: 20px;
  border-radius: 20px;
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.scroll_btn::before {
  content: "";
  position: absolute;
  width: 22px;
  height: 22px;
  left: 8px;
  top: 8px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 17V4M3 10l7-7 7 7'/%3E%3C/g%3E%3C/svg%3E");
}
</style>