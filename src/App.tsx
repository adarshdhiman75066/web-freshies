import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
// Material UI Icons
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InventoryIcon from "@mui/icons-material/Inventory";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PaletteIcon from "@mui/icons-material/Palette";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import MenuIcon from "@mui/icons-material/Menu";

import bikano from "./image/bikano.jpeg";
import brown from "./image/brown.png";
import chilli from "./image/chilli.png";
import header from "./image/header.png";
import img8257 from "./image/IMG_8257.HEIC";
import logo from "./image/logo.png";
import logoblac from "./image/logoblac.png";
import logoblack from "./image/logoblack.png";
import oregano from "./image/oregano.png";
import veerji from "./image/veerji_malai.png";
import whatsapp from "./image/whatsap_image.jpg";
import white from "./image/white.png";

const PRODUCTS = [
  {
    id: 1,
    name: "Mouth Freshener Sachets",
    description:
      "Premium quality mouth freshener for a refreshing end to every meal.",
    image: veerji,
  },
  {
    id: 2,
    name: "Mishri Prasad Sachets",
    description:
      "Traditional sweet mishri sachets, perfect for religious or hospitality use.",
    image: whatsapp,
  },
  {
    id: 3,
    name: "Sugar Sachets",
    description:
      "Fine granulated white sugar in easy-to-use customized sachets.",
    image: white,
  },
  {
    id: 4,
    name: "Brown Sugar Sachets",
    description:
      "Natural brown sugar sachets for health-conscious cafes and restaurants.",
    image: brown,
  },
  {
    id: 5,
    name: "Oregano Sachets",
    description: "Aromatic dried oregano flakes for pizzas, pastas, and more.",
    image: oregano,
  },
  {
    id: 6,
    name: "Chilli Flakes Sachets",
    description:
      "Spicy and bold chilli flakes to add that extra kick to your brand's dishes.",
    image: chilli,
  },
];

