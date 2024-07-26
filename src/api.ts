const BASE_URL = '/api/v1'; // Proxy path

interface NetworkConfig {
  id: string;
  creationTime: number;
  capabilities: object[];
  dns: {
    domain: string;
    servers: string[];
  };
  enableBroadcast: boolean;
  ipAssignmentPools: {
    ipRangeStart: string;
    ipRangeEnd: string;
  }[];
  lastModified: number;
  mtu: number;
  multicastLimit: number;
  name: string;
  private: boolean;
  routes: {
    target: string;
    via: string | null;
  }[];
  rules: object[];
  ssoConfig: {
    enabled: boolean;
    mode: string;
    clientId: string;
    issuer: string;
    provider: string;
    authorizationEndpoint: string;
    allowList: string[];
  };
  tags: object[];
  v4AssignMode: {
    zt: boolean;
  };
  v6AssignMode: {
    '6plane': boolean;
    rfc4193: boolean;
    zt: boolean;
  };
}

interface PermissionsMap {
  [key: string]: {
    a: boolean;
    d: boolean;
    m: boolean;
    r: boolean;
  };
}

interface Network {
  id: string;
  clock: number;
  config: NetworkConfig;
  description: string;
  rulesSource: string;
  permissions: PermissionsMap;
  ownerId: string;
  onlineMemberCount: number;
  authorizedMemberCount: number;
  totalMemberCount: number;
  capabilitiesByName: object;
  tagsByName: object;
}

interface MemberConfig {
  activeBridge: boolean;
  authorized: boolean;
  capabilities: number[];
  creationTime: number;
  id: string;
  identity: string;
  ipAssignments: string[];
  lastAuthorizedTime: number;
  lastDeauthorizedTime: number;
  noAutoAssignIps: boolean;
  revision: number;
  tags: [number, number][];
  vMajor: number;
  vMinor: number;
  vRev: number;
  vProto: number;
}

interface Member {
  id: string;
  clock: number;
  networkId: string;
  nodeId: string;
  controllerId: string;
  hidden: boolean;
  name: string;
  description: string;
  config: MemberConfig;
  lastOnline: number;
  lastSeen: number;
  physicalAddress: string;
  clientVersion: string;
  protocolVersion: number;
  supportsRulesEngine: boolean;
}

const fetchNetworks = async (): Promise<Network[]> => {
  const response = await fetch(`${BASE_URL}/network`, {
    headers: {
      'Authorization': `token ${process.env.REACT_APP_API_TOKEN}`
    }
  });

  const text = await response.text();
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  try {
    const jsonResponse = JSON.parse(text);
    return jsonResponse;
  } catch (error) {
    throw new Error('Failed to parse JSON');
  }
};

const fetchNetworkMembers = async (networkId: string): Promise<Member[]> => {
  const response = await fetch(`${BASE_URL}/network/${networkId}/member`, {
    headers: {
      'Authorization': `token ${process.env.REACT_APP_API_TOKEN}`
    }
  });
  
  const text = await response.text();
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  try {
    const jsonResponse = JSON.parse(text);
    return jsonResponse;
  } catch (error) {
    throw new Error('Failed to parse JSON');
  }
};

export { fetchNetworks, fetchNetworkMembers };
export type { Network, Member };