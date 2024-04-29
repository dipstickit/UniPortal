import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Stars5 from "./Stars5";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import ExpandableArea from "./ExpandableArea";
import LinkText from "./LinkText";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { institutionIntroductions } from "@/data/placeholder";
import { useGetInstitutionQuery } from "@/app/services/institution";
import { Typography } from "@mui/material";

interface InstitutionCard {
  id: number;
  name: string;
  code: string;
  image?: string;
}

const InstitutionCard = ({ id, name, code, image }: InstitutionCard) => {
  const [tabs, setTabs] = useState<"introduction" | "admission" | "contact">(
    "introduction"
  );
  const style = {
    cardHover:
      "hover:cursor-pointer hover:bg-slate-100 hover:border-slate-300 dark:hover:border-slate-700 w-full",
    tabs: `py-1 gap-4 px-8 text-lg text-slate-500 hover:text-slate-900 `,
    chosenTabs: "text-slate-900 border-b-2 border-accent font-semibold",
  };

  let description;
  const contact = useGetInstitutionQuery(id.toString()!);
  switch (tabs) {
    case "introduction":
      description =
        institutionIntroductions[code as keyof typeof institutionIntroductions];
      break;
    case "admission":
      description = "Phương thức xét tuyển tài năng (XTTN) \n Phương thức đánh giá năng lực (ĐGNL) \n Kết quả thi tốt nghiệp \n Xét tuyển thẳng";
      description = description.split('\n').map((line, index) => <p key={index}>{line}</p>);
      break;
    case "contact":
      const emails = contact.data?.emails.map((email) => email.value).join(", ");
      const phones = contact.data?.phones.map((phone) => phone.value).join(", ");
      description = `Email: ${emails} \n Phone: ${phones}`;
      description = description.split('\n').map((line, index) => <p key={index}>{line}</p>);
      break;
    default:
      description = "";
  }

  const navigate = useNavigate();
  return (
    <Card className="bg-slate-50/50">
      <div className="flex justify-between h-[7.5rem]">
        <div className="p-4 flex gap-4 ">
          <img
            src={image}
            alt=""
            className="rounded w-24 h-24 border-2 object-fill"
          />
          <div className="flex flex-col gap-1">
            <LinkText navigateTo={`/school/${id}`} style="text-lg">
              {name}
            </LinkText>
            {/* <Stars5 rating={3.2} /> */}
            <div className="text-black/70 text-base font-semibold">
              Mã trường: <span className="">{code}</span>
            </div>
            <button className="flex items-center text-base gap-1 group text-gray-500 pt-2">
              <Bookmark
                size={18}
                className="group-hover:fill-accent text-accent"
              />
              <span className="group-hover:text-accent group-hover:font-semibold">
                Add to My List
              </span>
            </button>
            {/* <h2 className="text-sm">Code: FPT</h2>
            <p className="text-sm">Address: Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh</p> */}
          </div>
        </div>
        <Button
          variant="ghost"
          className="text-base text-gray-500 flex items-center gap-1 m-2"
          onClick={() => navigate(`/school/${id}`)}
        >
          <span>Vào trang trường</span>
          <ArrowRight size={16} className="pt-0.5" />
        </Button>
      </div>
      {/* <Separator orientation="horizontal"/> */}
      <div className="border-b-2 flex">
        <button
          className={`${style.tabs} ${
            tabs == "introduction" ? style.chosenTabs : ""
          }`}
          onClick={() => setTabs("introduction")}
        >
          Giới thiệu
        </button>
        <button
          className={`${style.tabs} ${
            tabs == "admission" ? style.chosenTabs : ""
          }`}
          onClick={() => setTabs("admission")}
        >
          Tuyển sinh
        </button>
        <button
          className={`${style.tabs} ${
            tabs == "contact" ? style.chosenTabs : ""
          }`}
          onClick={() => setTabs("contact")}
        >
          Liên hệ
        </button>
      </div>
      <CardContent className="py-2 pb-4 px-8 min-h-32 ">
        <div className="">
          <Typography>{description}</Typography>
        </div>
        {/* {tabs === 'introduction' && (
      <p className=''>
      <ExpandableArea
        text={descriptions[0]}
        limit={300}
      />
      </p>
    )}
    {tabs === 'admission' && (
      <p className=''>
      <ExpandableArea
        text={descriptions[1]}
        limit={300}
      />
      </p>
    )}
    {tabs === 'contact' && (
      <p className=''>
      <ExpandableArea
        text={descriptions[2]}
        limit={300}
      />
      </p>
    )}
   */}
      </CardContent>
    </Card>
  );
};

export default InstitutionCard;
