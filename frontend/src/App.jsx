import Layout from "./components/Layout";
import Banner from "./pages/home/Banner";
import Members from "./pages/home/Members";
import MissionVision from "./pages/home/Mission_Vision";
import BenifitsOfMember from "./pages/home/BenifitsOfMember";
import UpcomingEvent from "./pages/home/UpcomingEvent";

function App() {
  return (
    <Layout>
      <Banner />
      <Members />
      <MissionVision />
      <BenifitsOfMember />
      <UpcomingEvent />
    </Layout>
  );
}

export default App;
