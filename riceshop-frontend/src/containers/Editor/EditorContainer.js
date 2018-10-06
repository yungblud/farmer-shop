import React, { Component } from 'react';

import EditorTemplate from 'components/editor/EditorTemplate';
import EditorHeader from 'components/editor/EditorHeader';
import * as editorActions from 'store/modules/editor';
import * as baseActions from 'store/modules/base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditorPaneContainer from 'containers/Editor/EditorPaneContainer';
import PreviewPaneContainer from 'containers/Editor/PreviewPaneContainer';
class EditorContainer extends Component {
  adminCheck = async () => {
    const { BaseActions } = this.props;
    try {
      await BaseActions.adminCheck();
      if(!this.props.adminLogged) {
        alert("관리자가 아니네요..");
        document.location.href="/";
      }
    } catch(e){
      console.log(e);
    }
  }

  onDrop = (e) => {
    console.log('onDrop');
  }

  componentDidMount() {
    this.adminCheck();
    if (window) {
      window.addEventListener('drop', this.onDrop)
    }
  }

  componentWillUnmount() {
    if(window) {
      window.removeEventListener('drop', this.onDrop);
    }
  }
    
 render() {
   if(!this.props.adminLogged) {
     return null;
   }
   return (
    <EditorTemplate
    header={<EditorHeader/>}
    editor={<EditorPaneContainer />}
    preview={<PreviewPaneContainer/>}/>
   );
 }
}

export default connect(
  (state) => ({
    adminLogged: state.base.get('adminLogged')
  }),
  (dispatch) => ({
      EditorActions: bindActionCreators(editorActions, dispatch),
      BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(EditorContainer);