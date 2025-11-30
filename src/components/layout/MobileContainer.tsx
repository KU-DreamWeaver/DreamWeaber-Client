import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen max-w-[430px] mx-auto relative shadow-xl overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #edc8ff 0%, #ffffff 100%)",
      }}
    >
      {children}
    </div>
  );
};

export default MobileContainer;
