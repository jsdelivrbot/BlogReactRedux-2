import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPost, deletePost} from '../actions'

class PostsShow extends Component {
    componentDidMount(){
        //accede a :id de la , también se podría añadir if(!this.props.post){...} para no recargar el network
        const {id} = this.props.match.params
        this.props.fetchPost(id)
    }

    onDeleteClick(){
        const {id} = this.props.match.params
        this.props.deletePost(id, ()=>{
            this.props.history.push('/')
        })
    }

    render(){
        const {post} = this.props

        if(!post){
            return <div>...Loading</div>
        }

        return(
            <div>
                <Link to="/">Back to index</Link>
                <button 
                    type="button" 
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    DELETE
                </button>
                <h3>{post.title}</h3>
                <h6>categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        )
    }
}

//this.props === ownProps del componente
function mapStateToProps({posts}, ownProps){
    return {post:posts[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow)