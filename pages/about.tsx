import React from 'react'
import dynamic from 'next/dynamic'

const Header = dynamic(()=>import('@/components/common/Header'),{ssr:false})
export interface Props {
}

const About = (props: Props) => {
  return (
    <>
    <Header/>
    </>
  )
}

export default About
