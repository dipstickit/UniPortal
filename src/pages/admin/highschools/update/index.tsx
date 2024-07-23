/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Heading } from "@/components/common/Heading";
import { Separator } from "@/components/ui/separator";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DropdownSelect } from "@/components/common/DropdownSelect";
import { register } from "module";
import { useUpdateInstitutionMutation } from "@/app/services/institution";
import { useAppDispatch } from "@/app/hooks";
import { roles } from "@/app/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { toast } from "@/components/ui/use-toast";
import {
  useGetHighschoolQuery,
  useUpdateHighschoolMutation,
} from "@/app/services/highschool";
import { useGetCityProvincesQuery } from "@/app/services/address";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  cityProvinceId: z.string(),
});

const UpdateHighSchool = () => {
  const { id } = useParams();
  const [updatehighschool, { isLoading }] = useUpdateHighschoolMutation();
  const cityProvince = useGetCityProvincesQuery({ all: true }).data
    ?.cityProvinces;
  const { data } = useGetHighschoolQuery(id!);

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
      cityProvinceId: data?.cityProvince?.id?.toString(),
    },
  });
  console.log(data);

  useEffect(() => {
    form.setValue("name", data?.name!);
    form.setValue("description", data?.description!);
    form.setValue("cityProvinceId", data?.cityProvince?.id.toString()!);
  }, [data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updatehighschool({
      body: values,
    }).then(() => {
      navigate("/admin/high-schools");
      toast({
        title: "Update successfully",
        description: new Date().toUTCString(),
      });
    });
  }
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin",
          },
          {
            label: "Highschools",
            url: "/admin/high-schools ",
          },
        ]}
        currentPage="Update"
      />
      <div className="flex items-start justify-between">
        <Heading
          title="Update an highschool"
          description="Add a new highschool"
        />
      </div>
      <Separator />
      <div className="flex">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-1/2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="School Name"
                      {...field}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description for the highschool"
                      {...field}
                      defaultValue={field.value}
                    />
                  </FormControl>
                  {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cityProvinceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Province</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city province" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cityProvince?.map((item) => (
                        <SelectItem value={item.id.toString()} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    You can manage email addresses in your{" "}
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateHighSchool;
