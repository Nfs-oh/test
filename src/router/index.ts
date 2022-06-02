import ErrorPage from '@/views/error-page/404';
import Wogoo from '@/views/wogoo';
import NewVersion from '@/views/wogoo/index-newVersion';
import dataCenter from '@/views/data-center';
import WogooRanking50 from '@/views/wogoo-ranking';
import MemberShip from '@/views/membership';

const routes = [
  {
    path: '*',
    component: ErrorPage,
    exact: true
  }
];

const asyncRoutes = [
  {
    path: '/wogoo/:id',
    component: Wogoo,
    exact: true
  },
  {
    path: '/data-center',
    component: dataCenter,
    name: 'dataCenter'
  },
  {
    path: '/wogoo/:type/:id',
    component: NewVersion,
    exact: true
  },
  {
    path: '/ranking50',
    component: WogooRanking50,
    exact: true
  },
  {
    path: '/membership',
    component: MemberShip,
    exact: true
  }
];

export { routes, asyncRoutes };
