import { getServerSession } from "next-auth";

export default async function Home() {
  const details = await getServerSession();

  return <div>{JSON.stringify(details)}</div>;
}
