import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="ms-auto text-center">
      <ul className="ms-auto nav nav-pills  mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a className="nav-link active" onClick={() => navigate("/login")}>
            Login
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="tab-register"
            data-bs-toggle="pill"
            onClick={() => navigate("/signup")}
            role="tab"
            aria-controls="pills-register"
            aria-selected="true"
          >
            Register
          </a>
        </li>
      </ul>
    </div>
  );
}
