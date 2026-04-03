'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Target, 
  Star, 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Activity,
  Award,
  Zap,
  RefreshCw
} from 'lucide-react';
import { getAnalytics, type AnalyticsData } from '@/app/actions/analytics';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalClients: 0,
    totalLeads: 0,
    totalSubscribers: 0,
    newClientsThisMonth: 0,
    newLeadsThisWeek: 0,
    conversionRate: 0,
    clientsWithReviews: 0,
    avgResponseTime: '0h',
    topSource: 'Direct'
  });
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, [refreshKey]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatsCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    color = 'sky',
    isPercentage = false 
  }: {
    title: string;
    value: any;
    change?: string;
    icon: any;
    color?: 'sky' | 'emerald' | 'amber' | 'purple' | 'red';
    isPercentage?: boolean;
  }) => (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {value}
            {isPercentage && '%'}
          </p>
          {change && (
            <p className={`text-sm font-medium flex items-center gap-1 ${
              change.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {change} 
              <TrendingUp className="w-3 h-3" />
            </p>
          )}
        </div>
        <div className={`p-3 bg-gradient-to-br rounded-xl text-white shadow-lg shrink-0 ${{
          sky: 'from-sky-500 to-sky-600',
          emerald: 'from-emerald-500 to-emerald-600',
          amber: 'from-amber-500 to-amber-600',
          purple: 'from-purple-500 to-purple-600',
          red: 'from-red-500 to-red-600'
        }[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-[400px] grid place-content-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2 leading-tight">
            Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-md">
            Real-time insights into your clients, leads, and growth.
          </p>
        </div>
        <button
          onClick={() => setRefreshKey(prev => prev + 1)}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl hover:from-sky-600 hover:to-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold shadow-lg hover:shadow-xl self-start"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* MAIN STATS */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          <StatsCard
            title="Total Clients"
            value={analytics.totalClients.toLocaleString()}
            change="+12%"
            icon={Users}
            color="sky"
          />
          <StatsCard
            title="Total Leads"
            value={analytics.totalLeads.toLocaleString()}
            change="+28%"
            icon={Target}
            color="purple"
          />
          <StatsCard
            title="Subscribers"
            value={analytics.totalSubscribers.toLocaleString()}
            change="+5%"
            icon={Mail}
            color="emerald"
          />
          <StatsCard
            title="Conversion"
            value={analytics.conversionRate}
            change="+3%"
            icon={TrendingUp}
            color="amber"
            isPercentage
          />
          <StatsCard
            title="New Clients"
            value={analytics.newClientsThisMonth}
            change="+8%"
            icon={UserPlus}
            color="emerald"
          />
          <StatsCard
            title="New Leads (Week)"
            value={analytics.newLeadsThisWeek}
            icon={Zap}
            color="purple"
          />
          <StatsCard
            title="With Reviews"
            value={analytics.clientsWithReviews}
            change="+15%"
            icon={Star}
            color="amber"
          />
          <StatsCard
            title="Avg Response"
            value={analytics.avgResponseTime}
            icon={Activity}
            color="sky"
          />
        </div>
      </section>

      {/* CHARTS & INSIGHTS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Activity Overview */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="text-sky-600 w-7 h-7" />
            <h3 className="text-2xl font-bold text-gray-900">Recent Activity</h3>
          </div>
          <div className="h-80 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200 group hover:border-sky-200 transition-all">
            <div className="text-center text-gray-500 p-8">
              <Calendar className="mx-auto mb-4 w-16 h-16 opacity-40 group-hover:opacity-70 transition-all" />
              <div>
                <p className="text-lg font-semibold mb-1">Growth Charts Coming Soon</p>
                <p className="text-sm opacity-75">Clients, leads, and revenue over time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-emerald-600 w-7 h-7" />
            <h3 className="text-2xl font-bold text-gray-900">Lead Sources</h3>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Google Forms', percent: 42, color: 'emerald' },
              { name: 'Website', percent: 34, color: 'sky' },
              { name: 'Referrals', percent: 24, color: 'purple' }
            ].map((source, i) => (
              <div 
                key={i}
                className={`flex justify-between items-center p-4 rounded-xl transition-all hover:scale-[1.02] ${
                  {
                    emerald: 'bg-gradient-to-r from-emerald-50 to-emerald-100',
                    sky: 'bg-gradient-to-r from-sky-50 to-sky-100',
                    purple: 'bg-gradient-to-r from-purple-50 to-purple-100'
                  }[source.color]
                }`}
              >
                <span className="font-semibold text-gray-900">{source.name}</span>
                <div className="flex items-center gap-2 min-w-[100px]">
                  <div 
                    className={`w-20 h-2 bg-${source.color}-500 rounded-full`}
                    style={{ width: `${source.percent * 2}px` }}
                  />
                  <span className="text-sm font-bold text-gray-700">
                    {source.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/add-user">
            <div className="group bg-gradient-to-br from-sky-500 to-sky-600 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-all">
                  <UserPlus size={24} />
                </div>
                <h4 className="text-xl font-bold">Add New Client</h4>
              </div>
              <p className="text-sky-100 mb-6 opacity-90 leading-relaxed">
                Onboard your next client in 2 minutes
              </p>
              <span className="flex items-center gap-2 font-semibold group-hover:translate-x-1 transition-all">
                Start Now <Zap size={18} />
              </span>
            </div>
          </Link>

          <Link href="/admin/newsletter-subscribers">
            <div className="group bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-all">
                  <Mail size={24} />
                </div>
                <h4 className="text-xl font-bold">
                  {analytics.totalSubscribers.toLocaleString()} Subscribers
                </h4>
              </div>
              <p className="text-emerald-100 mb-6 opacity-90 leading-relaxed">
                Manage your email list and campaigns
              </p>
              <span className="flex items-center gap-2 font-semibold group-hover:translate-x-1 transition-all">
                View List <TrendingUp size={18} />
              </span>
            </div>
          </Link>

          <Link href="/admin/leads">
            <div className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-all">
                  <Target size={24} />
                </div>
                <h4 className="text-xl font-bold">
                  {analytics.totalLeads.toLocaleString()} Leads
                </h4>
              </div>
              <p className="text-purple-100 mb-6 opacity-90 leading-relaxed">
                Follow up on hot leads and close deals
              </p>
              <span className="flex items-center gap-2 font-semibold group-hover:translate-x-1 transition-all">
                Review Leads <Users size={18} />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;