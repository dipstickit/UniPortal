import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

type Props = {
  isSchoolPage?: boolean;
};


const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [openSchool, setOpenSchool] = useState(false);
  const [value, setValue] = useState("fpt");
  return (
    <section className="border-b-2 flex justify-center px-1 sticky top-0 z-10 bg-white">
      <div className="px-5 w-full flex justify-center items-center">
        <div className="w-full flex py-2 justify-between">
          <div className="flex gap-8">
            <Link to="/admin" className="flex items-center gap-2">
              <img src="/icon.png" className="w-9 h-9" />
              <div className="text-3xl flex justify-end font-bold font-serif">
                <span className="text-black">Uni</span>
                <span className="text-accent-dark">Portal</span>
              </div>
            </Link>
          </div>
          <UserMenu />
        </div>
      </div>
    </section>
  );
};
export default AdminHeader;