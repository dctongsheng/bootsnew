import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 获取所有产品
  const products = await prisma.product.findMany()

  console.log(`Found ${products.length} products to migrate...`)

  // 为每个产品转换分类数据
  for (const product of products) {
    // 转换单个category为JSON数组
    const categories = product.category
      ? JSON.stringify([product.category])
      : '[]'

    // 转换单个subCategory为JSON数组
    const subCategories = product.subCategory
      ? JSON.stringify([product.subCategory])
      : '[]'

    await prisma.product.update({
      where: { id: product.id },
      data: {
        categories,
        subCategories
      }
    })

    console.log(`Migrated "${product.name}":`)
    console.log(`  category: ${product.category} → ${categories}`)
    console.log(`  subCategory: ${product.subCategory} → ${subCategories}`)
  }

  console.log('Migration completed! Now you can run prisma db push --accept-data-loss')
}

main()
  .catch((e) => {
    console.error('Error during migration:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
