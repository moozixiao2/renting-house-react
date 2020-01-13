import React, { Component, Fragment } from 'react'
import { RadioGroup, Radio} from './MooRadio'

export default class MyInfo extends Component {
  render () {
    return (
      <Fragment>
      <RadioGroup name='group'>
        <Radio value='1'>1</Radio>
        <Radio value='2'>2</Radio>
        <Radio value='3'>3</Radio>
      </RadioGroup>
      </Fragment>
    )
  }
}