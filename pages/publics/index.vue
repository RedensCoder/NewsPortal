<template>
    <Articles />

        <div class="main">

            <div class="content">
                <div class="all_publics">
                    <div class="public1">
                        <h3 class="text text1 t1">Все паблики</h3>
                        <hr class="hr_public">
                        <h3 class="text text1 t3" @click="my_public">Мои паблики</h3>
                    </div>
                   
                    <div class="div_search">
                        <input type="search" class="search" name="" id="" placeholder="Поиск паблика">
                        <button class="btn_search"><img src="public/img/Search.png" alt="" class="icon"></button>
                    </div>
                    <div class="publics">
                        <div class="public" >
                            <div class="info" v-for="publics in data">
                                <NuxtLink to="/publics/[id].vue">111</NuxtLink>
                                <img class="logo" :src="publics.user.avatar" alt="не загрузилось:(">
                                <div class="info_public">
                                    <h1 class="name_public">{{ publics.user.name }}</h1>
                                    <p class="followers">0 подписчиков</p>
                                </div>
                            </div>
                        </div>
                        <hr class="hr">
                    </div>
                    <!-- <div class="next_post_btn">
                        <button @click="addLimit" class="post_next">Следующие Паблики</button>
                    </div> -->
                </div>
            </div>
            
        </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import '@fontsource-variable/inter';
import { useApiStore } from '~/stores/apiStore';
import { jwtDecode } from 'jwt-decode';

const api = useApiStore();
let data = reactive([]);
let limit = ref(10);

watch (limit, async () => {
    data.splice(0, data.length)
    const publics = await api.getAllPublics(limit.value);
    data.push(...publics)
}) 

onMounted(async () => {
    const publics = await api.getAllPublics(limit.value);
    data.push(...publics.reverse())
    
    const userId = jwtDecode(localStorage.getItem('token')).data.id;
})

// function addLimit(){
//     limit.value = limit.value + 10
//     // alert(limit.value)
// }

</script>

<style scoped>
.next_post_btn{
    margin-top: 30px;
    margin-left: 37%;
    margin-bottom: 30px;
}
.post_next{
    width: auto;
    border-radius: 4px;
    background-color: #8657E9;
    border: black 1.9px solid;
    padding: 15px 15px;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    height: 50px;
}

.hr{
    margin-bottom: 10px;
}
.main{
    display: flex;
    justify-content: center;
    align-items: center;
}

.hr_public{
    border: 1px solid;
    height: 2vh;
    rotate: 15deg;
    margin-top: 26px;
    margin-left: 20px;
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
    flex-direction: column;
    padding: 10px;
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
    width: 640px;
    border-radius: 4px;
    border: 1px solid #81818180;
    font-size: 16px;
    padding: 10px;
    height: auto;
}

.btn_search{
    background-color: #8657E9;
    border-radius: 3px;
    vertical-align: center;
    width: 4vh;
    height: 4.2vh;
    border-style: none;
    cursor: pointer;
    margin-left: 3px;
}
.icon{
    background-repeat: no-repeat;
    height: 42px;
    width: 24px;
    align-items: center;
}
.div_search{
    padding: 10px 20px;
    width: 100%;
    display: flex;
    height: 100%;
    margin-bottom: -5%;
}
.publics{
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    padding: 0px 20px;
}

.info{
    display: flex;
    align-items: center;
}

.info_public{
    margin-left: 10px;
}

.public{
    /* margin-top: 30px; */
}
</style>