import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Error = () => {
  const navigate = useNavigate();

  // Use a useEffect to trigger the redirection after the component has rendered
  useEffect(() => {
    // You can trigger the redirection within the useEffect
    const redirectToSignIn = () => {
      navigate("/sign-in");
    };

    // Call the redirection function
    redirectToSignIn();
  }, [navigate]);

  // This component doesn't need to return anything
  return null;
};

export default Error;
