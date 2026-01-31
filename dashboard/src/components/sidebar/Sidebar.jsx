// src/Sidebar.jsx
import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import IncompleteCircleIcon from "@mui/icons-material/IncompleteCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import "../../api/authApi";
import { logout } from "../../api/authApi";
import { getUserInfo } from "../../api/userApi";
import { useI18n } from "../../i18n/useI18n";

export default function Sidebar() {
  const { lang, t, toggleLang } = useI18n();

  // select current pathname from router state
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  // helpers
  const isActive = (path) => pathname === path;
  const anyActiveIn = (paths = []) => paths.some((p) => pathname === p);

  // If a route inside the group is active, force group to be expanded
  const masterPaths = [
    "/districts",
    "/provinces",
    "/delivery-methods",
    "/payment-methods",
    "/faqs",
    "/about-us",
    "/shop-contacts",
  ];
  const managementPaths = ["/categories", "/products", "/banners", "/sale-offers", "/vouchers"];
  const userPaths = ["/users", "/orders", "/reviews"];
  const statisticPaths = ["/user-statistic", "/sales-statistic"];

  const [masterOpen, setMasterOpen] = useState(() => anyActiveIn(masterPaths));
  const [managementOpen, setManagementOpen] = useState(() => anyActiveIn(managementPaths));
  const [userOpen, setUserOpen] = useState(() => anyActiveIn(userPaths));
  const [statisticOpen, setStatisticOpen] = useState(() => anyActiveIn(statisticPaths));

  const sideBarData = [
    {
      name: "master_data",
      state: masterOpen,
      stateHook: setMasterOpen,
      paths: masterPaths,
      children: [
        { label: "provinces", to: "/provinces", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        { label: "districts", to: "/districts", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        // {
        //   label: "delivery_methods",
        //   to: "/delivery-methods",
        //   icon: <FolderIcon fontSize="small" className="text-gray-500" />,
        // },
        // {
        //   label: "payment_methods",
        //   to: "/payment-methods",
        //   icon: <FolderIcon fontSize="small" className="text-gray-500" />,
        // },
        // { label: "faqs", to: "/faqs", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        // { label: "about_us", to: "/about-us", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        // {
        //   label: "shop_contact",
        //   to: "/shop-contacts",
        //   icon: <FolderIcon fontSize="small" className="text-gray-500" />,
        // },
      ],
    },
    {
      name: "management_data",
      state: managementOpen,
      stateHook: setManagementOpen,
      paths: managementPaths,
      children: [
        { label: "brands", to: "/brands", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        { label: "categories", to: "/categories", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        { label: "products", to: "/products", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        // { label: "banners", to: "/banners", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        // { label: "sales", to: "/sale-offers", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        { label: "vouchers", to: "/vouchers", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
      ],
    },
    {
      name: "user_data",
      state: userOpen,
      stateHook: setUserOpen,
      paths: userPaths,
      children: [
        { label: "users", to: "/users", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        { label: "orders", to: "/orders", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
        // { label: "reviews", to: "/reviews", icon: <FolderIcon fontSize="small" className="text-gray-500" /> },
      ],
    },
    {
      name: "statistic",
      state: statisticOpen,
      stateHook: setStatisticOpen,
      paths: statisticPaths,
      children: [
        // {
        //   label: "user_statistic",
        //   to: "/user-statistic",
        //   icon: <FolderIcon fontSize="small" className="text-gray-500" />,
        // },
        {
          label: "sales_statistic",
          to: "/sales-statistic",
          icon: <FolderIcon fontSize="small" className="text-gray-500" />,
        },
      ],
    },
  ];

  const { data: user, isLoading } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      // Always clear tokens (even if API fails)
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate({ to: "/" });
    },
  });

  const handleOnLogout = (e) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="flex items-start gap-3 border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-indigo-600">
              <button
                onClick={() => toggleLang()}
                className="flex h-10 cursor-pointer items-center justify-center rounded-md px-3 text-sm font-medium transition-colors">
                {lang.toUpperCase()}
              </button>
            </div>
            <h1 className="text-xl font-bold text-gray-900">{t("sidebar_title")}</h1>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-4">
        {sideBarData.map((section) => {
          const isExpanded = section.state;

          return (
            <div key={section.name} className="mb-2">
              {/* Header */}
              <div
                className="flex cursor-pointer items-center justify-start py-2 pr-2 pl-1"
                onClick={() => section.stateHook((s) => !s)}>
                <KeyboardArrowDownIcon
                  className={`mr-2 transform transition-transform duration-300 ${isExpanded ? "rotate-0 text-indigo-700" : "rotate-180 text-gray-400"} `}
                />
                <span className="ml-2 text-[1rem] font-semibold text-indigo-700 uppercase">{t(section.name)}</span>
              </div>

              {/* Children */}
              {isExpanded && (
                <>
                  {section.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                        isActive(child.to) ? "bg-indigo-100 text-gray-900" : "text-gray-600 hover:bg-gray-100"
                      }`}>
                      {child.icon}

                      <span>{t(child.label)}</span>
                    </Link>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3">
          {isLoading ? (
            <IncompleteCircleIcon fontSize="large" className="text-gray-400" />
          ) : (
            <>
              <img
                alt="User avatar"
                className="h-10 w-10 rounded-full object-cover"
                src={
                  user?.imageLink ??
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuAa0Pw-zeDBa5teSCOmHBpM-kchB9C1W9lE4HpMTnONGDCb8wpaWtjrxwnwXoc53zXo-RaGz5e6s2nTHxSVExlOGr9CCVvckNlLFIxY9u5BW5iRAzmMKQG1MD55nO2-SEFCmKFA43Z3sn9ybeFTGAwYxldxo41MFDdL4_sxd45jOTxaf70Ab32xCPJriZcyZi37T2tgV9JuF6Kd1SAGvk35bOFEqg_w1kh-EeM-XcjU_EADfblRZQX7RMpgPJ-EjZfXaXL5Ibxtf6CR"
                }
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">{`${user?.firstName} ${user?.lastName}`}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </>
          )}
          <button
            className="ml-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-transparent text-gray-700 transition-colors hover:bg-indigo-600 hover:text-white focus:outline-none"
            onClick={handleOnLogout}>
            <LogoutIcon fontSize="small" />
          </button>
        </div>
      </div>
    </aside>
  );
}
