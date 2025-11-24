import {Link} from "react-router"

export const Footer = () => {
    return (
      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            conduit
          </Link>
          <span className="attribution">
            An interactive learning project from{" "}
            <Link to="https://thinkster.io">Thinkster</Link>. Code &amp;
            design licensed under MIT.
          </span>
        </div>
      </footer>
    );
}