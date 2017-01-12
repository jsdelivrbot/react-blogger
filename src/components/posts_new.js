import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {
	static contextTypes = {
		router: PropTypes.object
	}

	onSubmit(props) {
		this.props.createPost(props)
			.then(() => {
				// blog post has been created, navigate the user to the index route
				// We navigate by calling this.context.router.push
				// with the new path to navigate to
				this.context.router.push('/')
			});
	}

	render(){
		const { fields: { title, categories, content }, handleSubmit } = this.props;
		console.log(title);
		// If you didn't want to do deconstruction you could also just do
		// const title = this.props.fields.title; etc.
		return(
			<div>
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
	<div className="newpostheader">
	<h3>Create a new post</h3>
	</div>
	<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
		<label>Title</label>
		<input type="text" className="form-control" {...title} />
		<div className="text-help">
			{ title.touched ? title.error : null}
		</div>
	</div>
  <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
    <label>Categories</label>
		<input type="text" className="form-control" { ...categories }/>
    <div className="text-help">
      { categories.touched ? categories.error : null}
    </div>
  </div>
  <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
    <label>Content</label>
    <textarea type="text" className="form-control" { ...content } />
    <div className="text-help">
      { content.touched ? content.error : null}
    </div>
  </div>
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to='/' className={`btn btn-danger`} style={{ 'margin-left':'10px'}}>Cancel</Link>
			</form>
			</div>
		);
	}
}

function validate(values){
	const errors = {};
	if (!values.title){
		errors.title = 'Enter a username';	
	}
  if (!values.categories){
    errors.categories = 'Enter a category';
  }
  if (!values.content){
    errors.content = 'Enter some content';
  }
	return errors;
}

// connect: 1st argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
	form: 'PostsNewForm',
	fields: ['title', 'categories', 'content'], validate
}, null, { createPost })(PostsNew);
