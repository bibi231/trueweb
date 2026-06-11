import { auth } from "@/lib/auth";
import { NavbarClient } from "./NavbarClient";

const OWNER_EMAILS = ["peterjohn2343@gmail.com", "bitrusgadzama02@gmail.com", "bitrus@trueweb.ng"];

export async function Navbar() {
  const session = await auth();
  const isOwner = session?.user?.email ? OWNER_EMAILS.includes(session.user.email) : false;
  return <NavbarClient isOwner={isOwner} />;
}
