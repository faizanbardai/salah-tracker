"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarItem,
  Button,
  Link,
} from "@nextui-org/react";

export default function Component() {
  const { data: session } = useSession();
  const userDefaultImage = "https://dummyimage.com/600x600/000/fff.jpg&text=AB";
  if (session?.user) {
    return (
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={session.user.name || ""}
            size="sm"
            src={session.user.image || userDefaultImage}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="Profile"
          >
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session.user.email || ""}</p>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => signOut()}
            textValue="Logout"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  return (
    <>
      <NavbarItem>
        <Button
          as={Link}
          color="primary"
          variant="flat"
          onClick={() => signIn()}
        >
          Login
        </Button>
      </NavbarItem>
    </>
  );
}
