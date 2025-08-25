import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white text-center">
      <h1 className="text-4xl font-bold text-heading mb-4">Thank You!</h1>
      <p className="text-xl text-secondary mb-6 font-bold">
        Your form has been successfully submitted. You will get call soon.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 bg-primary text-tertiary rounded-lg shadow-md hover:bg-secondary hover:text-white cursor-pointer"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ThankYou;
