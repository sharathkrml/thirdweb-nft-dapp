import React from "react";
import Image from "next/image";
import {
  useMetamask,
  useCoinbaseWallet,
  useWalletConnect,
} from "@thirdweb-dev/react";
function WalletComponent() {
  const connectMetamask = useMetamask();
  const connectCoinbaseWallet = useCoinbaseWallet();
  const connectWalletConnect = useWalletConnect();
  return (
    <div className="flex justify-around items-center h-[100%] lg:flex-row sm:flex-col">
      <div className="metamask">
        <button
          onClick={connectMetamask}
          className="flex p-10  items-center justify-center bg-white rounded-lg hover:scale-105"
        >
          <Image src="/wallet/metamask.svg" height={80} width={80}></Image>
        </button>
        <p className="text-white text-center mt-2">Connect Metamask</p>
      </div>
      <div className="walletConnect">
        <button
          onClick={connectWalletConnect}
          className="flex p-10 items-center justify-center bg-white rounded-lg hover:scale-105"
        >
          <Image src="/wallet/walletConnect.svg" height={80} width={80}></Image>
        </button>
        <p className="text-white text-center mt-2">Connect Wallet Connect</p>
      </div>
      <div className="coinbase">
        <button
          onClick={connectCoinbaseWallet}
          className="flex p-10 items-center justify-center bg-white rounded-lg hover:scale-105"
        >
          <Image src="/wallet/Coinbase.svg" height={80} width={80}></Image>
        </button>
        <p className="text-white text-center mt-2">Connect Coinbase</p>
      </div>
    </div>
  );
}

export default WalletComponent;
