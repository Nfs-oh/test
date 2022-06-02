import React from 'react';
import { WogooContainer } from './style';
import bridge from '@/config/JSbridge';
import { isIphone } from '@/utils';
import { useHistory } from 'react-router';
import WogooBG from '@/img/membership/bg_wgyd@2x.png';

import TitleLeftIcon from '@/img/membership/btzs_left@2x.png';
import TitleRightIcon from '@/img/membership/btzs_right@2x.png';

import Reason1 from '@/img/membership/ico_qlfg@2x.png';
import Reason2 from '@/img/membership/ico_mrgx@2x.png';
import Reason3 from '@/img/membership/ico_yx@2x.png';
import Reason4 from '@/img/membership/ico_cxdd@2x.png';
import WogooAlice from '@/img/membership/wogoo-alice@2x.png';

import WogooTable from '@/img/membership/wogoo-table@2x.png'

const WogooPoster = ({paied, from}) => {
  const history = useHistory();

  const handleLinkToRecharge = () => {
    bridge.callHandler('nativeEvent', {event: 'linkToRecharge'}, (result) => {
      try {
        const data = JSON.parse(result);
        if (data && data.params.result) {
          history.replace('/ranking50')
        }
      } catch (error) {
        console.log(error);
      }
    })
  }

  return (
    <WogooContainer>
      <div className={`wogoo-poster-body ${isIphone() ? '' : 'fixed-wogoo-bottom'}`}>
        <img src={WogooBG} className='poster-2' alt=''/>


        <div className='wogoo-title wogoo-title-fixed1 '>
          <img src={TitleLeftIcon} className='title-icon' alt=''/>
          <span className='title-text'>吾股异动展示案例</span>
          <img src={TitleRightIcon} className='title-icon' alt=''/>
        </div>

        <div className='wogoo-table'>
          <img src={WogooTable} alt='' className='wogoo-table-img'/>
        </div>

        <div className='wogoo-title '>
          <img src={TitleLeftIcon} className='title-icon' alt=''/>
          <span className='title-text'>避雷掘金神器</span>
          <img src={TitleRightIcon} className='title-icon' alt=''/>
        </div>

        <div className='wogoo-avoid'>
          <img alt='' src={WogooAlice} className='wogoo-avoid-img' />
        </div>

        <div className='wogoo-title'>
          <img src={TitleLeftIcon} className='title-icon' alt=''/>
          <span className='title-text'>选择理由</span>
          <img src={TitleRightIcon} className='title-icon' alt=''/>
        </div>

        <div className='wogoo-reason'>
          <div className='card-row'>
            <div className='wogoo-card'>
              <div className='wogoo-card-content'>
                <img src={Reason1} alt='' className='reason-img'/>
                <div className='wogoo-card-title'>全量覆盖</div>
              </div>
              <div className='wogoo-card-desc'>覆盖全量的上市公司底层数据</div>
            </div>
            <div className='card-split'/>
            <div className='wogoo-card'>
              <div className='wogoo-card-content'>
                <img src={Reason2} alt='' className='reason-img'/>
                <div className='wogoo-card-title'>每日更新</div>
              </div>
              <div className='wogoo-card-desc'>吾股排名每日更新，第一时间追踪最新动态</div>
            </div>
          </div>
          <div className='card-row'>
            <div className='wogoo-card'>
              <div className='wogoo-card-content'>
                <img src={Reason3} alt='' className='reason-img'/>
                <div className='wogoo-card-title'>优选50家</div>
              </div>
              <div className='wogoo-card-desc'>优选吾股排名升降幅度最大的前50家上市公司</div>
            </div>
            <div className='card-split'/>
            <div className='wogoo-card'>
              <div className='wogoo-card-content'>
                <img src={Reason4} alt='' className='reason-img'/>
                <div className='wogoo-card-title'>持续迭代</div>
              </div>
              <div className='wogoo-card-desc'>核心模型持续更新与迭代</div>
            </div>
          </div>
        </div>
        <div className='wogoo-exp'>风险提示：本产品不涉及投资咨询及投资顾问服务，所展示信息是基于上市公司公开披露数据汇总量化结果，包括但不限于财务、公告、股东、经营治理等相关数据。不构成投资建议，请理性参考。</div>
      </div>
      {from !== 'app' && <div className={`wogoo-poster-footer ${isIphone() ? '' : 'fixed-bottom'}`} onClick={handleLinkToRecharge}>
        <div className='link-btn'>{paied === '0' ? '付费解锁更多权益' : '立即续费'}</div>
      </div>}
    </WogooContainer>
  );
}

export default WogooPoster;