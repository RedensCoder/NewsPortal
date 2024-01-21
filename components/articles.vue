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
    /* margin: 0px auto; */
    padding-left: 37.5%;
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