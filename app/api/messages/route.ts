import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // 验证必填字段
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '姓名、邮箱和消息内容为必填项' },
        { status: 400 }
      )
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '邮箱格式不正确' },
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
      message: '消息已发送，我们会尽快与您联系！',
      data: savedMessage
    }, { status: 201 })
  } catch (error) {
    console.error('Message submission error:', error)
    return NextResponse.json(
      { error: '发送失败，请稍后重试' },
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
      { error: '获取消息失败' },
      { status: 500 }
    )
  }
}
