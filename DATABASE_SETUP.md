# Database Тохируулга

## Алдаа: Internal Server Error

Хэрэв "Internal server error" алдаа гарч байвал, ихэвчлэн database connection алдаа байдаг.

## Database Connection Тохируулах

### Сонголт 1: Local PostgreSQL

1. **PostgreSQL суулгах:**
```bash
# macOS
brew install postgresql
brew services start postgresql

# Linux
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

2. **Database үүсгэх:**
```bash
createdb bug_testing_db
```

3. **`.env.local` файлд connection string засах:**
```env
DATABASE_URL="postgresql://your_username@localhost:5432/bug_testing_db"
```

Эсвэл password байвал:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/bug_testing_db"
```

### Сонголт 2: Cloud Database (Зөвлөмж)

#### Supabase (Үнэгүй)
1. [Supabase](https://supabase.com) руу бүртгүүлэх
2. "New Project" үүсгэх
3. Settings → Database → Connection string авна
4. `.env.local` файлд оруулна:
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

#### Neon (Үнэгүй)
1. [Neon](https://neon.tech) руу бүртгүүлэх
2. Database үүсгэх
3. Connection string авна
4. `.env.local` файлд оруулна

## Database Migration Хийх

Connection string зөв тохируулсны дараа:

```bash
# Prisma client generate хийх
npx prisma generate

# Database migration хийх
npx prisma migrate dev --name init

# Хэрэв database хоосон байвал (бүх өгөгдөл устана)
npx prisma migrate reset
```

## Database Connection Шалгах

Browser дээр эсвэл terminal-аас:

```bash
curl http://localhost:3000/api/health
```

Эсвэл browser дээр: `http://localhost:3000/api/health`

Хэрэв `{"status":"ok","database":"connected"}` гэж харагдвал database зөв холбогдсон байна.

## Асуудал Шидвэрлэх

### "Environment variable not found: DATABASE_URL"
- `.env.local` файл project root directory дээр байгаа эсэхийг шалгана
- Server-ийг дахин эхлүүлнэ (`npm run dev`)

### "Can't reach database server"
- PostgreSQL ажиллаж байгаа эсэхийг шалгана
- Connection string зөв эсэхийг шалгана
- Firewall/network settings шалгана

### "Database does not exist"
- Database үүсгэсэн эсэхийг шалгана
- Connection string дотор database нэр зөв эсэхийг шалгана

