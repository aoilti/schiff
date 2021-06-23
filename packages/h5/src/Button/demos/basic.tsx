import { Button } from 'wheat-devkits';
import { Component } from 'react';

export default class ButtonCmp extends Component {
  render() {
    return (
      <div className="button-groups">
        <Button type="button_xl_block_black_round">四个文字</Button>
        <Button type="button_xl_block_black_round" disabled={true}>
          四个文字
        </Button>
        <Button type="button_xl_block_black_round">
          字数太长了会发生什么事情
        </Button>
        <Button type="button_xl_block_black_round" disabled={true}>
          字数太长了会发生什么事情
        </Button>
        <Button type="button_xl_block_white_round">四个文字</Button>
        <Button type="button_xl_block_white_round" disabled={true}>
          四个文字
        </Button>
        <Button type="button_xl_block_gray_round">四个文字</Button>
        <Button type="button_xl_block_gray_round" disabled={true}>
          四个文字
        </Button>

        <Button type="button_xl_block_gold_round">四个文字</Button>
        <Button type="button_xl_block_gold_round" disabled={true}>
          四个文字
        </Button>
        <Button type="button_s_exact_black_round" icon="add-friend">
          好友
        </Button>
        <Button
          type="button_s_exact_black_round"
          disabled={true}
          icon="add-friend"
        >
          好友
        </Button>

        <Button type="button_s_exact_blue_round" icon="add-friend">
          好友
        </Button>
        <Button
          type="button_s_exact_blue_round"
          disabled={true}
          icon="add-friend"
        >
          好友
        </Button>

        <Button type="button_s_exact_white_round">不感兴趣</Button>
        <Button type="button_s_exact_white_round" disabled={true}>
          不感兴趣
        </Button>

        <Button type="button_s_exact_gray_round">最多是六个字</Button>
        <Button type="button_s_exact_gray_round" disabled={true}>
          最多是六个字
        </Button>

        <Button type="button_s_exact_gold_round">
          如果字数超了最后会长成啥样
        </Button>
        <Button type="button_s_exact_gold_round" disabled={true}>
          如果字数超了最后会长成啥样
        </Button>

        <Button type="button_m_exact_black_round">提交</Button>
        <Button type="button_m_exact_black_round" disabled={true}>
          提交
        </Button>
        <Button type="button_m_exact_white_round">不感兴趣</Button>
        <Button type="button_m_exact_white_round" disabled={true}>
          不感兴趣
        </Button>

        <Button type="button_m_exact_gray_round">最多是六个字</Button>
        <Button type="button_m_exact_gray_round" disabled={true}>
          最多是六个字
        </Button>

        <Button type="button_m_exact_gold_round">
          如果字数超了最后会长成啥样
        </Button>
        <Button type="button_m_exact_gold_round" disabled={true}>
          如果字数超了最后会长成啥样
        </Button>
        <Button type="button_l_exact_black_round">提交</Button>
        <Button type="button_l_exact_black_round" disabled={true}>
          提交
        </Button>

        <Button type="button_l_exact_white_round">不感兴趣</Button>
        <Button type="button_l_exact_white_round" disabled={true}>
          不感兴趣
        </Button>

        <Button type="button_l_exact_gray_round">
          如果字数超了最后会长成啥样
        </Button>
        <Button type="button_l_exact_gray_round" disabled={true}>
          四个文字
        </Button>

        <Button type="button_l_exact_gold_round">四个文字</Button>
        <Button type="button_l_exact_gold_round" disabled={true}>
          四个文字
        </Button>

        <Button type="button_xl_block_blue">大按钮最大字数十个字</Button>
        <Button type="button_xl_block_blue">如果字数超了最后会长成啥样</Button>
        <Button type="button_xl_block_blue" disabled={true}>
          好友
        </Button>
        <Button type="button_xs_fixed_black_round">跟读</Button>
        <Button type="button_xs_fixed_black_round" disabled={true}>
          跟读
        </Button>
        <Button type="button_xs_fixed_gray_round">去认证</Button>
        <Button type="button_xs_fixed_gray_round" disabled={true}>
          去认证
        </Button>
        <Button type="button_xs_fixed_white_round">去认证</Button>
        <Button type="button_xs_fixed_white_round" disabled={true}>
          去认证
        </Button>
        <Button type="button_xs_fixed_blue_round">关注</Button>
        <Button type="button_xs_fixed_blue_round" disabled={true}>
          关注
        </Button>
        <Button type="button_xs_fixed_gold_round">关注</Button>
        <Button type="button_xs_fixed_gold_round" disabled={true}>
          关注
        </Button>
      </div>
    );
  }
}
