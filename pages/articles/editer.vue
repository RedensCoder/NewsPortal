<template>
<Articles />
<div class="main">
    <div class="content">

        <div class="create_public">
            <p class="text_public">Создание публикации</p>
        </div>

        <div class="editor">
            <input type="text" placeholder="Заголовок публикации" class="input_text">

            <div class="editer">
                <ClientOnly> <editerr /> </ClientOnly>
            </div>

            <button class="btn_publish">Опубликовать</button>
        </div>

    </div>
</div>
</template>

<script setup>
import ("~/assets/css/second.css");

const editerr = defineAsyncComponent(() => 
    import ("~/components/editor.vue") 
)

</script>

<style scoped>
.content{

}

.create_public ,.editor{
    margin: 80px auto 0 auto;
    width: 776px;
    height: auto;
    background: #ffffff;
    border-radius: 5px;
    display: grid;
    /* flex-direction: column; */
}

.editor{
    padding: 20px 20px;
    word-wrap: break-word;
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

}

.btn_publish{
    margin-top: 50px;
}
</style>