import { createRouter, createWebHistory } from "vue-router";
import Hero from "../pages/layouts/default-partials/Hero";
import NotFound from "../pages/NotFound";
// admin pages
import Login from "../pages/admin/auth/Login";
import Register from "../pages/admin/auth/Register";

import AdminDashboard from "../pages/admin/Dashboard";

import AdminTicketsTable from "../pages/admin/tickets/TicketsTableAll";
import AdminTicketsTableMy from "../pages/admin/tickets/TicketsTableMy";
import AdminTicketsTableSearch from "../pages/admin/tickets/TicketsTableSearch";
import AdminTicketSearchView from "../pages/admin/tickets/TicketSearchView";
import AdminTicketViewMy from "../pages/admin/tickets/TicketViewMy";

import AdminTicketsTableApprove from "../pages/admin/tickets/TicketsTableApprove";
import AdminTicketApproval from "../pages/admin/tickets/TicketsApproval";
import AdminTicketViewApprove from "../pages/admin/tickets/TicketViewApprove";

import AdminTicketsTableRecent from "../pages/admin/tickets/TicketsTableRecent";
import AdminTicketsTableAssigned from "../pages/admin/tickets/TicketsTableAssigned";
import AdminTicketDocumentVerification from "../pages/admin/tickets/TicketDocumentVerification";
import AdminTicketsTableClosed from "../pages/admin/tickets/TicketsTableClosed";
import AdminTicketView from "../pages/admin/tickets/TicketView";
import AdminTicketAssign from "../pages/admin/tickets/TicketAssign";
import AdminTicketReAssign from "../pages/admin/tickets/TicketReAssign";
import AdminTicketViewAssignedTicket from "../pages/admin/tickets/TicketViewAssigned";
import AdminTicketViewClosedTicket from "../pages/admin/tickets/TicketViewClosed";
import AdminTicketViewRecentTicket from "../pages/admin/tickets/TicketViewRecent";
import AdminTicketComments from "../pages/admin/tickets/TicketComments";
import AdminNotifyRevenue from "../pages/admin/tickets/NotifyRevenue.vue";

import AdminUsersTable from "../pages/admin/users/UsersTable";
import AdminUserNew from "../pages/admin/users/UserNew";
import AdminUserEdit from "../pages/admin/users/UserEdit";
import AdminUserView from "../pages/admin/users/UserView";

import AdminAccountsTable from "../pages/admin/accounts/AccountsTable";
import AdminAccountNew from "../pages/admin/accounts/AccountNew";
import AdminAccountEdit from "../pages/admin/accounts/AccountEdit";
import AdminAccountView from "../pages/admin/accounts/AccountView";

import AdminRolesTable from "../pages/admin/roles/RolesTable";
import AdminRoleNew from "../pages/admin/roles/RoleNew";
import AdminRoleEdit from "../pages/admin/roles/RoleEdit";
import AdminRoleView from "../pages/admin/roles/RoleView";

import AdminPermissionsTable from "../pages/admin/permissions/PermissionsTable";
import AdminPermissionNew from "../pages/admin/permissions/PermissionNew";
import AdminPermissionEdit from "../pages/admin/permissions/PermissionEdit";
import AdminPermissionView from "../pages/admin/permissions/PermissionView";

import AdminCategoriesTable from "../pages/admin/categories/CategoriesTable";
import AdminCategoryNew from "../pages/admin/categories/CategoryNew";
import AdminCategoryEdit from "../pages/admin/categories/CategoryEdit";
import AdminCategoryView from "../pages/admin/categories/CategoryView";

import AdminStatusesTable from "../pages/admin/statuses/StatusesTable";
import AdminStatusNew from "../pages/admin/statuses/StatusNew";
import AdminStatusEdit from "../pages/admin/statuses/StatusEdit";
import AdminStatusView from "../pages/admin/statuses/StatusView";

import AdminPrioritiesTable from "../pages/admin/priorities/PrioritiesTable";
import AdminPriorityNew from "../pages/admin/priorities/PriorityNew";
import AdminPriorityEdit from "../pages/admin/priorities/PriorityEdit";
import AdminPriorityView from "../pages/admin/priorities/PriorityView";

