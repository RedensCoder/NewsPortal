<template>
    <div class="main">
        <div class="content">
            <div class="text_settings">
                <h1 class="text">Создание новостного паблика</h1>
            </div>

            <div class="settings_profile">

                <div class="name_public">
                    <h3>Название паблика</h3>
                    <input v-model="name" type="text" class="input_nick">
                </div>

                <div class="description">
                    <h3>Описание паблика</h3>
                    <textarea v-model="description" cols="103" rows="12" class="description_public"></textarea>
                </div>

                <div class="div_ava">
                    <img v-if="imgAva === null" class="ava" src="/img/add_picture.png" alt="">
                    <img v-else class="ava" style="width: 40px" :src="imgAva" alt="">
                    <input @input="setImg" accept="image/png, image/jpeg" style="visibility: hidden; width: 0px" id="ava" type="file">
                    <label for="ava" class="btn_dowl">Загрузить</label>
                </div>

                <div class="change_social_networs">
                    <h3>Официальный сайт</h3>
                    <input type="url" v-model="link">
                </div>

                <div class="comments_adm">
                    <h3>Комментарий администрации</h3>
                    <input v-model="comm" type="text" class="input_nick">
                </div>

                <button @click="create" class="btn_">Создать паблик</button>
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

const name = ref("");
const description = ref("");
const img = ref(null);
const imgAva = ref(null);
const link = ref("");
const comm = ref("");

function setImg(e) {
  img.value = e.target.files[0];
  imgAva.value = URL.createObjectURL(img.value);
}

async function create() {
  const id = jwtDecode(localStorage.getItem("token")).data.id;

  await api.createPublic(id, name.value, description.value, img.value, link.value, comm.value);
  await router.push("/");
}

useHead({
  title: "Создание Паблика"
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

.btn_dowl{
    margin-left: 20px;
}

.div_ava{
    align-items: center;
    margin-top: 20px;
    display: flex;
}

.description{
    margin-top: 10px;
}

.comments_adm{
    margin-top: 10px;
}

.change_social_networs{
    margin-top: 10px;
    /* padding: 5px 0px; */
}

input{
    width: 325px;
    height: 40px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #81818180;
    padding-left: 10px;
}

.description_public{
    padding-top: 3px;
    padding-left: 5px;
}

h3{
    padding: 15px 0px;
}

.btn_{
    margin-top: 40px;
    max-width: 135px;
    width: auto;
    height: auto;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid;
    color: #8657E9;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 300;
    cursor: pointer;
}

.ava{
    border: 1px solid #818181;
    padding: 10px;
    border-radius: 100px;
}
</style>