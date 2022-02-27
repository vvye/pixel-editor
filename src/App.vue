<template>
    <div id="app">
        <PaletteEditor />
        <PixelCanvas cell-size="50" num-cells="8" :selected-color="192" />
    </div>
</template>

<script>
import PixelCanvas from '@/components/PixelCanvas.vue'
import PaletteEditor from '@/components/PaletteEditor';

export default {
    name: 'App',
    components: {
        PixelCanvas,
        PaletteEditor
    }
}
</script>
