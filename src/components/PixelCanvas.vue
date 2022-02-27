<template>
    <canvas ref="pixelCanvas" width="400" height="400"></canvas>
</template>

<script>
export default {
    name: 'PixelCanvas',
    props: {
    },
    data: function () {
        return {
            ctx: null,
            grid: []
        }
    },
    mounted: function () {
        this.ctx = this.$refs.pixelCanvas.getContext('2d');
        this.ctx.fillStyle = 'rgb(200, 0, 0)';
        this.ctx.fillRect(10, 10, 50, 50);
    }
}
</script>

<style scoped>
canvas {
    border: 1px solid;
}
</style>
