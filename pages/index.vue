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
                <h2 class="heading_post">Погода на неделю в Москве</h2>
                <img src="http://vsegda-pomnim.com/uploads/posts/2022-04/1648935906_99-vsegda-pomnim-com-p-bittsevskii-les-foto-106.jpg" alt="" class="img_post">
                <p class="text_post">Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в МосквеПогода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве</p>
                <div class="buttons_post">
                    <button>лайк <p>8</p></button>
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
                <button>комменты <p>000</p></button>
                <button>просмотры <p>7</p></button>
            </div>
            <hr>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';

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
        font-family: 'Inter Variable', sans-serif;
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
</style>