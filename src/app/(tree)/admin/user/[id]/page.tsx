import Search from "./search";
import Section from "./section";

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await params).id;
  const action = (await searchParams).action;
  return (
    <>
      <h1>User: {id}</h1>
      {action && <p>Action: {action}</p>}
      <Section />
      <Search />
    </>
  );
}
