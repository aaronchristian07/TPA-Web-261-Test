import { useNavigate } from "react-router";
import { handleInput } from "../lib/util";
import { useState } from "react";
import type { AuthResponse, RegisterRequest } from "../dto/authDto";
import { registerApi } from "../api/authApi";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    // const [birthday, setBirthday] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const validateInputs = (): boolean => {
        if (username.length <= 0) {
            setError("Fill in your username")
            return false;
        }
        if (username.length < 8 || username.length > 20) {
            setError("Username must be between 8 and 20 characters")
            return false;
        }
        if (email.length <= 0) {
            setError("Enter your email address")
            return false;
        }
        if (!email.includes('@')) {
            setError("Invalid email address")
            return false;
        }
        if (password.length <= 0) {
            setError("Fill in your password")
            return false;
        }
        if (password.length < 8 || password.length > 20) {
            setError("Password must be between 8 and 20 characters")
            return false;
        }
        if (password !== confirmPassword) {
            setError("Confirm password must be the same!")
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {
        try {
            console.log("submitting")
            if (loading) return;
            console.log("loading")
            setLoading(true);
            
            console.log("validating")
            if (!validateInputs()) {
                return;
            }

            setError("");
            
            const req: RegisterRequest = {
                username: username,
                email: email,
                password: password,
            }
            const response: AuthResponse | null = await registerApi({req, setError});
            if (response) {
                console.log("bruh")
                navigate("/dashboard")
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
                <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                    Username
                </label>
                <div className="mt-1">
                    <input
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required autoComplete="username" type="text" name="username" id="username"
                        value={username}    
                        onChange={(e) => setUsername(handleInput(e.target.value))} 
                    />
                </div>
                </div>

                <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                    Email address
                </label>
                <div className="mt-1">
                    <input
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required autoComplete="email" type="email" name="email" id="email"
                        value={email}
                        onChange={(e) => setEmail(handleInput(e.target.value))}    
                    />
                </div>
                </div>

                <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                    Password
                </label>
                <div className="mt-1">
                    <input
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required autoComplete="current-password" type="password" name="password" id="password"
                        value={password}
                        onChange={(e) => setPassword(handleInput(e.target.value))}
                    />
                </div>
                </div>

                <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="confirm-password">
                    Confirm Password
                </label>
                <div className="mt-1">
                    <input
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required autoComplete="current-password" type="password" name="confirm-password" id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(handleInput(e.target.value))}
                    />
                </div>
                </div>

                {/* <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700" htmlFor="dob">
                    Date of Birth
                </label>
                <div className="mt-1">
                    <input
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required type="date" name="dob" id="dob"
                        value={birthday}
                        onChange={(e) => setBirthday(handleInput(e.target.value))}    
                    />
                </div>
                </div> */}
                
                {/* <div className="flex items-center justify-center mt-6">
        <span className="mr-3 text-gray-700 font-medium">Gender:</span>
        <label className="inline-flex items-center">
            <input type="radio" className="form-radio h-5 w-5 text-pink-600" name="gender" value="Male" />
            <span className="ml-2 text-gray-700">Male</span>
        </label>
        <label className="inline-flex items-center ml-6">
            <input type="radio" className="form-radio h-5 w-5 text-purple-600" name="gender" value="Female" />
            <span className="ml-2 text-gray-700">Female</span>
        </label>
        </div>
                <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center">
                    <input className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" type="checkbox" name="terms-and-condition" id="terms-and-condition" />
                    <label className="ml-2 block text-sm text-gray-900" htmlFor="terms-and-condition">
                    I agree to the terms and conditions
                    </label>
                </div>
                </div> */}

                <div className="mt-6">
                <button
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}
                >
                    Sign up
                </button>
                </div>
            </div>

            <a
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
              onClick={() => navigate("/auth/login")}
            >Already have an account? Sign in
            </a>
            </div>

            {error != "" &&
                <p className="mt-8 font-serif text-red-500 text-md">{error}</p>
            }
        </div>
        </div>
  );
}