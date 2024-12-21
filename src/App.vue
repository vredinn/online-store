<template>
    <HeaderComponent />
    <router-view/>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue';

export default {
    components: {
        HeaderComponent,
    }
};
</script>

<style>
#app {
    font-family: "Nunito", sans-serif;
    --color-text: #0b1c2c;
    --color-text-sub: #cccccc;
    --color-main: #4a54af;  
    --color-main-dark: #133e72;  
    --color-sub: #3c884e;
    color: var(--color-text);
}

p {
    margin: 0;
}

.title {
    font-size: 2rem;
}

.btn {
    position: relative;
    font-size: 1rem;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-main);
    text-decoration: none;
    color: #fff;
    height: 40px; 
}

.btn:hover {
    color: #fff;
    background-color: var(--color-main-dark);
}
</style>
