<script setup>
import ("~/assets/css/second.css");
import ("~/assets/css/first.css");
import '@fontsource-variable/inter';
import { useApiStore } from '#imports';
import { jwtDecode } from 'jwt-decode';

let quantity = ref(0);
const api = useApiStore();
let dsa = ref(true);
let nickname = ref('');

onMounted(async () => {
    if (localStorage.getItem('token') == null) {
        dsa.value = true;
    }
    else {
        let id = jwtDecode(localStorage.getItem('token')).data.id;

        let res = await api.getUserInfoById(id);
        sessionStorage.setItem("user", JSON.stringify(res));
        dsa.value = false;
    }
});

useHead({
  title: "Новостной Портал"
})
</script>

<template>
    <!-- СТРАНИЦА СО СТАТЬЯМИ -->
<Articles />
<div class="news">
    <div class="info">
        <img class="user_icon" src="public/img/user.png" alt="">
        <p class="user_name text">{{nickname}}</p>
        <p class="post_data">5 минут назад</p>
    </div>

        <p class="categories">Статья</p>
        <h1 class="name_articles">Основы интернета</h1>
        <img class="articles_picture" src="public/img/acrticles_example.png" alt="123">
        <p class="text_articles">Интернет, безусловно, стал одной из самых важных частей нашей современной жизни. Однако, несмотря на его всеобъемлющее присутствие, мало кто задумывается над его основами и принципами работы. <br>
    В основе интернета лежит потрясающая сетевая инфраструктура, которая обеспечивает связь между компьютерами по всему миру. 
    Эта инфраструктура включает в себя огромное количество сетевых провайдеров, серверов, роутеров и протоколов, которые работают вместе, чтобы обеспечить надежное и эффективное функционирование интернета.</p>
        <button class="read_button">Читать далее</button>

    <div class="buttons_post">
        <div class="div_like" @click="quantity_like1">
            <img src="~/public/img/Facebook Like.svg" alt="NO" class="img_like" >
            <p class="quantity_like" >{{ 1 }}</p>
        </div>
        <div class="div_dizlike" >
            <img src="../public/img/Facebook DizLike.svg" alt="NO" class="img_like" >
            <p class="quantity_like" >2</p>
        </div>
        <div class="div_commnets" >
            <img src="../public/img/Chat Message.svg" alt="NO" class="img_like" >
            <p class="quantity_like" >4</p>
        </div>
        <div class="div_viewing" >
            <img src="../public/img/Eye.svg" alt="NO" class="img_like" >
            <p class="quantity_like" >5</p>
        </div>
        <div class="div_share" >
            <img src="../public/img/Share.svg" alt="NO" class="img_like" >
        </div>
    </div>
</div>
</template>

<style scoped>
.news{
    width: 50%;
    height: auto;
    background-color: #FFFFFF;
    margin-left: 30%;
    margin-top: 2.5%;
}
.user_icon{
    width: 5%;
    display: inline;
    border-radius: 49px;
    margin-left: 2.5%;
}
.user_name{
     
    font-weight: 500;
    font-size: 14px;
    line-height: 16.94px;
    display: inline-block;
    margin-left: 1.5%;
}
.post_data{
    display: inline-block;
    margin-left: 3.5%;
}
.info{
    display: inline-block;
}
.categories{
    
    font-weight: 500;
    size: 14px;
    line-height: 16.94px;
    color: #818181;
    margin-top: 1.5%;
    margin-left: 2.5%;
}
.name_articles{ 
    font-weight: 400;
    font-size: 24px;
    line-height: 29.05px;
    margin-top: 1.5%;
    margin-left: 2.5%
}
.articles_picture{
    width: 95%;
    max-height: 400px;
    padding: 0px 2.5%;
    margin-top: 3%;
    object-fit: cover;
}
.text_articles{
    padding: 0px 2.5%;
    font-weight: 400px;
    font-size: 16px;
    line-height: 19.36px;
    margin-top: 2%;
}
.read_button{
    width: auto;
    padding: 1.5%;
    border: 1px solid #8657E9;
    background-color: #FFFFFF;
     
    font-size: 14px;
    font-weight: 400;
    margin-top: 5%;
    border-radius: 4px;
    margin-left: 3%;
}

.buttons_post{
    display: flex;
    padding-top: 15px;
    margin-left: 2.5%;
    gap: 10px;
}

.articles_popular{
    background-color: #FFFFFF;
    width: 400px;
    height: auto;
    overflow: auto;
    margin: 30px;
    padding: 25px;
}

.news_post{
    padding: 24px 0px 5px;
}

.post_watching{
    font-size: 20px;
    line-height: 16px;
    color: #818181;
}

.heading_post{
    line-height: 19.36px;
    color: #000000;
    font-size: 18px;
}

.div_interaction{
    display: flex;
    gap: 10px;
}

.div_like, .div_dizlike, .div_share, .div_viewing, .div_commnets{
    display: flex;
    text-align: center;
    align-items: center;
}

.img_like{
    width: 25px;
    height: 50px;
    cursor: pointer;
}

.quantity_like{
    padding-left: 5px;
    font-size: 15px;
    cursor: pointer;
}
</style>