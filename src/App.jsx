import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import CoursePage from "./pages/CoursePage";
import FeedPage from "./pages/FeedPage";
import HomePage from "./pages/HomePage";
import MessagesPage from "./pages/MessagesPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/feed"
        element={
          <AppShell>
            <FeedPage />
          </AppShell>
        }
      />
      <Route
        path="/courses"
        element={
          <AppShell>
            <CoursePage />
          </AppShell>
        }
      />
      <Route
        path="/messages"
        element={
          <AppShell>
            <MessagesPage />
          </AppShell>
        }
      />
      <Route
        path="/profile"
        element={
          <AppShell>
            <ProfilePage />
          </AppShell>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
