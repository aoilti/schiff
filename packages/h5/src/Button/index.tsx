import React, { TouchEvent, MouseEvent } from 'react';
// import PropTypes from 'prop-types';
import './style/index.scss';
import { ButtonPropTypes, ButtonState } from './button.types';
import { ButtonInsideIconColor, ButtonInsideIconSize } from './constant';

export default class Button extends React.Component<
  ButtonPropTypes,
  ButtonState
> {
  static defaultProps = {
    prefixCls: 'mui',
    type: 'button_s_fixed_lightblue',
    disabled: false,
    loading: false,
    // inline: false,
    // disabled: false,
    // loading: false,
    // activeStyle: {},
  };
  /**
   * Touchmove boundary, beyond which a click will be cancelled.
   *
   * @type number
   */
  touchBoundary: number;

  /**
   * The minimum time between tap(touchstart and touchend) events
   *
   * @type number
   */
  tapDelay: number;

  /**
   * The maximum time for a tap
   *
   * @type number
   */
  tapTimeout: number;

  /**
   * iOS requires exceptions.
   *
   * @type boolean
   */
  deviceIsIOS: boolean;

  /**
   * Android requires exceptions.
   *
   * @type boolean
   */
  deviceIsAndroid: boolean;

  /**
   * Timestamp for when click tracking started.
   *
   * @type number
   */
  trackingClickStart: number;

  /**
   * The element being tracked for a click.
   *
   * @type EventTarget
   */
  trackingClick: boolean;
  targetElement: any;
  startTime: any;
  touchStartX: number;
  touchStartY: number;
  lastClickTime: number;
  cancelNextClick: boolean;
  insideIconSizeMaps: { [key: string]: number | string } = ButtonInsideIconSize;

  insideIconColorMaps: { [key: string]: string } = ButtonInsideIconColor;
  state = {
    isActive: false,
  };
  constructor(props: Readonly<ButtonPropTypes>) {
    super(props);
    this.touchBoundary = 10;
    this.tapDelay = 200;
    this.tapTimeout = 700;
    this.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;
    this.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
    this.trackingClickStart = 0;
    this.trackingClick = false;
    this.startTime = 0;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.lastClickTime = 0;
    this.cancelNextClick = false;
  }
  componentDidMount() {
    // const button = this.myRef.current;
    // button.addEventListener('click', this.onClick, true);
  }
  onTouchStart = (event: any) => {
    const touch = event.targetTouches[0];
    this.startTime = new Date();
    const targetElement = this.getTargetElementFromEventTarget(
      event.nativeEvent.target,
    );
    this.trackingClick = true;
    this.trackingClickStart = event.timeStamp;
    this.targetElement = targetElement;

    this.touchStartX = touch.pageX;
    this.touchStartY = touch.pageY;
    this.setState({
      isActive: true,
    });

    return true;
  };
  onTouchMove = (event: any) => {
    if (!this.trackingClick) {
      return true;
    }

    // If the touch has moved, cancel the click tracking
    if (
      this.targetElement !==
        this.getTargetElementFromEventTarget(event.target) ||
      this.touchHasMoved(event)
    ) {
      this.trackingClick = false;
    }

    return true;
  };
  onTouchEnd = (event: TouchEvent) => {
    let trackingClickStart;
    const targetElement = this.targetElement;
    this.setState({
      isActive: false,
    });

    if (!this.trackingClick) {
      return true;
    }

    // Prevent phantom clicks on fast double-tap (issue #36)
    if (event.timeStamp - this.lastClickTime < this.tapDelay) {
      this.cancelNextClick = true;
      return true;
    }

    if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
      return true;
    }

    this.lastClickTime = event.timeStamp;

    trackingClickStart = this.trackingClickStart;
    this.trackingClick = false;
    this.trackingClickStart = 0;

    // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
    // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
    if (event.timeStamp - trackingClickStart > 100) {
      this.targetElement = null;
      return false;
    }

    event.stopPropagation();
    event.preventDefault();
    this.sendClick(targetElement, event);
    return false;
  };
  /**
   * Send a click event to the specified element.
   *
   * @param {EventTarget|Element} targetElement
   * @param {Event} event
   */
  sendClick = (targetElement: Element, event: TouchEvent) => {
    let clickEvent;
    let touch;

    // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
    if (
      document.activeElement &&
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== targetElement
    ) {
      document.activeElement.blur();
    }

    touch = event.changedTouches[0];

    // Synthesise a click event, with an extra attribute so it can be tracked
    clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent(
      this.determineEventType(targetElement),
      true,
      true,
      window,
      1,
      touch.screenX,
      touch.screenY,
      touch.clientX,
      touch.clientY,
      false,
      false,
      false,
      false,
      0,
      null,
    );
    // todo
    // clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
  };
  determineEventType = (targetElement: { tagName: string }) => {
    // Issue #159: Android Chrome Select Box does not open with a synthetic click event
    if (
      this.deviceIsAndroid &&
      targetElement.tagName.toLowerCase() === 'select'
    ) {
      return 'mousedown';
    }

    return 'click';
  };

  onClick = (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const { onClick } = this.props;
    if (typeof onClick === 'function') {
      onClick(event);
    }
    event.stopPropagation();
    event.preventDefault();
  };
  onTouchCancel = () => {
    this.trackingClick = false;
    this.setState({
      isActive: false,
    });
  };

  getTargetElementFromEventTarget = (eventTarget: {
    nodeType: number;
    parentNode: any;
  }) => {
    // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
    if (eventTarget.nodeType === Node.TEXT_NODE) {
      return eventTarget.parentNode;
    }

    return eventTarget;
  };
  touchHasMoved = (event: { changedTouches: any[] }) => {
    const touch = event.changedTouches[0];
    const boundary = this.touchBoundary;

    if (
      Math.abs(touch.pageX - this.touchStartX) > boundary ||
      Math.abs(touch.pageY - this.touchStartY) > boundary
    ) {
      return true;
    }

    return false;
  };
  retreiveIconProps = (icon: string, buttonType: string, disabled: boolean) => {
    if (!buttonType || !icon) return {};

    const props: { width?: string; height?: string; color: string } = {
      color: 'disabled',
    };
    const vectors: string[] = buttonType.split('_');
    if (vectors.length >= 4) {
      props.width = this.insideIconSizeMaps[vectors[1]] as string;
      props.height = this.insideIconSizeMaps[vectors[1]] as string;
      if (!disabled) {
        props.color = this.insideIconColorMaps[vectors[3]];
      }
    }

    return props;
  };
  generateIconElement = () => {
    const { loading, icon, prefixCls, type, disabled } = this.props;
    const iconType = loading ? 'loading' : icon;
    const customStyle = { marginRight: '4.5px' };

    let iconEle = null;
    if (typeof iconType === 'string') {
      // const props = this.retreiveIconProps(icon, type, disabled);
      iconEle = (
        <div></div>
        // <Icon
        //     kind={iconType}
        //     className={`${prefixCls}-icon`}
        //     style={customStyle}
        //     { ...props }
        // />
      );
    } else if (iconType) {
      const rawCls = iconType.props && iconType.props.className;
      iconEle = React.cloneElement(iconType, {
        style: customStyle,
        className: `${prefixCls}-icon ${rawCls}`,
      });
    }

    return iconEle;
  };
  render() {
    const { disabled, prefixCls, type, style } = this.props;
    const { isActive } = this.state;
    const buttonCls = `${prefixCls}_${type}`;
    const combinedCls = `${prefixCls}_button ${buttonCls} ${
      disabled
        ? `${prefixCls}_button_disabled`
        : isActive
        ? `${prefixCls}_button_active`
        : ''
    }`;
    const iconEle = this.generateIconElement();

    return (
      <button
        unselectable="on"
        className={combinedCls}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        onTouchCancel={this.onTouchCancel}
        disabled={disabled}
        onClick={this.onClick}
        style={style}
        // style={{ backgroundColor: '#D0DFFF' }}
      >
        {iconEle}
        {this.props.children}
      </button>
    );
  }
}
