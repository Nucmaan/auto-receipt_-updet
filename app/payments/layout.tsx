import AuthLayout from '../components/AuthLayout';

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 