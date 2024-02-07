<script setup>
    import ("~/assets/css/second.css");
    import '@fontsource-variable/inter';
</script>
<template>

<Articles />
<div class="block header"><h1 class="text">Создание новостного паблика</h1></div>
    <div class="block new_public"><div class="new_public2">

        <div class="div1">
            <h3 class="text bottom">Название паблика</h3>
            <input type="text" class="input_1">
        </div>

        <div class="div1">
            <h3 class="text bottom">Описание паблика</h3>
            <textarea type="text" class="description" style="resize: none;"></textarea>
        </div>

        <div class="div1 view_public">
            <h3 class="text bottom">Обложка паблика</h3>
            <div class="flex">
                <div class="add_image"></div>
                <label for="file_img">
                    <input type="file" class="btn_download" accept="image/*" name="file_img" id="file_img">
                </label>
            </div>
        </div>

        <div class="div1">
            <h3 class="text bottom">Описание сайта</h3>
            <input type="text" class="input_1">
            <p>Вы можете прикрепить название сайта</p>
        </div>

        <div class="div1">
            <h3 class="text bottom">Комментарий администрации</h3>
            <input type="text" class="input_1">
        </div>

        <button class="btn_public">Создать паблик</button>
    </div>
</div>
</template>

<style scoped>
button{
    cursor: pointer;
}

p{
    margin-top: 7px;
    color: #818181;
}

.block{
     margin: 0 auto;
    margin-top: 2.5%;
     width: 776px;
     background-color: #FFFFFF;   
    }
.header{
    height: 67px;
    vertical-align: middle;
}
.text{
    font-weight: 500px;
    font-size: 20px;
    line-height: 29.05px;
    font-family: 'Inter';
}

.new_public{
    height: 100vh;
}
.new_public2{
    margin-left: 3%;
}
.description{
    width: 95%;
    height: 115px;
}
.div1{
    margin-top: 2%;
    margin-bottom: 2%;
}

label{
    padding-top: 5px;
}

.flex{ 
    display: flex;
}

.btn_download{  
    cursor: pointer;
    border: 1px solid #818181;
    border-radius: 4px;
    background-color: #EEEEEE;
    margin-left: 2%;
    margin-top: 5%;
}
.btn_public{
    border: 1px solid #8657E9;
    width: 133px;
    height: 34px;
    background-color: #FFFFFF;
    border-radius: 4px;
    margin-top: 5%;
}
.add_image{
    background: url(../public/img/add_picture.png) no-repeat 39px 36px;
    border: 1px solid #818181;
    width: 59px;
    height: 56px;
    justify-content: center;
    border-radius: 30px;
    background-position: center;
    display: inline-block;
}
.view_public{
    display: inline-block;
    width: auto;
}
.input_1{
    width: 325px;
    height: 38px;
    border: 1px solid #81818180;
    border-radius: 4px;
}
.bottom{
    margin-bottom: 2%;
}
</style>