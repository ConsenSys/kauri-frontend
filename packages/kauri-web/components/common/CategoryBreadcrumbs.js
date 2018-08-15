import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Link } from '../../routes'

const CategoryBreadcrumbs = styled.div`
  line-height: 16px;
`

const CategoryBreadcrumb = styled.a`
  color: ${props => props.theme.primaryColor};
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-transform: uppercase;
`

const BreadcrumbSeparator = styled.span`
  height: 12px;
  width: 12px;
  margin: 0 3px;
`

export default ({ category, sub_category }) => (
  <CategoryBreadcrumbs>
    {category ? (
      <Link route={`/community/${category}`}>
        <CategoryBreadcrumb href={`/community/${category}`}>{category}</CategoryBreadcrumb>
      </Link>
    ) : (
      <CategoryBreadcrumb>{'Personal'}</CategoryBreadcrumb>
    )}
    {(category || sub_category) && (
      <Fragment>
        <BreadcrumbSeparator>></BreadcrumbSeparator>
        <Link route={`/community/${category}?subcategory=${sub_category || category || 'Personal'}`}>
          <CategoryBreadcrumb href={`/community/${category}?subcategory=${sub_category || category}`}>
            {sub_category || category}
          </CategoryBreadcrumb>
        </Link>
      </Fragment>
    )}
  </CategoryBreadcrumbs>
)
