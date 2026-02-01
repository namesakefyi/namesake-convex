import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Authenticated, Unauthenticated } from "convex/react";
import { useState } from "react";
import type { Key } from "react-aria";
import { SignInForm, SignInWrapper } from "@/components/app";
import {
  Banner,
  Link,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@/components/common";
import { useHasVisited } from "@/hooks/useHasVisited";

export const Route = createFileRoute("/_unauthenticated/signin")({
  component: LoginRoute,
});

function LoginRoute() {
  const hasVisited = useHasVisited();
  const [tab, setTab] = useState<Key>(hasVisited ? "signIn" : "signUp");

  return (
    <>
      <Unauthenticated>
        <SignInWrapper>
          <Tabs selectedKey={tab} onSelectionChange={setTab}>
            <TabList>
              <Tab id="signIn">Sign in</Tab>
              <Tab id="signUp">Register</Tab>
            </TabList>
            <TabPanel id="signIn">
              <Banner className="mb-4" variant="warning">
                <strong>
                  Existing accounts and data will be deleted on March 31, 2026.
                </strong>{" "}
                Namesake guides and forms are now available{" "}
                <Link href="https://namesake.fyi">without login</Link>.
              </Banner>
              <SignInForm />
            </TabPanel>
            <TabPanel id="signUp">
              <Banner variant="warning">
                <strong>New user registration is closed.</strong> Namesake
                guides and forms are now available{" "}
                <Link href="https://namesake.fyi">without login</Link>.
              </Banner>
            </TabPanel>
          </Tabs>
        </SignInWrapper>
      </Unauthenticated>
      <Authenticated>
        <Navigate to="/" />
      </Authenticated>
    </>
  );
}
