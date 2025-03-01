import AuthLayout from '../components/AuthLayout';

export default function ComplaintsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 