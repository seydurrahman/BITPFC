import React from "react";
import BannerUploadList from "./BannerUploadList";
import withAdmin from "./withAdmin";

function BannerUpload() {
  return (
    <div className="banner-upload">
      {/* Add your upload form or component here */}
      <BannerUploadList />
    </div>
  );
}

export default withAdmin(BannerUpload);
