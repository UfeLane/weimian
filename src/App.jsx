import { useEffect, useRef, useState } from "react";
import { BottomNav, Toast } from "./components/UI";
import AdverseRecordPage from "./pages/AdverseRecordPage";
import FAQPage from "./pages/FAQPage";
import HomePage from "./pages/HomePage";
import MedicationPage from "./pages/MedicationPage";
import ReportPage from "./pages/ReportPage";
import SleepRecordPage from "./pages/SleepRecordPage";

const tabPages = new Set(["home", "report", "medication", "faq"]);

export default function App() {
  const [page, setPage] = useState("home");
  const [previousPage, setPreviousPage] = useState("home");
  const [toast, setToast] = useState("");
  const contentRef = useRef(null);

  const navigate = (nextPage) => {
    setPreviousPage(page);
    setPage(nextPage);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (message) => {
    setToast(message);
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const activeTab = tabPages.has(page)
    ? page
    : page === "sleep"
      ? "report"
      : "medication";

  let content;
  if (page === "sleep") {
    content = (
      <SleepRecordPage
        onBack={() => navigate(previousPage)}
        onSaved={() => showToast("睡眠记录已保存到好眠档案")}
      />
    );
  } else if (page === "medication") {
    content = <MedicationPage onNavigate={navigate} onToast={showToast} />;
  } else if (page === "adverse") {
    content = (
      <AdverseRecordPage
        onBack={() => navigate(previousPage)}
        onSaved={() =>
          showToast("记录已保存。若症状明显或持续，请及时咨询医生或药师。")
        }
      />
    );
  } else if (page === "report") {
    content = <ReportPage onToast={showToast} />;
  } else if (page === "faq") {
    content = <FAQPage />;
  } else {
    content = <HomePage onNavigate={navigate} onToast={showToast} />;
  }

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="phone-content" ref={contentRef}>
          {content}
        </div>
        <BottomNav active={activeTab} onNavigate={navigate} />
        <Toast message={toast} />
      </div>
    </div>
  );
}
