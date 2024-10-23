'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { GENERATE_REPORT_URL } from '@/utils/constants';
import { useToast } from '@/hooks/use-toast';

const GenerateReport = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const accessToken = Cookies.get('token');
    const { toast } = useToast();

    const generateReport = async () => {
        try {
            setIsLoading(true);

            const response = await fetch(`${GENERATE_REPORT_URL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const message = await response.json();

                toast({
                    title: 'Something went wrong',
                    description: message.detail,
                });
            }

        } catch (error) {
            console.error('Error generating report:', error);
            toast({
                title: 'Something went wrong',
                description: 'Failed to generate report. Please try again later.',
            });

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={generateReport} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Report'}
        </Button>
    );
};

export default GenerateReport;
