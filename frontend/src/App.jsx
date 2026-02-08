import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Banner from "./pages/home/Banner";
import Members from "./pages/home/Members";
import MissionVision from "./pages/home/Mission_Vision";
import Mission from "./pages/navbar-content/about-us/aboutBITPFC/Mission";
import Vision from "./pages/navbar-content/about-us/aboutBITPFC/Vision";
import Goal from "./pages/navbar-content/about-us/aboutBITPFC/Goal";
import FounderMessage from "./pages/navbar-content/about-us/FounderMessage";
import AdvisorTeam from "./pages/navbar-content/about-us/AdvisorTeam";
import ExecutivesCommittee from "./pages/navbar-content/about-us/Executives_Committee";
import BenifitsOfMember from "./pages/home/BenifitsOfMember";
import UpcomingEvent from "./pages/home/UpcomingEvent";
import ExecutiveCommittee from "./pages/home/ExecutiveCommmittee";
import NewsRoom from "./pages/home/NewsRoom";
import OurPartner from "./pages/home/OurPartner";
import Registration from "./pages/login-registration/Registration";
import Login from "./pages/login-registration/Login";
import AdminDashboard from "./admin-panel/dashboard/AdminDashboard";
import BannerUpload from "./admin-panel/settings/BannerUpload";
import MembersAdmin from "./admin-panel/main/Members/MembersAdmin";
import MembershipCategory from "./admin-panel/main/Members/MembershipCategory";
import RegisteredMembers from "./admin-panel/main/Members/RegisteredMembers";
import AssignMember from "./admin-panel/main/Members/AssignMember";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Banner />
              <Members />
              <MissionVision />
              <BenifitsOfMember />
              <UpcomingEvent />
              <ExecutiveCommittee />
              <NewsRoom />
              <OurPartner />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Registration />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <MissionVision />
            </Layout>
          }
        />
        <Route
          path="/about/mission"
          element={
            <Layout>
              <Mission />
            </Layout>
          }
        />
        <Route
          path="/about/founder-message"
          element={
            <Layout>
              <FounderMessage />
            </Layout>
          }
        />
        <Route
          path="/about/advisor-team"
          element={
            <Layout>
              <AdvisorTeam />
            </Layout>
          }
        />
        <Route
          path="/about/executives-committee"
          element={
            <Layout>
              <ExecutivesCommittee />
            </Layout>
          }
        />
        <Route
          path="/about/vision"
          element={
            <Layout>
              <Vision />
            </Layout>
          }
        />
        <Route
          path="/about/goal"
          element={
            <Layout>
              <Goal />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<div>Welcome to admin dashboard</div>} />
          <Route path="settings/banner" element={<BannerUpload />} />

          <Route path="members" element={<MembersAdmin />}>
            <Route index element={<MembershipCategory />} />
            <Route path="category" element={<MembershipCategory />} />
            <Route path="registered" element={<RegisteredMembers />} />
            <Route path="assign" element={<AssignMember />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
