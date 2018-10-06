import React from 'react';
import styles from './AdminPageTemplate.scss';
import classNames from 'classnames/bind';
import AdminHeaderContainer from 'containers/Admin/AdminHeaderContainer';

const cx = classNames.bind(styles);

const AdminPageTemplate = ({children}) => (
  <div className={cx('admin-page-template')}>
    <AdminHeaderContainer/>
    <main>
      {children}
    </main>
  </div>
);

export default AdminPageTemplate;