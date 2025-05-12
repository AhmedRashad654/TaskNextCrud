import { ReactNode } from "react";
import NavbarDashboard from "../_componant/NavbarDashboard";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <NavbarDashboard />
      <div className="">{children}</div>
    </div>
  );
}
