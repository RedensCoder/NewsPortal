<template>
    <div class="main">
        <hr>
        <div class="content">
            <div class="text_reg">
                <h3 class="">Регистрация</h3>
            </div>
            <div class="inputs">
                <div class="form_login">
                    <p class="text_p">Логин</p>
                    <input type="text" v-model="login">
                </div>
                <div class="form_eMail">
                    <p class="text_p">E-mail</p>
                    <input type="e-mail" v-model="eMail">
                </div>
                <div class="form_password">
                    <p class="text_p">Пароль</p>
                    <input type="password" v-model="password">
                </div>
                <div class="form_password_confirm">
                    <p class="text_p">Подтверждение пароля</p>
                    <input type="password" v-model="passwordSubmit">
                </div>
                <div class="form_checkbox">
                    <input type="checkbox" class="inp_checkbox" v-model="btn_form_checkbox"> 
                    <p class="text_form">Я согласен на <span style="color: #0047FF;">обработку персональных данных</span></p>
                </div>
                <div class="form_send">
                    <button v-if="btn_form_checkbox" class="btn_form1" @click="registr">Зарегистрироваться</button>
                    <button v-else class="btn_form2">Зарегистрироваться</button>
                    <a href="" class="text_account">Уже есть аккаунт?</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ("~/assets/css/second.css");
import { useApiStore } from '#imports';

const api = useApiStore();
let btn_form_checkbox = ref(false);
let login = ref('');
let password = ref('');
let passwordSubmit = ref('');
let eMail = ref('');
let router = useRouter();

async function registr(){
    if (login.value !== "" && password.value !== "" && passwordSubmit.value !== "" && eMail.value !== ""){
        if (password.value ===  passwordSubmit.value){
            const token = await api.createUser(login.value , password.value , eMail.value);
            if (token !== undefined){
                localStorage.setItem('token', token);
                router.push({path: "/"});
            }
            else{
                alert("такой пользователь есть")
            }
        }
        else{
            alert("пароли не совпали")
        }
    }
    else{
        alert("НЕ ВСЕ!")
    }
}
// onMounted(() => {
//     if (localStorage.getItem(token) !== undefined){
//         router.push({path: "/"});
//     }
// })
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
        margin-top: 23px;
        text-align: center;
    }

    .inputs{
        position: relative;
        margin-top: 20px;
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
    .form_password_confirm{
        padding: 20px 0px 0px;
    }

    .form_checkbox{
        padding-top: 20px;
        display: flex;
    }

    .inp_checkbox{
        border-radius: 4px;
        width: 18px;
        height: 16px;
    }

    /* .inp_checkbox:checked::before {
        content: '\2705'; 
        font-size: 20px;
        color: rgb(38, 255, 0);
   } */


    .text_form{
        font-size: 13.5px;
        padding-left: 4px;
        padding-top: 2px;
        line-height: 14px;
        color: #000000;
    }

    .form_send{
        padding-top: 20px;
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

    .text_account{
        padding: 10px 180px;
        text-decoration: none;
        color: #0047FF;
    }
</style>