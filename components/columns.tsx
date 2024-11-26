import { ReactNode } from 'react'

export type Payment = {
  id: string
  student: string
  value: number
  dueDate: string
  paymentDate: string | null
}

type Column = {
  key: keyof Payment
  header: string
  render?: (payment: Payment) => ReactNode
}

export const columns: Column[] = [
  {
    key: "student",
    header: "Student",
  },
  {
    key: "value",
    header: "Value",
    render: (payment: Payment) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(payment.value)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    key: "dueDate",
    header: "Due Date",
  },
  {
    key: "paymentDate",
    header: "Payment Date",
    render: (payment: Payment) => {
      return payment.paymentDate ? (
        <div>{payment.paymentDate}</div>
      ) : (
        <div className="text-red-500">Pending</div>
      )
    },
  },
]

