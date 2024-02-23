<script setup>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';

function my_public(){
    console.log("Все работает!")
}

</script>

<template>
    <Articles />

        <div class="main">

            <div class="content">
                <div class="all_publics">
                    <div class="public1">

                        <h3 class="text text1 t1">Все паблики</h3>
                        <h3 class="text text1 t2">/</h3>
                        <h3 class="text text1 t3" @click="my_public">Мои паблики</h3>
                        
                        
                    </div>
                   
                    <div class="div_search">
                        <input type="search" class="search" name="" id="" placeholder="Поиск паблика">
                        <button class="icon btn_search"></button>
                    </div>
                    <!-- <div class="publics">
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

                    </div> -->
                </div>
            </div>
            
        </div>
</template>

<style scoped>
.main{
    display: flex;
    justify-content: center;
    align-items: center;
}

.content{
    display: flex;
    margin-top: 2.5%;
    max-width: 780px;
    height: auto;
    margin-bottom: 20px;
    
    background-color: white;
}

.all_publics{
    display: flex;
}

.text1{
    display: flex;
    margin-left: 2.5%;
    margin-top: 3%;
    font-size: 24px;
    font-weight: 500;
}
.t1{
    color: #8657E9;
    cursor: pointer;
}
.t3{
    cursor: pointer;
}
.public1{
    display: flex;
}

.search{
    border-radius: 4px;
    border: 1px solid #81818180;
    font-size: 16px;
}

.btn_search{
    background-color: #8657E9;
    border-radius: 3px;
    vertical-align: center;
    width: 3.5vh;
    height: 3.5vh;
    border-style: none;
    cursor: pointer;

}
.icon{
    background-image: url("public/img/Search.png");
    background-repeat: no-repeat;
}
.div_search{
    width: 100%;
    /* display: flex; */
    height: 100%;
    margin-bottom: -5%;
}
.my_public{
    visibility: hidden;
}
</style>