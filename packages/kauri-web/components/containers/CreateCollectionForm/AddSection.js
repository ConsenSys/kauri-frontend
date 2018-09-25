// @flow
import React from 'react'
import styled from 'styled-components'
import { FieldArray, Field } from 'formik';
import R from 'ramda'

const emptyArticleResource = { type: 'ARTICLE', id: '', version: undefined }
const emptySection: SectionDTO = { name: '', description: undefined, resourcesId: [emptyArticleResource], resources: undefined }

export default ({ values }: *) =>
  <FieldArray
    name='sections'
    render={arrayHelpers => (
      <div>
        {/* {console.log(arrayHelpers)} */}
        {values.sections && values.sections.length > 0 && (
          values.sections.map((section: SectionDTO, index) => (
            <div key={index}>
              <Field type='text' placeholder='Section Name' name={`sections.${index}.name`} />
              <button
                type='button'
                onClick={() => arrayHelpers.remove(index)} // remove a section from the list
              >
              Remove section
              </button>
              <br />

              {
                section && section.resourcesId && Array.isArray(section.resourcesId) && section.resourcesId.map(
                  (resource, resourceIndex) =>
                  <>
                    <Field type='text' placeholder='Section Resource ID' name={`sections[${index}].resourcesId[${resourceIndex}].id`} />

                    <button
                      type='button'
                      onClick={() =>
                        arrayHelpers.form.setFieldValue(`sections[${index}].resourcesId`,
                          Array.isArray(section.resourcesId) && (!resourceIndex ? section.resourcesId.splice(1) : R.remove(resourceIndex, resourceIndex, section.resourcesId)))} // Remove current resource index
                    >
                      Remove resource
                    </button>
                    <br />
                  </>
                )
              }
              <button
                type='button'
                onClick={() =>
                  arrayHelpers.form.setFieldValue(`sections[${index}].resourcesId[${values.sections[index].resourcesId.length}]`, emptyArticleResource)} // insert new empty resource after existing
              >
                      Add resource
              </button>

            </div>
          ))
        )}
        <button type='button' onClick={() => arrayHelpers.push(emptySection)}>
          {/* show this when user has removed all sections from the list */}
        Add a section
        </button>
      </div>
    )}
  />
