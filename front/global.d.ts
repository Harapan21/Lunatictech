declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.scss' {
  const content: any;
  export default content;
}
declare module '*.jpeg' {
  const content: any;
  export default content;
}

interface UserSetup {
  fullName: string;
  userName: string;
  emailAddress: string;
  passwordUsr: string;
  avatar: null | object;
}

interface PostField {
  title: string;
  author: string;
  content: string;
  rating?: number;
  thumbnail?: string;
  video?: string;
  status: any;
}
interface InputPageExtendsProps {
  type: string;
  label: string;
  onClick?: any;
  passwordShow?: boolean;
  setPasswordShow?: any;
}

type InputPageProps<T> = InputPageExtendsProps & T;

declare enum Menu {
  Dahboard,
  Post
}
