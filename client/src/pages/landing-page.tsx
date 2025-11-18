import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div>
      <button className="p-4 bg-black text-white rounded-xl m-5" onClick={() => navigate("/signup")}>Signup</button>
      <button className="p-4 bg-black text-white rounded-xl m-5" onClick={() => navigate("/signin")}>Signin</button>
    </div>
  );
}
