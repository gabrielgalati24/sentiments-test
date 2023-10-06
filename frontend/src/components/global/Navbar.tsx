import { Button } from "@mantine/core"

import styled from '@emotion/styled';
import { logout } from "../../utils/auth";

export const Navbar = () => {
  return (
    <NavbarContent>






      <Button color="gray" onClick={() => logout()}>
        Logout
      </Button>
    </NavbarContent>
  )
}



const NavbarContent = styled('div')`
  display: flex;
  gap: 2rem;
  align-items: center;
`

