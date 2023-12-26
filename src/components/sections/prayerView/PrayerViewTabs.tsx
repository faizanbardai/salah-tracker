"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { GoAlertFill } from "react-icons/go";
import { FaUserClock } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function PrayerViewTabs() {
  return (
    <div className="flex w-full flex-col px-2">
      <Tabs aria-label="Options" fullWidth color="primary">
        <Tab key="Day" title="Day">
          <div>
            {["Fajr", "Zohr", "Asr", "Maghrib", "Isha"].map((prayer) => {
              return (
                <Card className="mb-2" key={prayer}>
                  <CardBody>
                    <div className="flex gap-4 items-center">
                      <div className="flex-1">{prayer}</div>
                      <Button
                        isIconOnly
                        size="md"
                        aria-label="not prayed"
                        radius="full"
                        color="danger"
                      >
                        <GoAlertFill size={25} />
                      </Button>
                      <Button
                        isIconOnly
                        size="md"
                        aria-label="prayed qada"
                        radius="full"
                        color="warning"
                      >
                        <FaUserClock size={25} />
                      </Button>
                      <Button
                        isIconOnly
                        size="md"
                        aria-label="prayed alone on time"
                        radius="full"
                        color="primary"
                      >
                        <FaUserShield size={25} />
                      </Button>
                      <Button
                        isIconOnly
                        size="md"
                        aria-label="prayed with jamaat on time"
                        radius="full"
                        color="success"
                      >
                        <FaUsers size={25} />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        </Tab>
        <Tab key="Week" title="Week">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="Month" title="Month">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
