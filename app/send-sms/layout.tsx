import AuthLayout from '@/app/components/AuthLayout';

export default function SendSMSLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 