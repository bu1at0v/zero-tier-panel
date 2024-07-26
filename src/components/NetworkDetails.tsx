import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNetworkMembers, Member } from '../api.ts';

interface NetworkDetailsProps {
  networkId: string;
  onlineMemberCount: number;
  authorizedMemberCount: number;
  totalMemberCount: number;
  networkName: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ networkId, onlineMemberCount, authorizedMemberCount, totalMemberCount, networkName }) => {
  const { data: members, isLoading, error } = useQuery<Member[]>({
    queryKey: ['members', networkId],
    queryFn: () => fetchNetworkMembers(networkId),
  });

  if (isLoading) return <div className="text-center p-2">Loading members...</div>;
  if (error) return <div className="text-center text-red-500 p-2">Error: {error.message}</div>;

  return (
    <div>
      <div className="mb-10">
        <div className="text-xl mb-4">Network name: <span className="font-semibold">{networkName}</span></div>
        <div className="text-l mb-4">Network Id: <span className="font-semibold">{networkId}</span></div>
        <div className="text-l mb-4">Devices online: <span className="font-semibold">{onlineMemberCount}</span></div>
        <div className="text-l">Total members: <span className="font-semibold">{totalMemberCount}</span></div>
        <div className="text-l mb-6">Authorized members: <span className="font-semibold">{authorizedMemberCount}</span></div>

        <table className="min-w-full divide-y divide-gray-200 border rounded-lg p-4 mb-4">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Assignments
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Seen
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Authorized
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members?.map((member) => (
              <tr key={member.nodeId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.config.ipAssignments.join(', ')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(member.lastSeen * 1000).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.config.authorized ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NetworkDetails;