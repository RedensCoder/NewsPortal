<template>
    <div class="main">
        <hr>
        <div class="content">
            <div class="text_reg">
                <h3 class="">Вход в личный кабинет</h3>
            </div>
            <div class="inputs">
                <div class="form_eMail">
                    <p class="text_p">Логин</p>
                    <input type="text" v-model="login">
                </div>
                <div class="form_password">
                    <p class="text_p">Пароль</p>
                    <input type="password" v-model="password">
                </div>
                <div class="form_send">
                    <button class="btn_form1" @click="auth">Войти</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import { useApiStore } from '#imports';

const api = useApiStore();
let login = ref('');
let password = ref('');
let router = useRouter();

async function auth(){

    if (login.value !== "" && password.value !== ""){

        const token = await api.auth(login.value, password.value);

        if (token !== undefined){
            // localStorage.getItem(token);
            localStorage.setItem("token", token);
            router.push(`/`).then(() => {
                window.location.reload()
            })
        }
        else{
            console.log(token);
            alert("Ошибка ввода данных, попробуйте еще раз")
        }
    }
    else{
        alert("Не все данные введены")
    }
}

</script>

<style scoped>
button {
    cursor: pointer;
}

input{
    border-radius: 4px;
    border: solid 1px;
    width: 290px;
    height: 40px;
    padding-left: 10px;
    font-size: 18px;
}

hr{
    color: #8657E9;
    border: solid 2px;
}

input:focus{
    outline: none;
    border: 2px solid #8657E9 ;
}

.content{
    margin: 80px auto 0 auto;
    width: 60%;
    width: 540px;
    padding-bottom: 30px;
    background: #ffffff;
    border-radius: 5px;
    display: grid;
    flex-direction: column;
    -webkit-box-shadow: 4px 4px 30px 4px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 4px 30px 4px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 4px 30px 4px rgba(34, 60, 80, 0.2);
}

.text_reg{
    margin-top: 30px;
    text-align: center;
}

.inputs{
    position: relative;
    margin-top: 15px;
    left: 125px;
}

.text_p{
    font-size: 16px;
    line-height: 19px;
    color: #000000;
    padding: 0px 0px 20px;
}

.form_eMail{
    padding: 20px 0px 0px;
}

.form_password{
    padding: 20px 0px 0px;
}

.form_send{
    padding-top: 40px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.btn_form2{
    width: 300px;
    border-radius: 4px;
    background-color: #8557e996;
    border: none;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 19px;
    color: #ffffff;
    height: 50px;
    cursor: no-drop;
}

.btn_form1{
    width: 300px;
    border-radius: 4px;
    background-color: #8657E9;
    border: none;
    padding: 15px 15px;
    font-size: 18px;
    line-height: 19px;
    color: #ffffff;
    height: 50px;
}

</style>