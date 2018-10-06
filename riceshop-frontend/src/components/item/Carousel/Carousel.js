import React from 'react';
import styles from './Carousel.scss';
import classNames from 'classnames/bind';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const cx = classNames.bind(styles);

const CarouselComponent = ({visible}) => (
  <div className={cx('Carousel')}>
    <Carousel 
      autoPlay
      showThumbs={false}
      emulateTouch>
    <div className={cx('ImageWrapper')}>
      <img 
        src="https://images.unsplash.com/photo-1519897831810-a9a01aceccd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c306f9f10164d119a9c34ebb238534de&auto=format&fit=crop&w=2389&q=80"
        alt="" />
    </div>
    <div className={cx('ImageWrapper')}>
      <img 
        src="https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=de62c5d9d4073830d12d31f5cc1564c5&auto=format&fit=crop&w=668&q=80" 
        alt=""/>
    </div>
  </Carousel>
  </div>
);

export default CarouselComponent;