import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DropdownSelect } from "@/components/common/DropdownSelect";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/common/Heading";
import LinkText from "@/components/common/LinkText";
import {
  useGetCurrentStudentQuery,
  useGetCurrentStudentRecordQuery,
  useUpdateCurrentStudentRecordMutation,
} from "@/app/services/student";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
const Ranking = () => {
  const student = useGetCurrentStudentQuery();
  console.log(student);
  const data = useGetCurrentStudentRecordQuery();
  const [updateGrade] = useUpdateCurrentStudentRecordMutation()
  console.log(data.data?.studentRecords);
  const updateForm = z.object({
    id: z.number({
    }),
    studentId: z.number({
    }),
    subjectId: z.number({
    }),
    mark: z.coerce.number(),
    mark14: z.coerce.number(),
    mark11: z.coerce.number(),
    mark12: z.coerce.number(),
    mark16: z.coerce.number(),
    mark9: z.coerce.number(),
    mark10: z.coerce.number(),
  });
  useEffect(() => {
    if (data && data?.data?.studentRecords?.length! > 0) {
      const firstRecord = data?.data?.studentRecords[0];
      const defaultValues = {
        id: firstRecord?.id,
        studentId: firstRecord?.studentId,
        subjectId: firstRecord?.subject.id,
        mark: firstRecord?.mark,
      };
      form.reset(defaultValues);
    }
  }, [data]);

  const form = useForm<z.infer<typeof updateForm>>({
    resolver: zodResolver(updateForm),
    defaultValues: {
      id: data?.data?.studentRecords.forEach((record) => record.id) || undefined,
      subjectId: data?.data?.studentRecords.forEach((record) => record.subject.id) || undefined,
      mark: data?.data?.studentRecords.forEach((record) => record.mark) || undefined,
    },
  });
  const onSubmit = async (values: z.infer<typeof updateForm>) => {
    await updateGrade({
      body: [{
        id: values.id,
        studentId: values.studentId,
        subjectId: values.subjectId,
        mark: values.mark,
      }],
    }).then(() => {
      toast({
        title: "Updated transcript successfully",
      });
    });
  };

  console.log(data)
  return (
    <div className="">
        <Form {...form}>
          <form className="flex flex-col items-center text-black justify-center p-4 shadow-md bg-slate-50/50 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full mb-4">
              <Heading title="BẢNG ĐIỂM CỦA HỌC SINH" description="" />
            </div>
            <div className="w-full italic">
              <span>Nhập thông tin bên dưới hoặc </span>
              <Button className="text-accent px-2 mx-0" variant="ghost">
                Nạp thông tin vào Bảng điểm
              </Button>
            </div>
            <div className="text-center my-6">
              <h1 className="text-3xl font-bold mb-4">Điểm thi THPT Quốc Gia</h1>
              <h3 className="text-xl italic">
                *Nếu điểm là số thập phân, sử dụng dấu "."
              </h3>
            </div>

            <section className="grid grid-cols-3 gap-4 w-full">

              {data.data?.studentRecords ? (
                <>
                  {data.data?.studentRecords.map((record) => (
                    <FormField
                      key={record.id}
                      control={form.control}
                      name={`mark`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{record.subject.name}</FormLabel>
                          <FormControl>
                            <Input placeholder="0.0" {...field} defaultValue={record.mark} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </>
              ) : (
                <></>
              )}
            </section>
            <div className="text-center mt-8 w-1/2 ">
              <Button type="submit" className="w-full text-xl p-4 focus:ring-2 focus:ring-offset-2 focus:ring-black/50">
                Cập nhật
              </Button>
            </div>
          </form>
        </Form>
      </div >
  );
};

export default Ranking;
