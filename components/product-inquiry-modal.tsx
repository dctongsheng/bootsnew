'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface ProductInquiryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productName: string
}

export function ProductInquiryModal({ open, onOpenChange, productName }: ProductInquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: `产品咨询: ${productName}\n\n${formData.message}`
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '发送失败')
      }

      alert(data.message || '消息已发送！')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      onOpenChange(false)
    } catch (error) {
      alert(error instanceof Error ? error.message : '发送失败，请稍后重试')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">产品咨询</DialogTitle>
          <DialogDescription>
            咨询产品: <span className="font-semibold text-gray-900">{productName}</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="inquiry-name">姓名 *</Label>
            <Input
              id="inquiry-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="您的姓名"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="inquiry-email">邮箱 *</Label>
              <Input
                id="inquiry-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="inquiry-phone">电话 *</Label>
            <Input
              id="inquiry-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="+86 xxx xxxx xxxx"
            />
          </div>

          <div>
            <Label htmlFor="inquiry-company">公司名称</Label>
            <Input
              id="inquiry-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="您的公司名称"
            />
          </div>

          <div>
            <Label htmlFor="inquiry-message">留言内容 *</Label>
            <Textarea
              id="inquiry-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              placeholder="请告诉我们您的需求，我们会尽快回复..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? '发送中...' : '发送咨询'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
