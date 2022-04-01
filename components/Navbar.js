import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAddress, useDisconnect } from "@thirdweb-dev/react";
function Navbar({ toggleModal }) {
  const address = useAddress();
  const disconnect = useDisconnect();
  return (
    <nav>
      <div className="flex justify-between ">
        <button className="pb-[0.2rem] pt-2 px-2 m-2 rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]">
          <Image src="/previous.png" width={`40%`} height={`40%`} alt="prev" />
        </button>
        <div className="flex items-center">
          <Link href="/inventory">
            <a className="py-3 px-5 m-2 border-2 text-white rounded-lg border-[#1dfefe] hover:bg-[#1dfefe] hover:text-black hover:shadow-[0px_0px_75px_5px_#1dfede]">
              Inventory
            </a>
          </Link>
          {address ? (
            <div className="flex flex-row items-center py-2 px-5 m-2 rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]">
              <div className="text py-2 pr-2">{address.substring(0, 9)}...</div>
              <Image
                onClick={disconnect}
                className="cursor-pointer"
                src="/remove-button.svg"
                width={`25%`}
                height={`25%`}
                alt="wallet"
              />
            </div>
          ) : (
            <button
              onClick={toggleModal}
              className="flex flex-row items-center py-2 px-5 m-2 rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]"
            >
              <div className="text pr-2">Connect Wallet</div>
              <Image
                src="/wallet.png"
                width={`40%`}
                height={`40%`}
                alt="wallet"
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
