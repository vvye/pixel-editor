<template>
    <div id="app">
        <PaletteEditor :palette="palette" :selected-color-index="selectedColorIndex"
                       @select-color-index="selectColorIndex" @color-changed="changeColor" />
        <PixelCanvas ref="pixelCanvas" cell-size="50" num-cells="8" :palette="palette" :selected-color-index="selectedColorIndex" />
    </div>
</template>

<script>
import PixelCanvas from '@/components/PixelCanvas.vue'
import PaletteEditor from '@/components/PaletteEditor'

export default {
    name: 'App',
    data: function () {
        return {
            palette: [
                [0, 0, 0],
                [255, 0, 0], [0, 255, 0], [0, 0, 255],
                [255, 255, 0], [0, 255, 255], [255, 0, 255],
                [255, 255, 255]
            ],
            selectedColorIndex: 0
        }
    },
    components: {
        PixelCanvas,
        PaletteEditor
    },
    methods: {
        selectColorIndex: function (index) {
            this.selectedColorIndex = index;
        },
        changeColor: function (index, color) {
            this.palette[index] = color;
            this.$refs.pixelCanvas.render();  // update colors
        }
    }
}
</script>
