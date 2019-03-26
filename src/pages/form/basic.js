import React, { PureComponent } from 'react';
import {
  AutoComplete,
  Checkbox,
  Cascader,
  DatePicker,
  Form,
  InputNumber,
  Input,
  Mention,
  Rate,
  Radio,
  Switch,
  Slider,
  Select,
  TreeSelect,
  Transfer,
  TimePicker,
  Upload,
} from 'antd';

const FormItem = Form.Item;

@Form.create()
class BasicForms extends PureComponent {
  render () {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      }
    };

    console.log(1111);

    const submitFormLayout = {
      xs: { span: 24 },
      sm: { span: 10, offset: 7 }
    };

    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    return (
      <Form {...formItemLayout}>
        <FormItem label="智能输入">
          {getFieldDecorator('autoComplete')(<AutoComplete datasource={['12345', '23456', '34567', '45678', '56789']} />)}
        </FormItem>
      </Form>
    )
  }
}

export default BasicForms;