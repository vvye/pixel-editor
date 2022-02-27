<template>
    <div>
        <PaletteEntry v-for="(color, index) in this.palette" :key="index"
                      :color="color" :selected="this.selectedColorIndex === index"
                      @click="selectColor(index)" />
        <input type="color" :value="this.selectedColorAsHex" @change="changeSelectedColor" />
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
    computed: {
        selectedColorAsHex: function () {
            let color = this.palette[this.selectedColorIndex];
            return '#' + color.map(n => n.toString(16).padStart(2, '0')).join('');
        }
    },
    methods: {
        selectColor: function (index) {
            this.selectedColorIndex = index;
            this.$emit('selectColorIndex', index);
        },
        changeSelectedColor: function (e) {
            let newColorHex = e.target.value;
            let r = parseInt(newColorHex.substring(1, 3), 16);
            let g = parseInt(newColorHex.substring(3, 5), 16);
            let b = parseInt(newColorHex.substring(5, 7), 16);
            let newColor = [r, g, b];
            this.$emit('colorChanged', this.selectedColorIndex, newColor);
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
