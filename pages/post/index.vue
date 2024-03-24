<template>
    <!-- СТРАНИЦА С ПОСТАМИ -->
    <Articles />
    <div class="main">
        <div class="flex_column">
            <div class="articles" v-for="post in data">
                <NuxtLink :to="post.user.link" ><div class="author">
                    <img :src="post.user.avatar" alt="аватарка не загрузилась" class="ava">
                    <p class="nickname">{{ post.user.nickname }}</p>
                    <p class="time_post" >{{ datePost(post.post.Date) }}</p>
                </div></NuxtLink>
                <div class="news">
                    <p class="text_post" v-html="post.post.content"></p>

                    <div class="buttons_post">
                        <div class="div_like" @click="like(post.post.id)" v-if="!post.likeState">
                            <img src="~/public/img/Facebook Like.svg" alt="NO" class="img_like">
                            <p class="quantity_like">{{ parseNumber(post.likes) }}</p>
                        </div>
                        <div class="div_like" @click="like(post.post.id)" v-else>
                            <img src="~/public/img/Facebook Like fiol.svg" alt="NO" class="img_like">
                            <p class="quantity_like">{{ parseNumber(post.likes) }}</p>
                        </div>

                        <div class="div_dizlike" @click="dislike(post.post.id)" v-if="!post.disLikeState">
                            <img src="~/public/img/Facebook DizLike.svg" alt="NO" class="img_like" >
                            <p class="quantity_like" >{{ parseNumber(post.dislikes) }}</p>
                        </div>
                        <div class="div_dizlike" @click="dislike(post.post.id)" v-else>
                            <img src="~/public/img/Facebook DisLike red.svg" alt="NO" class="img_like" >
                            <p class="quantity_like" >{{ parseNumber(post.dislikes) }}</p>
                        </div>

                        <div class="div_commnets" @click="createComment">
                            <img src="~/public/img/Chat Message.svg" alt="NO" class="img_like" >
                            <p class="quantity_like" >{{ parseNumber(4) }}</p>
                        </div>

                        <div class="div_viewing" >
                            <img src="~/public/img/Eye.svg" alt="NO" class="img_view">
                            <p class="quantity_view">{{ parseNumber(post.view) }}</p>
                        </div>

                        <div class="div_share" >
                            <img src="~/public/img/Share.svg" alt="NO" class="img_like" >
                        </div>

                    </div>
                </div>
            </div>
            <button @click="addLimit" class="post_next">Следующие Посты</button>
        </div>
        
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';
import { useApiStore } from '~/stores/apiStore';
import { jwtDecode } from 'jwt-decode';

let limit = ref(10);
let data = reactive([]);
let comment = ref('');
const api = useApiStore();

watch (limit, async () => {
  data.splice(0, data.length)
  const posts = await api.getAllPosts(limit.value);
  data.push(...posts.reverse())

  const userId = jwtDecode(localStorage.getItem('token')).data.id;
  for (const p of data) {
    let like = await api.getUserPostLike(userId, p.post.id)

    if (like === null) {
      p.likeState = false
    }
    else {
      p.likeState = true
    }

    let disLike = await api.getUserPostDislike(userId, p.post.id)

    if (disLike === null) {
      p.disLikeState = false
    }
    else {
      p.disLikeState = true
    }
  }
});

function addLimit(){
    limit.value = limit.value + 10
    // alert(limit.value)
}
// p = post
onMounted(async () => {
    const posts = await api.getAllPosts(limit.value);
    data.push(...posts.reverse())

    const userId = jwtDecode(localStorage.getItem('token')).data.id;
    for (const p of data) {
        let like = await api.getUserPostLike(userId, p.post.id)

        if (like === null) {
            p.likeState = false
        }
        else {
            p.likeState = true
        }

      let disLike = await api.getUserPostDislike(userId, p.post.id)

      if (disLike === null) {
        p.disLikeState = false
      }
      else {
        p.disLikeState = true
      }
    }
})

