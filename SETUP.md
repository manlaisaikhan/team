# Тохируулгын зааварчилгаа

## 1. Clerk Authentication тохируулах

### Алхам 1: Clerk account үүсгэх
1. [Clerk Dashboard](https://dashboard.clerk.com) руу очоод бүртгүүлэх эсвэл нэвтрэх
2. "Create Application" товч дарах
3. Application нэр өгөх (жишээ: "Bug Testing Platform")
4. Authentication method сонгох:
   - Email/Password (заавал)
   - Social providers (сонголттой): Google, GitHub гэх мэт

### Алхам 2: API Keys авах
1. Clerk Dashboard дээр "API Keys" хэсэгт очно
2. Дараах keys-уудыг хуулж авна:
   - **Publishable Key** (NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
   - **Secret Key** (CLERK_SECRET_KEY)

### Алхам 3: Webhook тохируулах (сонголттой)
1. Clerk Dashboard дээр "Webhooks" хэсэгт очно
2. "Add Endpoint" товч дарах
3. Endpoint URL оруулна: `https://yourdomain.com/api/webhooks/clerk`
4. Events сонгоно:
   - `user.created`
   - `user.updated`
   - `user.deleted`
5. **Signing Secret**-ийг хуулж авна (WEBHOOK_SECRET)

## 2. Gemini API Key авах

### Алхам 1: Google AI Studio руу очно
1. [Google AI Studio](https://makersuite.google.com/app/apikey) руу очно
2. Google account-аараа нэвтрэнэ

### Алхам 2: API Key үүсгэх
1. "Create API Key" товч дарах
2. Project сонгох эсвэл шинээр үүсгэнэ
3. API Key-ийг хуулж авна (GEMINI_API_KEY)

## 3. PostgreSQL Database тохируулах

### Сонголт 1: Local PostgreSQL
```bash
# PostgreSQL суулгах (macOS)
brew install postgresql
brew services start postgresql

# Database үүсгэх
createdb bug_testing_db
```

### Сонголт 2: Cloud Database (Supabase, Neon, гэх мэт)
1. [Supabase](https://supabase.com) эсвэл [Neon](https://neon.tech) дээр account үүсгэнэ
2. Database үүсгэнэ
3. Connection string-ийг авна

## 4. Environment Variables тохируулах

Project-ийн root directory дээр `.env.local` файл үүсгэнэ:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bug_testing_db"

# Clerk Authentication (Clerk Dashboard-аас авна)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
WEBHOOK_SECRET=whsec_...

# Gemini AI (Google AI Studio-аас авна)
GEMINI_API_KEY=AIzaSy...

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Анхаар:** `.env.local` файлыг git-д commit хийхгүй байх (аль хэдийн .gitignore дотор байна)

## 5. Database Migration

```bash
# Dependencies суулгах
npm install

# Database migration хийх
npx prisma migrate dev --name init

# Prisma Client generate хийх
npx prisma generate
```

## 6. Development Server ажиллуулах

```bash
npm run dev
```

Аппликейшн `http://localhost:3000` хаягт нээгдэнэ.

## Асуудал шийдвэрлэх

### Clerk keys алга байна
- `.env.local` файл үүсгэсэн эсэхийг шалгана
- Clerk Dashboard-аас keys-уудыг зөв хуулж авсан эсэхийг шалгана
- Server-ийг дахин эхлүүлнэ (`npm run dev`)

### Database connection алдаа
- PostgreSQL ажиллаж байгаа эсэхийг шалгана
- DATABASE_URL зөв эсэхийг шалгана
- Database үүссэн эсэхийг шалгана

### Prisma migration алдаа
- Database connection зөв эсэхийг шалгана
- `npx prisma migrate reset` ашиглан дахин оролдоно (⚠️ бүх өгөгдөл устана)

## Дараагийн алхам

1. Clerk-д нэвтрэх/бүртгүүлэх хуудсуудыг туршина
2. Database-д хэрэглэгч үүсч байгаа эсэхийг шалгана
3. Вебсайт шалгуулах, алдаа олох функцийг туршина

