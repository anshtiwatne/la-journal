'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { useIsMobile } from '@/hooks/use-mobile'
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { people } from '@/data/db.json'

export const description = 'An interactive area chart'

const chartData = people
	.map((person) => ({
		date: person.joined,
		la: person.location === 'la' ? 1 : 0,
		center: person.location === 'center' ? 1 : 0,
	}))
	.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	.reduce(
		(acc, curr, index) => {
			const prev = acc[index - 1] || { la: 0, center: 0 }
			acc.push({
				date: curr.date,
				la: prev.la + curr.la,
				center: prev.center + curr.center,
			})
			return acc
		},
		[] as { date: string; la: number; center: number }[],
	)

const chartConfig = {
	// visitors: {
	// 	label: 'Visitors',
	// },
	la: {
		label: 'LA',
		color: 'var(--primary)',
	},
	center: {
		label: 'Center',
		color: 'var(--primary)',
	},
} satisfies ChartConfig

export function ChartAreaInteractive() {
	const isMobile = useIsMobile()
	const [timeRange, setTimeRange] = React.useState('90d')

	React.useEffect(() => {
		if (isMobile) {
			setTimeRange('all')
		}
	}, [isMobile])

	const filteredData = chartData.filter((item) => {
		if (timeRange === 'all') {
			return true
		}
		const date = new Date(item.date)
		const referenceDate = new Date()
		let daysToSubtract = 90
		if (timeRange === '30d') {
			daysToSubtract = 30
		}
		const startDate = new Date(referenceDate)
		startDate.setDate(startDate.getDate() - daysToSubtract)
		return date >= startDate
	})

	return (
		<Card className="@container/card">
			<CardHeader>
				<CardTitle>Total Members</CardTitle>
				<CardAction>
					<ToggleGroup
						type="single"
						value={timeRange}
						onValueChange={setTimeRange}
						variant="outline"
						className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
					>
						<ToggleGroupItem value="all">All Time</ToggleGroupItem>
						<ToggleGroupItem value="90d">
							Last 3 months
						</ToggleGroupItem>
						<ToggleGroupItem value="30d">
							Last 30 days
						</ToggleGroupItem>
					</ToggleGroup>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger
							className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
							size="sm"
							aria-label="Select a value"
						>
							<SelectValue placeholder="All Time" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem value="all" className="rounded-lg">
								All Time
							</SelectItem>
							<SelectItem value="90d" className="rounded-lg">
								Last 3 months
							</SelectItem>
							<SelectItem value="30d" className="rounded-lg">
								Last 30 days
							</SelectItem>
						</SelectContent>
					</Select>
				</CardAction>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient
								id="fillLA"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-la)"
									stopOpacity={1.0}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-la)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id="fillCenter"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-center)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-center)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value)
								return date.toLocaleDateString('en-US', {
									month: 'short',
									day: 'numeric',
								})
							}}
						/>
						<ChartTooltip
							cursor={false}
							defaultIndex={isMobile ? -1 : 10}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(
											value,
										).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
										})
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="la"
							type="natural"
							fill="url(#fillLA)"
							stroke="var(--color-la)"
							stackId="a"
						/>
						<Area
							dataKey="center"
							type="natural"
							fill="url(#fillCenter)"
							stroke="var(--color-center)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
