import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
// import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
  return (
    <div className="nav">
      <h2>AppFooter</h2>
    </div>
  )
}

export default memo(AppFooter)
