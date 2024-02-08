import React from 'react';
import { Nav } from 'react-bootstrap';
import {Link, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Wallet from './wallet/Wallet';
import { selectOnSupportedNetwork } from './wallet/walletSlice';
import {connect} from "./wallet/walletSaga";
import history from "../history";


export default function AppHeader() {
  const onSupportedNetwork = useSelector(selectOnSupportedNetwork);
  const account = useSelector((state) => state.wallet.account);
  const isOwner = useSelector((state) => state.wallet.isOwner);
    const isKittyCreator = useSelector((state) => state.wallet.isKittyCreator);
    const dispatch = useDispatch();
    const handleMarketLink = () => {
        dispatch(connect())
        history.push('/market')
    };
    const handleKittyLink = () => {
        dispatch(connect())
        history.push('/kitties')
    };

    const handleBreedLink = () => {
        dispatch(connect())
        history.push('/breed')
    };

  // only show nav links if there is a connected account
  const links = account && onSupportedNetwork
    ? (
      <>
        <Link to="/kitties" onClick={handleKittyLink} className="btn nav-link">My Kitties</Link>
        <Link to="/breed" onClick={handleBreedLink} className="btn nav-link">Breed</Link>
        <Link to="/market" onClick={handleMarketLink} className="btn nav-link">Marketplace</Link>
      </>
    )
    : null;

    const factory = isKittyCreator
        ? <NavLink to="/factory" className="btn nav-link">Mint</NavLink>
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
      {factory}
      {admin}
      <Wallet />
    </Nav>
  );
}
