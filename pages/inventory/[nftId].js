import React, { useState } from "react";
import style from "../../styles/Home.module.css";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import WalletComponent from "../../components/WalletComponent";
import Modal from "react-modal";
Modal.setAppElement("#root");
function nftId() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { nftId } = router.query;
  console.log(nftId);
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={`${style.main} min-h-screen`} id="root">
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
        <div style={{ display: `${isOpen ? "none" : ""}` }}>
          {loading ? (
            <div className="flex h-[75vh] items-center justify-center">
              <h1>Loading</h1>
            </div>
          ) : (
            <div></div>
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

export default nftId;
