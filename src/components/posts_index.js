import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
	componentWillMount(){
		this.props.fetchPosts();	
	}

	renderPosts() {
		return this.props.posts.map((post) => {
			return(
			<Link key={post.id} to={"posts/" + post.id}>
				<li className="list-group-item" key={post.id}>
					<span className="pull-xs-right">{post.categories}</span>
					<strong>{post.title}</strong>
				</li>
			</Link>
			);
		});
	}
	render(){
		return (
			<div>
				<div className="text-xs-right">
					<Link to="posts/new" className="btn btn-info">
					Add a post
					</Link>
				</div>
				<h3>Posts</h3>
				<ul style={ {'paddingLeft': '0'} }>
					{this.renderPosts()}
				</ul>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { posts: state.posts.all}
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
