import { createRouter, createWebHistory } from 'vue-router';
import { checkUserRole } from './guards/checkUserRole';
import { fetchUserData } from './guards/fetchUserData';
import { requiresAuth } from './guards/requiresAuth';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(() => window.scrollTo({ left: 0, top: 0 }));
router.beforeEach(fetchUserData);
router.beforeEach(requiresAuth);
router.beforeEach(checkUserRole);

export default router;
