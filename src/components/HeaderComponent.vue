<template>
    <header class="header py-2 mb-2">
        <div class="container d-flex justify-content-between align-items-center">
            <router-link to="/" class="header__logo">
                <img src="@/assets/logo-img.png" alt="logo" class="logo__img me-2">
                <img src="@/assets/logo-text.png" alt="logo" class="logo__img logo__img--small">
            </router-link>
            <nav class="navbar d-flex">
                <router-link active-class="navbar__link--active" to="/products" class="btn me-3" :class="{ 'navbar__link--active': $route.path.startsWith('/products') }">Каталог</router-link>
                <router-link active-class="navbar__link--active" to="/cart" class="btn">
                    <img src="@/assets/icons/cart.svg" alt="Cart" class="cart-icon" />
                </router-link>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header{
    background-color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 1020;    
    border: 1px solid #ddd;
}
.header__logo{
    font-size: 1.5rem;
    color: white;
    text-decoration: none;
}
.logo__img{
    height: 40px;
}
.logo__img--small{
    height: 20px;
}
.cart-icon {
  width: 30px;
  height: 30px;
  display: block;
}
.navbar__link--active{    
  background-color: var(--color-sub) !important;
}
@media (max-width: 576px){
    .logo__img--small{
        display: none;
    }
}
</style>