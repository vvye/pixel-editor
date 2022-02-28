<template>
    <div :style="cssProps" :class="{'selected': selected}"></div>
</template>

<script>
export default {
    name: 'PaletteEntry',
    props: {
        color: Array,
        selected: Boolean
    },
    computed: {
        cssProps() {
            return {
                '--bg-color': `rgb(${this.color.join(',')})`
            }
        }
    }
}
</script>

<style scoped>
div {
    background-color: var(--bg-color);
    width: 8.3333%;
    height: 0;
    padding-bottom: 8.3333%;
}

div.selected {
    transform: scale(1.1);
    border-radius: 0.25rem;
}
</style>
