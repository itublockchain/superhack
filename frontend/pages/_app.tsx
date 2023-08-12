import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createConfig, WagmiConfig } from "wagmi";
import { optimismGoerli, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const opstack: Chain = {
  id: 42069,
  name: "op stack",
  network: "opstack",
  nativeCurrency: {
      name: "Goerli Ether",
      symbol: "ETH",
      decimals: 18,
  },
  rpcUrls: {
      default: {
          http: ["http://localhost:8545"],
      },
      public: {
          http: ["http://localhost:8545"]
      },
  },
  blockExplorers: {
      etherscan: {
          name: "Etherscan",
          url: "https://goerli-optimism.etherscan.io",
      },
      default: {
          name: "Etherscan",
          url: "https://goerli-optimism.etherscan.io",
      },
  },
  contracts: {
      multicall3: {
          address: "0xF568128e4a37B0D1E439e3c075bC24582850ABB0",
      },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [optimismGoerli, opstack, goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "9ac990b8e1748ce02093aabcae915261",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return<>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  </>;
}
