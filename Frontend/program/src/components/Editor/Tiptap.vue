<template>
    <editor-content class="EditorTiptap" :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

export default {
    components: {
        EditorContent,
    },

    data() {
        return {
            editor: null,
        }
    },

    mounted() {
        this.editor = new Editor({
            content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
            extensions: [StarterKit],
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>

<style lang='scss'>
.EditorTiptap {
    width: 100%;

    .ProseMirror {
        width: 100%;
        border: 1px solid #e2e2e3;
        box-shadow: rgb(197, 197, 197) 0px 0px 2px inset;
        outline: none;
        padding: 0.5rem 1rem;
        min-height: 400px !important;
    }
}
</style>