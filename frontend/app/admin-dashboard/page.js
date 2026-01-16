"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Target,
  Package,
  GraduationCap,
  BookOpen,
  FolderOpen,
  FileText,
  Star,
  Briefcase,
  ClipboardList,
  Settings,
  Bell,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { getUserEmail, clearAuthData, isAdmin } from "@/lib/authHelper";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= DUMMY DATA (API READY) ================= */
const statsData = {
  totalUsers: 1248,
  totalLeads: 856,
  totalPackages: 24,
  activeSubscriptions: 342,
  monthlyRevenue: 45600,
};

const userGrowthData = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 520 },
  { month: "Mar", users: 680 },
  { month: "Apr", users: 750 },
  { month: "May", users: 890 },
  { month: "Jun", users: 1050 },
  { month: "Jul", users: 1248 },
];

const leadsConversionData = [
  { month: "Jan", leads: 120, conversions: 45 },
  { month: "Feb", leads: 150, conversions: 62 },
  { month: "Mar", leads: 180, conversions: 78 },
  { month: "Apr", leads: 200, conversions: 95 },
  { month: "May", leads: 240, conversions: 110 },
  { month: "Jun", leads: 280, conversions: 135 },
];

const recentUsers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", date: "2026-01-13" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", date: "2026-01-12" },
  { id: 3, name: "Amit Kumar", email: "amit@example.com", date: "2026-01-12" },
];

const recentAdmissions = [
  { id: 1, name: "Vikash Gupta", course: "Web Dev", status: "Pending" },
  { id: 2, name: "Anjali Verma", course: "Data Science", status: "Approved" },
];

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Users" },
  { icon: Target, label: "Leads" },
  { icon: Package, label: "Packages" },
  { icon: GraduationCap, label: "Admission Request" },
  { icon: BookOpen, label: "Courses" },
  { icon: FolderOpen, label: "Blog Categories" },
  { icon: FileText, label: "Blogs" },
  { icon: Star, label: "Testimonials" },
  { icon: Briefcase, label: "Careers" },
  { icon: ClipboardList, label: "Applications" },
  { icon: Settings, label: "Settings" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeSidebar, setActiveSidebar] = useState("Dashboard");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Protect the route
    if (!isAdmin()) {
      router.push("/admin-login");
      return;
    }
    setUserEmail(getUserEmail() || "admin@example.com");
  }, [router]);

  const handleLogout = () => {
    clearAuthData();
    router.push("/admin-login");
  };

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row h-100">
        {/* ================= SIDEBAR ================= */}
        <aside className="col-2 bg-white border-end p-3">
          <div className="d-flex align-items-center gap-2 mb-4">
            <div className="bg-primary text-white rounded p-2">
              <GraduationCap size={20} />
            </div>
            <h5 className="mb-0 fw-bold text-primary">Collexa Edu</h5>
          </div>

          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSidebar(item.label)}
              className={`btn w-100 text-start mb-1 d-flex align-items-center gap-2 ${
                activeSidebar === item.label
                  ? "btn-primary"
                  : "btn-light"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </aside>

        {/* ================= MAIN ================= */}
        <main className="col-10 p-4 overflow-auto">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-semibold">Dashboard Overview</h4>
            <div className="d-flex align-items-center gap-3">
              <Bell />
              <div className="text-end">
                <div className="fw-semibold">Admin</div>
                <small className="text-muted">{userEmail}</small>
              </div>
              <button
                className="btn btn-link p-0 text-danger"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="row g-3 mb-4">
            <StatCard title="Total Users" value={statsData.totalUsers} />
            <StatCard title="Total Leads" value={statsData.totalLeads} />
            <StatCard title="Packages" value={statsData.totalPackages} />
            <StatCard title="Active Subs" value={statsData.activeSubscriptions} />
            <StatCard
              title="Revenue"
              value={statsData.monthlyRevenue}
              prefix="₹"
            />
          </div>

          {/* ================= CHARTS ================= */}
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="card p-3">
                <h6>User Growth</h6>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line dataKey="users" stroke="#0d6efd" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3">
                <h6>Leads vs Conversions</h6>
                <div style={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={leadsConversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="leads" fill="#0d6efd" />
                      <Bar dataKey="conversions" fill="#198754" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* ================= TABLES ================= */}
          <div className="row g-3">
            <div className="col-md-6">
              <div className="card p-3">
                <h6>Recent Users</h6>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3">
                <h6>Admission Requests</h6>
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAdmissions.map((a) => (
                      <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.course}</td>
                        <td>
                          <span
                            className={`badge ${
                              a.status === "Approved"
                                ? "bg-success"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ title, value, prefix = "" }) {
  return (
    <div className="col-md-4">
      <div className="card p-3">
        <small className="text-muted">{title}</small>
        <h4 className="fw-bold">
          {prefix}
          {value.toLocaleString()}
        </h4>
        <span className="text-primary small d-flex align-items-center gap-1">
          View details <ChevronRight size={16} />
        </span>
      </div>
    </div>
  );
}
