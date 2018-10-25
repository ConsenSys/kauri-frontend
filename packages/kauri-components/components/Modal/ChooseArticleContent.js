// @flow
import * as React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'

const Content = styled.section`
  display: flex;
  flex-diretion: column;
  overflow-y: auto;
  width: 100%;
  height: 100%;
`

type Props = {
  children: React.Node,
}

export default ({ children, setRef }: Props) => (
  <Content ref={ref => setRef && setRef(ref)}>
    <Stack width={'100%'} gap={'30px'} gridTemplateColumns='290px 290px 290px'>
      {children}
    </Stack>
  </Content>
)
