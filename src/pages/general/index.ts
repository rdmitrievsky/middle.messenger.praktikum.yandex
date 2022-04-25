// export {Account as default} from './general'
import { AccountGen } from './general';
import { withRouter } from '../../core/Router';
import { connect } from '../../store/index';

// export default withRouter(connect((state: any) => ({user: state.user.profile || {}}), Account));
export default withRouter(connect((state: any) => ({user: state.user.profile}), AccountGen));