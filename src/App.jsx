import { useEffect, useRef, useState } from "react";
import { BottomNav, DoctorFloatButton, Toast } from "./components/UI";
import { buildDemoRuntime, buildInitialDemoState } from "./demo-state";
import { medicationLibrary } from "./data";
import AdverseRecordPage from "./pages/AdverseRecordPage";
import FAQPage from "./pages/FAQPage";
import HomePage from "./pages/HomePage";
import MedicationDetailPage from "./pages/MedicationDetailPage";
import MedicationPage from "./pages/MedicationPage";
import ReportPage from "./pages/ReportPage";
import SleepRecordPage from "./pages/SleepRecordPage";

const tabPages = new Set(["home", "report", "medication", "faq"]);

export default function App() {
  const [page, setPage] = useState("home");
  const [previousPage, setPreviousPage] = useState("home");
  const [toast, setToast] = useState("");
  const [demoState, setDemoState] = useState(buildInitialDemoState);
  const contentRef = useRef(null);
  const demoRuntime = buildDemoRuntime(demoState);

  const navigate = (nextPage) => {
    setPreviousPage(page);
    setPage(nextPage);
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToast = (message) => {
    setToast(message);
  };

  const saveSleepRecord = (record) => {
    setDemoState((current) => ({
      ...current,
      sleepDiaryHighlights: [...current.sleepDiaryHighlights.slice(-2), record],
    }));
    showToast("睡眠记录已保存到好眠档案");
  };

  const saveAdverseRecord = (record) => {
    setDemoState((current) => ({
      ...current,
      adverseRecords: [...current.adverseRecords, record].slice(-5),
    }));
    showToast("记录已保存。若症状明显或持续，请及时咨询医生或药师。");
  };

  const updateReminderTime = (time) => {
    setDemoState((current) => ({
      ...current,
      reminderTime: time,
    }));
  };

  const importMedication = (medicationId) => {
    const medication = medicationLibrary.find((item) => item.id === medicationId);
    setDemoState((current) => ({
      ...current,
      importedMedicationId: medicationId,
      reminderTime: medication?.reminderTime ?? current.reminderTime,
    }));
  };

  const toggleMedicationCheck = () => {
    setDemoState((current) => ({
      ...current,
      todayMedicationDone: !current.todayMedicationDone,
    }));
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
        demoRuntime={demoRuntime}
        onBack={() => navigate(previousPage)}
        onSaved={saveSleepRecord}
      />
    );
  } else if (page === "medication") {
    content = (
      <MedicationPage
        demoRuntime={demoRuntime}
        onImportMedication={importMedication}
        onNavigate={navigate}
        onToggleCheck={toggleMedicationCheck}
        onToast={showToast}
      />
    );
  } else if (page === "medication-detail") {
    content = (
      <MedicationDetailPage
        demoRuntime={demoRuntime}
        onBack={() => navigate("medication")}
        onUpdateReminderTime={updateReminderTime}
      />
    );
  } else if (page === "adverse") {
    content = (
      <AdverseRecordPage
        demoRuntime={demoRuntime}
        onBack={() => navigate(previousPage)}
        onSaved={saveAdverseRecord}
      />
    );
  } else if (page === "report") {
    content = <ReportPage demoRuntime={demoRuntime} onToast={showToast} />;
  } else if (page === "faq") {
    content = <FAQPage demoRuntime={demoRuntime} />;
  } else {
    content = <HomePage demoRuntime={demoRuntime} onNavigate={navigate} onToast={showToast} />;
  }

  return (
    <div className="app-shell">
      <div className="phone">
        <div className="phone-content" ref={contentRef}>
          {content}
        </div>
        {page !== "faq" ? <DoctorFloatButton onClick={() => navigate("faq")} /> : null}
        <BottomNav active={activeTab} onNavigate={navigate} />
        <Toast message={toast} />
      </div>
    </div>
  );
}
