// @flow
import React from 'react'
import styled from 'styled-components'
import { globalSearchApprovedArticles } from '../../../queries/Article'
import { Icon, Input, AutoComplete } from 'antd'
import { Subject } from 'rxjs'

const Option = AutoComplete.Option

const SearchInput = styled(Input)`
  background-color: #262c35 !important;
  .ant-select-selection {
    background-color: transparent;
  }
  * {
    color: white !important;
    background-color: transparent;
  }
  .ant-select-selection__rendered,
  .ant-select-selection,
  > * {
    background-color: #262c35 !important;
  }
  .ant-input {
    border: 1px solid #ebebeb;
    :hover {
      border: 2px solid #209b86 !important;
    }
  }
  .ant-input-affix-wrapper:hover {
    border: 2px solid #209b86 !important;
  }
`

const handleSearch$ = new Subject()

export default class Complete extends React.Component<any, any> {
  state = {
    dataSource: [],
  }

  componentDidMount () {
    handleSearch$
      .debounceTime(300)
      .flatMap(text =>
        this.props.client.query({
          query: globalSearchApprovedArticles,
          variables: { text },
        })
      )
      .map(
        ({
          data: {
            searchArticles: { content },
          },
        }) => content
      )
      .subscribe(dataSource => {
        if (dataSource.length === 0) {
          dataSource = [{ article_id: 'No articles found', text: 'No articles found', subject: 'No articles found' }]
        }
        this.setState({ dataSource })
      })
  }

  handleSearch = (text: string) => {
    handleSearch$.next(text)
  }

  onSelect = (articleRoute: string) => {
    const article_version = articleRoute.split('article_version/')[1]
    const article_id = articleRoute.split('/article/')[1].split('/article_version')[0]
    this.props.routeChangeAction(`/article/${article_id}/article-version/${article_version}`)
  }

  renderOption = (article: ArticleDTO) =>
    article.subject !== 'No articles found' ? (
      <Option
        key={`/article/${article.article_id}/article-version/${article.article_version}`}
        value={`/article/${article.article_id}/article-version/${article.article_version}`}
      >
        {typeof article.subject === 'string' && article.subject.length && article.subject.substr(0, 50).concat('...')}
      </Option>
    ) : (
      <Option disabled key={'No articles found'} value={'No articles found'}>
        No articles found
      </Option>
    )

  render () {
    const { dataSource } = this.state

    return (
      <div
        className='global-search-wrapper'
        style={{
          height: 40,
          width: 300,
          marginLeft: 'auto',
          marginRight: 15,
          alignSelf: 'center',
          backgroundColor: 'transparent',
          display: 'flex',
        }}
      >
        <AutoComplete
          className='global-search'
          size='large'
          style={{ width: '100%', backgroundColor: 'transparent' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
        >
          <SearchInput
            style={{ backgroundColor: 'transparent' }}
            suffix={<Icon type='search' className='certain-category-icon' />}
          />
        </AutoComplete>
      </div>
    )
  }
}
