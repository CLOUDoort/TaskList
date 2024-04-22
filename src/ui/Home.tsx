import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-between w-full h-screen bg-gradient-to-r from-HomeFrom to-HomeTo">
      <header className="flex items-center w-full gap-3 ml-12 h-28">
        <img src="/Logo.png" alt="Logo" className="size-7 md:size-10" />
        <h4 className="text-h5 md:text-h4">ActionMatrix</h4>
      </header>
      <main className="flex flex-col items-center justify-center h-full gap-20 mb-16 text-center">
        <div className="space-y-3 tracking-wider">
          <h1 className="text-h3 md:text-h2">
            Prioritize Your Work Like <br /> Never Before!
          </h1>
          <h3 className="text-h5 md:text-h4">
            start with something that's really{' '}
            <span className="text-High1">important</span> but{' '}
            <span className="text-Low1">easy</span> task.
          </h3>
        </div>
        <div className="space-x-6">
          <button
            onClick={() => navigate('/app/todo')}
            className="px-6 py-4 text-white transition-all duration-300 bg-blue-500 w-36 md:px-8 md:py-4 md:text-h5 md:w-44 rounded-xl hover:bg-blue-600 active:bg-blue-700"
          >
            Get Started
          </button>
          <button className="px-6 py-4 text-blue-500 transition-all duration-300 border-2 border-blue-500 w-36 md:px-8 md:py-4 md:text-h5 md:w-44 rounded-xl">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;