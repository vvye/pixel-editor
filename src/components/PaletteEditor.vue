<template>
    <div>
        <div class="palette-container">
            <PaletteEntry v-for="(color, id) in this.palette" :key="id"
                          :color="color" :selected="this.currentColorId === id"
                          @click="selectColor(id)" />
        </div>
        <label class="button" v-if="this.currentColorId !== 30">
            <input type="color" :value="this.selectedColorAsHex" @input="changeSelectedColor"> Edit selected color
        </label>
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
            let color = this.palette[this.currentColorId].slice(0, 3);
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
            let newColor = [r, g, b, 255];
            this.$emit('colorChanged', this.currentColorId, newColor);
        }
    }
}
</script>

<style scoped>
.palette-container {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    background-color: #151d23;
    border-radius: 0.25rem;
    box-shadow: inset 0 0.25rem 0 #0e151a;
    overflow: hidden;
}

input[type="color"] {
    margin-right: 1rem;
    width: 2rem;
    height: 2rem;
    border: none;
    background: none;
}

label {
    display: inline-flex;
    align-items: center;
}

</style>
