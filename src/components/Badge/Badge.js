import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import AnimationCounter from './AnimationCounter'
import ItemLists from '../ItemLists'
import { defaultTheme } from '../../theme'
import Popover from '../Popover'

class Badge extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.badgeRef = React.createRef()
    this.popoverRef= React.createRef()
  }

  componentDidMount() {
    window.addEventListener('click', this.closePopver)
  }

  closePopver = e => {
    if (this.popoverRef.current &&
      this.badgeRef.current &&
      e.target !== this.popoverRef.current &&
      e.target !== this.badgeRef.current &&
      !this.popoverRef.current.contains(e.target) &&
      !this.badgeRef.current.contains(e.target)) {
      this.setState({showPopup: false})
    }
  }

  onToggleBadge = e => this.setState(prevState => ({ showPopup: !prevState.showPopup }))
  
  render() {
    const {
      style,
      containerStyle,
      theme = {},
      themeBadgeKey,
      themeBadgeContainerKey,
      label,
      className,
      effect,
      frameLength,
      fps,
      onItemClick,
      renderItem,
      data,
      children,
      onCheck,
      checked,
      onMarkRead,
      onMarkUnRead,
      ...restProps
    } = this.props
    const count = data.filter(d => !d.read).length
    const { showPopup } = this.state

    let badgeStyle = theme[themeBadgeKey || 'badge'] || {}
    let badgeContainerStyle = theme[themeBadgeContainerKey || 'badgeContainer'] || {}
    badgeStyle = { ...defaultTheme.badge, ...badgeStyle, ...style }
    badgeContainerStyle = { ...defaultTheme.container, ...badgeContainerStyle, ...containerStyle }

    const value = count > 0 ?
      <AnimationCounter
        key='badgekey'
        style={badgeStyle}
        className={className}
        count={count}
        label={label}
        effect={effect}
        fps={fps}
        frameLength={frameLength}
      />
      : undefined

    return (
      <Fragment>
        <div style={badgeContainerStyle} onClick={this.onToggleBadge} ref={this.badgeRef}>
          {children}
          {value}
        </div>
        {showPopup && (
          <Popover content={<ItemLists
            onClickItem={onItemClick}
            renderItem={renderItem}
            data={data}
            theme={theme}
            onCheck={onCheck}
            checked={checked}
          />}
            ref={this.badgeRef}
            checked={checked}
            onMarkRead={onMarkRead}
            onMarkUnRead={onMarkUnRead}
            popoverRef={this.popoverRef}
            {...restProps}
          />
        )}
      </Fragment>
    )
  }
}

Badge.propTypes = {
  containerStyle: PropTypes.object,
  count: PropTypes.number,
  label: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  effect: PropTypes.array,
  fps: PropTypes.number,
  frameLength: PropTypes.number,
  onItemClick: PropTypes.func,
  theme: PropTypes.object,
  renderItem: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.object),
  onCheck: PropTypes.func,
  checked: PropTypes.array,
  onMarkRead: PropTypes.func,
  onMarkUnRead: PropTypes.func
}

Badge.defaultProps = {
  count: 0,
  style: {},
  containerStyle: {},
  theme: {},
  data: []
}

export default Badge
