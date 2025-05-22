# Pages Structure

## Cấu trúc thư mục

```
pages/
├── dashboard/                    # Trang dashboard chính
│   ├── components/              # Components riêng của dashboard
│   │   ├── DashboardStats/
│   │   ├── ActivityFeed/
│   │   └── QuickActions/
│   ├── DashboardHome.tsx        # Trang chủ dashboard
│   ├── DashboardLayout.tsx      # Layout chung cho dashboard
│   └── index.ts
│
├── account/                     # Quản lý tài khoản
│   ├── components/             # Components của account
│   │   ├── ProfileForm/
│   │   ├── SecuritySettings/
│   │   └── SubscriptionInfo/
│   ├── AccountLayout.tsx       # Layout chung cho account
│   ├── EditProfile.tsx         # Trang chỉnh sửa profile
│   ├── Profile.tsx             # Trang profile
│   ├── Security.tsx            # Trang bảo mật
│   └── Subscription.tsx        # Trang đăng ký gói
│
├── career/                     # Phát triển sự nghiệp
│   ├── components/            # Components của career
│   ├── CareerPage.tsx         # Trang career chính
│   ├── CodePage.tsx           # Trang code
│   ├── CVOptimizationPage.tsx # Trang tối ưu CV
│   ├── CVSuggestionPage.tsx   # Trang gợi ý CV
│   └── RoadmapPage.tsx        # Trang lộ trình
│
├── error-pages/               # Trang lỗi
│   ├── components/           # Components cho trang lỗi
│   ├── 404Error.tsx         # Trang 404
│   ├── 500Error.tsx         # Trang 500
│   └── ErrorBoundary.tsx    # Error boundary component
│
└── Home.tsx                  # Trang chủ
```

## Nguyên tắc tổ chức

1. **Phân cấp theo tính năng**

   - Mỗi nhóm tính năng lớn có thư mục riêng
   - Components riêng được đặt trong thư mục components của tính năng
   - Shared components được đặt ở cấp cao hơn

2. **Layout Management**

   - Mỗi section lớn có layout riêng (DashboardLayout, AccountLayout)
   - Layout chứa các elements dùng chung như navigation, sidebar
   - Tái sử dụng layout cho các trang con

3. **Routing Organization**

   ```typescript
   // routes/index.ts
   const routes = {
     dashboard: {
       root: '/dashboard',
       home: '/dashboard/home',
       // other dashboard routes
     },
     account: {
       root: '/account',
       profile: '/account/profile',
       security: '/account/security',
       subscription: '/account/subscription',
     },
     career: {
       root: '/career',
       code: '/career/code',
       cvOptimization: '/career/cv-optimization',
       cvSuggestion: '/career/cv-suggestion',
       roadmap: '/career/roadmap',
     },
   };
   ```

4. **Lazy Loading**

   ```typescript
   // App.tsx hoặc router configuration
   const DashboardPage = lazy(() => import('./pages/dashboard/DashboardHome'));
   const AccountPage = lazy(() => import('./pages/account/AccountLayout'));
   const CareerPage = lazy(() => import('./pages/career/CareerPage'));
   ```

5. **Page Component Structure**

   ```typescript
   // Template cho mỗi page component
   const PageName: React.FC = () => {
     // 1. Hooks & State
     const [state, setState] = useState();

     // 2. Queries & Mutations
     const { data, loading } = useQuery();

     // 3. Handlers & Effects
     useEffect(() => {
       // Side effects
     }, []);

     // 4. Render helpers
     const renderContent = () => {};

     // 5. Main render
     return (
       <PageLayout>
         <PageHeader />
         <MainContent />
         <PageFooter />
       </PageLayout>
     );
   };
   ```

## Best Practices

1. **Performance Optimization**

   - Sử dụng React.memo cho components ít thay đổi
   - Implement lazy loading cho các routes
   - Tối ưu re-renders với useMemo và useCallback

2. **Error Handling**

   - Mỗi page có error boundary riêng
   - Hiển thị thông báo lỗi phù hợp
   - Logging lỗi để debugging

3. **Loading States**

   - Skeleton loading cho từng page
   - Loading indicators phù hợp
   - Smooth transitions giữa các states

4. **SEO & Metadata**

   ```typescript
   const PageComponent = () => {
     return (
       <>
         <Helmet>
           <title>Page Title</title>
           <meta name="description" content="Page description" />
         </Helmet>
         {/* Page content */}
       </>
     );
   };
   ```

5. **Responsive Design**
   - Mobile-first approach
   - Breakpoints nhất quán
   - Adaptive layouts

## Testing Strategy

1. **Unit Tests**

   ```typescript
   describe('PageComponent', () => {
     it('renders correctly', () => {});
     it('handles loading state', () => {});
     it('handles error state', () => {});
     it('integrates with layout', () => {});
   });
   ```

2. **Integration Tests**

   - Test navigation flow
   - Test data fetching
   - Test user interactions

3. **E2E Tests**
   - Critical user journeys
   - Cross-browser compatibility
   - Performance metrics
