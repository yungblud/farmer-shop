import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
    ListPage,
    NotFoundPage,
    FormPage,
    EditorPage,
    CartPage,
    PaymentPage,
    PostPage,
    ItemPage,
    CheckoutPage,
    AdminCheckoutDetail,
    AdminHomePage,
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
import Base from 'containers/Base/Base';
import { Helmet } from 'react-helmet';

const App = () => {
    return (
        <div>
            <Helmet>
                <title>쌀 쇼핑몰</title>
            </Helmet>
            <Switch>
                <Route exact path="/" component={ItemPage} />
                <Route path="/login" component={FormPage} />
                <Route path="/register" component={FormPage} />
                <Route exact path="/admin" component={FormPage} />
                <Route exact path="/admin/list" component={CheckoutPage} />
                <Route exact path="/admin/main" component={AdminHomePage} />
                <Route exact path="/admin/category" component={CategoryEditPage} />
                <Route path="/admin/list/:id" component={AdminCheckoutDetail} />
                <Route exact path="/editor" component={EditorPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/payment" component={PaymentPage} />
                <Route exact path="/post/:id" component={PostPage} />
                <Route path="/post/after/:itemId/:afterId" component={AfterDetailPage} />
                <Route exact path="/item" component={ListPage} />
                <Route path="/item/:category" component={CategoryPage} />
                <Route exact path="/checkout" component={CheckoutListPage} />
                <Route path="/checkout/:id" component={CheckoutDetailPage} />
                <Route path="/member" component={MemberSettingPage} />
                <Route exact path="/find" component={FindMemberPage} />
                <Route path="/find/success" component={MailSendingSuccess} />                
                <Route exact path="/qna" component={QnABbsPage} />
                <Route exact path="/qna/:page" component={QnABbsPage} />
                <Route path="/qna/detail/:id" component={QnaBbsDetailPage} />
                <Route exact path="/editor/qna" component={QnaBbsEditorPage} />
                <Route exact path="/editor/after" component={AfterEditorPage} />
                <Route path="/editor/qna/admin" component={QnaBbsAnswerPage} />
                <Route component={NotFoundPage} />
            </Switch>
            <Base />
        </div>
    );
};

export default App;