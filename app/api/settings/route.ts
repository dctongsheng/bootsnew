import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET settings
export async function GET() {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: 'settings' }
    })

    // If settings don't exist, create default
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 'settings' }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to fetch settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// UPDATE settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { heroBackgroundImage } = body

    let settings = await prisma.settings.findUnique({
      where: { id: 'settings' }
    })

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 'settings',
          heroBackgroundImage: heroBackgroundImage || null
        }
      })
    } else {
      settings = await prisma.settings.update({
        where: { id: 'settings' },
        data: {
          heroBackgroundImage: heroBackgroundImage !== undefined ? heroBackgroundImage : settings.heroBackgroundImage
        }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

