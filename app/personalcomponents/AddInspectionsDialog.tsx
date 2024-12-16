import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Combobox } from "~/components/ui/combobox";
import { DatePicker } from "~/components/ui/datepicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  countGrade: {
    label: "Grade",
    color: "#FD9E0F",
  },
  countCriticalFlag: {
    label: "Critical Flag",
    color: "#4800BB",
  },
} satisfies ChartConfig;

const AddInspectionDialog = ({
  trigger = null,
  title = null,
  content = null,
  type = null,
  handleAction,
  setGrade = null,
  setCriticalFlag = null,
  formData = null,
}) => {
  const grades = ["N", "A", "B", "C", "Z", "P"];
  const criticalFlags = ["Critical", "Not Critical", "Not Applicable"];

  const chartData1 = grades.map((grade) => ({
    grade,
    countGrade: formData.inspections
      .filter((inspection) => inspection.grade === grade)
      .reduce((acc) => acc + 1, 0),
  }));

  const chartData2 = criticalFlags.map((flag) => ({
    criticalFlag: flag,
    countCriticalFlag: formData.inspections
      .filter((inspection) => inspection.criticalFlag === flag)
      .reduce((acc) => acc + 1, 0),
  }));

  console.log(chartData2, "chartData2");

  return (
    <>
      {type === "message" ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{title}</AlertDialogTitle>
              <AlertDialogDescription>{content}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAction}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : type === "add" ? (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
              <Card>
                <CardHeader>
                  <CardTitle>Create inpection</CardTitle>
                  <CardDescription>
                    Please, type the data to proceed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label htmlFor={`grade`} className="block text-white mb-2">
                      Grade:
                    </label>
                    <Select
                      onValueChange={(value) => {
                        setGrade(value);
                      }}
                    >
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem className="cursor-pointer" value="N">
                          N
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="A">
                          A
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="B">
                          B
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="C">
                          C
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="Z">
                          Z
                        </SelectItem>
                        <SelectItem className="cursor-pointer" value="P">
                          P
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`criticalFlag`}
                      className="block text-white mb-2"
                    >
                      Critical Flag:
                    </label>
                    <Select
                      onValueChange={(value) => {
                        console.log("Grade Selected:", value);
                        setCriticalFlag(value);
                      }}
                    >
                      <SelectTrigger id="criticalFlag">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem className="cursor-pointer" value="Critical">
                          Critical
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value="Not Critical"
                        >
                          Not Critical
                        </SelectItem>
                        <SelectItem
                          className="cursor-pointer"
                          value="Not Applicable"
                        >
                          Not Applicable
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`inspectionDate`}
                      className="block text-white mb-2"
                    >
                      Inspection Date:
                    </label>
                    <DatePicker
                      date={new Date().toISOString()}
                      setDate
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`recordDate`}
                      className="block text-white mb-2"
                    >
                      Record Date:
                    </label>
                    <DatePicker
                      date={new Date().toISOString()}
                      setDate
                      disabled
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AlertDialogCancel className="w-1/2 mr-[1vw]">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-1/2 ml-[1vw]"
                    onClick={() => handleAction(grade, criticalFlag)}
                  >
                    Save
                  </AlertDialogAction>
                </CardFooter>
              </Card>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : type === "metrics" ? (
        <>
          <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
              <Card>
                <CardHeader>
                  <CardTitle>Data analysis</CardTitle>
                  <CardDescription>
                    Here you can see the restaurant's performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Carousel>
                    <CarouselContent>
                      <CarouselItem>
                        <ChartContainer config={chartConfig}>
                          <BarChart accessibilityLayer data={chartData1}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey="grade"
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                              tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent
                                  labelKey="countGrade"
                                  nameKey="countGrade"
                                />
                              }
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                              dataKey="countGrade"
                              fill="var(--color-countGrade)"
                              radius={4}
                            />
                          </BarChart>
                        </ChartContainer>
                      </CarouselItem>
                      <CarouselItem>
                        <ChartContainer
                          config={chartConfig}
                          className="min-h-[200px] w-full"
                        >
                          <BarChart accessibilityLayer data={chartData2}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                              dataKey="criticalFlag"
                              tickLine={false}
                              tickMargin={10}
                              axisLine={false}
                              tickFormatter={(value) => value.slice(0, 15)}
                            />
                            <ChartTooltip
                              content={
                                <ChartTooltipContent
                                  labelKey="countCriticalFlag"
                                  nameKey="countCriticalFlag"
                                />
                              }
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                              dataKey="countCriticalFlag"
                              fill="var(--color-countCriticalFlag)"
                              radius={4}
                            />
                          </BarChart>
                        </ChartContainer>
                      </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <AlertDialogCancel className="w-full mr-[1vw]">
                    Return
                  </AlertDialogCancel>
                </CardFooter>
              </Card>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default AddInspectionDialog;
