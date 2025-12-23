import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const products = [
    {
      name: 'Nike Air Jordan 1',
      description: '经典篮球鞋，采用优质皮革材质，提供出色的舒适度和支撑性。标志性的Air-Sole气垫单元带来轻盈缓震体验。',
      price: 1299.00,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      featured: true
    },
    {
      name: 'Adidas Ultraboost 22',
      description: '专为跑步设计的跑鞋，搭载Boost中底技术，提供卓越的能量回馈。Primeknit鞋面包裹舒适，透气性佳。',
      price: 1099.00,
      imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
      featured: true
    },
    {
      name: 'New Balance 574',
      description: '复古风格休闲鞋，采用ENCAP中底技术，结合轻质EVA泡沫和耐用橡胶，提供全天候舒适支撑。',
      price: 699.00,
      imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80',
      featured: false
    },
    {
      name: 'Converse Chuck Taylor All Star',
      description: '经典帆布鞋，简约设计百搭时尚。橡胶鞋底提供良好抓地力，适合日常休闲穿着。',
      price: 459.00,
      imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&q=80',
      featured: false
    },
    {
      name: 'Vans Old Skool',
      description: '滑板经典款，耐用的帆布和麂皮鞋面，搭载华夫格外底，提供出色的抓地力和耐磨性。',
      price: 495.00,
      imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
      featured: false
    },
    {
      name: 'Puma RS-X',
      description: '复古未来主义设计，混合材质鞋面，RS技术中底提供舒适缓震。时尚与舒适的完美结合。',
      price: 799.00,
      imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&q=80',
      featured: true
    },
    {
      name: 'Reebok Classic Leather',
      description: '简约经典的皮革休闲鞋，柔软皮革鞋面，舒适EVA中底，适合日常各种场合穿着。',
      price: 599.00,
      imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80',
      featured: false
    },
    {
      name: 'ASICS Gel-Kayano 29',
      description: '专业跑鞋，搭载GEL缓震技术和FF BLAST+中底，提供卓越的稳定性和能量回馈，适合长距离跑步。',
      price: 999.00,
      imageUrl: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80',
      featured: true
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log(`已创建 ${products.length} 个示例产品`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
