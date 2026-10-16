import DiscoverOpportunityModal from "../DiscoverOpportunityModal.jsx";
import PrivacyPolicyModal from "../PrivacyPolicyModal.jsx";
import RefundReturnPolicyModal from "../ReturnRefundPolicyModal.jsx";
import ShippingPolicyModal from "../ShippingPolicyModal.jsx";
import TermsConditionsModal from "../TermsConditionsModal.jsx";
import VisionMissionModal from "../VissionMissionModal.jsx";
import UserLoginPage from "./UserLoginPage.jsx";

import BusinessLoginPage from "./BusinessLoginPage.jsx";


import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  CanvasTexture,
  DoubleSide,
  SRGBColorSpace,
} from "three"; 

import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import {
  PresentationControls,
  useTexture,
} from "@react-three/drei";

import {
  AnimatePresence,
  MotionConfig,
  motion,
} from "framer-motion";

import {
  Activity,
  ArrowRight,
  Award,
  ChevronDown,
  ChevronRight,
  Facebook,
  Heart,
  Instagram,
  Leaf,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  Play,
  Search,
  ShieldCheck,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Twitter,
  User,
  Users,
  X,
  Youtube,
} from "lucide-react";


/* ============================================================
   DESIGN SYSTEM
============================================================ */

const COLORS = {
  primary: "#059669",
  secondary: "#0f766e",
  accent: "#a7f3d0",
  dark: "#0f172a",
  light: "#f8fafc",
  gold: "#fbbf24",
};


/* ============================================================
   NAVIGATION
============================================================ */

const NAV_LINKS = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "Shop",
    href: "#shop",
  },
];


/* ============================================================
   TRUST FEATURES
============================================================ */

const TRUST_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Quality Focus",
    desc: "एक प्रीमियम प्रस्तुति, जो उत्पादों की जानकारी, गुणवत्ता और जिम्मेदार संचार पर आधारित है।",
  },
  {
    icon: Users,
    title: "Wellness Community",
    desc: "ग्राहकों, स्वास्थ्य एवं वेलनेस के प्रति उत्साही लोगों और साझेदारों को जोड़ने के लिए डिज़ाइन किया गया एक डिजिटल अनुभव।",
  },
  {
    icon: Award,
    title: "Brand Ecosystem",
    desc: "उत्पादों, ज्ञानवर्धक सामग्री, पार्टनर संसाधनों और जीवनशैली की खोज के लिए एक एकीकृत प्लेटफ़ॉर्म।",
  },
  {
    icon: Activity,
    title: "Training & Support",
    desc: "सुव्यवस्थित स्थानों के माध्यम से आधिकारिक प्रशिक्षण, सहायता और पार्टनर संसाधनों से जुड़ने की सुविधा।",
  },
];


/* ============================================================
   CATEGORIES
============================================================ */
/* ============================================================
   OFFICIAL PRODUCT CATALOGUE
   Scope:
   Premium Nutrition
   Targeted Nutrition
   Energy & Fitness
   Kids Nutrition
   Accessories
   Milk Powder

   Product names + MRP are based on 's official
   catalogue pages checked on 24 Sep 2026.

   No fake ratings/reviews are used here.
============================================================ */
const CATEGORIES = [
  {
    name: "Premium Nutrition",
    desc: "Explore premium nutrition products.",
    imgColor: "from-rose-400 to-pink-700",
  },
  {
    name: "Targeted Nutrition",
    desc: "Explore products within the targeted nutrition range.",
    imgColor: "from-emerald-400 to-teal-700",
  },
  {
    name: "Energy & Fitness",
    desc: "Discover products for an active lifestyle.",
    imgColor: "from-amber-400 to-orange-700",
  },
  {
    name: "Kids Nutrition",
    desc: "Explore the dedicated children's nutrition range.",
    imgColor: "from-orange-400 to-rose-600",
  },
];

const CATEGORY_VISUALS = {
  "PREMIUM NUTRITION SHAKE": {
    color: "#e11d48",
    accent: "#9f1239",
  },

  "TARGETED NUTRITION": {
    color: "#059669",
    accent: "#065f46",
  },

  "ENERGY & FITNESS": {
    color: "#eab308",
    accent: "#854d0e",
  },

  "KIDS NUTRITION": {
    color: "#f97316",
    accent: "#9a3412",
  },

  "ACCESSORIES": {
    color: "#64748b",
    accent: "#334155",
  },

  "MILK POWDER": {
    color: "#0ea5e9",
    accent: "#075985",
  },
};

const makeProduct = (data) => {
  const visual =
    CATEGORY_VISUALS[data.category] ||
    CATEGORY_VISUALS["TARGETED NUTRITION"];

  return {
    ...data,

    price: data.mrp,

    color: visual.color,
    accent: visual.accent,

    shortDescription:
      data.shortDescription || "",

    description:
      data.description || "",

    highlights:
      data.highlights || [],

    ingredients:
      data.ingredients || [],

    /*
      Optional product video.

      When video exists:
      → Product Detail shows video.

      When video is empty:
      → Product Detail shows image.
    */
    video:
      data.video || "",
  };
};


const PRODUCTS = [

  /* ==========================================================
     PREMIUM NUTRITION
  ========================================================== */
makeProduct({
  id: "skin-booster",
  name: "SKIN BOOSTER 200g",
  category: "TARGETED NUTRITION",
  mrp: "₹2,499",
  packSize: "200 g",

  image:
    "https://mayleennutricare.com/spaces/products/515749a5-0652-44a4-a764-10807c059254.jpg",

  video:
    "/videos/skin-booster.mp4",
}),

  makeProduct({
  id: "premium-strawberry",
  name: "PREMIUM NUTRITION SHAKE MIX STRAWBERRY FLAVOUR",
  category: "PREMIUM NUTRITION SHAKE",
  mrp: "₹2,090",
  packSize: "500 g",
 image:"https://mayleennutricare.com/spaces/products/d1f946b5-5f90-49da-9ce3-f299f3b0d4a9.jpg",
  video:
    "/videos/shakemix-strawberry.mp4",
}),

  makeProduct({
  id: "premium-rasmalai",
  name: "PREMIUM NUTRITION SHAKE MIX DELIGHTFUL RASMALAI FLAVOUR 500g",
  category: "PREMIUM NUTRITION SHAKE",
  mrp: "₹2,140",
  packSize: "500 g",
  image:"https://mayleennutricare.com/spaces/products/70dd95a1-c559-426f-a75a-822c367eeecb.jpg",

  video:
    "/videos/shakemix-rasmalai.mp4",
}),

makeProduct({
  id: "premium-vanilla",
  name: "PREMIUM NUTRITION SHAKE MIX EXOTIC VANILLA FLAVOUR 500g",
  category: "PREMIUM NUTRITION SHAKE",
  mrp: "₹2,090",
  packSize: "500 g",
  image:"https://mayleennutricare.com/spaces/products/d0d6ff20-4b93-49fb-b828-9f73903b74b3.jpg",

  video:
    "/videos/shakemix-vanilla.mp4",
}),

makeProduct({
  id: "premium-mango",
  name: "PREMIUM NUTRITION SHAKE MIX DELIGHT MANGO FLAVOUR 500g",
  category: "PREMIUM NUTRITION SHAKE",
  mrp: "₹2,090",
  packSize: "500 g",
  image:"https://mayleennutricare.com/spaces/products/482ec653-7f55-4a08-814a-605a0779503f.jpg",

  video:
    "/videos/shakemix-mango.mp4",
}),

 makeProduct({
  id: "premium-kesar",
  name: "PREMIUM NUTRITION SHAKE MIX KESAR KULFI FLAVOUR 500g",
  category: "PREMIUM NUTRITION SHAKE",
  mrp: "₹2,090",
  packSize: "500 g",
  image:"https://mayleennutricare.com/spaces/products/1e33a4b2-461e-4764-935d-bf3824856cd3.jpg",

  video:
    "/videos/shakemix-kulfi.mp4",
}),

 makeProduct({
  id: "premium-chocolate",
  name: "PREMIUM NUTRITION SHAKE MIX DELICIOUS CHOCOLATE FLAVOUR 500g",
  category: "PREMIUM NUTRITION SHAKE",
  mrp: "₹2,090",
  packSize: "500 g",
  image:"https://mayleennutricare.com/spaces/products/68c554d8-e7e1-417a-8a81-3f09a6baabac.jpg",

  video:
    "/videos/shakemix-chocolate.mp4",
}),


  /* ==========================================================
     TARGETED NUTRITION
  ========================================================== */

  makeProduct({
    id: "calcium-pro",
    name: "CALCIUM PRO+ 60 TABS",
    category: "TARGETED NUTRITION",
    mrp: "₹1,222",
    packSize: "60 tablets",

    image:
      "https://mayleennutricare.com/spaces/products/37b3149d-4dbf-455b-ab7b-7f65a0fbbcb6.jpg",
  }),

  makeProduct({
    id: "male-support",
    name: "MALE SUPPORT + 60 TABS",
    category: "TARGETED NUTRITION",
    mrp: "₹2,040",
    packSize: "60 tablets",

    image:"https://mayleennutricare.com/spaces/products/e8e9ef89-748f-4034-a1e5-057e07892190.jpg"
  }),

  makeProduct({
    id: "women-support",
    name: "WOMEN SUPPORT + 60 TABS",
    category: "TARGETED NUTRITION",
    mrp: "₹2,100",
    packSize: "60 tablets",

    image:"https://mayleennutricare.com/spaces/products/c3e17304-8e6d-4156-9195-7e88dc055b4b.jpg"
  }),

  makeProduct({
    id: "liver-health",
    name: "LIVER HEALTH SUPPLEMENT 60 TABLETS",
    category: "TARGETED NUTRITION",
    mrp: "₹2,700",
    packSize: "60 tablets",

    image:"https://mayleennutricare.com/spaces/products/6b5540a3-4499-4eb9-aed6-2d7012dc3fdf.jpg"
  }),

  makeProduct({
    id: "joint-health",
    name: "JOINT HEALTH 60 VEG CAPSULES",
    category: "TARGETED NUTRITION",
    mrp: "₹2,350",
    packSize: "60 veg capsules",

    image:"https://mayleennutricare.com/spaces/products/e59ade71-f3e9-4f84-8a10-d536ca8316af.jpg"
  }),

  makeProduct({
    id: "omega-3",
    name: "OMEGA-3 FISH OIL 60 Softgel Capsules",
    category: "TARGETED NUTRITION",
    mrp: "₹2,550",
    packSize: "60 softgel capsules",

    image:"https://mayleennutricare.com/spaces/products/6b5540a3-4499-4eb9-aed6-2d7012dc3fdf.jpg"
  }),

  makeProduct({
    id: "multivitamin",
    name: " MULTIVITAMIN AND MINERAL SUPPLEMENT 60 Tablets",
    category: "TARGETED NUTRITION",
    mrp: "₹1,980",
    packSize: "60 tablets",

    image:"https://mayleennutricare.com/spaces/products/3e8ce456-a263-4a70-9f0c-7e937cc57d5b.jpg"
  }),

  makeProduct({
    id: "garcinia",
    name: "GARCINIA LEAN SUPPLEMENT 60 Tablets",
    category: "TARGETED NUTRITION",
    mrp: "₹1,980",
    packSize: "60 tablets",

    image:"https://mayleennutricare.com/spaces/products/d7d87bad-0bb5-48ca-a01a-41ada3b2b326.jpg"
  }),


  /* ==========================================================
     ENERGY & FITNESS
  ========================================================== */

  makeProduct({
    id: "energy-kashmiri",
    name: "ENERGYUP REFRESHING DRINK MIX KASHMIRI KAHWA WITH HONEY FLAVOUR 40g",
    category: "ENERGY & FITNESS",
    mrp: "₹790",
    packSize: "40 g",
  

    video:
  "/videos/energy-kashmiri-kahwah.mp4",
  image:"https://mayleennutricare.com/spaces/products/a839c0cc-07fa-4f7f-920e-aaa55006a92c.jpg"
  }),

  makeProduct({
    id: "energy-tulsimint",
    name: "ENERGYUP REFRESHING DRINK MIX TULSIMINT FLAVOUR 50g",
    category: "ENERGY & FITNESS",
    mrp: "₹890",
    packSize: "50 g",
video:
  "/videos/energy-mint.mp4",
  image:"https://mayleennutricare.com/spaces/products/634454b6-8f49-4708-bafe-31cb3441a005.jpg"
  }),

  makeProduct({
    id: "energy-peach",
    name: "ENERGYUP REFRESHING DRINK MIX PEACH FLAVOUR 50g",
    category: "ENERGY & FITNESS",
    mrp: "₹790",
    packSize: "50 g",

    video:
  "/videos/energy-peach.mp4",
  image:"https://mayleennutricare.com/spaces/products/8b9ec54c-93e8-40ec-b54d-62b9c5b137f7.jpg"
  }),

  makeProduct({
    id: "energy-ginger",
    name: "ENERGYUP REFRESHING DRINK MIX GINGER FLAVOUR 50g",
    category: "ENERGY & FITNESS",
    mrp: "₹790",
    packSize: "50 g",

    video:
  "/videos/energy-ginger.mp4",
  image:"https://mayleennutricare.com/spaces/products/2d5a3bb1-f793-428b-94c4-9afdd7622c6b.jpg"
  }),

  makeProduct({
    id: "energy-elaichi",
    name: "ENERGYUP REFRESHING DRINK MIX ELAICHI FLAVOUR 50g",
    category: "ENERGY & FITNESS",
    mrp: "₹790",
    packSize: "50 g",

    video:
  "/videos/energy-elaichi.mp4",
  image:"https://mayleennutricare.com/spaces/products/9380b7dc-2a89-40c6-80e9-31dc65786af8.jpg"
  }),

  makeProduct({
    id: "energy-lemon",
    name: "ENERGYUP REFRESHING DRINK MIX LEMON FLAVOUR 50g",
    category: "ENERGY & FITNESS",
    mrp: "₹790",
    packSize: "50 g",

    image:
      "https://mayleennutricare.com/spaces/products/a279b313-f482-46a6-b44d-dd71d0414d7c.jpg",
  }),


  /* ==========================================================
     KIDS NUTRITION
  ========================================================== */

  makeProduct({
    id: "kids-nutrition",
    name: "PREMIUM CHILDREN NUTRITION DRINK MIX 200g",
    category: "KIDS NUTRITION",
    mrp: "₹1,090",
    packSize: "200 g",

    image:
      "https://mayleennutricare.com/spaces/products/64c576fa-51a6-4a8f-9101-d972b2bfb9ac.jpg",
  }),


  /* ==========================================================
     ACCESSORIES
     
     The official catalogue currently shows these accessory
     entries as 0.00. We do NOT display them as "Free".
  ========================================================== */

  makeProduct({
    id: "accessory-bag",
    name: "BAG",
    category: "ACCESSORIES",
    mrp: "MRP not listed",
    packSize: "Accessory",
  }),

  makeProduct({
    id: "accessory-mug",
    name: "MUG",
    category: "ACCESSORIES",
    mrp: "MRP not listed",
    packSize: "Accessory",
  }),

  makeProduct({
    id: "accessory-diary",
    name: "Diary",
    category: "ACCESSORIES",
    mrp: "MRP not listed",
    packSize: "Accessory",
  }),

  makeProduct({
    id: "accessory-tablet-box",
    name: "Tablet Box",
    category: "ACCESSORIES",
    mrp: "MRP not listed",
    packSize: "Accessory",
  }),

  makeProduct({
    id: "accessory-shaker-cup",
    name: "SHAKER CUP",
    category: "ACCESSORIES",
    mrp: "MRP not listed",
    packSize: "Accessory",
  }),


  /* ==========================================================
     MILK POWDER
  ========================================================== */

  makeProduct({
    id: "milk-powder",
    name: "SHAKEMIX PREMIUM MILK POWDER 500g",
    category: "MILK POWDER",
    mrp: "₹730",
    packSize: "500 g",

    image:
      "https://mayleennutricare.com/spaces/products/f893d0b1-cf81-439c-add4-74c8a0353c8f.jpg",
  }),
];


