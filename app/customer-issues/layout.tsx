import AuthLayout from '../components/AuthLayout';

export default function CustomerIssuesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 