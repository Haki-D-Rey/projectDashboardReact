import { useQuery } from '@tanstack/react-query';

import { useSession } from 'next-auth/react';

import { getNetWork, getUserData, getUserAccountData } from '@/api/endpoints/users';

export function useUserData() {
  const session = useSession();
  // @ts-ignore
  const id = session.data?.id;

  const data = useQuery({
    queryKey: ['user-data'],
    queryFn: async () => {
      if (!id) return null;
      return await getUserData({ id });
    },
  });

  return data;
}

export function useUserAccountData() {
  const session = useSession();
  //@ts-ignore
  const { isLoading, data } = useQuery(['user-data-account'], () => getUserAccountData({ id: session.data?.id }), {
    //@ts-ignore
    enabled: !!session.data?.id,
  });
  return {data, isLoading};
}

export function useNetworkData() {
  const session = useSession();
  // @ts-ignore
  const id = session.data?.id;

  const data = useQuery({
    queryKey: ['user-network'],
    queryFn: async () => {
      if (!id) return null;
      return await getNetWork({ id });
    },
  });

  return data;
}
