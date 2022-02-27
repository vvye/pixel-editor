<template>
    <div id="app">
        <section class="main-section">
            <h1>Hello World!</h1>
            <PixelCanvas />
        </section>
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
