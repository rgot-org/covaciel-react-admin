// CustomLayout.tsx
import { Layout } from "react-admin";
import { CustomAppBar } from "./CustomAppBar";
import { CustomMenu } from "./CustomMenu";

export const CustomLayout = (props: any) => (
  <Layout
    {...props}
    sx={{ mt: 3 }}
    appBar={CustomAppBar}
    menu={CustomMenu}
    defaultOpen={true} // 👈 Ajout important
  />
);
