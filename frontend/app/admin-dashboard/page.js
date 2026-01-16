"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import {
  LayoutDashboard,
  Users,
  Target,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Pencil,
  Trash2,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ================= CKEDITOR (SSR OFF) ================= */

const CKEditorClient = dynamic(
  () => import("../../components/CKEditorClient"),
  { ssr: false }
);

/* ================= DEMO DATA ================= */

const statsData = {
  users: 1248,
  leads: 856,
  blogs: 38,
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

const usersData = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com" },
  { id: 2, name: "Priya Singh", email: "priya@gmail.com" },
];

/* ✅ UPDATED LEADS DATA */
const leadsData = [
  {
    id: 1,
    name: "Vikas",
    email: "vikas@gmail.com",
    phone: "9876543210",
    updatedAt: "2026-01-16 12:30 PM",
  },
  {
    id: 2,
    name: "Anjali",
    email: "anjali@gmail.com",
    phone: "9123456780",
    updatedAt: "2026-01-16 01:10 PM",
  },
];

const blogsData = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Next.js Basics" },
];

/* ================= SIDEBAR ================= */

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Users", icon: Users },
  { label: "Leads", icon: Target },
  { label: "Blog Manage", icon: FolderOpen },
  { label: "Blogs", icon: FileText },
  { label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  const confirmLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    router.push("/admin-login");
  };

  return (
    <div className="container-fluid vh-100 bg-light">
      <div className="row h-100">

        {/* SIDEBAR */}
        <aside className="col-2 bg-white border-end p-3">
          <h5 className="fw-bold mb-4" style={{ color: "#f66829" }}>
            Tetrahedron
          </h5>

          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActivePage(item.label)}
              className="btn w-100 text-start mb-2 d-flex align-items-center"
              style={
                activePage === item.label
                  ? { backgroundColor: "#f66829", color: "#fff" }
                  : {}
              }
            >
              <item.icon size={16} className="me-2" />
              {item.label}
            </button>
          ))}
        </aside>

        {/* MAIN */}
        <main className="col-10 p-4 overflow-auto">
          <div className="d-flex justify-content-between mb-4">
            <h4>{activePage}</h4>
            <LogOut
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => setShowLogoutModal(true)}
            />
          </div>

          {activePage === "Dashboard" && <Dashboard />}
          {activePage === "Users" && <UsersPage />}
          {activePage === "Leads" && <LeadsPage />}
          {activePage === "Blog Manage" && <BlogManagePage />}
          {activePage === "Blogs" && <BlogsPage />}
          {activePage === "Settings" && (
            <SettingsPage onLogout={() => setShowLogoutModal(true)} />
          )}
        </main>
      </div>

      {showLogoutModal && (
        <ConfirmModal
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={confirmLogout}
        />
      )}
    </div>
  );
}

/* ================= DASHBOARD ================= */

function Dashboard() {
  return (
    <>
      <div className="row mb-4">
        <StatCard title="Users" value={statsData.users} />
        <StatCard title="Leads" value={statsData.leads} />
        <StatCard title="Blogs" value={statsData.blogs} />
      </div>

      <div className="card p-3">
        <h6>User Growth</h6>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="users" stroke="#f66829" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

/* ================= USERS ================= */

function UsersPage() {
  return (
    <div className="card p-4">
      <h6 className="mb-3">Users List</h6>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= LEADS (NO STATUS, PHONE + TIME ADDED) ================= */

function LeadsPage() {
  return (
    <div className="card p-3">
      <h6>Leads</h6>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {leadsData.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ================= BLOG MANAGE ================= */

function BlogManagePage() {
  const [blogs, setBlogs] = useState(blogsData);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = () => {
    setBlogs(blogs.filter((b) => b.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <div className="card p-3">
      <h6>Manage Blogs</h6>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Blog Title</th>
            <th style={{ width: 180 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  style={{ backgroundColor: "#f66829", color: "#fff" }}
                >
                  <Pencil size={14} className="me-1" />
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => setDeleteId(blog.id)}
                >
                  <Trash2 size={14} className="me-1" />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteId && (
        <ConfirmModal
          title="Delete Blog"
          message="Are you sure you want to delete this blog?"
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

/* ================= BLOGS ================= */

function BlogsPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="card p-4">
      <h5>Create Blog</h5>

      <input
        className="form-control my-3"
        placeholder="Blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
         type="file"
        className="form-control my-3"
        placeholder="Blog title"
        
        
      />

      <div style={{ minHeight: "100px" }}>
        <CKEditorClient  value={content} onChange={setContent} />
      </div>

      <div className="d-flex justify-content-end mt-3 gap-2">
        
        <button
          className="btn"
          style={{ backgroundColor: "#f66829", color: "#fff" }}
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
}

/* ================= SETTINGS ================= */

function SettingsPage({ onLogout }) {
  return (
    <div className="card p-4">
      <button
        className="btn"
        style={{ backgroundColor: "#f66829", color: "#fff" }}
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}

/* ================= CONFIRM MODAL ================= */

function ConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">
      <div className="bg-white p-4 rounded" style={{ width: 350 }}>
        <h5>{title}</h5>
        <p>{message}</p>
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ backgroundColor: "#f66829", color: "#fff" }}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STAT CARD ================= */

function StatCard({ title, value }) {
  return (
    <div className="col-md-3">
      <div className="card p-3">
        <small>{title}</small>
        <h4>{value}</h4>
        <span style={{ color: "#f66829" }}>
          View details <ChevronRight size={14} />
        </span>
      </div>
    </div>
  );
}
