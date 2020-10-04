import React, { useState } from 'react';
import NotificationWidget, { Effect }  from 'notification-widget';
import 'notification-widget/dist/index.css'
import { data } from './data';

const title = {
  width: '100px'
}

const container = {
  height: '50px',
  width: '50px',
  display: 'inline-block',
  margin: '5px',
  backgroundColor: 'gray'
}

const Item = ({
  className,
  effect,
  data,
  label
}) => {
  const [items, setItems] = useState(data);
  const [checked, setChecked] = useState([]);

  const onItemClick = d => {
    const updatedItems = items.map(item => {
      if (item.id === d.id) {
        return {
          ...item,
          read: true
        };
      }
      return item
    })

    setItems(updatedItems)
  };
  const onCheck = values => setChecked(values);
  const onMarkRead = () => updatedItems(true);
  const onMarkUnread = () => updatedItems(false);

  const updatedItems = flag => {
    const updatedItems = items.map(item => {
      if (checked.includes(item.id)) {
        return {
          ...item,
          read: flag
        };
      }
      return item
    })

    setItems(updatedItems)
    setChecked([]);
  }

  const renderItem = d => {}

  return (
    <div style={{width: '200px', display: 'flex', alignItems: 'center'}}>
      <div>
        <NotificationWidget 
          className={className}
          effect={effect}
          data={items}
          onItemClick={onItemClick}
          onCheck={onCheck}
          checked={checked}
          onMarkRead={onMarkRead}
          onMarkUnRead={onMarkUnread}
        >
          <div style={container}/>
        </NotificationWidget>
      </div>
      <div style={title}>{label}</div>
    </div>
  )
}

class App extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', marginTop: '10px'}}>
        <Item
          className='abc'
          effect={Effect.ROTATE_X}
          data={data}
          label={'Effect.ROTATE_X'}
        />
        <Item
          effect={Effect.ROTATE_X}
          data={data}
          label={'Effect.ROTATE_Y'}
        />
        <Item
          effect={Effect.SCALE}
          data={data}
          label={'Effect.SCALE'}
        />
        <Item
          effect={[null, null, {top:'-5px'}, {top:'0px'}]}
          data={data}
          label={'Custome effect'}
        />
        <Item
          effect={Effect.SCALE}
          data={data}
          label={'frameLength:15.0'}
        />
      </div>
    )
  }
};

export default App;