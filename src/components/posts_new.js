import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';

class PostsNew extends Component {
	render(){
		const { fields: { title, categories, content }, handleSubmit } = this.props;
		console.log(title);
		// If you didn't want to do deconstruction you could also just do
		// const title = this.props.fields.title; etc.
		return(
			<div>
			<form onSubmit={handleSubmit(this.props.createPost)}>
	<h3>Create a new post</h3>
	<div className="form-group">
		<label>Title</label>
		<input type="text" className="form-control" {...title} />
	</div>
  <div className="form-group">
    <label>Categories</label>
		<input type="text" className="form-control" { ...categories }/>
  </div>
  <div className="form-group">
    <label>Content</label>
    <textarea type="text" className="form-control" { ...content } />
  </div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
			</div>
		);
	}
}

// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content']
}, null, { createPost })(PostsNew);
