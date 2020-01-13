import React, { Component, Fragment } from 'react'
import { updateUserInfo, postHousesImage } from '../../../utils/axios'

import indexCss from './index.module.scss'
import MooNavBar from '../../../components/MooNavBar'

import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ImagePicker, Modal } from 'antd-mobile'

import { getLocUserInfo } from '../../../utils/userinfo'
import { baseURL } from '../../../utils/url'
let houseFiles = {}
const alert = Modal.alert
class Myinfo extends Component {
  state = {
    userinfo: getLocUserInfo(),
    files:[{url: baseURL + getLocUserInfo().avatar}],
    multiple: false,
  }
  
  onChange = (files, type, index) => {
    // console.log(files, type, index);
    // files: {file, url}
    this.setState({
      files: files
    });
    houseFiles = files[0]
  }

  render() {
    let {nickname, gender, phone} = this.state.userinfo
    return (
      <Fragment>
        <div className={indexCss.myinfo}>
          <MooNavBar className={indexCss.myinfoNavBar}>编辑用户信息</MooNavBar>
          {/* 内容 */}
          <div className={indexCss.infoWrap}>
            <Form>
              {/* 图片上传 */}
              <div className='formitem avatarWrap'>
                <Field className='input' name="avatar">
                  {({ field }) =>
                    <ImagePicker
                      files={this.state.files}
                      onChange={this.onChange}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={this.state.files.length < 1}
                      multiple={this.state.multiple}
                    />
                  }
                </Field>
              </div>
              {/* 昵称 */}
              <div className='formitem'>
                <div className='formLabel'>用户昵称</div>
                <Field className='input' name="nickname">
                  {({ field }) =>
                  <input className='input' type="text" name={field.name} defaultValue={nickname} placeholder='请输入昵称'
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                  } 
                </Field>
              </div>
              <ErrorMessage name='nickname' component='div' className='error' />
              {/* 性别 */}
              <div className='formitem'>
                <div className='formLabel'>性别选择</div>
                <Field name="gender">
                  {({ field }) =>
                  <input className='radio maleRadio' type="radio" name={field.name} defaultValue="1" defaultChecked={gender === "1"}
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                  }
                </Field>
                <Field name="gender">
                  {({ field }) =>
                  <input className='radio femaleRadio' type="radio" name={field.name} defaultValue="2" defaultChecked={gender === "2"}
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                  }
                </Field>
              </div>
              {/* 手机号码 */}
              <div className='formitem'>
                <div className='formLabel'>手机号码</div>
                <Field name="phone">{({ field }) =>
                  <input className='input' type="text" name={field.name} defaultValue={phone} placeholder='请输入手机号码'
                    onChange={field.onChange}
                    onBlur={field.onBlur} />
                  }
                </Field>
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
  mapPropsToValues: () => ({nickname: '_为空时以本地为准_', gender: '', avatar: '', phone: '13458723541'}),
  // 创建表单校验
  // shape 校验规则的样式
  validationSchema:
    Yup.object().shape({
      nickname: Yup.string().required('请输入用户昵称').matches(/^[a-zA-Z0-9_\u4e00-\u9fa5]{4,20}/, '用户昵称可以为字母汉字下划线'),
      phone: Yup.string().required('请输入手机号码').matches(/^1[3|5|8|9][0-9]{9}$/, '手机号码以13/15/18/19开头')
    })
  ,
  handleSubmit: async (values, formikBag) => {
    const info = getLocUserInfo()
    delete info.id
    for(let key in values) {
      if(!values[key] || !values[key].trim() || values[key] === '_为空时以本地为准_' || values[key] === '13458723541') {
        values[key] = info[key]
      }
    }
    const { file, url } = houseFiles
    // 是否更改更改图片/上传头像
    if (values.avatar !== url && file && houseFiles) {
      const fd = new FormData()
      fd.append('file', file)
      const res = await postHousesImage(fd)
      // console.log(res)
      values.avatar = res.data.body[0]
    }
    // 未做修改
    if (values.avatar === info.avatar 
      && values.nickname === info.nickname 
      && values.phone === info.phone 
      && values.gender === info.gender) {
      return alert('提示', '用户信息未做任何修改', [
        { text: '确定'}
      ])
    }
    // 更改用户信息
    const res2 = (await updateUserInfo(values)).data
    // console.log(res2)
    // 返回上一页
    const { state } = formikBag.props.location
    if (res2.status === 200) {
      alert('提示', '用户信息修改成功', [
        { text: '确定', onPress: () => {
            if(state) {
              // 有值
              // push 给历史记录中加一条记录
              // replace 替换当前的历史记录
              formikBag.props.history.replace(state.from.pathname)
            }else{
              formikBag.props.history.push('/My')
            }
          }
        }
      ])
    }
  },
}

export default withFormik(config)(Myinfo)