<template>
    <div :style="cssProps" :class="{'selected': selected, 'transparent': this.color[3] === 0}"></div>
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
    cursor: pointer;
    transition: all 0.05s ease;
}

div:hover {
    transform: scale(1.075);
    border-radius: 0.125rem;
}

div.selected {
    transform: scale(1.2);
    border-radius: 0.25rem;
    box-shadow: 0 0 0.125rem rgba(0, 0, 0, 0.5);
    z-index: 10;
}
</style>