import AdminRegionsTable from "../pages/admin/regions/RegionsTable";
import AdminRegionNew from "../pages/admin/regions/RegionNew";
import AdminRegionEdit from "../pages/admin/regions/RegionEdit";
import AdminRegionView from "../pages/admin/regions/RegionView";

import AdminZonesTable from "../pages/admin/zones/ZonesTable";
import AdminZoneNew from "../pages/admin/zones/ZoneNew";
import AdminZoneEdit from "../pages/admin/zones/ZoneEdit";
import AdminZoneView from "../pages/admin/zones/ZoneView";

import AdminWoredasTable from "../pages/admin/woredas/WoredasTable";
import AdminWoredaNew from "../pages/admin/woredas/WoredaNew";
import AdminWoredaEdit from "../pages/admin/woredas/WoredaEdit";
import AdminWoredaView from "../pages/admin/woredas/WoredaView";

import AdminFaqsTable from "../pages/admin/faqs/FaqsTable";
import AdminFaqNew from "../pages/admin/faqs/FaqNew";
import AdminFaqEdit from "../pages/admin/faqs/FaqEdit";
import AdminFaqView from "../pages/admin/faqs/FaqView";

import AdminRequisitionsTable from "../pages/admin/requisitions/RequisitionsTable";
import AdminRequisitionNew from "../pages/admin/requisitions/RequisitionNew";
import AdminRequisitionEdit from "../pages/admin/requisitions/RequisitionEdit";
import AdminRequisitionView from "../pages/admin/requisitions/RequisitionView";

import AdminRequisitionRequirementsTable from "../pages/admin/requisition-requirements/RequisitionRequirementsTable";
import AdminRequisitionRequirementNew from "../pages/admin/requisition-requirements/RequisitionRequirementNew";
import AdminRequisitionRequirementEdit from "../pages/admin/requisition-requirements/RequisitionRequirementEdit";
import AdminRequisitionRequirementView from "../pages/admin/requisition-requirements/RequisitionRequirementView";

import AdminServicesTable from "../pages/admin/services/ServicesTable";
import AdminServiceNew from "../pages/admin/services/ServiceNew";
import AdminServiceEdit from "../pages/admin/services/ServiceEdit";
import AdminServiceView from "../pages/admin/services/ServiceView";

import AdminServiceApproversTable from "../pages/admin/service-approvers/ServiceApproversTable";
import AdminServiceApproverNew from "../pages/admin/service-approvers/ServiceApproverNew";
import AdminServiceApproverEdit from "../pages/admin/service-approvers/ServiceApproverEdit";
import AdminServiceApproverView from "../pages/admin/service-approvers/ServiceApproverView";

import AdminRequirementsTable from "../pages/admin/requirements/RequirementsTable";
import AdminRequirementNew from "../pages/admin/requirements/RequirementNew";
import AdminRequirementEdit from "../pages/admin/requirements/RequirementEdit";
import AdminRequirementView from "../pages/admin/requirements/RequirementView";

import AdminClientsTable from "../pages/admin/clients/ClientsTable";
import AdminClientNew from "../pages/admin/clients/ClientNew";
import AdminClientEdit from "../pages/admin/clients/ClientEdit";
import AdminClientView from "../pages/admin/clients/ClientView";

import AdminCustomersTable from "../pages/admin/customers/CustomersTable";
import AdminCustomerNew from "../pages/admin/customers/CustomerNew";
import AdminCustomerEdit from "../pages/admin/customers/CustomerEdit";
import AdminCustomerView from "../pages/admin/customers/CustomerView";

import AdminSettings from "../pages/admin/settings/AdminSettings";
import AdminReport from "../pages/admin/reports/ReportsTable";
// admin password reset
import AdminForgotPassword from "../pages/admin/auth/ForgotPassword";
import AdminResetPassword from "../pages/admin/auth/ResetPassword";
import AdminResetPasswordCodeSent from "../pages/admin/auth/ResetPasswordLinkSent";
import AdminEmailVerificationLinkSent from "../pages/admin/auth/EmailVerificationLinkSent";
import AdminEmailVerificationSuccess from "../pages/admin/auth/EmailVerificationSuccess";
import AdminEmailAlreadyVerified from "../pages/admin/auth/EmailAlreadyVerified";

