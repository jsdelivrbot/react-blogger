import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostShow extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	componentWillMount(){
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
			.then(() => {
				this.context.router.push('/')
			});
	}
	render(){
		if (!this.props.post) {
			return <div>Loading</div>
		}
		return(
			<div>
			<Link to="/" className="btn btn-info">Go Back</Link>
			<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger pull-xs-right">Delete Post</button>
			<h3>{this.props.post.title}</h3>
			<h6>Categories: {this.props.post.categories}</h6>
			<p>{this.props.post.content}</p>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { post: state.posts.post }
}
export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);
