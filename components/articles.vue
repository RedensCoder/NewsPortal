<template>
    <div class="hh">
        <div class="header_articles">
            <NuxtLink to="/dsad" class="text_articles" exact>СТАТЬИ</NuxtLink>
            <hr>
            <NuxtLink to="/post" class="text_articles" >ПОСТЫ</NuxtLink>
            <hr>
            <NuxtLink to="/" class="text_articles" exact>НОВОСТИ</NuxtLink>
        </div>
    </div>
</template>

<script setup>
import '@fontsource-variable/inter';

</script>

<style scoped>
hr{
    border: 1px solid;
    color: #8657E9;
    height: 25px;
}

.header_articles{
    height: 70px;
    display: flex;
    background-color: #FFFFFF;
    text-align: center;
    align-items: center;
    padding-left: 37.5%;
    -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}

.text_articles{
    font-size: 24px;
    line-height: 30px;
    color: #000000;
    text-decoration: none;
    font-weight: bold;
    padding: 0px 38px;
}

.text_articles:hover{
    color: #8657E9;
}
.router-link-exact-active{
    color: #8657E9;
}

</style>