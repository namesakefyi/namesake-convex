import { api } from "@convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app";
import { Banner, Link } from "@/components/common";
import {
  HowToChangeNames,
  QuestCallToAction,
  StatusSelect,
} from "@/components/quests";
import type { Status } from "@/constants";

export const Route = createFileRoute(
  "/_authenticated/_home/quests/getting-started",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const gettingStarted = useQuery(api.userGettingStarted.get);
  const updateGettingStartedStatus = useMutation(
    api.userGettingStarted.setStatus,
  );

  const handleStatusChange = async (status: Status) => {
    try {
      await updateGettingStartedStatus({ status });
    } catch (_err) {
      toast.error("Couldn't update status. Please try again.");
    }
  };

  return (
    <>
      <PageHeader title="Getting Started" mobileBackLink={{ to: "/" }}>
        <StatusSelect
          status={gettingStarted?.status as Status}
          onChange={handleStatusChange}
        />
      </PageHeader>
      <Banner className="mb-6 mt-1" variant="warning">
        <strong>
          Existing accounts and data will be deleted on March 31, 2026.
        </strong>{" "}
        Namesake guides and forms are now available{" "}
        <Link href="https://namesake.fyi">without login</Link>. Questions? Email
        us at <Link href="mailto:hey@namesake.fyi">hey@namesake.fyi</Link>.
      </Banner>
      <HowToChangeNames />
      <QuestCallToAction
        data={{ gettingStarted }}
        illustration="birthCertificate"
        onChangeStatus={handleStatusChange}
        className="mt-4 mb-8"
        isLoading={gettingStarted === undefined}
      />
    </>
  );
}
