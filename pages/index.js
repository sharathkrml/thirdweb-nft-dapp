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
  const [claimed, setClaimed] = useState(0);
  const [total, setTotal] = useState(0);
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const nftContract = useNFTDrop(CONTRACTADDR);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);
  const mint = async () => {
    try {
      console.log("minting...");
      setLoading(true);
      const res = await nftContract.claimTo(address, 1);
      console.log(res);
      getTotalSupply();
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalSupply = async () => {
    setLoading(true);
    const unclaimed = await nftContract.totalUnclaimedSupply();
    const claimed = await nftContract.totalClaimedSupply();
    setClaimed(claimed.toString());
    setTotal(unclaimed.toNumber() + claimed.toNumber());
    setLoading(false);
  };
  useEffect(() => {
    getTotalSupply();
  }, [nftContract]);

  const returnButton = () => {
    if (!address) {
      return (
        <button
          onClick={toggleModal}
          className="p-3 font-bold rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]"
        >
          Connect Wallet
        </button>
      );
    }
    if (loading) {
      return (
        <button className="p-3 font-bold rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]">
          loading..
        </button>
      );
    }
    if (address && !loading) {
      return (
        <button
          onClick={mint}
          className="p-3 font-bold rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]"
        >
          Mint({claimed}/{total})
        </button>
      );
    }
  };
  return (
    <div className={`${style.main} min-h-screen w-screen box-border`} id="root">
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
          className="flex flex-col box-border items-center justify-center sm:flex-row sm:w-screen sm:h-screen  sm:fixed"
        >
          <img
            className="self-center border-[8px] border-black mt-[15%] w-[40%] mb-[20px] rounded-[10%] sm:w-[30%] sm:mt-[-8%] sm:mb-0"
            src="./bao-bao.png"
            alt="BAO-BAO"
          />
          <div className=" flex flex-col justify-center items-center box-border sm:w-[60%] sm:items-start sm:pl-[5%] sm:mt-[-8%]">
            <h2 className={`${style.singleDay} text-white text-[7vw] text-center my-3 sm:text-[3vw] sm:my-0 sm:text-left sm:my-5`}>
              Join the revolution now!
            </h2>
            <h1 className={`${style.shojumaru} text-white text-5xl text-center my-3 sm:my-0 sm:text-left sm:max-w-[100%]`}>
              MINT YOUR{" "}
              <span className={`${style.baobao} text-[#1dfefe] text-center my-3 sm:my-0 sm:text-left`}>BAO-BAO</span>
            </h1>
            <p className="w-[100%] max-w-[90%] text-white text-center my-5 sm:text-left sm:max-w-[70%]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Sapiente, magni id ut aperiam quisquam vitae natus in, illo
              molestias, fugit dolores? Veritatis ut dolorum in incidunt, ad
              porro! Ullam necessitatibus laborum quo ea soluta? Tempore debitis
              sed amet ipsam excepturi!
            </p>
            <div className="self-center my-5 btn-wrapper sm:self-start">{returnButton()}</div>
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
