import * as React from 'react';

export default function AvatarTop({ user: { loading, data } }: any) {
  return loading ? <div>Loading ...</div> : <div>{data.me.username}</div>;
}
