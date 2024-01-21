<template>
  <div>
	<Articles />
    <div class="password">
    <input type="password" id="password-input" placeholder="Введите пароль" v-model="password">
    <span @click="togglePasswordVisibility" class="password-icon1">
      <a href="#" class="password-control" :class="showPassword"></a>
    </span>
  </div>

    <!-- <input type="password" v-model="password" :type="showPassword ? 'text' : 'password'" class="ds">
    <span @click="togglePasswordVisibility" class="password-icon1">
      <i class="fa" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
    </span> -->
    <!-- <button v-if="password && checkboxValue" class="btn_form1">Зарегистрироваться</button>
    <button v-else class="btn_form2" disabled>Зарегистрироваться</button> -->
  </div>

  <div>

	<div class="header">
		<div class="header_content">
			<div class="text_portal">
				<h2 class="text1">НОВОСТНОЙ<span style="color: #8657E9;">ПОРТАЛ</span></h2>
			</div>

			<div class="buttons" v-if="div_btn">
				<button class="btn1" @click="div_btn = !div_btn">Войти</button>
				<button class="btn2" >Зарегистрироваться</button>
			</div>

			<div v-else class="profile">

					<img  @click="show = !show" src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
					<button class="btn3">Мой профиль</button>

				<div class="profile_list">
          
          <div class="flex">
            <img   src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
            <p class="nickname">nickname</p>
          </div>
					
          <hr class="hr_profile">

          <div class="public_profile">
            <nuxtlink class="text_my_public">Мои публикации</nuxtlink>
            <nuxtlink class="text_add_public">Создать публикацию</nuxtlink>
          </div>
          
          <hr class="hr_profile">

          <div class="settings_profile">
            <div class="settings_flex">
              <img src="../public/img/Help.svg" alt="" class="img">
              <nuxtlink class="help" style="color: #818181;">Поддержка</nuxtlink>
            </div>
            <div class="settings_flex">
              <img src="../public/img/Settings.svg" alt="" class="img">
              <nuxtlink class="settings" style="color: #818181;">Настройки профиля</nuxtlink>
            </div>
            <div class="settings_flex">
              <img src="../public/img/Cancel.svg" alt="" class="img">
              <nuxtlink class="exit" style="color: #EB3223;">Выйти</nuxtlink>
            </div>
          </div>
        </div>
			</div>
		</div>
	</div>
  <button @click="scrollToTop" class="scroll_btn"></button>
</div>

</template>

<script setup>
import '@fontsource-variable/inter';
import ("~/assets/css/second.css");
import { QuillEditor } from '@vueup/vue-quill'
import { ref } from 'vue';

const content = ref("")

let div_btn = ref(true);
// let show = ref(false);

let password = ref('');

let showPassword = ref(false);

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

function togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
</script>

<style scoped>
body {
	font-size:14px;
	padding: 15px 20px;
}
.password {
	width: 300px;
	margin: 15px auto;
	position: relative;
}
#password-input {
	width: 100%;
	padding: 5px 0;
	height: 30px;
	line-height: 40px;
	text-indent: 10px;
	margin: 0 0 15px 0;
	border-radius: 5px;
	border: 1px solid #999;
	font-size: 18px;
}
.password-control {
	position: absolute;
	top: 11px;
	right: 6px;
	display: inline-block;
	width: 20px;
	height: 20px;
	background: url(https://snipp.ru/demo/495/view.svg) 0 0 no-repeat;
}
.password-control.view {
	background: url(https://snipp.ru/demo/495/no-view.svg) 0 0 no-repeat;
}

button {
        cursor: pointer;
    }
	/* ТУТ НИЖЕ ТЕСТ ШАПКИ СО ВХОДОМ В ПРОФИЛЬ! */
.header{
    background-color: #202124;
    height: 150px;
    display: flex;
    justify-content: space-between;
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
}

.profile_list{
  display: flex;
  flex-direction: column;
  position: fixed;
  width: auto;
  height: auto;
  background-color: #ffffff;
  border-radius: 4px;
  right: 45px;
  top: 80px;
}

.flex{
  display: flex;
  align-items: center;
  padding: 10px;
}

.nickname{
  color: #0048ffb9;
  font-size: 20px;
  line-height: 19.36px;
  width: 400;
   
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

.public_profile nuxtlink{
  font-size: 20px;
  font-weight: 300;
  line-height: 19px;
  padding-left: 10px;
}

.text_add_public{
  padding-top: 20px;
}

.settings_profile{
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.settings_profile nuxtlink{
  font-size: 20px;
  font-weight: 300;
  line-height: 19px;
  padding-left: 5px;
  padding-top: 2.5px;
}

.settings_flex{
  display: flex;
  padding-top: 10px;
}

.img{
  width: 25px;
  height: 25px;
}

.scroll_btn{
  position: fixed;
  background-color: #673ab7;
  right: 20px;
  bottom: 20px;
  border-radius: 22px;
  cursor: pointer;
  width: 40px;
  height: 40px;
}

.scroll_btn::before {
  content: "";
  text-align: center;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 8px;
  top: 8px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cg fill='none' stroke='%23fff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 17V4M3 10l7-7 7 7'/%3E%3C/g%3E%3C/svg%3E");
}
</style>