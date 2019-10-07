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
  drive: Array<{ location: string }>;
}
interface HandleLoginProps {
  handleLogin: (payload: ReturnTokenLogin) => void;
}
interface DashboardProps extends HandleLoginProps {
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

interface LoginProps extends HandleLoginProps {
  switcher: React.ReactNode;
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

interface SidebarProps extends HandleLoginProps {
  user: QueryUser;
  active: DashboardState;
  setActive: (payload: DashboardState) => void;
}

interface SidebarState {
  id: DashboardState;
  Icon: any;
  content: string;
}

interface AvatarProps {
  user: QueryUser;
  round?: boolean;
  size?: number;
}

interface ReturnTokenLogin {
  login: boolean;
  token: string | null;
}

interface ProfileProps {
  user: QueryUser;
}

interface TextEditorFormProps {
  title: string;
  content: string;
  status: 'publish' | 'draft' | 'hide';
}

interface TextEditorProps {
  user: QueryUser;
}

type FormSmileFieldProps<T> = FormSmileFieldPropsDefault & T;

interface FormSmileFieldPropsDefault {
  style?: React.CSSProperties;
  type: string;
}

interface ToolbarProps {
  setToggle: () => void;
  user: QueryUser;
}

interface ModalProps {
  setToggle: () => void;
  user: QueryUser;
}

interface ImageProps {
  uri: string;
  height: number;
}
type ID = string | number;
interface CategoryListState {
  name: string;
  id: ID;
  post?: any;
  parent?: CategoryListState;
}
