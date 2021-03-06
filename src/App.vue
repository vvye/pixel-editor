<template>
    <div class="container">
        <div class="sidebar">
            <h1>pixel editor</h1>
            <p>an application</p>
            <Toolbar @paint-bucket-mode-changed="setPaintBucketMode" @clear-canvas-button-pressed="resetCanvas"
                     @cell-size-changed="setCellSize" @num-cells-changed="setNumCells"
                     @show-grid-lines-changed="setShowGridLines"
                     @download-requested="downloadCanvasImage"></Toolbar>
            <PaletteEditor ref="paletteEditor" :palette="palette" :current-color-id="currentColorId"
                           @current-color-id-changed="setCurrentColorId" @color-changed="setColor" />
            <AppInfo />
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
import AppInfo from '@/components/AppInfo';

export default {
    name: 'App',

    components: {
        PixelCanvas,
        PaletteEditor,
        Toolbar,
        AppInfo
    },

    data() {
        return {
            cellSize: 32,
            numCells: 16,
            paintBucketMode: false,
            palette: [
                [1, 2, 18, 255], [37, 38, 62, 128], [103, 103, 127, 255], [157, 157, 181, 255], [202, 202, 227, 255],
                [241, 241, 250, 255], [129, 2, 26, 255], [194, 11, 27, 255], [242, 49, 36, 255], [255, 110, 90, 255],
                [249, 163, 148, 255], [248, 215, 210, 255], [112, 47, 37, 255], [177, 103, 49, 255], [232, 149, 49, 255],
                [249, 195, 46, 255], [246, 222, 93, 255], [249, 235, 161, 255], [5, 84, 65, 255], [32, 143, 59, 255],
                [58, 190, 50, 255], [107, 209, 80, 255], [153, 227, 108, 255], [218, 234, 160, 255], [19, 58, 127, 255],
                [43, 114, 177, 255], [53, 155, 209, 255], [72, 190, 233, 255], [123, 203, 231, 255], [181, 222, 235, 255],
                [0, 0, 0, 0]
            ],
            currentColorId: 0,
            showGridLines: false,
        }
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

        downloadCanvasImage(fileFormat) {
            this.$refs.pixelCanvas.downloadImage(fileFormat);
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
    background: url('assets/img/background.png') bottom #151d23;
    background-blend-mode: color-burn;
    color: #c9ccce;
    padding: 2rem;
    text-shadow: 0 0.125rem 0 #0e151a;
}

body, button, .button, select, option {
    font-family: 'Merriweather Sans', sans-serif;
    font-size: 1.2rem;
}

button, .button, select {
    cursor: pointer;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    background-color: #4e5f6a;
    border: none;
    box-shadow: 0 0.125rem 0 #151d23;
    border-radius: 0.25rem;
    color: #c9ccce;
    transition: all 0.05s ease;
}

select {
    appearance: none;
}

button:hover, .button:hover, select:hover {
    background-color: #5e707c;
}

button:active, button.pressed {
    background-color: #73848f;
    box-shadow: inset 0 0.25rem 0 #252d35;
    padding-top: 0.6rem;
    padding-bottom: 0.4rem;
    text-shadow: 0 0.125rem 0.125rem #2b3a44;
}

label {
    cursor: pointer;
    display: inline-flex;
}

.transparent {
    background: repeating-conic-gradient(#8b98a1 0% 25%, transparent 0% 50%) 50% / 2rem 2rem #dedfe1 !important;
}

</style>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 34rem auto;
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
    color: #e4e5e7;
    animation: slide-in 0.4s;
}

h1:hover {
    transform: rotate(2deg);
    transition: all 0.05s;
}

h1 + p {
    font-family: 'Bungee', sans-serif;
    margin-top: -1rem;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    animation: slide-in 0.4s;
}

@keyframes slide-in {
    0% {
        transform: translateY(4rem) scale(0.95);
        opacity: 0;
    }
    60%, 85% {
        transform: translateY(-0.5rem) scale(1) rotate(2deg);
        opacity: 1;
    }
    97% {
        transform: translateY(-0.125rem);
        opacity: 1;
    }
    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

</style>
