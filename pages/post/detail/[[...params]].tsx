import { useRouter } from "next/router";
import React from "react";

type Props = {};

export default function PostDetailAll({}: Props) {
  const route = useRouter();

  return <div>{JSON.stringify(route.query)}</div>;
}
// OPTIONAL ROUTE
