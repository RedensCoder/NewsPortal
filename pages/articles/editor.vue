<template>
<Articles />
<div class="main">
    <div class="content">

        <div class="create_public">
            <p class="text_public">Создание публикации</p>
        </div>

        <div class="editor">
            <input type="text" placeholder="Заголовок публикации" class="input_text" v-model="title">
            <!-- ЭТО БУДУТ СТАТЬИ И НОВОСТИ -->
            <div class="editer">
                <ClientOnly> <editerr @text="contentText"/> </ClientOnly>
            </div>
            <input type="text" placeholder="Введите теги" class="input_text" v-model="tags">
            <div class="div_btn_publish">
                <button class="btn_publish" @click="createPost">Опубликовать</button>
            </div>

        </div>

    </div>
</div>
</template>

<script setup>
import ("~/assets/css/second.css");
import { useApiStore } from '~/stores/apiStore';
import { jwtDecode } from 'jwt-decode';

let title = ref("");
let content = ref("");
let tags = ref("");

const api = useApiStore();

function contentText(text) {
    content.value = text;
}

// функция по созданию статей и новостей
async function createPost() {
    let tag = [];
    tags.value.split(",").forEach(element => {
        tag.push(element.trim());
    });
    await api.createPost(title.value, content.value, tag, jwtDecode(localStorage.getItem("token")).data.id)
    title.value = "";
    content.value = "";
    tags.value = "";
}

const editerr = defineAsyncComponent(() => 
    import ("~/components/editor.vue") 
)

</script>

<style scoped>
.content{
    max-width: 1920px;
}

.create_public ,.editor{
    margin: 80px auto 0 auto;
    width: 776px;
    height: auto;
    background: #ffffff;
    border-radius: 5px;
    display: grid;
}

@media (max-width: 1400px){
    .content{
        max-width: 1400px;
    }
}
@media (max-width: 992px){
    .content{
        max-width: 992px;
    }
}
@media (max-width: 767px){
    .content{
        max-width: none;
    }
}

.editor{
    padding: 30px 20px;
    word-wrap: break-all;
    white-space: pre-wrap;
    overflow-wrap: break-word;
}

.text_public{
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    padding: 20px;
}

.input_text{
    font-size: 24px;
    font-weight: 500;
    line-height: 29px;
    color: #818181;
}

.editer{
    margin-top: 30px;
    height: 200px;
    margin-bottom: 70px;
}

.div_btn_publish{
    margin-top: 30px;
}

.btn_publish{
    width: 116px;
    height: 34px;
    border-radius: 4px;
    border: 1px solid;
    color: #8657E9;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 300;
    line-height: 17px;
    cursor: pointer;
}
</style>