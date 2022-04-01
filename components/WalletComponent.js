import React from "react";
import Image from "next/image";
function WalletComponent() {
  return (
    <div className="flex justify-around items-center h-[100%] lg:flex-row sm:flex-col">
      <div className="metamask">
        <div className="flex p-10  items-center justify-center bg-white rounded-lg cursor-pointer hover:scale-105">
          <Image src="/wallet/metamask.svg" height={80} width={80}></Image>
        </div>
        <p className="text-white text-center mt-2">Connect Metamask</p>
      </div>
      <div className="walletConnect">
        <div className="flex p-10 items-center justify-center bg-white rounded-lg cursor-pointer hover:scale-105">
          <Image src="/wallet/walletConnect.svg" height={80} width={80}></Image>
        </div>
        <p className="text-white text-center mt-2">Connect Wallet Connect</p>
      </div>
      <div className="coinbase">
        <div className="flex p-10 items-center justify-center bg-white rounded-lg cursor-pointer hover:scale-105">
          <Image src="/wallet/Coinbase.svg" height={80} width={80}></Image>
        </div>
        <p className="text-white text-center mt-2">Connect Coinbase</p>
      </div>
    </div>
  );
}

export default WalletComponent;
