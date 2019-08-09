import * as React from 'react';
import Avatar from './field_component/Avatar';
import InputLarge from './field_component/InputLarge';
import Landing from './field_component/Landing';
import { Field } from 'formik';

interface PageProps {
  setStateIndex: (value: number) => void;
  state: number;
}
interface PageState {
  isPasswordShow: boolean;
  content: React.ReactNode[];
}

export default class Page extends React.Component<PageProps, PageState> {
  // tslint:disable-next-line:member-access
  handleState = () => {
    if (this.isFinish) {
      this.props.setStateIndex(0);
    } else {
      this.props.setStateIndex(this.props.state + 1);
    }
    // tslint:disable-next-line: semicolon
  };
  // tslint:disable-next-line:member-ordering
  public isFinish = this.state.content.length - 1 === this.props.state;
  // tslint:disable-next-line:member-ordering
  public state = {
    isPasswordShow: false,
    content: [
      <Landing key={0} onClick={this.handleState} />,
      <Field
        key={1}
        type="text"
        name="fullName"
        label="Enter Your Name"
        component={InputLarge}
        onClick={this.handleState}
      />,
      <Field
        key={2}
        type="text"
        name="userName"
        label="Enter Your Username"
        onClick={this.handleState}
        component={InputLarge}
      />,
      <Field
        key={2}
        type="text"
        name="emailAddress"
        label="Enter Your Email"
        onClick={this.handleState}
        component={InputLarge}
      />,
      <Field
        key={3}
        type="password"
        passwordShow={this.state.isPasswordShow}
        setPasswordShow={this.setState}
        name="passwordUsr"
        label="Enter Your Password"
        onClick={this.handleState}
        component={InputLarge}
      />,
      <Field
        key={4}
        type="file"
        name="avatar"
        label="Upload your avatar"
        onClick={this.handleState}
        isFinish={this.isFinish}
        component={Avatar}
      />
    ]
  };
  public render() {
    return this.state.content[this.props.state];
  }
}

// export default ({ setIndex, state }: any) => {
//   const [passwordShow, setPasswordShow] = React.useState(false);

//   const isFinish = content.length - 1 === state;

//   return content[state];
// };
