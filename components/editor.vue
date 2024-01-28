<template>
    <QuillEditor theme="snow" toolbar="essential" v-model:content="content" content-type="html" />
</template>


<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const content = ref('');

</script>

<style scoped>


</style>