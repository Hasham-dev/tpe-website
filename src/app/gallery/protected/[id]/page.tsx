import type { Metadata } from 'next'
import ProtectedGalleryContent from './ProtectedGalleryContent'

export const metadata: Metadata = {
  title: 'Protected Gallery | The Perfect Event',
  description: 'Access your password-protected event photos.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ProtectedGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ProtectedGalleryContent folderId={id} />
}
