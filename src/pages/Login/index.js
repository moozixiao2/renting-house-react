import React, { Component, Fragment } from 'react'

import { NavBar, Icon, Toast } from 'antd-mobile'
import indexCss from './index.module.scss'

import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { userLogin } from '../../utils/axios'
import { setToken } from '../../utils/token'

class Login extends Component {

  state = {
    form: {
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <Fragment>
        <div className={indexCss.loginWrap}>
          <NavBar
            className={indexCss.loginNav}
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
          ><span></span></NavBar>
          <div className={indexCss.login}>
            <div className={indexCss.loginTitle}>登录Moo租房</div>
            <Form>
              <div className='formItem'>
                <div className='formLabel'>用户名</div>
                <Field className='input' name='username' placeholder='请输入用户名' />
              </div>
              <ErrorMessage name='username' component='div' className='error' />
              <div className='formItem'>
                <div className='formLabel'>密码</div>
                <Field className='input' name='password' type='password' placeholder='请输入密码' />
              </div>
              <ErrorMessage name='password' component='div' className='error' />
              <div className='formSubmit'><button className='submit' type='submit'>登录</button></div>
            </Form>
            <div className={indexCss.toRegister}><span onClick={() => this.props.history.push('/Register')}>快速注册</span><span>忘记密码</span></div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const config = {
  // 可更新的表单状态， 组件 props.values 获取到的值
  mapPropsToValues: 
  () => ({username: '', password: ''}),
  // 表单提交处理程序
  handleSubmit: async (values, formikBag) => {
    // console.log(values, formikBag)

    const res = await userLogin(values)
    // console.log(res)
    const { description, body } = res.data
    Toast.info(description, 1)
    // 存 token
    setToken(body.token)
    // 返回上一页
    const { state } = formikBag.props.location
    // console.log(state)
    if(state) {
      // 有值
      // push 给历史记录中加一条记录
      // replace 替换当前的历史记录
      formikBag.props.history.replace(state.from.pathname)
    }else{
      formikBag.props.history.go(-1)
    }
  },
  // 创建表单校验
  // shape 校验规则的样式
  validationSchema: 
    Yup.object().shape({
      username: Yup.string().required('请输入用户名').matches(/^[a-zA-Z][a-zA-Z0-9_]{4,7}$/, '用户名以字母开头，为5到8位，只能出现数字、字母、下划线'),
      password: Yup.string().required('请输入密码').matches(/^[a-zA-Z0-9_]{5,12}$/, '密码以字母开头，为5-12位，由数字字母下划线组成')
    })
}

export default withFormik(config)(Login)