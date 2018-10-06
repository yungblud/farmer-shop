import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import FormContainer from 'containers/Form/FormContainer';

const FormPage = ({match}) => {
    if(match.path === "/login") {
        return (
            <PageTemplate>
                <FormContainer title="로그인"/>
            </PageTemplate>
        );
    }
    if(match.path === "/register") {
        return (
            <PageTemplate>
                <FormContainer title="회원가입"/>
            </PageTemplate>
        );
    }
    if(match.path === "/admin") {
        return (
            <PageTemplate>
                <FormContainer title="관리자 로그인"/>
            </PageTemplate>
        );
    }
    
    
};

export default FormPage;