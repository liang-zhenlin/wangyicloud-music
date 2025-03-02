import { useAppSelector, shallowEqualApp } from '@/store'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Carousel } from 'antd'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const TopBanner: FC<IProps> = () => {
  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqualApp
  )

  return (
    <BannerWrapper>
      <BannerLeft>
        <Carousel autoplay>
          {banners.map((item) => {
            return (
              <div className="item" key={item.imageUrl}>
                <img src={item.imageUrl} alt={item.typeTitle} />
              </div>
            )
          })}
        </Carousel>
      </BannerLeft>
      <BannerRight></BannerRight>
      <BannerControl></BannerControl>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
