import { useRouter } from "next/router";
import React from "react";

type Props = {};

export default function PostDetail({}: Props) {
  const route = useRouter();

  return <div>{JSON.stringify(route.query)}</div>;
}
// DYNAMIC ROUTE
