export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Тохируулга хийх шаардлагатай</h1>
        
        <div className="space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h2 className="font-semibold text-yellow-800 mb-2">⚠️ Clerk API Keys алга байна</h2>
            <p className="text-yellow-700 mb-4">
              Аппликейшнийг ажиллуулахын тулд Clerk authentication тохируулах шаардлагатай.
            </p>
            
            <div className="space-y-3">
              <h3 className="font-medium text-yellow-800">Алхам 1: Clerk Account үүсгэх</h3>
              <ol className="list-decimal list-inside space-y-2 text-yellow-700 ml-4">
                <li><a href="https://dashboard.clerk.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Clerk Dashboard</a> руу очно</li>
                <li>"Create Application" товч дарах</li>
                <li>Application нэр өгөх</li>
                <li>Email/Password authentication сонгох</li>
              </ol>
              
              <h3 className="font-medium text-yellow-800 mt-4">Алхам 2: API Keys авах</h3>
              <ol className="list-decimal list-inside space-y-2 text-yellow-700 ml-4">
                <li>Clerk Dashboard дээр "API Keys" хэсэгт очно</li>
                <li>Publishable Key болон Secret Key-ийг хуулж авна</li>
              </ol>
              
              <h3 className="font-medium text-yellow-800 mt-4">Алхам 3: Environment Variables тохируулах</h3>
              <p className="text-yellow-700 mb-2">Project root directory дээр <code className="bg-yellow-100 px-2 py-1 rounded">.env.local</code> файл үүсгэнэ:</p>
              <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`DATABASE_URL="postgresql://user:password@localhost:5432/bug_testing_db"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=AIzaSy...
NEXT_PUBLIC_APP_URL=http://localhost:3000`}
              </pre>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="font-semibold text-blue-800 mb-2">📚 Дэлгэрэнгүй зааварчилгаа</h2>
            <p className="text-blue-700">
              Бүрэн тохируулгын зааварчилгааг <code className="bg-blue-100 px-2 py-1 rounded">SETUP.md</code> файлаас уншина уу.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="font-semibold text-green-800 mb-2">✅ Тохируулга хийсний дараа</h2>
            <ol className="list-decimal list-inside space-y-2 text-green-700 ml-4">
              <li>Database migration хийх: <code className="bg-green-100 px-2 py-1 rounded">npx prisma migrate dev</code></li>
              <li>Server дахин эхлүүлэх: <code className="bg-green-100 px-2 py-1 rounded">npm run dev</code></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

