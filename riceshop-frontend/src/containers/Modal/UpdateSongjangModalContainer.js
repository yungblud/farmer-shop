import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as checkoutActions from 'store/modules/checkout';
import UpdateSongjangModal from 'components/modal/UpdateSongjangModal';

class UpdateSongjangModalContainer extends Component {

    makeInvisible = () => {
        const {CheckoutActions, isUpdateSongjangMode} = this.props;
        if (isUpdateSongjangMode) {
            return CheckoutActions.updateSongjangNumberCancel();
        }
        CheckoutActions.updateSongjangNumber();
    }

    handleChangeInput = ({name, value}) => {
        const { CheckoutActions } = this.props;
        CheckoutActions.changeInput({name, value});
    }

    setChecked = async () => {
        const { CheckoutActions, id, songjang } = this.props;
        const config = {
            headers: { Pragma: 'no-cache'}
          };

        try {
            await CheckoutActions.setChecked(id, songjang, config);
            CheckoutActions.updateSongjangNumberCancel();
            await CheckoutActions.getCheckoutById(id, config);
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const {isUpdateSongjangMode, songjang} = this.props;
        const { makeInvisible, handleChangeInput, setChecked } = this;
        return (<UpdateSongjangModal 
                    visible={isUpdateSongjangMode} 
                    onCancel={makeInvisible}
                    onChangeInput={handleChangeInput}
                    songjang={songjang}
                    onUpdate={setChecked}/>);
    }
}

export default connect((state) => ({
    isUpdateSongjangMode: state
        .checkout
        .get('isUpdateSongjangMode'),
    songjang: state.checkout.get('songjang')
}), (dispatch) => ({
    CheckoutActions: bindActionCreators(checkoutActions, dispatch)
}))(UpdateSongjangModalContainer);