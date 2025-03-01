import AuthLayout from '../components/AuthLayout';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 