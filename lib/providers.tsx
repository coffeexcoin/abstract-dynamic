"use client";

import {
  DynamicContextProvider,
  EvmNetwork,
} from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { AbstractEvmWalletConnectors } from "@dynamic-labs-connectors/abstract-global-wallet-evm";
import { abstractTestnet } from "viem/chains";
import { type Chain } from "viem";

function toDynamicChain(chain: Chain, iconUrl: string): EvmNetwork {
  return {
    ...chain,
    networkId: chain.id,
    chainId: chain.id,
    nativeCurrency: {
      ...chain.nativeCurrency,
      iconUrl: "https://app.dynamic.xyz/assets/networks/eth.svg",
    },
    iconUrls: [iconUrl],
    blockExplorerUrls: [chain.blockExplorers?.default?.url],
    rpcUrls: [...chain.rpcUrls.default.http],
  } as EvmNetwork;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DynamicContextProvider
      theme="auto"
      settings={{
        overrides: {
          evmNetworks: [
            toDynamicChain(
              abstractTestnet,
              "https://d9s2izusg5pvp.cloudfront.net/icon/light.png"
            ),
          ],
        },
        environmentId: "2762a57b-faa4-41ce-9f16-abff9300e2c9",
        walletConnectors: [EthereumWalletConnectors, AbstractEvmWalletConnectors],
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
