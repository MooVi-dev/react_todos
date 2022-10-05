import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const schema = Yup.object({
  addTodo: Yup.string().min(3, 'минимум 3 символа').max(20, 'максимум 20 символов').required('обязательное поле')
})

export default function AddTodo({ itemsHandler }) {

  const {values, handleSubmit, handleChange, handleBlur, touched, errors} = useFormik({
    initialValues: {addTodo: ''},
    validationSchema: schema,
    onSubmit: ({addTodo}) => itemsHandler(addTodo)

  })

  return (
    <div className='addTodo'>
      <form className='addTodo-form' onSubmit={handleSubmit}>
        <input 
          value={values.addTodo}
          onChange={handleChange}
          onBlur={handleBlur}
          name='addTodo'
          id='addTodo'
          placeholder='insert todo'
          className='addTodo-form__input'
        />
        <button className='addTodo-form__btn' type='submit'>Add</button>
        {touched.addTodo && errors.addTodo && (
          <div>{errors.addTodo}</div>
        )}
      </form>
    </div>
  )
}
