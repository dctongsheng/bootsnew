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
          message: `Product Inquiry: ${productName}\n\n${formData.message}`
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send')
      }

      alert(data.message || 'Message sent!')
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      onOpenChange(false)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to send, please try again later')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Product Inquiry</DialogTitle>
          <DialogDescription>
            Inquiry for product: <span className="font-semibold text-gray-900">{productName}</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="inquiry-name">Name *</Label>
            <Input
              id="inquiry-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Your name"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="inquiry-email">Email *</Label>
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
            <Label htmlFor="inquiry-phone">Phone *</Label>
            <Input
              id="inquiry-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="+1 xxx xxx xxxx"
            />
          </div>

          <div>
            <Label htmlFor="inquiry-company">Company</Label>
            <Input
              id="inquiry-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Your company name"
            />
          </div>

          <div>
            <Label htmlFor="inquiry-message">Message *</Label>
            <Textarea
              id="inquiry-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
              placeholder="Please tell us your requirements, we will reply as soon as possible..."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
