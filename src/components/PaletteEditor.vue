<template>
    <div>
        <span v-for="(color, key) in this.palette" :key="key"
              :style="{'background-color': `rgb(${color[0]}, ${color[1]}, ${color[2]})`}">{{color}}</span>
    </div>
</template>

<script>
export default {
    name: 'PaletteEditor',
    data: function() {
        return {
        }
    },
    props: {
        palette: Array
    }
}
</script>

<style scoped>
div {
    margin-bottom: 1rem;
}
</style>
