import React from "react";
import style from "../../styles/Home.module.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import Modal from "react-modal";
import WalletComponent from "../../components/WalletComponent";
import { CONTRACTADDR } from "../../constants";
Modal.setAppElement("#root");
function Inventory() {
  const [isOpen, setIsOpen] = useState(false);
  const address = useAddress();
  const nftContract = useNFTDrop(CONTRACTADDR);
  const getAllNFT = async () => {
    try {
      const all = await nftContract.getAll();
      console.log(all);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllNFT();
  }, []);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${style.main} h-screen`} id="root">
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
      <section>
        <div style={{ display: `${isOpen ? "none" : ""}` }}>
          <div className="flex justify-center">
            <div>
              <button className="p-2 rounded-md mr-2 text-white border-2 border-[#1dfefe]">
                All
              </button>
              <button className="p-2 rounded-md border-2 border-[#1dfefe] bg-[#1dfefe]">
                My NFTs
              </button>
            </div>
          </div>
        </div>
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
