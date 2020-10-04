import React from 'react'
import Badge from "./components/Badge";
export { Effect } from "./components/Badge/Effect";

const NotificationWidget = ({children, ...props}) => {
  return (
    <Badge {...props} >
      {children}
    </Badge>
  )
}

export default NotificationWidget;
