import React, { PureComponent } from 'react';
import { connect } from 'dva'; 
import Form from '@/components/Forms';

@connect()
class BasicForms extends PureComponent {
  handleSubmit = data => {
    console.log(data);
    return;
    /* e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        throw err;
        return;
      }
      console.log(values);
    }) */
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
      /* {
        type: 'select',
        label: '渠道',
        field: 'from',
        intialValue: 1
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