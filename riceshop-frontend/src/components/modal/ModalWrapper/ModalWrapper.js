import React, { Component } from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class ModalWrapper extends Component {
  state = {
    animate: false
  }
  startAnimation = () => {
    // animate 값을 true 로 설정 후
    this.setState({
      animate: true
    });
    // 250ms 이후 다시 false 로 설정
    setTimeout(() => {
      this.setState({
        animate: false
      });
    }, 250)
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.visible !== this.props.visible) {
      this.startAnimation();
    }
  }
  render() {
    const { children, visible, hideModal } = this.props;
    const { animate } = this.state;
    if(!visible && !animate) return null;

    const animation = animate && (visible ? 'enter' : 'leave');
    
    return (
      <div>
        <div className={cx('gray-background', animation)} onClick={hideModal}/>
        <div className={cx('modal-wrapper')}>
          <div className={cx('modal', animation)}>
            { children } 
          </div>
        </div>
      </div>
    );
  }
}

export default ModalWrapper;