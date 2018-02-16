import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField (field) {
    const {meta} = field // ES2016 --> meta = meta.field.touched y meta.field.error
    const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className = "form-control"
          type="text"
          {...field.input} // nos provee de todos los eventos del input: onChage, onFocus,...
        />
        <div className="text-help">
          {meta.touched ? meta.error : ''}
        </div>
      </div>
    )
  }

  onSubmit (values) {
    // aprender este callback para otros usos
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }

  render () {
    const { handleSubmit } = this.props // cogemos una de las propiedades inyectadas a nuestro componente de reduxForm

    return (
    // reduxForm realizará su trabajo: validaciones,... y si todo está OK, llamará al callback this.onSubmit.bind(this)
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title for post"
          name="title" // name conecta con la función validate y con {field.meta.error}
          component={this.renderField} // sin parentesis, ya que pasamos Field en sí
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">
                    Cancel
        </Link>
      </form>
    )
  }
}

// validar los inputs
function validate (values) {
  const errors = {}
  if (!values.title || values.title.length < 3) {
    errors.title = 'Enter a title that is at least 3 characters!'
  }
  if (!values.categories) {
    errors.categories = 'Enter a categorie at least'
  }
  if (!values.content) {
    errors.content = 'Enter a content'
  }
  return errors
}

// esto es nuevo y ncesario para forms, util en el caso de que existan diferentes forms al mismo tiempo.
// 'PostsNewForm' es el identificador único que asignamos a este form en particular
// añade propiedades adicionales de reduxForm a nuestro componente
// export default reduxForm({
//  validate, // (ES2016) es igual a validate : validate
// form: 'PostsNewForm'
// })(PostsNew)
// y para combinarlo con un action method:
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(connect(null, {createPost})(PostsNew))
