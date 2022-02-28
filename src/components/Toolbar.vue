<template>
    <div>
        <input type="checkbox" v-model="paintBucketMode" @change="changePaintBucketMode" /> Paint Bucket
        <button @click="clearCanvas">Clear</button>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Toolbar',
    data: function () {
        return {
            paintBucketMode: false
        }
    },
    methods: {
        changePaintBucketMode: function () {
            this.$emit('paintBucketModeChanged', this.paintBucketMode);
        },
        clearCanvas: function() {
            this.$emit('clearCanvasButtonPressed');
        }
    }
}
</script>

<style scoped>

</style>
