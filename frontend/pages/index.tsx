import Image from "next/image";
import { Passion_One } from "next/font/google";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { Logo } from "@/components";

const passionOne = Passion_One({ weight: "400", subsets: ["latin"] });

import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {

  const { address, isConnected } = useAccount();
  
  useEffect(() => {
    if (isConnected) {
      window.location.href = "/verify"
    }
  }, [isConnected]);

  return (
    <>
      <div
        className={`h-screen flex justify-center items-center ${passionOne.className}`}
      >
        <Logo />
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <div>
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="connect"
                        >
                          CONNECT WALLET
                        </button>
                      </div>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        type="button"
                        className="connect"
                      >
                        WRONG NETWORK
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                      ></button>

                      <button
                        onClick={openAccountModal}
                        type="button"
                        className="connect"
                      >
                        {account.displayName}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </>
  );
}
