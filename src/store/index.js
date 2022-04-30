import { createStore } from "vuex";
import { clientAuth } from "./modules/client.auth.module";
import { adminAuth } from "./modules/admin.auth.module";
import { authorize } from "./modules/admin.authorize.module";
import { adminTicket } from "./modules/admin.ticket.module";
import { adminUser } from "./modules/admin.user.module";
import { adminAccount } from "./modules/admin.account.module";
import { adminRole } from "./modules/admin.role.module";
import { adminCategory } from "./modules/admin.category.module";
import { adminStatus } from "./modules/admin.status.module";
import { adminPriority } from "./modules/admin.priority.module";
import { adminRegion } from "./modules/admin.region.module";
import { adminZone } from "./modules/admin.zone.module";
import { adminWoreda } from "./modules/admin.woreda.module";
import { adminPermission } from "./modules/admin.permission.module";
import { adminComment } from "./modules/admin.comment.module";
import { adminFaq } from "./modules/admin.faq.module";
import { agentTicket } from "./modules/agent.ticket.module";
import { clientTicket } from "./modules/client.ticket.module";
import { clientComment } from "./modules/client.comment.module";
import { utility } from "./modules/utility.module";
import { adminService } from "./modules/admin.service.module";
import { adminServiceApprover } from "./modules/admin.service.approver.module";
import { adminRequirement } from "./modules/admin.requirement.module";
import { adminRequisition } from "./modules/admin.requisition.module";
import { adminRequisitionRequirement } from "./modules/admin.requisition.requirement.module";
import { adminClient } from "./modules/admin.client.module";
import { adminUtil } from "./modules/admin.util.module";
import { adminNotification } from "./modules/admin.notification.module";
import { clientNotification } from "./modules/client.notification.module";
import createPersistedState from "vuex-persistedstate";
import { adminDashboard } from "./modules/admin.dashboard.module";
import { adminReport } from "./modules/admin.report.module";
import { adminRevenue } from "./modules/admin.revenue.module";
import { clientRevenue } from "./modules/client.revenue.module";
import { adminActivitylog } from "./modules/admin.activity.log.module";
import { adminLoginAttempt } from "./modules/admin.login.attempt.module";
import { adminCustomer } from "./modules/admin.customer.module";

const store = createStore({
    modules: {
        clientAuth,
        authorize,
        adminAuth,
        adminTicket,
        adminUser,
        adminAccount,
        adminRole,
        adminPermission,
        adminCategory,
        adminPriority,
        adminStatus,
        adminRegion,
        adminZone,
        adminWoreda,
        adminComment,
        adminFaq,
        agentTicket,
        clientTicket,
        clientComment,
        clientNotification,
        utility,
        adminService,
        adminRequirement,
        adminRequisition,
        adminRequisitionRequirement,
        adminClient,
        adminUtil,
        adminNotification,
        adminDashboard,
        adminReport,
        adminServiceApprover,
        adminRevenue,
        clientRevenue,
        adminActivitylog,
        adminLoginAttempt,
        adminCustomer,
    },
    plugins: [createPersistedState()],
});

export default store;
