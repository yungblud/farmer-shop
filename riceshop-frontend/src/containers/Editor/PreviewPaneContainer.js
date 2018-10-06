import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from 'store/modules/editor';
import PreviewPane from 'components/editor/PreviewPane';

class PreviewPaneContainer extends Component {

  initialize = () => {
    const { EditorAction } = this.props;
    EditorAction.initialize();
  }

  componentDidMount() {
    this.initialize();
  }
 render() {
    const { markdown, title } = this.props;
   return (
    <PreviewPane title={title} markdown={markdown}/>
   );
 }
}

export default connect(
  (state) => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown')
  }),
  (dispatch) => ({
    EditorAction: bindActionCreators(editorActions, bindActionCreators)
  })
)(PreviewPaneContainer);