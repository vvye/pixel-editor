<template>
    <div class="toolbar-container">
        <div>
            <button @click="clearCanvasButtonPressed">
                <img src="../assets/img/icons/new.png" alt="" /> New
            </button>
            <select class="download-select" v-model="fileFormat" @change="downloadButtonPressed">
                <option value="default" style="display: none;">Export</option>
                <option value="png">as PNG</option>
                <option value="jpeg">as JPG</option>
            </select>
            Canvas size:
            <select class="size-select" v-model="numCells">
                <option value="8">8x8</option>
                <option value="12">12x12</option>
                <option value="16">16x16</option>
                <option value="32">32x32</option>
            </select>
        </div>
        <div>
            <button :class="{pressed: !paintBucketMode}" @click="paintBucketMode = false">
                <img src="../assets/img/icons/pencil.png" alt="Pencil" title="Pencil" />
            </button>
            <button :class="{pressed: paintBucketMode}" @click="paintBucketMode = true">
                <img src="../assets/img/icons/paint-bucket.png" alt="Paint Bucket" title="Paint Bucket" />
            </button>
        </div>
        <div>
            Zoom: <input type="range" min="1" max="100" step="1" v-model="cellSize"> {{ cellSize }}&times;
        </div>
        <div>
            <label>
                <input class="grid-line-checkbox" type="checkbox" v-model="showGridLines" /> Show grid lines
            </label>
        </div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Toolbar',
    data() {
        return {
            paintBucketMode: false,
            cellSize: 32,
            numCells: 8,
            showGridLines: false,
            fileFormat: 'default'
        }
    },
    methods: {
        clearCanvasButtonPressed() {
            this.$emit('clearCanvasButtonPressed');
        },
        downloadButtonPressed() {
            let fileFormat = this.fileFormat;
            this.fileFormat = 'default';
            this.$emit('downloadRequested', fileFormat);
        }
    },
    watch: {
        paintBucketMode: {
            handler() {
                this.$emit('paintBucketModeChanged', this.paintBucketMode);
            }
        },
        cellSize: {
            handler() {
                this.$emit('cellSizeChanged', this.cellSize);
            }
        },
        numCells: {
            handler() {
                this.$emit('numCellsChanged', this.numCells);
            }
        },
        showGridLines: {
            handler() {
                this.$emit('showGridLinesChanged', this.showGridLines);
            }
        }
    }
}
</script>

<style scoped>
.toolbar-container {
    margin-bottom: 2rem;
}

.toolbar-container > div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

input[type="range"] {
    margin: 0 1rem;
}

.size-select {
    margin-left: 1rem;
    background-image: url('../assets/img/icons/arrow.png');
    background-position: right 1rem center;
    padding-right: 1.75rem;
    background-repeat: no-repeat;
}

.download-select {
    background-image: url('../assets/img/icons/export.png');
    background-position: 0.75rem center;
    padding-left: 1.75rem;
    background-repeat: no-repeat;
}

.grid-line-checkbox {
    margin-right: 1rem;
}

</style>
