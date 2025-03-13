import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FooterLinkProps {
  link: string;
  name?: string;
  children?: ReactNode;
  target?: string;
}

export function FooterLink({ link, name, children, target }: FooterLinkProps) {
  return (
    <li className="hover:text-white transition-colors">
      <Link to={link} target={target}>
        {name}
        {children}
      </Link>
    </li>
  );
}
