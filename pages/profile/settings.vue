<template>
    <div class="main">
        <div class="content">
            <div class="text_settings">
                <h1 class="text">Настройки</h1>
            </div>

            <div class="settings_profile">
                <div class="change_ava">
                    <img v-if="imgAva === ''" class="ava" src="/img/add_picture.png" alt="">
                    <img v-else class="ava" style="width: 40px" :src="imgAva" alt="">
                    <input @change="upload" accept="image/png, image/jpeg" style="visibility: hidden; width: 0px" id="ava" type="file">
                    <label for="ava" class="btn_dowl">Загрузить</label>
                </div>

                <p class="format_text">Формат: jpg, png и другие. <br> Максимальный размер файла: 5Mb. <br> Разрешение: до 96x96px.</p>

                <div class="change_nickname">
                    <h3>Сменить никнейм</h3>
                    <input type="text" v-model="nickname" class="input_nick">
                </div>

                <div class="change_description">
                    <h3>Описание обо мне</h3>
                    <input type="text" v-model="about">
                </div>

                <div class="change_social_networs">
                    <h3>Добавить соц. сети</h3>
                    <input type="url" v-model="link">
                </div>

                <button class="btn_" @click="updateUserInfo">Сохранить настройки</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';
import { useApiStore } from '~/stores/apiStore';
import { jwtDecode } from 'jwt-decode';

let router = useRouter();

const api = useApiStore();
let nickname = ref('');
let about = ref('')
let link = ref('')

const img = ref("");
const imgAva = ref("");

const upload = async (e) => {
  img.value = e.target.files[0];
  imgAva.value = URL.createObjectURL(img.value);
}

onMounted ( async () => {
  if (localStorage.getItem('token') == null || sessionStorage.getItem("user") == null) {
    router.push("/");
  }

  const user = JSON.parse(sessionStorage.getItem("user"));

  nickname.value = user.nickname;
  about.value = user.about;
  link.value = user.link;
})

async function updateUserInfo() {
  let id = jwtDecode(localStorage.getItem('token')).data.id;
  await api.updateUserInfo(id, about.value, nickname.value, link.value)

  if (img.value !== "") {
    await api.uploadUserAvatar(id, img.value)
  }

  router.push("/profile").then(() => window.location.reload())
}

useHead({
  title: "Настройки Профиля"
})
</script>

<style scoped>
.main{
    display: flex;
    justify-content: center;
    max-width: 100%;
}
.content{
    display: flex;
    align-items: center;
    flex-direction: column;
}

.text_settings{
    margin: 30px 0 0px auto;
    width: 100%;
    height: 67px;
    background-color: #FFFFFF;
}

.text{
    color: #000000;
    font-size: 24px;
    padding: 18px;
}

.settings_profile{
    margin: 30px 0 0px auto;
    width: 776px;
    background-color: #FFFFFF;
    height: auto;
    padding: 20px;
}

.format_text{
    margin-top: 20px;
    color: #818181;
    font-size: 14px;
    font-weight: 300;
}

.btn_dowl{
    margin-left: 20px;
}

.change_ava{
    display: flex;
}

.change_nickname{
    /* padding: 5px 0px; */
}

.change_description{
    /* padding: 5px 0px; */
}

.change_social_networs{
    /* padding: 5px 0px; */
}

input{
    width: 330px;
    height: 40px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #81818180;
    padding-left: 10px;
}

h3{
    padding: 15px 0px;
}

.btn_{
    margin-top: 50px;
    width: auto;
    height: auto;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid;
    color: #8657E9;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 300;
    line-height: 17px;
    cursor: pointer;
}

.ava{
    border-radius: 100px;
}
</style>