<template>
    <div>
        <PaletteEntry v-for="(color, id) in this.palette" :key="id"
                      :color="color" :selected="this.currentColorId === id"
                      @click="selectColor(id)" />
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
    data() {
        return {
            currentColorId: 0
        }
    },
    props: {
        palette: Array
    },
    computed: {
        selectedColorAsHex() {
            let color = this.palette[this.currentColorId];
            return '#' + color.map(n => n.toString(16).padStart(2, '0')).join('');
        }
    },
    methods: {
        selectColor(id) {
            this.currentColorId = id;
            this.$emit('currentColorIdChanged', id);
        },
        changeSelectedColor(e) {
            let newColorHex = e.target.value;
            let r = parseInt(newColorHex.substring(1, 3), 16);
            let g = parseInt(newColorHex.substring(3, 5), 16);
            let b = parseInt(newColorHex.substring(5, 7), 16);
            let newColor = [r, g, b];
            this.$emit('colorChanged', this.currentColorId, newColor);
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
