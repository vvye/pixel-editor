<template>
    <div class="container">
        <div class="sidebar">
            <h1>pixel editor</h1>
            <p>an application</p>
            <Toolbar @paint-bucket-mode-changed="setPaintBucketMode" @clear-canvas-button-pressed="resetCanvas"
                     @cell-size-changed="setCellSize" @num-cells-changed="setNumCells"
                     @show-grid-lines-changed="setShowGridLines"
                     @download-button-pressed="downloadCanvasImage"></Toolbar>
            <PaletteEditor ref="paletteEditor" :palette="palette" :current-color-id="currentColorId"
                           @current-color-id-changed="setCurrentColorId" @color-changed="setColor" />
        </div>
        <div class="canvas-container">
            <PixelCanvas ref="pixelCanvas" :cell-size="cellSize" :num-cells="numCells" :palette="palette"
                         :current-color-id="currentColorId" :paint-bucket-mode="paintBucketMode"
                         :show-grid-lines="showGridLines" />
        </div>
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
            this.$refs.pixelCanvas.resetGrid();
            this.refreshCanvas();
        }
    }
}
</script>

<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    min-height: 100vh;
}

body {
    background-color: #151d23;
    color: #c9ccce;
    padding: 2rem;
}

body, button {
    font-family: 'Merriweather Sans', sans-serif;
    font-size: 1.2rem;
}

</style>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 32rem auto;
    gap: 2rem;
}

.sidebar {
    grid-column: 1/2;
    background-color: #2b3a44;
    padding: 1rem 1.5rem 2rem;
    border-radius: 0.25rem;
    box-shadow: 0 0.25rem 0 #0e151a;
}

.canvas-container {
    grid-column: 2/3;
}

h1 {
    font-family: 'Bungee', sans-serif;
    font-size: 3.5rem;
    line-height: 3.5rem;
    margin-top: -2rem;
    margin-left: -0.2rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 0.25rem 0 #0e151a;
}

h1 + p {
    margin-bottom: 2rem;
}

</style>
