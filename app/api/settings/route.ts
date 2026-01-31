import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { deleteFromR2, isR2Url } from '@/lib/r2'

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
      const newHeroImage = heroBackgroundImage !== undefined ? heroBackgroundImage : settings.heroBackgroundImage
      if (heroBackgroundImage !== undefined && settings.heroBackgroundImage && settings.heroBackgroundImage !== heroBackgroundImage && isR2Url(settings.heroBackgroundImage)) {
        deleteFromR2(settings.heroBackgroundImage).catch((err) => console.error('Failed to delete old R2 hero image:', err))
      }
      settings = await prisma.settings.update({
        where: { id: 'settings' },
        data: {
          heroBackgroundImage: newHeroImage !== undefined ? newHeroImage : settings.heroBackgroundImage
        }
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to update settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

