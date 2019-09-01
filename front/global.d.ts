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
declare module '*.json' {
  const content: any;
  export default content;
}

interface LayoutState {
  isLogin: boolean;
  active: number;
}
declare enum ContentChild {
  Login,
  Register,
  Dashboard
}
interface QueryUser {
  data: { me: UserData };
  loading: boolean;
}
interface ChildrenLayoutProps extends LayoutState {
  handleLayoutState: any;
  switcher?: React.ReactNode;
  user: QueryUser;
}
interface LayoutProps {
  children: (ChildrenLayoutProps) => React.ReactNode | null;
}

interface UserData {
  user_id: string;
  avatar: string;
  joinAt: Date;
  username: string;
  fullname: string;
  firstLetter: string;
}
interface DashboardProps {
  user: QueryUser;
}

interface ContentProps {
  isLogin?: boolean;
  active: number;
  defaultActive?: number;
}

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginProps {
  switcher: React.ReactNode;
  handleLogin?: (payload: ReturnTokenLogin) => void;
}

// tslint:disable-next-line:no-empty-interface
interface RegisterProps extends LoginProps {}

interface RegisterFormValues extends LoginFormValues {
  email: string;
  fullname: string;
  password: string;
  avatar: string | null;
}

type DashboardState = 0 | 1 | 2 | 3;

interface SidebarProps {
  user: QueryUser;
  active: DashboardState;
  setActive: (payload: DashboardState) => void;
}

interface AvatarProps {
  user: QueryUser;
}

interface ReturnTokenLogin {
  login: boolean;
  token: string;
}

interface ProfileProps {
  user: QueryUser;
}

interface TextEditorProps {
  title: string;
  content: string;
  status: 'publish' | 'draft' | 'hide';
}

interface FormSmileFieldProps {
  style?: React.CSSProperties;
  type: string;
}
