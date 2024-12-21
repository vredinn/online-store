<template>
    <div v-if="isPopupVisible" class="popup-notification">
        Товар добавлен в корзину!
    </div>
    <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div @click.stop="$router.push(`/product/${product.id}`)" class="card h-100">
            <div class="image-container mb-1">
                <img :src="product.image" class="card__img" :alt="product.title" />
            </div>
            
            <p class="card__price">
                {{ convertPriceToRUB(product.price) }} руб.
            </p>
            <p class="card__title">{{ product.title }}</p>
            
            <p class="card__text"><strong>Категория:</strong> {{ product.category }}</p>

            <div class="product-rating">
                <div class="star__container d-inline" :style="{
                    'background': 'linear-gradient(to right, gold ' + Math.round(product.rating.rate / 5 * 100) + '%, #cccccc ' + Math.round(product.rating.rate / 5 * 100) + '%)',
                    'background-clip': 'text'}">
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                    <span class="star">★</span>
                </div>
                <span class="rating-count">({{ product.rating.rate }})</span>
            </div>
    
            <button class="btn mt-auto" @click.stop="addToCart()">
                Добавить в корзину
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: Object,
        exchangeRate: Number
    },
    data() {
        return {    
            isPopupVisible: false
        }
    },
    methods: {
        convertPriceToRUB(priceInUSD) {
            return (priceInUSD * this.exchangeRate).toFixed(2);
        },
        addToCart() {
            this.showPopup();
        },  
        showPopup() {
            this.isPopupVisible = true;
            setTimeout(() => {
                this.isPopupVisible = false;
            }, 3000);
        },
    },
};
</script>

<style scoped>

.card {
    display: flex;
    flex-direction: column;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    padding: 15px;
    text-decoration: none;
    color: var(--color-text);
    transition: all .3s ease-in-out;
}

.card:hover {
    box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .25);
    transform: translateY(-5px);
    cursor: pointer;
}

.card:hover .card__img {
    transform: scale(1.1) translateY(-5px);
}

.card__title {
    font-size: 1.15rem;
    font-weight: bold;
    line-height: normal;
    margin-bottom: 0;
}

.card__text {
    font-style: 1rem;
    line-height: normal;
    margin-bottom: 0;
}

.card__price {
    color: var(--color-main);
    font-size: 1.15rem;
    line-height: normal;
    margin-bottom: 0;
}

.image-container {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.card__img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    transition: .3s all ease-in-out;
}

.product-rating {
    display: flex;
    align-items: center;
}

.star__container {
    color: transparent;
}

.star {
    font-size: 1.5rem;
    margin-right: 2px;
}

.rating-count {
    font-size: .75rem;
    color: #888;
    margin-left: 5px;
}
</style>
