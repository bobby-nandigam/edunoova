import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const links = {
  Platform: ["About", "Courses", "Learning Paths", "Pricing", "Blog"],
  Resources: ["Documentation", "Community", "Career Guide", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Refund Policy"],
};

const Footer = () => (
  <footer className="bg-card border-t border-border py-16">
    <div className="container mx-auto px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-2">
          <span className="font-display text-xl font-bold gradient-text">EduNova</span>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
            AI-powered learning platform for coding and new technologies. From beginners to career-ready engineers.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="font-display font-semibold text-sm mb-4">{title}</h4>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} EduNova. All rights reserved. An <span className="font-semibold text-foreground">Aureon</span> Product.
      </div>
    </div>
  </footer>
);

export default Footer;
