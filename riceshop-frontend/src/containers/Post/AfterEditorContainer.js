import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as postActions from 'store/modules/post';
import AfterEditorWrapper from 'components/post/AfterEditorWrapper/AfterEditorWrapper';
import AfterEditor from 'components/post/AfterEditor/AfterEditor';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import storage from 'lib/storage';

class AfterEditorContainer extends Component {
   
    initialize = () => {
        const { PostActions } = this.props;
        PostActions.initializeAfterPostEditor();
    }

    componentDidMount() {
        this.initialize();
    }

    handleChange = ({name, value}) => {
        const { PostActions } = this.props;
        PostActions.changeInput({name, value});
    }

    writeAfterPost = async () => {
        const { PostActions, titleInput, contentInput, location, history} = this.props;
        const { id } = queryString.parse(location.search);
        const config = {
            headers: { Pragma: 'no-cache'}
        };

        try {
            let contentText = contentInput;
            contentText = contentText.replace(/\r?\n/g, '<br />');
            await PostActions.writeAfterPost({title: titleInput, content: contentText, username: storage.get('loggedInfo').userID, itemid: id}, config);
            alert("후기가 작성되었습니다!");
            history.push(`/post/${id}`);
        } catch(e) {
            console.log(e);
        }
    }
 render() {
    const { location, titleInput, contentInput } = this.props;
    const { id, title } = queryString.parse(location.search);
    const { handleChange, writeAfterPost } = this;
   return (
    <AfterEditorWrapper title={title}>
        <AfterEditor onWrite={writeAfterPost} id={id} onChangeInput={handleChange} title={titleInput} content={contentInput} />
    </AfterEditorWrapper>
   );
 }
}

export default connect(
  (state) => ({
      titleInput: state.post.get('title'),
      contentInput: state.post.get('content')
  }),
  (dispatch) => ({
      PostActions: bindActionCreators(postActions, dispatch)
  })
)(withRouter(AfterEditorContainer));