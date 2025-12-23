export const PRODUCT_CATEGORIES = {
  'men-boots': {
    label: 'Men Boots',
    subCategories: {
      'men-snow-boots': 'Men Snow Boots',
      'men-hiking-boots': 'Men Hiking Boots',
      'men-work-boots': 'Men Work Boots',
    }
  },
  'women-boots': {
    label: 'Women Boots',
    subCategories: {
      'women-chelsea-boots': 'Women Chelsea Boots',
      'women-snow-boots': 'Women Snow Boots',
    }
  },
  'tactical-boots': {
    label: 'Tactical Boots',
    subCategories: {}
  }
} as const

export type CategoryKey = keyof typeof PRODUCT_CATEGORIES
export type SubCategoryKey = string
