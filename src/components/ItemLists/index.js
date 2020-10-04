import React from "react"
import PropTypes from "prop-types"
import styles from '../../styles.module.css'

import { defaultTheme } from "../../theme"

const Item = ({
  item,
  onClick,
  className,
  style,
  onCheck,
  isChecked,
  checked
}) => {
  const { id, desc, read } = item

  const handleOnCLick = () => {
    onClick(item)
  }

  const handleOnCheck = e => {
    e.stopPropagation()
    let updatedValues = [...checked]
    if (isChecked) {
      updatedValues = checked.filter(c => c !== id)
    } else {
      updatedValues.push(id)
    }
    onCheck(updatedValues)
  }

  return (
    <li
      style={style}
      key={id}
      className={`${styles.popoverListItem} ${read ? "" : styles.popoverListItemRead} ${onClick && styles.popoverListItemHover} ${className}`}
    >
      <input type="checkbox" className={styles.checkbox} onChange={handleOnCheck} checked={isChecked}/>
      <p
      onClick={onClick ? handleOnCLick : null}>{desc}</p>
    </li>
  )
}

const ItemLists = ({
  data,
  onClickItem,
  theme,
  className,
  itemClassName,
  onCheck,
  checked,
  renderItem
}) => {
  let { listContainerStyle, listItemStyle } = defaultTheme
  const { listStyle, itemStyle } = theme
  listContainerStyle = { ...listContainerStyle, ...listStyle }
  listItemStyle = { ...listItemStyle, itemStyle }

  return (
    <ul className={`${styles.popoverListMainContainer} ${className}`} style={{listContainerStyle}}>
      {
        data.map(d => renderItem ? renderItem(d) : <Item
                        item={d}
                        key={d.id}
                        onClick={onClickItem}
                        className={itemClassName}
                        style={listItemStyle}
                        onCheck={onCheck}
                        isChecked={checked.includes(d.id)}
                        checked={checked}
                      />)
      }
    </ul>
  )
}

ItemLists.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  onItemClick: PropTypes.func
}

ItemLists.defaultProps = {
  data: []
}

export default ItemLists