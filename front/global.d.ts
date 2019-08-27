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

interface ChildrenLayoutProps extends LayoutState {
  handleLayoutState?: (payload: LayoutState) => void;
  switcher?: React.ReactNode;
}
interface LayoutProps {
  children: (ChildrenLayoutProps) => React.ReactNode | null;
}

interface ContentProps {
  isLogin: boolean;
  active: number;
}

interface LoginFormValues {
  username: string;
  password: string;
}

interface RegisterFormValues extends LoginFormValues {
  email: string;
}

interface LoginProps {
  switcher: React.ReactNode;
}
