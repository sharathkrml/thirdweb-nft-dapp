import React, { useState, useEffect } from "react";
import style from "../../styles/Home.module.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useAddress, useNFTDrop } from "@thirdweb-dev/react";
import { CONTRACTADDR } from "../../constants";
import WalletComponent from "../../components/WalletComponent";
import Modal from "react-modal";
Modal.setAppElement("#root");
function NFTComponent() {
  const router = useRouter();
  const [nftData, setNftData] = useState();
  const [loading, setLoading] = useState(true);
  const [transferring, setTransferring] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");
  const nftContract = useNFTDrop(CONTRACTADDR);
  const address = useAddress();
  const { nftId } = router.query;
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const transferNFT = async () => {
    try {
      setTransferring(true);
      const res = await nftContract.transfer(transferAddress, nftId);
      console.log(res);
      setTransferring(false);
      getNFTData();
    } catch (error) {
      setTransferring(false);

      console.log(error);
    }
  };

  const getNFTData = async () => {
    try {
      setLoading(true);
      const res = await nftContract.get(nftId);
      setNftData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };
  useEffect(() => {
    if (nftId) {
      getNFTData();
    }
  }, [nftId]);
  useEffect(() => {
    if (address) {
      setIsOpen(false);
    }
  }, [address]);

  return (
    <div className={`${style.main} min-h-screen w-screen box-border overflow-hidden`} id="root">
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
      <Navbar toggleModal={toggleModal} nft />
      <section>
        <div style={{ display: `${isOpen ? "none" : ""} w-screen h-screen ` }}>
          {loading ? (
            <div className="flex h-screen items-center justify-center">
              <h1 className="text-white">Loading...</h1>
            </div>
          ) : (
            <div className="flex w-[100%] h-[100%]  items-center justify-center sm:w-screen sm:h-[80vh]">
              <div className="flex flex-col  box-border items-center sm:w-[80%] sm:mt-0 sm:flex-row sm:items-center sm:justify-center">
                <img src={nftData.metadata.image} alt="im" className="w-[50%] min-w-[200px] border-[8px] border-black mt-0 mr-0 rounded-[10%] sm:mt-[-5%] sm:w-[30%] sm:mr-[15%]"/>
                <div className="details flex flex-col items-center w-screen mt-0 max-w-[80%] sm:w-[60%] sm:h-[60vh]  sm:items-start sm:pt-[1%]">
                  <h1 className="text-white text-center text-[10vw] font-bold max-w-[60%] sm:text-[4vw]">
                    {nftData.metadata.name}
                  </h1>
                  <p className="text-white  text-center text-[4vw] sm:text-left sm:text-[1vw] sm:my-[20px]">
                    {nftData.metadata.description}
                  </p>
                  {address && address == nftData.owner && (
                    <>
                      <input
                        type="text"
                        className="w-[70%] p-2 my-1 min-h-[50px] min-w-[250px] rounded-lg disabled:bg-slate-600 disabled:cursor-wait focus:outline-none focus:shadow-[0px_0px_75px_1px_#1dfede]"
                        placeholder="Add Address"
                        value={transferAddress}
                        onChange={(e) => setTransferAddress(e.target.value)}
                        disabled={transferring ? "disabled" : ""}
                      />
                      <br />
                      {transferring ? (
                        <button
                          disabled={transferring ? "disabled" : ""}
                          className="pb-[0.2rem] p-2 m-2 rounded-lg bg-slate-600 cursor-wait shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]"
                        >
                          Transferring
                        </button>
                      ) : (
                        <button
                          onClick={transferNFT}
                          className="pb-[0.2rem] p-2 m-2 rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]"
                        >
                          Transfer
                        </button>
                      )}
                    </>
                  )}
                  {address != nftData.owner && (
                    <p className="text-white my-2 font-bold text-[5vw] sm:text-[2vw] text-left self-start max-w-[75%]">
                      Owner :
                      <br /> <span className="text-[3.5vw] font-light sm:text-[1vw]">{nftData.owner}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
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

export default NFTComponent;
