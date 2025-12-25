'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Home, X, Image as ImageIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/components/image-upload'

interface Settings {
  id: string
  heroBackgroundImage: string | null
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (imageUrl: string) => {
    if (!settings) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heroBackgroundImage: imageUrl
        })
      })

      if (!response.ok) throw new Error('Failed to update settings')

      const updatedSettings = await response.json()
      setSettings(updatedSettings)
    } catch (error) {
      console.error('Failed to update settings:', error)
      alert('保存失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!settings) return

    setIsSaving(true)
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          heroBackgroundImage: null
        })
      })

      if (!response.ok) throw new Error('Failed to update settings')

      const updatedSettings = await response.json()
      setSettings(updatedSettings)
    } catch (error) {
      console.error('Failed to update settings:', error)
      alert('删除失败，请重试')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <h1 className="text-2xl font-bold text-gray-900">网站设置</h1>
            <Link href="/admin">
              <Button variant="outline" size="default">
                <Home className="w-4 h-4 mr-2" />
                返回管理后台
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-32">
            <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">加载中...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Hero Background Image */}
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">首页 Hero 背景图片</h2>
                <p className="text-gray-600 text-sm">
                  设置首页 Hero 区域的背景图片。建议使用鞋厂实拍图，尺寸建议 1920x1080 或更高。
                </p>
              </div>

              <div className="space-y-4">
                {/* Preview */}
                <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-100">
                  {settings?.heroBackgroundImage ? (
                    <>
                      <img
                        src={settings.heroBackgroundImage}
                        alt="Hero background"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-800/85 to-gray-900/85 flex items-center justify-center">
                        <div className="text-center text-white">
                          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm opacity-75">预览效果（带遮罩层）</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                        <p className="text-gray-500 text-sm">暂无背景图片</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Upload Controls */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <ImageUpload
                      value={settings?.heroBackgroundImage || ''}
                      onChange={handleImageUpload}
                    />
                  </div>
                  {settings?.heroBackgroundImage && (
                    <Button
                      variant="outline"
                      onClick={handleRemoveImage}
                      disabled={isSaving}
                      className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <X className="w-4 h-4 mr-2" />
                      移除图片
                    </Button>
                  )}
                </div>
              </div>

              {isSaving && (
                <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                  保存中...
                </div>
              )}
            </Card>

            {/* Preview Note */}
            <Card className="p-4 bg-amber-50 border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>提示：</strong>背景图片会自动添加深色遮罩层以确保文字可读性。上传后可以访问首页查看效果。
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

