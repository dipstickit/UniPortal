import { Heading } from '@/components/common/Heading'
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
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useAppDispatch } from '@/app/hooks'
import { useCreateAdmissionTrainingProgramMutation, useGetAdmissionDetailsQuery, useGetTrainingProgramsQuery } from '@/app/services/admission'
import Breadcrumbs from '@/components/ui/breadcrumbs'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'


const formSchema = z.object({
  name: z.string(),
  trainingProgramId: z.string(),
})

const CreateAdmissionTrainingPrograms = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { data, isLoading } = useGetAdmissionDetailsQuery(id!)
  const traningPrograms = useGetTrainingProgramsQuery({})
  const [createAdmission] = useCreateAdmissionTrainingProgramMutation()
  console.log(traningPrograms)
  // const [createInstitution, { isLoading }] = useCreateInstitutionMutation()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },

  })


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    await createAdmission({
      id,
      body: {
        name: values.name,
        trainingProgramId: values.trainingProgramId
      }
    }).then(() => {
      toast({
        title: "Created successfully",
        description: (new Date()).toUTCString(),
      })
      navigate(`/admin/admissions/${data?.id}/training-programs`)
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
            label: "Admission Plans",
            url: "/admin/admissions"
          },
          {
            label: data?.name || "",
            url: `/admin/admissions/${data?.id}`
          },
          {
            label: "Traning Programs",
            url: `/admin/admissions/${data?.id}/training-programs`
          }
        ]}
        currentPage={"Create"}
      />
      <div className="flex items-start justify-between">
        <Heading title='Create an training program' description='Add a new training program' />
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
                    <Input placeholder="Training program name" {...field} />
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
              name="trainingProgramId"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Training programs</FormLabel>
                  <Select onValueChange={field.onChange} >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a traning program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        traningPrograms?.data?.trainingPrograms.map(item =>
                          <SelectItem value={item.id.toString()}>{item.name}</SelectItem>
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

    </div>
  )
}

export default CreateAdmissionTrainingPrograms
