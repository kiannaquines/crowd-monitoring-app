'use client';

import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarGraphToday } from '@/components/charts/BarGraphToday';

import { VisitorsCount } from '@/components/charts/VisitorsCount';

import { TOTAL_USERS_COUNT_URL, AUTHORIZATION_TOKEN, TOTAL_STAFF_COUNT_URL, TOTAL_ADMIN_COUNT_URL, TODAY_COUNT_URL, LASTDAY_COUNT_URL, LASTWEEK_COUNT_URL, LASTMONTH_COUNT_URL } from '@/utils/constants';
import { TimeSeriesChart } from '@/components/charts/TimeSeriesChart';

const HomePage = () => {

  const [totalUsers, setTotalUsers] = React.useState(0);
  const [totalStaff, setTotalStaff] = React.useState(0);
  const [totalAdmin, setTotalAdmin] = React.useState(0);
  const [totalSection, setTotalSection] = React.useState(0);
  const [totalToday, setTotalToday] = React.useState(0);
  const [totalLastDay, setTotalLastDay] = React.useState(0);
  const [totalLastWeek, setTotalLastWeek] = React.useState(0);
  const [totalLastMonth, setTotalLastMonth] = React.useState(0);

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch(`${TOTAL_USERS_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalUsers(data.count);
    } catch (error) {
      console.error('Error fetching total users:', error);
      setTotalUsers(0);
    }
  }

  const fetchTotalStaff = async () => {
    try {
      const response = await fetch(`${TOTAL_STAFF_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalStaff(data.count);
    } catch (error) {
      console.error('Error fetching total staff:', error);
      setTotalStaff(0);
    }
  }

  const fetchTotalAdmin = async () => {
    try {
      const response = await fetch(`${TOTAL_ADMIN_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalAdmin(data.count);
    } catch (error) {
      console.error('Error fetching total staff:', error);
      setTotalAdmin(0);
    }
  }

  const fetchTotalSection = async () => {
    try {
      const response = await fetch(`${TOTAL_ADMIN_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalSection(data.count);
    } catch (error) {
      console.error('Error fetching total staff:', error);
      setTotalSection(0);
    }
  }

  const fetchTotalToday = async () => {
    try {
      const response = await fetch(`${TODAY_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalToday(data.count);
    } catch (error) {
      console.error('Error fetching total staff:', error);
      setTotalToday(0);
    }
  }

  const fetchTotalLastDay = async () => {
    try {
      const response = await fetch(`${LASTDAY_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalLastDay(data.count);
    } catch (error) {
      console.error('Error fetching total staff:', error);
      setTotalLastDay(0);
    }
  }

  const fetchTotalLastWeek = async () => {
    try {
      const response = await fetch(`${LASTWEEK_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalLastWeek(data.count);
    } catch (error) {
      console.error('Error fetching total staff:', error);
      setTotalLastWeek(0);
    }
  }


  const fetchTotalLastMonth = async () => {
    try {
      const response = await fetch(`${LASTMONTH_COUNT_URL}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${AUTHORIZATION_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTotalLastMonth(data.count);
    } catch (error) {
      console.error('Error fetching total staff:', error);
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

      <div className='grid grid-cols-1 md:grid-cols-4 mt-4 gap-4'>
        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalUsers}</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total active users available</p>
          </CardFooter>
        </Card>

        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Staff</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalStaff}</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total staff users available</p>
          </CardFooter>
        </Card>

        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Admin</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalAdmin}</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total super users available</p>
          </CardFooter>
        </Card>

        <Card className='shadow-sm cursor-pointer'>
          <CardHeader className="items-start pb-4">
            <CardTitle>Sections</CardTitle>
          </CardHeader>
          <CardContent className='py-3'>
            <h1 className='text-6xl font-semibold mt-1'>{totalSection}</h1>
          </CardContent>
          <CardFooter className='items-start'>
            <p>Total sections available</p>
          </CardFooter>
        </Card>
        <VisitorsCount type="Today" visitors={totalToday} />
        <VisitorsCount type="Last Day" visitors={totalLastDay} />
        <VisitorsCount type="Last Week" visitors={totalLastWeek} />
        <VisitorsCount type="Last Month" visitors={totalLastMonth} />
        <TimeSeriesChart />

        <BarGraphToday />
      </div>
    </main>
  )
}

export default HomePage;
