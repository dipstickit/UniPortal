import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckboxLabel } from "@/components/common/CheckboxLabel";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setFullname] = useState("");
  const [showingPassword, setShowingPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="shadow-md my-4">
      <section className="grid grid-cols-2">
        <form className="flex flex-col items-center text-black justify-center p-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-semibold mb-2">SIGN UP</h1>
            <h2 className="w-full text-lg text-black/50 font-semibold">
              Nhập thông tin của bạn
            </h2>
          </div>
          <div className="w-full max-w-md flex flex-col">
            <label className="font-semibold mb-2">Tên đầy đủ:</label>
            <Input
              type="email"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setFullname(e.target.value)}
              className="block w-full px-2 py-3 border border-gray-300 focus:ring-white-500 focus:border-white-500 mb-4"
            />
            <label className="font-semibold mb-2">Email:</label>
            <Input
              type="email"
              placeholder="John@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-2 py-3 border border-gray-300 focus:ring-white-500 focus:border-white-500 mb-4"
            />
            <label className="font-semibold mb-2">Mật khẩu:</label>
            <Input
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-2 py-3 border border-gray-300 focus:ring-white-500 focus:border-white-500 mb-6"
            />
            {/* <div className="flex justify-between mb-2">
              <CheckboxLabel label="Remember me" />
              <Link
                to="/forgot-password"
                className="text-md text-gray-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div> */}
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full text-white font-semibold py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50"
            >
              Đăng kí
            </Button>
            <div className="text-center justify-center p-4">
              <div className='flex justify-center text-center border-b-2 border-gray-300 relative mt-4'>
                <span className='absolute top-[-0.8rem] bg-white text-gray-500 px-2'>Hoặc</span>
              </div>
              <Button className="bg-white text-black hover:bg-slate-200 w-full hover:text-black mt-4">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  className="w-3.5 h-3.5 mr-3 "
                  alt=""
                />
                Đăng nhập bằng Google
              </Button>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full hover:text-white mt-4">
                <img
                  src="https://www.svgrepo.com/show/448224/facebook.svg"
                  className="w-5 h-5 mr-3 "
                  alt=""
                />
                Đăng nhập bằng Facebook
              </Button>
              <div className="mt-2 text-white-300">
                Đã có tài khoản?
                <Link to="/signin" className="ml-4 text-accent font-semibold">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </form>
        <div className="bg-gradient-to-b rounded-r from-black/90 via-gray-500 to-gray-200 text-white font-semibold justify-center text-center overflow-hidden">
          <h1 className="text-4xl py-10">Tham gia cổng thông tin tốt nhất</h1>
          <img className="w-full" src="https://hcmuni.fpt.edu.vn/Data/Sites/1/media/2020-kim-vi/seo/campus/1-truong-dai-hoc-fpt-tphcm/truong-dai-hoc-fpt-tp-hcm-(1).jpg"></img>
        </div>
      </section>
    </div>
  );
};

export default Signup;

