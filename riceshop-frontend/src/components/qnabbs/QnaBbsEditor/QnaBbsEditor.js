import React from 'react';
import styles from './QnaBbsEditor.scss';
import classNames from 'classnames/bind';
import EmptyCheckBox from 'react-icons/lib/md/check-box-outline-blank';
import CheckedBox from 'react-icons/lib/md/check-box';

const cx = classNames.bind(styles);

const QnaBbsEditor = ({onChangeInput, title, content, onWrite, onUpdate, isUpdate, isAdminUpdate, adminLogged, onUpdateAnswer, showModal}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChangeInput({name, value});
  }
  return (
    <div className={cx('editor')}>
      <div className={cx('label')}>
        제목
      </div>
      <div className={cx('title-input')}>
        <input type="text" value={title} name="title" onChange={handleChange} className={cx('input-title')}/>
      </div>
      <div className={cx('label')}>
        질문 내용
      </div>
      <div className={cx('content-input')}>
        <textarea name="content" value={content} onChange={handleChange} className={cx('input-content')}>
        </textarea>
      </div>
      
      <div className={cx('button-wrapper')}>
        {
          (isUpdate) ? 
          <div className={cx('write-button')} onClick={onUpdate}>
            수정하기
          </div>
          :
          !adminLogged &&
          <div className={cx('write-button')} onClick={showModal}>
            작성하기
          </div>
        }
        {
          (isAdminUpdate) ?
          <div className={cx('write-button')} onClick={onUpdateAnswer}>
            수정하기
          </div>
          :
          adminLogged && 
          <div className={cx('write-button')} onClick={onWrite}>
            작성하기
          </div>
        }
      </div>
    </div>
  );
}

export default QnaBbsEditor;