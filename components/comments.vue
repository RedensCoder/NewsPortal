<!-- Тут популрные статьи -->
<script setup>
import '@fontsource-variable/inter';

</script>

<template>
    <div class="mains">
        <div class="content">
            <h2>Комментарии пользователей</h2>
            <hr>
            <div class="comments">

                <div class="author">
                    <img src="" alt="" class="ava">
                    <h1 class="nickname"></h1>
                    <p class="time"></p>
                </div>

                <div class="comment">
                    <p>Привет, мне очень понравился твой пост! Делай почаще такие подобные посты!</p>
                </div>
                <hr>
            </div>
            
        </div>
    </div>
</template>

<style scoped>
.mains{
    display: flex;
    flex-direction: column;
}

hr{
    width: 100%;
    border: 1px solid #81818180;
    margin-top: 10px;
}

.content{
    min-width: 450px;
    background-color: #ffffff;
    padding: 20px;
    /* height: auto; */
    width: 70%;
    margin: 0 auto;
}
</style>