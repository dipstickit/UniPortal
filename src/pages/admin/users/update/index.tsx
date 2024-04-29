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

import { roles, status } from '@/app/constants'
import { useAppDispatch } from '@/app/hooks'
import { useGetAccountQuery, useUpdateAccountMutation } from '@/app/services/users'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate, useParams } from 'react-router-dom'

const formSchema = z.object({
  role: z.string({
    required_error: "Please select a role.",
  }),
  status: z.string({
    required_error: "Please status status.",
  })
})

const UpdateUser = () => {
  const { id } = useParams()
  const [updateAccount, { isLoading }] = useUpdateAccountMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { data } = useGetAccountQuery(id ?? "")
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: data?.role,
      status: data?.status,
    }
  })
  
  useEffect(() => {
    form.setValue('role', data?.role || ''),
    form.setValue('status', data?.status || '')
  }, [data]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await updateAccount({
      id,
      body: {
        role: values.role,
        status: values.status
      }
    }).then(() => {
      navigate('/admin/users')
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
            label: "Users",
            url: "/admin/users"
          }
        ]}
        currentPage="Update"
      />
      <div className="flex items-start justify-between">
        <Heading title='Update account' description='Edit an account infomation' />
      </div>
      <Separator />
      <div className='flex'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={roles.STUDENT}>{roles.STUDENT}</SelectItem>
                      <SelectItem value={roles.STAFF}>{roles.STAFF}</SelectItem>
                      <SelectItem value={roles.ADMIN}>{roles.ADMIN}</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    You can manage email addresses in your{" "}
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className='w-1/2'>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={status.ACTIVE}>{status.ACTIVE}</SelectItem>
                      <SelectItem value={status.INACTIVE}>{status.INACTIVE}</SelectItem>
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

export default UpdateUser
