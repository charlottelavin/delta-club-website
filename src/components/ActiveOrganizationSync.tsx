'use client';

import { useEffect } from 'react';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';

export default function ActiveOrganizationSync() {
  const { organization, isLoaded: organizationLoaded } = useOrganization();
  const { isLoaded: listLoaded, setActive, userMemberships } = useOrganizationList({ userMemberships: true });

  useEffect(() => {
    if (!organizationLoaded || !listLoaded || organization) return;

    const memberships = userMemberships.data;
    if (memberships?.length === 1) {
      setActive?.({ organization: memberships[0].organization.id });
    }
  }, [organizationLoaded, listLoaded, organization, userMemberships.data, setActive]);

  return null;
}
