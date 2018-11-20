import { branch, renderComponent } from 'recompose'
import Loading from '../components/common/Loading';

interface IProps {
  [propName: string]: {
    loading: boolean;
  };
}

export default (component = Loading, propName = 'data') =>
  branch((props:IProps) => props[propName] && props[propName].loading, renderComponent(component))