import AdminActivitylogsTable from "../pages/admin/activities/ActivitylogsTable";
import AdminActivitylogView from "../pages/admin/activities/ActivitylogView";
import AdminLoginAttemptsTable from "../pages/admin/login-attempts/LoginAttemptsTable";
import AdminLoginAttemptView from "../pages/admin/login-attempts/LoginAttemptView";

// agent pages
import AgentMain from "../pages/agent/tickets/AgentMain";
import AgentTicketView from "../pages/agent/tickets/TicketView";

// client pages
import Signin from "../pages/client/auth/Signin";
import Signup from "../pages/client/auth/Signup";
import ClientTicketsTable from "../pages/client/tickets/TicketsTable";
import ClientTicketNew from "../pages/client/tickets/TicketNew";
import ClientTicketEdit from "../pages/client/tickets/TicketEdit";
import ClientTicketShow from "../pages/client/tickets/TicketView";
import ClientTicketComments from "../pages/client/tickets/TicketComments";
import ClientViewRevenueNotification from "../pages/client/tickets/ViewRevenueNotification";

import FaqSection from "../pages/client/FaqSection";
import ServicesList from "../pages/client/ServicesList";

import ClientForgotPassword from "../pages/client/auth/ForgotPassword";
import ClientResetPassword from "../pages/client/auth/ResetPassword";
import ClientResetPasswordCodeSent from "../pages/client/auth/ResetPasswordCodeSent";
import ClientEmailVerificationLinkSent from "../pages/client/auth/EmailVerificationLinkSent";
import ClientEmailVerificationSuccess from "../pages/client/auth/EmailVerificationSuccess";
import ClientEmailAlreadyVerified from "../pages/client/auth/EmailAlreadyVerified";
import ClientPhoneVerificationCodeSent from "../pages/client/auth/PhoneVerificationCodeSent";

import ServicesDetail from "../pages/client/ServicesDetail";

import ClientSettings from "../pages/client/settings/ClientSettings";
// import ClientProfile from "../pages/client/settings/ClientProfile";
// import ClientChangePassword from "../pages/client/settings/ClientChangePassword";
// import ClientNotification from "../pages/client/settings/ClientNotification";

