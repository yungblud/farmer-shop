import React from 'react';
import styles from './AfterEditor.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AfterEditor = ({id, onChangeInput, title, content, onWrite}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
  return (
    <div className={cx('editor')}>
      <div className={cx('editor-label')}>
        제목 
      </div>
      <div className={cx('editor-content')}>
        <input type="text" value={title} onChange={handleChange} name="title" className={cx('input-title')}/>
      </div>
      <div className={cx('editor-label')}>
        내용
      </div>
      <div className={cx('editor-content')}>
        <textarea className={cx('input-content')} value={content} onChange={handleChange} name="content"/>
      </div>
      <div className={cx('button-wrapper')}>
        <div className={cx('button')} onClick={onWrite}>
          작성하기
        </div>
      </div>
    </div>
  );
}

export default AfterEditor;