<template>
    <div id="app">
        <PaletteEditor :palette="palette" :selected-color-index="selectedColorIndex"
                       @select-color-index="selectColorIndex" />
        <PixelCanvas cell-size="50" num-cells="8" :palette="palette" :selected-color-index="selectedColorIndex" />
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
        }
    }
}
</script>
