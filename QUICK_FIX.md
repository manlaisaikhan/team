# Шуурхай засвар: Database Connection Алдаа

## Асуудал
```
POST /api/projects 500 in 10ms
Error: P1001: Can't reach database server at `localhost:5432`
```

## Шийдэл

### Сонголт 1: Supabase ашиглах (Хамгийн хурдан, үнэгүй)

1. **Supabase account үүсгэх:**
   - [supabase.com](https://supabase.com) руу очно
   - "Start your project" дарах
   - Google/GitHub-аар бүртгүүлнэ

2. **Project үүсгэх:**
   - "New Project" дарах
   - Project нэр, database password оруулна
   - Region сонгоно (хэрэв Монголд байвал Singapore сонгоно)
   - "Create new project" дарах (2-3 минут зарцуулна)

3. **Connection string авах:**
   - Project нээгдсэний дараа
   - Settings → Database руу очно
   - "Connection string" хэсэгт "URI" сонгоно
   - Connection string-ийг хуулж авна
   - Жишээ: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

4. **`.env.local` файлд оруулах:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
   ```
   (YOUR_PASSWORD болон xxxxx-ийг өөрийн утгаар солино)

5. **Migration хийх:**
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Server дахин эхлүүлэх:**
   ```bash
   npm run dev
   ```

### Сонголт 2: Local PostgreSQL

1. **PostgreSQL суулгах:**
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   ```

2. **Database үүсгэх:**
   ```bash
   createdb bug_testing_db
   ```

3. **`.env.local` файлд connection string засах:**
   ```env
   DATABASE_URL="postgresql://$(whoami)@localhost:5432/bug_testing_db"
   ```
   
   Эсвэл password байвал:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/bug_testing_db"
   ```

4. **Migration хийх:**
   ```bash
   npx prisma migrate dev --name init
   ```

### Сонголт 3: Neon (Үнэгүй, хурдан)

1. [neon.tech](https://neon.tech) руу очно
2. "Sign up" дарах
3. "Create a project" дарах
4. Connection string-ийг авна
5. `.env.local` файлд оруулна
6. Migration хийх

## Database Connection Шалгах

Migration хийсний дараа:

```bash
# Browser дээр эсвэл terminal-аас
curl http://localhost:3000/api/health
```

Хэрэв `{"status":"ok","database":"connected"}` гэж харагдвал амжилттай!

## Анхаарах зүйлс

- `.env.local` файл project root directory дээр байх ёстой
- Server-ийг дахин эхлүүлэх (`npm run dev`)
- DATABASE_URL дотор password-ийг зөв оруулах
- Cloud database ашиглах нь local-оос илүү хялбар бас найдвартай

