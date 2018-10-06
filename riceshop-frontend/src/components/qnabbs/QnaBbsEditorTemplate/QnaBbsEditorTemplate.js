import React from 'react';
import styles from './QnaBbsEditorTemplate.scss';
import classNames from 'classnames/bind';
import QnaBbsEditor from 'components/qnabbs/QnaBbsEditor';

const cx = classNames.bind(styles);

const QnaBbsEditorTemplate = ({children}) => (
  <div className={cx('template')}>
  {children}
  </div>
);

export default QnaBbsEditorTemplate;