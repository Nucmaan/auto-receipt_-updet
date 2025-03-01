import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const recentPayments = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
  },
  {
    id: "4",
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
  },
]

export function RecentPayments() {
  return (
    <div className="space-y-8">
      {recentPayments.map((payment) => (
        <div key={payment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${payment.id}.png`} alt={payment.name} />
            <AvatarFallback>{payment.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{payment.name}</p>
            <p className="text-sm text-muted-foreground">{payment.email}</p>
          </div>
          <div className="ml-auto font-medium">{payment.amount}</div>
        </div>
      ))}
    </div>
  )
}

