<template>
    <QuillEditor theme="snow" toolbar="essential" v-model:content="value" content-type="html" class="editer" @input="content"/>
</template>


<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const value = ref('');
const emit = defineEmits(["text"]);

function content() {
    emit('text', value.value)
}

</script>

<style scoped>
.editer{
    word-wrap: break-all;
    white-space: pre-wrap;
    overflow-wrap: break-word;
}
</style>