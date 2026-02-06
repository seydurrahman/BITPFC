import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Banner from "./pages/home/Banner";
import Members from "./pages/home/Members";
import MissionVision from "./pages/home/Mission_Vision";
import BenifitsOfMember from "./pages/home/BenifitsOfMember";
import UpcomingEvent from "./pages/home/UpcomingEvent";
import ExecutiveCommittee from "./pages/home/ExecutiveCommmittee";
import NewsRoom from "./pages/home/NewsRoom";
import OurPartner from "./pages/home/OurPartner";
import Registration from "./pages/login-registration/Registration";
import Login from "./pages/login-registration/Login";

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
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
