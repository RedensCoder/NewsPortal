<script>
 import ("~/assets/css/second.css");
 import ("~/assets/css/first.css");
    import '@fontsource-variable/inter';
</script>

<template>
<Articles />
<div class="news">
    <div class="info">
    <img class="user_icon" src="public/img/user.png" alt="">
    <p class="user_name text">user1</p>
    <p class="post_data">5 минут назад</p>
    </div>
    <p class="categories">Статья</p>
    <h1 class="name_articles">Основы интернета</h1>
    <img class="articles_picture" src="public/img/acrticles_example.png" alt="">
    <p class="text_articles">Интернет, безусловно, стал одной из самых важных частей нашей современной жизни. Однако, несмотря на его всеобъемлющее присутствие, мало кто задумывается над его основами и принципами работы. <br>
В основе интернета лежит потрясающая сетевая инфраструктура, которая обеспечивает связь между компьютерами по всему миру. 
Эта инфраструктура включает в себя огромное количество сетевых провайдеров, серверов, роутеров и протоколов, которые работают вместе, чтобы обеспечить надежное и эффективное функционирование интернета. <br>
 Одним из основных принципов работы интернета является использование пакетной передачи данных. Когда мы отправляем сообщение или запрашиваем информацию через интернет, она разбивается на маленькие пакеты данных, которые передаются по сети независимо друг от друга. Затем эти пакеты собираются в исходную информацию на компьютере получателя. Этот процесс позволяет обеспечить более эффективную передачу данных и устранить проблемы, связанные с возможной потерей и повреждением информации.</p>
<button class="read_button">Читать далее</button>

<div class="funtcion">
    <button class="button like" style="opacity: 0.5;"><img class="icon" src="public/img/Facebook Like.svg" alt=""></button>
    <p class="number like">0</p>
    <button class="button dislike"><img class="icon" src="public/img/Facebook dislike.png" alt=""></button>
    <p class="number dislike">0</p>
    <button class="button share"><img class="icon" src="public/img/Share.png" alt=""></button>
    <button class="button comments"><img class="icon" src="public/img/Chat Message.png" alt=""></button>
    <p class="number comments">0</p>
    <button class="button views"><img class="icon" src="public/img/Eye.png" alt=""></button>
    <p class="number view">0</p>
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
font-family: 'Inter';
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
    font-family: 'Inter';
    font-weight: 500;
    size: 14px;
    line-height: 16.94px;
    color: #818181;
    margin-top: 1.5%;
    margin-left: 2.5%;
}
.name_articles{
    font-family: 'Inter';
    font-weight: 400;
    font-size: 24px;
    line-height: 29.05px;
    margin-top: 1.5%;
    margin-left: 2.5%
}
.articles_picture{
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    margin-top: 3%;
}
.text_articles{
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    font-family: 'Inter';
    font-weight: 400px;
    font-size: 16px;
    line-height: 19.36px;
    margin-top: 2%;
}
.read_button{
    width: 13.5%;
   padding: 1.5%;
    border: 1px solid #8657E9;
    background-color: #FFFFFF;
    font-family: 'Inter';
    font-size: 14px;
    font-weight: 400;
    margin-top: 5%;
    border-radius: 4px;
    margin-left: 3%;
}
.function{
    display: inline-block;
}
.button{
    display: inline;
    border: medium none;
    background-image: none;
    background: transparent;
    background-color: transparent;
}
.number{
    display: inline;
    margin-left: 1.5%;

}
</style>