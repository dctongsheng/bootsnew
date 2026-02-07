import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // 保存消息到数据库
    const savedMessage = await prisma.message.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Message sent! We will contact you as soon as possible.',
      data: savedMessage
    }, { status: 201 })
  } catch (error) {
    console.error('Message submission error:', error)
    return NextResponse.json(
      { error: 'Failed to send, please try again later' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
