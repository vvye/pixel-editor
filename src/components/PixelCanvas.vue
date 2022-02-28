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
        paintBucketMode: Boolean
    },
    data: function () {
        return {
            ctx: null,
            grid: [],
            penDown: false,
        }
    },
    watch: {
        cellSize: {
            handler: function () {
                this.updateCanvasSize();
                this.redraw();
            }
        },
        numCells: {
            handler: function () {
                this.updateCanvasSize();
                this.resetGrid();
                this.redraw();
            }
        }
    },
    mounted: function () {
        let canvas = this.$refs.pixelCanvas;
        this.ctx = canvas.getContext('2d');
        this.updateCanvasSize();
        this.resetGrid();
        this.redraw();
    },
    methods: {
        resetGrid: function () {
            for (let i = 0; i < this.numCells * this.numCells; i++) {
                this.grid[i] = 0;
            }
        },
        updateCanvasSize: function () {
            let canvas = this.$refs.pixelCanvas;
            canvas.width = canvas.height = this.cellSize * this.numCells;
        },
        draw: function (x, y) {
            let row = Math.floor(y / this.cellSize);
            let col = Math.floor(x / this.cellSize);
            if (this.paintBucketMode) {
                this.floodFill(row, col);
            } else {
                this.drawRowCol(row, col);
            }
        },
        drawRowCol: function (row, col) {
            this.grid[row * this.numCells + col] = this.currentColorIndex;
            this.redraw();
        },
        floodFill: function (row, col) {
        },
        neighbors: function (row, col) {
            let neighbors = [];
            for (let [newRow, newCol] of [[row, col - 1] , [row, col + 1], [row + 1, col], [row - 1, col]]) {
                if (!(newRow < 0 || newRow >= this.numCells || newCol < 0 || newCol >= this.numCells)) {
                    neighbors.push([newRow, newCol]);
                }
            }
            return neighbors;
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
                    let index = this.gridAt(row, col);
                    let color = this.palette[index];
                    let [r, g, b] = color;
                    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        },
        gridAt: function(row, col) {
            let gridIndex = row * this.numCells + col;
            return this.grid[gridIndex]
        }
    }
}
</script>

<style scoped>
</style>
