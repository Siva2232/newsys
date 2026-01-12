import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <section className="py-32 bg-slate-950 text-center">
      <Container>
        <h1 className="text-6xl font-bold text-cyan-400">404</h1>
        <p className="mt-4 text-slate-400">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <div className="mt-8">
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
