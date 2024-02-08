import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Wallet from './wallet/Wallet';
import { selectOnSupportedNetwork } from './wallet/walletSlice';

export default function AppHeader() {
  const onSupportedNetwork = useSelector(selectOnSupportedNetwork);
  const account = useSelector((state) => state.wallet.account);
  const isOwner = useSelector((state) => state.wallet.isOwner);

  // only show nav links if there is a connected account
  const links = account && onSupportedNetwork
    ? (
      <>
        <NavLink to="/kitties" className="btn nav-link">My Kitties</NavLink>
        <NavLink to="/breed" className="btn nav-link">Breed</NavLink>
        <NavLink to="/market" className="btn nav-link">Marketplace</NavLink>
      </>
    )
    : null;

  const admin = isOwner
    ? <NavLink to="/admin" className="btn nav-link">Admin</NavLink>
    : null;

  return (
    <Nav variant="pills" className="mb-2">
      <NavLink to="/" className="navbar-brand btn">
        <img
          src="logo192.png"
          alt="React"
          width="30"
          height="30"
        />
        Qitty Cats
      </NavLink>
      {links}
      {admin}
      <Wallet />
    </Nav>
  );
}
