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
    <input type="text" class="input_1">
    </div>

    <div class="div1">
    <h3 class="text">Описание паблика</h3>
    <input type="text" class="description">
    </div>

    <div class="div1 view_public">
    <h3 class="text">Обложка паблика</h3>
    <div class="add_image">
    <input class="" type="image" src="" alt="">
</div>
    <button class="btn_download">Загрузить</button>
    </div>

    <div class="div1">
        <h3 class="text">Описание сайта</h3>
        <input type="text" class="input_1">
        <p>Вы можете прикрепить название сайта</p>
        //da
    </div>

    <div class="div1">
        <h3 class="text">Комментарий администрации</h3>
        <input type="text" class="input_1">
    </div>
    <button class="btn_public">Создать паблик</button>
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
    font-size: 20px;
    line-height: 29.05px;
    font-family: 'Inter';
}

.new_public{
    height: 100vh;
}
.new_public2{
    margin-left: 3%;
}
.description{
    width: 95%;
    height: 115px;
}
.div1{
    margin-top: 2.5%;
}
.btn_download{
    width: 86px;
    height: 30px;
    border: 1px solid #818181;
    border-radius: 4px;
    background-color: #EEEEEE;
    margin-left: 2%;
    margin-top: 5%;
}
.btn_public{
    border: 1px solid #8657E9;
    width: 133px;
    height: 34px;
    background-color: #FFFFFF;
    border-radius: 4px;
    margin-top: 5%;
}
.add_image{
    background: url(../public/img/add_picture.png) no-repeat 39px 36px;
    border: 1px solid #818181;
    width: 59px;
    height: 56px;
    justify-content: center;
    border-radius: 30px;
    background-position: center;
    display: inline-block;
}
.view_public{
    display: inline-block;
    width: 100%;
}
.input_1{
    width: 325px;
    height: 38px;
    border: 1px solid #81818180;
    border-radius: 4px;
    margin-top: 20px;
}
</style>