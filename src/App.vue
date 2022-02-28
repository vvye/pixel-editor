<template>
    <div id="app">
        <Toolbar @paint-bucket-mode-changed="changePaintBucketMode"></Toolbar>
        <PaletteEditor :palette="palette" :current-color-id="currentColorId"
                       @current-color-id-changed="changeCurrentColorId" @color-changed="changeColor" />
        <PixelCanvas ref="pixelCanvas" :cell-size="cellSize" :num-cells="numCells" :palette="palette"
                     :current-color-id="currentColorId" :paint-bucket-mode="paintBucketMode" />
        <br />
        zoom: <input type="number" v-model="cellSize">
        dimensions: <select v-model="numCells">
        <option value="8">8x8</option>
        <option value="12">12x12</option>
        <option value="16">16x16</option>
        <option value="32">32x32</option>
    </select>
    </div>
</template>

<script>
import PixelCanvas from '@/components/PixelCanvas.vue'
import PaletteEditor from '@/components/PaletteEditor'
import Toolbar from '@/components/Toolbar';

export default {
    name: 'App',
    data: function () {
        return {
            cellSize: 32,
            numCells: 8,
            paintBucketMode: false,
            palette: [
                [0, 0, 0],
                [255, 0, 0], [0, 255, 0], [0, 0, 255],
                [255, 255, 0], [0, 255, 255], [255, 0, 255],
                [255, 255, 255]
            ],
            currentColorId: 0
        }
    },
    components: {
        PixelCanvas,
        PaletteEditor,
        Toolbar
    },
    methods: {
        changeCurrentColorId: function (index) {
            this.currentColorId = index;
        },
        changeColor: function (index, color) {
            this.palette[index] = color;
            this.refreshCanvas();
        },
        changePaintBucketMode: function (value) {
            this.paintBucketMode = value;
        },
        refreshCanvas: function () {
            let canvas = this.$refs.pixelCanvas;
            canvas.render();
        }
    }
}
</script>
