import { chatActive } from './chatActive';
import { withRouter } from '../../core/Router';
import {connect} from '../../store/index';

export default withRouter(connect((state: any) => ({user: state.user.profile, zxc: 'zxc123'}), chatActive));