import AuthLayout from '../components/AuthLayout';

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 