<template>
    <div>
        <PaletteEntry v-for="(color, index) in this.palette" :key="index"
                      :color="color" :selected="this.selectedColorIndex === index"
                      @click="selectColor(index)" />
    </div>
</template>

<script>
import PaletteEntry from '@/components/PaletteEntry';

export default {
    name: 'PaletteEditor',
    components: {
        PaletteEntry
    },
    data: function () {
        return {
            selectedColorIndex: 0
        }
    },
    props: {
        palette: Array
    },
    methods: {
        selectColor: function (index) {
            this.selectedColorIndex = index;
            this.$emit('selectColorIndex', index);
        }
    }
}
</script>

<style scoped>
div {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}
</style>
