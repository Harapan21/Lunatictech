import * as React from 'react';
import Picture from '../../../public/picture.svg';
import Settings from '../../../public/settings.svg';
import Image from '../../../public/image.svg';
interface MenuToolbar {
  key: string;
  menu: string | React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Toolbar: React.SFC<ToolbarProps> = ({ setToggle }) => {
  const [isSetting, setSetting] = React.useState(false);
  const [menu] = React.useState<MenuToolbar[]>([
    { key: 'bold', menu: 'B', style: { fontWeight: 700 } },
    { key: 'italic', menu: 'I', style: { fontStyle: 'italic' } },
    { key: 'underline', menu: 'U', style: { textDecoration: 'underline' } },
    { key: 'picture', menu: <Picture width={15} /> },
    {
      key: 'settings',
      menu: <Settings width={15} />,
      onClick: () => setSetting((state: boolean) => !state)
    }
  ]);
  const [menu2] = React.useState<MenuToolbar[]>([
    {
      key: 'thumbnail',
      menu: (
        <div
          style={{
            background: 'var(--grey)',
            width: '200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 30
          }}
        >
          <Image width={30} />
          <span style={{ fontSize: 'var(--font-size-small)', marginLeft: 5 }}>
            Thumbnail
          </span>
        </div>
      ),
      style: { color: 'var(--black)' },
      onClick: () => setToggle()
    }
  ]);
  return (
    <div
      style={{
        width: 'max-content',
        height: '100%',
        borderLeft: '1px solid var(--grey)',
        display: isSetting ? 'flex' : 'block'
      }}
    >
      {isSetting && (
        <ul
          style={{
            padding: 0,
            margin: 0,
            borderRight: '1px solid var(--grey)'
          }}
        >
          {menu2.map(({ key, menu, style, ...rest }: MenuToolbar) => (
            <li
              key={key}
              {...rest}
              style={{
                listStyle: 'none',
                margin: 0,
                borderBottom: '1px solid var(--grey)',
                textAlign: 'center',
                cursor: 'pointer',
                fontSize: 'var(--font-size-default)',
                ...style
              }}
            >
              {menu}
            </li>
          ))}
        </ul>
      )}
      <ul style={{ padding: 0, margin: 0, width: '50px' }}>
        {menu.map(({ key, menu, style, ...rest }: MenuToolbar) => (
          <li
            key={key}
            {...rest}
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 5,
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'center',
              cursor: 'pointer',
              fontSize: 'var(--font-size-default)',
              ...style
            }}
          >
            {menu}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Toolbar;
