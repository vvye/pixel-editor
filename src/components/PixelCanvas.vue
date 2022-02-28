<template>
    <canvas ref="canvas" @mousedown="handleMouseDown" @mouseup="handleMouseUp"
            @mousemove="handleMouseMove" @mouseleave="handleMouseUp"></canvas>
    <button ref="downloadButton" @click="downloadImage">Download</button>
    <input type="checkbox" v-model="showGridLines"> show grid lines
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
    data() {
        return {
            ctx: null,
            grid: [],
            penDown: false,
            showGridLines: false
        }
    },
    watch: {
        cellSize: {
            handler() {
                this.updateCanvasSize();
                this.render();
            }
        },
        numCells: {
            handler() {
                this.updateCanvasSize();
                this.resetGrid();
                this.render();
            }
        },
        showGridLines: {
            handler() {
                this.render();
            }
        }
    },
    mounted() {
        let canvas = this.$refs.canvas;
        this.ctx = canvas.getContext('2d');
        this.updateCanvasSize();
        this.resetGrid();
        this.render();
    },
    methods: {
        resetGrid() {
            for (let row = 0; row < this.numCells; row++) {
                this.grid[row] = [];
                for (let col = 0; col < this.numCells; col++) {
                    this.grid[row][col] = this.currentColorId;
                }
            }
        },
        updateCanvasSize() {
            let canvas = this.$refs.canvas;
            canvas.width = canvas.height = this.cellSize * this.numCells;
        },
        draw(row, col) {
            this.grid[row][col] = this.currentColorId;
        },
        floodFill(row, col) {
            let targetColorId = this.grid[row][col];

            // keep track of visited and active cells
            let active = [];
            let visited = [];
            for (let r = 0; r < this.numCells; r++) {
                active[r] = [];
                visited[r] = [];
                for (let c = 0; c < this.numCells; c++) {
                    active[r][c] = false;
                    visited[r][c] = false;
                }
            }

            // mark the starting cell as active
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
                        visited[currRow][currCol] = true;
                        numActive--;

                        // mark all neighbors as active if they're inactive, not visited and part of the fillable area
                        for (let [nRow, nCol] of this.neighbors(currRow, currCol)) {
                            if (!active[nRow][nCol] && !visited[nRow][nCol] && this.grid[nRow][nCol] === targetColorId) {
                                active[nRow][nCol] = true;
                                numActive++;
                            }
                        }
                    }
                }
            }
        },
        neighbors(row, col) {
            let neighbors = [];
            for (let [newRow, newCol] of [[row, col - 1], [row, col + 1], [row + 1, col], [row - 1, col]]) {
                if (!(newRow < 0 || newRow >= this.numCells || newCol < 0 || newCol >= this.numCells)) {
                    neighbors.push([newRow, newCol]);
                }
            }
            return neighbors;
        },
        handleMouseDown(e) {
            this.penDown = true;
            this.mouseDown(e.offsetX, e.offsetY);
        },
        handleMouseUp() {
            this.penDown = false;
        },
        handleMouseMove(e) {
            if (this.penDown) {
                this.mouseDown(e.offsetX, e.offsetY);
            }
        },
        mouseDown(x, y) {
            let row = Math.floor(y / this.cellSize);
            let col = Math.floor(x / this.cellSize);
            if (this.paintBucketMode && this.penDown) {
                this.penDown = false;
                this.floodFill(row, col);
            } else {
                this.draw(row, col);
            }
            this.render();
        },
        render() {
            for (let row = 0; row < this.numCells; row++) {
                for (let col = 0; col < this.numCells; col++) {
                    let index = this.grid[row][col];
                    let color = this.palette[index];
                    let [r, g, b] = color;
                    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    this.ctx.fillRect(col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize);
                }
            }
            if (this.showGridLines) {
                this.ctx.strokeStyle = 'rgb(128, 128, 128)';
                this.ctx.lineWidth = 1;
                for (let rowCol = 1; rowCol < this.numCells; rowCol++) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, rowCol * this.cellSize);
                    this.ctx.lineTo(this.numCells * this.cellSize, rowCol * this.cellSize);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo(rowCol * this.cellSize, 0);
                    this.ctx.lineTo(rowCol * this.cellSize, this.numCells * this.cellSize);
                    this.ctx.stroke();
                }
            }
        },
        downloadImage() {
            let dataURL = this.$refs.canvas.toDataURL('image/png');
            window.open(dataURL);
        }
    }
}
</script>

<style scoped>
</style>
