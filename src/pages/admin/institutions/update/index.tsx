import { Heading } from '@/components/common/Heading'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { useAppDispatch } from '@/app/hooks'
import { useGetInstitutionQuery, useUpdateInstitutionMutation } from '@/app/services/institution'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate, useParams } from 'react-router-dom'
import { Input } from '@/components/ui/input'
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

const UpdateInstitution = () => {
  const { id } = useParams()
  const [updateInstitution, { isLoading }] = useUpdateInstitutionMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data } = useGetInstitutionQuery(id ?? "")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      code: data?.code,
      avatarLink: data?.avatarLink,
    },
  })

  useEffect(() => {
    console.log(data)
    if (data) {
      form.setValue('name', data.name)
      form.setValue('code', data.code)
      form.setValue('avatarLink', data.avatarLink)
    }
  }, [data]);
  const wards = useGetWardsQuery({ all: true }).data?.wards

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(id)
    await updateInstitution({
      id,
      body: {
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
      }
    }).then(() => {
      navigate('/admin/institutions')
      toast({
        title: "Chosen item was updated successfully",
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
        <Heading title='Update institution' description='Edit an institution infomation' />
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
                    <Input placeholder="Institution name" {...field} defaultValue={field.value}/>
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
                    <Input placeholder="Institution code" {...field} defaultValue={field.value}/>
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
                    <Input placeholder="Institution image" {...field} defaultValue={field.value}/>
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

export default UpdateInstitution
