import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const links = {
  Platform: ["About", "Courses", "Learning Paths", "Pricing", "Blog"],
  Resources: ["Documentation", "Community", "Career Guide", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Refund Policy"],
};

const Footer = () => (
  <footer className="bg-primary text-primary-foreground py-16">
    <div className="container mx-auto px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-2">
          <span className="font-display text-2xl italic">Eduva</span>
          <p className="text-sm text-primary-foreground/50 mt-1 mb-3">Learn Today. Lead Tomorrow.</p>
          <p className="text-sm text-primary-foreground/40 max-w-xs leading-relaxed">
            AI-powered Computer Science learning for every age and level. From curious kids to career-ready engineers.
          </p>
          <div className="flex gap-3 mt-5">
            {[Twitter, Linkedin, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/50 hover:text-primary-foreground transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="font-semibold text-sm mb-4 text-primary-foreground/80">{title}</h4>
            <ul className="space-y-2.5">
              {items.map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/30">
        <span>© {new Date().getFullYear()} Eduva. All rights reserved.</span>
        <span>an <strong className="text-primary-foreground/50">Aureon</strong> Product</span>
      </div>
    </div>
  </footer>
);

export default Footer;
