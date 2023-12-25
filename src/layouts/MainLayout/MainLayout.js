import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="content">{children}</div>
    </div>
  );
};

export default MainLayout;
