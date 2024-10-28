'use client';

import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarGraphToday } from '@/components/charts/BarGraphToday';
import { VisitorsCount } from '@/components/charts/VisitorsCount';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { TOTAL_USERS_COUNT_URL, TOTAL_STAFF_COUNT_URL, TOTAL_ADMIN_COUNT_URL, TODAY_COUNT_URL, LASTDAY_COUNT_URL, LASTWEEK_COUNT_URL, LASTMONTH_COUNT_URL, TOTAL_SECTION_COUNT_URL } from '@/utils/constants';
import { TimeSeriesChart } from '@/components/charts/TimeSeriesChart';
import Cookies from 'js-cookie';
import { useToast } from "@/hooks/use-toast";
import { RocketIcon } from 'lucide-react';

const HomePage = () => {

  const accessToken = Cookies.get('bearer')

  const [totalUsers, setTotalUsers] = React.useState(0);
  const [totalStaff, setTotalStaff] = React.useState(0);
  const [totalAdmin, setTotalAdmin] = React.useState(0);
  const [totalSection, setTotalSection] = React.useState(0);
  const [totalToday, setTotalToday] = React.useState(0);
  const [totalLastDay, setTotalLastDay] = React.useState(0);
  const [totalLastWeek, setTotalLastWeek] = React.useState(0);
  const [totalLastMonth, setTotalLastMonth] = React.useState(0);
  const { toast } = useToast()

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch(`${TOTAL_USERS_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        window.location.href = '/'
      }

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch total users',
          description: 'Please check your internet connection or try again later.',
        })
      }

      const data = await response.json();
      setTotalUsers(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch total users',
        description: 'Please check your internet connection or try again later.',
      })
      setTotalUsers(0);
    }
  }

  const fetchTotalStaff = async () => {
    try {
      const response = await fetch(`${TOTAL_STAFF_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch total staff',
          description: 'Please check your internet connection or try again later.',
        })
      }

      const data = await response.json();
      setTotalStaff(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch total staff',
        description: 'Please check your internet connection or try again later.',
      })
      setTotalStaff(0);
    }
  }

  const fetchTotalAdmin = async () => {
    try {
      const response = await fetch(`${TOTAL_ADMIN_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch total admin',
          description: 'Please check your internet connection or try again later.',
        })
      }

      const data = await response.json();
      setTotalAdmin(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch total admin',
        description: 'Please check your internet connection or try again later.',
      })
      setTotalAdmin(0);
    }
  }

  const fetchTotalSection = async () => {
    try {
      const response = await fetch(`${TOTAL_SECTION_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch total section',
          description: 'There was an error fetching total section.',
        })
      }

      if (response.status === 401) {
        window.location.href = '/';
      }

      const data = await response.json();
      setTotalSection(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch total section',
        description: 'There was an error fetching total section.',
      })
      setTotalSection(0);
    }
  }

  const fetchTotalToday = async () => {
    try {
      const response = await fetch(`${TODAY_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch today count',
          description: 'There was an error fetching today count.',
        })
      }

      const data = await response.json();
      setTotalToday(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch today count',
        description: 'There was an error fetching today count.',
      })
      setTotalToday(0);
    }
  }

  const fetchTotalLastDay = async () => {
    try {
      const response = await fetch(`${LASTDAY_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch last day count',
          description: 'There was an error fetching last day count.',
        })
      }

      const data = await response.json();
      setTotalLastDay(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch last day count',
        description: 'There was an error fetching last day count.',
      })
      setTotalLastDay(0);
    }
  }

  const fetchTotalLastWeek = async () => {
    try {
      const response = await fetch(`${LASTWEEK_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch last week count',
          description: 'There was an error fetching last week count.',
        })
      }

      const data = await response.json();
      setTotalLastWeek(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch last week count',
        description: 'There was an error fetching last week count.',
      })
      setTotalLastWeek(0);
    }
  }


  const fetchTotalLastMonth = async () => {
    try {
      const response = await fetch(`${LASTMONTH_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: 'Failed to fetch last month count',
          description: 'There was an error fetching last month count.',
        })
      }

      const data = await response.json();
      setTotalLastMonth(data.count);
    } catch (error) {
      toast({
        variant: "destructive",
        title: 'Failed to fetch last month count',
        description: 'There was an error fetching last month count.',
      })
      setTotalLastMonth(0);
    }
  }

  React.useEffect(() => {
    fetchTotalUsers();
    fetchTotalStaff();
    fetchTotalAdmin();
    fetchTotalSection();
    fetchTotalToday();
    fetchTotalLastDay();
    fetchTotalLastWeek();
    fetchTotalLastMonth();
  }, []);

  return (
    <main>
      <h1 className='text-xl font-semibold'>Crowd Monitoring Overview</h1>
      <Alert className='mt-3'>
        <RocketIcon className="h-4 w-4 mt-3" />
        <AlertTitle>Welcome, User</AlertTitle>
        <AlertDescription>
          Manage your crowd data, monitor visitors, and keep track of staff and admin counts.
        </AlertDescription>
      </Alert>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4'>

        <VisitorsCount type="Today" visitors={totalToday} />
        <VisitorsCount type="Last Day" visitors={totalLastDay} />
        <VisitorsCount type="Last Week" visitors={totalLastWeek} />
        <VisitorsCount type="Last Month" visitors={totalLastMonth} />

        <TimeSeriesChart />
        <Card className='shadow-sm cursor-pointer w-full'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Registered Users</CardTitle>
            <CardDescription>Show total users</CardDescription>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalUsers}</h1>
          </CardContent>
        </Card>

        <Card className='shadow-sm cursor-pointer w-full'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Registered Staff</CardTitle>
            <CardDescription>Show total staff</CardDescription>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalStaff}</h1>
          </CardContent>
        </Card>

        <Card className='shadow-sm cursor-pointer w-full'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Registered Admin</CardTitle>
            <CardDescription>Show total users</CardDescription>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalAdmin}</h1>
          </CardContent>
        </Card>

        <Card className='shadow-sm cursor-pointer w-full'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Available Sections</CardTitle>
            <CardDescription>Show total sections</CardDescription>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalSection}</h1>
          </CardContent>
        </Card>


        <BarGraphToday />
      </div>
    </main>
  )
}

export default HomePage;
