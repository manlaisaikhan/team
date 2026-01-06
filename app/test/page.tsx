'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface Project {
  id: string
  title: string
  description: string
  url: string | null
  screenshot: string | null
  status: string
  user: {
    id: string
    name: string | null
    email: string
  }
  createdAt: string
}

export default function TestPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      // Fetch all projects - in a real app, you'd have a dedicated endpoint
      const response = await fetch('/api/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Шалгах</h1>
          <p className="text-gray-600">Бусдын вебсайтуудыг шалгаж, алдаа олоорой</p>
        </div>

        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">Одоогоор шалгах вебсайт байхгүй байна</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>
                    {project.user.name || project.user.email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  {project.screenshot && (
                    <img
                      src={project.screenshot}
                      alt={project.title}
                      className="w-full h-32 object-cover rounded mb-4"
                    />
                  )}
                  <div className="flex gap-2">
                    <Link href={`/test/${project.id}`} className="flex-1">
                      <Button className="w-full">Шалгах</Button>
                    </Link>
                    {project.url && (
                      <Button
                        variant="outline"
                        onClick={() => window.open(project.url!, '_blank')}
                      >
                        Нээх
                      </Button>
                    )}
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

