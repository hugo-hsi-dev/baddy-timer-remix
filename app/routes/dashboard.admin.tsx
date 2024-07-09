import { LoaderFunctionArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { $path } from 'remix-routes';
import invariant from 'tiny-invariant';
import Navbar from '~/components/Navbar';
import { getPlayers } from '~/services/auth/getPlayers';

const exampleMenu = [
  { display: 'Locations', to: $path('/dashboard/admin/locations') },
  { display: 'Settings', to: $path('/dashboard/settings') },
];

export function loader({ request }: LoaderFunctionArgs) {
  const players = getPlayers(request);
  return players;
}

export default function AdminDashboardLayout() {
  const { players } = useLoaderData<typeof loader>();
  invariant(players, 'Players not found');
  return (
    <>
      <Navbar
        logo="Bad:Admin"
        menuItems={exampleMenu}
        selectOptions={players}>
        <Navbar.Select />
        <Navbar.Menu />
        <Navbar.Logo />
      </Navbar>
      <Outlet />
    </>
  );
}