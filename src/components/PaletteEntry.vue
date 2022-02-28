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
    width: 2.5rem;
    height: 2.5rem;
}

div.selected {
    transform: scale(1.1);
}
</style>
