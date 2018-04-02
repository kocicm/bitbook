import React, { Component } from 'react'
import CommentsListItem from './CommentsListItem';
import postsData from '../../../services/postService';
import commentService from '../../../services/commentService';


class VideoPostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postInfo: {},
            commentInfo: [],
            commentText: '',
        }

    }

    componentDidMount() {

        postsData.getVideoPost(this.props.match.params.id)
            .then(data => {
                this.setState({
                    postInfo: data
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
        commentService.getCommentByPostId(this.props.match.params.id)
            .then((response) => {
                this.setState({
                    commentInfo: response,
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message
                })
            })
    }

    commentBody = (event) => {
        this.setState({
            commentText: event.target.value
        })
    }

    sendComment = () => {
        commentService.postComment(this.props.match.params.id, this.state.commentText)
            .then(response => {
                if (response) {
                    this.previewComments();
                    this.setState({
                        commentText: '',
                    })
                }
            })
    }

    sendCommentOnEnter = (event) => {
        if (event.keyCode === 13) {
            this.sendComment();
        }
    }

    previewComments = () => {
        return commentService.getCommentByPostId(this.props.match.params.id).then((response) => {
            this.setState({
                commentInfo: response
            })
        })
    }
    deletePost = () => {
        return postsData.deletePost(this.props.match.params.id)
            .then(response => {
                if (response) {
                    window.location = '/'
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.error
                    ? <p className='error-message'>{this.state.error}</p>
                    : <div>
                        <div className="container">
                            <div className='col s12 m7'>
                                <div className="video-container">
                                    <iframe width="853" height="480" title='video' src={this.state.postInfo.videoUrl} frameBorder="0" allowFullScreen allow="autoplay; encrypted-media"></iframe>
                                </div>
                            </div>
                            <div className='col s12 m7 delete-text'>
                                <i onClick={this.deletePost} className="col s2 material-icons right small text-darken-2 dp48">delete</i>
                            </div>

                            <div className="row">
                                <div className="col s12">
                                    <div className="row align-center">
                                        <div className="input-field col s9">
                                            <input onKeyUp={this.sendCommentOnEnter} id="icon_prefix" type="text" onChange={this.commentBody} value={this.state.commentText} className="validate" />
                                            <label htmlFor="icon_prefix">Add comment</label>
                                        </div>
                                        <div className="input-field col s3 ">
                                            <button onClick={this.sendComment} className={`${(this.state.commentText.length === 0) ? "disabled " : ""}btn waves-effect waves-light col s12 align-center`} type="submit" name="action">
                                                <i className="large material-icons">send</i>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="row">
                            {
                                this.state.commentInfo.map((el, i) => {
                                    return <CommentsListItem authorName={el.authorName} body={el.body} key={el.id} />
                                })
                            }
                        </div>
                    </div>}
            </React.Fragment >
        )
    }
}



// class VideoPostPage extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             postInfo: {},
//             commentInfo: [],
//             commentText: '',
//         }

//     }

//     componentDidMount() {

//         postsData.getVideoPost(this.props.match.params.id)
//             .then(data => {
//                 this.setState({
//                     postInfo: data
//                 })
//             })
//         commentService.getCommentByPostId(this.props.match.params.id)
//             .then((response) => {
//                 this.setState({
//                     commentInfo: response,
//                 })
//             })
//     }
//     commentBody = (event) => {
//         this.setState({
//             commentText: event.target.value
//         })
//     }

//     sendComment = () => {
//         commentService.postComment(this.props.match.params.id, this.state.commentText)
//             .then(response => {
//                 if (response) {
//                     this.previewComments();
//                     this.setState({
//                         commentText: '',
//                     })
//                 }
//             })
//     }

//     sendCommentOnEnter = (event) => {
//         if (event.keyCode == 13) {
//             commentService.postComment(this.props.match.params.id, this.state.commentText)
//                 .then(response => {
//                     if (response) {
//                         this.previewComments();
//                         this.setState({
//                             commentText: '',
//                         })
//                     }
//                 })
//         }
//     }

//     previewComments = () => {
//         return commentService.getCommentByPostId(this.props.match.params.id).then((response) => {
//             this.setState({
//                 commentInfo: response
//             })
//         })
//     }

//     render() {
//         return (
//             <div className="container">
//                 <div className='col s12 m7'>
//                     <div className="video-container">
//                         <iframe width="853" height="480" src={this.state.postInfo.videoUrl} frameBorder="0" allowFullScreen allow="autoplay; encrypted-media"></iframe>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <AddComment />
//                 </div>
//                 <CommentsListItem />
//                 <CommentsListItem />
//             </div>

//         )
//     }
// }


export default VideoPostPage;