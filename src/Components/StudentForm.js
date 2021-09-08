import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap'

const StudentForm = props =>{
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Rquired'),
        email: Yup
                 .string()
                 .email('You have enter an invalid email address')
                 .required('Rquired'),
        rollno: Yup.number().positive('Invalid roll number').integer('Invalid roll number').required('Rquired'),
        // photo: Yup.mixed().test('fileType', "Unsupported File Format", value => ['.jpg', '.jpeg', '.png'].includes(value.type) )
    })
    // ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

    return (
        <div className="form-wrapper">
          <Formik {...props} validationSchema={validationSchema}> 
            {(formik)=>(
                <Form>
                    <FormGroup> 
                        <FormLabel>Name: </FormLabel>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage name="name" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup> 
                        <FormLabel>Email: </FormLabel>
                        <Field name="email" type="text" className="form-control" />
                        <ErrorMessage name="email" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup> 
                        <FormLabel>Rollno: </FormLabel>
                        <Field name="rollno" type="number" className="form-control" />
                        <ErrorMessage name="rollno" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Photo: </FormLabel>
                        <input name="photo" type="file" className="form-control" onChange={(e)=>formik.setFieldValue('photo', e.target.files[0])} />
                        { /* <ErrorMessage name="photo" className="d-block invalid-feedback" component="span" />*/ }                
                    </FormGroup>
                    <Button variant="danger" size="lg" block="block" type="submit">
                      {props.children}
                    </Button>
                </Form>
              )
            }
          </Formik>
        </div>
      )
}

export default StudentForm