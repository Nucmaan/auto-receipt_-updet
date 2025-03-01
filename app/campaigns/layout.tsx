import AuthLayout from '../components/AuthLayout';

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayout>{children}</AuthLayout>;
} 