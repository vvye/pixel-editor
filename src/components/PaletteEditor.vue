<template>
    <div>
        <span v-for="(color, index) in this.palette" :key="index"
              class="color" :class="index === this.selectedColor ? 'selected' : ''"
              :style="{
                  'background-color': `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  'color': `rgb(${color[0]}, ${color[1]}, ${color[2]})`
              }"
              @click="selectColor(index)"
        ></span>
    </div>
</template>

<script>
export default {
    name: 'PaletteEditor',
    data: function () {
        return {
            selectedColor: 0
        }
    },
    props: {
        palette: Array
    },
    methods: {
        selectColor: function (index) {
            this.selectedColor = index;
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.color {
    width: 2rem;
    height: 2rem;
    margin-right: 0.25rem;
    border: 1px solid black;
}

.color.selected {
    width: 2.25rem;
    height: 2.25rem;
}
</style>
