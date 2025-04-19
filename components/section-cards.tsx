import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription className="text-md font-semibold text-black">
						LA Students
					</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						12
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">
						Students above grade 5
					</div>
				</CardFooter>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription className="text-md font-semibold text-black">
						Center Students
					</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						20
					</CardTitle>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1.5 text-sm">
					<div className="text-muted-foreground">
						Students below grade 5
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
