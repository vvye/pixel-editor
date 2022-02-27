<template>
    <div id="app">
        <PaletteEditor :palette="palette"/>
        <PixelCanvas cell-size="50" num-cells="8" :palette="palette" :selected-color-index="2" />
    </div>
</template>

<script>
import PixelCanvas from '@/components/PixelCanvas.vue'
import PaletteEditor from '@/components/PaletteEditor';

export default {
    name: 'App',
    data: function () {
        return {
            palette: [
                [0, 0, 0],
                [255, 0, 0], [0, 255, 0], [0, 0, 255],
                [255, 255, 0], [0, 255, 255], [255, 0, 255],
                [255, 255, 255]
            ]
        }
    },
    components: {
        PixelCanvas,
        PaletteEditor
    }
}
</script>
