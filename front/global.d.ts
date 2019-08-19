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

interface LoginPage {
  passwordUsr: string;
  userName: string;
}

interface UserSetup extends LoginPage {
  fullName: string;
  emailAddress: string;
  avatar: null | object;
}

interface ReduxUserState {
  isLogin?: boolean;
  data: { me: User };
  loading: boolean;
}

interface User {
  user_id?: string;
  username?: string;
  email?: string;
  joinAt?: string;
  lastEditedAt?: string;
  fullname?: string;
  avatar?: string;
  isAdmin?: boolean;
  post?: Post[];
  firstLetter?: string;
}

interface PostField {
  title: string;
  content: string;
  rating?: number;
  thumbnail?: string;
  video?: string;
  status: any;
}

interface Post {
  id?: number;
  author?: User;
  title?: string;
  content?: string;
  status?: string;
  last_edited_at?: string;
  last_edited_by?: string;
  embed?: any;
  rating?: any;
  contributor?: any;
  comments?: any;
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
  Post,
  Upload
}

interface Toggle {
  toggle: () => void;
}
