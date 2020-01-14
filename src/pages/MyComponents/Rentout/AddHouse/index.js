import React, { Component, Fragment } from 'react'
import MooNavBar from '../../../../components/MooNavBar'
import indexCss from './index.module.scss'
import { List, InputItem, Picker, Flex, ImagePicker, TextareaItem, Modal, Toast } from 'antd-mobile'
import MooPackage from '../../../../components/MooPackage'
import { postHousesImage, addRentout } from '../../../../utils/axios'

const Item = List.Item
const alert = Modal.alert
// 房屋类型
const roomTypeData = [
  { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
  { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
  { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
  { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
  { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' }
]
// 朝向：
const orientedData = [
  { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
  { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
  { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
  { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
  { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
  { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
  { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
  { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' }
]
// 楼层
const floorData = [
  { label: '高楼层', value: 'FLOOR|1' },
  { label: '中楼层', value: 'FLOOR|2' },
  { label: '低楼层', value: 'FLOOR|3' }
]

export default class AddHouse extends Component {
  state = {
    form: {
      title: '',
      description: '',
      houseImg: '',
      oriented: '',
      supporting: '',
      price: '',
      roomType: '',
      size: '',
      floor: '',
      community: ''
    },
    files: [],
    multiple: false,
  }

  onRoomTypeChange = (val) => {
    this.setState({
      form: {
        ...this.state.form,
        roomType: val
      }
    });
  };

  onFloorChange = (val) => {
    this.setState({
      form: {
        ...this.state.form,
        floor: val
      }
    });
  };

  onOrientedChange = (val) => {
    this.setState({
      form: {
        ...this.state.form,
        oriented: val
      }
    });
  };
  /* 图片 */
  onPicChange = (files, type, index) => {
    // console.log(files, type, index);
    this.setState({
      files
    });
  }

  handleSubmit = async () => {
    const {form, files} = this.state
    if (files.length <= 0) {
      return Toast.info('至少上传一张图片')
    }
    // return
    // 上传图片
    let fd = new FormData()
    files.forEach(v => fd.append('file', v.file))
    const res = await postHousesImage(fd)
    // console.log(res)
    form.houseImg = res.data.body.join('|')
    form.oriented = form.oriented[0]
    form.roomType = form.roomType[0]
    form.floor = form.floor[0]
    // return
    // 添加房源
    const res2 = await addRentout(form)
    // console.log(res2)
    if (res2.status === 200) {
      this.props.history.push('/Rentout')
    }
  }
  render() {
    const { multiple, files, form } = this.state
    const { title, description, houseImg, oriented, supporting, price, roomType, size, floor, community } = this.state.form
    return (
      <Fragment>
        <div className={indexCss.addHouse}>
          <MooNavBar className={indexCss.addHouseNavBar}>添加房源</MooNavBar>
          <List renderHeader={() => '房源信息'} className={indexCss.addList}>
            <Item className='listItem' arrow="horizontal" extra={'请输入小区名称'}>小区名称</Item>
            <InputItem
              value={price}
              placeholder="请输入租金/月"
              extra="¥/月"
              onChange={e => this.setState({
                form: {
                  ...form,
                  price: e
                }
              })}
            >租金</InputItem>
            <InputItem
            value={size}
            placeholder="请输入建筑面积"
            extra="㎡"
            onChange={e => this.setState({
              form: {
                ...size,
                title: e
              }
            })}
            >建筑面积</InputItem>
            {/* 户型 */}
            <Picker
              data={roomTypeData}
              value={roomType}
              cols={1}
              onChange={this.onRoomTypeChange}
            >
              <Item arrow="horizontal">户　　型</Item>
            </Picker>
            {/* 所在楼层 */}
            <Picker
              data={floorData}
              value={floor}
              cols={1}
              onChange={this.onFloorChange}
            >
              <Item arrow="horizontal">所在楼层</Item>
            </Picker>
            {/* 朝向 */}
            <Picker
              data={orientedData}
              value={oriented}
              cols={1}
              onChange={this.onOrientedChange}
            >
              <Item arrow="horizontal">朝　　向</Item>
            </Picker>
          </List>
          <List renderHeader={() => '房屋标题'} className={indexCss.houseTitle}>
            <InputItem
              value={title}
              placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
              onChange={e => this.setState({
                form: {
                  ...form,
                  title: e
                }
              })}
            ></InputItem>
          </List>
          {/* 图像 */}
          <List renderHeader={() => '房屋图像'} className={indexCss.housePic}>
            <ImagePicker
            files={files}
            onChange={this.onPicChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 4}
            multiple={multiple}
          />
          </List>
          
          <List renderHeader={() => '房屋配置'} className={indexCss.houseDispose}>
            <MooPackage onSelect={values => this.setState({
              form: {
                ...form,
                supporting: values.join('|')
              }
            })} />
          </List>

          <List renderHeader={() => '房屋描述'} className={indexCss.houseDesc}>
          <TextareaItem
            placeholder="请输入房屋描述信息"
            value={description}
            rows={5}
            count={150}
            onChange={e => this.setState({
              form: {
                ...form,
                description: e
              }
            })}
          />
          </List>
          {/* 底部 */}
          <Flex className={indexCss.bottom}>
            <Flex.Item className={indexCss.cancel}>取消</Flex.Item>
            <Flex.Item className={indexCss.submit} onClick={this.handleSubmit.bind(this)}>提交</Flex.Item>
          </Flex>
        </div>
      </Fragment>
    )
  }
}