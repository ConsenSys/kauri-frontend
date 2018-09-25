// @flow
import React from 'react'
import styled from 'styled-components'
import { Form, Field, FieldArray } from 'formik'
import type { FormState } from './index'

type Props = {
  userId: string,
  touched: {
    email: boolean
  },
  errors: {
    email: ?string
  }
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.padding};
`

export default ({ touched, errors }: Props) => <Section>
  <Form>
    <div className='control'>
      <label className='label'>Email Address</label>
      {touched.email && typeof errors.email === 'string' && <p>{errors.email}</p>}
      <Field className='input' type='email' name='email' placeholder='Email' />
    </div>
  </Form>
</Section>
