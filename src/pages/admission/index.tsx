import { Heading } from "@/components/common/Heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Breadcrumbs from "@/components/ui/breadcrumbs";
const AdmissionInfo = () => {
  return (
    <div className="py-2">
      <div className="mb-4">
        <Breadcrumbs
          parents={[
            {
              label: "Thông tin tuyển sinh",
              url: "/admission-info"
            },
          ]}
          currentPage="Tổng hợp các phương thức xét tuyển"
        />
      </div>
      <Heading title="Tổng hợp các phương thức xét tuyển" description="" />
      <section className="grid">
        <Accordion type="single" collapsible className="w-full col-span-2" defaultValue="text1">
          <AccordionItem value="text1">
            <AccordionTrigger className="text-xl text-left">
              1. Phương thức xét tuyển Đại học bằng điểm thi tốt nghiệp THPT
            </AccordionTrigger>
            <AccordionContent className="text-lg grid grid-cols-3 gap-4">
              <p className="col-span-2">
                Phương thức tuyển sinh Đại học phổ biến nhất trong nhiều năm qua
                là xét tuyển dựa trên kết quả Kỳ thi tốt nghiệp THPT. Thí sinh
                tham dự kỳ thi sẽ sử dụng kết quả để xét tốt nghiệp và đăng ký xét
                tuyển vào các trường đại học. Các trường sẽ xét tuyển thí sinh dựa
                trên tổ hợp môn yêu cầu của từng ngành học, và sẽ đưa ra mức điểm
                sàn dựa trên quy định và chỉ tiêu ngành. Sau khi đăng ký, nhà
                trường sẽ xét tuyển từ cao xuống thấp để đủ chỉ tiêu. Ví dụ,
                trường Đại học Thương mại xét tuyển ngành Ngôn ngữ Anh theo khối
                D01, bao gồm Toán, Văn, Anh, và sử dụng tổng điểm thi tốt nghiệp
                THPT 3 môn làm căn cứ để tuyển sinh.
              </p>
              <img src="https://thanhnien.mediacdn.vn/Uploaded/haanh/2022_07_22/293308216-1178061952974992-8201463735815733430-n-5138.jpg" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="text2">
            <AccordionTrigger className="text-xl text-left">
              2. Phương thức xét tuyển Đại học bằng học bạ
            </AccordionTrigger>
            <AccordionContent className="text-lg grid grid-cols-3 gap-4">
              <p className="col-span-2">
                Học bạ là một cuốn sổ theo dõi việc học tập, rèn luyện và hạnh
                kiểm của học sinh từ Tiểu học đến Trung học Phổ thông. Giáo viên
                chủ nhiệm sẽ ghi chép kết quả học tập và hạnh kiểm của học sinh
                mỗi kì học và năm học, cũng như sơ yếu lý lịch của học sinh. Việc
                ghi sổ học bạ tuân theo một quy trình nghiêm ngặt để đảm bảo tính
                chính xác và trung thực. Học bạ sẽ được lưu giữ bởi nhà trường và
                trả lại cho học sinh khi tốt nghiệp, thôi học hoặc chuyển trường.
                Theo phương thức xét tuyển Đại học này, trường sử dụng điểm học bạ
                của thí sinh trong những năm học ở Trung học Phổ thông để lựa chọn
                sinh viên. Các tiêu chí để xét tuyển học bạ có thể bao gồm điểm
                học tập từng năm, từng kỳ hoặc hạnh kiểm của học sinh.
              </p>
              <img src="https://vieclamvui.com/upload/img/2021/05/10/cac_truong_dai_hoc_xet_tuyen_hoc_ba_vieclamvui_1620624120980.jpg" />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="text3">
            <AccordionTrigger className="text-xl text-left">
              3. Phương thức xét tuyển Đại học bằng bài thi Đánh giá năng lực
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Phương thức tuyển sinh Đại học phổ biến nhất trong nhiều năm qua
              là xét tuyển dựa trên kết quả Kỳ thi tốt nghiệp THPT. Thí sinh
              tham dự kỳ thi sẽ sử dụng kết quả để xét tốt nghiệp và đăng ký xét
              tuyển vào các trường đại học. Các trường sẽ xét tuyển thí sinh dựa
              trên tổ hợp môn yêu cầu của từng ngành học, và sẽ đưa ra mức điểm
              sàn dựa trên quy định và chỉ tiêu ngành. Sau khi đăng ký, nhà
              trường sẽ xét tuyển từ cao xuống thấp để đủ chỉ tiêu. Ví dụ,
              trường Đại học Thương mại xét tuyển ngành Ngôn ngữ Anh theo khối
              D01, bao gồm Toán, Văn, Anh, và sử dụng tổng điểm thi tốt nghiệp
              THPT 3 môn làm căn cứ để tuyển sinh.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="text4">
            <AccordionTrigger className="text-xl text-left">
              4. Phương thức xét tuyển Đại học dựa theo kết quả các kỳ thi quốc
              tế
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Học bạ là một cuốn sổ theo dõi việc học tập, rèn luyện và hạnh
              kiểm của học sinh từ Tiểu học đến Trung học Phổ thông. Giáo viên
              chủ nhiệm sẽ ghi chép kết quả học tập và hạnh kiểm của học sinh
              mỗi kì học và năm học, cũng như sơ yếu lý lịch của học sinh. Việc
              ghi sổ học bạ tuân theo một quy trình nghiêm ngặt để đảm bảo tính
              chính xác và trung thực. Học bạ sẽ được lưu giữ bởi nhà trường và
              trả lại cho học sinh khi tốt nghiệp, thôi học hoặc chuyển trường.
              Theo phương thức xét tuyển Đại học này, trường sử dụng điểm học bạ
              của thí sinh trong những năm học ở Trung học Phổ thông để lựa chọn
              sinh viên. Các tiêu chí để xét tuyển học bạ có thể bao gồm điểm
              học tập từng năm, từng kỳ hoặc hạnh kiểm của học sinh.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="text5">
            <AccordionTrigger className="text-xl text-left">
              5. Xét tuyển kết hợp chứng chỉ ngoại ngữ quốc tế và kết quả thi
              tốt nghiệp THPT
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Phương thức tuyển sinh Đại học phổ biến nhất trong nhiều năm qua
              là xét tuyển dựa trên kết quả Kỳ thi tốt nghiệp THPT. Thí sinh
              tham dự kỳ thi sẽ sử dụng kết quả để xét tốt nghiệp và đăng ký xét
              tuyển vào các trường đại học. Các trường sẽ xét tuyển thí sinh dựa
              trên tổ hợp môn yêu cầu của từng ngành học, và sẽ đưa ra mức điểm
              sàn dựa trên quy định và chỉ tiêu ngành. Sau khi đăng ký, nhà
              trường sẽ xét tuyển từ cao xuống thấp để đủ chỉ tiêu. Ví dụ,
              trường Đại học Thương mại xét tuyển ngành Ngôn ngữ Anh theo khối
              D01, bao gồm Toán, Văn, Anh, và sử dụng tổng điểm thi tốt nghiệp
              THPT 3 môn làm căn cứ để tuyển sinh.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="text6">
            <AccordionTrigger className="text-xl text-left">
              6. Phương thức xét tuyển kết hợp kết quả thi THPT, học bạ và môn
              năng khiếu
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Học bạ là một cuốn sổ theo dõi việc học tập, rèn luyện và hạnh
              kiểm của học sinh từ Tiểu học đến Trung học Phổ thông. Giáo viên
              chủ nhiệm sẽ ghi chép kết quả học tập và hạnh kiểm của học sinh
              mỗi kì học và năm học, cũng như sơ yếu lý lịch của học sinh. Việc
              ghi sổ học bạ tuân theo một quy trình nghiêm ngặt để đảm bảo tính
              chính xác và trung thực. Học bạ sẽ được lưu giữ bởi nhà trường và
              trả lại cho học sinh khi tốt nghiệp, thôi học hoặc chuyển trường.
              Theo phương thức xét tuyển Đại học này, trường sử dụng điểm học bạ
              của thí sinh trong những năm học ở Trung học Phổ thông để lựa chọn
              sinh viên. Các tiêu chí để xét tuyển học bạ có thể bao gồm điểm
              học tập từng năm, từng kỳ hoặc hạnh kiểm của học sinh.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <div className="col-span-1">
          <img src="https://thanhnien.mediacdn.vn/Uploaded/haanh/2022_07_22/293308216-1178061952974992-8201463735815733430-n-5138.jpg" />
          <img src="https://media.ultv.edu.vn/files/ngovananh/2023/12/06/sinh-vien-082351.jpg" />
        </div> */}
      </section>
    </div>
  );
};
export default AdmissionInfo;
