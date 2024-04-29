import { Heading } from '@/components/common/Heading'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DropdownSelect } from '@/components/common/DropdownSelect'
import { register } from 'module'
import { useCreateInstitutionMutation } from '@/app/services/institution'
import { useAppDispatch } from '@/app/hooks'
import { roles } from '@/app/constants'
import { Link, useNavigate } from 'react-router-dom'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { toast } from '@/components/ui/use-toast'
import { useGetWardsQuery } from '@/app/services/address'


const formSchema = z.object({
  name: z.string(),
  code: z.string().length(3),
  avatarLink: z.string(),
  website: z.string(),
  email: z.string(),
  phone: z.string(),
  houseNumber: z.string(),
  streetName: z.string(),
  wardId: z.coerce.number({}),
})

const CreateInstitution = () => {
  const dispatch = useAppDispatch()
  const [createInstitution, { isLoading }] = useCreateInstitutionMutation()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
    },
  })
  // const { register: formRegister, handleSubmit } = useForm();
  const wards = useGetWardsQuery({ all: true }).data?.wards

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createInstitution({
      name: values.name,
      code: values.code,
      avatarLink: values.avatarLink,
      website1: {
        value: values.website,
        title: "string"
      },
      // "website2": {
      //   "value": "string",
      //   "title": "string"
      // },
      // "website3": {
      //   "value": "string",
      //   "title": "string"
      // },
      email1: {
        value: values.email,
        title: "string"
      },
      // "email2": {
      //   "value": "string",
      //   "title": "string"
      // },
      // "email3": {
      //   "value": "string",
      //   "title": "string"
      // },
      phone1: {
        value: values.phone,
        title: "string"
      },
      // "phone2": {
      //   "value": "string",
      //   "title": "string"
      // },
      // "phone3": {
      //   "value": "string",
      //   "title": "string"
      // },
      addresses: [
        {
          houseNumber: values.houseNumber,
          streetName: values.streetName,
          wardId: values.wardId,
          description: "string"
        }
      ]
    }).then(() => {
      navigate('/admin/institutions')
      toast({
        title: "Create successfully",
        description: (new Date()).toUTCString(),
      })
    })
  }
  return (
    <div className="flex flex-col py-4 gap-4">
      <Breadcrumbs
        parents={[
          {
            label: "Dashboard",
            url: "/admin"
          },
          {
            label: "Institutions",
            url: "/admin/institutions "
          },
        ]}
        currentPage="Create"
      />
      <div className="flex items-start justify-between">
        <Heading title='Create an institution' description='Add a new institution' />
      </div>
      <Separator />
      <div className='flex'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="College Name" {...field} />
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
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="FPT" {...field} />
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
              name="avatarLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="Image for the institution" {...field} />
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
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Website for institution" {...field} />
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email for the institution" {...field} />
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone for the institution" {...field} />
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
              name="houseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House number</FormLabel>
                  <FormControl>
                    <Input placeholder="House number for the institution" {...field} />
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
              name="streetName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Street name for the institution" {...field} />
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
              name="wardId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Ward</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select institution ward" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        wards?.map(item =>
                          <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
                        )
                        // options.map((item, index) =>
                        //   <SelectItem key={index} value={item.id.toString()}>{item.name}</SelectItem>
                        // )
                      }
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
  )
}

export default CreateInstitution
