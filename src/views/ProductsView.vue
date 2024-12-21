<template>
    <div class="container">
        <h1 class="title mb-2">Каталог товаров</h1>

        <div v-if="isLoading" class="loading-container">
            <div class="spinner"></div>
        </div>

        <div v-else class="row">
            <product-card
                v-for="product in products"
                :key="product.id"
                :product="product"
                :exchangeRate="exchangeRate"
            />
        </div>
    </div>
</template>

<script>
import ProductCard from "@/components/ProductCard.vue";

export default {
    components: { ProductCard },
    data() {
        return {
            products: [],
            isLoading: false,
            exchangeRate: 0,
        };
    },
    methods: {
        loadData() {
            this.isLoading = true;
            Promise.all([
                fetch("https://fakestoreapi.com/products"),
                fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            ])
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            })
            .then(([products, exchangeRateData]) => {
                this.products = products;
                this.exchangeRate = exchangeRateData.Valute.USD.Value;
            })
            .catch(error => {
                console.error("Ошибка загрузки данных:", error);
            })
            .finally(() => {
                this.isLoading = false;
            });
        }
    },
    mounted() {
        this.loadData();
    },
};
</script>

<style scoped>
    .loading-container {
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
</style>
