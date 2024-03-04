

import React from 'react';

export const getTodayDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  return formattedDate;
};

// Function to get the date 15 days from now
export const getDateAfter15Days = () => {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 15);
  const formattedDate = futureDate.toISOString().split('T')[0];
  return formattedDate;
};
