'use client'

import * as React from 'react'
import { IconInnerShadowTop } from '@tabler/icons-react'

import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Hammer, Info, Link, Users } from 'lucide-react'
import { people, projects } from '@/data/db.json'

const userData = {
	name: 'Ansh Tiwatne',
	email: 'ansh.tiwatne@gmail.com',
	avatar: '/avatars/shadcn',
}

const nav = {
	main: [
		{
			title: 'People',
			url: '#',
			icon: Users,
			isActive: true,
			items: people.map((person) => ({
				...person,
				title: person.name,
				url: '#',
			})),
		},
		{
			title: 'Projects',
			url: '#',
			icon: Hammer,
			items: projects,
		},
	],
	secondary: [
		{
			title: 'LA Website',
			url: 'https://livingacademy.org/',
			icon: Info,
		},
		{
			title: 'STEM ChatShaala',
			url: 'https://metastudio.org/',
			icon: Link,
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<a href="#">
								<IconInnerShadowTop className="!size-5" />
								<span className="text-base font-semibold">
									LA Journal
								</span>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={nav.main} />
				<NavSecondary items={nav.secondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={userData} />
			</SidebarFooter>
		</Sidebar>
	)
}
