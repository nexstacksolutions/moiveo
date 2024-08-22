import "./App.css";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useMedia } from "./context/MediaContext";

// Common Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ProgressBar from "./components/ProgressBar/ProgressBar";
import ErrorBoundary from "./constant//ErrorBoundary/ErrorBoundary";

function App() {
  const { loading } = useMedia();

  return (
    <ErrorBoundary>
      <ProgressBar />
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
        {loading ? <LoadingSpinner /> : <Outlet />}
        <Footer />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
