'use client';
import { useEffect, useMemo, useState } from 'react';

function trackAnalytics(data: { user_id: number }) {
  console.log('Tracking analytics data:', data);
}

export default function Analytics() {
  // SOLUTION 1
  // as state, runs 1 and when analyticsData changes
  // const [analyticsData, setAnalyticsData] = useState({ user_id: 1 });

  // SOLUTION 2
  // if it is constant is causing an infinite loop
  // to solve this move the next line inside useEffect
  // const analyticsData = { user_id: 1 };

  // SOLUTION 3
  // if it is constant but you need it in other places you cannot move it inside useEffect
  // you can momoize wuth useMemo
  // this creates a fixed reference

  // in case of a function you can use useCallback (not the case here)
  const analyticsData = useMemo(() => ({ user_id: 1 }), []);
  useEffect(() => {
    trackAnalytics(analyticsData);
  }, [analyticsData]);
  return <div>Analytics Component</div>;
}
