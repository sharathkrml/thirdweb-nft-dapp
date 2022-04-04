import React from "react";
import style from "../../styles/Home.module.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import Modal from "react-modal";
import WalletComponent from "../../components/WalletComponent";
import { CONTRACTADDR } from "../../constants";
import { constants } from "ethers";
Modal.setAppElement("#root");
function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [allNfts, setAllNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myNfts, setMyNfts] = useState([]);
  const [selectAllNft, setSelectAllNft] = useState(true);
  const address = useAddress();
  const nftContract = useNFTDrop(CONTRACTADDR);
  const getAllNFT = async () => {
    try {
      const res = await nftContract.getAll();
      setAllNfts(res);
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getMyNfts = async () => {
    try {
      setLoading(true);
      const res = await nftContract.getOwned(address);
      setMyNfts(res);
      console.log(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllNFT();
  }, []);
  useEffect(() => {
    if (address) {
      setIsOpen(false);
      getMyNfts();
    }
  }, [address]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const renderNFT = (nft, i) => {
    return (
      <div
        className="relative box-border my-10 w-[100%] h-auto min-h-[50vh] sm:w-[60%] sm:min-h-[45vh] sm:h-auto sm:my-10  flex flex-col cursor-pointer hover:-translate-y-2 px-[15%] sm:px-0"
        onClick={() => router.push("/inventory/" + nft.metadata.id.toString())}
      >
        <img src={nft.metadata.image} alt={i} className="border-[8px] border-black rounded-[10%] w-[75%] sm:w-[100%] self-center"/>
        {constants.AddressZero === nft.owner && (
          <p className="absolute top-[5%] left-[15%] sm:top-5 sm:-left-5 text-slate-200  bg-red-500 px-2 text-lg -rotate-45 ">
            not minted
          </p>
        )}
        <h3 className="self-center text-[10vw] max-w-[80%] text-center leading-10 mt-1 sm:text-[3vw] sm:max-w-[80%] sm:self-center text-white font-semibold sm:leading-15 sm:text-center sm:mt-1">{nft.metadata.name}</h3>
        <p className="self-center text-center text-[4vw] my-2 sm:text-[1vw] sm:self-center sm:text-center text-white sm:my-3">{nft.metadata.description.substring(0, 50)}</p>
        {nft.owner !== constants.AddressZero ? (
          <p className="ml-5 sm:ml-7 text-white sm:text-[1vw] sm:ml-0">
            Owner:{" "}
            {nft.owner === address ? "You" : nft.owner.substring(0, 9) + "..."}
          </p>
        ) : (
          ""
        )}
      </div>
    );
  };
  return (
    <div className={`${style.main} h-screen w-screen flex flex-col items-center overflow-hidden`} id="root">
      <Head>
        <title>Bao Bao</title>
        <meta name="description" content="Bao Bao NFT mint page" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Shojumaru&family=Single+Day&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar toggleModal={toggleModal} />
      <section className="h-[12%] sm:w-[80%] sm:h-[10%] flex items-center justify-center">
        <div style={{ display: `${isOpen ? "none" : ""}` }}>
          <div className="flex justify-center">
            <div>
              <button
                onClick={() => setSelectAllNft(true)}
                className={`p-2 rounded-md mr-2 ${
                  selectAllNft
                    ? "border-2 border-[#1dfefe] bg-[#1dfefe]"
                    : "border-2 border-[#1dfefe] text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectAllNft(false)}
                className={`p-2 rounded-md ${
                  !selectAllNft
                    ? "border-2 border-[#1dfefe] bg-[#1dfefe]"
                    : "border-2 text-white  border-[#1dfefe]"
                }`}
              >
                My NFTs
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[90%] h-[80%] sm:w-[90%] sm:h-[80%] flex sm:flex-col sm:box-border">
        {loading ? (
          <div className="w-[100%] h-[100%] flex items-center justify-center">
            <h1 className="text-white">Loading...</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center sm:w-[100%] sm:h-[100%] sm:grid sm:grid-cols-3 sm:place-items-center sm:pt-[5%] sm:gap-y-20 overflow-y-scroll scrollbar-hide sm:scrollbar-hide">
            {selectAllNft
              ? allNfts.map((nft, i) => {
                  return renderNFT(nft, i);
                })
              : myNfts.map((nft, i) => {
                  return renderNFT(nft, i);
                })}
          </div>
        )}
      </section>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
          content: {
            position: "absolute",
            top: "5rem",
            bottom: "5rem",
            left: "5rem",
            right: "5rem",
            border: "1px solid #ccc",
            background: "rgba(255,255,255,0.1)",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "10px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <WalletComponent />
      </Modal>
    </div>
  );
}

export default Inventory;
