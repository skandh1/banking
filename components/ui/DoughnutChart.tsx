'use client'

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: [1250, 2000, 2400],
                backgroundColor: [
                    'red',
                    'green',
                    'blue'
                ],
            },

        ],
        labels: ["bank 1", "bank 2", "bank 3"],
    }
    return (
        <Doughnut
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}  
        />
    )
}

export default DoughnutChart