'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Building, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Message {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  status: string
  createdAt: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'completed'>('all')

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages')
      const data = await response.json()
      setMessages(data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (!response.ok) throw new Error('Failed to update status')

      setMessages(messages.map(m => m.id === id ? { ...m, status } : m))
    } catch (error) {
      alert('更新失败，请重试')
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('确定要删除这条消息吗？')) return

    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete message')

      setMessages(messages.filter(m => m.id !== id))
    } catch (error) {
      alert('删除失败，请重试')
    }
  }

  const filteredMessages = filter === 'all'
    ? messages
    : messages.filter(m => m.status === filter)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">新消息</span>
      case 'contacted':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">已联系</span>
      case 'completed':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">已完成</span>
      default:
        return null
    }
  }

  const getStatusCount = (status: string) => {
    if (status === 'all') return messages.length
    return messages.filter(m => m.status === status).length
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-gray-900" />
              <h1 className="text-2xl font-bold text-gray-900">消息管理</h1>
            </div>
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            全部 ({getStatusCount('all')})
          </Button>
          <Button
            variant={filter === 'new' ? 'default' : 'outline'}
            onClick={() => setFilter('new')}
          >
            新消息 ({getStatusCount('new')})
          </Button>
          <Button
            variant={filter === 'contacted' ? 'default' : 'outline'}
            onClick={() => setFilter('contacted')}
          >
            已联系 ({getStatusCount('contacted')})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
          >
            已完成 ({getStatusCount('completed')})
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-32">
            <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">加载中...</p>
          </div>
        ) : filteredMessages.length === 0 ? (
          <Card className="p-16 text-center">
            <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              暂无消息
            </h3>
            <p className="text-gray-500">
              {filter === 'all' ? '还没有收到任何消息' : '该状态下暂无消息'}
            </p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredMessages.map((message) => (
              <Card key={message.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Contact Info */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{message.name}</h3>
                          {getStatusBadge(message.status)}
                        </div>
                        {message.company && (
                          <div className="flex items-center gap-2 text-gray-600 mb-2">
                            <Building className="w-4 h-4" />
                            <span className="text-sm">{message.company}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleString('zh-CN')}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <a href={`mailto:${message.email}`} className="text-gray-900 hover:text-amber-600">
                          {message.email}
                        </a>
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <a href={`tel:${message.phone}`} className="text-gray-900 hover:text-amber-600">
                            {message.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    {message.status === 'new' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(message.id, 'contacted')}
                        className="w-full"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        标记已联系
                      </Button>
                    )}
                    {message.status === 'contacted' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(message.id, 'completed')}
                        className="w-full"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        标记已完成
                      </Button>
                    )}
                    {message.status === 'completed' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(message.id, 'new')}
                        className="w-full"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        重置状态
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteMessage(message.id)}
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      删除
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
