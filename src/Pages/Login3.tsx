import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Login3() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!code) {
        toast.error("Please fill the code");
        setLoading(false);
        return;
      }

      if (code.length !== 4 || !/^\d{4}$/.test(code)) {
        toast.error("Code must be exactly 4 digits");
        setLoading(false);
        return;
      }

      const response = await authService.loginWithCode(code);

      console.log("res of login is", response);

      if (response.success) {
        toast.success("Login successfully");
        navigate("/");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Could not login";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        {/* Header Section */}
        <div className="text-center">
          {/* <img 
            src="../src/assets/img/dummy/u5.png" 
            alt="User Icon" 
            className="mx-auto h-16 w-16 rounded-full object-cover" 
          /> */}
          <h3 className="mt-4 text-2xl font-bold text-gray-800">Welcome Back</h3>
          <p className="mt-2 text-sm text-gray-500">
            Hey Soldier, welcome back. Sign in now, there is a lot of new stuff waiting for you.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          <div>
            <label htmlFor="code" className="sr-only">
              Enter Code
            </label>
            <input
              id="code"
              type="text"
              className="block w-full rounded-md border border-gray-300 px-3 py-3 text-center text-lg tracking-[0.5em] placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="0000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/, ""))} // allow only numbers
              maxLength={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors 
              ${loading ? "cursor-not-allowed bg-green-400" : "bg-green-600 hover:bg-green-500"}`}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login3;