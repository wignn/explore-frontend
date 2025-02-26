import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

export async function getServerSideProps() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
