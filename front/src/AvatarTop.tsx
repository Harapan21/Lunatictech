import * as React from 'react';

export default function AvatarTop(user: any) {
  return (
    <div>
      <div>{user.fullname}</div>
    </div>
  );
}
