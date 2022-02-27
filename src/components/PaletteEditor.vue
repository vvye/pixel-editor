<template>
    <div>
        <span class="color" v-for="(color, key) in this.palette" :key="key"
              :style="{'background-color': `rgb(${color[0]}, ${color[1]}, ${color[2]})`}"></span>
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
    display: flex;
    margin-bottom: 1rem;
}

.color {
    width: 2rem;
    height: 2rem;
    margin-right: 0.25rem;
    border: 1px solid;
}
</style>
