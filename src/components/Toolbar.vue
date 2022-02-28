<template>
    <div>
        <input type="checkbox" v-model="paintBucketMode" @change="changePaintBucketMode" /> Paint Bucket
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
        }
    }
}
</script>

<style scoped>

</style>
