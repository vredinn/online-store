<template>
    <header class="header text-white py-2">
        <div class="container header__container d-flex justify-content-between align-items-center">
            <router-link to="/" class="header__logo">Магазин</router-link>
            <nav class="navbar d-flex">
                <router-link active-class="navbar__link--active" to="/products" class="btn me-3">Каталог</router-link>
                <router-link active-class="navbar__link--active" to="/cart" class="btn">
                    <img src="@/assets/icons/cart.svg" alt="Cart" class="cart-icon" />
                </router-link>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header{
    background-color: #404040;
    position: sticky;
    top: 0;
    z-index: 1020;
}
.header__logo{
    font-size: 2rem;
    color: white;
    text-decoration: none;
}
.cart-icon {
  width: 30px;
  height: 30px;
  display: block;
}
.navbar__link--active{    
  background-color: var(--color-sub);
}
</style>