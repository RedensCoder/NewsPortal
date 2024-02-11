<script setup>import ("~/assets/css/second.css");</script>

<template>
    <Articles />
    <Populars />
    <div class="info_profile">
        <img class="img_profile" src="/img/buda.jpg" alt="">
        <div class="info">
        <p class="nickname text info2">og buda</p>
        <p class="status text info2">краш всех крашей</p>
        <button class="btn_edit_info text info2">Редактировать профиль</button>
    </div>
    <div class="site">
        <p class="text">Мои соц.сети:</p>
        <a href="https://instagram.com/"><img class="icon_site" src="/img/Instagram.png" alt=""></a>
        <a href="https://web.telegram.org/k/"><img class="icon_site" src="/img/Telegram.png" alt=""></a>
        <a href="https://vk.com/feed"><img class="icon_site" src="/img/VK.png" alt=""></a>
    </div>
    </div>
    <div class="profile_posts">
        <h1 class="text">Опубликовать пост:</h1>
        <div contenteditable="true" class="add_post new_post">
        <img class="icon_profile" src="/img/buda.jpg" alt="">
    </div>
    <hr class="granica">
    <div class="add_post2">
        <button class="btn_add_post">Опубликовать</button>
    </div>
        <h1 class="text">Мои посты:</h1>
        <div class="posts">
            <img class="icon_profile2" src="/img/buda.jpg" alt="">
            <div class="post_info">
            <p class="text text_info">og buda</p>
            <p class="text text_info">5 минут назад</p>
        </div>
      
        <p class="text_post">Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве Погода на неделю в Москве</p>
     <div class="info_post">
        <div class="btn_comments post_icon"><img src="/img/Chat Message.png" alt="">
        <p class="col_comments text">0</p></div>
        <img class="views post_icon" src="/img/Eye.png" alt=""> 
        <p class="text col_views">0</p>     
        </div>  
    </div>
<br>
    </div>
</template>

<style scoped>

.info_profile{
    background-color: #8657E9;
    width: 50%;
    margin-left: 25%;
    margin-top: 2.5%;
    height: 15vb;
    display: flex;
    align-items: center;
}
.img_profile{
    margin-left: 2.5%;
    height: 75%;
    border-radius: 45px;
    border: 1px solid #FFFFFF;
    display: inline-block;

}
.info{
    display: inline-block;
    color: #FFFFFF;
}
.info2{
    margin-bottom: 5%;
    margin-left: 10%;
}
.text{
    font-family: 'Inter';
}
.icon_site{

}
.site{
color: #FFFFFF;
 justify-content: right;
 margin-left: 50%;
}
.btn_edit_info{
    background-color: #FFFFFF;
    border: 1px solid #8657E9;
    border-radius: 4px;
    width: 100%;
    height: 3vh;
    color: #8657E9;
}
.profile_posts{
    background: #FFFFFF;
    display: flex;
    height: 100%;
    margin-left: 25%;
    width: 50%;
    flex-direction: column;
}
.add_post{
    margin-left: 1.5%;
    margin-top: 1%;
}
.new_post{
    background-color: #EEEEEE;
    width: 97%;

    height: 10vb;
    outline: 0px;
    border: none;
}
.icon_profile{
    border-radius: 17px;
    pointer-events: none;
    -moz-user-select: none;
     -webkit-user-select: none; 
     -ms-user-select: none; 
     user-select: none;
    height: 50%;
}
.granica{
    color: #81818180;
    width: 97%;
    margin-left: 1.5%;
}
.add_post2{
    background-color: #EEEEEE;
    color: #8657E9;
    display: flex;
    width: 97%;
    margin-left: 1.5%;
    justify-content: right;
}
.btn_add_post{
    border: 1px solid #8657E9;
    border-radius: #8657E9;
    background-color: #FFFFFF;
    height: 3vb;
    margin-right: 1.5%;
}

.icon_profile2{
    width: 5%;
    height: 5%;
    border-radius: 49px;
    display: inline-block;
}
.posts{
    background-color: #EEEEEE;
    height: 100%;
    width: 97%;
    margin-left: 1.5%;
    align-items: center;

}
.post_info{
    display: inline-flex;

}
.text_info{
    margin-left: 1%;
}
.text_post{
    margin-top: 1.5%;
}
.post_icon{
    display: inline-flex;
}
.info_post{
    display: inline-flex;
}
</style>