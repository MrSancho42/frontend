import React from "react";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LinkButton({ children, to, variant }) {
  return (
    <Link to={to} style={{ color: 'white', textDecoration: 'none' }}>
      <Button variant={variant} className="w-100 text-nowrap" >
        {children}
      </Button>
    </Link>
  );
}

export default LinkButton;
