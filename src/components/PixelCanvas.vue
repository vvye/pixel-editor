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
        currentColorId: Number,
        palette: Array,
        paintBucketMode: Boolean
    },
    data: function () {
        return {
            ctx: null,
            grid: [],
            mousePressed: false,
        }
    },
    watch: {
        cellSize: {
            handler: function () {
                this.updateCanvasSize();
                this.render();
            }
        },
        numCells: {
            handler: function () {
                this.updateCanvasSize();
                this.resetGrid();
                this.render();
            }
        }
    },
    mounted: function () {
        let canvas = this.$refs.pixelCanvas;
        this.ctx = canvas.getContext('2d');
        this.updateCanvasSize();
        this.resetGrid();
        this.render();
    },
    methods: {
        resetGrid: function () {
            for (let row = 0; row < this.numCells; row++) {
                this.grid[row] = [];
                for (let col = 0; col < this.numCells; col++) {
                    this.grid[row][col] = this.currentColorId;
                }
            }
        },
        updateCanvasSize: function () {
            let canvas = this.$refs.pixelCanvas;
            canvas.width = canvas.height = this.cellSize * this.numCells;
        },
        draw: function (row, col) {
            this.grid[row][col] = this.currentColorId;
        },
        floodFill: function (row, col) {
            let targetColorId = this.grid[row][col];

            // mark the starting cell as active
            let active = [];
            for (let r = 0; r < this.numCells; r++) {
                active[r] = [];
                for (let c = 0; c < this.numCells; c++) {
                    active[r][c] = false;
                }
            }
            active[row][col] = true;
            let numActive = 1;

            // while active cells exist, loop through them
            while (numActive) {
                for (let currRow = 0; currRow < this.numCells; currRow++) {
                    for (let currCol = 0; currCol < this.numCells; currCol++) {
                        if (!active[currRow][currCol]) {
                            continue;
                        }
                        // draw on the current cell and mark it as inactive
                        this.draw(currRow, currCol);
                        active[currRow][currCol] = false;
                        numActive--;

                        // mark all neighbors as active if they're inactive and part of the fillable area
                        for (let [nRow, nCol] of this.neighbors(currRow, currCol)) {
                            if (!active[nRow][nCol] && this.grid[nRow][nCol] === targetColorId) {
                                active[nRow][nCol] = true;
                                numActive++;
                            }
                        }
                    }
                }
            }
        },
        neighbors: function (row, col) {
            let neighbors = [];
            for (let [newRow, newCol] of [[row, col - 1], [row, col + 1], [row + 1, col], [row - 1, col]]) {
                if (!(newRow < 0 || newRow >= this.numCells || newCol < 0 || newCol >= this.numCells)) {
                    neighbors.push([newRow, newCol]);
                }
            }
            return neighbors;
        },
        handleMouseDown: function (e) {
            this.mousePressed = true;
            this.mouseDown(e.offsetX, e.offsetY);
        },
        handleMouseUp: function () {
            this.mousePressed = false;
        },
        handleMouseMove: function (e) {
            if (this.mousePressed) {
                this.mouseDown(e.offsetX, e.offsetY);
            }
        },
        mouseDown: function (x, y) {
            let row = Math.floor(y / this.cellSize);
            let col = Math.floor(x / this.cellSize);
            if (this.paintBucketMode) {
                this.floodFill(row, col);
            } else {
                this.draw(row, col);
            }
            this.render();
        },
        render: function () {
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
