import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

type Props = {
  post: {id:string,title:string, description:string,imageUrl:string};
};

export default function PostDetail({ post }: Props) {
  const route = useRouter();
  if(route.isFallback) {
    return <div>Loading...</div> // fallback page when mode true
  }
  if(!post) {
    return null;
  }

  return <>
  <div>{post.id}</div>
  <h1>{post.title}</h1>
  <p>{post.description}</p>
 <img src={post.imageUrl} alt={post.title} width={300} height={300} />
  </>;
}
// DYNAMIC ROUTE

export const getStaticPaths: GetStaticPaths = async () => {
  //server side
  //build runtime
  console.log("getStaticPath");
  const res = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10"
  );
  const { data } = await res.json();

  return {
    paths: data.map((item: any) => ({
      params: { postId: item.id },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (
  ctx: GetStaticPropsContext
) => {
  //server side
  //build runtime
  //hàm này gọi phía server có thể viết code server
  if(!ctx.params?.postId){
    return {notFound:true}
  }
  const res = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10"
  );
  const { data } = await res.json();
  const {id,title, description,imageUrl} = data?.filter((item: any) => (item.id === ctx.params?.postId))[0]

  return {
    props: {
      post:{id,title, description,imageUrl} ,
    },
    revalidate:10 //point to second re-render new data each 10s when user visit this page
  };
};
