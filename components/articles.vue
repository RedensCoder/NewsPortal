<template>
    <!-- СТРАНИЦА С ПЕРЕХОДОМ НА СТРАНИЦЫ -->
    <div class="container">
        <div class="header_articles">
            <NuxtLink to="/" class="text_articles" exact>СТАТЬИ</NuxtLink>
            <hr>
            <NuxtLink to="/post" class="text_articles">ПОСТЫ</NuxtLink>
            <hr>
            <NuxtLink to="/news" class="text_articles" exact>НОВОСТИ</NuxtLink>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import ("~/assets/css/first.css");

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
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
}

.container{
    width: 100%;
    max-width: 100%;
}

/* адаптив начало */
@media (max-width: 1400px){
    .container{
        max-width: 1400px;
    }
}
@media (max-width: 992px){
    .container{
        max-width: 992px;
    }
}
@media (max-width: 767px){
    .container{
        max-width: none;
    }
}

@media (max-width: 425px) {
  .header_articles {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

/* адаптив конец */

.text_articles{
    font-size: 24px;
    line-height: 30px;
    color: #000000;
    text-decoration: none;
    font-weight: bold;
    padding: 0px 38px;
}

.text_articles:hover, .router-link-active{
    color: #8657E9;
}

</style>