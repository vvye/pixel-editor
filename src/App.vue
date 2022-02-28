<template>
    <div id="app">
        <Toolbar @paint-bucket-mode-changed="setPaintBucketMode" @clear-canvas-button-pressed="resetCanvas"
                 @cell-size-changed="setCellSize" @num-cells-changed="setNumCells"
                 @show-grid-lines-changed="setShowGridLines" @download-button-pressed="downloadCanvasImage"></Toolbar>
        <PaletteEditor ref="paletteEditor" :palette="palette" :current-color-id="currentColorId"
                       @current-color-id-changed="setCurrentColorId" @color-changed="setColor" />
        <PixelCanvas ref="pixelCanvas" :cell-size="cellSize" :num-cells="numCells" :palette="palette"
                     :current-color-id="currentColorId" :paint-bucket-mode="paintBucketMode"
                     :show-grid-lines="showGridLines" />
    </div>
</template>

<script>
import PixelCanvas from '@/components/PixelCanvas.vue'
import PaletteEditor from '@/components/PaletteEditor'
import Toolbar from '@/components/Toolbar';

export default {
    name: 'App',
    data() {
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
            currentColorId: 0,
            showGridLines: false,
        }
    },
    components: {
        PixelCanvas,
        PaletteEditor,
        Toolbar
    },
    methods: {
        setCurrentColorId(id) {
            this.currentColorId = id;
        },
        setColor(id, color) {
            this.palette[id] = color;
            this.refreshCanvas();
        },
        setPaintBucketMode(paintBucketMode) {
            this.paintBucketMode = paintBucketMode;
        },
        setCellSize(cellSize) {
            this.cellSize = cellSize;
        },
        setNumCells(numCells) {
            this.numCells = numCells;
        },
        refreshCanvas() {
            this.$refs.pixelCanvas.render();
        },
        setShowGridLines(showGridLines) {
            this.showGridLines = showGridLines;
        },
        downloadCanvasImage() {
            this.$refs.pixelCanvas.downloadImage();
        },
        resetCanvas() {
            this.currentColorId = this.$refs.paletteEditor.currentColorId = 0;
            setTimeout(() => {
                this.$refs.pixelCanvas.resetGrid();
                this.refreshCanvas();
            }, 50); // wait for currentColorId change to register
        }
    }
}
</script>
