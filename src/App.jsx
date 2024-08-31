import "./App.css";
import { Suspense } from "react";
import { Outlet, useNavigation } from "react-router-dom";

// Common Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

function App() {
  const { state } = useNavigation();

  const loading = state === "loading";

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {!loading && <ProgressBar />}
      <Header />
      {loading ? <LoadingSpinner /> : <Outlet />}
      <Footer />
    </Suspense>
  );
}

export default App;
