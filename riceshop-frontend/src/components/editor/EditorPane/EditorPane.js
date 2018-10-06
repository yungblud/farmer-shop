import React, { Component } from "react";
import styles from "./EditorPane.scss";
import classNames from "classnames/bind";
import Button from "components/common/Button";

// CodeMirror 를 위한 CSS 스타일
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

const cx = classNames.bind(styles);

let CodeMirror = null;
const isBrowser = process.env.APP_ENV === "browser";
if (isBrowser) {
  CodeMirror = require("codemirror");
  require("codemirror/mode/markdown/markdown");
  require("codemirror/mode/javascript/javascript");
  require("codemirror/mode/jsx/jsx");
  require("codemirror/mode/css/css");
  require("codemirror/mode/shell/shell");
}

class EditorPane extends Component {
  editor = null; // 에디터 ref
  codeMirror = null; // CodeMirror 인스턴스
  cursor = null; // 에디터의 텍스트 cursor 위치

  initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: "markdown",
      theme: "monokai",
      lineNumbers: true, // 좌측에 라인넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성
    });
    this.codeMirror.on("change", this.handleChangeMarkdown);
    this.codeMirror.on("dragenter", (event, e) => {
      console.log('drag enter');
    });
    this.codeMirror.on("dragleave", (event, e) => {
      console.log('drag leave');
    });
  };

  componentDidMount() {
    this.initializeEditor();
  }

  handleChange = e => {
    const { onChangeInput } = this.props;
    const { value, name } = e.target;
    onChangeInput({ name, value });
  };

  handleChangeMarkdown = doc => {
    const { onChangeInput } = this.props;
    this.cursor = doc.getCursor(); // 텍스트 cursor 의 위치를 저장합니다
    onChangeInput({
      name: "markdown",
      value: doc.getValue()
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // markdown이 변경되면 에디터의 값도 변경해줍니다. 이 과정에서 텍스트 커서의 위치가 초기화 되기 때문에, 저장해둔 커서의 위치가
    // 있으면 해당 위치로 설정합니다.
    if (prevProps.markdown !== this.props.markdown) {
      const { codeMirror, cursor } = this;
      if (!codeMirror) return; // 인스턴스가 아직 안만들어진 경우
      codeMirror.setValue(this.props.markdown);
      if (!cursor) return; // 커서가 없는 경우
      codeMirror.setCursor(cursor);
    }
  }

  onImageButtonClick = () => {
    this.imagePicker.click();
  };

  handleCategorySelect = (e) => {
    const { value } = e.target;
    this.props.onSelectCategory({value});
  }

  

  render() {
    const { handleChange, onImageButtonClick, handleCategorySelect } = this;
    const { title, onImageUpload, option, price, onPostItem } = this.props;

    return (
      <div className={cx("editor-pane")}>
        <input
          className={cx("title")}
          placeholder="제목을 입력하세요"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <div className={cx("code-editor")} ref={ref => (this.editor = ref)} />
        <div className={cx("utils")}>
          <div className={cx("description")}>이미지</div>
          <div className={cx("image-button")} onClick={onImageButtonClick}>
            이미지 업로드
          </div>
          <input
            type="file"
            onChange={onImageUpload}
            ref={ref => {
              this.imagePicker = ref;
            }}
            name="file"
            style={{ display: "none" }}
          />
        </div>
        <div className={cx("utils")}>
          <div className={cx("description")}>옵션 작성란</div>
          <input
            type="text"
            name="option"
            value={option}
            onChange={handleChange}
            placeholder="옵션을 작성해주세요. 쉼표로 구분."
          />
        </div>
        <div className={cx("utils")}>
          <div className={cx("description")}>가격 작성란</div>
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="가격을 작성해주세요. 쉼표로 구분."
          />
        </div>
        <div className={cx("utils")}>
          <div className={cx("description")}>카테고리 분류</div>
          <select
            className={cx("Categories")}
            onChange={handleCategorySelect}
          >
          <option value={'no-category'}>카테고리</option>
          {
            this.props.categories.toJS().length > 0 && this.props.categories.toJS().map((category, i) => {
             return (
              <option value={category.keyname} key={category.keyname}>{category.title}</option>
             )
            })
          }

          </select>
        </div>
        <div className={cx("utils")}>
          {/* <div className={cx('description')}>작성하기</div> */}
          <div className={cx("post-button")} onClick={onPostItem}>
            작성하기
          </div>
          {/* <Button onClick={onPostItem}>작성하기</Button> */}
        </div>
      </div>
    );
  }
}

export default EditorPane;
