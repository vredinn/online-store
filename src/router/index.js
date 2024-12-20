import { createRouter, createWebHistory } from 'vue-router';
import ProductsView from '../views/ProductsView.vue';
import ProductDetailsView from '../views/ProductDetailsView.vue';
import CartView from '../views/CartView.vue';

const routes = [
  {
    path: '/',
    redirect: '/products',
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: ProductDetailsView,
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
