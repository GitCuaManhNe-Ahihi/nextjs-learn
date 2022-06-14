import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'
import React from 'react'

type Props = {
  posts:any[]
}

export default function Index({posts}: Props) {
  return (
    <>
    <ul>
      {posts.map((post:any) => (
        <li key={post.id}>
          <Link  href={`/post/${post.id}`}>
          <a>{post.title}</a>
          </Link>
      </li>))}
    </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props> = async (
  ctx:GetStaticPropsContext
) => {
  //server side
  //build runtime
  //hàm này gọi phía server có thể viết code server

  const res = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10')
  const {data} = await res.json()
  console.log(data)
  return {
    props: {
      posts:data?.map((item:any) =>({id:item.id,title:item.title}))
    },
  }
}
