const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full items-center justify-center flex">
      {children}
    </div>
  );
};

export default layout;
