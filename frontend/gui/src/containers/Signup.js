import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class SignupForm extends React.Component{
    // form = Form.useForm();

    onFinish = (values) => {
        this.props.onAuth(
            values.username,
            values.email, 
            values.password,
            values.confirm);

        this.props.history.push('/');


    // console.log('Received values of form: ', values);
};


    // [autoCompleteResult, setAutoCompleteResult] = useState([]);

    render(){
        return (
        <Form
        // form={this.form}
        name="register"
        onFinish={this.onFinish}
        >
        <Form.Item
                name="username"
                rules={[
            {
                required: true,
                message: 'Please input your Username!',
            },
            ]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="email"
            rules={[
            {
                type: 'email',
                message: 'The input is not valid E-mail!',
            },
            {
                required: true,
                message: 'Please input your E-mail!',
            },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email"/>
        </Form.Item>

        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            hasFeedback
        >
            <Input.Password prefix={<UserOutlined className="site-form-item-icon" />} placeholder="password" />
        </Form.Item>

        <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
            }),
            ]}
        >
            <Input.Password prefix={<UserOutlined className="site-form-item-icon" />} placeholder="confirm"/>
        </Form.Item>

       <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                Signup
            </Button>
            Or
            <NavLink 
            style={{marginRight: '10px'}} 
            to="/login/"> Login
            </NavLink>
        </Form.Item>
        </Form>
        );
    }
};


const mapStateToProps = (state) => {
    return{
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2)=> dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignupForm);

