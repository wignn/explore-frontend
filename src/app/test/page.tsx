import { headers } from "next/headers";

export default async function Sidebar() {
  const headerList = headers();
  const pathname = (await headerList).get("x-current-path");
  return (
    <div>
        <h1>Sidebar</h1>
        <p>Current path: {pathname}</p>
    </div>
  );
}