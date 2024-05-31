import React from "react";
import Link from "next/link";
import "./signIn.css";

const SignIn = () => {
	return (
		<>
			<main className="h-screen flex items-center justify-center bg-airplain-img">
				<div className="w-full max-w-sm">
					<form className="bg-white px-8 pt-6 pb-8 mb-4 rounded-xl shadow-md bg-opacity-90">
						<div className="mb-5">
							<label className="block text-sm font-bold mb-2">
								Email
							</label>
							<input
								className="w-full py-2 px-3 shadow border rounded focus:outline-none"
								id="email"
								type="text"
								placeholder="Email"
							/>
						</div>
						<div className="mb-6">
							<label className="block text-sm font-bold mb-2">
								Password
							</label>
							<input
								className="shadow border rounded w-full py-2 px-3 focus:outline-none"
								id="password"
								type="password"
								placeholder="**********"
							/>
						</div>
						<div className="flex items-center justify-between mb-5">
							<Link
								className="font-bold text-sm text-gray-400 hover:text-black"
								href="/createAccount"
							>
								Create Account
							</Link>
							<Link
								className="font-bold text-sm text-gray-400 hover:text-black"
								href="/resetPassword"
							>
								Forgot Password?
							</Link>
						</div>
						<button
							className="w-full py-2 px-4 rounded bg-black text-white font-bold border border-transparent hover:bg-white hover:text-black hover:border-black"
							type="button"
						>
							Sign In
						</button>
					</form>
				</div>
			</main>
		</>
	);
};

export default SignIn;
