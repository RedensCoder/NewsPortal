<!-- Тут популрные статьи -->
<script setup>
import '@fontsource-variable/inter';

</script>
<template>
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
</template>
<style scoped>
.articles_popular{
    background-color: #FFFFFF;
    width: 400px;
    height: auto;
    overflow: auto;
    margin: 30px;
    float: right;
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