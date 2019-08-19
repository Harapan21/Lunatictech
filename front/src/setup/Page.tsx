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
}

export default class Page extends React.Component<PageProps, PageState> {
  // tslint:disable-next-line: member-access
  public state = {
    isPasswordShow: false
  };

  public FieldInput = (props: any) => InputLarge<UserSetup>(props);
  // tslint:disable-next-line:member-ordering
  // tslint:disable-next-line:member-access
  public content = (handleState?: () => void) => [
    <Landing key={0} onClick={handleState} />,
    <Field
      key={1}
      type="text"
      name="fullName"
      label="Enter Your Name"
      component={this.FieldInput}
      onClick={handleState}
    />,
    <Field
      key={2}
      type="text"
      name="userName"
      label="Enter Your Username"
      onClick={handleState}
      component={this.FieldInput}
    />,
    <Field
      key={2}
      type="text"
      name="emailAddress"
      label="Enter Your Email"
      onClick={handleState}
      component={this.FieldInput}
    />,
    <Field
      key={3}
      type="password"
      passwordShow={this.state.isPasswordShow}
      setPasswordShow={() =>
        this.setState((state: any) => ({
          isPasswordShow: !state.isPasswordShow
        }))
      }
      name="passwordUsr"
      label="Enter Your Password"
      onClick={handleState}
      component={this.FieldInput}
    />,
    <Field
      key={4}
      type="file"
      name="avatar"
      label="Upload your avatar"
      component={Avatar}
    />
    // tslint:disable-next-line:semicolon
  ];
  public handleState = () =>
    this.content().length - 1 !== this.props.state
      ? this.props.setStateIndex(this.props.state + 1)
      : // tslint:disable-next-line:semicolon
        this.props.setStateIndex(0);

  public render() {
    return this.content(this.handleState)[this.props.state];
  }
}

// export default ({ setIndex, state }: any) => {
//   const [passwordShow, setPasswordShow] = React.useState(false);

//   const isFinish = content.length - 1 === state;

//   return content[state];
// };
