<template>
<div>
    <a href="https://www.github.com/vvye/pixel-editor">github.com/vvye/pixel-editor</a>
    &bull;
    <a href="https://www.eric-kaiser.net">eric-kaiser.net</a>
</div>
</template>

<script>
export default {
    name: 'AppInfo'
}
</script>

<style scoped>

div {
    margin-top: 4rem;
    display: flex;
    justify-content: space-evenly;
}

a:link, a:visited {
    color: #7eaef9;
    transition: all 0.05s;
}

a:hover, a:active {
    color: #a3c9ff;
    background-color: #7eaef940;
    text-shadow: none;
}

</style>
