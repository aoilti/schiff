import React, { CSSProperties, MouseEvent } from 'react';

/**
 * Button properties.
 */
export interface ButtonPropTypes {
  hoverStartTime?: number;
  hoverStayTime?: number;
  prefixCls?: string;
  /**
   * 按钮类型，取值范围详见下方
   */
  type: ButtonTypes;
  /**
   * 是否加载中
   */
  loading?: boolean;
  activeStyle?: CSSProperties;
  className?: string;
  disabled?: boolean;
  /**
   * 按钮图标
   */
  icon?: React.ReactElement;
  /**
   * 按钮点击事件
   */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  style?: CSSProperties;
}

export interface ButtonState {
  isActive?: boolean;
  isHover?: boolean;
}

/** button type */
export type ButtonTypes =
  | 'button_xl_block_black_round'
  | 'button_xl_block_white_round'
  | 'button_xl_block_gray_round'
  | 'button_s_exact_black_round'
  | 'button_s_exact_blue_round'
  | 'button_s_exact_white_round'
  | 'button_s_exact_gray_round'
  | 'button_s_exact_gold_round'
  | 'button_m_exact_black_round'
  | 'button_m_exact_white_round'
  | 'button_m_exact_gray_round'
  | 'button_m_exact_gold_round'
  | 'button_l_exact_black_round'
  | 'button_l_exact_white_round'
  | 'button_l_exact_gray_round'
  | 'button_l_exact_gold_round'
  | 'button_xl_block_blue'
  | 'button_xs_fixed_black_round'
  | 'button_xs_fixed_gray_round'
  | 'button_xs_fixed_white_round'
  | 'button_xs_fixed_gold_round'
  | 'button_xs_fixed_blue_round'
  | 'button_xl_block_gold_round';
