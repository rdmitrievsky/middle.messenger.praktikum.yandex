import { Chat } from './chat';
import { withRouter } from '../../core/Router';
import {connect} from '../../store/index';

export default withRouter(connect((state: any) => ({user: state.user.profile, asd: ['one','two','three']}), Chat));