import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  maintainAspectRatio: false,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const BarChart = () => {
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: 'average sleep hour',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'average exercise hour',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      // const url = '../dummyData.json';
      const userLabel = [];
      const userSleepHoursData = [];
      const userExerciseHoursData = [];

      await fetch('./dummyData.json')
        .then((userData) => {
          console.log('dataaaaa', userData);
          const res = userData.json();
          console.log(res);
          return res;
        })
        .then((res) => {
          for (const user of res) {
            userLabel.push(user.username);
            userSleepHoursData.push(user.average_sleep_hour);
            userExerciseHoursData.push(user.average_exercise_hour);
          }
        });

      setUserData({
        labels: userLabel,
        datasets: [
          {
            label: 'average sleep hour',
            data: userSleepHoursData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
          {
            label: 'average exercise hour',
            data: userExerciseHoursData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Bar data={userData} height={400} weight={600} options={options} />
    </div>
  );
};

export default BarChart;
