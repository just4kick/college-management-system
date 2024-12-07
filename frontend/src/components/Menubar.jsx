import React from "react";

const Menubar = () => {
  return (
    <nav className="bg-background shadow">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <ul className="flex items-center gap-6">
          <li>
            <a
              href="/"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/departments"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Departments
            </a>
          </li>
          <li>
            <a
              href="/team"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Team
            </a>
          </li>
          <li>
            <a
              href="/gallery"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Gallery
            </a>
          </li>
        </ul>
        <ul className="flex items-center gap-4">
          <li>
            <a
              href="/login"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="/signup"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menubar;
