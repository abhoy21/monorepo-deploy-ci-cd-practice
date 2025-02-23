import { prisma } from "@repo/db/client";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.username}</h1>
        </div>
      ))}
    </div>
  );
}

// export const revalidate = 60 // revalidate every 60 seconds
// or
export const dynamic = "force-dynamic";
