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
  data: UserData | null;
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
  me: {
    user_id: string;
    avatar: string;
    joinAt: Date;
    username: string;
    firstLetter: string;
  };
}
interface DashboardProps {
  user: QueryUser;
}

interface ContentProps {
  isLogin: boolean;
  active: number;
}

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginProps {
  switcher: React.ReactNode;
  handleLogin?: (payload: string) => void;
}

// tslint:disable-next-line:no-empty-interface
interface RegisterProps extends LoginProps {}

interface RegisterFormValues extends LoginFormValues {
  email: string;
  fullname: string;
  password: string;
  avatar: string;
}

type DashboardState = number;

interface SidebarProps {
  menu: Array<{ Icon: any; content: string }>;
  active: DashboardState;
  setActive: (payload: DashboardState) => void;
}
