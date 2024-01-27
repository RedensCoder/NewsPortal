<script>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';
</script>

<template>
    <Articles />
    <Populars />
    <div class="main">
    <div class="all_publics">
        <div class="public1">
        <h3 class="text text1 t1">Все паблики</h3>
        <h3 class="text text1 t2">/</h3>
        <h3 class="text text1 t3">Мои паблики</h3>
        <div class="div_search">
        <input type="search" class="search" name="" id="" placeholder="Поиск паблика">
        <button class="icon btn_search"></button>
    </div>
    </div>
    <div class="publics">
        <div class="public">
            <div class="info">
            <img class="logo" src="public/img/example_logo.png" alt="">
            <div class="info_public">
            <h1 class="name_public">Новости мира</h1>
            <p class="followers">0 подписчиков</p>
                 </div>
                </div>
            </div>
             <hr class="hr">
            <div class="public">
            <div class="info">
            <img class="logo" src="public/img/example_logo.png" alt="">
            <div class="info_public">
            <h1 class="name_public">Новости мира</h1>
            <p class="followers">0 подписчиков</p>
                 </div>
                </div>
            </div>
            <hr class="hr">
            <div class="public">
            <img class="logo" src="public/img/example_logo.png" alt="">
            <div class="info_public">
            <h1 class="name_public">Новости мира</h1>
            <p class="followers">0 подписчиков</p>
                 </div>
            </div>
            <hr class="hr">
        </div>
    </div>
   
    </div>
</template>

<style scoped>
.main{
    display: flex;
}
.all_publics{
    width: 50%;
    margin-left: 45%;
    margin-right: 10%;
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
    width: 91%;
    height: 3.5vh;
    border-radius: 4px;
    margin-left: 2.5%;
    margin-top: 2.5%;
    border: 1px solid #81818180;
    font-family: 'Inter';
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;
    font-style: normal;
    display: inline-block;

}
.public{
    display: inline-block;
    margin-top: 2%;
    text-align: center;
    clear: left;
}
.followers{
    display: block;
    color: #818181;
}
.name_public{
    display: block;
    font-size: 20px;
}
.info_public{
    display:inline-block;
    text-align: center;
    height: 100%;
    vertical-align: middle;
    margin-bottom: 15%;
    margin-left: 2.5%;
}
.logo{
    display: inline-block;
    width: 35%;
    height: 35%;
    border-radius: 49px;

}
.info{
    margin-top: 2%;
    margin-bottom: 2%;
    text-align: center;
}

.hr{
    width: 100%;
}
.btn_search{
    background-color: #8657E9;
    border-radius: 3px;
    vertical-align: center;
    width: 3.5vh;
    height: 3.5vh;
    display: inline-block;
    border-style: none;

}
.icon{
background-image: url("public/img/Search.png");
background-repeat: no-repeat;
display: inline-block;

}
.div_search{
    width: 100%;
    display: inline-block;
    height: 100%;
    
}
</style>