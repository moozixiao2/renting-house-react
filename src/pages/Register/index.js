import React, { Component, Fragment } from 'react'

import { NavBar, Icon, Modal, Toast } from 'antd-mobile'
import indexCss from './index.module.scss'
import { userRegister } from '../../utils/axios'
import { setToken } from '../../utils/token'

import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const alert = Modal.alert
class Register extends Component {
  render() {
    return (
      <Fragment>
        <div className={indexCss.registorWrap}>
          <NavBar
            className={indexCss.registorNav}
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1)}
          ><span></span></NavBar>
          <div className={indexCss.registor}>
            <div className={indexCss.registorTitle}>注册Moo租房</div>
            <Form>
              <div className='formitem'>
                <div className='formLabel'>用户名</div>
                <Field className='input' name='username' placeholder='请输入用户名' />
              </div>
              <ErrorMessage name='username' component='div' className='error' />
              <div className='formitem'>
                <div className='formLabel'>密码</div>
                <Field className='input' name='password' placeholder='6-16位数字及字母组合' />
              </div>
              <ErrorMessage name='password' component='div' className='error' />
              <div className='formitem loginPromise'>
                <Field name="isChecked">
                  {({ field }) =>
                    <div>
                      <label>
                        <input type="checkbox" name={field.name} checked={field.value} onChange={field.onChange} onBlur={field.onBlur} /><span>我已阅读并同意</span>
                        <span>《注册服务协议》</span>
                      </label>
                    </div>
                  }
                </Field>
              </div>
              <div className='formSubmit'><button className='submit' type='submit'>注册</button></div>
            </Form>
            <div className={indexCss.toLogin}>已有帐号？<span onClick={() => this.props.history.go(-1)}>登录</span></div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const config = {
  mapPropsToValues:
    () => ({ username: '', password: '', isChecked: false }),
  // 创建表单校验
  // shape 校验规则的样式
  validationSchema:
    Yup.object().shape({
      username: Yup.string().required('请输入用户名').matches(/^[a-zA-Z][a-zA-Z0-9_]{4,7}$/, '用户名以字母开头，为5到8位，只能出现数字、字母、下划线'),
      password: Yup.string().required('请输入密码').matches(/[a-zA-Z0-9_]{5,12}$/, '密码以字母开头，为5-12位，由数字、字母、下划线组成')
    })
  ,
  handleSubmit: async (values, formikBag) => {
    // console.log(values, formikBag)
    const { username, password, isChecked } = values
    // 返回上一页
    const { state } = formikBag.props.location
    // console.log(state)

    // 就否阅读协议
    if (!isChecked) {
      Toast.info('请您先阅读注册协议', 2, false)
      return
    }
    // 调用接口
    const res = await userRegister({username, password})
    const {body, status} = res.data
    console.log(res)

    if (status === 200) {
      alert('提示', '注册成功', [
        { text: '确定', onPress: () => {
            if(state) {
              // 有值
              // push 给历史记录中加一条记录
              // replace 替换当前的历史记录
              formikBag.props.history.replace(state.from.pathname)
            }else{
              setToken(body.token)
              formikBag.props.history.push('/My')
            }
          }
        }
      ])
    }
  }
}

export default withFormik(config)(Register)