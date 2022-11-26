<template>
    <div class="spin"></div>
</template>

<script>
export default {};
</script>

<style>
.spin {
    display: block;
    width: 40px;
    height: 40px;
    margin: 30px auto;
    border: 3px solid transparent;
    border-radius: 50%;
    border-top-color: #011627;
    animation: spin 0.7s ease infinite;
}

@keyframes spin {
    to {
        transform: rotateZ(360deg);
    }
}
</style>