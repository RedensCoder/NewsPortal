<script setup>
import ("~/assets/css/second.css");
</script>

<template>
    <Articles />
    <div class="edit_public">
    <div class="about_public">
        <p class="text header">Новости мира</p>
        <p class="text followers">6658 подписчиков</p>
    </div>
    <div class="posts_public">
        <div class="post_public">
            <p class="text name_post">Новости мира</p>
            <img class="picture_post" src="/img/post_picture.png" alt="">
            <p class="text text_post describe">Долгожданный первый трейлер следующей игры Grand Theft Auto наконец-то вышел, и вы можете посмотреть его ниже! </p>
            <p class="text text_post">Трейлер должен был быть представлен во вторник, 5 декабря, в 9 утра по восточному времени. Однако трейлер GTA 6, к сожалению, просочился в Твиттер на несколько часов раньше, поэтому Rockstar Games решила опубликовать и официальную версию раньше.</p>
            <div class="reaction">
                <div class="like img_reaction"><img src="/img/Facebook Like.svg" alt=""></div>
                <p class="text col_like col">7</p>
                <div class="dislike img_reaction"><img src="/img/Facebook DizLike.svg" alt=""></div>
                <p class="text col">8</p>
                <div class="share img_reaction"><img src="/img/Share.svg" alt=""></div>
                <div class="comments img_reaction"><img src="/img/Chat Message.svg" alt=""></div>
                <p class="col col_comments">16</p>
                <div class="views"><img src="/img/Eye.svg" alt=""></div>
                <p class="col col_views">19</p>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.text{
    font-family: 'Inter';
}
.header{
    margin-top: 5%;
}
.followers{
    margin-top: 1%;
}
.about_public{
    background-color: #8657E9;
    width: 50%;
    margin-top: 2.5%;
    margin-left: 25%;
    color: white;
    height: auto;
}
.posts_public{
    background-color: white;
    width: 50%;
    margin-top: 1.5%;
    margin-left: 25%;
}
.name_post{
    background-color: #8657E9;
}
.picture_post{
    width: 100%;
}
.post_public{
    width: 96%;
    margin-left: 2%;
    color: white;
    background-color: white;
}
.text_post{
    color: #000000;
    margin-top: 1.5%;
}
.img_reaction{
    cursor: pointer;
    display: inline-block;

    margin-left: 2%;
    margin-bottom: 1.5%;
}
.reaction{
    color: #000000;
    display: inline-block;
    width: 100%;
}
.col{
    display: inline-block;
}
.views{
    display: inline-block;
}
.edit_public{
    width: 97%;
    margin-left: 1.5%;
    background-color: white;
}
</style>