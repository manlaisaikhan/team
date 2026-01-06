import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Hero3D from "@/components/hero3D";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const name =
    user.firstName || user.emailAddresses?.[0]?.emailAddress || "User";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 3D Hero */}
      <div className="w-full">
        <Hero3D />
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Link href="/blogs">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Блог</h2>
              <p className="text-gray-600">Санал бодлоо хуваалцаарай</p>
            </div>
          </Link>

          <Link href="/news">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">IT Мэдээ</h2>
              <p className="text-gray-600">Шинэ мэдээлэл уншина уу</p>
            </div>
          </Link>

          <Link href="/points">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">Оноо</h2>
              <p className="text-gray-600">Онооны түүхээ харах</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
