
import { DashboardContainer } from "@/components/trainer/dashboard/DashboardContainer";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Trainer Dashboard</title>
      </Helmet>
      <div className="max-w-full overflow-x-hidden">
        <DashboardContainer customName="Trainer" />
      </div>
    </>
  );
};

export default Dashboard;
