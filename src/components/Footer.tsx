import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Politics", path: "/category/politics" },
  { name: "Business", path: "/category/business" },
  { name: "Technology", path: "/category/technology" },
  { name: "Sports", path: "/category/sports" },
  { name: "Entertainment", path: "/category/entertainment" },
  { name: "Health", path: "/category/health" },
];

const companyLinks = [
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Careers", path: "/careers" },
  { name: "Advertise", path: "/advertise" },
  { name: "Privacy Policy", path: "/privacy" },
  { name: "Terms of Service", path: "/terms" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, url: "https://instagram.com" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
  { name: "YouTube", icon: Youtube, url: "https://youtube.com" },
];

export function Footer() {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // This would handle the footer subscription
    console.log("Footer subscription submitted");
  };

  return (
    <footer className="bg-news-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and subscription */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">Voice Gazette</span>
            </Link>
            <p className="text-white/80 mb-4 text-sm">
              Your intelligent news platform delivering personalized, comprehensive reporting 
              across politics, business, technology, sports, and entertainment.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  required
                />
                <Button type="submit" className="bg-news-crimson hover:bg-news-crimson/90">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.path}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-3 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="text-white/70 text-sm">
              Download our mobile app:
            </p>
            <div className="flex space-x-2 mt-2">
              <a href="#" className="bg-white/10 px-3 py-1 rounded text-xs hover:bg-white/20">
                App Store
              </a>
              <a href="#" className="bg-white/10 px-3 py-1 rounded text-xs hover:bg-white/20">
                Google Play
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} Voice Gazette. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
