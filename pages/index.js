import Head from "next/head";
import style from "../styles/Home.module.css";
import Modal from "react-modal";
import WalletComponent from "../components/WalletComponent";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { CONTRACTADDR } from "../constants";
Modal.setAppElement("#root");
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const address = useAddress();
  const nftContract = useNFTDrop(CONTRACTADDR);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);
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
      <Navbar toggleModal={toggleModal} main />
      <section>
        <div
          style={{ display: `${isOpen ? "none" : ""}` }}
          className="flex mt-[5%]  mx-24"
        >
          <img
            className="border-[8px] w-[40%] h-[40%] border-black rounded-[10%]"
            src="./bao-bao.png"
            alt="BAO-BAO"
          />
          <div className="m-10 flex flex-col justify-between">
            <h2 className={`${style.singleDay} text-white text-5xl`}>
              Join the revolution now!
            </h2>
            <h1 className={`${style.shojumaru} text-white text-5xl`}>
              MINT YOUR{" "}
              <span className={`${style.baobao} text-[#1dfefe]`}>BAO-BAO</span>
            </h1>
            <p className="w-[80%] text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Sapiente, magni id ut aperiam quisquam vitae natus in, illo
              molestias, fugit dolores? Veritatis ut dolorum in incidunt, ad
              porro! Ullam necessitatibus laborum quo ea soluta? Tempore debitis
              sed amet ipsam excepturi!
            </p>
            <div className="btn-wrapper">
              {address ? (
                <button className="p-3  font-bold rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]">
                  MINT(0.5 MATIC)
                </button>
              ) : (
                <button
                  onClick={toggleModal}
                  className="p-3  font-bold rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]"
                >
                  Connect Wallet
                </button>
              )}
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
