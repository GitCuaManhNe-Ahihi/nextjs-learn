import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Props = {};

export default function Information({}: Props) {
  const router = useRouter();
  const [list, setList] = useState<any[]>([]);
  const page = Number(router.query.page) || 1;
  useEffect( () => {
   if(page) {
    ;(async ()=>{
      const res = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`);
      const data = await res.json();
      setList(data.data);
    })()
   }
  }, [page]);

  const handleNext = () => {
    router.push(
      {
        pathname: "/information",
        query: { page: page + 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      {
        list.length > 0 && <ul>
        {list.map((item: any) => (
          <li key={item.id}>
            <a>{item.title}</a>
          </li>
        ))}
      </ul>
      }
      <button onClick={() => handleNext()}>Next</button>
    </>
  );
}
