const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    publicPath: '',
    transpileDependencies: true,
    pages: {
        index: {
            entry: 'src/main.js',
            title: 'Pixel Editor 🎨',
        },
    }
})
