import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { customFetch } from "@/app/services/api";
import { useGetHighschoolsQuery } from "@/app/services/highschool";
import {
  useGetCurrentStudentQuery,
  useUpdateCurrentStudentMutation,
} from "@/app/services/student";
import {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
} from "@/app/services/users";
import { Student } from "@/app/types";
import { Heading } from "@/components/common/Heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { selectUserToken, setCredentials } from "@/features/auth/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetch } from "undici-types";
import { z } from "zod";

const Profile = () => {
  const user = useGetCurrentUserQuery();
  const student = useGetCurrentStudentQuery();
  // const [student, setStudent] = useState<Student>()
  const [updateAccount, { isLoading }] = useUpdateCurrentUserMutation();
  const [updateStudent] = useUpdateCurrentStudentMutation();
  const highschools = useGetHighschoolsQuery({all: true})?.data?.highSchools
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  const userToken = useAppSelector(selectUserToken);
  const anonymous =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_rW9tvc5tzHfImg0xXTReFOQIAuAbt-EXuFdvzgB9g&s";

  // Form schema definition
  const formSchema1 = z.object({
    firstName: z.string({
      required_error: "Please input first name.",
    }),
    lastName: z.string({
      required_error: "Please input last name.",
    }),
    avatarLink: z.string(),
  });

  const formSchema2 = z.object({
    phone: z.string({
      required_error: "Please input phone.",
    }),
    birthDate: z.string({
      required_error: "Please input birth date.",
    }),
    highSchoolId: z.coerce.number({}),
  });

  console.log(student)

  // useEffect(() => {
  //   const fetchCurrentStudent = async () => {
  //     const studentResponse = await customFetch('/api/v1/students/current', userToken || '')
  //     setStudent(studentResponse)
  //   }
  //   fetchCurrentStudent()
  // }, []);

  useEffect(() => {
    if (user) {
      form1.setValue("firstName", user?.data?.firstName!);
      form1.setValue("lastName", user?.data?.lastName!);
      form1.setValue("avatarLink", user?.data?.avatarLink!);
    }
    if (student) {
      form2.setValue("phone", student?.data?.phone!);
      form2.setValue("birthDate", student?.data?.birthDate!);
      form2.setValue("highSchoolId", student?.data?.highSchool?.id!);
    }
  }, [user]);

  // React Hook Form initialization
  const form1 = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      firstName: user?.data?.firstName || "",
      lastName: user?.data?.lastName || "",
      avatarLink: user?.data?.avatarLink || "",
    },
  });

  const form2 = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      phone: student?.data?.phone || "",
      birthDate: student?.data?.birthDate || "",
      highSchoolId: student?.data?.highSchool?.id || undefined,
    },
  });
  // Submit form handler
  const onSubmit = async (values: z.infer<typeof formSchema1>) => {
    await updateAccount({
      body: {
        firstName: values.firstName,
        lastName: values.lastName,
        avatarLink: values.avatarLink,
      },
    }).then((response: any) => {
      toast({
        title: "Updated profile successfully",
      });
      dispatch(setCredentials({ ...response?.data, userToken: userToken }));
    });
    setIsEditing(false);
  };

  const onSubmit2 = async (values: z.infer<typeof formSchema2>) => {
    await updateStudent({
      body: {
        phone: values.phone,
        birthDate: values.birthDate,
        highSchoolId: values.highSchoolId,
      },
    })
      .then(() => {
        toast({
          title: "Updated profile successfully",
        });
      })
    // .then(() => {
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // });
    setIsEditing(false);
  };

  const onCancel = () => {
    setIsEditing(false);
    form1.reset({
      firstName: user?.data?.firstName || "",
      lastName: user?.data?.lastName || "",
      avatarLink: user?.data?.avatarLink || "",
    });
    form2.reset({
      phone: student?.data?.phone || "",
      birthDate: student?.data?.birthDate || "",
      highSchoolId: student?.data?.highSchool?.id || undefined,
    });
  };

  return (
    <Container maxWidth="md">
      <Heading title="User Profile" description="View and update your personal information" />
      <div className="flex items-center justify-center gap-16 mt-10">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center ">
            <img
              src={user?.data?.avatarLink || anonymous}
              alt="avatar"
              className="rounded-full w-64 h-48"
            />
          </div>
          <p className="text-3xl font-semibold mt-2 text-center">
            {user?.data?.firstName} {user?.data?.lastName}
            {user?.data?.status === "ACTIVE" && (
              <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green-500"></span>
            )}
          </p>
          <p className="mt-2 text-center">
            Sinh nhật: {student?.data?.birthDate}
          </p>
          <p className="mt-2 text-center">SĐT: {student?.data?.phone}</p>
          <p className="mt-2 text-center">
            Học ở {student?.data?.highSchool?.name}
          </p>
          {!isEditing && ( // Show edit profile button if not in edit mode
            <Button className="mt-4" onClick={() => setIsEditing(true)}>
              Chỉnh sửa hồ sơ
            </Button>
          )}
        </div>
        <div className="flex flex-col">
          {isEditing && (
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <div className="text-lg font-bold text-left">Account</div>
                <Form {...form1}>
                  <form
                    onSubmit={form1.handleSubmit(onSubmit)}
                    className="float-end space-y-4 w-full"
                  >
                    <FormField
                      control={form1.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tên</FormLabel>
                          <FormControl>
                            <Input placeholder="Tên" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form1.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Họ</FormLabel>
                          <FormControl>
                            <Input placeholder="Họ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form1.control}
                      name="avatarLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ảnh</FormLabel>
                          <FormControl>
                            <Input placeholder="Ảnh" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="my-4 flex float-start justify-center">
                      <Button type="submit">Lưu</Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="mx-2"
                        onClick={onCancel}
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                </Form>
              </Grid>
              <Grid item xs={6}>
                <div className="text-lg font-bold text-left">Student Profile</div>
                <Form {...form2}>
                  <form
                    onSubmit={form2.handleSubmit(onSubmit2)}
                    className="float-end space-y-4 w-full"
                  >
                    <FormField
                      control={form2.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem className="w-64">
                          <FormLabel>SĐT</FormLabel>
                          <FormControl>
                            <Input placeholder="SĐT" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form2.control}
                      name="birthDate"
                      render={({ field }) => (
                        <FormItem className="w-64">
                          <FormLabel>Ngày sinh</FormLabel>
                          <FormControl>
                            <Input placeholder="Ngày sinh" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form2.control}
                      name="highSchoolId"
                      render={({ field }) => (
                        <FormItem className="w-64">
                          <FormLabel>Trường</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a highschool" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                highschools?.map(item =>
                                  <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
                                )
                              }
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="my-4 flex float-start justify-center">
                      <Button type="submit">Lưu</Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="mx-2"
                        onClick={onCancel}
                      >
                        Hủy
                      </Button>
                    </div>
                  </form>
                </Form>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Profile;
