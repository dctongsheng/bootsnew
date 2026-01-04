'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { href: '/', label: '首页' },
    { href: '#catalog', label: '产品目录' },
    { href: '#capabilities', label: '工厂实力' },
    { href: '#contact', label: '联系我们' },
    { href: '/aboutus', label: '关于我们' },
    { href: '/admin', label: '管理' },
  ]

  const handleNavClick = () => {
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Menu className="h-6 w-6" />
          <span className="sr-only">打开菜单</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>导航菜单</SheetTitle>
          <SheetDescription>
            选择一个页面进行访问
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 mt-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
