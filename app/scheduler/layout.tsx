import AuthLayout from '../components/AuthLayout';

export default function SchedulerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 