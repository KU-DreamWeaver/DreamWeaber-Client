import React from "react";

interface MobileContainerProps {
  children: React.ReactNode;
}

const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen max-w-[430px] mx-auto bg-background relative shadow-xl overflow-hidden">
      {children}
    </div>
  );
};

export default MobileContainer;
