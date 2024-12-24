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
    --color-sub: #3c8867;
    --color-red: #ac5c5c; 
    --color-red-dark: #853e3e; 
    color: var(--color-text);
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
    padding: 0 10px;
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
.btn--w100{
    width: 100%;
}
.btn--red{
    background-color: var(--color-red);
    width: 100%;
}
.btn--red:hover{
    background-color: var(--color-red-dark);
}
.btn--square{
    width: 40px;
    padding: 0;
}
.active {
    background-color: var(--color-sub) !important;
    cursor: default !important;
}
.disabled  {
    background-color: #fff !important;
    color: var(--color-text-sub) !important;
    box-shadow: inset 0 0 0 2px var(--color-main);
    cursor: default !important;
}
.btn__container{
    padding: 10px;
    position: sticky;
    bottom: 0;
    z-index: 1020;    
}
.spinner__container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
}
.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid var(--color-text-sub);
    border-top: 5px solid var(--color-main);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.popup-notification {
    position: fixed;
    width: fit-content !important;
    top: 60px;
    right: 20px;
    background: var(--color-sub);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1rem;
    z-index: 9999;
    animation: fadeInOut 3s forwards;
    opacity: 1;
}

@keyframes fadeInOut {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    10% {
        opacity: 1;
        transform: translateY(0);
    }
    90% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-10px);
    }
}
</style>
