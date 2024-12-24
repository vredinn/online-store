<template>
    <div class="container">
        <h1 class="title mb-2">Корзина</h1>
        <div v-if="cart.length <= 0">            
            <p>В вашей корзине нет товаров.</p>
        </div>
        <div v-else>
            <div v-if="!isLoading">
                <div v-for="(product, index) in products" :key="product.id" class="row mb-3 cart__item">
                    <div class="col-md-3">
                        <img :src="product.image" alt="product" class="cart__item-image" />
                    </div>
                    <div class="col-md-6">
                        <router-link :to="'/product/' + product.id" class="cart__item-title mb-4">
                            {{ product.title }}
                        </router-link>
                        <p class="cart__item-text mb-2">Категория: <strong>{{ product.category }}</strong></p>
                        <p class="cart__item-text mb-4">{{ product.description.substring(0, 100) }}...</p>
                        <p class="cart__item-price mb-2">Цена: <strong>{{ convertPriceToRUB(product.price) }} руб.</strong></p>
                        <div class="d-flex align-items-center">
                            <label for="quantity" class="me-2">Количество:</label>
                            <button
                                class="btn btn--square"
                                @click="decreaseQuantity(index)"
                                :class="{'disabled' : product.quantity === 1}"
                                :disabled="product.quantity === 1">
                                -
                            </button>
                            <span class="mx-2">{{ product.quantity }}</span>
                            <button
                                class="btn btn--square"
                                @click="increaseQuantity(index)">
                                +
                            </button>
                        </div>
                        <p class="cart__item-price mt-2 mb-2">
                            Итоговая цена:
                            <strong>{{ convertPriceToRUB(product.price * product.quantity) }} руб.</strong>
                        </p>
                    </div>
                    <div class="col-md-3">
                        <button class="btn btn--red" @click="removeFromCart(index)">Удалить</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-4">
                        <p class="cart__item-price">Итого: <strong>{{ convertPriceToRUB(totalPrice) }} руб.</strong></p>
                        <p class="cart__item-price">Общее количество товаров: <strong>{{ totalQuantity }}</strong></p>
                    </div>
                    <div class="col-md-6">     
                        <button class="btn btn--w100" @click="toggleModal">
                            Заказать
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="spinner__container">
                <div class="spinner"></div>
            </div>
        </div>
    </div>

    <div v-if="isModalVisible" class="modal__container" @click="toggleModal">
        <div class="modal__content" @click.stop>
            <p class="modal__title mb-4">Ваш заказ оформлен</p>
            <p class="modal__body">
                Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время для уточнения деталей.
            </p>
            <button type="button" class="btn btn--w100" @click="toggleModal">Закрыть</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cart: JSON.parse(localStorage.getItem("cart")) || [],
            products: [],
            isLoading: true,
            isModalVisible: false,
        };
    },
    computed: {
        totalPrice() {
            return this.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },
        totalQuantity() {
            return this.products.reduce((sum, item) => sum + item.quantity, 0);
        },
    },
    methods: {
        convertPriceToRUB(priceInUSD) {
            return (priceInUSD * this.exchangeRate).toFixed(2);
        },
        removeFromCart(index) {
            this.cart.splice(index, 1);
            this.products.splice(index, 1);
            this.updateCart();
        },
        increaseQuantity(index) {
            this.cart[index].quantity++;
            this.products[index].quantity++;
            this.updateCart();
        },
        decreaseQuantity(index) {
            if (this.cart[index].quantity > 1) {
                this.cart[index].quantity--;
                this.products[index].quantity--;
                this.updateCart();
            }
        },
        updateCart() {
            localStorage.setItem("cart", JSON.stringify(this.cart));
            window.dispatchEvent(new Event("cartUpdate"));
        },
        toggleModal() {
            this.isModalVisible = !this.isModalVisible;
        },
        loadData() {
            this.isLoading = true;
            let data = [];
            Promise.all([
                ...this.cart.map(cartItem => 
                    fetch(`https://fakestoreapi.com/products/${cartItem.id}`)
                        .then(response => response.json())
                        .then(productData => {
                            data.push({ ...productData, quantity: cartItem.quantity });
                        })
                        .catch(error => {
                            console.error("Ошибка загрузки продукта:", error.message);
                        })
                ),
                fetch("https://www.cbr-xml-daily.ru/daily_json.js")
                    .then(response => response.json())
                    .then(exchangeRateData => {
                        this.exchangeRate = exchangeRateData.Valute.USD.Value;
                    })
                    .catch(error => {
                        console.error("Ошибка загрузки данных о валюте:", error.message);
                    })
            ])
                .then(() => {
                    this.products = data;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },
    mounted() {
        if (this.cart.length > 0) this.loadData();
    },
};
</script>

<style scoped>
.modal__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050;
}
.modal__content {
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
}
.modal__title{
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0;
}
.cart__item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding:12px 0;
    display: flex;
    align-items: center;
}
.cart__item-title{
    font-size: 1.25rem;
    color: var(--color-main);
    transition: all .3s ease-in-out;
}
.cart__item-title:hover{
    color: var(--color-main-dark);
}
.cart__item-text {
    font-size: 1rem;
    color: var(--color-text);
}
.cart__item-price {
    font-size: 1.15rem;
    line-height: normal;
    margin-bottom: 0;
}
.cart__item-image {
    width: 100%;
    height: auto;
    object-fit: contain;
}
</style>
