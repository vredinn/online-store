<template>
    <div class="container">
        <h1 class="title mb-2">Каталог товаров</h1>

        <div v-if="isLoading" class="spinner__container">
            <div class="spinner"></div>
        </div>

        <div v-else>
            <div class="filter row mb-4 g-2">
                <div class="col-md-2 order-md-1 order-2">
                    <select v-model="selectedCategory" class="select">
                        <option class="select__option" value="">Все категории</option>
                        <option class="select__option" v-for="category in categories" :key="category" :value="category">
                            {{ category }}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-10 order-md-2 order-1">
                    <div class="d-flex">
                        <input
                            type="text"
                            v-model="searchQuery"
                            class="search-field"
                            placeholder="Поиск по названию..."
                        />
                    </div>
                </div>
            </div>

            <div class="row">
                <product-card
                    v-for="product in paginatedProducts"
                    :key="product.id"
                    :product="product"
                    :exchangeRate="exchangeRate"
                />
            </div>
            <div class="pagination d-flex justify-content-center mb-4">
                <button
                    class="btn btn--pagination-left"
                    :disabled="currentPage === 1"
                    :class="{'disabled' : currentPage === 1}"
                    @click="changePage(currentPage - 1)"
                ></button>
                <button
                    class="btn"
                    v-for="page in totalPages"
                    :key="page"
                    :class="{ active: currentPage === page }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </button>
                <button
                    class="btn btn--pagination-right"
                    :class="{'disabled' : currentPage === totalPages}"
                    :disabled="currentPage === totalPages"
                    @click="changePage(currentPage + 1)"
                ></button>
            </div>
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
            categories: [],
            selectedCategory: "",
            searchQuery: "",
            isLoading: false,
            exchangeRate: 0,
            currentPage: parseInt(this.$route.params.page),
            itemsPerPage: 10
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter(
                (product) =>
                    (!this.selectedCategory || product.category === this.selectedCategory) &&
                    (!this.searchQuery || product.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            );
        },
        paginatedProducts() {
            const start = (this.currentPage - 1) * 10;
            return this.filteredProducts.slice(start, start + 10);
        },
        totalPages() {
            return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
        },
    },
    methods: {
        loadData() {
            this.isLoading = true;
            Promise.all([
                fetch("https://fakestoreapi.com/products"),
                fetch("https://fakestoreapi.com/products/categories"),
                fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            ])
            .then(responses => {
                return Promise.all(responses.map(response => response.json()));
            })
            .then(([products, categories, exchangeRateData]) => {
                this.products = products;
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
        
        changePage(page) {
            this.$router.push({ path: `/products/${page}` });
            this.currentPage = page;
        },
    },
    mounted() {
        this.loadData();
    },
    watch: {
        searchQuery() {
            this.changePage(1);
        },
        selectedCategory() {
            this.changePage(1);
        },
    },
};
</script>

<style scoped>
.select,
.search-field {
    font-size: 1rem;
    width: 100%;
    height: 40px;
    border-radius: 8px;
    border: 2px solid var(--color-main);
    outline: none;
}

.select {
    color: var(--color-main);
    font-weight: bold;
}
.select__option{
    font-size: 1rem;
    color: var(--color-text)
}
.pagination{
    gap:12px;
    flex-wrap: wrap;
}
.btn--pagination-left::before{
    content: "Предыдущая";
}
.btn--pagination-right::before{
    content: "Следующая";
}
@media (max-width: 768px) {
    .btn--pagination-left::before{
        content: "<";
    }
    .btn--pagination-right::before{
        content: ">";
    }
}
.active {
    background-color: var(--color-sub);
    cursor: default;
}
.disabled {
    background-color: #fff;
    color: var(--color-text-sub);
    border: 2px solid var(--color-main);
    cursor: default;
}
</style>
