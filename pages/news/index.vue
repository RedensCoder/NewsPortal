<template>
    <Articles />
    <div class="main">
        <div>

        </div>
        <div class="articles">
            <div class="author">
                <img src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
                <p class="nickname">{{nickname}}</p>
                <p class="time_post">5 минут назад</p>
            </div>
            <p class="news_text">Новости</p>
            <div class="news_content">
                <h2 class="heading_post">Погода на неделю в Москве</h2>
                <img class="img_post" src="http://vsegda-pomnim.com/uploads/posts/2022-04/1648935906_99-vsegda-pomnim-com-p-bittsevskii-les-foto-106.jpg" alt="">
                <p class="text_post">Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в МосквеПогода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве</p>
                
                <div class="buttons_post">
                    <div class="div_like" @click="quantity_like1">
                        <img src="~/public/img/Facebook Like.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >{{ 1 }}</p>
                    </div>
                    <div class="div_dizlike" >
                        <img src="~/public/img/Facebook DizLike.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >2</p>
                    </div>
                    <div class="div_commnets" >
                        <img src="~/public/img/Chat Message.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >4</p>
                    </div>
                    <div class="div_viewing" >
                        <img src="~/public/img/Eye.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >5</p>
                    </div>
                    <div class="div_share" >
                        <img src="~/public/img/Share.svg" alt="NO" class="img_like" >
                    </div>
                </div>
                <button class="read_button">Читать далее</button>
            </div>
        </div>

    </div>
</template>

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
        // console.log(id);

        let res = await api.getUserInfoById(id);
        
        nickname.value = res.nickname;
        dsa.value = false;
    }
});
</script>

<style scoped>
.main{
    display: grid;
    justify-content: center;
    max-width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 30px;
}

hr{
    margin-top: 20px;
}

h2{
    font-size: 24px;
}

h3{
    font-size: 16px;
    margin-bottom: 10px;
}

button{
    width: 100px;
    height: 40px;
    color: #8657E9;
}

.articles{
    background-color: #FFFFFF;
    width: 780px;
    height: auto;
    overflow: auto;
    align-items: center;
}

.author{
    display: flex;
    margin-top: 10px;
    padding: 0px 20px;
    gap: 10px;
    text-align: center;
    align-items: center;
}

.ava{
    width: 40px;
    height: 40px;    
    border-radius: 100%;
}

.nickname{
    font-size: 16px;
    line-height: 16px;
    font-weight: 500;
}

.time_post{
    color: #818181;
    font-size: 14px;
    line-height: 16px;
}

.news_text{
    margin-top: 10px;
    padding-top: 5px;
    padding-left: 20px;
    font-size: 20px;
    line-height: 16px;
    color: #818181;
}
.news_content{
    margin: 10px auto;
    padding: 10px 20px;
    width: auto;
}

.heading_post{
    line-height: 19.36px;
    color: #000000;
}

.img_post{
    max-width: 100%;
    width: 780px;
    margin-top: 10px;
    max-height: 400px;
    height: auto;
    object-fit: cover;
}

.text_post{
    padding: 10px 0px;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: auto;
}

.buttons_post{
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

.read_button{
    margin-top: 10px;
    border: 1px solid #8657E9;
    border-radius: 4px;
    min-width: 120px;
    min-height: 34px;
    font-size: 14px;
}

@media (max-width: 1400px){
    .main{
        max-width: 1400px;
    }
    .articles{
        margin: 0px 10px;
    }
}
@media (max-width: 768px) {
    .main {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
    }
    .articles{
        width: 97%;
    }
}
@media (max-width: 425px) {
    .main {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
    }
    .articles{
        width: 97%;
    }
}
</style>