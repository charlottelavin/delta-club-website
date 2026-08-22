import { auth } from '@clerk/nextjs/server';
import UploadForm from './UploadForm';

export default async function AdminUploadPage() {
  const authObject = await auth();
  console.log('[admin/upload] auth debug', {
    userId: authObject.userId,
    orgId: authObject.orgId,
    orgSlug: authObject.orgSlug,
    orgRole: authObject.orgRole,
    orgPermissions: authObject.orgPermissions,
  });

  await auth.protect({ permission: 'org:basic:events_upload' });

  return <UploadForm />;
}
