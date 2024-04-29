import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { TrophyIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout, setCredentials } from "../../features/auth/authSlice";
import UserMenu from "./UserMenu";

type Props = {
  isSchoolPage?: boolean;
};

const schools = [
  {
    value: "42",
    label: "Đại học Bách Khoa Hà Nội",
  },
  {
    value: "2",
    label: "Trường Đại học Công nghệ Thông tin",
  },
  {
    value: "6",
    label: "Trường Đại học Quốc Tế",
  },
];

const Header = ({ isSchoolPage }: Props) => {
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [openSchool, setOpenSchool] = useState(false);
  const [value, setValue] = useState("42");

  return (
    <section className="border-b-2 flex justify-center px-1 sticky top-0 z-10 bg-white">
      <div className="max-w-7xl w-full flex justify-center items-center">
        <div className="w-full flex py-2 justify-between">
          <div className="flex gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img src="/icon.png" className="w-9 h-9" />
              <div className="text-3xl flex justify-end font-bold font-serif">
                <span className="text-black">Uni</span>
                <span className="text-accent-dark">Portal</span>
              </div>
            </Link>
            {isSchoolPage && (
              <Popover open={openSchool} onOpenChange={setOpenSchool}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSchool}
                    className="w-64 justify-between"
                  >
                    {value
                      ? schools.find((school) => school.value === value)?.label
                      : "Chọn trường..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search school..."
                      className="h-9"
                    />
                    <CommandEmpty>No school found.</CommandEmpty>
                    <CommandGroup>
                      {schools.map((school) => (
                        <CommandItem
                          key={school.value}
                          value={school.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpenSchool(false);
                          }}
                        >
                          {school.label}
                          <CheckIcon
                            className={`ml-auto h-4 w-4 ${value === school.value
                              ? "opacity-100"
                              : "opacity-0"
                              }`}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="flex gap-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-base"
                    onClick={() => navigate("/admission-info")}
                  >
                    Thông tin tuyển sinh
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col px-4 pb-2 md:w-[25rem] lg:w-[28rem] list-none divide-y gap-2">
                    <li className="font-semibold text-gray-700 hover:text-accent pt-2">
                        <Link to='/admission-info/major-codes'>
                          Danh mục toàn bộ mã ngành tương ứng với các ngành
                        </Link>
                      </li>
                      <li className="font-semibold text-gray-700 hover:text-accent pt-2">
                        <Link to='/admission-info/subject-groups'>
                          Danh sách các khối thi và tổ hợp xét tuyển đại học
                        </Link>
                      </li>
                      <li className="font-semibold text-gray-700 hover:text-accent pt-2">
                        <Link to='/admission-info'>
                          Tổng hợp về các phương thức xét tuyển
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="text-base"
                    onClick={() => navigate("/news")}
                  >
                    Tin tức
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="flex flex-col px-4 pb-2 gap-2 divide-y font-semibold md:w-[25rem] lg:w-[28rem]">
                      <li className="font-semibold text-gray-700 hover:text-accent pt-2">
                        <Link to="/news" className="pt-2">Đề án tuyển sinh Đại học Bách Khoa Hà Nội 2023</Link>
                      </li>
                      <li className="font-semibold text-gray-700 hover:text-accent pt-2">
                        <Link to="/news" className="pt-2">Tin tuyển sinh Đại học Đà Nẵng</Link>
                      </li>
                      <li className="font-semibold text-gray-700 hover:text-accent pt-2">
                        <Link to="/news" className="pt-2">Trường Đại học Quốc Tế - ĐHQG TP.HCM đạt chỉ tiêu tuyển sinh năm nay</Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {
              userInfo ?
                <div><UserMenu /></div>
                : <div className="flex gap-2">
                  <Button variant="outline" className="" onClick={() => navigate('/signin')}>
                    Đăng nhập
                  </Button>
                  <Button onClick={() => navigate('/signup')}>
                    Đăng kí
                  </Button>
                </div>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
