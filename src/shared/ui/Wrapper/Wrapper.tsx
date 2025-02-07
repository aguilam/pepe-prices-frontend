import React from "react";
interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<WrapperProps> = React.memo(({ children, className }) => {
  return (
    <div className={`${className} bg-card-bg-color border-card-border-color border rounded-lg p-5`}>
      {children}
    </div>
  );
})
export default Wrapper;
