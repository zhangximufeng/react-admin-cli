/**
 * Created by Myfun on 2019/04/18.
 */
import { Component } from 'react';
import { connectMu } from 'redux-mufeng';

class AuthWidget extends Component {
    render() {
        const { auth = {} } = this.props;
        return this.props.children(auth.data || {});
    }
}

export default connectMu(['auth'])(AuthWidget);
