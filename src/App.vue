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
  --color-text-sub : #949494;
  --color-main: #4a54af;  
  --color-main-dark: #3f4793;  
  --color-sub: #3c884e;
  color: var(--color-text);
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

.btn:hover{
  color: #fff;
  background-color: var(--color-main-dark);
  box-shadow: 0 5px 15px -15px rgba(0, 0, 0, .25);
  transform: translateY(-2px);
}

</style>
