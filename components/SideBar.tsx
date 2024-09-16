'use client'

import { sidebarLinks } from '@/constants'
 import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import Footer from './Footer'

const SideBar = ({ user }: SiderbarProps) => {
    const pathName = usePathname()
    return (
        <section className='sidebar'>
            <nav className='flex flex-col gap-4'>
                <Link href="/" className='mb-12 cursor-pointer flex items-center gap-2'>
                    <Image src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt='images/log'
                        className='size-[24px] max-xl:size-14'
                    />
                    <h1 className='text-xl sidebar-logo '>
                        Horizon
                    </h1>
                </Link>
                {sidebarLinks.map((link) => {
                    const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`)
                    return (
                        <Link href={link.route} key={link.label} className={cn("sidebar-link", { 'bg-bankGradient': isActive })}>
                            <div className='realtive flex  items-center     gap-4 '>
                                <Image src={link.imgURL}
                                    height={34}
                                    width={34}
                                    alt={link.label}
                                    className={cn({
                                        'brightness-[3] invert-0': isActive
                                    })}
                                />
                                <p className={cn('sidebar-label', { '!text-white': isActive })}>
                                    {link.label}
                                </p>


                            </div>
                        </Link>
                    )
                })}
                USER
            </nav>
            <Footer user={user} />
        </section>
    )
}

export default SideBar