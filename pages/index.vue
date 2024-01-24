<template>
    <Articles />
    <div class="main">
        <div class="articles">
            <div class="author">
                <img src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
                <p class="nickname">{{nickname}}</p>
                <p class="time_post">5 минут назад</p>
            </div>
            <p class="news_text">Новости</p>
            <div class="news">
                <h2 class="heading_post">Погода на неделю в Москве</h2>
                <img src="http://vsegda-pomnim.com/uploads/posts/2022-04/1648935906_99-vsegda-pomnim-com-p-bittsevskii-les-foto-106.jpg" alt="" class="img_post">
                <p class="text_post">Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в МосквеПогода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве</p>
                <div class="buttons_post">
                    <div class="div_like" @click="quantity_like1">
                        <img src="../public/img/Facebook Like.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >{{ 1 }}</p>
                    </div>
                    <div class="div_dizlike" >
                        <img src="../public/img/Facebook DizLike.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >2</p>
                    </div>
                    <div class="div_share" >
                        <img src="../public/img/Share.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >3</p>
                    </div>
                    <div class="div_commnets" >
                        <img src="../public/img/Chat Message.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >4</p>
                    </div>
                    <div class="div_viewing" >
                        <img src="../public/img/Eye.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >5</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="articles_popular">
            <p class="post_watching">Популярные статьи</p>
            <hr>
            <div class="news_post">
                <h3 class="heading_post">Реконструкция белого дома</h3>

                <div class="div_interaction">
                    <div class="div_commnets" >
                        <img src="../public/img/Chat Message.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >4</p>
                    </div>
                    <div class="div_viewing" >
                        <img src="../public/img/Eye.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >5</p>
                    </div>
                </div>

            </div>
            <hr>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
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
        console.log(id);

        let res = await api.getUserInfoById(id);
        
        nickname.value = res.nickname;
        dsa.value = false;
    }
});
</script>

<style scoped>
.main{
    display: flex;
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
}
.articles{
    background-color: #FFFFFF;
    width: 770px;
    height: auto;
    overflow: auto;
    margin: 30px 0 30px auto;
    align-items: center;
}

.author{
    display: flex;
    margin: 10px auto;
    padding: 0px 20px;
    gap: 10px;
    text-align: center;
    align-items: center;
}

.ava{
    width: 33px;
    height: 33px;    
    border-radius: 50px;
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
    padding-top: 5px;
    padding-left: 20px;
    font-size: 20px;
    line-height: 16px;
    color: #818181;
}
.news{
    padding: 20px;
    padding-top: 20px;
    width: auto;
}

.img_post{
    width: 730px;
    height: 400px;
    padding: 20px 0px 10px;
}

.text_post{
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: auto;
}

.buttons_post{
    display: flex;
    padding-top: 15px;
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