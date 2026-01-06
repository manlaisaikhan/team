'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SubmitPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    screenshot: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/')
        router.refresh()
      } else {
        const errorData = await response.json()
        const errorMessage = errorData.error || errorData.message || 'Алдаа гарлаа'
        console.error('API Error:', errorData)
        alert(`Алдаа: ${errorMessage}`)
      }
    } catch (error: any) {
      console.error('Error submitting project:', error)
      alert(`Алдаа гарлаа: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Шалгуулах</CardTitle>
            <CardDescription>
              Таны вебсайтыг шалгахын тулд мэдээлэл оруулна уу
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Гарчиг *
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Вебсайтын нэр"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Тайлбар *
                </label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Вебсайтын тайлбар"
                  rows={6}
                />
              </div>

              <div>
                <label htmlFor="url" className="block text-sm font-medium mb-2">
                  URL (сонголттой)
                </label>
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label htmlFor="screenshot" className="block text-sm font-medium mb-2">
                  Скриншот URL (сонголттой)
                </label>
                <Input
                  id="screenshot"
                  type="url"
                  value={formData.screenshot}
                  onChange={(e) => setFormData({ ...formData, screenshot: e.target.value })}
                  placeholder="https://example.com/screenshot.png"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Илгээж байна...' : 'Илгээх'}
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Цуцлах
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

