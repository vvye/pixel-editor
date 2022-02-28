<template>
    <div>
        <input type="checkbox" v-model="paintBucketMode" /> Paint Bucket
        <button @click="clearCanvasButtonPressed">Clear</button>
        <button ref="downloadButton" @click="downloadButtonPressed">Download</button>
        zoom: <input type="range" min="1" max="100" step="1" v-model="cellSize">
        dimensions:
        <select v-model="numCells">
            <option value="8">8x8</option>
            <option value="12">12x12</option>
            <option value="16">16x16</option>
            <option value="32">32x32</option>
        </select>
        <input type="checkbox" v-model="showGridLines" /> show grid lines
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
        }
    },
    methods: {
        clearCanvasButtonPressed() {
            this.$emit('clearCanvasButtonPressed');
        },
        downloadButtonPressed() {
            this.$emit('downloadButtonPressed');
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

</style>