const CONTACT_NUMBER = "+918221960806";
const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${CONTACT_NUMBER.replace(/\D/g, "")}`;

export default function App() {
  const [view, setView] = useState<"home" | "about" | "contact">("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[0] | null
  >(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Unified Google Form submission handler
  const handleEnquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formElements = new FormData(e.currentTarget);
    const googleFormData = new FormData();

    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSeDZXcKyBFSQFHKic7tE_4x0J52aw49HZ5z7ZlB44ENT1n4Gw/formResponse";

    googleFormData.append(
      "entry.1074257924",
      formElements.get("name") as string,
    );
    googleFormData.append(
      "entry.1646318118",
      formElements.get("email") as string,
    );
    googleFormData.append(
      "entry.1331027807",
      formElements.get("phone") as string,
    );
    googleFormData.append(
      "entry.825700665",
      formElements.get("business") as string,
    );

    const productName = selectedProduct
      ? `[Enquiry for: ${selectedProduct.name}]\n`
      : "";
    const userMessage = formElements.get("details") as string;
    googleFormData.append("entry.2020094077", productName + userMessage);

    try {
      await fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: googleFormData,
      });

      setIsSubmitted(true);
      e.currentTarget.reset();

      setTimeout(() => {
        setIsSubmitted(false);
        setSelectedProduct(null);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a problem sending your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper for clean navigation
  const navigateTo = (newView: "home" | "about" | "contact") => {
    setView(newView);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToProducts = () => {
    setView("home");
    setIsMenuOpen(false);
    // Timeout allows DOM to render 'home' view before scrolling if coming from another page
    setTimeout(() => {
      const element = document.getElementById("products");
      if (element) {
        const yOffset = -80; // Offset for sticky navbar
        const y =
          element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const CTAButtons = ({ className = "" }: { className?: string }) => (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      <button
        onClick={scrollToProducts}
        className="bg-brand-red text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2 shadow-xl shadow-brand-red/20"
      >
        Start Custom Order
      </button>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white md:bg-brand-black text-brand-black md:text-white border border-brand-black md:border-none px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all flex items-center gap-2 shadow-sm"
      >
        <WhatsAppIcon style={{ fontSize: 18 }} />
        WhatsApp Now
      </a>
      <button
        onClick={() => navigateTo("contact")}
        className="bg-brand-black md:bg-white border border-brand-black text-white md:text-brand-black px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all flex items-center gap-2 shadow-sm"
      >
        <PhoneIcon style={{ fontSize: 18 }} />
        Contact Us
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-brand-black border-b-4 border-brand-black md:border-b md:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center hover:opacity-80 transition-opacity relative z-10"
            >
              <img
                src={logo}
                alt="Freashies Logo"
                className="h-20 md:h-32 w-auto object-contain invert scale-125"
              />
            </button>
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigateTo("home")}
                className={`text-sm font-bold transition-colors ${view === "home" ? "text-brand-red" : "text-white/80 hover:text-white"}`}
              >
                Home
              </button>
              <button
                onClick={scrollToProducts}
                className={`text-sm font-bold transition-colors text-white/80 hover:text-white`}
              >
                Products
              </button>
              <button
                onClick={() => navigateTo("about")}
                className={`text-sm font-bold transition-colors ${view === "about" ? "text-brand-red underline underline-offset-4" : "text-white/80 hover:text-white"}`}
              >
                About Us
              </button>
              <button
                onClick={() => navigateTo("contact")}
                className={`text-sm font-bold transition-colors ${view === "contact" ? "text-brand-red underline underline-offset-4" : "text-white/80 hover:text-white"}`}
              >
                Contact Us
              </button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-brand-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-brand-red hover:text-white transition-all flex items-center gap-2"
              >
                <WhatsAppIcon style={{ fontSize: 16 }} />
                WhatsApp Now
              </a>
            </div>

            {/* Mobile Menu Quick Actions */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => navigateTo("about")}
                className="text-white/80 hover:text-white p-1"
              >
                <InfoIcon style={{ fontSize: 22 }} />
              </button>
              <button
                onClick={() => navigateTo("contact")}
                className="text-white/80 hover:text-white p-1"
              >
                <PhoneIcon style={{ fontSize: 22 }} />
              </button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-brand-red hover:scale-110 transition-transform"
              >
                <WhatsAppIcon style={{ fontSize: 24 }} />
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-1 ml-1"
              >
                {isMenuOpen ? (
                  <CloseIcon style={{ fontSize: 26 }} />
                ) : (
                  <MenuIcon style={{ fontSize: 26 }} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="md:hidden fixed inset-0 bg-black/60 z-40 top-14"
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="md:hidden fixed right-0 bottom-0 top-14 w-72 bg-brand-black z-50 border-l border-white/10 shadow-2xl overflow-y-auto"
              >
                <div className="flex flex-col p-6 gap-6">
                  <button
                    onClick={() => navigateTo("home")}
                    className={`text-left text-xl font-bold flex items-center gap-3 ${view === "home" ? "text-brand-red" : "text-white"}`}
                  >
                    <ChevronRightIcon
                      style={{ fontSize: 20 }}
                      className={view === "home" ? "opacity-100" : "opacity-0"}
                    />
                    Home
                  </button>
                  <button
                    onClick={scrollToProducts}
                    className="text-left text-xl font-bold text-white flex items-center gap-3"
                  >
                    <ChevronRightIcon
                      style={{ fontSize: 20 }}
                      className="opacity-0"
                    />
                    Products
                  </button>
                  <button
                    onClick={() => navigateTo("about")}
                    className={`text-left text-xl font-bold flex items-center gap-3 ${view === "about" ? "text-brand-red" : "text-white"}`}
                  >
                    <ChevronRightIcon
                      style={{ fontSize: 20 }}
                      className={view === "about" ? "opacity-100" : "opacity-0"}
                    />
                    About Us
                  </button>
                  <button
                    onClick={() => navigateTo("contact")}
                    className={`text-left text-xl font-bold flex items-center gap-3 ${view === "contact" ? "text-brand-red" : "text-white"}`}
                  >
                    <ChevronRightIcon
                      style={{ fontSize: 20 }}
                      className={
                        view === "contact" ? "opacity-100" : "opacity-0"
                      }
                    />
                    Contact Us
                  </button>

                  <div className="h-px bg-white/10 my-2" />

                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-red text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2 shadow-lg shadow-brand-red/20"
                  >
                    <WhatsAppIcon style={{ fontSize: 20 }} />
                    WhatsApp Now
                  </a>
                  <a
                    href={`tel:${CONTACT_NUMBER}`}
                    className="bg-white/10 text-white p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2 border border-white/10"
                  >
                    <PhoneIcon style={{ fontSize: 20 }} />
                    Call Us
                  </a>

                  <div className="mt-auto pt-10 text-center">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
                      Yamunanagar, Haryana
                    </p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero Section */}
              <section className="pt-0 pb-10 px-0 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden bg-white">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-full mb-0 relative">
                    <div
                      className="w-full overflow-hidden"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 95%)",
                      }}
                    >
                      <img
                        src={bikano}
                        alt="Customized Sachets Mobile"
                        className="w-full h-auto object-cover md:hidden"
                      />
                      <img
                        src={header}
                        alt="Customized Sachets Desktop"
                        className="hidden md:block w-full max-h-[600px] object-cover"
                      />
                    </div>
                  </div>

                  <div className="px-4 w-full flex flex-col items-center mt-[-60px] md:mt-[-120px] relative z-10">
                    <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-2 uppercase relative">
                      Customized Sachet's{" "}
                      <span className="text-brand-red">for Your Brand</span>
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 mb-6 font-bold uppercase tracking-wide">
                      Your Logo on Every Sachet | Low M.O.Q. Available
                    </p>
                    <CTAButtons />
                  </div>
                </motion.div>
              </section>

              {/* Product Grid */}
              <section
                id="products"
                className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedProduct(product)}
                      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                      <div className="aspect-square overflow-hidden bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          <span className="bg-brand-red text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">
                            Low M.O.Q. Available
                          </span>
                          <span className="bg-white/90 backdrop-blur text-brand-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-gray-200 shadow-sm">
                            Fully Customizable
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              <PaletteIcon
                                style={{ fontSize: 14 }}
                                className="text-brand-red"
                              />
                              Your Logo
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                              <VerifiedUserIcon
                                style={{ fontSize: 14 }}
                                className="text-brand-red"
                              />
                              Your Design
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <a
                              href={`tel:${CONTACT_NUMBER}`}
                              onClick={(e) => e.stopPropagation()}
                              className="bg-brand-red text-white text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-brand-black transition-colors flex items-center justify-center gap-1.5"
                            >
                              <PhoneIcon style={{ fontSize: 12 }} />
                              Call Now
                            </a>
                            <button className="bg-brand-black text-white text-[10px] font-bold px-3 py-1.5 rounded-lg group-hover:bg-brand-red transition-colors">
                              Request Quote
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Mid-Page CTA */}
              <section className="py-12 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <h2 className="text-2xl font-bold mb-6">
                    Ready to Customize Your Table Essentials?
                  </h2>
                  <CTAButtons />
                </div>
              </section>

              {/* Home Page Enquiry Form */}
              <section id="enquiry" className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold mb-4 uppercase">
                      Send us an Enquiry
                    </h2>
                    <p className="text-gray-600 font-medium">
                      Have a specific requirement? Fill out the form below and
                      we'll get back to you.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm">
                    {isSubmitted && !selectedProduct ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center"
                      >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <VerifiedUserIcon style={{ fontSize: 36 }} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">
                          Enquiry Sent!
                        </h4>
                        <p className="text-gray-500">
                          We'll get back to you shortly with a custom quote.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleEnquiry} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-2">
                              Full Name
                            </label>
                            <input
                              required
                              name="name"
                              type="text"
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                              placeholder="Enter your name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-2">
                              Email Address
                            </label>
                            <input
                              required
                              name="email"
                              type="email"
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-2">
                              Phone Number
                            </label>
                            <input
                              required
                              name="phone"
                              type="tel"
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                              placeholder="+91 00000 00000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-2">
                              Restaurant/Business Name
                            </label>
                            <input
                              required
                              name="business"
                              type="text"
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                              placeholder="Your business name"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-2">
                            Requirement Details
                          </label>
                          <textarea
                            required
                            name="details"
                            rows={4}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black resize-none"
                            placeholder="Tell us about the products you need, quantity, and customization requirements..."
                          />
                        </div>
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-black transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-brand-red/20"
                        >
                          {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <SendIcon style={{ fontSize: 20 }} />
                              Submit Enquiry
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </section>

              {/* Quick Features */}
              <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                        <PaletteIcon className="text-brand-red" />
                      </div>
                      <h4 className="font-bold text-lg mb-2">
                        100% Customized
                      </h4>
                      <p className="text-sm text-gray-500">
                        We print your logo and brand colors on every sachet.
                      </p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                        <InventoryIcon className="text-brand-red" />
                      </div>
                      <h4 className="font-bold text-lg mb-2">Low M.O.Q.</h4>
                      <p className="text-sm text-gray-500">
                        We manufacture in very low minimum order quantities for
                        brands of all sizes.
                      </p>
                    </div>
                    <div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                        <LocationOnIcon className="text-brand-red" />
                      </div>
                      <h4 className="font-bold text-lg mb-2">
                        Pan India Delivery
                      </h4>
                      <p className="text-sm text-gray-500">
                        Based in Yamunanagar, Haryana. Supplying across India.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                Built for Restaurant Branding
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  <span className="font-bold text-brand-red">Freashies</span>{" "}
                  specializes in customized table essentials designed for
                  restaurants, cafes, and food chains. We focus on turning
                  everyday items like mouth fresheners, sugar sachets, and
                  seasoning packets into powerful branding tools.
                </p>
                <p>
                  Every product we deliver is tailored to your brand — from logo
                  to design — ensuring a premium and consistent customer
                  experience.
                </p>
                <p className="font-medium text-brand-black">
                  We work with businesses that value quality, hygiene, and
                  strong brand presence.
                </p>
              </div>
              <div className="mt-12 text-center">
                <CTAButtons />
              </div>
            </motion.div>
          )}

          {view === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Contact Us
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                  <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-red/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <PhoneIcon
                          className="text-brand-red"
                          style={{ fontSize: 20 }}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
                          Phone
                        </p>
                        <a
                          href={`tel:${CONTACT_NUMBER}`}
                          className="text-xl font-bold hover:text-brand-red transition-colors"
                        >
                          +91 8221960806
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <WhatsAppIcon
                          className="text-[#25D366]"
                          style={{ fontSize: 22 }}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
                          WhatsApp
                        </p>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-bold hover:text-[#25D366] transition-colors"
                        >
                          +91 8221960806
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-brand-black/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <LocationOnIcon
                          className="text-brand-black"
                          style={{ fontSize: 22 }}
                        />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">
                          Address
                        </p>
                        <p className="text-xl font-bold">
                          Yamunanagar, Haryana
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-black text-white p-8 rounded-3xl flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 uppercase">
                    Low M.O.Q. Available
                  </h3>
                  <p className="text-gray-400 mb-8">
                    We manufacture in very low M.O.Q. and supply for restaurants
                    and food chains across India. Contact us for custom quotes
                    and design mockups.
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-red text-white py-4 rounded-xl font-bold text-center hover:scale-105 transition-transform"
                  >
                    Message on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enquiry Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
                className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                  <CloseIcon style={{ fontSize: 24 }} />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 md:hidden">
                      <h3 className="text-white font-bold text-xl">
                        {selectedProduct.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 p-6 sm:p-8">
                    <div className="hidden md:block mb-6">
                      <p className="text-brand-red text-xs font-bold uppercase tracking-widest mb-1">
                        Product Enquiry
                      </p>
                      <h3 className="text-2xl font-bold text-brand-black">
                        {selectedProduct.name}
                      </h3>
                    </div>

                    {isSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center"
                      >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <VerifiedUserIcon style={{ fontSize: 36 }} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">
                          Enquiry Sent!
                        </h4>
                        <p className="text-gray-500">
                          We'll get back to you shortly with a custom quote.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleEnquiry} className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Full Name
                          </label>
                          <input
                            required
                            name="name"
                            type="text"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Email Address
                          </label>
                          <input
                            required
                            name="email"
                            type="email"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-1.5">
                              Phone Number
                            </label>
                            <input
                              required
                              name="phone"
                              type="tel"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                              placeholder="+91 00000 00000"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-1.5">
                              Business Name
                            </label>
                            <input
                              required
                              name="business"
                              type="text"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black"
                              placeholder="The Grand Cafe"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-brand-black uppercase tracking-wider mb-1.5">
                            Requirement Details
                          </label>
                          <textarea
                            required
                            name="details"
                            rows={3}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-base text-brand-black resize-none"
                            placeholder="Quantity, specific requirements, etc."
                          />
                        </div>
                        <div className="flex flex-col gap-3 mt-2">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-brand-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-red transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <SendIcon style={{ fontSize: 18 }} />
                                Request Quote
                              </>
                            )}
                          </button>
                          <a
                            href={`tel:${CONTACT_NUMBER}`}
                            className="w-full bg-brand-red text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-black transition-all"
                          >
                            <PhoneIcon style={{ fontSize: 18 }} />
                            Call Now
                          </a>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Bottom Contact Section */}
        <section
          id="contact"
          className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-100"
        >
          <div className="bg-brand-black rounded-3xl p-8 md:p-16 text-white flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Ready to elevate your brand?
              </h2>
              <p className="text-gray-400 text-lg">
                Contact us today for custom quotes and design mockups.
              </p>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a
                href={`tel:${CONTACT_NUMBER}`}
                className="flex items-center justify-center gap-3 bg-white text-brand-black px-8 py-4 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors"
              >
                <PhoneIcon style={{ fontSize: 26 }} />
                +91 8221960806
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-xl hover:opacity-90 transition-opacity"
              >
                <WhatsAppIcon style={{ fontSize: 26 }} />
                WhatsApp Now
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-16 bg-brand-black text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <button
                onClick={() => navigateTo("home")}
                className="flex items-center hover:opacity-80 transition-opacity"
              >
                <span className="text-3xl font-premium italic font-bold tracking-wide text-white">
                  Freashies
                </span>
              </button>
              <p className="text-gray-400 leading-relaxed">
                Elevating the dining experience across India with premium,
                customized table essentials. Quality, hygiene, and branding in
                every sachet.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={() => navigateTo("home")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={scrollToProducts}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Our Products
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("contact")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    For Restaurants
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("about")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">
                Products
              </h4>
              <ul className="space-y-4 text-gray-400">
                {PRODUCTS.slice(0, 4).map((p) => (
                  <li
                    key={p.id}
                    className="cursor-pointer hover:text-white transition-colors"
                    onClick={() => setSelectedProduct(p)}
                  >
                    {p.name}
                  </li>
                ))}
                <li
                  className="cursor-pointer hover:text-white transition-colors"
                  onClick={scrollToProducts}
                >
                  & More...
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400">
                  <PhoneIcon
                    style={{ fontSize: 20 }}
                    className="text-brand-red shrink-0 mt-1"
                  />
                  <a
                    href={`tel:${CONTACT_NUMBER}`}
                    className="hover:text-white transition-colors"
                  >
                    {CONTACT_NUMBER}
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <WhatsAppIcon
                    style={{ fontSize: 22 }}
                    className="text-brand-red shrink-0 mt-1"
                  />
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp Us
                  </a>
                </li>
                <li className="flex items-start gap-3 text-gray-400">
                  <LocationOnIcon
                    style={{ fontSize: 22 }}
                    className="text-brand-red shrink-0 mt-1"
                  />
                  <span>Yamunanagar, Haryana</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
            <p>© 2026 Freashies. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 z-50 flex flex-col items-end group">
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="bg-white text-brand-black px-3 py-1.5 rounded-xl shadow-2xl border border-gray-100 text-xs font-bold whitespace-nowrap mb-2 relative animate-bounce-slow"
        >
          Chat with us!
          <div className="absolute -bottom-1 right-5 w-2.5 h-2.5 bg-white border-r border-b border-gray-100 rotate-45"></div>
        </motion.div>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-3 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center relative"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon style={{ fontSize: 32 }} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-brand-red rounded-full border-2 border-white animate-pulse"></span>
        </a>
      </div>
    </div>
  );
}
