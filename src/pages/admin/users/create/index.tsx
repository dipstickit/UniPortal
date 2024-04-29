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
import { useRegisterMutation } from '@/app/services/users'
import { useAppDispatch } from '@/app/hooks'
import { roles } from '@/app/constants'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '@/components/ui/breadcrumbs'


const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
  role: z.string({
    required_error: "Please select a role",
  })
})

const CreateUser = () => {
  const dispatch = useAppDispatch()
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },

  })
  const { register: formRegister, handleSubmit } = useForm();

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const registerData = await register({
      email: values.email,
      password: values.password,
      role: values.role,
      avatarLink: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr_rW9tvc5tzHfImg0xXTReFOQIAuAbt-EXuFdvzgB9g&s"
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
        currentPage="Create"
      />
      <div className="flex items-start justify-between">
        <Heading title='Create account' description='Register a new account' />
      </div>
      <Separator />
      <div className='flex'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-1/2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@gmail.com" {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="At least 8 characters" {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

    </div>
  )
}

export default CreateUser
