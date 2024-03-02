<!-- Тут популрные статьи -->
<script setup>
import '@fontsource-variable/inter';

const props = defineProps(["name", "ava", "description", "subs"])

function parseNumber(number) {
    if (number < 1000) {
        return number.toString();
    } else if (number < 1000000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return (number / 1000000).toFixed(1) + 'M';
    }
}

</script>

<template>
    <div class="mains">
        <div class="content">

            <div class="main_content">
                <img :src="props.ava" alt="лого не загрузилось" class="logo">
                <div class="fff">
                    <h2 class="name_public">{{ props.name }}</h2>
                    <p >{{ parseNumber(props.subs) }} подписчиков</p>
                </div>

                <img src="~/public/img/Pencil.svg" alt="" class="redactor" v-if="true">
                <img src="~/public/img/Done.svg" alt="" class="redactor" v-else>
            </div>

            <div class="description"> 
                <h2>Описание:</h2>
                <p class="text_description">{{ props.description }}</p>
            </div>
            <hr>
            <NuxtLink to="/publics/index.vue" class="text_">Отписаться</NuxtLink>

        </div>
    </div>
</template>

<style scoped>
.mains{
    display: flex;
    flex-direction: column;
}

p{
    color: #818181;
    font-size: 16px;
    font-weight: 500;
}

h2{
    font-size: 16px;
    font-weight: 500;
    color: #000000;
}

hr{
    width: 100%;
    border: 1px solid #81818180;
    margin-top: 15px;
    margin-bottom: 15px;
}

.text_{
    font-size: 16px;
    font-weight: 500;
    color: #EB3223;
    text-decoration: none;
}

.content{
    min-width: 350px;
    background-color: #ffffff;
    padding: 20px;
    height: 100%;
    width: 70%;
    margin: 0 auto;
}

.logo{
    width: 100px; 
    height: 100px; 
    border-radius: 49px;
}

.main_content{
    display: flex;  
    align-items: center;
    gap: 20px;
}

.fff{
    display: flex;
    flex-direction: column;
}

.redactor{
    width: 31px;
    height: 31px;
}
.description{
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>