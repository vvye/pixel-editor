<template>
    <div>
        <input type="checkbox" v-model="paintBucketMode" /> Paint Bucket
        <button @click="clearCanvas">Clear</button>
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
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Toolbar',
    data: function () {
        return {
            paintBucketMode: false,
            cellSize: 32,
            numCells: 8,
        }
    },
    methods: {
        clearCanvas: function() {
            this.$emit('clearCanvasButtonPressed');
        }
    },
    watch: {
        paintBucketMode: {
            handler: function() {
                this.$emit('paintBucketModeChanged', this.paintBucketMode);
            }
        },
        cellSize: {
            handler: function() {
                this.$emit('cellSizeChanged', this.cellSize);
            }
        },
        numCells: {
            handler: function() {
                this.$emit('numCellsChanged', this.numCells);
            }
        }
    }
}
</script>

<style scoped>

</style>
