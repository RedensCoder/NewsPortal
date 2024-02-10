<template>
    <!-- СТРАНИЦА С ПОСТАМИ -->
    <Articles />
    <div class="main">
        <div class="flex_column">
            <div class="articles" v-for="post in data">
                <div class="author">
                    <img src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
                    <p class="nickname">{{ post.user.nickname }}</p>
                    <p class="time_post">5 минут назад</p>
                </div>
                <div class="news">
                    <p class="text_post" v-html="post.post.content"></p>

                    <div class="buttons_post">
                        <div class="div_like" @click="like">
                            <img src="~/public/img/Facebook Like.svg" alt="NO" class="img_like">
                            <p class="quantity_like" >{{ quantity }}</p>
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
                </div>
            </div>
        </div>
        <!-- ДОБАВИТЬ СТИЛИ КНОПКИ -->
        <button @click="addLimit" class="post_next">ДАЛЕЕ</button>
        
        <div class="articles_popular">
            <p class="post_watching">Популярные статьи</p>
            <hr>
            <div class="news_post">
                <h3 class="heading_post">Реконструкция белого дома</h3>

                <div class="div_interaction">
                    <div class="div_commnets" >
                        <img src="~/public/img/Chat Message.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >4</p>
                    </div>
                    <div class="div_viewing" >
                        <img src="~/public/img/Eye.svg" alt="NO" class="img_like" >
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
import { useApiStore } from '~/stores/apiStore';
import { jwtDecode } from 'jwt-decode';

let quantity = ref(1);
let limit = ref(10);
let data = reactive([]);
const api = useApiStore();

watch (limit, async () => {
    data.splice(0, data.length)
    const posts = await api.getAllPosts(limit.value);
    data.push(...posts)
}) 

function addLimit(){
    limit.value = limit.value + 10
    // alert(limit.value)
}

onMounted(async () => {
    const posts = await api.getAllPosts(limit.value);
    data.push(...posts)
})

async function like() {
    if (localStorage.getItem('token') == null) {
        quantity.value = quantity.value + 1;
    }
    else {
        const id = jwtDecode(localStorage.getItem('token')).data.id;

        const posts = await api.postLike(id.value);
        quantity.value = posts.id
        quantity.value = quantity.value - 1
    }
}

</script>

<style scoped>
.post_next{

}


.main{
    display: flex;
    justify-content: center;
    margin-left: 28%;
    max-width: 100%;
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

.flex_column{
    display: flex;
    flex-direction: column;
}
.articles{
    background-color: #FFFFFF;
    width: 770px;
    margin: 30px 0 0px auto;
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
    margin-top: 10px;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: auto;
}

.buttons_post{
    display: flex;
    padding-top: 10px;
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

.tegs_{
    padding-left: 10px;
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