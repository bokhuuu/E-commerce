import Header from "./components/Header";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
