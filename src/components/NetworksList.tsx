import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNetworks, Network } from '../api.ts';
import NetworkDetails from './NetworkDetails.tsx';

const NetworksList: React.FC = () => {
  const { data: networks, isLoading, error } = useQuery<Network[]>({
    queryKey: ['networks'],
    queryFn: fetchNetworks,
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 p-4">Error: {error.message}</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-10 mt-10">Network List</h1>
      <div className="container mx-auto">
        {networks?.map((network) => (
          <NetworkDetails key={network.id} networkId={network.id} onlineMemberCount={network.onlineMemberCount} authorizedMemberCount={network.authorizedMemberCount} totalMemberCount={network.totalMemberCount} networkName={network.config.name}/>
        ))}
      </div>
    </div>
  );
};

export default NetworksList;