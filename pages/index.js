import Head from "next/head";
import Image from "next/image";
import style from "../styles/Home.module.css";
import Link from "next/link";
import Modal from "react-modal";
import WalletComponent from "../components/WalletComponent";
Modal.setAppElement("#root");
import { useState } from "react";
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <div className={`${style.main} h-screen`} id="root">
      <Head>
        <title>Bao Bao</title>
        <meta name="description" content="Bao Bao NFT mint page" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Shojumaru&family=Single+Day&display=swap"
          rel="stylesheet"
        />
      </Head>
      <nav>
        <div className="flex justify-between ">
          <button className="pb-[0.2rem] pt-2 px-2 m-2 rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]">
            <Image
              src="/previous.png"
              width={`40%`}
              height={`40%`}
              alt="prev"
            />
          </button>
          <div className="flex items-center">
            <Link href="/inventory">
              <a className="py-3 px-5 m-2 border-2 text-white rounded-lg border-[#1dfefe] hover:bg-[#1dfefe] hover:text-black hover:shadow-[0px_0px_75px_5px_#1dfede]">
                Inventory
              </a>
            </Link>
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
          </div>
        </div>
      </nav>
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
              <button className="p-3  font-bold rounded-lg bg-[#1dfefe] shadow-[0px_0px_75px_1px_#1dfede] hover:shadow-[0px_0px_75px_5px_#1dfede]">
                MINT(0.5 MATIC)
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
            left: "15rem",
            right: "15rem",
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
