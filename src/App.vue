<template>
    <div id="app">
        <PaletteEditor :palette="palette" :current-color-index="currentColorIndex"
                       @current-color-index-changed="changeCurrentColorIndex" @color-changed="changeColor" />
        <PixelCanvas ref="pixelCanvas" cell-size="50" num-cells="8" :palette="palette"
                     :current-color-index="currentColorIndex" />
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
            currentColorIndex: 0
        }
    },
    components: {
        PixelCanvas,
        PaletteEditor
    },
    methods: {
        changeCurrentColorIndex: function (index) {
            this.currentColorIndex = index;
        },
        changeColor: function (index, color) {
            this.palette[index] = color;
            this.$refs.pixelCanvas.redraw();  // update colors
        }
    }
}
</script>
