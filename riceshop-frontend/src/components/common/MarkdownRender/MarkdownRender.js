import React, { Component } from 'react';
import styles from './MarkdownRender.scss';
import classNames from 'classnames/bind';
import marked from 'marked';

import 'prismjs/themes/prism-okaidia.css';
let Prism = null;
const isBrowser = process.env.APP_ENV === 'browser';
if(isBrowser) {
  Prism = require('prismjs');
  require('prismjs/components/prism-bash.min.js');
  require('prismjs/components/prism-javascript.min.js');
  require('prismjs/components/prism-jsx.min.js');
  require('prismjs/components/prism-css.min.js');
}

const cx = classNames.bind(styles);

class MarkdownRender extends Component {
  state = {
    html: ''
  }
  renderMarkdown = () => {
    const { markdown } = this.props;
   // 마크다운이 존재하지 않는다면 공백처리
   if(!markdown) {
      this.setState({ html : '' });
      return;
    }

    
    this.setState({
      html: marked(markdown, {
        // breaks: true, // 일반 엔터로 새 줄 입력
        // sanitize: true // 마크다운 내부 html 무시
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      })
    });
  }

  componentWillMount() {
    this.renderMarkdown();
  }

  componentDidUpdate(prevProps, prevState) {
    // markdown 값이 변경되면, renderMarkdown 을 호출합니다.
    if(prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
      
    }
    // state 가 바뀌면 코드 하이라이팅
    if(prevState.html !== this.state.html) {
      Prism.highlightAll();

    }
    
  }

  render() {
    const { html } = this.state;
   

    // React 에서 html 을 렌더링 하려면 객체를 만들어서 내부에
    // __html 값을 설정해야합니다.
    const markup = {
      __html: html
    };

    // 그리고, dangerouslySetInnerHTML 값에 해당 객체를 넣어주면 됩니다.
    return (
      <div id="parent" className={cx('markdown-render')} dangerouslySetInnerHTML={markup}/>
    );
  }
}

export default MarkdownRender;