import Vue from 'vue';
import Router from 'vue-router';
import authenticationGuard from './guards/AuthenticationGuard';
import Login from '../components/Login/Login';
import Projeto from '../components/Projeto/Projeto';
import FaseComponent from '../components/IteracaoFase/FaseComponent';


Vue.use(Router);

// Agrupamento de todas as rotas
// Todas as rotas devem ser registradas com nome
// Estes nomes são utilizados no de/para com os itens de menu
const routes = [
  {
    path: '/',
    name: '/',
    component: Login,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Projeto,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/fase/:iteracaoFaseId',
    name: 'fase',
    component: FaseComponent,
    meta: {
      requiresAuth: true
    },
    props: true,
  },
];

const router = new Router({
  routes,
});

// em todas as rotas é verificado autenticação e autorização
router.beforeEach((to, from, next) => {
  // funções para mover o scroll para o inicio da tela
  window.scrollTo(0, 0);
  window.scrollTo({ x: 0, y: 0 });
  document.body.scrollTop = 0;
  authenticationGuard(to, from, next);
  // authorizationGuard(to, from, next);
});

export default router;
