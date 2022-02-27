<template>
    <canvas ref="pixelCanvas" width="400" height="400"
            @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove"
    ></canvas>
</template>

<script>
export default {
    name: 'PixelCanvas',
    props: {
        cellSize: Number,
        numCells: Number,
        selectedColor: Number,
    },
    data: function () {
        return {
            ctx: null,
            grid: [],
            penDown: false,
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
        draw: function(x, y) {
            let row = Math.floor(y / this.cellSize);
            let col = Math.floor(x / this.cellSize);
            this.drawRowCol(row, col);
        },
        drawRowCol: function(row, col) {
            this.grid[row][col] = this.selectedColor;
            this.render();
        },
        handleMouseDown: function(e) {
            this.penDown = true;
            this.draw(e.offsetX, e.offsetY);
        },
        handleMouseUp: function() {
            this.penDown = false;
        },
        handleMouseMove: function(e) {
            if (this.penDown) {
                this.draw(e.offsetX, e.offsetY);
            }
        },
        render: function() {
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
