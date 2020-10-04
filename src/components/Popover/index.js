import React from 'react'
import styles from '../../styles.module.css'

const Popover = React.forwardRef(
  ({
    title = "Title",
    content,
    className,
    width = 400,
    checked,
    onMarkRead,
    onMarkUnRead,
    popoverRef
  }, ref) => {
    const dimensions = ref.current.getBoundingClientRect()
    const { width: badgeWidth, height, top, left } = dimensions

    let arrowleft
    let popoverLeft = 0
    if ((badgeWidth/2 + left) < width/2) {
      arrowleft = badgeWidth/2 + left
    }

    if (left < (width/2 - badgeWidth/2)) {
      popoverLeft = left
    } else {
      popoverLeft = left - width/2 + badgeWidth/2
    }

    return (
      <div style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%'
      }} ref={popoverRef}>
        <div
          className={`${styles.popover} ${styles.popoverPlacementBottom} popover popover-placement-bottom ${className}`}
          style={{left: `${popoverLeft}px`, top: `${height}px`, transformOrigin: '50% -4px', width: `${width}px`}}
        >
          <div className="popover-content">
            <div className={`${styles.popoverArrow} popover-arrow`} style={{left: arrowleft + "px"}}>
              <span className="ant-popover-arrow-content"/>
            </div>
            <div
              className={`${styles.popoverInner} popover-inner`}
              role="tooltip"
            >
              <div className={`${styles.popoverTitle} popover-title`}>{title}</div>
              <div className={`${styles.popoverInnerContent} popover-inner-content`}>
                {content}
              </div>
              {checked.length > 0 && (
                <div className={`${styles.popoverFooter} popover-footer`}>
                  <button className={`${styles.popoverFooterBtn} popover-footer-btn-read`} onClick={onMarkRead}>Read</button>
                  <button className={`${styles.popoverFooterBtn} popover-footer-btn-unread`} onClick={onMarkUnRead}>Unread</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

Popover.displayName = 'Popover'

Popover.defaultProps = {
  placement: 'top',
  transitionName: 'zoom-big',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {},
}

export default Popover
