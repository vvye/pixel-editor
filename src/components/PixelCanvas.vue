<template>
    <canvas ref="pixelCanvas" width="400" height="400"></canvas>
</template>

<script>
export default {
    name: 'PixelCanvas',
    props: {
        cellSize: Number,
        numCells: Number
    },
    data: function () {
        return {
            ctx: null,
            grid: []
        }
    },
    mounted: function () {
        this.ctx = this.$refs.pixelCanvas.getContext('2d');
        this.resetGrid();
        this.render();
    },
    methods: {
        resetGrid: function() {
            for (let row = 0; row < this.numCells; row++) {
                this.grid[row] = [];
                for (let col = 0; col < this.numCells; col++) {
                    this.grid[row][col] = 0;
                }
            }
        },
        render: function() {

            this.grid[4][3] = 128;

            for (let row = 0; row < this.numCells; row++) {
                for (let col = 0; col < this.numCells; col++) {
                    let value = this.grid[row][col];
                    this.ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
                    this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }
}
</script>

<style scoped>
canvas {
    border: 1px solid;
}
</style>
