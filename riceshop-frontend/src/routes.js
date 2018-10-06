import {
  CartPage,
  EditorPage,
  FormPage,
  ListPage,
  PaymentPage,
  PostPage,
  ItemPage,
  CheckoutPage,
  AdminHomePage,
  AdminCheckoutDetail,
  CheckoutListPage,
  CheckoutDetailPage,
  MemberSettingPage,
  FindMemberPage,
  QnABbsPage,
  QnaBbsDetailPage,
  QnaBbsEditorPage,
  QnaBbsAnswerPage,
  AfterEditorPage,
  AfterDetailPage,
  MailSendingSuccess,
  CategoryEditPage,
  CategoryPage
} from 'pages';

export default [{
    path: '/',
    exact: true,
    component: ItemPage
  },
  {
    path: '/login',
    component: FormPage
  },
  {
    path: '/register',
    component: FormPage
  },
  {
    path: '/admin',
    exact: true,
    component: FormPage
  },
  {
    path: '/admin/list',
    exact: true,
    component: CheckoutPage
  },
  {
    path: '/admin/main',
    exact: true,
    component: AdminHomePage
  },
  {
    path: '/admin/category',
    exact: true,
    component: CategoryEditPage
  },
  {
    path: '/admin/list/:id',
    component: AdminCheckoutDetail
  },
  {
    path: '/editor',
    exact: true,
    component: EditorPage
  },
  {
    path: '/cart',
    component: CartPage
  },
  {
    path: '/payment',
    component: PaymentPage
  },
  {
    path: '/post/:id',
    exact: true,
    component: PostPage
  },
  {
    path: '/post/after/:itemId/:afterId',
    component: AfterDetailPage
  },
  {
    path: '/item',
    exact: true,
    component: ListPage
  },
  {
    path: '/item/:category',
    component: CategoryPage
  },
  {
    path: '/checkout',
    exact: true,
    component: CheckoutListPage
  },
  {
    path: '/checkout/:id',
    component: CheckoutDetailPage
  },
  {
    path: '/member/:id',
    component: MemberSettingPage
  },
  {
    path: '/find',
    exact: true,
    component: FindMemberPage
  },
  {
    path: '/find/success',
    component: MailSendingSuccess
  },
  {
    path: '/qna',
    exact: true,
    component: QnABbsPage
  },
  {
    path: '/qna/:id',
    exact: true,
    component: QnABbsPage
  },
  {
    path: '/qna/detail/:id',
    component: QnaBbsDetailPage
  },
  {
    path: 'editor/qna',
    exact: true,
    component: QnaBbsEditorPage
  },
  {
    path: 'editor/after',
    exact: true,
    component: AfterEditorPage
  },
  {
    path: 'editor/qna/admin',
    component: QnaBbsAnswerPage
  }
];