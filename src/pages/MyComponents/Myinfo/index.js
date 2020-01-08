import React, { Component, Fragment } from 'react'
import { updateUserInfo, getUserInfo } from '../../../utils/axios'

import indexCss from './index.module.scss'
import MooNavBar from '../../../components/MooNavBar'

import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { getLocUserInfo } from '../../../utils/userinfo'
class Myinfo extends Component {
  state = {
    userinfo: getLocUserInfo()
  }

  updateUserinfo = async () => {
    const res = (await updateUserInfo()).data
    console.log(res)
  }

  componentDidMount() {
    return
    this.updateUserinfo()
  }
  render() {
    // console.log(userinfo)
    return (
      <Fragment>
        <div className={indexCss.myinfo}>
          <MooNavBar className={indexCss.myinfoNavBar}>编辑用户信息</MooNavBar>
          {/* 内容 */}
          <div className={indexCss.infoWrap}>
            <Form>
              {/* 图片上传 */}
              {/* <div className='formitem'>
                <div className='formLabel'>用户头像</div>
                <Field className='input' name="avatar" render={({ field }) =>
                  <></>
                } />
              </div> */}
              {/* 昵称 */}
              <div className='formitem'>
                <div className='formLabel'>用户昵称</div>
                <Field className='input' name="nickname" render={({ field }) =>
                  <input className='input' type="text" name={field.name} value={field.nickname} placeholder='请输入昵称'
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                } />
              </div>
              <ErrorMessage name='nickname' component='div' className='error' />
              {/* 性别 */}
              <div className='formitem'>
                <div className='formLabel'>性别选择</div>
                <Field name="gender" render={({ field }) =>
                  <input className='radio maleRadio' type="radio" name={field.name} value="0" checked={field.value === "0"}
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                } />
                <Field name="gender" render={({ field }) =>
                  <input className='radio femaleRadio' type="radio" name={field.name} value="1" checked={field.value === "1"}
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                } />
                <ErrorMessage name="gender" component='div' className='error' />
              </div>
              {/* 手机号码 */}
              <div className='formitem'>
                <div className='formLabel'>手机号码</div>
                <Field name="phone" render={({ field }) =>
                  <input className='input' type="text" name={field.name} value={field.phone} placeholder='请输入手机号码'
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                } />
              </div>
              <ErrorMessage name='phone' component='div' className='error' />
              <div className='formSubmit'><button className='submit' type='submit'>保存</button></div>
            </Form>
          </div>
        </div>
      </Fragment>
    )
  }
}

const config = {
  mapPropsToValues: () => ({
    
  }),
  handleSubmit: (values, formikBag) => {
    // delete values.id
    console.log(values)
  }
}

export default withFormik(config)(Myinfo)