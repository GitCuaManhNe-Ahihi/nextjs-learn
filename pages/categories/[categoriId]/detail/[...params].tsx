import { useRouter } from "next/router";
import React from "react";

type Props = {};

export default function DetailCategories({}: Props) {
  const route = useRouter();
  return (
    <>
      <div>Parameter</div>
      <p>{JSON.stringify(route.query)}</p>
    </>
  );
}
// catch all route
