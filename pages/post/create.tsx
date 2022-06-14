import { GetServerSideProps, GetServerSidePropsContext } from "next"

type Props = {
  query:any,
  post:{title:string, author:string,description:string}
}

export default function Create(props: Props) {
  return (
    <>
    <p>Post detail</p>
    <p>{props.post.title}</p>
    <p>{props.post.author}</p>
    <p>{props.post.description}</p>
    </>
  )
}
export async function getServerSideProps(contex: GetServerSidePropsContext){
  contex.res.setHeader('Cache-Control', 's-maxage=15') // 5 seconds
  await new Promise((resolve,rejects) => setTimeout(()=>resolve(3000), 3000))
  const postId = contex.query.postId
  const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
  const post = await response.json()
  return {
    props: {
      query:contex.query,
      post:post

    }
  }
}
