import AuthLayout from '../components/AuthLayout';

export default function TechnicianTasksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 