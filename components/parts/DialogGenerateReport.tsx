'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { DatePickerInput } from "./DatePickerInput";
import { Button } from "@/components/ui/button";
import { useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { GENERATE_REPORT_URL } from '@/utils/constants';
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { File } from "lucide-react";

export function GenerateReportDialog() {
  const { toast } = useToast();
  const accessToken = Cookies.get("bearer");

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [isLoading, setLoading] = useState(false);

  const generateReportAction = useCallback(async () => {
    if (!startDate || !endDate || endDate < startDate) {
      toast({
        title: "Invalid Dates",
        description: "Please ensure both dates are selected and that the end date is after the start date.",
      });
      return;
    }
    const formattedStartDate = startDate.toISOString().slice(0, 10);
    const formattedEndDate = endDate.toISOString().slice(0, 10);

    setLoading(true);

    try {
      const response = await fetch(`${GENERATE_REPORT_URL}?start_date=${formattedStartDate}&end_date=${formattedEndDate}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        toast({
          title: "Something went wrong",
          description: errorMessage.detail,
        });
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `visitor_report_${new Date().toISOString().slice(0, 10)}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      toast({
        title: "PDF Generated",
        description: "Your PDF report has been successfully generated and downloaded.",
      });

      setEndDate(undefined)
      setStartDate(undefined)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "There was an error while generating your PDF report.",
      });
    } finally {
      setLoading(false);
    }
  }, [accessToken, startDate, endDate, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Generate Report</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select Date Range for Report</AlertDialogTitle>
          <AlertDialogDescription>
            <Alert>
              <div className="flex items-center">
                <File className="h-4 w-4 mr-2" />
                <AlertTitle>Guide</AlertTitle>
              </div>
              <AlertDescription>
                Please pick both start and end dates to generate your PDF report.
              </AlertDescription>
            </Alert>
            <div className="grid grid-flow-col gap-4 mt-2">
              <DatePickerInput label="Pick Start Date" date={startDate} setDate={setStartDate} />
              <DatePickerInput label="Pick End Date" date={endDate} setDate={setEndDate} />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={async (event) => {
            event.preventDefault();
            await generateReportAction();
          }} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Report'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
