'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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

interface Comment {
  id: string
  content: string
  user: {
    id: string
    name: string | null
    email: string
  }
  createdAt: string
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setBlog(data)
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogId: params.id,
          content: comment,
        }),
      })

      if (response.ok) {
        setComment('')
        fetchBlog()
      } else {
        const error = await response.json()
        alert(error.error || 'Алдаа гарлаа')
      }
    } catch (error) {
      console.error('Error submitting comment:', error)
      alert('Алдаа гарлаа')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p>Уншиж байна...</p>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p>Пост олдсонгүй</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>
              {blog.user.name || blog.user.email} • {new Date(blog.createdAt).toLocaleDateString('mn-MN')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none whitespace-pre-wrap">
              {blog.content}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Сэтгэгдэл ({blog.comments.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {blog.comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4 last:border-0">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">
                    {comment.user.name || comment.user.email}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('mn-MN')}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}

            <form onSubmit={handleCommentSubmit} className="mt-6">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Сэтгэгдэл бичих..."
                rows={4}
                className="mb-4"
              />
              <Button type="submit" disabled={submitting || !comment.trim()}>
                {submitting ? 'Илгээж байна...' : 'Илгээх'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

