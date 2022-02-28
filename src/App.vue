<template>
    <div id="app">
        <Toolbar @paint-bucket-mode-changed="setPaintBucketMode" @clear-canvas-button-pressed="resetCanvas"
        @cell-size-changed="setCellSize" @num-cells-changed="setNumCells"></Toolbar>
        <PaletteEditor ref="paletteEditor" :palette="palette" :current-color-id="currentColorId"
                       @current-color-id-changed="setCurrentColorId" @color-changed="setColor" />
        <PixelCanvas ref="pixelCanvas" :cell-size="cellSize" :num-cells="numCells" :palette="palette"
                     :current-color-id="currentColorId" :paint-bucket-mode="paintBucketMode" />
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
        setCurrentColorId: function (id) {
            this.currentColorId = id;
        },
        setColor: function (id, color) {
            this.palette[id] = color;
            this.refreshCanvas();
        },
        setPaintBucketMode: function (paintBucketMode) {
            this.paintBucketMode = paintBucketMode;
        },
        setCellSize: function(cellSize) {
            this.cellSize = cellSize;
        },
        setNumCells: function(numCells) {
            this.numCells = numCells;
        },
        refreshCanvas: function () {
            this.$refs.pixelCanvas.render();
        },
        resetCanvas: function() {
            this.currentColorId = this.$refs.paletteEditor.currentColorId = 0;
            setTimeout(() => {
                this.$refs.pixelCanvas.resetGrid();
                this.refreshCanvas();
            }, 50); // wait for currentColorId change to register
        }
    }
}
</script>
