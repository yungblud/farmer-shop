import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AfterDetailWrapper from 'components/post/AfterDetailWrapper/AfterDetailWrapper';
import AfterDetailForm from 'components/post/AfterDetailForm/AfterDetailForm';
import * as postActions from 'store/modules/post';

class AfterDetailContainer extends Component {

    getAfterPostById = async () => {
        const { PostActions, afterId } = this.props;

        const config = {
            headers: { Pragma: 'no-cache'}
        };

        try {
            await PostActions.getAfterPostById({id: afterId}, config);
        } catch(e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.getAfterPostById();
    }

 render() {
     const { itemId, afterId, afterPost, loading } = this.props;
     if(loading) return null;
   return (
    <AfterDetailWrapper>
        <AfterDetailForm itemId={itemId} afterId={afterId} afterPost={afterPost}/>
    </AfterDetailWrapper>
   );
 }
}

export default connect(
  (state) => ({
      afterPost: state.post.get('afterPost'),
      loading: state.pender.pending['post/GET_AFTER_POST_BY_ID']
  }),
  (dispatch) => ({
      PostActions: bindActionCreators(postActions, dispatch)
  })
)(AfterDetailContainer);