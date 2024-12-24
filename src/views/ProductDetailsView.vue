<template>    
    <div v-if="isPopupVisible" class="popup-notification">
        Товар добавлен в корзину!
    </div>
    <div class="container my-4">
        <div v-if="isLoading" class="spinner__container">
            <div class="spinner"></div>
        </div>
        <div v-else-if="product">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="product__img-container">
                        <img :src="product.image" class="product__img" alt="Product image" />
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <h1 class="title mb-2">{{ product.title }}</h1>
                    <p class="product__text-title">Цена</p>
                    <p class="product__price mb-2">{{ convertPriceToRUB(product.price) }} руб.</p>
                    <p class="product__text-title">Категория</p>
                    <p class="product__text mb-2">{{ product.category }}</p>
                    <p class="product__text-title">Описание</p>
                    <p class="product__text mb-2">{{ product.description }}</p>                    
                    <p class="product__text-title">Оценка:</p>
                    <div class="product-rating">
                        <div class="star__container" :style="{
                            'background': 'linear-gradient(to right, gold ' + Math.round(product.rating.rate / 5 * 100) + '%, #cccccc ' + Math.round(product.rating.rate / 5 * 100) + '%)',
                            'background-clip': 'text'}">
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                        </div>
                        <span class="product__text">{{ product.rating.rate }} ( {{ product.rating.count }} оценок)</span>
                    </div>                    
                    <div class="btn__container">            
                        <div class="col-12 d-flex justify-content-center">
                            <button class="btn btn-center" @click="addToCart(product)">
                                Добавить в корзину
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Товар не найден.</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: null,
            isLoading: true,
            exchangeRate: 0,
            isPopupVisible: false
        };
    },
    methods: {
        loadData() {
            this.isLoading = true;
            const productId = this.$route.params.id;
            Promise.all([
                fetch(`https://fakestoreapi.com/products/${productId}`),
                fetch("https://fakestoreapi.com/products/categories"),
                fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            ])
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            })
            .then(([product, categories, exchangeRateData]) => {
                this.product = product;
                this.categories = categories;
                this.exchangeRate = exchangeRateData.Valute.USD.Value;
            })
            .catch(error => {
                console.error("Ошибка загрузки данных:", error);
            })
            .finally(() => {
                this.isLoading = false;
            });
        },
        convertPriceToRUB(priceInUSD) {
            return (priceInUSD * this.exchangeRate).toFixed(2);
        },
        addToCart(product) {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const productInCart = cart.find((item) => item.id === product.id);

            if (productInCart) {
                productInCart.quantity++;
            } else {
                cart.push({
                    id: product.id,
                    quantity: 1,
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            window.dispatchEvent(new Event("cartUpdate"));
            this.showPopup();
        },
        showPopup() {
            this.isPopupVisible = true;
            setTimeout(() => {
                this.isPopupVisible = false;
            }, 3000);
        }
    },
    mounted() {
        this.loadData();
    }
};
</script>

<style scoped>
.product-rating {
    display: inline-flex;
    align-items: center;
}
.product__text-title{
    color: var(--color-main);
    font-size: 1.15rem;
    margin-bottom: 0;
    font-weight: bold;
}
.product__text{
    margin-bottom: 0;
    font-size: 1rem;
}
.product__price {
    font-size: 1.25rem;
    line-height: normal;
    margin-bottom: 0;
}
.star__container {
    display: inline;
    color: transparent;
}
.star {
    font-size: 1.5rem;
    margin-right: 2px;
}
.product__img-container{
    border-radius: 8px;
    background-color: #ffffff;
    padding: 5px;
    border: 1px solid #ddd;
}
.product__img {
    max-width: 100%;
    height: auto;
}
</style>
