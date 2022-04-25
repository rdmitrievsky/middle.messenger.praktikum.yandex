// export {Account as default} from './general'
import { EditProfile } from './editprofile';
import { withRouter } from '../../core/Router';
import { connect } from '../../store/index';

// export default withRouter(connect((state: any) => ({user: state.user.profile || {}}), Account));
export default withRouter(connect((state: any) => ({user: state.user.profile}), EditProfile));