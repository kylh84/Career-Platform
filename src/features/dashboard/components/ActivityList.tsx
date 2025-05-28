// import React from 'react';
// import { Activity } from '../../../__mocks__/dashboardMock';

// interface ActivityListProps {
//   activities: Activity[];
// }

// const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
//       <div className="bg-white rounded-lg shadow">
//         {activities.map((activity) => (
//           <div key={activity.id} data-testid="activity-item" className="p-4 border-b last:border-b-0">
//             <h3 className="font-medium">{activity.title}</h3>
//             <p className="text-sm text-gray-600">{activity.description}</p>
//             <p className="text-xs text-gray-500 mt-1">{new Date(activity.date).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivityList;
