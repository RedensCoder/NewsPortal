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

                <img  @click="show = !show" :src="avatar" alt="аватарка не загрузилась" class="ava">
                <NuxtLink to="/profile"><button class="btn3">Мой профиль</button></NuxtLink>


                <div class="profile_list" v-if="show">
            
                    <div class="flex">
                        <img :src="avatar" alt="аватарка не загрузилась" class="ava">
                        <p class="nickname">@{{ nickname }}</p>
                    </div>
                            
                    <hr class="hr_profile">

                    <div class="public_profile">
                        <NuxtLink class="text_my_public">Мои публикации</NuxtLink>
                        <NuxtLink class="text_add_public" to="/articles/editor">Создать публикацию</NuxtLink>
                        <NuxtLink class="text_add_public">Сменить тему</NuxtLink>
                        <NuxtLink class="text_add_public" to="/publics/">Паблики</NuxtLink>
                    </div>
                
                    <hr class="hr_profile">

                    <div class="settings_profile">
                        <div class="settings_flex">
                            <img src="../public/img/Help.svg" alt="" class="img">
                            <p class="help" style="color: #818181;">Поддержка</p>
                        </div>
                        <div class="settings_flex">
                            <img src="../public/img/Settings.svg" alt="" class="img">
                            <NuxtLink to="/profile/settings"><p class="settings" style="color: #818181;">Настройки профиля</p></NuxtLink>
                        </div>
                        <div class="settings_flex" @click="usersExit">
                            <img src="../public/img/Cancel.svg" alt="" class="img">
                            <p class="exit" style="color: #EB3223;" >Выйти</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <button @click="scrollToTop" class="scroll_btn"></button> -->
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import ("~/assets/css/first.css");
import { useApiStore } from '#imports';
import { jwtDecode } from 'jwt-decode';
// import { authorization } from '~/pages/authorization.vue';

const api = useApiStore();
let show = ref(false);
let dsa = ref(true);
let router = useRouter();

let nickname = ref('');
let avatar = ref("");

function routerPushAuthorization() {
    router.push({path: "/authorization"});
}

function routerPushRegistr() {
    router.push({path: "/registr"});
}

onMounted(async () => {
    if (localStorage.getItem('token') == null || sessionStorage.getItem("user") == null) {
        dsa.value = true;
    }
    else {
        const user = JSON.parse(sessionStorage.getItem("user"));

        nickname.value = user.link;
        avatar.value = user.avatar;

        dsa.value = false;
    }
});

function usersExit() {
    localStorage.removeItem('token');
    sessionStorage.removeItem("user");
    router.push("/").then(() => window.location.reload());
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
    position: sticky;
}

.header_content{
    display: flex;
    min-height: 150px;
    justify-content: space-between;
    width: 100%;
    max-width: 100%;

}

/* адаптив начало */

@media (max-width: 1400px){
    .header_content{
        max-width: 1400px;
    }
    .scroll_btn{
        position: fixed;
        left: 120px;
    }
}
@media (max-width: 1024px){
    .header_content{
        max-width: 1024px;
    }
    .scroll_btn{
        left: 30px;
    }
}
@media (max-width: 992px){
    .header_content{
        max-width: 992px;
    }
    .scroll_btn{

    }
}
@media (max-width: 767px){
    .header_content{
        max-width: none;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        /* align-items: center; */
        height: auto;
    }
    .buttons{
        display: flex;
        
    }
    .scroll_btn{
        position: fixed;
        /* left: 650px; */
    }
}
@media (max-width: 425px) {
    * {
        display: block;
    }
  .header_content{
        max-width: none;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        /* align-items: center; */
        height: auto;
    }
}
/* адаптив конец */

.text_portal{
    padding-top: 56px;
    padding-left: 7.5%;
}

.text1{
    color: #ffffff;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.8px;
}

.buttons{
    display: flex;
    padding-right: 5%;
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
    margin-right: 7.5%;
    display: flex;
}

.btn3{
    border-radius: 4px;
    background-color: #8657E9;
    border: none;
    margin-left: 10px;
    min-width: 200px;
    padding: 15px;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    text-align: center;
    min-height: 50px;
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
    right: 140px;
    top: 110px;
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
  margin-left: 20px;
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
  left: 10px;
  top: 10px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 17V4M3 10l7-7 7 7'/%3E%3C/g%3E%3C/svg%3E");
}

</style>