/* ============================================================
   ONLY 4 PRODUCTS APPEAR ON HOME PAGE
============================================================ */

const FEATURED_PRODUCT_IDS = [
  "premium-strawberry",
  "joint-health",
  "energy-lemon",
  "kids-nutrition",
];

const FEATURED_PRODUCTS =
  FEATURED_PRODUCT_IDS
    .map((id) =>
      PRODUCTS.find(
        (product) => product.id === id
      )
    )
    .filter(Boolean);


/* ============================================================
   PRODUCT IMAGE
============================================================ */

function ProductImage({ product, className = "w-full h-full object-contain p-6 drop-shadow-2xl" }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className={className}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center p-8"
      style={{
        background: `radial-gradient(circle at 50% 40%, ${product.color}22 0%, #ffffff 65%)`,
      }}
    >
      <div className="text-center">
        <div className="text-xs tracking-[0.28em] font-black text-slate-400">
          Shri Radhe
        </div>

        <div className="mt-2 text-sm font-black text-slate-700">
          Wellness Centre
        </div>

        <div
          className="mx-auto mt-4 h-1 w-12 rounded-full"
          style={{
            backgroundColor: product.accent,
          }}
        />
      </div>
    </div>
  );
}

/* ============================================================
   UTILITY
============================================================ */

function scrollToId(id) {
  if (typeof document === "undefined") {
    return;
  }

  const element =
    document.getElementById(id);

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}


/* ============================================================
   3D ERROR BOUNDARY
============================================================ */

class ThreeDErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error) {
    console.error(
      "Wellness 3D error:",
      error
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}


/* ============================================================
   PROCEDURAL PRODUCT
   Lightweight version
============================================================ */

function ProceduralTub({
  primaryColor = "#ffffff",
  accentColor = COLORS.primary,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0.04, -0.25, 0],
}) {
  return (
    <group
      scale={scale}
      position={position}
      rotation={rotation}
    >

      {/* Main body */}

      <mesh>
        <cylinderGeometry
          args={[
            1.2,
            1.15,
            3,
            32,
          ]}
        />

        <meshStandardMaterial
          color={primaryColor}
          roughness={0.28}
          metalness={0.05}
        />
      </mesh>


      {/* Lower rim */}

      <mesh
        position={[
          0,
          -1.47,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            1.18,
            1.12,
            0.18,
            32,
          ]}
        />

        <meshStandardMaterial
          color={primaryColor}
          roughness={0.35}
        />
      </mesh>


      {/* Neck */}

      <mesh
        position={[
          0,
          1.55,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            1.08,
            1.14,
            0.18,
            32,
          ]}
        />

        <meshStandardMaterial
          color={primaryColor}
          roughness={0.32}
        />
      </mesh>


      {/* Lid */}

      <mesh
        position={[
          0,
          1.76,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            1.18,
            1.18,
            0.38,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#111827"
          roughness={0.2}
          metalness={0.45}
        />
      </mesh>


      {/* Lid top */}

      <mesh
        position={[
          0,
          1.97,
          0,
        ]}
      >
        <cylinderGeometry
          args={[
            1.13,
            1.18,
            0.05,
            32,
          ]}
        />

        <meshStandardMaterial
          color="#0f172a"
          roughness={0.2}
          metalness={0.45}
        />
      </mesh>


      {/* Label */}

      <mesh
        scale={[
          1.205,
          1.18,
          1.205,
        ]}
      >
        <cylinderGeometry
          args={[
            1,
            1,
            2.15,
            32,
            1,
            true,
            0,
            Math.PI * 2,
          ]}
        />

        <meshStandardMaterial
          color={primaryColor}
          roughness={0.7}
        />
      </mesh>


      {/* Accent band */}

      <mesh
        position={[
          0,
          0.18,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
        scale={[
          1.21,
          1.19,
          1.21,
        ]}
      >
        <cylinderGeometry
          args={[
            1,
            1,
            1.15,
            32,
            1,
            true,
            Math.PI * 0.25,
            Math.PI * 1.5,
          ]}
        />

        <meshStandardMaterial
          color={accentColor}
          roughness={0.5}
        />
      </mesh>


      {/* Gold trim */}

      <mesh
        position={[
          0,
          -0.4,
          0,
        ]}
        rotation={[
          0,
          Math.PI / 4,
          0,
        ]}
        scale={[
          1.215,
          1.215,
          1.215,
        ]}
      >
        <cylinderGeometry
          args={[
            1,
            1,
            0.045,
            32,
            1,
            true,
            Math.PI * 0.25,
            Math.PI * 1.5,
          ]}
        />

        <meshStandardMaterial
          color={COLORS.gold}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>


      {/* Front emblem */}

      <mesh
        position={[
          0,
          0.15,
          1.22,
        ]}
      >
        <circleGeometry
          args={[
            0.35,
            24,
          ]}
        />

        <meshBasicMaterial
          color={accentColor}
        />
      </mesh>

    </group>
  );
}

function AutoRotateProduct({
  children,
  enabled = true,
}) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!enabled || !groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}

/* ============================================================
   HERO 3D SCENE
   Deliberately static until user interacts.
============================================================ */

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)"
    );

    const update = () => {
      setIsMobile(mediaQuery.matches);
    };

    update();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", update);
      return () =>
        mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  return isMobile;
}

function RadheBrandHero() {
  return (
    <div className="radhe-brand-hero">

      <img
        src="/peacock-feather.png"
        alt=""
        aria-hidden="true"
        className="radhe-brand-feather"
      />

      <div className="radhe-brand-text">

        <div className="radhe-brand-name">
          Shri Radhe
        </div>

        <div className="radhe-brand-centre">
          Wellness Centre
        </div>

        <div className="radhe-brand-line" />

        <div className="radhe-brand-tagline">
          Glow From Inside, Shine Outside.
        </div>

      </div>

    </div>
  );
} 