async function like(id) {
    const userId = jwtDecode(localStorage.getItem('token')).data.id;

    let like = await api.getUserPostLike(userId, id)
    let dislike = await api.getUserPostDislike(userId, id)

    if (like !== null) {
        data.filter(p => p.post.id == id).map(p => {p.likes -= 1; p.likeState = false});
    }
    else {
        if (dislike === null){
            data.filter(p => p.post.id == id).map(p => {p.likeState = true; p.likes += 1})
        }
        else{
            data.filter(p => p.post.id == id).map(p => {p.likeState = true ; p.likes += 1})
            data.filter(p => p.post.id == id).map(p => {p.disLikeState = false; p.dislikes -= 1})
        }
      
    }

    await api.postLike(userId, id);
}

async function dislike(id) {
    const userId = jwtDecode(localStorage.getItem('token')).data.id;

    let dislike = await api.getUserPostDislike(userId, id)
    let like = await api.getUserPostLike(userId, id)
    

    if (dislike !== null) {
        data.filter(p => p.post.id == id).map(p => {p.dislikes -= 1; p.disLikeState = false});
    }
    else {
        if (like === null){
            data.filter(p => p.post.id == id).map(p => {p.disLikeState = true; p.dislikes += 1})
        }
        else{
            data.filter(p => p.post.id == id).map(p => {p.disLikeState = true ; p.dislikes += 1})
            data.filter(p => p.post.id == id).map(p => {p.likeState = false; p.likes -= 1})
        }
      
    }

    await api.postDislike(userId, id);
}

async function createComment(id){
    const userId = jwtDecode(localStorage.getItem('token')).data.id;
    const postId = await api.getPostById(id);
    console.log(postId);

    await api.createPostComment(userId, postId, comment.value, Date)
}

function parseNumber(number) {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return (number / 1000000).toFixed(1) + 'M';
  }
}

function datePost(date) {
    let datePublished = new Date(date);
    let currentDate = new Date();

    let timeDifference = currentDate - datePublished;

    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    function parseMonth(month){
        switch (month) {
            case 1:
                return "Янв";
                break;
            case 2:
                return "Фев";
                break;
            case 3:
                return "Марта";
                break;
            case 4:
                return "Апр";
                break;
            case 5:
                return "Мая";
                break;
            case 6:
                return "Июня";
                break;
            case 7:
                return "Июля";
                break;
            case 8:
                return "Авг";
                break;
            case 9:
                return "Сен";
                break;
            case 10:
                return "Окт";
                break;
            case 11:
                return "Ноя";
                break;
            case 12:
                return "Дек";
                break;
            default: return "err"
        }
    }

    let timeAgo;
    if (days > 6) {
        timeAgo = datePublished.getDate() + " " + (parseMonth(datePublished.getMonth() + 1)) + " " + datePublished.getFullYear();
    }
    else if (days > 0 ) {
        timeAgo = days + " дней назад";
    } 
    else if (hours > 0) {
        timeAgo = hours + " часов назад";
    } 
    else if (minutes > 0) {
        timeAgo = minutes + " минут назад";
    } 
    else {
        timeAgo = "только что";
    }

    return timeAgo
}

useHead({
  title: "Новостной Портал"
})
</script>

<style scoped>

.post_next{
    width: auto;
    height: auto;
    border-radius: 4px;
    background-color: #8657E9;
    border: black 1px solid;
    padding: 15px;
    font-size: 16px;
    color: #ffffff;
    height: 50px;
}

.main{
    display: flex;
    justify-content: center;
    /* margin-left: 28%; */
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
    width: 780px;
    margin-top: 30px;
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

.img_view{
    width: 25px;
    height: 50px;
}

.quantity_like{
    padding-left: 5px;
    font-size: 15px;
    cursor: pointer;
}
</style>