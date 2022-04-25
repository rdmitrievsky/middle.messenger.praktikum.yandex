// export { Login as default } from "./login"
import {Login} from './login';
import {connect} from '../../store/index';
import { withRouter } from '../../core/Router';

export default withRouter(connect((state: any) => ({user: state.user || {}}), Login));