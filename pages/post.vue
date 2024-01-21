<template>
    <Articles />
    <div class="main">
        <div class="articles">
            <div class="author">
                <img src="https://yt3.googleusercontent.com/UGnZwQcSeg1K28KjtJSL6FOy5ZJeV3_B3MxURWdYxGUjV3Bk0HnB3XdArW1vvtWzBs1MfCNY=s900-c-k-c0x00ffffff-no-rj" alt="аватарка не загрузилась" class="ava">
                <p class="nickname">nickname</p>
                <p class="time_post">5 минут назад</p>
            </div>
            <p class="news_text">Новости</p>
            <div class="news">
                <h2 class="heading_post">Пост</h2>
                <p class="text_post">Мессенджер — это программа для мгновенного обмена текстовыми сообщениями, файлами и медиа между зарегистрированными пользователями через интернет.<br>
С помощью мессенджеров можно:
общаться с другими пользователями один на один или в групповых беседах; <br>
отправлять текстовые или голосовые сообщения, а также стикеры, фото, видео и другие файлы; <br>
звонить и разговаривать по видеосвязи (один на один или в режиме конференции); <br>
создавать публичные каналы и подписываться на них; <br>
пользоваться чат-ботами. <br>
Обычно мессенджеры не отключаются, а продолжают работать в фоновом режиме и доставляют сообщения мгновенно, если устройство адресата подключено к интернету.
Наиболее распространёнными в России являются WhatsApp, Telegram и Viber.
С помощью мессенджеров можно:
общаться с другими пользователями один на один или в групповых беседах;
отправлять текстовые или голосовые сообщения, а также стикеры, фото, видео и другие файлы;
звонить и разговаривать по видеосвязи (один на один или в режиме конференции);
создавать публичные каналы и подписываться на них;
пользоваться чат-ботами.
Обычно мессенджеры не отключаются, а продолжают работать в фоновом режиме и доставляют сообщения мгновенно, если устройство адресата подключено к интернету.
Наиболее распространёнными в России являются WhatsApp, Telegram и Viber.</p>
                <div class="tegs">
                    <h3>Теги:</h3>
                    <p class="tegs_">telegram, whatsapp, viber</p>
                </div>
                <div class="buttons_post">
                    <div class="div_like" @click="quantity_like1">
                        <img src="../public/img/Facebook Like.svg" alt="NO" class="img_like" >
                        <p class="quantity_like" >{{ quantity }}</p>
                    </div>
                    <button>дизлайк <p>7</p></button>
                    <button>поделиться</button>
                    <button>комменты <p>7</p></button>
                    <button>просмотры <p>7</p></button>
                </div>
            </div>
        </div>
        <div class="articles_popular">
            <p class="post_watching">Сейчас смотрят</p>
            <hr>
            <div class="news_post">
                <h3 class="heading_post">Реконструкция белого дома</h3>
                <button>комменты <p>7</p></button>
                <button>просмотры <p>7</p></button>
            </div>
            <hr>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';

let quantity = ref(0);

function quantity_like1() {
    quantity.value++
}

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
    width: 30px;
    height: 30px;    
    border-radius: 50px;
}

.nickname{
    font-family: 'Inter Variable', sans-serif;
    font-size: 14px;
    line-height: 16px;
}

.time_post{
    color: #818181;
    font-family: 'Inter Variable', sans-serif;
    font-size: 14px;
    line-height: 16px;
}
.news_text{
    padding-left: 20px;
    font-family: 'Inter Variable', sans-serif;
    font-size: 14px;
    line-height: 16px;
    color: #818181;
}
.news{
    padding: 20px;
    padding-top: 10px;
    width: auto;
}

.img_post{
    width: 730px;
    height: 400px;
    padding: 20px 0px 10px;
}

.text_post{
    margin-top: 10px;
    font-family: 'Inter Variable', sans-serif;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    width: auto;
}

.tegs{
    margin: 100px auto 0;
    display: flex;
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
    padding: 10px 0px 5px;
}

.post_watching{
    font-family: 'Inter Variable', sans-serif;
    font-size: 18px;
    line-height: 16px;
    color: #818181;
}

.heading_post{
    line-height: 19.36px;
    font-family: 'Inter Variable', sans-serif;
    color: #000000;
}

.tegs_{
    padding-left: 10px;
}

.div_like{
    display: flex;
    text-align: center;
    align-items: center;
}

.img_like{
    width: 20px;
    height: 50px;
    cursor: pointer;
}

.quantity_like{
    padding-left: 5px;
    font-size: 15px;
    cursor: pointer;
}
</style>