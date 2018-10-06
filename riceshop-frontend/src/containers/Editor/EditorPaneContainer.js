import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as editorActions from 'store/modules/editor';
import * as postActions from 'store/modules/post';
import * as categoryActions from 'store/modules/category';
import EditorPane from 'components/editor/EditorPane';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Beforeunload from 'react-beforeunload';
import axios from 'axios';
class EditorPaneContainer extends Component {

    constructor(props) {
        super(props);
        this.onBeforeUnload = this.onBeforeUnload.bind(this); // if you need to bind callback to this
        this.onUnload = this.onUnload.bind(this); // if you need to bind callback to this
    };

    state = {
        imageSrcs: []
    };

    emptyTempDir = async (e) => { // the method that will be used for both add and remove event
        const { EditorActions } = this.props;
        try {
            
            await EditorActions.onEditorUnload();
            // e.returnValue = "Unloaded";
        } catch(e) {
            console.log(e);
        }
        
    }

    onBeforeUnload = (event) => { // the method that will be used for both add and remove event
        console.log("Before Unload Editor");
        event.returnValue = "Are you sure you want to navigate away?";
        // return "Are you sure you want to navigate away?";
    }

    onUnload = (event) => { // the method that will be used for both add and remove event
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        if("sendBeacon" in navigator)
        {
            navigator.sendBeacon("/api/uploads/unload", {}, config);
        }
        else
        {
            var client = new XMLHttpRequest();
            client.open("POST", "/api/uploads/unload", false);
            client.send({});
        }
        window.removeEventListener("beforeunload", this.onBeforeUnload);
        window.removeEventListener("unload", this.onUnload);
        
        event.returnValue = "Are you sure you want to navigate away?";
        // return "Are you sure you want to navigate away?";
    }

    componentDidMount() {
        const { EditorActions, location, PostActions } = this.props;
        EditorActions.initialize();

        const { id } = queryString.parse(location.search);
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        if(id) {
            EditorActions.getPostItemById(id, config);
        }

        // window.onbeforeunload = function(event) {
        //     event.returnValue = "Are you sure you want to navigate away?";
        //     // return "Are you sure you want to navigate away?";
        //   }
        window.addEventListener("beforeunload", this.onBeforeUnload, false);
        window.addEventListener("unload", this.onUnload, false);

        this.getCategories();
    }
    
    componentWillUnmount() {
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        if("sendBeacon" in navigator)
        {
            navigator.sendBeacon("/api/uploads/unload", {}, config);
        }
        else
        {
            var client = new XMLHttpRequest();
            client.open("POST", "/api/uploads/unload", false);
            client.send({});
        }
        // this.onUnload();
        window.removeEventListener('beforeunload', this.onBeforeUnload);
        window.removeEventListener('unload', this.onUnload);
    }

    componentDidUpdate(prevProps, prevState) {
        const { PostActions } = this.props;
        if(prevProps.errorCode !== this.props.errorCode && this.props.errorLog !== "") {
            alert(this.props.errorLog);
            PostActions.resetErrorMessage();
        }
    }

    handleChangeInput = ({name, value}) => {
        const {EditorActions} = this.props;
        EditorActions.changeInput({name, value});
    }

    handleImageUpload = async(e) => {
        const willUploadFile = e.target.files[0];
        console.log(e.target.files[0]);
        const { EditorActions } = this.props;
        try {
            const formData = new FormData();
            formData.append('file', willUploadFile);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            await EditorActions.editorImageUpload(formData, config);
            this.setState({
                imageSrcs: this.state.imageSrcs.concat(this.props.imageName)
            });
            console.log(this.state.imageSrcs);
        } catch (e) {
            console.log(e);
        }
    }


    handlePostItem = async () => {
        const markdown = this.props.markdown.replace(/istemp=true/gi, "istemp=false");
        const { PostActions, EditorActions, title, option, price, history, location, category } = this.props;
        const { id } = queryString.parse(location.search);
        const { imageSrcs } = this.state;
        const filteredImageSrcs = imageSrcs.filter(
            element => markdown.match(element)
        );
        
        // let splitted = markdown.split(/imagename=*jpg)/);
        // let splitted = markdown.split(/[\D]../);
        // let splitted = markdown.match(/\d+\.(jpg)\b/);
        // let splitted = markdown.split(/imagename=(.*)&/);
        // console.log(splitted);
        // let splittedPost = [];
        // for(var i = 0;i<splitted.length;i++)	{
        //     if(splitted[i] !== ""){	
        //         splittedPost.push(splitted[i] + ".jpg");
        //     }
        // }
        const config = {
            headers: { Pragma: 'no-cache'}
        };
        try {

            if(id) {
                await PostActions.updateItemById({id, title, markdown, option, price, category}, config);
                await EditorActions.onPostCompleted({imageSrcs: filteredImageSrcs}, config);
                alert("수정되었습니다.");
                return history.push(`/post/${this.props.itemId}`);
            }
            await PostActions.postItem({title, markdown,option, price, category}, config);
            
            await EditorActions.onPostCompleted({imageSrcs: filteredImageSrcs}, config);
            history.push(`/post/${this.props.itemId}`);

        } catch(e) {
          console.log(e);
        }
      }

      getCategories = async () => {
          const { CategoryActions } = this.props;

          try {
            await CategoryActions.getAllCategories();
          } catch(e) {
              console.log(e);
          }
      }

      handleSelectCategory = ({value}) => {
          const { EditorActions } = this.props;
          EditorActions.selectCategory({value});
      }


    render() {
        const {title, markdown, option, price, errorCode, errorLog, categories} = this.props;
        const {handleChangeInput, handleImageUpload, handlePostItem, handleSelectCategory} = this;

        return (
        <EditorPane
            title={title}
            markdown={markdown}
            option={option}
            price={price}
            onPostItem={handlePostItem}
            onChangeInput={handleChangeInput}
            onImageUpload={handleImageUpload}
            categories={categories}
            onSelectCategory={handleSelectCategory}
            />
        );
    }
}

export default connect((state) => ({
    title: state
        .editor
        .get('title'),
    markdown: state
        .editor
        .get('markdown'),
    option: state.editor.get('option'),
    price: state.editor.get('price'),
    itemId: state.post.get('itemId'),
    errorCode: state.post.getIn(['error', 'errorCode']),
    errorLog: state.post.getIn(['error', 'errorLog']),
    imageName: state.editor.get('imageName'),
    categories: state.category.get('categories'),
    category: state.editor.get('category')
}), (dispatch) => ({
    EditorActions: bindActionCreators(editorActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
    CategoryActions: bindActionCreators(categoryActions, dispatch),
}))(withRouter(EditorPaneContainer));