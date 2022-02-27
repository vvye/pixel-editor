<template>
    <div id="app">
        <PixelCanvas cell-size="50" num-cells="8" />
    </div>
</template>

<script>
import PixelCanvas from './components/PixelCanvas.vue'

export default {
    name: 'App',
    components: {
        PixelCanvas
    }
}
</script>
