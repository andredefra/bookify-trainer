import { DashboardContainer } from "@/components/trainer/dashboard/DashboardContainer";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardBasic = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("demo-user");
    if (!user) {
      navigate("/login");
    } else {
      const userData = JSON.parse(user);
      if (userData.type === "client") {
        navigate("/client-dashboard");
      }
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Trainer Dashboard — Basic</title>
        <meta name="format-detection" content="telephone=no,date=no,address=no,email=no,url=no" />
      </Helmet>
      <div className="max-w-full overflow-x-hidden" data-lpignore="true">
        <DashboardContainer customName="Trainer (Basic)" plan="basic" />
      </div>
    </>
  );
};

export default DashboardBasic;
