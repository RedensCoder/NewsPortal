
<template>
    <Articles />
    <div class="main">
        <div class="content">
            <div class="info_profile">
            
                <div class="info">
                    <img class="img_profile" alt="" :src="img">

                    <div class="column">
                        <p class="nickname">{{ nickname }}</p>
                        <p class="status">{{about}}</p>
                    </div>
                    
                </div>
                
                <div class="site">
                    <p class="text">Мои соц.сети:</p>

                    <div class="soc_seti">
                        <a href="https://instagram.com/"><img class="icon_site" src="/img/Instagram.png" alt=""></a>
                        <a href="https://web.telegram.org/k/"><img class="icon_site" src="/img/Telegram.png" alt=""></a>
                        <a href="https://vk.com/feed"><img class="icon_site" src="/img/VK.png" alt=""></a>
                    </div>

                </div>

            </div>

            <div class="profile_posts" >
   
                <h1 class="text header">Посты пользователя:</h1>

                <div class="posts" v-for="post in data">
                    
                    <div class="post_info">
                        <div class="post_header">
                            <img class="img_profile_post" alt="" :src="post.user.avatar">
                            <p class="text_nickname">{{ post.user.nickname }}</p>
                            <p class="text_date">{{ datePost(post.post.Date) }}</p>
                        </div>

                        <div class="post_content">
                            <p class="text_post" v-html="post.post.content"></p>
                        </div>
                        
                        <div class="interaction">
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
                    </div>
            
                </div>  
                
            </div>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';
import { useApiStore } from '~/stores/apiStore';
import { jwtDecode } from 'jwt-decode';

const api = useApiStore();
let data = reactive([]);
let nickname = ref('');
let about = ref('')
let link = ref('')
const img = ref("");

const router = useRouter();

onMounted ( async () => {
  if (localStorage.getItem('token') == null || sessionStorage.getItem("user") == null) {
    router.push("/");
  }

  const user = JSON.parse(sessionStorage.getItem("user"));

  nickname.value = user.nickname;
  about.value = user.about;
  link.value = user.link;
  img.value = user.avatar;

  data.push(...await api.getAllUserPosts(user.id));
})

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
  title: "Профиль"
})
</script>

<style scoped>
.main{
    margin-top: 3%;
    /* max-width: 100%; */
    display: flex;
    justify-content: center;
}

.content{
    display: flex;
    flex-direction: column;
}

.info_profile{
    width: 780px;
    background-color: #8657E9;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.nickname{
    font-size: 20px;
}
.status{
    margin-top: 10px;
    font-size: 16px;
}
.img_profile{
    width: 110px;
    height: 110px;
    border-radius: 100%;
    border: 1px solid #FFFFFF;
}

.info{
    display: flex;
    margin-left: 30px;
    color: #FFFFFF;
}
.column{
    margin-top: 25px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
}
.icon_site{
    margin-right: 0.5%;
}
.site{
    color: #FFFFFF;
    margin-right: 50px;
}

.soc_seti{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

/* посты профиля */
.profile_posts{
    background: #FFFFFF;
    display: flex;
    height: auto;
    width: 780px;
    flex-direction: column;
}

.header{
    margin-left: 2.5%;
    margin-top: 5%;
    margin-bottom: 2.5%;
    font-size: 20px;
    color:  #000000;
}

.posts{
    margin: 0px 20px 30px;
    background-color: #EEEEEE;
    height: 100%;
    width: 740px;
    align-items: center;
    border-radius: 5px;
}

.post_info{
    padding: 20px;
}

.post_header{
    display: flex;
    text-align: center;
    align-items: center;
    gap: 10px;
}

.img_profile_post{
    width: 40px;
    height: 40px;
    border-radius: 100%;
}

.text_nickname{
    font-size: 16px;
    font-weight: 500;
    line-height: 17px;
}

.text_date{
    font-size: 16px;
    font-weight: 500;
    line-height: 17px;
}

.post_content{
    text-align: start;
    margin: 20px auto;
}

.text_post{
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
}

/* кнопка */
.next_post_btn{
    max-width: 780px;
    margin-top: 30px;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
}
.post_next{
    width: auto;
    border-radius: 4px;
    background-color: #8657E9;
    border: black 1.9px solid;
    padding: 15px 15px;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    height: 50px;
}

@media (max-width: 425px) {
  * {
    display: block;
  }

  .main {
    display: block;
  }

  .info_profile {
    width: 100%;
  }

  .profile_posts {
    width: 100%;
  }

  .posts {
    margin-left: 0;
    margin-bottom: 15px;
    width: 100%;
  }
}

.interaction{
    display: flex;
    gap: 10px;
}

.div_like, .div_dizlike, .div_share, .div_viewing, .div_commnets{
    display: flex;
    text-align: center;
    align-items: center;
}

.quantity_like{
    padding-left: 5px;
    font-size: 15px;
    cursor: pointer;
}
</style>