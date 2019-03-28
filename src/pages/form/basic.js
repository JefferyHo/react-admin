import React, { PureComponent } from 'react';
import { connect } from 'dva'; 
import Form from '@/components/Forms';
 
@connect()
class BasicForms extends PureComponent {
  state = {
  }

  handleSubmit = data => {
    console.log(data);
  }


  componentDidMount () {
  }

  render () {
    const formList = [
      {
        type: 'input',
        label: '用户名',
        field: 'name',
        required: true
      },
      {
        type: 'password',
        label: '密码',
        field: 'password',
        rules: [
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码长度最少8位' },
          { max: 16, message: '密码最大长度16位'}
        ]
      },
      {
        type: 'input',
        label: '邮箱',
        field: 'email',
        rules: [
          { required: true, message: '请填写邮箱' },
          { type: 'email',  message: '邮箱格式不正确' },
        ]
      },
      {
        type: 'select',
        label: '选择地区',
        field: 'area',
        data: [
          { value: '1', label: '亚洲' },
          { value: '2', label: '美洲' },
          { value: '3', label: '欧洲' },
          { value: '4', label: '非洲' },
        ]
      },
      {
        type: 'selectRemote',
        label: '选择单位',
        field: 'company',
        url: '/api/getCompany'
      },
      {
        type: 'checkbox',
        label: '套餐搭配',
        field: 'order',
        data: [
          { label: '16G RAM', value: 'ram' },
          { label: '512G SSD', value: 'ssd' },
          { label: 'Intel I7', value: 'cpu' }
        ]
      },
      {
        type: 'datepicker',
        label: '注册日期',
        field: 'register_date',
      },
      {
        type: 'datetimepicker',
        label: '启用时间',
        field: 'open_state'
      }
      /* {
        type: 'select',
        label: '选择用户',
        field: 'user',
        static: false,
        url: '/api/getUserList'
      },
      {
        type: 'checkbox',
        label: 'Check',
        field: 'keep',
        intialValue: true
      } */
    ];

    return (
      <Form formList={formList} formSubmit={this.handleSubmit} />
    )
  }
}

export default BasicForms;