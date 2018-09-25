// @flow
import React from 'react'
import styled from 'styled-components'
import { FieldArray, Field } from 'formik';

const emptySection: SectionDTO = { name: '', description: undefined, resourcesId: [], resources: undefined }

export default ({ values }: *) =>
  <FieldArray
    name='sections'
    render={arrayHelpers => (
      <div>
        {/* {console.log(arrayHelpers)} */}
        {values.sections && values.sections.length > 0 && (
          values.sections.map((section, index) => (
            <div key={index}>
              <Field name={`sections.${index}.name`} />
              <button
                type='button'
                onClick={() => arrayHelpers.remove(index)} // remove a section from the list
              >
            -
              </button>
              <button
                type='button'
                onClick={() => arrayHelpers.insert(index, emptySection)} // insert an empty string at a position
              >
            +
              </button>
            </div>
          ))
        )}
        <button type='button' onClick={() => arrayHelpers.push('')}>
          {/* show this when user has removed all sections from the list */}
        Add a section
        </button>
      </div>
    )}
  />
