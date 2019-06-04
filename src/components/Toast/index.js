import React from 'react';
import Notification from 'rmc-notification';
import styels from './index.module.css';

let notificationInstance = null;

function Icon(props) {
  const { icon } = props;
  return (
    <div className={styels.icon_wrapper}>
      <img src={icon} alt="图标" />
    </div>
  );
}

function Toast(props) {
  const { text, icon } = props;
  return (
    <div className={styels.toast_wrapper}>
      {icon}
      <p>{text}</p>
    </div>
  );
}
function notice(content, duration, onClose, closable) {
  const key = Date.now();
  if (!notificationInstance) {
    Notification.newInstance(
      {
        prefixCls: 'toast',
      },
      notification => {
        if (notificationInstance) {
          notification.destroy();
          return;
        }
        notificationInstance = notification;
        notificationInstance.notice({
          key,
          content,
          duration,
          onClose,
          closable,
        });
      }
    );
  } else {
    notificationInstance.notice({
      key,
      content,
      duration,
      onClose,
      closable,
    });
  }

  return key;
}

export default {
  loading: text => {
    const key = notice(
      <Toast text={text} icon={<Icon icon={require('../../assets/icons/icon_loading.png')} />} />,
      0,
      () => {},
      false
    );
    return () => {
      notificationInstance.removeNotice(key);
    };
  },
  info: text => {
    notice(<Toast text={text} />, 1.2, () => {}, true);
  },
};
