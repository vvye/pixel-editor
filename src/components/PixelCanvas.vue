<template>
    <canvas ref="pixelCanvas" @mousedown="handleMouseDown" @mouseup="handleMouseUp"
            @mousemove="handleMouseMove" @mouseleave="handleMouseUp"></canvas>
</template>

<script>
export default {
    name: 'PixelCanvas',
    props: {
        cellSize: Number,
        numCells: Number,
        currentColorIndex: Number,
        palette: Array,
    },
    data: function () {
        return {
            ctx: null,
            grid: [],
            penDown: false,
        }
    },
    mounted: function () {
        let canvas = this.$refs.pixelCanvas;
        canvas.width = canvas.height = this.cellSize * this.numCells;
        this.ctx = canvas.getContext('2d');
        this.resetGrid();
        this.redraw();
    },
    methods: {
        resetGrid: function () {
            for (let row = 0; row < this.numCells; row++) {
                this.grid[row] = [];
                for (let col = 0; col < this.numCells; col++) {
                    this.grid[row][col] = 0;
                }
            }
        },
        draw: function (x, y) {
            let row = Math.floor(y / this.cellSize);
            let col = Math.floor(x / this.cellSize);
            this.drawRowCol(row, col);
        },
        drawRowCol: function (row, col) {
            this.grid[row][col] = this.currentColorIndex;
            this.redraw();
        },
        handleMouseDown: function (e) {
            this.penDown = true;
            this.draw(e.offsetX, e.offsetY);
        },
        handleMouseUp: function () {
            this.penDown = false;
        },
        handleMouseMove: function (e) {
            if (this.penDown) {
                this.draw(e.offsetX, e.offsetY);
            }
        },
        redraw: function () {
            for (let row = 0; row < this.numCells; row++) {
                for (let col = 0; col < this.numCells; col++) {
                    let index = this.grid[row][col];
                    let color = this.palette[index];
                    let [r, g, b] = color;
                    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }
}
</script>

<style scoped>
</style>
