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
import MemberList from "./pages/navbar-content/membership/MemberList";
import MemberCriteria from "./pages/navbar-content/membership/MemberCriteria";
import MembershipFee from "./pages/navbar-content/membership/MembershipFee";
import CodeOfConduct from "./pages/navbar-content/membership/CodeOfConduct";
import News from "./pages/navbar-content/media-center/News";
import Gallery from "./pages/navbar-content/media-center/Gallery";
import VideoGallery from "./pages/navbar-content/media-center/VideoGallery";
import KnowledgeSharingFr from "./pages/navbar-content/Initiatives/events/KnowledgeSharingFr";
import Contact from "./pages/navbar-content/contact/Contact";
import Training from "./pages/navbar-content/study-center/Training";
import Webinar from "./pages/navbar-content/study-center/Webinar";
import NewsRoom from "./pages/home/NewsRoom";
import OurPartner from "./pages/home/OurPartner";
import Registration from "./pages/login-registration/Registration";
import Login from "./pages/login-registration/Login";
import AdminDashboard from "./admin-panel/dashboard/AdminDashboard";
import BannerUpload from "./admin-panel/settings/BannerUpload";
import WebsiteInfo from "./admin-panel/settings/WebsiteInfo";
import GalleryMedia from "./admin-panel/main/media/GalleryMedia";
import MembersAdmin from "./admin-panel/main/Members/MembersAdmin";
import MembershipCategory from "./admin-panel/main/Members/MembershipCategory";
import RegisteredMembers from "./admin-panel/main/Members/RegisteredMembers";
import AssignMember from "./admin-panel/main/Members/AssignMember";
import NewsRoomMedia from "./admin-panel/main/media/NewsRoomMedia";
import VideoMedia from "./admin-panel/main/media/VideoMedia";
import KnowledgeSharing from "./admin-panel/main/events/Knowledge_Sharing";
import TrainingWebinar from "./admin-panel/main/media-center/Training-Webinar";

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
          path="/membership/memberlist"
          element={
            <Layout>
              <MemberList />
            </Layout>
          }
        />
        <Route
          path="/membership/list"
          element={
            <Layout>
              <MemberList />
            </Layout>
          }
        />
        <Route
          path="/membership/criteria"
          element={
            <Layout>
              <MemberCriteria />
            </Layout>
          }
        />

        <Route
          path="/membership/fee"
          element={
            <Layout>
              <MembershipFee />
            </Layout>
          }
        />

        <Route
          path="/membership/code-of-conduct"
          element={
            <Layout>
              <CodeOfConduct />
            </Layout>
          }
        />

        <Route
          path="/media/news"
          element={
            <Layout>
              {" "}
              <News />
            </Layout>
          }
        />

        <Route
          path="/media/photos"
          element={
            <Layout>
              <Gallery />
            </Layout>
          }
        />

        <Route
          path="/media/videos"
          element={
            <Layout>
              <VideoGallery />
            </Layout>
          }
        />

        <Route
          path="/study/training"
          element={
            <Layout>
              <Training />
            </Layout>
          }
        />

        <Route
          path="/study/webinar"
          element={
            <Layout>
              <Webinar />
            </Layout>
          }
        />

        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
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
          path="/events/knowledge-sharing"
          element={
            <Layout>
              <KnowledgeSharingFr />
            </Layout>
          }
        />

        <Route
          path="/initiatives/events/knowledge-sharing"
          element={
            <Layout>
              <KnowledgeSharingFr />
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
          <Route path="settings/website-info" element={<WebsiteInfo />} />
          <Route path="settings/study-center" element={<TrainingWebinar />} />
          <Route
            path="settings/knowledge-sharing"
            element={<KnowledgeSharing />}
          />

          <Route path="members" element={<MembersAdmin />}>
            <Route index element={<MembershipCategory />} />
            <Route path="category" element={<MembershipCategory />} />
            <Route path="registered" element={<RegisteredMembers />} />
            <Route path="assign" element={<AssignMember />} />
          </Route>
          <Route path="media/news-room" element={<NewsRoomMedia />} />
          <Route path="media/video-media" element={<VideoMedia />} />
          <Route path="media/gallery" element={<GalleryMedia />} />
          <Route
            path="events/knowledge-sharing"
            element={<KnowledgeSharing />}
          />
        </Route>
        <Route path="/admin/settings/website-info" element={<AdminDashboard />}>
          <Route index element={<WebsiteInfo />} />
        </Route>
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
