# Bug Testing Platform

Вебсайтуудыг шалгаж, алдаа олох платформ. Энэхүү платформ нь хэрэглэгчдэд вебсайтуудыг шалгаж, алдаа олох, блог хуваалцах, IT мэдээ унших боломжийг олгодог.

## Технологийн стек

- **Next.js 14** - React framework (App Router)
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **Prisma** - ORM
- **Clerk** - Authentication
- **Gemini AI** - Bug verification
- **Tailwind CSS** - Styling
- **Shadcn UI** - UI components

## Шаардлага

- Node.js 18+ 
- PostgreSQL database
- Clerk account (authentication)
- Gemini API key (AI verification)

## Суулгалт

Дэлгэрэнгүй тохируулгын зааварчилгааг [SETUP.md](./SETUP.md) файлаас уншина уу.

### Хурдан эхлэх:

1. **Dependencies суулгах:**
```bash
npm install
```

2. **Environment variables тохируулах:**
`.env.local` файл үүсгэж дараах утгуудыг оруулна:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/bug_testing_db"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...  # Clerk Dashboard-аас
CLERK_SECRET_KEY=sk_test_...                    # Clerk Dashboard-аас
WEBHOOK_SECRET=whsec_...                        # Clerk Webhook-аас (сонголттой)
GEMINI_API_KEY=AIzaSy...                        # Google AI Studio-аас
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Clerk Keys авах:**
- [Clerk Dashboard](https://dashboard.clerk.com) руу очно
- Application үүсгэнэ
- API Keys хэсгээс keys-уудыг авна

**Gemini API Key авах:**
- [Google AI Studio](https://makersuite.google.com/app/apikey) руу очно
- API Key үүсгэнэ

3. **Database migration хийх:**
```bash
npx prisma migrate dev
npx prisma generate
```

4. **Development server ажиллуулах:**
```bash
npm run dev
```

Аппликейшн `http://localhost:3000` хаягт нээгдэнэ.

## Онцлогууд

### 1. Authentication (Clerk)
- Email/password бүртгэл, нэвтрэх
- Social authentication (Google, GitHub гэх мэт)

### 2. User Test Section
- Хэрэглэгчид вебсайтаа шалгуулах
- Бусдын вебсайтуудыг шалгаж алдаа олох
- Gemini AI алдааны зөв эсэхийг шалгана
- Оноо авах систем

### 3. Blog Section
- Пост бичих, хуваалцах
- Сэтгэгдэл бичих

### 4. IT News Section
- IT мэдээ унших
- Админ болон хэрэглэгчид мэдээ нэмэх

### 5. Points System
- Алдаа олох үед оноо авах
- Онооны түүх харах

## API Endpoints

### Users
- `GET /api/users/:id/bugs` - Хэрэглэгчийн алдаанууд
- `GET /api/users/:id/points` - Хэрэглэгчийн оноо

### Projects
- `GET /api/projects` - Бүх төслүүд
- `POST /api/projects` - Төсөл үүсгэх
- `GET /api/projects/:id` - Төслийн дэлгэрэнгүй
- `GET /api/projects/:id/bugs` - Төслийн алдаанууд

### Bugs
- `POST /api/bugs` - Алдаа илгээх
- `GET /api/bugs/:id` - Алдааны дэлгэрэнгүй
- `POST /api/bugs/:id/review` - Алдаа шалгах (Admin only)

### Points
- `GET /api/points` - Одоогийн оноо
- `GET /api/points/transactions` - Онооны түүх
- `POST /api/points` - Оноо нэмэх
- `POST /api/points/deduct` - Оноо хасах

### News
- `GET /api/news` - Бүх мэдээ
- `POST /api/news` - Мэдээ нэмэх
- `PUT /api/news/:id` - Мэдээ засах (Admin only)
- `DELETE /api/news/:id` - Мэдээ устгах (Admin only)

### Blogs
- `GET /api/blogs` - Бүх блогууд
- `GET /api/blogs/:id` - Блогийн дэлгэрэнгүй
- `POST /api/blogs` - Блог үүсгэх
- `PUT /api/blogs/:id` - Блог засах
- `DELETE /api/blogs/:id` - Блог устгах
- `GET /api/blogs/:id/comments` - Сэтгэгдлүүд
- `POST /api/comments` - Сэтгэгдэл нэмэх
- `PUT /api/comments/:id` - Сэтгэгдэл засах
- `DELETE /api/comments/:id` - Сэтгэгдэл устгах

## User Flows

### 1. Post Submission Flow
1. Хэрэглэгч нэвтрэх
2. "Шалгуулах" товч дарах
3. Вебсайтын мэдээлэл оруулах (Гарчиг, Тайлбар, URL, Скриншот)
4. Илгээх
5. Бусдын харж шалгах боломжтой болно

### 2. Testing Flow
1. Хэрэглэгч нэвтрэх
2. "Шалгах" товч дарах
3. Шалгах вебсайт сонгох
4. Алдааны тайлбар бичих, скриншот оруулах
5. Илгээх
6. Admin шалгаж, AI-аар баталгаажуулахад оноо авах

### 3. Admin Flow
1. Admin нэвтрэх
2. Хэрэглэгчдийн жагсаалт харах
3. Хэрэглэгч сонгох
4. Хэрэглэгчийн мэдээлэл, постууд, шалгалтын түүх харах
5. Хэрэглэгч идэвхгүй болгох, пост засах/устгах, эрх өөрчлөх

## Database Schema

- **User** - Хэрэглэгчийн мэдээлэл, оноо
- **Project** - Шалгуулах вебсайтууд
- **Bug** - Олдсон алдаанууд
- **Blog** - Блог постууд
- **Comment** - Блогийн сэтгэгдлүүд
- **News** - IT мэдээ
- **PointTransaction** - Онооны гүйлгээний түүх

## Deployment

Vercel дээр deploy хийх:

1. GitHub repository үүсгэх
2. Vercel дээр project үүсгэх
3. Environment variables тохируулах
4. Deploy хийх

## Тэмдэглэл

- Clerk authentication шаардлагатай
- Gemini API key шаардлагатай (bug verification-д)
- PostgreSQL database шаардлагатай
- Production дээр database connection pooling ашиглахыг зөвлөж байна

