import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as findActions from 'store/modules/find';
import { withRouter } from 'react-router-dom';
import MailSendingSuccess from 'components/member/MailSendingSuccess';

class MailSendingContainer extends Component {

    componentDidMount() {
        if(!this.props.success) {
            alert("이상한 접근입니다.");
            this.props.history.goBack();
            return;
        }
    }
    
    render() {
        return (
            <MailSendingSuccess />
        );
    }
}

export default connect(
    (state) => ({
      success: state.find.get('success')
    }),
    (dispatch) => ({
      FindActions: bindActionCreators(findActions, dispatch),
  })
  )(withRouter(MailSendingContainer));