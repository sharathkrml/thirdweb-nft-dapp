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
    <div className="flex justify-around items-center h-[100%] lg:flex-row flex-col sm:flex-row">
      <div className="metamask flex flex-col items-center w-[80%] h-[25%]">
        <div
          onClick={connectMetamask}
          className="flex self-center  items-center w-[80%] h-[90%] justify-center bg-white rounded-lg hover:scale-105"
        >
          <img src="/wallet/metamask.svg" className="self-center w-[50%] " />
        </div>
        <p className="text-white text-center mt-2">Connect Metamask</p>
      </div>
      <div className="walletConnect w-[80%] h-[25%] flex flex-col items-center w-[80%] h-[25%]">
        <div
          onClick={connectWalletConnect}
          className="flex items-center border-2 border-white w-[80%] h-[80%] justify-center bg-white rounded-lg hover:scale-105"
        >
          <img src="/wallet/walletConnect.svg" className="self-center w-[50%]" />
        </div>
        <p className="text-white text-center mt-2">Connect Wallet Connect</p>
      </div>
      <div className="coinbase w-[80%] h-[25%] flex flex-col items-center w-[80%] h-[25%]">
        <div
          onClick={connectCoinbaseWallet}
          className="flex  items-center w-[80%] h-[80%] justify-center bg-white rounded-lg hover:scale-105"
        >
          <img src="/wallet/Coinbase.svg" className="self-center w-[50%]" />
        </div>
        <p className="text-white text-center mt-2">Connect Coinbase</p>
      </div>
    </div>
  );
}

export default WalletComponent;