const routes = [
    {
        path: "/",
        component: Hero,
        name: "home",
        meta: {
            layout: "DefaultLayout",
        },
    },
    //admin routes
    {
        path: "/admin-login",
        component: Login,
        name: "admin.login",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/admin-register",
        component: Register,
        name: "admin.register",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/admin/logout",
        component: Login,
        name: "admin.logout",
        meta: {
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin-forgot-password",
        component: AdminForgotPassword,
        name: "admin.forgot.password",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/admin-reset-password/:token",
        component: AdminResetPassword,
        name: "admin.password.reset",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/admin-forgot-password-link-sent",
        component: AdminResetPasswordCodeSent,
        name: "admin.forgot.password.reset.link",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/email/verification-success",
        component: AdminEmailVerificationSuccess,
        name: "admin.email.verification.success",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/email/already-verified",
        component: AdminEmailAlreadyVerified,
        name: "admin.email.already.verified.success",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/admin/email-verification",
        component: AdminEmailVerificationLinkSent,
        name: "admin.email.verification",
        meta: {
            layout: "DefaultLayout",
        },
    },

    {
        path: "/admin/dashboard",
        component: AdminDashboard,
        name: "admin.dashbard",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets",
        component: AdminTicketsTable,
        name: "admin.tickets",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/search",
        component: AdminTicketsTableSearch,
        name: "admin.tickets.search",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/search-view/:slug",
        component: AdminTicketSearchView,
        name: "admin.tickets.search_view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/my",
        component: AdminTicketsTableMy,
        name: "admin.tickets.my",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/view/:slug",
        component: AdminTicketViewMy,
        name: "admin.tickets.view_my",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/approval",
        component: AdminTicketsTableApprove,
        name: "admin.tickets.approve",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/approval/:slug",
        component: AdminTicketApproval,
        name: "admin.tickets.approval",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/view-approve/tickets/:slug",
        component: AdminTicketViewApprove,
        name: "admin.tickets.view_approve_ticket",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/recent",
        component: AdminTicketsTableRecent,
        name: "admin.tickets.recent",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/view-recent/:slug",
        component: AdminTicketViewRecentTicket,
        name: "admin.tickets.view.recent",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/assigned",
        component: AdminTicketsTableAssigned,
        name: "admin.tickets.assigned",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/view-assigned/:slug",
        component: AdminTicketViewAssignedTicket,
        name: "admin.tickets.view.assigned",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/view-assigned-closed/:slug",
        component: AdminTicketViewClosedTicket,
        name: "admin.tickets.view_closed",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/document-verification/:slug",
        component: AdminTicketDocumentVerification,
        name: "admin.tickets.verify",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/closed",
        component: AdminTicketsTableClosed,
        name: "admin.tickets.closed",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/view/:slug",
        component: AdminTicketView,
        name: "admin.tickets.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/assign/:slug",
        component: AdminTicketAssign,
        name: "admin.tickets.assign",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/re-assign/:slug",
        component: AdminTicketReAssign,
        name: "admin.tickets.reassign",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/tickets/comments/:slug",
        component: AdminTicketComments,
        name: "admin.tickets.comments",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/notify/revenues/:clientId",
        component: AdminNotifyRevenue,
        name: "admin.notify.revenues",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/users",
        component: AdminUsersTable,
        name: "admin.users",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/users/new",
        component: AdminUserNew,
        name: "admin.users.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/users/edit/:id",
        component: AdminUserEdit,
        name: "admin.users.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/users/view/:id",
        component: AdminUserView,
        name: "admin.users.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/accounts",
        component: AdminAccountsTable,
        name: "admin.accounts",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/accounts/new",
        component: AdminAccountNew,
        name: "admin.accounts.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/accounts/edit/:id",
        component: AdminAccountEdit,
        name: "admin.accounts.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/accounts/view/:id",
        component: AdminAccountView,
        name: "admin.accounts.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/roles",
        component: AdminRolesTable,
        name: "admin.roles",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/roles/new",
        component: AdminRoleNew,
        name: "admin.roles.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/roles/edit/:id",
        component: AdminRoleEdit,
        name: "admin.roles.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/roles/view/:id",
        component: AdminRoleView,
        name: "admin.roles.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/permissions",
        component: AdminPermissionsTable,
        name: "admin.permissions",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/permissions/new",
        component: AdminPermissionNew,
        name: "admin.permissions.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/permissions/edit/:id",
        component: AdminPermissionEdit,
        name: "admin.permissions.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/permissions/view/:id",
        component: AdminPermissionView,
        name: "admin.permissions.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/categories",
        component: AdminCategoriesTable,
        name: "admin.categories",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/categories/new",
        component: AdminCategoryNew,
        name: "admin.categories.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/categories/edit/:id",
        component: AdminCategoryEdit,
        name: "admin.categories.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/categories/view/:id",
        component: AdminCategoryView,
        name: "admin.categories.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/statuses",
        component: AdminStatusesTable,
        name: "admin.statuses",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/statuses/new",
        component: AdminStatusNew,
        name: "admin.statuses.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/statuses/edit/:id",
        component: AdminStatusEdit,
        name: "admin.statuses.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/statuses/view/:id",
        component: AdminStatusView,
        name: "admin.statuses.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/faqs",
        component: AdminFaqsTable,
        name: "admin.faqs",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/activity-logs",
        component: AdminActivitylogsTable,
        name: "admin.activity_logs",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/activity-logs/:id",
        component: AdminActivitylogView,
        name: "admin.activity_logs.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/login-attempts",
        component: AdminLoginAttemptsTable,
        name: "admin.login_attempts",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/login-attempts/:id",
        component: AdminLoginAttemptView,
        name: "admin.login_attempts.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/priorities",
        component: AdminPrioritiesTable,
        name: "admin.priorities",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/priorities/new",
        component: AdminPriorityNew,
        name: "admin.priorities.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/priorities/edit/:id",
        component: AdminPriorityEdit,
        name: "admin.priorities.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/priorities/view/:id",
        component: AdminPriorityView,
        name: "admin.priorities.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/faqs/new",
        component: AdminFaqNew,
        name: "admin.faqs.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/faqs/edit/:id",
        component: AdminFaqEdit,
        name: "admin.faqs.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/faqs/view/:id",
        component: AdminFaqView,
        name: "admin.faqs.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/regions",
        component: AdminRegionsTable,
        name: "admin.regions",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/regions/new",
        component: AdminRegionNew,
        name: "admin.regions.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/regions/edit/:id",
        component: AdminRegionEdit,
        name: "admin.regions.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/regions/view/:id",
        component: AdminRegionView,
        name: "admin.regions.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/zones",
        component: AdminZonesTable,
        name: "admin.zones",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/zones/new",
        component: AdminZoneNew,
        name: "admin.zones.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/zones/edit/:id",
        component: AdminZoneEdit,
        name: "admin.zones.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/zones/view/:id",
        component: AdminZoneView,
        name: "admin.zones.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/woredas",
        component: AdminWoredasTable,
        name: "admin.woredas",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/woredas/new",
        component: AdminWoredaNew,
        name: "admin.woredas.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/woredas/edit/:id",
        component: AdminWoredaEdit,
        name: "admin.woredas.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/woredas/view/:id",
        component: AdminWoredaView,
        name: "admin.woredas.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/services",
        component: AdminServicesTable,
        name: "admin.services",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/services/new",
        component: AdminServiceNew,
        name: "admin.services.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/services/edit/:id",
        component: AdminServiceEdit,
        name: "admin.services.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/services/view/:id",
        component: AdminServiceView,
        name: "admin.services.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/service-approvers",
        component: AdminServiceApproversTable,
        name: "admin.service_approvers",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/service-approvers/new",
        component: AdminServiceApproverNew,
        name: "admin.service_approvers.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/service-approvers/edit/:id",
        component: AdminServiceApproverEdit,
        name: "admin.service_approvers.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/service-approvers/view/:id",
        component: AdminServiceApproverView,
        name: "admin.service_approvers.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },

    {
        path: "/admin/requirements",
        component: AdminRequirementsTable,
        name: "admin.requirements",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requirements/new",
        component: AdminRequirementNew,
        name: "admin.requirements.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requirements/edit/:id",
        component: AdminRequirementEdit,
        name: "admin.requirements.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requirements/view/:id",
        component: AdminRequirementView,
        name: "admin.requirements.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisitions",
        component: AdminRequisitionsTable,
        name: "admin.requisitions",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisitions/new",
        component: AdminRequisitionNew,
        name: "admin.requisitions.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisitions/edit/:id",
        component: AdminRequisitionEdit,
        name: "admin.requisitions.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisitions/view/:id",
        component: AdminRequisitionView,
        name: "admin.requisitions.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisition-requirements",
        component: AdminRequisitionRequirementsTable,
        name: "admin.requisition-requirements",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisition-requirements/new",
        component: AdminRequisitionRequirementNew,
        name: "admin.requisition-requirements.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisition-requirements/edit/:id",
        component: AdminRequisitionRequirementEdit,
        name: "admin.requisition-requirements.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/requisition-requirements/view/:id",
        component: AdminRequisitionRequirementView,
        name: "admin.requisition-requirements.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/clients",
        component: AdminClientsTable,
        name: "admin.clients",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/clients/new",
        component: AdminClientNew,
        name: "admin.clients.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/clients/edit/:id",
        component: AdminClientEdit,
        name: "admin.clients.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/clients/view/:id",
        component: AdminClientView,
        name: "admin.clients.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/customers",
        component: AdminCustomersTable,
        name: "admin.customers",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/customers/new",
        component: AdminCustomerNew,
        name: "admin.customers.new",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/customers/edit/:id",
        component: AdminCustomerEdit,
        name: "admin.customers.edit",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/customers/view/:id",
        component: AdminCustomerView,
        name: "admin.customers.view",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/settings",
        component: AdminSettings,
        name: "admin.settings",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/admin/reports",
        component: AdminReport,
        name: "admin.reports",
        meta: {
            authOnly: true,
            layout: "AdminLayout",
        },
    },
    {
        path: "/agent/tickets",
        component: AgentMain,
        name: "agent.main",
        meta: {
            layout: "AgentLayout",
        },
    },
    {
        path: "/agent/tickets/:slug",
        component: AgentTicketView,
        name: "agent.ticket.show",
        meta: {
            layout: "AgentLayout",
        },
    },
    // client routes
    {
        path: "/login",
        component: Signin,
        name: "client.signin",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/signup",
        component: Signup,
        name: "client.signup",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/client-forgot-password",
        component: ClientForgotPassword,
        name: "client.forgot.password",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/reset-password/:token",
        component: ClientResetPassword,
        name: "client.password.reset",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/client-forgot-password-reset-code",
        component: ClientResetPasswordCodeSent,
        name: "client.forgot.password.reset.code",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/email/verification-success",
        component: ClientEmailVerificationSuccess,
        name: "client.email.verification.success",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/email/already-verified",
        component: ClientEmailAlreadyVerified,
        name: "client.email.already.verified.success",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/client/email-verification",
        component: ClientEmailVerificationLinkSent,
        name: "client.email.verification",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/activation-code",
        component: ClientPhoneVerificationCodeSent,
        name: "client.activation.code",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/logout",
        component: Signin,
        name: "client.signout",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/faq-sections",
        component: FaqSection,
        name: "client.faqs",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/tickets",
        component: ClientTicketsTable,
        name: "client.tickets",
        meta: {
            clientOnly: true,
            layout: "ClientLayout",
        },
    },
    {
        path: "/tickets/new",
        component: ClientTicketNew,
        name: "client.tickets.new",
        meta: {
            clientOnly: true,
            layout: "ClientLayout",
        },
    },
    {
        path: "/tickets/edit/:slug",
        component: ClientTicketEdit,
        name: "client.tickets.edit",
        meta: {
            clientOnly: true,
            layout: "ClientLayout",
        },
    },
    {
        path: "/tickets/view/:slug",
        component: ClientTicketShow,
        name: "client.tickets.view",
        meta: {
            clientOnly: true,
            layout: "ClientLayout",
        },
    },
    {
        path: "/clients/tickets/comments/:slug",
        component: ClientTicketComments,
        name: "client.tickets.comments",
        meta: {
            clientOnly: true,
            layout: "ClientLayout",
        },
    },
    {
        path: "/client/view/revenues/:id",
        component: ClientViewRevenueNotification,
        name: "client.view.revenues",
        meta: {
            clientOnly: true,
            layout: "ClientLayout",
        },
    },
    {
        path: "/services-list",
        component: ServicesList,
        name: "services.list",
        meta: {
            layout: "ClientLayout",
        },
    },
    {
        path: "/services/list",
        component: ServicesList,
        name: "services.list",
        meta: {
            layout: "ClientLayout",
        },
    },
    {
        path: "/service-details/:slug",
        component: ServicesDetail,
        name: "services.detail",
        meta: {
            layout: "DefaultLayout",
        },
    },
    {
        path: "/client/settings",
        component: ClientSettings,
        name: "client.settings",
        meta: {
            clientOnly: true,
            layout: "ClientLayout",
        },
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
        name: "not found",
    },
];

const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

router.beforeEach((to, from, next) => {
    const publicPages = [
        "/",
        "/home",
        "/login",
        "/signup",
        "/signin",
        "/logout",
        "/client/forgot-password",
        "/reset-password/:token",
        "/client/forgot-password",
        "/email/verification-success",
        "/email/already-verified",
        "/client/email-verification",
        "/admin-login",
        "/admin-register",
    ];
    const authRequired = !publicPages.includes(to.path);
    const userIn = localStorage.getItem("userToken");
    const clientIn = localStorage.getItem("clientToken");
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired) {
        if (to.matched.some((record) => record.meta.authOnly)) {
            if (!userIn) {
                next("/admin-login");
            } else {
                next();
            }
        } else if (to.matched.some((record) => record.meta.clientOnly)) {
            if (!clientIn) {
                next("/login");
            } else {
                next();
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
