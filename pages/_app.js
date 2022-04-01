import "../styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CHAINID } from "../constants";
function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={CHAINID}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