function HeroSceneOptimized() {
  const isMobile = useMobileViewport();

  return (
    <Canvas
      frameloop={isMobile ? "demand" : "always"}
      dpr={isMobile ? [1, 1] : [1, 1.15]}
      camera={{
        position: [0, 0, 8.5],
        fov: 40,
        near: 0.1,
        far: 50,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <ambientLight intensity={1.35} />

      <directionalLight
        position={[4, 7, 6]}
        intensity={2.2}
      />

      <directionalLight
        position={[-4, 2, 3]}
        intensity={0.8}
        color="#6ee7b7"
      />

      <PresentationControls
        global={false}
        cursor={true}
        enablePan={false}
        zoom={1.15}
        rotation={[0.12, -1.45, 0]}
        polar={[-Math.PI / 7, Math.PI / 6]}
        azimuth={[-Math.PI / 3, Math.PI / 3]}
      >
        <SkinBooster3DModel />
      </PresentationControls>

      <mesh position={[0, -2.35, 0]}>
        <cylinderGeometry args={[2.4, 2.4, 0.05, 24]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.08} />
      </mesh>

    </Canvas>
  );
}

function InteractiveShowcaseScene() {
  return <HeroSceneOptimized />;
}

/* ============================================================
  SKIN BOOSTER 3D MODEL
   Based on official SKIN BOOSTER 200g product information.
============================================================ */

function SkinBoosterBackLabel() {
  const texture = useMemo(() => {
    if (
      typeof document === "undefined"
    ) {
      return null;
    }

    const canvas =
      document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 1536;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    /* BACKGROUND */

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    /* BORDER */

    ctx.strokeStyle = "#e5e7eb";
    ctx.lineWidth = 10;

    ctx.strokeRect(
      30,
      30,
      canvas.width - 60,
      canvas.height - 60
    );

    /* HEADER */

    ctx.fillStyle = "#f57900";

    ctx.fillRect(
      45,
      45,
      canvas.width - 90,
      210
    );

    ctx.fillStyle = "#ffffff";

    ctx.font =
      "bold 58px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
    "Shri Radhe Wellness",
      canvas.width / 2,
      125
    );

    ctx.font =
      "bold 50px Arial";

    ctx.fillText(
      "SKIN BOOSTER",
      canvas.width / 2,
      190
    );

    /* CONTENT */

    ctx.textAlign = "left";

    const left = 80;

    let y = 330;

    const heading = (
      text
    ) => {
      ctx.fillStyle =
        "#176b45";

      ctx.font =
        "bold 34px Arial";

      ctx.fillText(
        text,
        left,
        y
      );

      y += 52;
    };

    const body = (
      text,
      width = 850
    ) => {
      ctx.fillStyle =
        "#334155";

      ctx.font =
        "24px Arial";

      const words =
        text.split(" ");

      let line = "";

      const lineHeight =
        38;

      for (
        let i = 0;
        i < words.length;
        i++
      ) {
        const test =
          line +
          words[i] +
          " ";

        const measurement =
          ctx.measureText(test);

        if (
          measurement.width >
            width &&
          line
        ) {
          ctx.fillText(
            line,
            left,
            y
          );

          line =
            words[i] + " ";

          y += lineHeight;
        } else {
          line = test;
        }
      }

      if (line) {
        ctx.fillText(
          line,
          left,
          y
        );

        y += lineHeight;
      }

      y += 18;
    };

    heading(
      "DESCRIPTION"
    );

    body(
      "Skin Booster is an orange flavoured collagen drink enriched with antioxidants and biotin."
    );

    heading(
      "FOR SKIN HEALTH"
    );

    body(
      "Each serving of Skin Booster provides 7gms of Hydrolyzed Fish Collagen."
    );

    body(
      " Skin Booster provides a rich source of Vitamins, Antioxidants and Biotin."
    );

    heading(
      "DIRECTIONS FOR USE"
    );

    body(
      "Mix one spoon of Skin Booster with 200 ml of water."
    );

    body(
      "Recommended Usage: One serving per day."
    );

    body(
      "Not to be exceeded the mentioned recommended dosage."
    );

    heading(
      "STORAGE"
    );

    body(
      "Store with lid tightly closed in a cool, dry place and protect from sunlight. Keep out of reach of children."
    );

    heading(
      "INGREDIENTS"
    );

    body(
      "Marine Collagen, Diluent (Maltodextrine, Acidity Regulator (INS 330), Natural Identical Flavour (orange), Sweetener (INS 955 and INS 960), Vitamin E, Biotin, Synthetic Colour (INS 110)."
    );

    heading(
      "DISCLAIMER"
    );

    body(
      "Not recommended for children. Pregnant and lactating women should consult their physician prior to use. This product is not intended to cure, diagnose, prevent or treat any diseases."
    );

    body(
      "Allergen: Contains Fish collagen. Individuals using anticoagulant medication (Warfarin) should consult their physician prior to use."
    );

    body(
      "If experience any kind of allergy or unexpected response after using this product, stop consumption and consult your physician."
    );

    /* FOOTER */

    ctx.textAlign =
      "center";

    ctx.fillStyle =
      "#64748b";

    ctx.font =
      "bold 22px Arial";

    ctx.fillText(
      "Shri Radhe Wellness",
      canvas.width / 2,
      canvas.height - 65
    );

    const result =
      new CanvasTexture(
        canvas
      );

    result.colorSpace =
      SRGBColorSpace;

    result.needsUpdate =
      true;

    return result;
  }, []);

  if (!texture) {
    return null;
  }

  return texture;
}


function SkinBooster3DModel() {
  const frontTexture = useTexture("/skin-booster-front.jpg");
  const backTexture = SkinBoosterBackLabel();

  frontTexture.colorSpace = SRGBColorSpace;

  return (
    <group position={[0, -0.15, 0]} rotation={[0.08, -0.25, 0]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.34, 1.3, 3.35, 64]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.46}
          metalness={0.04}
          clearcoat={0.9}
          clearcoatRoughness={0.38}
        />
      </mesh>

      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[1.23, 1.3, 0.18, 64]} />
        <meshStandardMaterial color="#f4f4f5" roughness={0.26} metalness={0.08} />
      </mesh>

      <mesh position={[0, 1.82, 0]}>
        <cylinderGeometry args={[1.38, 1.38, 0.46, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.24}
          metalness={0.12}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </mesh>

      <mesh position={[0, 2.08, 0]}>
        <cylinderGeometry args={[1.28, 1.3, 0.08, 64]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.22} metalness={0.12} />
      </mesh>

      <mesh position={[0, 0.06, 1.42]}>
        <planeGeometry args={[1.96, 2.22]} />
        <meshStandardMaterial map={frontTexture} roughness={0.55} metalness={0.02} side={DoubleSide} />
      </mesh>

      {backTexture && (
        <mesh position={[0, 0.06, -1.42]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.96, 2.22]} />
          <meshStandardMaterial map={backTexture} roughness={0.7} metalness={0.02} side={DoubleSide} />
        </mesh>
      )}

      <mesh position={[0, -1.72, 0]}>
        <cylinderGeometry args={[1.18, 1.24, 0.08, 48]} />
        <meshStandardMaterial color="#f3f4f6" roughness={0.5} metalness={0.08} />
      </mesh>

      <mesh position={[-0.88, -0.15, 1.37]} rotation={[0, 0.22, 0.2]}>
        <boxGeometry args={[0.32, 0.08, 0.08]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

/* ============================================================
   LAZY 3D
============================================================ */

function Lazy3D({
  children,
  fallback,
}) {
  const containerRef =
    useRef(null);

  const [
    visible,
    setVisible,
  ] = useState(false);

  useEffect(() => {
    if (
      !containerRef.current
    ) {
      return;
    }

    if (
      typeof IntersectionObserver ===
      "undefined"
    ) {
      setVisible(true);
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          if (
            entries[0]?.isIntersecting
          ) {
            setVisible(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: "300px",
        }
      );

    observer.observe(
      containerRef.current
    );

    return () =>
      observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
    >
      {visible
        ? children
        : fallback}
    </div>
  );
}


/* ============================================================
   MOUSE PARALLAX
   Lightweight replacement for the missing component.
============================================================ */

function MouseParallax({
  children,
}) {
  const elementRef =
    useRef(null);

  const handleMove = (event) => {
    const element =
      elementRef.current;

    if (!element) {
      return;
    }

    const rect =
      element.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    const rotateX =
      Math.max(
        -3,
        Math.min(
          3,
          -y / 40
        )
      );

    const rotateY =
      Math.max(
        -3,
        Math.min(
          3,
          x / 40
        )
      );

    element.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleLeave = () => {
    const element =
      elementRef.current;

    if (!element) {
      return;
    }

    element.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="h-full transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  );
}


/* ============================================================
   NAVBAR
============================================================ */

function Navbar({
  cartCount,
  onSearch,
  onCart,
  onOpenDiscover,
  onBrandPartnerLogin,
  onLogout,
}) {
  const [
    isScrolled,
    setIsScrolled,
  ] = useState(false);

  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  useEffect(() => {
    const handleScroll =
      () => {
        setIsScrolled(
          window.scrollY > 20
        );
      };

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    handleScroll();

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      mobileMenuOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">

          {/* Logo */}

          <a
            href="#home"
            aria-label="Home"
            className="flex items-center group"
            onClick={() =>
              setMobileMenuOpen(false)
            }
          >

            <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/60 bg-white/30 shadow-lg shadow-emerald-600/10 group-hover:rotate-6 transition-transform flex items-center justify-center p-1">
              <img
                src="/peacock-feather.png"
                alt="Brand feather logo"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="ml-3">

              <div
                className={`text-xl font-black leading-none ${
                  isScrolled
                    ? "text-slate-900"
                    : "text-slate-800"
                }`}
              >
                SHRI RADHE
              </div>

              <div className="text-[10px] font-bold tracking-[0.22em] uppercase mt-1 text-emerald-600">
               WELLNESS CENTRE
              </div>

            </div>

          </a>


          {/* Desktop Navigation */}

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary navigation"
          >

            {NAV_LINKS.map(
              (link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(event) => {
                    if (link.name === "Discover") {
                      event.preventDefault();
                      onOpenDiscover();
                    } else if (link.name === "Shop") {
                      event.preventDefault();
                      scrollToId("shop");
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isScrolled
                      ? "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                      : "text-slate-700 hover:text-emerald-700 hover:bg-white/60"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}

          </nav>

{/* Desktop Actions */}
<div className="hidden lg:flex items-center gap-3">

  <button
    type="button"
    onClick={onSearch}
    aria-label="Search products"
    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
  >
    <Search size={20} />
  </button>

  <button
    type="button"
    onClick={onCart}
    aria-label={`Open shopping cart with ${cartCount} items`}
    className="relative w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
  >
    <ShoppingCart size={20} />

    {cartCount > 0 && (
      <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-emerald-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
        {cartCount > 99 ? "99+" : cartCount}
      </span>
    )}
  </button>

  <button
    type="button"
    onClick={onBrandPartnerLogin}
    className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
  >
    <User size={16} />
    Brand Partner Sign up
  </button>

  <button
    type="button"
    onClick={onLogout}
    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
  >
    <LogOut size={16} />
    Log out
  </button>

</div>

{/* Mobile Actions */}
<div className="lg:hidden flex items-center gap-2">

  <button
    type="button"
    onClick={onSearch}
    aria-label="Search products"
    className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center text-slate-800 shadow-sm"
  >
    <Search size={21} />
  </button>

  <button
    type="button"
    onClick={onCart}
    aria-label={`Open shopping cart with ${cartCount} items`}
    className="relative w-10 h-10 flex items-center justify-center text-slate-800"
  >
    <ShoppingCart size={22} />

    {cartCount > 0 && (
      <span className="absolute top-0 right-0 min-w-4 h-4 px-1 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center">
        {cartCount > 9 ? "9+" : cartCount}
      </span>
    )}
  </button>

  <button
    type="button"
    onClick={() =>
      setMobileMenuOpen((value) => !value)
    }
    aria-label={
      mobileMenuOpen
        ? "Close navigation"
        : "Open navigation"
    }
    aria-expanded={mobileMenuOpen}
    className="w-10 h-10 rounded-xl bg-white/80 backdrop-blur flex items-center justify-center text-slate-900 shadow-sm"
  >
    {mobileMenuOpen ? (
      <X size={23} />
    ) : (
      <Menu size={23} />
    )}
  </button>

</div>
</div>

      </div>


      {/* Mobile Menu */}

      <AnimatePresence>

        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-2xl overflow-hidden"
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
          >

            <nav className="p-4">

              {NAV_LINKS.map(
                (link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => {
                      setMobileMenuOpen(false);
                      if (link.name === "Discover") {
                        event.preventDefault();
                        onOpenDiscover();
                      }
                    }}
                    className="block px-4 py-4 rounded-xl text-lg font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    {link.name}
                  </a>
                )
              )}


              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">

               


                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBrandPartnerLogin();
                  }}
                  className="py-3 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center gap-2"
                >
                  <User
                    size={18}
                    
                  />
                  Brand Partner Sign Up
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="py-3 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Log out
                </button>

              </div>

            </nav>

          </motion.div>
        )}

      </AnimatePresence>

    </header>
  );
}


/* ============================================================
   HERO SECTION
============================================================ */

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] pt-24 pb-10 flex items-center overflow-hidden bg-[#f8fafc]"
    >

      <div className="hidden sm:block absolute top-0 right-0 w-[45vw] h-[45vw] max-w-[700px] rounded-full bg-emerald-200/40 blur-[110px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="hidden sm:block absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[750px] rounded-full bg-teal-100/50 blur-[120px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Hero text */}

          <div className="order-2 lg:order-1 text-center lg:text-left">

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100/80 text-emerald-800 text-sm font-bold mb-6 border border-emerald-200">

                <Leaf
                  size={16}
                  className="mr-2 text-emerald-600"
                />

                The Future of Wellness

              </div>


              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">

                GLOW FROM INSIDE, 

                <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  SHINE OUTSIDE.
                </span>

              </h1>


              <p className="text-base sm:text-lg lg:text-xl text-slate-600 mt-5 sm:mt-7 mb-7 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                स्वास्थ्य से भरी दुनिया में आपका स्वागत है।

              </p>


              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 w-full sm:w-auto">

                <button
                  type="button"
                  onClick={() =>
                    scrollToId(
                      "shop"
                    )
                  }
                  className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/15 group active:scale-[0.98]"
                >

                  Explore Products

                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={19}
                  />

                </button>


              </div>

            </motion.div>


            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
                duration: 0.7,
              }}
              className="mt-7 sm:mt-10 flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3"
            >

              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 text-sm font-bold text-slate-600">

                <ShieldCheck
                  className="mr-2 text-emerald-500"
                  size={18}
                />

                Quality Focus

              </div>


              <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 text-sm font-bold text-slate-600">

                <Award
                  className="mr-2 text-emerald-500"
                  size={18}
                />

                Brand Ecosystem

              </div>

            </motion.div>

          </div>


         {/* BRAND HERO */}

<div
  className="
    order-1
    lg:order-2
    relative
    h-[46vh]
    sm:h-[52vh]
    lg:h-[72vh]
    min-h-[360px]
    lg:min-h-[520px]
    overflow-hidden
  "
>
  <RadheBrandHero />
</div>
</div>

      </div>

    </section>
  );
}


/* ============================================================
   TRUST STRIP
============================================================ */

function TrustStrip() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24 border-y border-slate-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {TRUST_FEATURES.map(
            (feature, index) => {

              const Icon =
                feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-50px",
                  }}
                  transition={{
                    delay:
                      index * 0.06,
                  }}
                  className="group"
                >

                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">

                    <Icon
                      size={30}
                      strokeWidth={1.5}
                    />

                  </div>


                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>


                  <p className="text-slate-500 leading-relaxed">
                    {feature.desc}
                  </p>

                </motion.div>
              );
            }
          )}

        </div>

      </div>

    </section>
  );
}

/* ============================================================
   PRODUCT DETAIL POPUP
   Full-screen product opening experience
============================================================ */

