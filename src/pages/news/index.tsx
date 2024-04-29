import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const News = () => {
  const navigate = useNavigate();
  const style = {
    filterHover: "text-accent text-lg pr-1 hover:pr-5 ease-out duration-300 cursor-pointer hover:text-accent-dark",
  };
  return (
    <div className="p-8">
      <Card className="w-30 p-2 mb-5 hover:bg-slate-200">
        <div className="flex" onClick={() => navigate("/school/42")}>
          <img
            src="https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2022/122022/27/09/tuyen-sinh-320221227091906.jpg?rt=20221227091907"
            className="w-100 h-80 object-cover"
          />
          <div className="flex flex-col ml-4">
            <CardHeader>
              <CardTitle className="text-4xl">
                Đề án tuyển sinh Đại học Bách Khoa Hà Nội 2023
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xl" style={{ display: "flow" }}>
              Lại 1 năm học chuẩn bị kết thúc cùng với mùa tuyển sinh mới dành
              cho các bạn học sinh muốn tham gia vào ngôi nhà Bách Khoa Hà Nội,
              xem trước thông tin về quá trình tuyển sinh năm nay.
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className={style.filterHover}>Xem thêm</span>
                <ArrowRight className="text-accent"/>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>

      <section className="grid grid-cols-3 gap-4">
        <Card className="w-300 hover:bg-slate-200">
          <img src="https://www.udn.vn/Portals/0/Cac%20nganh%20moi%202024%20DHDN.png" />
          <CardHeader>
            <CardTitle className="text-3xl">
              Nhiều chuyên ngành mới xuất hiện
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: "flow" }}>
            Với sự phát triển của ngành giáo dục nhiều ngành học mới được đưa
            vào chương trình giảng dạy của các trường đại học
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className={style.filterHover}>Xem thêm</span>
              <ArrowRight className='text-accent' />
            </div>
          </CardContent>
        </Card>

        <Card className="w-300 hover:bg-slate-200">
          <img src="https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/022023/blue_modern_were_hiring_facebook_post_1_20230207094118.png" />
          <CardHeader>
            <CardTitle className="text-3xl">
              Tiêu điểm tuyển sinh 2023
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: "flow" }}>
            Mùa tuyển sinh năm nay vẫn sẽ có những phương thức xét tuyển gồm:
            Xét tuyển điểm thi THPT, Xét theo Học bạ THPT, Xét tuyển sinh
            riêng...
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className={style.filterHover}>Xem thêm</span>
              <ArrowRight className='text-accent' />
            </div>
          </CardContent>
        </Card>
        <Card className="w-300 hover:bg-slate-200">
          <img src="https://www.udn.vn/Portals/0/329733899_1230976454176567_6048258782929413902_n.png" />
          <CardHeader>
            <CardTitle className="text-3xl">
              Tin tuyển sinh Đại học Đà Nẵng
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: "flow" }}>
            Đón đầu xu thế chuyển đổi số và quốc tế hóa chương trình đào tạo.
            Nhà trường dự kiến tuyển sinh 3.200 chỉ tiêu với 05 phương thức xét
            tuyển giữ ổn định như năm trước
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className={style.filterHover}>Xem thêm</span>
              <ArrowRight className='text-accent' />
            </div>
          </CardContent>
        </Card>

        <Card className="w-300 hover:bg-slate-200" onClick={() => navigate("/school/9")}>
          <img src="https://cdn.tuoitre.vn/thumb_w/480/471584752817336320/2024/2/17/bui-quang-hung-ueh-17081609714031876451895.jpeg" />
          <CardHeader>
            <CardTitle className="text-3xl">
            Đại học Kinh tế TP.HCM tăng chỉ tiêu tuyển sinh 
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: "flow" }}>
            Nhận thức được tình hình kinh tế hiên nay, trường Đại học Kinh tế TP.HCM tăng chỉ tiêu tuyển sinh với mong muốn tăng cường đầu ra sau khi tốt nghiệp
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className={style.filterHover}>Xem thêm</span>
              <ArrowRight className='text-accent' />
            </div>
          </CardContent>
        </Card>

        <Card className="w-300 hover:bg-slate-200">
          <img src="https://alumninetwork.rmit.edu.vn/wp-content/uploads/formidable/26/news-rmit-class-of-2021-graduates-with-pride-at-its-saigon-south-campus-1.jpg" />
          <CardHeader>
            <CardTitle className="text-3xl">
              Chương Trình Đại Học RMIT
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: "flow" }}>
            RMIT - Nơi hình thành tương lai của bạn. Hãy tham gia vào hành trình
            của chúng tôi. Chúng tôi là điểm đến lý tưởng cho sự
            phát triển cá nhân và sự nghiệp của bạn.
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className={style.filterHover}>Xem thêm</span>
              <ArrowRight className='text-accent' />
            </div>
          </CardContent>
        </Card>

        <Card className="w-300 hover:bg-slate-200" onClick={() => navigate("/school/6")}>
          <img src="https://photo-cms-giaoducthoidai.epicdn.me/w820/Uploaded/2024/xyre/2023_02_22/thong-tin-tuyen-sinh-dai-hoc-quoc-te-2023-7644.jpg" />
          <CardHeader>
            <CardTitle className="text-3xl">
            Trường Đại học Quốc Tế - ĐHQG TP.HCM đạt chỉ tiêu tuyển sinh năm nay
            </CardTitle>
          </CardHeader>
          <CardContent style={{ display: "flow" }}>
           Với lượng lơn đơn xin nhập học, Trường Đại học Quốc Tế của ĐHQG TP.HCM đã đạt chỉ tiêu chỉ sau hơn 2 tuần mở đăng kí tuyển sinh.
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className={style.filterHover}>Xem thêm</span>
              <ArrowRight className='text-accent' />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
export default News;
