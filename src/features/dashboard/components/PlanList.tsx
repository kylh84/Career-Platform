// import React from 'react';
// import { Plan } from '../../../__mocks__/dashboardMock';

// interface PlanListProps {
//   plans: Plan[];
//   onSelectPlan?: (plan: Plan) => void;
// }

// const PlanList: React.FC<PlanListProps> = ({ plans, onSelectPlan }) => {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <div key={plan.id} className="bg-white p-6 rounded-lg shadow">
//             <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
//             <p className="text-2xl font-bold mb-4">
//               ${plan.price}
//               <span className="text-sm font-normal text-gray-600">/month</span>
//             </p>
//             <ul className="space-y-2">
//               {plan.features.map((feature, index) => (
//                 <li key={index} className="flex items-center">
//                   <span className="mr-2">✓</span>
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//             <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => onSelectPlan?.(plan)}>
//               {plan.id === 'basic' ? 'Current Plan' : `Upgrade to ${plan.name}`}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlanList;
