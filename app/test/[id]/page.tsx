'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Project {
  id: string
  title: string
  description: string
  url: string | null
  screenshot: string | null
  user: {
    id: string
    name: string | null
    email: string
  }
}

export default function TestProjectPage() {
  const router = useRouter()
  const params = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [bugData, setBugData] = useState({
    description: '',
    screenshot: '',
  })

  useEffect(() => {
    if (params.id) {
      fetchProject()
    }
  }, [params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/bugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: params.id,
          description: bugData.description,
          screenshot: bugData.screenshot || null,
        }),
      })

      if (response.ok) {
        router.push('/test')
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Алдаа гарлаа')
      }
    } catch (error) {
      console.error('Error submitting bug:', error)
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

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p>Вебсайт олдсонгүй</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>
              {project.user.name || project.user.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{project.description}</p>
            {project.screenshot && (
              <img
                src={project.screenshot}
                alt={project.title}
                className="w-full rounded mb-4"
              />
            )}
            {project.url && (
              <Button
                variant="outline"
                onClick={() => window.open(project.url!, '_blank')}
                className="mb-4"
              >
                Вебсайт нээх
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Алдаа олох</CardTitle>
            <CardDescription>
              Олсон алдаагаа дэлгэрэнгүй тайлбарлана уу
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Алдааны тайлбар *
                </label>
                <Textarea
                  id="description"
                  value={bugData.description}
                  onChange={(e) => setBugData({ ...bugData, description: e.target.value })}
                  required
                  placeholder="Алдааны дэлгэрэнгүй тайлбар"
                  rows={6}
                />
              </div>

              <div>
                <label htmlFor="screenshot" className="block text-sm font-medium mb-2">
                  Скриншот URL (сонголттой)
                </label>
                <Input
                  id="screenshot"
                  type="url"
                  value={bugData.screenshot}
                  onChange={(e) => setBugData({ ...bugData, screenshot: e.target.value })}
                  placeholder="https://example.com/screenshot.png"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={submitting}>
                  {submitting ? 'Илгээж байна...' : 'Илгээх'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Буцах
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

