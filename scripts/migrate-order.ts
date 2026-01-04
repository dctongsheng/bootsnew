import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 获取所有产品，按创建时间排序（最新的在前）
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  })

  console.log(`Found ${products.length} products to migrate...`)

  // 为每个产品设置order值（最新的order=0，依次递增）
  for (let i = 0; i < products.length; i++) {
    await prisma.product.update({
      where: { id: products[i].id },
      data: { order: i }
    })
    console.log(`Updated "${products[i].name}" with order=${i}`)
  }

  console.log('Migration completed!')
}

main()
  .catch((e) => {
    console.error('Error during migration:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
