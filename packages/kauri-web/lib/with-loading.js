import { branch, renderComponent } from 'recompose'
import Loading from '../components/common/Loading'

export default (component = Loading, propName = 'data') =>
  branch(props => props[propName] && props[propName].loading, renderComponent(component))
