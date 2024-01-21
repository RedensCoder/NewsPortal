<script>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';
</script>
<template>

<Articles />
<div class="block header"><h1 class="text">Создание новостного паблика</h1></div>
<div class="block new_public"><div class="new_public2">

    <div class="div1">
    <h3 class="text">Название паблика</h3>
    <input type="text" class="name">
    </div>

    <div class="div1">
    <h3>Описание паблика</h3>
    <input type="text" class="description">
    </div>

    <div class="div1">
    <h3 class="text">Обложка паблика</h3>
    <button class="btn">Загрузить</button>
    <input type="file">
    </div>

    <div class="div1">
        <h3 class="text">Описание сайта</h3>
        <input type="text">
        <p>Вы можете прикрепить название сайта</p>
    </div>

    <div class="div1">
        <h3 class="text">Комментарий администрации</h3>
        <input type="text">
    </div>
    <button class="add_public">Создать паблик</button>
</div>
</div>
</template>

<style scoped>
    .block{
     margin: 0 auto;
    margin-top: 2.5%;
     width: 776px;
     background-color: #FFFFFF;   
    }
.header{
    height: 67px;;
    vertical-align: middle;
}
.text{
    font-weight: 500px;
    font-size: 24px;
    line-height: 29.05px;
    font-family: 'Inter';
}
.name{
    height: 25px;
    width: 35%;
}
.new_public{
    height: 100%;
}
.new_public2{
    margin-left: 3%;
}
.description{
    width: 95%;
    height: 115px;
}
</style>