import React, { useEffect } from 'react';
import consumer from './cable';

export default function Websocket({ callback }) {
  useEffect(() => {
    consumer.subscriptions.create({
      channel: 'ActiveDriversChannel',
    }, {
      connected() { console.log('connected'); },
      received(data) { callback(data); },
    });
  }, []);

  return (
    <></>
  );
}
