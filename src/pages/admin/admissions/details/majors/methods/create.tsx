import { MiniHeading } from '@/components/common/Heading'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Separator } from '@/components/ui/separator'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useCreateAdmissionMethodsMutation, useGetAdmissionMethodsQuery } from '@/app/services/admission'
import { useGetSubjectGroupsQuery } from '@/app/services/subjects'
import { AdmissionDetails, Major } from '@/app/types'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'


interface Props {
  data: AdmissionDetails,
  admissionMajorId: string,
  toggleOpen: () => void
}


const formSchema = z.object({
  name: z.string(),
  admissionMethodId: z.string(),
  subjectGroupIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

const CreateAdmissionMajorMethod = ({ data, toggleOpen, admissionMajorId }: Props) => {
  const [options, setOptions] = useState<Major[]>([]);
  const [page, setPage] = useState(1);
  const [createAdmissionMajorMethod] = useCreateAdmissionMethodsMutation()
  const subjectGroups = useGetSubjectGroupsQuery({ all: true })?.data?.subjectGroups
  const methods = useGetAdmissionMethodsQuery({ page, all: true })?.data?.admissionMethods
  const currentMajor = data?.admissionMajors.find(item => item.id === admissionMajorId)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subjectGroupIds: []
    }
  })


  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: 'subjectGroupIds'
  // });



  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createAdmissionMajorMethod({
      id: currentMajor?.id,
      body: {
        name: values.name,
        admissionMethodId: values.admissionMethodId,
        subjectGroupIds: values.subjectGroupIds
      },
    }).then(() => {
      form.reset()
      toggleOpen()
      toast({
        title: "New admission method has been created",
      })
    }).catch(error => console.log(error))
  }

  return (
    <div className="flex flex-col p-4 gap-2">
      <div className="flex items-start justify-between">
        <MiniHeading title='Add admission method' description='Create a new admisison method for this admisison major' />
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
                    <Input placeholder="Method name" {...field} />
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
              name="admissionMethodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admisison method</FormLabel>
                  <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an admission method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        methods?.map(item =>
                          <SelectItem value={item.id.toString()}>{item.name} ({item.code})</SelectItem>
                        )
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
            {/* 
            <FormField
              control={form.control}
              name="subjectGroupIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject Group</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        subjectGroups?.map(item =>
                          <SelectItem value={item.id.toString()}>{item.code} ({item.subjects.join(', ')})</SelectItem>
                        )
                        // options.map((item, index) =>
                        //   <SelectItem key={index} value={item.id.toString()}>{item.name}</SelectItem>
                        // )
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className='mt-2'>
              <FormLabel >Subject Group</FormLabel>
              <div className='h-32 overflow-auto'>
                {subjectGroups?.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="subjectGroupIds"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id.toString())}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id.toString()])
                                  : field.onChange(
                                    (field.value as string[])?.filter(
                                      (value) => value !== item.id.toString()
                                    )
                                  )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.code} ({item.subjects.join(', ')})
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
            </div>

            <Button type="submit">Submit</Button>
            <Button variant={'outline'} className='mx-2' onClick={toggleOpen}>Cancel</Button>
          </form>
        </Form>
      </div>

    </div>
  )
}

export default CreateAdmissionMajorMethod
