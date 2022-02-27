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
        cssProps: function () {
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
    width: 2rem;
    height: 2rem;
    margin-right: 0.25rem;
    border: 1px solid black;
}

div.selected {
    width: 2.25rem;
    height: 2.25rem;
}
</style>
