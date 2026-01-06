'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Blog {
  id: string
  title: string
  content: string
  user: {
    id: string
    name: string | null
    email: string
  }
  createdAt: string
  comments: Comment[]
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs')
      if (response.ok) {
        const data = await response.json()
        setBlogs(data)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p>Уншиж байна...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Блог</h1>
            <p className="text-gray-600">Санал бодлоо хуваалцаарай</p>
          </div>
          <Link href="/blogs/new">
            <Button>Шинэ пост</Button>
          </Link>
        </div>

        {blogs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Одоогоор пост байхгүй байна</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>
                    {blog.user.name || blog.user.email} • {new Date(blog.createdAt).toLocaleDateString('mn-MN')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 line-clamp-3">{blog.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {blog.comments.length} сэтгэгдэл
                    </span>
                    <Link href={`/blogs/${blog.id}`}>
                      <Button variant="outline">Дэлгэрэнгүй</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

