<script>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';
</script>

<template>
    <Articles />
    <div class="all_publics">
        <div class="public1">
        <h3 class="text text1 t1">Все паблики</h3>
        <h3 class="text text1 t2">/</h3>
        <h3 class="text text1 t3">Мои паблики</h3>
        <input type="search" class="search" name="" id="" placeholder="Поиск паблика">
    </div>
    <div class="publics">
        <div class="public">
            <img class="logo" src="public/img/example_logo.png" alt="">
            <div class="info_public">
            <h1 class="name_public">Новости мира</h1>
            <p class="followers">0 подписчиков</p>
                 </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<style scoped>
.all_publics{
    width: 50%;
    margin-left: 25%;
    margin-top: 2%;
    height: 100vh;
    background-color: white;
}
.text{
    font-family: 'Inter';
}
.text1{
    display: inline-block;
    margin-left: 2.5%;
    margin-top: 3%;
    font-size: 24px;
    font-weight: 500;
}
.t1{
    color: #8657E9;
}
.public1{
    display: inline-block;
}
.search{
    width: 100%;
    height: 10%;
    border-radius: 4px;
    margin-left: 5%;
    margin-top: 2.5%;
    margin-right: 5%;
}
.public{
    display: inline-block;
}
.followers{
    display: inline-block;
}
.name_public{
    display: inline-block;
}
.info_public{
    display:block;
    
}
.logo{
    display: inline-block;
    width: 10%;
}
</style>