function ProductMedia({
  product,
}) {
  const videoRef =
    useRef(null);

  useEffect(() => {
    if (
      !product?.video ||
      !videoRef.current
    ) {
      return;
    }

    const video =
      videoRef.current;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playVideo =
      async () => {
        try {
          await video.play();
        } catch (error) {
          console.warn(
            "Product video autoplay was blocked.",
            error
          );
        }
      };

    playVideo();

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [product]);

  /* =========================================
     VIDEO PRODUCT
  ========================================= */

  if (product.video) {
    return (
      <video
        ref={videoRef}
        src={product.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        controls
        className="
          block
          w-full
          h-full
          min-h-[360px]
          sm:min-h-[500px]
          lg:min-h-[680px]
          object-contain
          bg-black
        "
      />
    );
  }

  /* =========================================
     PHOTO-ONLY PRODUCT
  ========================================= */

  return (
    <div
      className="
        w-full
        h-full
        min-h-[360px]
        sm:min-h-[500px]
        lg:min-h-[680px]
        flex
        items-center
        justify-center
        bg-[#f8faf9]
      "
    >
      <img
        src={
          product.image || ""
        }
        alt={product.name}
        loading="eager"
        className="
          w-full
          h-full
          object-contain
          p-8
          sm:p-12
          lg:p-16
        "
      />
    </div>
  );
}

function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}) {
  const [quantity, setQuantity] =
    useState(1);

  const videoRef =
    useRef(null);

  useEffect(() => {
    if (!product) {
      return;
    }

    setQuantity(1);

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };
  }, [product]);

  useEffect(() => {
    if (
      !product?.video ||
      !videoRef.current
    ) {
      return;
    }

    const video =
      videoRef.current;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const startVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn(
          "Product video autoplay was blocked:",
          error
        );
      }
    };

    startVideo();
  }, [product]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    for (
      let i = 0;
      i < quantity;
      i += 1
    ) {
      onAddToCart(product);
    }

    onClose();
  };

  const modal = (
    <AnimatePresence mode="wait">

      <motion.div
        key={`product-modal-${product.id}`}
        className="
          fixed
          inset-0
          z-[100]
          bg-slate-950/75
          backdrop-blur-sm
          p-3
          sm:p-5
          lg:p-8
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} product details`}
      >

        <motion.div
          key={`product-cover-${product.id}`}
          className="
            relative
            w-full
            h-full
            max-w-7xl
            mx-auto
            rounded-[2rem]
            overflow-hidden
            bg-white
            shadow-2xl
            flex
            flex-col
          "
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 25,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            y: 15,
          }}
          transition={{
            type: "spring",
            stiffness: 190,
            damping: 23,
          }}
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          {/* =============================================
              HEADER
          ============================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-4
              px-5
              sm:px-7
              lg:px-8
              py-4
              border-b
              border-slate-100
              flex-shrink-0
              bg-white
            "
          >

            <div className="min-w-0">

              <p
                className="
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-[0.2em]
                  font-black
                  text-emerald-600
                "
              >
                Product Video
              </p>

              <h2
                className="
                  mt-1
                  text-base
                  sm:text-xl
                  font-black
                  text-slate-950
                  truncate
                "
              >
                {product.name}
              </h2>

            </div>


            <button
              type="button"
              onClick={onClose}
              aria-label="Close product video"
              className="
                w-11
                h-11
                rounded-full
                bg-slate-100
                text-slate-700
                flex
                items-center
                justify-center
                hover:bg-slate-200
                active:scale-95
                transition
                flex-shrink-0
              "
            >
              <X size={20} />
            </button>

          </div>


          {/* =============================================
              CONTENT
          ============================================== */}

          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
            "
          >

            <div
              className="
                grid
                lg:grid-cols-[1.25fr_0.75fr]
                min-h-full
              "
            >{/* =========================================
    PRODUCT MEDIA
========================================== */}

<div
  className="
    relative
    self-start
    w-full
    h-[28svh]
    min-h-[180px]
    max-h-[260px]
    sm:h-[38svh]
    sm:min-h-[260px]
    sm:max-h-[400px]
    lg:h-[64svh]
    lg:min-h-[360px]
    lg:max-h-[520px]
    overflow-hidden
    flex
    items-center
    justify-center
    bg-[#f8faf9]
  "
>
  {product.video ? (
    <video
      ref={videoRef}
      src={product.video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controls
      className="
        block
        w-auto
        h-auto
        max-w-full
        max-h-full
        object-contain
      "
    />
  ) : product.image ? (
    <img
      src={product.image}
      alt={product.name}
      loading="eager"
      className="
        block
        w-full
        h-full
        object-contain
        bg-[#f8faf9]
      "
    />
  ) : (
    <div
      className="
        px-8
        text-center
        text-white/70
      "
    >
      <p className="font-bold text-white">
        Product media unavailable
      </p>

      <p className="mt-2 text-sm text-white/50">
        No video or product image has been
        assigned to this product yet.
      </p>
    </div>
  )}

  {/* MEDIA TYPE LABEL */}

  <div
    className="
      absolute
      top-4
      left-4
      z-20
      pointer-events-none
    "
  >
    <span
      className="
        inline-flex
        items-center
        gap-2
        px-3
        py-2
        rounded-full
        bg-black/55
        backdrop-blur-md
        border
        border-white/10
        text-[10px]
        uppercase
        tracking-wider
        font-black
        text-white
      "
    >
      <span
        className="
          w-2
          h-2
          rounded-full
          bg-emerald-400
        "
      />

      {product.video
        ? "Product Video"
        : product.image
          ? "Product Image"
          : "No Media"}
    </span>
  </div>
</div>


              {/* =========================================
                  PRODUCT INFORMATION
              ========================================== */}

              <div
                className="
                  bg-white
                  p-6
                  sm:p-8
                  lg:p-10
                  flex
                  flex-col
                "
              >

                <div>

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      font-black
                      text-emerald-600
                    "
                  >
                    Shri Radhe Wellness
                  </p>

                  <h3
                    className="
                      mt-3
                      text-2xl
                      sm:text-3xl
                      font-black
                      leading-tight
                      text-slate-950
                    "
                  >
                    {product.name}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      text-slate-500
                    "
                  >
                    {product.packSize}
                  </p>


                  {/* CATEGORY */}

                  <div
                    className="
                      mt-5
                      inline-flex
                      px-3
                      py-2
                      rounded-full
                      bg-slate-50
                      border
                      border-slate-200
                      text-[10px]
                      uppercase
                      tracking-wider
                      font-black
                      text-slate-600
                    "
                  >
                    {product.category}
                  </div>


                  {/* DESCRIPTION */}

                  {product.shortDescription && (
                    <p
                      className="
                        mt-6
                        text-sm
                        sm:text-base
                        leading-relaxed
                        text-slate-500
                      "
                    >
                      {
                        product.shortDescription
                      }
                    </p>
                  )}


                  {/* HIGHLIGHTS */}

                  {product.highlights?.length >
                    0 && (
                    <div className="mt-7">

                      <h4
                        className="
                          text-sm
                          font-black
                          text-slate-900
                        "
                      >
                        Product Information
                      </h4>

                      <div
                        className="
                          mt-4
                          space-y-3
                        "
                      >

                        {product.highlights.map(
                          (item) => (
                            <div
                              key={item}
                              className="
                                flex
                                items-start
                                gap-3
                                text-sm
                                text-slate-500
                              "
                            >
                              <span
                                className="
                                  mt-1.5
                                  w-2
                                  h-2
                                  rounded-full
                                  bg-emerald-500
                                  flex-shrink-0
                                "
                              />

                              <span>
                                {item}
                              </span>
                            </div>
                          )
                        )}

                      </div>
                    </div>
                  )}

                </div>


                {/* =======================================
                    PURCHASE AREA
                ======================================== */}

                <div
                  className="
                    mt-auto
                    pt-8
                  "
                >

                  <div
                    className="
                      p-5
                      rounded-3xl
                      bg-slate-50
                      border
                      border-slate-100
                    "
                  >

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-wider
                        font-black
                        text-slate-400
                      "
                    >
                      MRP
                    </p>

                    <p
                      className="
                        mt-1
                        text-3xl
                        font-black
                        text-slate-950
                      "
                    >
                      {product.price}
                    </p>


                    {/* QUANTITY */}

                    <div
                      className="
                        mt-5
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >

                      <span
                        className="
                          text-sm
                          font-bold
                          text-slate-700
                        "
                      >
                        Quantity
                      </span>

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          border
                          border-slate-200
                          bg-white
                          p-1
                        "
                      >

                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(
                              (value) =>
                                Math.max(
                                  1,
                                  value - 1
                                )
                            )
                          }
                          className="
                            w-9
                            h-9
                            rounded-lg
                            hover:bg-slate-100
                            font-black
                          "
                        >
                          −
                        </button>

                        <span
                          className="
                            min-w-6
                            text-center
                            font-black
                          "
                        >
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(
                              (value) =>
                                value + 1
                            )
                          }
                          className="
                            w-9
                            h-9
                            rounded-lg
                            hover:bg-slate-100
                            font-black
                          "
                        >
                          +
                        </button>

                      </div>

                    </div>


                    {/* BUTTONS */}

                    <div
                      className="
                        mt-5
                        grid
                        sm:grid-cols-2
                        gap-3
                      "
                    >

                      <button
                        type="button"
                        onClick={
                          handleAddToCart
                        }
                        className="
                          min-h-14
                          rounded-2xl
                          bg-slate-950
                          text-white
                          font-black
                          flex
                          items-center
                          justify-center
                          gap-2
                          hover:bg-emerald-600
                          active:scale-[0.98]
                          transition-colors
                        "
                      >
                        <ShoppingCart
                          size={19}
                        />

                        Add to Cart
                      </button>


                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(
                            product
                          );

                          onClose();
                        }}
                        className="
                          min-h-14
                          rounded-2xl
                          bg-emerald-600
                          text-white
                          font-black
                          hover:bg-emerald-700
                          active:scale-[0.98]
                          transition-colors
                        "
                      >
                        Buy Now
                      </button>

                    </div>

                  </div>


                  <p
                    className="
                      mt-4
                      text-[10px]
                      leading-relaxed
                      text-slate-400
                    "
                  >
                    Product information will be provided by Brand Global Team.
                    Contact " +91 88402 73781 " for further information.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );

  return createPortal(
    modal,
    document.body
  );
}

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({
  product,
  index,
  isWishlisted,
  onWishlist,
  onAddToCart,
  onOpenProduct,
}) {
  return (
    <motion.article
      onClick={() => onOpenProduct(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpenProduct(product);
        }
      }}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
      }}
      className="
        group
        h-full
        bg-white
        rounded-3xl
        p-4 sm:p-5
        border
        border-slate-100
        shadow-sm
        hover:shadow-xl
        hover:shadow-slate-200/60
        transition-shadow
        duration-200
        relative
        flex
        flex-col
        cursor-pointer
        select-none
      "
    >
      {/* CATEGORY */}
      <span
        className="
          absolute
          top-4 sm:top-5
          left-4 sm:left-5
          z-10
          bg-white/90
          backdrop-blur
          px-3
          py-1.5
          rounded-full
          text-[10px]
          font-black
          uppercase
          tracking-wider
          text-slate-700
          border
          border-slate-100
        "
      >
        {product.category}
      </span>

      {/* WISHLIST */}
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onWishlist(product);
        }}
        aria-label={
          isWishlisted
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
        aria-pressed={isWishlisted}
        className={`
          absolute
          top-5
          right-5
          z-10
          w-10
          h-10
          rounded-full
          backdrop-blur
          shadow-sm
          flex
          items-center
          justify-center
          border
          transition-colors
          ${
            isWishlisted
              ? "bg-rose-50 text-rose-500 border-rose-100"
              : "bg-white/90 text-slate-400 border-slate-100 hover:text-rose-500 hover:bg-rose-50"
          }
        `}
      >
        <Heart
          size={18}
          fill={isWishlisted ? "currentColor" : "none"}
        />
      </button>

      <div className="relative overflow-hidden rounded-2xl bg-slate-100 mb-4">
        <div className="relative h-52 w-full overflow-hidden">
          <ProductImage
            product={product}
            className="h-full w-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/15 to-transparent" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/80">
            Official Catalogue
          </p>

          <h3 className="mt-2 text-base sm:text-lg font-black text-white leading-snug min-h-[3.2rem] sm:min-h-[3.5rem]">
            {product.name}
          </h3>
        </div>
      </div>

      {/* INFO */}
      <div className="flex-1 flex flex-col">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
          Product Details
        </p>

        <p className="text-sm text-slate-500">
          {product.packSize}
        </p>

        {/* PRICE + CART */}
        <div
          className="
            mt-auto
            pt-4
            flex
            items-center
            justify-between
            border-t
            border-slate-100
          "
        >
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
              MRP
            </p>

            <span className="text-2xl font-black text-slate-900">
              {product.mrp}
            </span>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onAddToCart(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="
              w-12
              h-12
              rounded-full
              bg-slate-900
              text-white
              flex
              items-center
              justify-center
              hover:bg-emerald-600
              transition-colors
            "
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
/* ============================================================
   FEATURED PRODUCTS
============================================================ */

function FeaturedProducts({
  wishlist,
  onWishlist,
  onAddToCart,
  onOpenProduct,
  onOpenAllProducts,
}) {
  return (
    <section
      id="shop"
      className="py-14 sm:py-20 lg:py-24 bg-slate-50"
    >

      <div className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      ">

        {/* HEADER */}
        <div className="
          flex
          flex-col
          md:flex-row
          md:items-end
          justify-between
          gap-6
          mb-12
        ">

          <div className="max-w-2xl">

            <p className="
              text-sm
              font-bold
              uppercase
              tracking-widest
              text-emerald-600
              mb-3
            ">
              Featured Collection
            </p>

            <h2 className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              tracking-tight
              text-slate-900
            ">
              Nutrition That Fits Your Lifestyle
            </h2>

            <p className="
              text-slate-500
              mt-5
              text-lg
              leading-relaxed
            ">
              Discover selected products,
              then explore the complete catalogue.
            </p>

          </div>


          {/* DESKTOP ALL PRODUCTS */}
          <button
            type="button"
            onClick={onOpenAllProducts}
            className="
              hidden
              md:flex
              items-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-white
              border
              border-slate-200
              font-bold
              text-slate-900
              hover:text-emerald-600
              hover:border-emerald-200
              transition-colors
            "
          >
            View All Products

            <ArrowRight size={18} />
          </button>

        </div>


        {/* ONLY 4 CARDS */}
        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          lg:gap-8
        ">

          {FEATURED_PRODUCTS.map(
            (product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                isWishlisted={wishlist.has(
                  product.id
                )}
                onWishlist={onWishlist}
                onAddToCart={onAddToCart}
                onOpenProduct={
                  onOpenProduct
                }
              />
            )
          )}

        </div>


        {/* MOBILE ALL PRODUCTS */}
        <button
          type="button"
          onClick={onOpenAllProducts}
          className="
            md:hidden
            mt-8
            w-full
            py-4
            rounded-2xl
            bg-slate-900
            text-white
            font-bold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-emerald-600
            transition-colors
          "
        >
          View All Products

          <ArrowRight size={18} />
        </button>

      </div>

    </section>
  );
}

function AllProductsModal({
  open,
  onClose,
  wishlist,
  onWishlist,
  onAddToCart,
  onOpenProduct,
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ALL");
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const categories = [
    {
      id: "ALL",
      label: "All Products",
    },
    {
      id: "PREMIUM NUTRITION SHAKE",
      label: "Premium Nutrition",
    },
    {
      id: "TARGETED NUTRITION",
      label: "Targeted Nutrition",
    },
    {
      id: "ENERGY & FITNESS",
      label: "Energy & Fitness",
    },
    {
      id: "KIDS NUTRITION",
      label: "Kids Nutrition",
    },
    {
      id: "ACCESSORIES",
      label: "Accessories",
    },
    {
      id: "MILK POWDER",
      label: "Milk Powder",
    },
  ];

  useEffect(() => {
    if (!open) {
      setQuery("");
      setCategory("ALL");
      setSearchOpen(false);
      setCategoryOpen(false);
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  const selectedCategory =
    categories.find(
      (item) => item.id === category
    ) || categories[0];

  const filteredProducts = PRODUCTS.filter(
    (product) => {
      const matchesCategory =
        category === "ALL" ||
        product.category === category;

      const normalizedQuery = query
        .trim()
        .toLowerCase();

      const matchesSearch =
        normalizedQuery === "" ||
        product.name
          .toLowerCase()
          .includes(normalizedQuery) ||
        product.category
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesCategory &&
        matchesSearch
      );
    }
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="
            fixed
            inset-0
            z-[120]
            bg-slate-950/70
            backdrop-blur-md
            p-2
            sm:p-5
            lg:p-8
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <div
            className="
              max-w-7xl
              mx-auto
              h-full
              rounded-2xl
              sm:rounded-[2rem]
              overflow-hidden
              bg-white
              shadow-2xl
              flex
              flex-col
            "
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* =================================================
                TOP HEADER
            ================================================= */}
            <div
              className="
                px-4
                sm:px-8
                lg:px-10
                pt-5
                sm:pt-8
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                {/* TITLE */}
                <h2
                  className="
                    text-xl
                    sm:text-3xl
                    font-black
                    tracking-tight
                    text-slate-950
                  "
                >
                  All Products
                </h2>

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-2">
                  {/* SEARCH ICON */}
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(
                        (value) => !value
                      );
                      setCategoryOpen(false);
                    }}
                    aria-label="Search products"
                    className="
                      w-11
                      h-11
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      text-slate-700
                      flex
                      items-center
                      justify-center
                      hover:bg-slate-50
                      hover:border-slate-300
                      active:scale-95
                      transition
                      duration-150
                    "
                  >
                    <Search size={20} />
                  </button>

                  {/* CLOSE */}
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close all products"
                    className="
                      w-11
                      h-11
                      rounded-full
                      border
                      border-slate-200
                      bg-white
                      text-slate-700
                      flex
                      items-center
                      justify-center
                      hover:bg-slate-50
                      hover:border-slate-300
                      active:scale-95
                      transition
                      duration-150
                    "
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* =================================================
                  SEARCH - OPENS ONLY AFTER SEARCH ICON CLICK
              ================================================= */}
              {searchOpen && (
                <div className="mt-5 relative">
                  <Search
                    size={18}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                    "
                  />

                  <label className="sr-only" htmlFor="navbar-product-search">Search products</label>
                  <input
                    id="navbar-product-search"
                    name="productSearch"
                    autoFocus
                    value={query}
                    onChange={(event) =>
                      setQuery(
                        event.target.value
                      )
                    }
                    placeholder="Search products..."
                    className="
                      w-full
                      h-12
                      pl-11
                      pr-4
                      rounded-2xl
                      bg-slate-50
                      border
                      border-slate-200
                      outline-none
                      text-slate-900
                      placeholder:text-slate-400
                      focus:border-emerald-400
                      focus:ring-4
                      focus:ring-emerald-100
                    "
                  />
                </div>
              )}

              {/* =================================================
                  SHOP BY CATEGORY
              ================================================= */}
              <div
                className="
                  mt-6
                  sm:mt-7
                  flex
                  flex-col
                  sm:flex-row
                  sm:items-center
                  items-stretch
                  justify-between
                  gap-3
                "
              >
                <h3
                  className="
                    text-sm
                    sm:text-base
                    font-black
                    uppercase
                    tracking-[0.16em]
                    text-slate-800
                  "
                >
                  Shop by Category
                </h3>

                {/* CATEGORY DRAWER BUTTON */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setCategoryOpen(
                        (value) => !value
                      );
                      setSearchOpen(false);
                    }}
                    className="
                      w-full
                      sm:w-auto
                      sm:min-w-[230px]
                      h-11
                      px-4
                      rounded-xl
                      border
                      border-slate-200
                      bg-white
                      text-sm
                      font-semibold
                      text-slate-700
                      flex
                      items-center
                      justify-between
                      gap-4
                      hover:border-emerald-300
                      hover:bg-emerald-50/40
                      active:scale-[0.98]
                      transition
                      duration-150
                    "
                  >
                    <span className="truncate">
                      {selectedCategory.label}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`
                        flex-shrink-0
                        transition-transform
                        duration-150
                        ${
                          categoryOpen
                            ? "rotate-180"
                            : ""
                        }
                      `}
                    />
                  </button>

                  {/* CATEGORY DRAWER */}
                  {categoryOpen && (
                    <div
                      className="
                        absolute
                        right-0
                        top-[calc(100%+8px)]
                        z-50
                        w-full
                        sm:w-[230px]
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        shadow-xl
                        overflow-hidden
                      "
                    >
                      {categories.map(
                        (item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setCategory(
                                item.id
                              );
                              setCategoryOpen(
                                false
                              );
                            }}
                            className={`
                              w-full
                              px-4
                              py-3
                              text-left
                              text-sm
                              font-semibold
                              flex
                              items-center
                              justify-between
                              transition-colors
                              ${
                                category ===
                                item.id
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "text-slate-700 hover:bg-slate-50"
                              }
                            `}
                          >
                            <span>
                              {item.label}
                            </span>

                            {category ===
                              item.id && (
                              <span
                                className="
                                  w-2
                                  h-2
                                  rounded-full
                                  bg-emerald-500
                                "
                              />
                            )}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DIVIDER */}
            <div
              className="
                mx-5
                sm:mx-8
                lg:mx-10
                mt-6
                border-t
                border-slate-200
              "
            />

            {/* =================================================
                PRODUCT AREA
            ================================================= */}
            <div
              className="
                flex-1
                overflow-y-auto
                px-4
                sm:px-8
                lg:px-10
                py-5
                sm:py-7
              "
            >
              {/* CATEGORY TITLE */}
              <div
                className="
                  flex
                  items-end
                  justify-between
                  gap-4
                  mb-6
                "
              >
                <div>
                  <p
                    className="
                      text-[11px]
                      font-black
                      uppercase
                      tracking-[0.2em]
                      text-emerald-600
                    "
                  >
                    Shri Radhe Wellness
                  </p>

                  <h3
                    className="
                      mt-1
                      text-xl
                      sm:text-2xl
                      font-black
                      text-slate-950
                    "
                  >
                    {selectedCategory.label}
                  </h3>
                </div>

                <p
                  className="
                    text-xs
                    sm:text-sm
                    text-slate-500
                    whitespace-nowrap
                  "
                >
                  {filteredProducts.length}{" "}
                  products
                </p>
              </div>

              {/* PRODUCTS GRID */}
              {filteredProducts.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-5
                  "
                >
                  {filteredProducts.map(
                    (product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        isWishlisted={
                          wishlist.has(
                            product.id
                          )
                        }
                        onWishlist={
                          onWishlist
                        }
                        onAddToCart={
                          onAddToCart
                        }
                        onOpenProduct={
                          onOpenProduct
                        }
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    min-h-[280px]
                    rounded-3xl
                    border
                    border-dashed
                    border-slate-200
                    bg-slate-50
                    flex
                    items-center
                    justify-center
                    text-center
                    px-6
                  "
                >
                  <div>
                    <p
                      className="
                        text-lg
                        font-bold
                        text-slate-900
                      "
                    >
                      No products found
                    </p>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-slate-500
                      "
                    >
                      Try another search or
                      category.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/* ============================================================
   IMMERSIVE SHOWCASE
============================================================ */

function ImmersiveShowcase({
  onAddToCart,
}) {
  return (
    <section
      id="science"
      className="py-14 sm:py-20 lg:py-24 bg-slate-950 relative overflow-hidden"
    >

      <div className="hidden sm:block absolute w-[600px] h-[600px] rounded-full bg-rose-600/10 blur-[100px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* 3D viewer */}

          <div className="h-[48svh] sm:h-[55vh] lg:h-[70vh] min-h-[320px] sm:min-h-[420px] max-h-[520px] lg:max-h-none rounded-2xl sm:rounded-[2rem] bg-slate-900 border border-slate-800 relative overflow-hidden">

            <div className="absolute top-6 left-6 z-20 flex items-center gap-3">

              <span className="w-2 h-2 rounded-full bg-rose-500" />

              <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">
                Interactive 3D View
              </span>

            </div>


            <ThreeDErrorBoundary
              fallback={
                <div className="h-full flex items-center justify-center p-8">

                  <p className="text-white/60 text-center">
                    The interactive product viewer is unavailable in this browser.
                  </p>

                </div>
              }
            >

              <Lazy3D
                fallback={
                  <div className="w-full h-full flex items-center justify-center">

                    <span className="text-white/50 text-sm font-semibold">
                      3D viewer loading...
                    </span>

                  </div>
                }
              >

                <Suspense
                  fallback={
                    <div className="w-full h-full flex items-center justify-center">

                      <div className="w-10 h-10 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />

                    </div>
                  }
                >

                  <InteractiveShowcaseScene />

                </Suspense>

              </Lazy3D>

            </ThreeDErrorBoundary>


            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">

              <div className="bg-slate-950/70 backdrop-blur text-white px-5 py-3 rounded-full border border-slate-700">

                <span className="font-bold text-sm">
                  Drag to rotate
                </span>

              </div>

            </div>

          </div>


          {/* Content */}
<a
              href="#discover"
              className="inline-flex items-center"
            >
          <div className="text-white">

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              

              <div className="inline-flex items-center px-4 py-2 rounded-full bg-rose-500/10 text-rose-400 text-sm font-bold border border-rose-500/20">
                Our Featured Products

              </div>


             <h2 className="
  text-4xl
  sm:text-5xl
  lg:text-6xl
  font-black
  leading-[1.08]
  tracking-tight
  mt-6
">
  Skin Booster

  <br />

  <span className="
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-orange-400
    to-amber-300
  ">
    Product Exploration.
  </span>
</h2>

<p className="
  text-lg
  text-slate-400
  leading-relaxed
  mt-7
">
  Explore the Skin Booster 200g
  with product information, directions,
  ingredients, storage instructions, and
  official usage information.
</p>


              <div className="space-y-5 mt-10">

                {[
                  "Product & ingredient information",
                ].map(
                  (item) => 
                    <div
                      key={
                        item
                      }
                      className="flex items-start gap-4"
                    >

                      <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 flex-shrink-0">

                        <ShieldCheck
                          size={20}
                        />

                      </div>


                      <div>

                        <p className="font-bold text-white">
                          {item}
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          MRP: Rs. 2,499/- including taxes 
                          Collagen per serving: 7 g of hydrolyzed fish collagen.
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                          ingredients:
                          Marine Collagen, Maltodextrin — listed as a diluent
                          INS 330 — acidity regulator, Orange natural-identical flavour
                          INS 955 — sweetener, INS 960 — sweetener
                          Vitamin E, Biotin, INS 110 — synthetic colour
                          </p>
                          <p className="text-sm text-slate-500 mt-1">
                          Important official warnings
                          Shri Radhe Wellness states that the product contains fish collagen and is not recommended for children. It also says pregnant/lactating women should consult their physician before use and that people using anticoagulant medication such as warfarin should consult their physician.
                        </p>

                      </div>

                    </div>
                  
                )}

              </div>


              <div className="flex flex-col sm:flex-row gap-4 mt-10">

                <button
                  type="button"
                  onClick={() =>
                    onAddToCart(
                      PRODUCTS[3]
                    )
                  }
                  className="px-7 py-4 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 font-bold flex items-center justify-center hover:shadow-lg hover:shadow-rose-500/30 transition-all"
                >

                  Add to Cart — ₹4,200

                  <ShoppingCart
                    className="ml-3"
                    size={19}
                  />

                </button>


                <button
                  type="button"
                  onClick={() =>
                    scrollToId(
                      "shop"
                    )
                  }
                  className="px-7 py-4 rounded-full border-2 border-slate-700 font-bold hover:bg-slate-800 transition-colors"
                >
                  View Product Catalogue
                </button>

              </div>

            </motion.div>

          </div>
          </a>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   OPPORTUNITY SECTION
============================================================ */

function OpportunitySection({ onOpenDiscover }) {
  return (
    <section
      id="partner"
      className="py-24 bg-[#f8fafc]"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-slate-950 rounded-[2.5rem] overflow-hidden relative">

          <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-emerald-600/20 blur-[100px]" />

          <div className="absolute right-20 bottom-0 w-[260px] h-[260px] rounded-full bg-teal-400/10 blur-[90px]" />


          <div className="relative p-10 sm:p-16 lg:p-24 max-w-4xl">

            <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">
              Brand Partner Ecosystem
            </p>


            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mt-4">

              Build a Life You Love.

              <br />

              Join the Community.

            </h2>


            <p className="text-lg text-slate-300 leading-relaxed mt-6 max-w-2xl">
              Create a dedicated experience for partner information, official training, events, resources, and support.
            </p>


            <div className="grid sm:grid-cols-3 gap-5 mt-10">

              {[
                {
                  icon: Users,
                  label: "Community",
                },
                {
                  icon: Award,
                  label: "Training",
                },
                {
                  icon: Activity,
                  label: "Support",
                },
              ].map(
                (item) => {

                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={
                        item.label
                      }
                      className="flex items-center gap-3 text-white"
                    >

                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">

                        <Icon
                          size={19}
                        />

                      </div>

                      <span className="font-bold">
                        {item.label}
                      </span>

                    </div>
                  );
                }
              )}

            </div>


            <button
              type="button"
              onClick={onOpenDiscover}
              className="inline-flex items-center mt-10 px-8 py-4 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors"
            >

              Discover the Opportunity

              <ArrowRight
                className="ml-2"
                size={19}
              />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ============================================================
   FOOTER
============================================================ */

function Footer({ onOpenModal }) {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
    },
    {
      name: "Instagram",
      icon: Instagram,
    },
    
  ];

  return (
    <footer
      id="footer"
      className="bg-white pt-0 pb-1"
    >
<div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between gap-5 text-sm text-slate-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand */}

          <div className="lg:col-span-3">

            <a
              href="#home"
              className="inline-flex items-center"
            >

              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">

                <Leaf
                  className="text-emerald-400"
                  size={23}
                />

              </div>


              <div className="ml-3">

                <div className="text-xl font-black text-slate-900">
                  SHRI RADHE
                </div>

                <div className="text-[10px] font-bold tracking-[0.22em] uppercase text-slate-500">
                  WELLNESS CENTRE
                </div>

              </div>

            </a>


            <p className="text-slate-500 mt-2 leading-relaxed max-w-md">
              | GLOW FROM INSIDE, SHINE OUTSIDE.
            </p>


            <div className="flex gap-3 mt-7">

              {socialLinks.map(
                (social) => {

                  const Icon =
                    social.icon;

                  return (
                    <button
                      key={
                        social.name
                      }
                      type="button"
                      aria-label={`${social.name} placeholder`}
                      title="Connect official social URL here"
                      className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-colors"
                    >

                      <Icon
                        size={17}
                      />

                    </button>
                  );
                }
              )}

            </div>

          </div>


          {/* Shop */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
              Shop
            </h3>


            <div className="space-y-1">

              {[
                "All Products"
              ].map(
                (item) => (
                  <a
                    key={item}
                    href="#shop"
                    className="block text-slate-500 hover:text-emerald-600 transition-colors"
                  >
                    {item}
                  </a>
                )
              )}

            </div>

          </div>


          {/* Business */}

          <div className="lg:col-span-2">

            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
              Business
            </h3>


            <div className="space-y-4">

              <button
                type="button"
                onClick={() => onOpenModal("visionMission")}
                className="block text-left text-slate-500 hover:text-emerald-600"
              >
                Vision &amp; Mission
              </button>

              <a
                href="#partner"
                onClick={() => {
                   
                    onBrandPartnerLogin();
                  }}
                className="block text-slate-500 hover:text-emerald-600"
              >
                Brand Partner Login
              </a>
            </div>

          </div>


          {/* Policies */}

          <div className="lg:col-span-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
              Policies
            </h3>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => onOpenModal("privacy")}
                className="block text-left text-slate-500 hover:text-emerald-600"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onOpenModal("returnRefund")}
                className="block text-left text-slate-500 hover:text-emerald-600"
              >
                Return &amp; Refund
              </button>
              <button
                type="button"
                onClick={() => onOpenModal("shipping")}
                className="block text-left text-slate-500 hover:text-emerald-600"
              >
                Shipping Policy
              </button>
              <button
                type="button"
                onClick={() => onOpenModal("terms")}
                className="block text-left text-slate-500 hover:text-emerald-600"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>


          {/* Contact */}

          <div className="lg:col-span-3 bg-slate-50 rounded-2xl border border-slate-100 p-6">

            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
              Office
            </h3>


            <div className="flex items-start gap-3 text-slate-600">

              <MapPin
                size={20}
                className="text-emerald-600 flex-shrink-0 mt-1"
              />

              <p className="text-sm leading-relaxed">

                Rawatpur Officer's Colony Kanpur Nagar, Kanpur, Uttar Pradesh, India

              </p>

            </div>


            <div className="border-t border-slate-200 mt-5 pt-5">

              <a
                href="tel:8840273781"
                className="text-2xl font-black text-slate-900 hover:text-emerald-600"
              >
                +91 88402 73781
              </a>

              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                Email-Support
              </p>

            </div>


            <a
              href="mailto:smtdeepakushwaha@gmail.com"
              className="block mt-4 text-emerald-600 font-bold break-all hover:text-emerald-700"
            >
              smtdeepakushwaha@gmail.com
            </a>

          </div>

        </div>
        </div>

      </div>

    </footer>
  );
}


/* ============================================================
   SEARCH OVERLAY
============================================================ */

function SearchOverlay({
  open,
  onClose,
  onAddToCart,
  onOpenProduct,
}) {
  const [
    query,
    setQuery,
  ] = useState("");

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const handleEscape =
      (event) => {
        if (
          event.key ===
          "Escape"
        ) {
          onClose();
        }
      };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [
    open,
    onClose,
  ]);

  const results =
    query.trim() === ""
      ? PRODUCTS
      : PRODUCTS.filter(
          (product) =>
            product.name
              .toLowerCase()
              .includes(
                query.toLowerCase()
              ) ||
            product.category
              .toLowerCase()
              .includes(
                query.toLowerCase()
              )
        );

  return (
    <AnimatePresence>

      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-slate-950/50 backdrop-blur-sm p-2 sm:p-8"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onMouseDown={
            onClose
          }
        >

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Product search"
            className="max-w-3xl mx-auto mt-2 sm:mt-12 bg-white rounded-2xl sm:rounded-[2rem] shadow-2xl overflow-hidden max-h-[calc(100dvh-1rem)] sm:max-h-none"
            initial={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -20,
              scale: 0.98,
            }}
            onMouseDown={(
              event
            ) =>
              event.stopPropagation()
            }
          >

            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center gap-2 sm:gap-3">

              <Search
                className="text-slate-400 flex-shrink-0"
                size={22}
              />


              <label className="sr-only" htmlFor="search-overlay-products">Search products and categories</label>
              <input
                id="search-overlay-products"
                name="productSearchOverlay"
                autoFocus
                value={query}
                onChange={(
                  event
                ) =>
                  setQuery(
                    event.target
                      .value
                  )
                }
                placeholder="Search products or categories..."
                className="flex-1 min-w-0 outline-none text-lg text-slate-900 placeholder:text-slate-400"
              />


              <button
                type="button"
                onClick={
                  onClose
                }
                aria-label="Close search"
                className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>

            </div>


            <div className="max-h-[calc(100dvh-5.5rem)] sm:max-h-[65vh] overflow-y-auto p-3 sm:p-4 overscroll-contain">

              {results.length ===
              0 ? (
                <div className="py-16 text-center text-slate-500">

                  <Search
                    className="mx-auto mb-4 text-slate-300"
                    size={42}
                  />

                  <p className="font-semibold">
                    No matching products found.
                  </p>

                </div>
              ) : (
                <div className="space-y-2">

                  {results.map(
                    (product) => (
                     <div
  key={product.id}
  onClick={() =>
    onOpenProduct(product)
  }
  role="button"
  tabIndex={0}
  onKeyDown={(event) => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      onOpenProduct(product);
    }
  }}
  className="
    flex
    items-center
    gap-4
    p-4
    rounded-2xl
    hover:bg-slate-50
    transition-colors
    cursor-pointer
  "
>

                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor:
                              product.color,
                          }}
                        >

                          <Leaf
                            className="text-white"
                            size={25}
                          />

                        </div>


                        <div className="flex-1 min-w-0">

                          <p className="font-bold text-slate-900">
                            {product.name}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {product.category}
                          </p>

                          <p className="text-sm font-black text-slate-900 mt-1">
                            {product.price}
                          </p>

                        </div>


                        <div
  className="
    w-16
    h-16
    rounded-2xl
    overflow-hidden
    flex
    items-center
    justify-center
    flex-shrink-0
    bg-slate-100
  "
>
  <ProductImage
    product={product}
    className="w-full h-full object-cover"
  />
</div>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}


/* ============================================================
   CART DRAWER
============================================================ */

function getCartProductPrice(product) {
  const rawPrice =
    product?.mrp ??
    product?.price ??
    "";

  const numericPrice =
    String(rawPrice)
      .replace(/[^\d.]/g, "");

  const parsedPrice =
    Number(numericPrice);

  return Number.isFinite(parsedPrice)
    ? parsedPrice
    : null;
}


function formatINR(amount) {
  if (!Number.isFinite(amount)) {
    return "MRP not listed";
  }

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(amount);
}


function getCustomerCartStorageKey(customer) {
  const identity =
    customer?.id ??
    customer?.email ??
    customer?.mobile ??
    "";

  const normalizedIdentity =
    String(identity).trim().toLowerCase();

  if (!normalizedIdentity) {
    return null;
  }

  return `mnc_cart_${encodeURIComponent(normalizedIdentity)}`;
}


function readPersistedCart(customer) {
  const storageKey =
    getCustomerCartStorageKey(customer);

  if (!storageKey) {
    return [];
  }

  try {
    const saved =
      localStorage.getItem(storageKey);

    if (!saved) {
      return [];
    }

    const parsed =
      JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item) =>
          item &&
          typeof item.id === "string" &&
          (Number(item.quantity) || 0) > 0
      )
      .map((item) => ({
        ...item,
        quantity: Math.max(
          1,
          Number(item.quantity) || 1
        ),
      }));
  } catch {
    return [];
  }
}


function getCustomerOrderStorageKey(customer) {
  const identity =
    customer?.id ??
    customer?.email ??
    customer?.mobile ??
    "";

  const normalizedIdentity =
    String(identity).trim().toLowerCase();

  if (!normalizedIdentity) {
    return null;
  }

  return `mnc_orders_${encodeURIComponent(normalizedIdentity)}`;
}


function readPersistedOrders(customer) {
  const storageKey =
    getCustomerOrderStorageKey(customer);

  if (!storageKey) {
    return [];
  }

  try {
    const saved =
      localStorage.getItem(storageKey);

    if (!saved) {
      return [];
    }

    const parsed =
      JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}


function createOrderId() {
  const uuid =
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  return `MNC-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${uuid.replace(/-/g, "").slice(0, 10).toUpperCase()}`;
}


function loadRazorpayCheckout() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Promise.reject(new Error("Payment checkout is unavailable in this environment."));
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  const existingScript =
    document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Unable to load the payment checkout.")),
        { once: true }
      );
    });
  }

  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;

  return new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Unable to load the payment checkout."));
    document.body.appendChild(script);
  });
}


/* ============================================================
   CART DRAWER
============================================================ */

function CartDrawer({
  open,
  onClose,
  cartItems,
  onRemove,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onOpenProduct,
  onCheckout,
  subtotal,
  total,
  hasUnpricedItem,
}) {
  const cartUnits =
    cartItems.reduce(
      (sum, item) =>
        sum + (Number(item.quantity) || 0),
      0
    );

  return (
    <AnimatePresence>

      {open && (
        <>

          <motion.div
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={
              onClose
            }
          />


          <motion.aside
            className="fixed top-0 right-0 bottom-0 z-[75] w-full max-w-md bg-white shadow-2xl flex flex-col min-h-[100dvh]"
            initial={{
              x: "100%",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "100%",
            }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 260,
            }}
            aria-label="Shopping cart"
          >

            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100">

              <div>

                <h2 className="text-2xl font-black text-slate-900">
                  Your Cart
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  {cartUnits}{" "}
                  {cartUnits ===
                  1
                    ? "item"
                    : "items"}
                </p>

              </div>


              <button
                type="button"
                onClick={
                  onClose
                }
                aria-label="Close cart"
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
              >
                <X size={20} />
              </button>

            </div>


            <div className="flex-1 overflow-y-auto p-3 sm:p-5 overscroll-contain">

              {cartItems.length ===
              0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">

                  <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-5">

                    <ShoppingCart
                      size={34}
                      className="text-emerald-600"
                    />

                  </div>


                  <h3 className="text-xl font-black text-slate-900">
                    Your cart is empty
                  </h3>

                  <p className="text-slate-500 mt-2 max-w-xs">
                    Add a product from the catalogue to see it here.
                  </p>

                </div>
              ) : (

                <div className="space-y-3">

                  {cartItems.map(
                    (item) => {
                      const product =
                        item;

                      const quantity =
                        Number(product.quantity) || 0;

                      const unitPrice =
                        getCartProductPrice(
                          product
                        );

                      const lineTotal =
                        unitPrice === null
                          ? null
                          : unitPrice *
                            quantity;

                      return (
                        <div
                          key={product.id}
                          onClick={() =>
                            onOpenProduct(product)
                          }
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (
                              event.key ===
                                "Enter" ||
                              event.key ===
                                " "
                            ) {
                              event.preventDefault();
                              onOpenProduct(product);
                            }
                          }}
                          className="
                            flex
                            gap-3
                            p-4
                            rounded-2xl
                            hover:bg-slate-50
                            transition-colors
                            cursor-pointer
                          "
                        >

                          <div
                            className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor:
                                product.color,
                            }}
                          >

                            <Leaf
                              className="text-white"
                              size={25}
                            />

                          </div>


                          <div className="min-w-0 flex-1">

                            <p className="font-bold text-slate-900 leading-snug">
                              {product.name}
                            </p>

                            <p className="text-sm text-slate-500 mt-1">
                              {product.category}
                            </p>

                            <div
                              className="mt-3 flex items-center justify-between gap-3"
                              onClick={(event) =>
                                event.stopPropagation()
                              }
                              onKeyDown={(event) =>
                                event.stopPropagation()
                              }
                            >

                              <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">

                                <button
                                  type="button"
                                  onClick={() =>
                                    onDecreaseQuantity(
                                      product.id
                                    )
                                  }
                                  aria-label={`Decrease quantity of ${product.name}`}
                                  className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition"
                                >
                                  <Minus
                                    size={16}
                                  />
                                </button>

                                <span
                                  className="min-w-10 text-center text-sm font-black text-slate-900"
                                  aria-label={`Quantity ${quantity}`}
                                >
                                  {quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    onIncreaseQuantity(
                                      product.id
                                    )
                                  }
                                  aria-label={`Increase quantity of ${product.name}`}
                                  className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition"
                                >
                                  <Plus
                                    size={16}
                                  />
                                </button>

                              </div>

                              <button
                                type="button"
                                onClick={() =>
                                  onRemove(
                                    product.id
                                  )
                                }
                                aria-label={`Remove ${product.name} from cart`}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                              >
                                <X size={18} />
                              </button>

                            </div>

                            <div className="mt-3 flex items-end justify-between gap-3">

                              <div>
                                <p className="text-xs text-slate-500">
                                  Unit price
                                </p>

                                <p className="font-bold text-slate-900">
                                  {formatINR(
                                    unitPrice
                                  )}
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-xs text-slate-500">
                                  Item total
                                </p>

                                <p className="font-black text-slate-900">
                                  {lineTotal ===
                                  null
                                    ? "MRP not listed"
                                    : formatINR(
                                        lineTotal
                                      )}
                                </p>
                              </div>

                            </div>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              )}

            </div>


            <div className="p-5 border-t border-slate-100 space-y-4">

              {cartItems.length >
                0 && (
                <div className="space-y-2">

                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>
                      Subtotal
                    </span>

                    <span className="font-bold text-slate-900">
                      {hasUnpricedItem
                        ? "MRP not available"
                        : formatINR(
                            subtotal
                          )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-base font-black text-slate-900">
                      Total
                    </span>

                    <span className="text-lg font-black text-slate-950">
                      {hasUnpricedItem
                        ? "MRP not available"
                        : formatINR(
                            total
                          )}
                    </span>
                  </div>

                </div>
              )}

              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full py-4 rounded-full bg-emerald-600 text-white font-black hover:bg-emerald-700 active:scale-[0.99] transition-all shadow-lg shadow-emerald-600/15"
                >
                  Checkout
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  onClose();

                  scrollToId(
                    "shop"
                  );
                }}
                className="w-full py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-emerald-600 transition-colors"
              >
                Continue Shopping
              </button>

            </div>

          </motion.aside>

        </>
      )}

    </AnimatePresence>
  );
}

/* ============================================================
   CHECKOUT
============================================================ */

function CheckoutModal({
  open,
  onClose,
  customer,
  cartItems,
  subtotal,
  total,
  hasUnpricedItem,
  onOrderCreated,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    setError("");
    setSubmitted(false);
    setOrderConfirmation(null);

    setForm({
      name: customer?.name || "",
      email: customer?.email || "",
      mobile: customer?.mobile || customer?.phone || "",
      address: customer?.address || "",
      city: customer?.city || "",
      state: customer?.state || "",
      pincode: customer?.pincode || customer?.pinCode || "",
    });
  }, [open, customer]);

  const cartUnits = cartItems.reduce(
    (sum, item) =>
      sum + (Number(item.quantity) || 0),
    0
  );

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
    setError("");
    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (orderConfirmation || paymentLoading) {
      return;
    }

    if (form.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    const mobile = form.mobile.replace(/\D/g, "");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (form.address.trim().length < 5) {
      setError("Please enter your complete delivery address.");
      return;
    }

    if (form.city.trim().length < 2) {
      setError("Please enter your city.");
      return;
    }

    if (form.state.trim().length < 2) {
      setError("Please enter your state.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    if (hasUnpricedItem) {
      setError("Remove products without a listed MRP before continuing.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!Number.isFinite(total) || total <= 0) {
      setError("Unable to calculate the order total. Please review your cart.");
      return;
    }

    const orderOwner =
      customer || {
        email: form.email.trim().toLowerCase(),
        mobile,
      };

    const orderStorageKey =
      getCustomerOrderStorageKey(orderOwner);

    if (!orderStorageKey) {
      setError("Unable to identify the customer for this order.");
      return;
    }

    const order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      status: "Awaiting Payment",
      paymentStatus: "Pending",
      customer: {
        id: customer?.id ?? null,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        mobile,
      },
      shippingAddress: {
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
      },
      items: cartItems.map((item) => {
        const quantity =
          Math.max(1, Number(item.quantity) || 1);

        const unitPrice =
          getCartProductPrice(item);

        return {
          productId: item.id,
          name: item.name,
          category: item.category,
          packSize: item.packSize || "",
          quantity,
          unitPrice,
          lineTotal:
            unitPrice === null
              ? null
              : unitPrice * quantity,
        };
      }),
      pricing: {
        currency: "INR",
        subtotal,
        total,
      },
    };

    setError("");
    setSubmitted(false);
    setPaymentLoading(true);

    try {
      const paymentResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.id,
          amount: Math.round(total * 100),
          currency: "INR",
          customer: order.customer,
          items: order.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      const paymentResult = await paymentResponse.json().catch(() => ({}));

      if (!paymentResponse.ok) {
        throw new Error(
          paymentResult.error ||
            paymentResult.message ||
            "Unable to start the payment."
        );
      }

      await loadRazorpayCheckout();

      const razorpayOrderId =
        paymentResult.razorpayOrderId ||
        paymentResult.orderId ||
        paymentResult.id;

      const razorpayKeyId =
        paymentResult.keyId ||
        import.meta.env.VITE_RAZORPAY_KEY_ID;

      const razorpayAmount =
        Number(paymentResult.amount) ||
        Math.round(total * 100);

      const razorpayCurrency =
        paymentResult.currency ||
        "INR";

      if (!razorpayOrderId) {
        throw new Error("Payment order was not created correctly.");
      }

      if (!razorpayKeyId) {
        throw new Error("Razorpay Key ID is not configured.");
      }

      if (!window.Razorpay) {
        throw new Error("Payment checkout is unavailable.");
      }

      const savePendingOrder = () => {
        const existingOrders =
          readPersistedOrders(orderOwner);

        localStorage.setItem(
          orderStorageKey,
          JSON.stringify([order, ...existingOrders])
        );
      };

      savePendingOrder();

      const razorpay = new window.Razorpay({
        key: razorpayKeyId,
        amount: razorpayAmount,
        currency: razorpayCurrency,
        order_id: razorpayOrderId,
        name: "Shri Radhe Wellness",
        description: `Order ${order.id}`,
        prefill: {
          name: order.customer.name,
          email: order.customer.email,
          contact: order.customer.mobile,
        },
        notes: {
          client_order_id: order.id,
        },
        theme: {
          color: "#059669",
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            setError("Payment was cancelled. Your cart is still available.");
          },
        },
        handler: async (response) => {
          try {
            const verificationResponse = await fetch("/api/payments/verify", {
              method: "POST",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: order.id,
                amount: razorpayAmount,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verificationResult = await verificationResponse
              .json()
              .catch(() => ({}));

            if (!verificationResponse.ok || verificationResult.verified !== true) {
              throw new Error(
                verificationResult.error ||
                  verificationResult.message ||
                  "Payment verification failed."
              );
            }

            const paidOrder = {
              ...order,
              status: "Placed",
              paymentStatus: "Paid",
              paidAt: new Date().toISOString(),
              payment: {
                provider: "Razorpay",
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
              },
            };

            const existingOrders =
              readPersistedOrders(orderOwner);

            localStorage.setItem(
              orderStorageKey,
              JSON.stringify([
                paidOrder,
                ...existingOrders.filter(
                  (existingOrder) =>
                    existingOrder.id !== paidOrder.id
                ),
              ])
            );

            setSubmitted(true);
            setOrderConfirmation(paidOrder);
            setPaymentLoading(false);

            if (typeof onOrderCreated === "function") {
              onOrderCreated(paidOrder);
            }
          } catch (verificationError) {
            setPaymentLoading(false);
            setError(
              verificationError instanceof TypeError
                ? "Unable to verify the payment with the server."
                : verificationError.message ||
                  "Payment verification failed. Please contact support before trying again."
            );
          }
        },
      });

      razorpay.on("payment.failed", (response) => {
        setPaymentLoading(false);
        setError(
          response?.error?.description ||
            "Payment failed. Your cart is still available."
        );
      });

      razorpay.open();
    } catch (requestError) {
      setPaymentLoading(false);
      setError(
        requestError instanceof TypeError
          ? "Unable to reach the payment server. Please try again."
          : requestError.message ||
            "Unable to start the payment. Please try again."
      );
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-[95] flex items-end sm:items-center justify-center p-0 sm:p-5"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-label="Checkout"
          >
            <div
              className="w-full sm:max-w-5xl max-h-[100dvh] sm:max-h-[92dvh] overflow-hidden bg-white sm:rounded-3xl shadow-2xl flex flex-col"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7 sm:py-5 border-b border-slate-100 flex-shrink-0">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] font-black text-emerald-600">
                    {orderConfirmation ? "Order confirmation" : "Checkout details"}
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                    {orderConfirmation ? "Order confirmed" : "Checkout"}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    {orderConfirmation
                      ? "Your order has been created and saved."
                      : "Review your order and enter delivery details."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close checkout"
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors flex-shrink-0"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto overscroll-contain">
                {orderConfirmation ? (
                  <div className="min-h-full p-5 sm:p-10 flex items-center justify-center">
                    <div className="w-full max-w-2xl text-center">
                      <div className="mx-auto w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                        <ShieldCheck size={40} />
                      </div>

                      <p className="mt-6 text-xs uppercase tracking-[0.2em] font-black text-emerald-600">
                        Order placed
                      </p>

                      <h3 className="mt-2 text-3xl sm:text-4xl font-black text-slate-900">
                        Thank you, {orderConfirmation.customer.name.split(" ")[0] || "Customer"}.
                      </h3>

                      <p className="mt-3 text-slate-600 leading-relaxed">
                        Your order has been created successfully. Keep your order ID for future reference.
                      </p>

                      <div className="mt-7 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7 text-left space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <span className="text-sm font-bold text-slate-500">Order ID</span>
                          <span className="font-black text-slate-900 break-all">
                            {orderConfirmation.id}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-slate-500">Status</span>
                          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-800">
                            {orderConfirmation.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold text-slate-500">Payment</span>
                          <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-800">
                            {orderConfirmation.paymentStatus}
                          </span>
                        </div>

                        {orderConfirmation.payment?.razorpayPaymentId && (
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-sm font-bold text-slate-500">Payment ID</span>
                            <span className="font-mono text-xs font-bold text-slate-700 break-all sm:text-right">
                              {orderConfirmation.payment.razorpayPaymentId}
                            </span>
                          </div>
                        )}

                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-xs uppercase tracking-[0.16em] font-black text-slate-500">
                            Delivery to
                          </p>
                          <p className="mt-2 font-bold text-slate-900">
                            {orderConfirmation.shippingAddress.address}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            {orderConfirmation.shippingAddress.city}, {orderConfirmation.shippingAddress.state} — {orderConfirmation.shippingAddress.pincode}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-sm font-bold text-slate-600">Items</span>
                            <span className="font-black text-slate-900">
                              {orderConfirmation.items.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                          </div>

                          <div className="mt-3 space-y-2">
                            {orderConfirmation.items.map((item) => (
                              <div key={`${orderConfirmation.id}-${item.productId}`} className="flex items-start justify-between gap-4 text-sm">
                                <span className="text-slate-600">
                                  {item.name} × {item.quantity}
                                </span>
                                <span className="font-bold text-slate-900 whitespace-nowrap">
                                  {item.lineTotal === null ? "MRP not listed" : formatINR(item.lineTotal)}
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                            <span className="font-black text-slate-900">Total</span>
                            <span className="text-xl font-black text-slate-950">
                              {formatINR(orderConfirmation.pricing.total)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-5 text-xs leading-relaxed text-slate-500">
                        Payment was verified successfully through Razorpay. Keep your order ID for future reference.
                      </p>

                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          scrollToId("shop");
                        }}
                        className="mt-7 w-full sm:w-auto min-w-56 rounded-full bg-slate-950 px-7 py-4 text-white font-black hover:bg-emerald-600 transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                ) : (
                <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-0">
                  <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
                    <section>
                      <div className="flex items-end justify-between gap-3 mb-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] font-black text-emerald-600">
                            Customer information
                          </p>
                          <h3 className="text-xl font-black text-slate-900 mt-1">
                            Your details
                          </h3>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <label className="block sm:col-span-2">
                          <span className="text-sm font-bold text-slate-700">Full name</span>
                          <input
                            id="checkout-full-name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            autoComplete="name"
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="Enter your full name"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-bold text-slate-700">Email address</span>
                          <input
                            id="checkout-email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            autoComplete="email"
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="you@example.com"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-bold text-slate-700">Mobile number</span>
                          <input
                            id="checkout-mobile"
                            name="mobile"
                            type="tel"
                            inputMode="numeric"
                            value={form.mobile}
                            onChange={(event) => updateField("mobile", event.target.value.replace(/\D/g, "").slice(0, 10))}
                            autoComplete="tel"
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="10-digit mobile number"
                          />
                        </label>
                      </div>
                    </section>

                    <section className="pt-5 border-t border-slate-100">
                      <div className="mb-4">
                        <p className="text-xs uppercase tracking-[0.18em] font-black text-emerald-600">
                          Delivery information
                        </p>
                        <h3 className="text-xl font-black text-slate-900 mt-1">
                          Where should we deliver?
                        </h3>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <label className="block sm:col-span-2">
                          <span className="text-sm font-bold text-slate-700">Address</span>
                          <textarea
                            id="checkout-address"
                            name="address"
                            value={form.address}
                            onChange={(event) => updateField("address", event.target.value)}
                            autoComplete="street-address"
                            rows={3}
                            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="House / flat, street, area"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-bold text-slate-700">City</span>
                          <input
                            id="checkout-city"
                            name="city"
                            type="text"
                            value={form.city}
                            onChange={(event) => updateField("city", event.target.value)}
                            autoComplete="address-level2"
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="City"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-bold text-slate-700">State</span>
                          <input
                            id="checkout-state"
                            name="state"
                            type="text"
                            value={form.state}
                            onChange={(event) => updateField("state", event.target.value)}
                            autoComplete="address-level1"
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="State"
                          />
                        </label>

                        <label className="block">
                          <span className="text-sm font-bold text-slate-700">PIN code</span>
                          <input
                            id="checkout-pincode"
                            name="pincode"
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={form.pincode}
                            onChange={(event) => updateField("pincode", event.target.value.replace(/\D/g, "").slice(0, 6))}
                            autoComplete="postal-code"
                            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                            placeholder="6-digit PIN"
                          />
                        </label>
                      </div>
                    </section>

                    {error && (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">
                        {error}
                      </div>
                    )}

                    {submitted && (
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                        Customer and delivery details are ready for the next order-processing phase.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={hasUnpricedItem || paymentLoading}
                      className="w-full rounded-2xl bg-slate-950 px-5 py-4 text-white font-black hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    >
                      {paymentLoading
                        ? "Opening Secure Payment..."
                        : `Pay ${formatINR(total)} & Place Order`}
                    </button>
                  </form>

                  <aside className="border-t lg:border-t-0 lg:border-l border-slate-100 bg-slate-50/70 p-5 sm:p-7">
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] font-black text-emerald-600">
                          Order information
                        </p>
                        <h3 className="text-xl font-black text-slate-900 mt-1">
                          Your order
                        </h3>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-slate-600 shadow-sm">
                        {cartUnits} {cartUnits === 1 ? "item" : "items"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {cartItems.map((item) => {
                        const quantity = Number(item.quantity) || 0;
                        const unitPrice = getCartProductPrice(item);
                        const lineTotal = unitPrice === null ? null : unitPrice * quantity;

                        return (
                          <div key={item.id} className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 leading-snug">
                                  {item.name}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                  Qty: {quantity}
                                </p>
                              </div>
                              <p className="font-black text-slate-900 whitespace-nowrap">
                                {lineTotal === null ? "MRP not listed" : formatINR(lineTotal)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-5 rounded-2xl bg-white border border-slate-100 p-4 shadow-sm space-y-3">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-900">
                          {hasUnpricedItem ? "MRP not available" : formatINR(subtotal)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="font-black text-slate-900">Total</span>
                        <span className="text-xl font-black text-slate-950">
                          {hasUnpricedItem ? "MRP not available" : formatINR(total)}
                        </span>
                      </div>
                    </div>

                    {hasUnpricedItem && (
                      <p className="mt-4 text-xs leading-relaxed text-amber-700 bg-amber-50 border border-amber-200 rounded-2xl p-4">
                        One or more cart items do not currently have a listed MRP, so a complete order total cannot be calculated.
                      </p>
                    )}

                    <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
                      <p className="text-xs uppercase tracking-[0.16em] font-black text-emerald-700">
                        Secure payment
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        Your payment will open in Razorpay Checkout. Available payment methods depend on your Razorpay account configuration.
                      </p>
                    </div>
                  </aside>
                </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
   MAIN APP
============================================================ */

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartHydratedKey, setCartHydratedKey] = useState(null);
  const cartCount = cartItems.reduce(
    (total, item) =>
      total + (Number(item.quantity) || 0),
    0
  );

  const [wishlist, setWishlist] = useState(() => new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allProductsOpen, setAllProductsOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const [customer, setCustomer] = useState(null);
  const [activeInfoModal, setActiveInfoModal] = useState(null);

  const getCurrentPage = () => {
    const path = window.location.pathname.replace(/\/+$/, "") || "/";

    if (path === "/business-login") {
      return "business-login";
    }

    if (path === "/user-login") {
      return "user-login";
    }

    return "auth-loading";
  };

  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    if (currentPage !== "auth-loading") {
      return undefined;
    }

    let cancelled = false;

    const restoreSession = async () => {
      try {
        const response = await fetch("/api/auth/session", {
          credentials: "same-origin",
        });

        if (!response.ok) {
          throw new Error("Session check failed.");
        }

        const result = await response.json();

        if (!cancelled) {
          setCustomer(result.user);
          setCurrentPage(result.user ? "website" : "user-login");
        }
      } catch {
        if (!cancelled) {
          setCustomer(null);
          setCurrentPage("user-login");
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, [currentPage]);

  const navigateTo = (path) => {
    window.history.pushState({}, "", path);

    if (path === "/business-login") {
      setCurrentPage("business-login");
      return;
    }

    if (path === "/user-login") {
      setCurrentPage("user-login");
      return;
    }

    setCurrentPage(customer ? "website" : "auth-loading");
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setSearchOpen(false);
    setCartOpen(false);
    setAllProductsOpen(false);
  };

  const handleCustomerLogin = (session) => {
    setCustomer(session);
    window.history.pushState({}, "", "/");
    setCurrentPage("website");
  };

  useEffect(() => {
    const storageKey =
      getCustomerCartStorageKey(customer);

    if (!storageKey) {
      setCartItems([]);
      setCartHydratedKey(null);
      return;
    }

    setCartItems(
      readPersistedCart(customer)
    );
    setCartHydratedKey(storageKey);
  }, [
    customer?.id,
    customer?.email,
    customer?.mobile,
  ]);

  useEffect(() => {
    const storageKey =
      getCustomerCartStorageKey(customer);

    if (!storageKey || cartHydratedKey !== storageKey) {
      return;
    }

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(cartItems)
      );
    } catch {
      // Cart state remains available for the current session.
    }
  }, [
    cartItems,
    cartHydratedKey,
    customer?.id,
    customer?.email,
    customer?.mobile,
  ]);

  const handleCustomerLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    }).catch(() => {});

    setCustomer(null);
    setCartItems([]);
    setWishlist(new Set());
    navigateTo("/user-login");
  };

  const showNotification = (message) => {
    setNotification(message);
    window.setTimeout(() => {
      setNotification("");
    }, 2200);
  };

  const handleAddToCart = (product) => {
    setCartItems((previous) => {
      const existingProduct =
        previous.find(
          (item) =>
            item.id === product.id
        );

      if (existingProduct) {
        return previous.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    (Number(item.quantity) || 0) +
                    1,
                }
              : item
        );
      }

      return [
        ...previous,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    showNotification(
      `${product.name} added to cart`
    );
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems((previous) =>
      previous.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity:
                (Number(item.quantity) || 0) +
                1,
            }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems((previous) =>
      previous
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity:
                  (Number(item.quantity) || 0) -
                  1,
              }
            : item
        )
        .filter(
          (item) =>
            (Number(item.quantity) || 0) > 0
        )
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((previous) =>
      previous.filter(
        (item) => item.id !== productId
      )
    );

    showNotification(
      "Product removed from cart"
    );
  };

  const handleOpenCheckout = () => {
    if (cartItems.length === 0) {
      showNotification("Your cart is empty");
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderCreated = () => {
    setCartItems([]);
    setCartOpen(false);
  };

  const cartSubtotal = cartItems.reduce(
    (sum, item) => {
      const unitPrice =
        getCartProductPrice(item);

      if (unitPrice === null) {
        return sum;
      }

      return (
        sum +
        unitPrice *
          (Number(item.quantity) || 0)
      );
    },
    0
  );

  const hasUnpricedCartItem =
    cartItems.some(
      (item) =>
        getCartProductPrice(item) === null
    );

  const cartTotal = cartSubtotal;

  const handleWishlist = (product) => {
    setWishlist((previous) => {
      const next = new Set(previous);

      if (next.has(product.id)) {
        next.delete(product.id);
        showNotification(`${product.name} removed from wishlist`);
      } else {
        next.add(product.id);
        showNotification(`${product.name} added to wishlist`);
      }

      return next;
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setSearchOpen(false);
        setCartOpen(false);
        setCheckoutOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        html,
        body {
          overflow-x: hidden;
        }

        body {
          -webkit-text-size-adjust: 100%;
          text-rendering: optimizeLegibility;
        }

        button,
        a,
        [role="button"] {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        input,
        textarea,
        select {
          font-size: 16px;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
          }
        }

        @media (max-width: 767px) {
          .mobile-safe-bottom {
            padding-bottom: calc(
              1rem + env(safe-area-inset-bottom)
            );
          }
        }

        @media (hover: none) and (pointer: coarse) {
          * {
            scroll-behavior: auto;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
          }
        }
      `}</style>
      {currentPage === "auth-loading" ? (
        <div
          className="min-h-screen flex items-center justify-center bg-white text-slate-600"
          role="status"
        >
          Checking your account...
        </div>
      ) : currentPage === "business-login" ? (
        <BusinessLoginPage />
      ) : currentPage === "user-login" ? (
        <UserLoginPage
          onLogin={handleCustomerLogin}
          onBrandPartnerLogin={() => navigateTo("/business-login")}
        />
      ) : (
        <div className="min-h-screen bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-emerald-200 selection:text-emerald-900">
          <Navbar
            cartCount={cartCount}
            onSearch={() => setSearchOpen(true)}
            onCart={() => setCartOpen(true)}
            onOpenDiscover={() => setActiveInfoModal("discover")}
            onBrandPartnerLogin={() => navigateTo("/business-login")}
            onLogout={handleCustomerLogout}
          />

          <main>
            <HeroSection />
            <TrustStrip />
            <FeaturedProducts
              wishlist={wishlist}
              onWishlist={handleWishlist}
              onAddToCart={handleAddToCart}
              onOpenProduct={handleOpenProduct}
              onOpenAllProducts={() => setAllProductsOpen(true)}
            />
            <ImmersiveShowcase onAddToCart={handleAddToCart} />
            <OpportunitySection
              onOpenDiscover={() => setActiveInfoModal("discover")}
            />
            <Footer onOpenModal={setActiveInfoModal} />
          </main>

          {activeInfoModal === "discover" && (
            <DiscoverOpportunityModal
              onClose={() => setActiveInfoModal(null)}
            />
          )}
          <PrivacyPolicyModal
            isOpen={activeInfoModal === "privacy"}
            onClose={() => setActiveInfoModal(null)}
          />
          {activeInfoModal === "returnRefund" && (
            <RefundReturnPolicyModal
              onClose={() => setActiveInfoModal(null)}
            />
          )}
          <ShippingPolicyModal
            isOpen={activeInfoModal === "shipping"}
            onClose={() => setActiveInfoModal(null)}
          />
          {activeInfoModal === "terms" && (
            <TermsConditionsModal
              onClose={() => setActiveInfoModal(null)}
            />
          )}
          {activeInfoModal === "visionMission" && (
            <VisionMissionModal
              onClose={() => setActiveInfoModal(null)}
            />
          )}

          <SearchOverlay
            open={searchOpen}
            onClose={() => setSearchOpen(false)}
            onAddToCart={handleAddToCart}
            onOpenProduct={handleOpenProduct}
          />

          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cartItems}
            onRemove={handleRemoveFromCart}
            onIncreaseQuantity={handleIncreaseQuantity}
            onDecreaseQuantity={handleDecreaseQuantity}
            onOpenProduct={handleOpenProduct}
            onCheckout={handleOpenCheckout}
            subtotal={cartSubtotal}
            total={cartTotal}
            hasUnpricedItem={hasUnpricedCartItem}
          />

          <CheckoutModal
            open={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
            customer={customer}
            cartItems={cartItems}
            subtotal={cartSubtotal}
            total={cartTotal}
            hasUnpricedItem={hasUnpricedCartItem}
            onOrderCreated={handleOrderCreated}
          />

          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />

          <AllProductsModal
            open={allProductsOpen}
            onClose={() => setAllProductsOpen(false)}
            wishlist={wishlist}
            onWishlist={handleWishlist}
            onAddToCart={handleAddToCart}
            onOpenProduct={handleOpenProduct}
          />

          {notification && (
            <div className="fixed bottom-5 left-1/2 z-[130] -translate-x-1/2 rounded-full bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-2xl">
              {notification}
            </div>
          )}
        </div>
      )}
    </MotionConfig>
  );
}
