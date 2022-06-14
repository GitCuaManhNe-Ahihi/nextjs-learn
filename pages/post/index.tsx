import { GetStaticProps, GetStaticPropsContext } from 'next'
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
          <a href={`/post/${post.id}`}>{post.title}</a>
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
  return {
    props: {
      posts:data?.map((item:any) =>({id:item.id,title:item.title}))
    },
  }
}
