import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Link } from 'react-router-dom'
import { Slider } from 'antd'
import { useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'
import { shallowEqual } from 'react-redux'
import { getSongPlayUrl } from '@/utils/handle-player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const { currentSong, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      playMode: state.player.playMode
    }),
    shallowEqual
  )

  useEffect(() => {
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        console.log('歌曲播放成功')
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('歌曲播放失败: ', err)
      })

    setDuration(currentSong.dt)
  }, [currentSong])

  function handleTimeUpdate() {
    const currentTime = audioRef.current!.currentTime
    const progress = ((currentTime * 1000) / duration) * 100
    setProgress(progress)
  }

  function handlePlayBtnClick() {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    setIsPlaying(!isPlaying)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="btn sprite_player prev"></button>
          <button className="btn sprite_player play"></button>
          <button className="btn sprite_player next"></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img src={getImageSize(currentSong?.al?.picUrl, 50)} alt=""></img>
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              <Slider value={progress} />
              <span className="current">00:52</span>
              <span className="divider">/</span>
              <span className="duration">04:52</span>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}></audio>
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
