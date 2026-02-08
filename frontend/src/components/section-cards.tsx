

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      
      <Card
        data-slot="card"
        className="bg-gradient-to-t from-primary/5 to-card shadow-xs @container/card"
      >
        <CardHeader>
          <CardDescription>Total Saving</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $12,500.00
          </CardTitle>

          <CardAction>
            <Badge variant="secondary" className="gap-1">
             
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 font-medium">
            Harry Osborn
          </div>
        </CardFooter>
      </Card>

    
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white p-6 rounded-xl">
          <p className="text-sm opacity-75 mb-8">DEBIT CARD</p>

          <p className="text-2xl font-bold tracking-widest mb-6">
            •••• •••• •••• 4829
          </p>

          <div className="flex justify-between">
            <div>
              <p className="text-xs opacity-75">CARDHOLDER NAME</p>
              <p className="font-semibold">Harry Osborn</p>
            </div>

            <div>
              <p className="text-xs opacity-75">EXPIRES</p>
              <p className="font-semibold">12/26</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
