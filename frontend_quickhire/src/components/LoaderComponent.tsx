import React from "react";

interface LoaderProps {
  size?: number;
  fullScreen?: boolean;
}

const LoaderComponent: React.FC<LoaderProps> = ({ size = 40, fullScreen = false }) => {
  const spinner = (
    <div
      className="animate-spin rounded-full border-t-2 border-b-2 border-blue-500"
      style={{
        width: size,
        height: size,
      }}
    ></div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex justify-center py-10">
      {spinner}
    </div>
  );
};

export default LoaderComponent;